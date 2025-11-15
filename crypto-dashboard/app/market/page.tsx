"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TradingChart } from "@/components/trading/trading-chart"
import { 
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
  LayoutDashboard,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Globe,
  X,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Market {
  id: string
  name: string
  symbol: string
  chain: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  isFavorite?: boolean
}

const chains = [
  { name: "Ethereum", color: "bg-blue-500" },
  { name: "BNB Chain", color: "bg-yellow-500" },
  { name: "Polygon", color: "bg-purple-500" },
  { name: "Avalanche", color: "bg-red-500" },
  { name: "Arbitrum", color: "bg-green-500" },
  { name: "Optimism", color: "bg-blue-400" },
  { name: "Base", color: "bg-pink-500" },
]

const markets: Market[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    chain: "Bitcoin",
    price: 41250.32,
    change24h: 2.5,
    volume24h: 25000000000,
    marketCap: 800000000000,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    chain: "Ethereum",
    price: 2485.75,
    change24h: 1.8,
    volume24h: 15000000000,
    marketCap: 300000000000,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    chain: "Solana",
    price: 98.00,
    change24h: 3.2,
    volume24h: 5000000000,
    marketCap: 42000000000,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    chain: "Cardano",
    price: 0.58,
    change24h: 0.8,
    volume24h: 1000000000,
    marketCap: 20000000000,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    chain: "Polkadot",
    price: 7.83,
    change24h: 2.1,
    volume24h: 800000000,
    marketCap: 10000000000,
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    chain: "Ethereum",
    price: 18.94,
    change24h: 1.2,
    volume24h: 600000000,
    marketCap: 9000000000,
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    chain: "Avalanche",
    price: 36.75,
    change24h: 4.3,
    volume24h: 1200000000,
    marketCap: 13000000000,
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    chain: "Ethereum",
    price: 6.45,
    change24h: 3.7,
    volume24h: 400000000,
    marketCap: 5000000000,
  },
]

export default function MarketPage() {
  const [selectedMarket, setSelectedMarket] = useState<Market>(markets[0])
  const [chartType, setChartType] = useState<"line" | "candlestick" | "area">("candlestick")
  const [timeframe, setTimeframe] = useState("1h")
  const [searchQuery, setSearchQuery] = useState("")
  const [showBuySell, setShowBuySell] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof Market; direction: 'asc' | 'desc' } | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredMarkets = markets.filter(market => 
    market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (key: keyof Market) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        }
      }
      return {
        key,
        direction: 'asc'
      }
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(2)}B`
    }
    return `$${(volume / 1000000).toFixed(2)}M`
  }

  const formatMarketCap = (cap: number) => {
    if (cap >= 1000000000) {
      return `$${(cap / 1000000000).toFixed(2)}B`
    }
    return `$${(cap / 1000000).toFixed(2)}M`
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
        <aside className="border-r border-gray-800/50 bg-gray-900/30 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-2 border-b border-gray-800/50 px-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-400 to-purple-500 rounded-lg blur opacity-20"></div>
              <Wallet className="h-6 w-6 text-white relative" aria-hidden="true" />
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="relative">
              <Input
                placeholder="Search markets..."
                className="bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-400/50 pl-9 focus:ring-primary/50 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <Link href="/market">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30">
                <Globe className="h-4 w-4" />
                <span>Markets</span>
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

        <main className="p-8 relative">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">Markets</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400/50 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400/50 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Market Overview</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50 ${chartType === "line" ? "bg-primary/10 border-primary/50 text-white" : ""}`}
                    onClick={() => setChartType("line")}
                  >
                    <LineChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50 ${chartType === "candlestick" ? "bg-primary/10 border-primary/50 text-white" : ""}`}
                    onClick={() => setChartType("candlestick")}
                  >
                    <CandlestickChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50 ${chartType === "area" ? "bg-primary/10 border-primary/50 text-white" : ""}`}
                    onClick={() => setChartType("area")}
                  >
                    <AreaChart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <TradingChart symbol={selectedMarket.id} type={chartType} timeframe={timeframe} />
            </Card>

            <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">All Markets</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50">
                    <span className="text-sm">View All</span>
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400">
                      <th className="pb-4 font-medium cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center gap-1">
                          Asset
                          {sortConfig?.key === 'name' && (
                            sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="pb-4 font-medium">Chain</th>
                      <th className="pb-4 font-medium text-right cursor-pointer" onClick={() => handleSort('price')}>
                        <div className="flex items-center justify-end gap-1">
                          Price
                          {sortConfig?.key === 'price' && (
                            sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="pb-4 font-medium text-right cursor-pointer" onClick={() => handleSort('change24h')}>
                        <div className="flex items-center justify-end gap-1">
                          24h Change
                          {sortConfig?.key === 'change24h' && (
                            sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="pb-4 font-medium text-right cursor-pointer" onClick={() => handleSort('volume24h')}>
                        <div className="flex items-center justify-end gap-1">
                          24h Volume
                          {sortConfig?.key === 'volume24h' && (
                            sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="pb-4 font-medium text-right cursor-pointer" onClick={() => handleSort('marketCap')}>
                        <div className="flex items-center justify-end gap-1">
                          Market Cap
                          {sortConfig?.key === 'marketCap' && (
                            sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="pb-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {sortedMarkets.map((market) => (
                      <tr 
                        key={market.id}
                        className="group cursor-pointer hover:bg-gray-800/30 transition-colors"
                        onClick={() => {
                          setSelectedMarket(market)
                          setShowBuySell(true)
                        }}
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-xs font-bold backdrop-blur-sm relative">
                                <span className="text-white">{market.symbol[0]}</span>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-white group-hover:text-primary transition-colors duration-300">{market.name}</p>
                              <p className="text-sm text-gray-400">{market.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${chains.find(c => c.name === market.chain)?.color ?? 'bg-gray-500'}`}></div>
                            <span className="text-white">{market.chain}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <p className="text-white">{formatPrice(market.price)}</p>
                        </td>
                        <td className="py-4 text-right">
                          <div className={`flex items-center gap-1 justify-end ${market.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {market.change24h >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <p className="text-sm">{Math.abs(market.change24h)}%</p>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <p className="text-white">{formatVolume(market.volume24h)}</p>
                        </td>
                        <td className="py-4 text-right">
                          <p className="text-white">{formatMarketCap(market.marketCap)}</p>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Star className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showBuySell && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-xs font-bold backdrop-blur-sm">
                    <span className="text-white">{selectedMarket.symbol[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{selectedMarket.name}</p>
                    <p className="text-sm text-gray-400">{selectedMarket.symbol}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => setShowBuySell(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  <Plus className="h-4 w-4 mr-2" />
                  Buy
                </Button>
                <Button className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                  <Minus className="h-4 w-4 mr-2" />
                  Sell
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 