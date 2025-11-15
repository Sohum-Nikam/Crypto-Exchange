"use client"

import { useEffect, useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Area,
  AreaChart,
  ComposedChart,
  ReferenceLine,
  Brush,
  Bar
} from "recharts"
import { 
  LineChart as LineChartIcon,
  CandlestickChart as CandlestickChartIcon,
  AreaChart as AreaChartIcon,
  ZoomIn,
  ZoomOut,
  Download,
  Settings
} from "lucide-react"
import { format } from "date-fns"

interface TradingChartProps {
  symbol: string
  type?: "line" | "candlestick" | "area"
  timeframe?: string
  showIndicators?: boolean
}

interface CandleData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  sma20?: number
  sma50?: number
  rsi?: number
}

export function TradingChart({ 
  symbol, 
  type = "candlestick", 
  timeframe = "1h",
  showIndicators = true 
}: TradingChartProps) {
  const [data, setData] = useState<CandleData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

  const calculateIndicators = useCallback((data: CandleData[]) => {
    // Calculate SMA20
    for (let i = 19; i < data.length; i++) {
      const sum = data.slice(i - 19, i + 1).reduce((acc, curr) => acc + curr.close, 0)
      data[i].sma20 = sum / 20
    }

    // Calculate SMA50
    for (let i = 49; i < data.length; i++) {
      const sum = data.slice(i - 49, i + 1).reduce((acc, curr) => acc + curr.close, 0)
      data[i].sma50 = sum / 50
    }

    // Calculate RSI
    for (let i = 1; i < data.length; i++) {
      const gains = []
      const losses = []
      for (let j = i - 13; j <= i; j++) {
        if (j < 0) continue
        const change = data[j].close - data[j].open
        if (change >= 0) {
          gains.push(change)
          losses.push(0)
        } else {
          gains.push(0)
          losses.push(Math.abs(change))
        }
      }
      const avgGain = gains.reduce((a, b) => a + b, 0) / 14
      const avgLoss = losses.reduce((a, b) => a + b, 0) / 14
      const rs = avgGain / avgLoss
      data[i].rsi = 100 - (100 / (1 + rs))
    }

    return data
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/market_chart?vs_currency=usd&days=30&interval=${timeframe}&x_cg_demo_api_key=b004ed9d`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const result = await response.json()
      
      // Transform the data into proper candle format
      const transformedData = result.prices.map((price: [number, number], index: number) => {
        const timestamp = price[0]
        const close = price[1]
        const open = index > 0 ? result.prices[index - 1][1] : close
        const high = Math.max(open, close)
        const low = Math.min(open, close)
        const volume = result.total_volumes[index][1]
        
        return {
          timestamp,
          open,
          high,
          low,
          close,
          volume
        }
      })

      const dataWithIndicators = showIndicators ? calculateIndicators(transformedData) : transformedData
      setData(dataWithIndicators)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [symbol, timeframe, showIndicators, calculateIndicators])

  const formatTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), 'MMM d, HH:mm')
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <Card className="p-3 border border-gray-800 bg-gray-900/90 backdrop-blur-sm">
          <div className="text-sm text-gray-400">{formatTimestamp(label)}</div>
          <div className="text-sm text-white space-y-1">
            <div>Open: {formatPrice(data.open)}</div>
            <div>High: {formatPrice(data.high)}</div>
            <div>Low: {formatPrice(data.low)}</div>
            <div>Close: {formatPrice(data.close)}</div>
            <div>Volume: ${data.volume.toLocaleString()}</div>
            {showIndicators && (
              <>
                <div className="pt-2 border-t border-gray-800">
                  <div className="text-blue-400">SMA20: {formatPrice(data.sma20 || 0)}</div>
                  <div className="text-purple-400">SMA50: {formatPrice(data.sma50 || 0)}</div>
                  <div className="text-yellow-400">RSI: {data.rsi?.toFixed(2) || 0}</div>
                </div>
              </>
            )}
          </div>
        </Card>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <p className="text-red-400">Error loading chart data</p>
      </div>
    )
  }

  return (
    <div className="h-[500px] w-full relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/50 border-gray-800 hover:bg-gray-800"
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 2))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/50 border-gray-800 hover:bg-gray-800"
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.5))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/50 border-gray-800 hover:bg-gray-800"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="timestamp"
            tick={{ fill: "#888" }}
            tickLine={{ stroke: "#555" }}
            axisLine={{ stroke: "#555" }}
            tickFormatter={formatTimestamp}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#888" }}
            tickLine={{ stroke: "#555" }}
            axisLine={{ stroke: "#555" }}
            tickFormatter={formatPrice}
          />
          <Tooltip content={<CustomTooltip />} />
          <Brush
            dataKey="timestamp"
            height={30}
            stroke="#3b82f6"
            fill="#1a1a1a"
            travellerWidth={8}
          />
          
          {type === "candlestick" ? (
            <>
              {/* Candlestick body */}
              <Bar
                dataKey="close"
                fill="#22c55e"
                stroke="#22c55e"
                isAnimationActive={false}
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  const isGreen = payload.close >= payload.open;
                  return (
                    <rect
                      x={x}
                      y={isGreen ? y : y + height}
                      width={width}
                      height={isGreen ? height : -height}
                      fill={isGreen ? "#22c55e" : "#ef4444"}
                      stroke={isGreen ? "#22c55e" : "#ef4444"}
                    />
                  );
                }}
              />
              {/* Candlestick wicks */}
              <Line
                type="monotone"
                dataKey="high"
                stroke="#888"
                strokeWidth={1}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke="#888"
                strokeWidth={1}
                dot={false}
                isAnimationActive={false}
              />
              {showIndicators && (
                <>
                  <ReferenceLine
                    y={data[data.length - 1]?.sma20}
                    stroke="#3b82f6"
                    strokeDasharray="3 3"
                    label={{ value: 'SMA20', position: 'right', fill: '#3b82f6' }}
                  />
                  <ReferenceLine
                    y={data[data.length - 1]?.sma50}
                    stroke="#8b5cf6"
                    strokeDasharray="3 3"
                    label={{ value: 'SMA50', position: 'right', fill: '#8b5cf6' }}
                  />
                </>
              )}
            </>
          ) : type === "line" ? (
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
          ) : (
            <Area
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              fill="url(#colorVolume)"
              strokeWidth={2}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
