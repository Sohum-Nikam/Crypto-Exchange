"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TradingChart } from "@/components/trading/trading-chart"
import { OrderBook } from "@/components/trading/order-book"
import { OrderForm } from "@/components/trading/order-form"
import { MarketSelector, Market } from "@/components/market-selector"
import { Portfolio } from "@/components/trading/portfolio"
import { TradeHistory } from "@/components/trading/trade-history"
import { 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Star, 
  Clock, 
  BarChart3,
  ChevronDown,
  Settings,
  Bell,
  User,
  Wallet,
  LineChart,
  CandlestickChart,
  AreaChart,
  DollarSign,
  Percent,
  Volume2,
  Plus,
  Minus,
  RefreshCw,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  LayoutDashboard
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface MarketStats {
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

export default function TradingPage() {
  const [selectedMarket, setSelectedMarket] = useState<Market>({
    name: "Bitcoin",
    symbol: "BTC",
    price: 0,
    change24h: 0
  })

  const [marketStats, setMarketStats] = useState<MarketStats>({
    price: 0,
    change24h: 0,
    volume24h: 0,
    high24h: 0,
    low24h: 0
  })

  const [activeTab, setActiveTab] = useState("spot")
  const [chartType, setChartType] = useState<"candlestick" | "line" | "area">("candlestick")
  const [timeframe, setTimeframe] = useState("1h")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch market data
  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedMarket.symbol.toLowerCase()}/market_chart?vs_currency=usd&days=1&interval=hourly&x_cg_demo_api_key=b004ed9d`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch market data')
      }

      const data = await response.json()
      
      // Calculate 24h stats
      const prices = data.prices
      const volumes = data.total_volumes
      
      const currentPrice = prices[prices.length - 1][1]
      const openPrice = prices[0][1]
      const change24h = ((currentPrice - openPrice) / openPrice) * 100
      
      const high24h = Math.max(...prices.map((p: [number, number]) => p[1]))
      const low24h = Math.min(...prices.map((p: [number, number]) => p[1]))
      const volume24h = volumes.reduce((acc: number, curr: [number, number]) => acc + curr[1], 0)

      setMarketStats({
        price: currentPrice,
        change24h,
        volume24h,
        high24h,
        low24h
      })

      setSelectedMarket(prev => ({
        ...prev,
        price: currentPrice,
        change24h
      }))

    } catch (error) {
      console.error('Error fetching market data:', error)
      toast.error('Failed to fetch market data')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on mount and when market changes
  useEffect(() => {
    fetchMarketData()
    const interval = setInterval(fetchMarketData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [selectedMarket.symbol])

  // Handle market change
  const handleMarketChange = (market: Market) => {
    setSelectedMarket(market)
    setIsLoading(true)
  }

  // Handle order submission
  const handleOrderSubmit = async (orderData: any) => {
    try {
      // Here you would typically make an API call to your backend
      console.log('Order submitted:', orderData)
      toast.success('Order placed successfully')
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] relative z-10">
        {/* Sidebar */}
        <aside className="border-r border-gray-800/50 bg-gray-900/30 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-2 border-b border-gray-800/50 px-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-400 to-purple-500 rounded-lg blur opacity-20"></div>
              <Wallet className="h-6 w-6 text-white relative" />
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="relative">
              <Input
                placeholder="Search pairs..."
                className="bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-400/50 pl-9 focus:ring-primary/50 backdrop-blur-sm"
                readOnly
                aria-label="Search pairs"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400/50" />
            </div>
          </div>
          <nav className="space-y-1 px-2">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/trading">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white bg-gray-800/30">
                <LineChart className="h-4 w-4" />
                <span>Trading</span>
              </Button>
            </Link>
            <Link href="/wallet">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30">
                <Wallet className="h-4 w-4" />
                <span>Wallet</span>
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="p-6 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <MarketSelector 
                selectedMarket={selectedMarket}
                onMarketChange={handleMarketChange}
              />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => window.open("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#", "_blank")}
              >
                <Wallet className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-lg font-semibold text-white">
                    {isLoading ? (
                      <div className="animate-pulse h-6 w-32 bg-gray-700 rounded"></div>
                    ) : (
                      `$${marketStats.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                  </p>
                </div>
                <div className={`flex items-center gap-1 ${marketStats.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketStats.change24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{Math.abs(marketStats.change24h).toFixed(2)}%</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div>
                <p className="text-sm text-gray-400">24h Volume</p>
                <p className="text-lg font-semibold text-white">
                  {isLoading ? (
                    <div className="animate-pulse h-6 w-32 bg-gray-700 rounded"></div>
                  ) : (
                    `$${(marketStats.volume24h / 1000000).toFixed(2)}M`
                  )}
                </p>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div>
                <p className="text-sm text-gray-400">24h High</p>
                <p className="text-lg font-semibold text-white">
                  {isLoading ? (
                    <div className="animate-pulse h-6 w-32 bg-gray-700 rounded"></div>
                  ) : (
                    `$${marketStats.high24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
                </p>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div>
                <p className="text-sm text-gray-400">24h Low</p>
                <p className="text-lg font-semibold text-white">
                  {isLoading ? (
                    <div className="animate-pulse h-6 w-32 bg-gray-700 rounded"></div>
                  ) : (
                    `$${marketStats.low24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
                </p>
              </div>
            </Card>
          </div>

          {/* Main Trading Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart and Order Book */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <TabsList className="bg-gray-900/30 border border-gray-800/50">
                    <TabsTrigger 
                      value="spot" 
                      className="data-[state=active]:bg-gray-800/50 data-[state=active]:text-white text-gray-400"
                      onClick={() => setActiveTab("spot")}
                    >
                      Spot
                    </TabsTrigger>
                    <TabsTrigger 
                      value="futures" 
                      className="data-[state=active]:bg-gray-800/50 data-[state=active]:text-white text-gray-400"
                      onClick={() => setActiveTab("futures")}
                    >
                      Futures
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`text-gray-400 ${chartType === "candlestick" ? "text-white" : ""}`} 
                      onClick={() => setChartType("candlestick")}
                    >
                      <CandlestickChart className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`text-gray-400 ${chartType === "line" ? "text-white" : ""}`} 
                      onClick={() => setChartType("line")}
                    >
                      <LineChart className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`text-gray-400 ${chartType === "area" ? "text-white" : ""}`} 
                      onClick={() => setChartType("area")}
                    >
                      <AreaChart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className={`text-gray-400 ${timeframe === "1m" ? "text-white" : ""}`} onClick={() => setTimeframe("1m")}>
                    1m
                  </Button>
                  <Button variant="ghost" size="sm" className={`text-gray-400 ${timeframe === "5m" ? "text-white" : ""}`} onClick={() => setTimeframe("5m")}>
                    5m
                  </Button>
                  <Button variant="ghost" size="sm" className={`text-gray-400 ${timeframe === "15m" ? "text-white" : ""}`} onClick={() => setTimeframe("15m")}>
                    15m
                  </Button>
                  <Button variant="ghost" size="sm" className={`text-gray-400 ${timeframe === "1h" ? "text-white" : ""}`} onClick={() => setTimeframe("1h")}>
                    1h
                  </Button>
                  <Button variant="ghost" size="sm" className={`text-gray-400 ${timeframe === "4h" ? "text-white" : ""}`} onClick={() => setTimeframe("4h")}>
                    4h
                  </Button>
                  <Button variant="ghost" size="sm" className={`text-gray-400 ${timeframe === "1d" ? "text-white" : ""}`} onClick={() => setTimeframe("1d")}>
                    1d
                  </Button>
                </div>
              </div>

              {/* Chart */}
              <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
                <div className="h-[500px]">
                  <TradingChart 
                    symbol={selectedMarket.symbol} 
                    type={chartType} 
                    timeframe={timeframe} 
                  />
                </div>
              </Card>

              {/* Order Book and Trade History */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Order Book</h2>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-white"
                        onClick={fetchMarketData}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <OrderBook 
                    symbol={selectedMarket.symbol} 
                    currentPrice={marketStats.price}
                  />
                </Card>
                <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Trades</h2>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-white"
                        onClick={fetchMarketData}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <TradeHistory 
                    symbol={selectedMarket.symbol}
                    currentPrice={marketStats.price}
                  />
                </Card>
              </div>
            </div>

            {/* Trading Panel */}
            <div className="space-y-6">
              <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-900/30 border border-gray-800/50">
                    <TabsTrigger 
                      value="buy" 
                      className="data-[state=active]:bg-gray-800/50 data-[state=active]:text-white text-gray-400"
                    >
                      Buy
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sell" 
                      className="data-[state=active]:bg-gray-800/50 data-[state=active]:text-white text-gray-400"
                    >
                      Sell
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy" className="mt-4">
                    <OrderForm 
                      action="buy" 
                      orderType="market" 
                      crypto={{
                        name: selectedMarket.name,
                        symbol: selectedMarket.symbol,
                        price: marketStats.price,
                        change24h: marketStats.change24h
                      }}
                      onSubmit={handleOrderSubmit}
                      isLoading={isLoading}
                    />
                  </TabsContent>
                  <TabsContent value="sell" className="mt-4">
                    <OrderForm 
                      action="sell" 
                      orderType="market" 
                      crypto={{
                        name: selectedMarket.name,
                        symbol: selectedMarket.symbol,
                        price: marketStats.price,
                        change24h: marketStats.change24h
                      }}
                      onSubmit={handleOrderSubmit}
                      isLoading={isLoading}
                    />
                  </TabsContent>
                </Tabs>
              </Card>

              <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Portfolio</h2>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Portfolio 
                  selectedMarket={selectedMarket}
                  marketStats={marketStats}
                />
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
