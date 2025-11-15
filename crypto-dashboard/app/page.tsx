"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MetricsCard } from "@/components/metrics-card"
import { StatsChart } from "@/components/stats-chart"
import { VaultTable } from "@/components/vault-table"
import { BuySellButton } from "@/components/buy-sell-button"
import {
  BarChart3,
  ChevronDown,
  Globe,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Wallet,
  Search,
  Bell,
  User,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  Activity,
  Shield,
  Lock,
  Zap,
  Sparkles,
  LogOut
} from "lucide-react"
import { useState, Suspense } from "react"
import { SearchModal } from "@/components/search-modal"
import Link from "next/link"
import { ErrorBoundary } from "react-error-boundary"
import { Skeleton } from "@/components/ui/skeleton"
import { usePathname, useRouter } from "next/navigation"

interface MetricsData {
  title: string
  value: string
  change: {
    value: string
    percentage: string
    isPositive: boolean
  }
  icon: React.ReactNode
  color: string
}

const metricsData: MetricsData[] = [
  {
    title: "Total Volume",
    value: "$1.2B",
    change: {
      value: "+$120M",
      percentage: "+12.5%",
      isPositive: true
    },
    icon: <Activity className="h-5 w-5" />,
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    title: "Active Users",
    value: "12.5K",
    change: {
      value: "+1.2K",
      percentage: "+10.8%",
      isPositive: true
    },
    icon: <User className="h-5 w-5" />,
    color: "bg-green-500/20 text-green-400"
  },
  {
    title: "Security Score",
    value: "98.5%",
    change: {
      value: "+2.5%",
      percentage: "+2.6%",
      isPositive: true
    },
    icon: <Shield className="h-5 w-5" />,
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    title: "Transaction Speed",
    value: "0.8s",
    change: {
      value: "-0.2s",
      percentage: "-20%",
      isPositive: true
    },
    icon: <Zap className="h-5 w-5" />,
    color: "bg-yellow-500/20 text-yellow-400"
  }
]

const timeRanges = ["Today", "Last week", "Last month", "Last 6 months", "Year"]

interface TrendingAsset {
  name: string
  symbol: string
  price: string
  change: string
  isPositive: boolean
}

const trendingAssets: TrendingAsset[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$41,250", change: "+2.5%", isPositive: true },
  { name: "Ethereum", symbol: "ETH", price: "$2,485", change: "+1.8%", isPositive: true },
  { name: "Solana", symbol: "SOL", price: "$98.00", change: "+3.2%", isPositive: true },
  { name: "Polygon", symbol: "MATIC", price: "$0.85", change: "-1.5%", isPositive: false },
  { name: "Cardano", symbol: "ADA", price: "$0.58", change: "+0.8%", isPositive: true },
  { name: "Ripple", symbol: "XRP", price: "$0.62", change: "-0.5%", isPositive: false },
  { name: "Polkadot", symbol: "DOT", price: "$7.83", change: "+2.1%", isPositive: true },
  { name: "Chainlink", symbol: "LINK", price: "$18.94", change: "+1.2%", isPositive: true },
  { name: "Avalanche", symbol: "AVAX", price: "$36.75", change: "+4.3%", isPositive: true },
  { name: "Dogecoin", symbol: "DOGE", price: "$0.12", change: "-2.1%", isPositive: false },
  { name: "Litecoin", symbol: "LTC", price: "$71.23", change: "+1.5%", isPositive: true },
  { name: "Uniswap", symbol: "UNI", price: "$6.45", change: "+3.7%", isPositive: true },
]

export default function Page() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last week")
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum Network")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname === path
  
  const quickActions = [
    { 
      title: "Buy Crypto", 
      icon: <Plus className="h-5 w-5" />, 
      color: "bg-green-500/10 text-green-500",
      onClick: () => router.push("/buy")
    },
    { 
      title: "Send Assets", 
      icon: <ArrowRight className="h-5 w-5" />, 
      color: "bg-blue-500/10 text-blue-500",
      onClick: () => router.push("/send")
    },
    { 
      title: "Stake Tokens", 
      icon: <Lock className="h-5 w-5" />, 
      color: "bg-purple-500/10 text-purple-500",
      onClick: () => router.push("/stake")
    },
    { 
      title: "Swap Tokens", 
      icon: <Activity className="h-5 w-5" />, 
      color: "bg-yellow-500/10 text-yellow-500",
      onClick: () => router.push("/swap")
    },
  ]

  const networks = [
    { name: "Ethereum Network", color: "bg-blue-500" },
    { name: "BNB Chain", color: "bg-yellow-500" },
    { name: "Polygon", color: "bg-purple-500" },
    { name: "Avalanche", color: "bg-red-500" },
    { name: "Arbitrum", color: "bg-green-500" },
    { name: "Optimism", color: "bg-blue-400" },
    { name: "Base", color: "bg-pink-500" },
  ]

  const user = {
    name: "Admin",
    email: "admin@gmail.com",
    initial: "A"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-3xl"></div>
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
                placeholder="Search cryptocurrencies..."
                className="bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-400/50 pl-9 focus:ring-primary/50 backdrop-blur-sm"
                onClick={() => setSearchModalOpen(true)}
                readOnly
                aria-label="Search cryptocurrencies"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400/50" 
                aria-hidden="true"
              />
            </div>
          </div>
          <nav className="space-y-1 px-2" aria-label="Main navigation">
            <Link href="/">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30 ${isActive("/") ? "bg-gray-800/30 text-white" : ""}`}
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Dashboard</span>
              </Button>
            </Link>
            <Link href="/statistics">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30 ${isActive("/statistics") ? "bg-gray-800/30 text-white" : ""}`}
              >
                <BarChart3 className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Transaction History</span>
              </Button>
            </Link>
            <Link href="/market">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30 ${isActive("/market") ? "bg-gray-800/30 text-white" : ""}`}
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Market</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
              onClick={() => window.open("https://metamask.io/", "_blank")}
            >
              <Wallet className="h-4 w-4" aria-hidden="true" />
              <span className="text-white">Wallet</span>
            </Button>
            <Link href="/yield">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30 ${isActive("/yield") ? "bg-gray-800/30 text-white" : ""}`}
              >
                <Zap className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Yield Vaults</span>
              </Button>
            </Link>
            <Link href="/support">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30 ${isActive("/support") ? "bg-gray-800/30 text-white" : ""}`}
              >
                <LifeBuoy className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Support</span>
              </Button>
            </Link>
            <Link href="/settings">
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30 ${isActive("/settings") ? "bg-gray-800/30 text-white" : ""}`}
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Settings</span>
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="p-8 relative">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">Vaultify</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400/50 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400/50 hover:text-white"
                onClick={() => window.open("https://metamask.io/", "_blank")}
              >
                <Wallet className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400/50 hover:text-white"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <User className="h-5 w-5" />
                </Button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/80 border border-gray-800/50 rounded-md shadow-lg overflow-hidden z-20 backdrop-blur-xl">
                    <div className="p-4 border-b border-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.initial}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          localStorage.removeItem("auth")
                          router.push("/auth")
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300/80 hover:bg-gray-800/30"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative group">
                <Button variant="outline" className="gap-2 border-gray-700/50 text-gray-300/80 hover:text-white hover:border-primary/50">
                  <span className="bg-gradient-to-r from-gray-300/90 via-blue-400/90 to-purple-500/90 bg-clip-text text-transparent">{selectedNetwork}</span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/80 border border-gray-800/50 rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block backdrop-blur-xl">
                  <div className="py-1">
                    {networks.map((network) => (
                      <button
                        key={network.name}
                        onClick={() => setSelectedNetwork(network.name)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300/80 hover:bg-gray-800/30"
                      >
                        <div className={`w-3 h-3 rounded-full ${network.color}`}></div>
                        <span className="bg-gradient-to-r from-gray-300/90 via-blue-400/90 to-purple-500/90 bg-clip-text text-transparent">{network.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                className={`h-24 flex flex-col items-center justify-center gap-2 ${action.color} hover:opacity-90 transition-opacity backdrop-blur-sm`}
                onClick={action.onClick}
              >
                {action.icon}
                <span className="bg-gradient-to-r from-gray-300/90 via-blue-400/90 to-purple-500/90 bg-clip-text text-transparent">{action.title}</span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ErrorBoundary fallback={<div>Error loading metrics</div>}>
              <Suspense fallback={<Skeleton className="h-[120px] w-full bg-gray-800/30 backdrop-blur-sm" />}>
                {metricsData.map((metric) => (
                  <MetricsCard
                    key={metric.title}
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    icon={metric.icon}
                    color={metric.color}
                  />
                ))}
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">General Statistics</h2>
              </div>
              <ErrorBoundary fallback={<div>Error loading statistics</div>}>
                <Suspense fallback={<Skeleton className="h-[400px] w-full bg-gray-800/30 backdrop-blur-sm" />}>
                  <StatsChart />
                </Suspense>
              </ErrorBoundary>
            </Card>

            <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">Trending Assets</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50">
                    <span className="text-sm">View All</span>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingAssets.map((asset) => (
                  <div 
                    key={asset.symbol} 
                    className="group relative p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm border border-gray-800/30 hover:border-primary/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-xs font-bold backdrop-blur-sm relative">
                            <span className="text-white">{asset.symbol[0]}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-primary transition-colors duration-300">{asset.name}</p>
                          <p className="text-sm text-gray-400">{asset.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">{asset.price}</p>
                        <div className={`flex items-center gap-1 justify-end ${asset.isPositive ? "text-green-400" : "text-red-400"}`}>
                          {asset.isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <p className="text-sm">{asset.change}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <ErrorBoundary fallback={<div>Error loading vault table</div>}>
              <Suspense fallback={<Skeleton className="h-[400px] w-full bg-gray-800/30 backdrop-blur-sm" />}>
                <VaultTable />
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
      <BuySellButton />
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </div>
  )
}
