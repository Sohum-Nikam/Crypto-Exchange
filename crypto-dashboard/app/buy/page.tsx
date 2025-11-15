"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  BarChart3,
  DollarSign,
  Activity,
  Users,
  Droplet
} from "lucide-react"
import Link from "next/link"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
  price_change_percentage_7d_in_currency: number
  price_change_percentage_30d_in_currency: number
  price_change_percentage_1y_in_currency: number
  price_change_percentage_5y_in_currency: number
  sparkline_in_7d: {
    price: number[]
  }
}

export default function BuyPage() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m")
  const [sortBy, setSortBy] = useState("market_cap_rank")

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d,30d,1y,5y"
      )
      const data = await response.json()
      setCryptos(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching crypto data:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()
  }, [])

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const getChartData = (prices: number[]) => {
    const labels = Array.from({ length: prices.length }, (_, i) => i + 1)
    return {
      labels,
      datasets: [
        {
          label: 'Price',
          data: prices,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          tension: 0.4,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Buy Crypto</h1>
            <p className="text-sm text-gray-400">Browse and buy cryptocurrencies</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2 border-gray-700 text-gray-300 hover:text-white hover:border-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder="Search cryptocurrencies..."
              className="bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-400/50 pl-9 focus:ring-primary/50 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400/50" />
          </div>
        </div>

        <Tabs defaultValue="6m" className="mb-6">
          <TabsList className="bg-gray-800/30 border border-gray-700/50">
            <TabsTrigger value="6m" onClick={() => setSelectedTimeframe("6m")}>6 Months</TabsTrigger>
            <TabsTrigger value="1y" onClick={() => setSelectedTimeframe("1y")}>1 Year</TabsTrigger>
            <TabsTrigger value="5y" onClick={() => setSelectedTimeframe("5y")}>5 Years</TabsTrigger>
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-4 bg-gray-800/30 animate-pulse">
                <div className="h-8 bg-gray-700/50 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-700/50 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCryptos.map((crypto) => (
              <Card key={crypto.id} className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-medium text-white">{crypto.name}</h3>
                      <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${crypto.current_price.toLocaleString()}</p>
                    <div className={`flex items-center gap-1 justify-end ${crypto.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <p className="text-sm">{crypto.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>

                <div className="h-24 mb-4">
                  <Line data={getChartData(crypto.sparkline_in_7d.price)} options={chartOptions} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      <span>Market Cap</span>
                    </div>
                    <p className="text-white">{formatNumber(crypto.market_cap)}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Activity className="h-4 w-4" />
                      <span>Volume (24h)</span>
                    </div>
                    <p className="text-white">{formatNumber(crypto.total_volume)}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <BarChart3 className="h-4 w-4" />
                      <span>Rank</span>
                    </div>
                    <p className="text-white">#{crypto.market_cap_rank}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Droplet className="h-4 w-4" />
                      <span>Liquidity</span>
                    </div>
                    <p className="text-white">High</p>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                  Buy {crypto.symbol.toUpperCase()}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 