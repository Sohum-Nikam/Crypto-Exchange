"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Volume2,
  ArrowUp,
  ArrowDown,
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
  Plus,
  Minus,
  RefreshCw,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  LayoutDashboard,
  ArrowUpDown,
  Info,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Token {
  id: string
  symbol: string
  name: string
  image: string
  price: number
  balance: number
  value: number
}

const mockTokens: Token[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    price: 50000,
    balance: 0.5,
    value: 25000
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    price: 3000,
    balance: 5,
    value: 15000
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
    price: 1,
    balance: 1000,
    value: 1000
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    price: 100,
    balance: 50,
    value: 5000
  }
]

interface SwapQuote {
  fromToken: Token
  toToken: Token
  fromAmount: number
  toAmount: number
  priceImpact: number
  fee: number
  minimumReceived: number
  route: string[]
}

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [slippage, setSlippage] = useState(0.5)
  const [quote, setQuote] = useState<SwapQuote | null>(null)

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      setIsLoading(true)
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Mock quote calculation
      const fromAmountNum = parseFloat(fromAmount)
      const toAmountNum = (fromAmountNum * fromToken.price) / toToken.price
      const priceImpact = Math.random() * 0.5
      const fee = fromAmountNum * 0.003 // 0.3% fee
      
      setQuote({
        fromToken,
        toToken,
        fromAmount: fromAmountNum,
        toAmount: toAmountNum,
        priceImpact,
        fee,
        minimumReceived: toAmountNum * (1 - slippage / 100),
        route: [fromToken.symbol, "USDC", toToken.symbol]
      })
      
      setToAmount(toAmountNum.toFixed(6))
    } catch (error) {
      console.error('Error getting swap quote:', error)
      toast.error("Failed to get swap quote")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmSwap = async () => {
    if (!quote) return

    try {
      setIsLoading(true)
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast.success("Swap executed successfully")
      setFromAmount("")
      setToAmount("")
      setQuote(null)
    } catch (error) {
      console.error('Error executing swap:', error)
      toast.error("Failed to execute swap")
    } finally {
      setIsLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
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
              <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30">
                <LineChart className="h-4 w-4" />
                <span>Trading</span>
              </Button>
            </Link>
            <Link href="/buy">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30">
                <Plus className="h-4 w-4" />
                <span>Buy Crypto</span>
              </Button>
            </Link>
            <Link href="/send">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30">
                <ArrowRight className="h-4 w-4" />
                <span>Send Assets</span>
              </Button>
            </Link>
            <Link href="/stake">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30">
                <Percent className="h-4 w-4" />
                <span>Stake Tokens</span>
              </Button>
            </Link>
            <Link href="/swap">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white bg-gray-800/30">
                <RefreshCw className="h-4 w-4" />
                <span>Swap Tokens</span>
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="p-6 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Swap Tokens</h1>
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

          <div className="max-w-xl mx-auto">
            <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
              <div className="space-y-4">
                {/* From Token */}
                <div className="space-y-2 text-white">
                  <Label>From</Label>
                  <div className="flex gap-2">
                    <Select onValueChange={(value) => setFromToken(mockTokens.find(t => t.id === value) || null)}>
                      <SelectTrigger className="flex-1 bg-gray-800/30 border-gray-700/50">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTokens.map((token) => (
                          <SelectItem key={token.id} value={token.id}>
                            <div className="flex items-center gap-2">
                              <img src={token.image} alt={token.name} className="h-6 w-6 rounded-full" />
                              <span>{token.name}</span>
                              <span className="text-gray-400">({token.symbol})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1 bg-gray-800/30 border-gray-700/50"
                      placeholder="0.00"
                    />
                  </div>
                  {fromToken && (
                    <p className="text-sm text-gray-400">
                      Balance: {fromToken.balance} {fromToken.symbol} (${formatNumber(fromToken.value)})
                    </p>
                  )}
                </div>

                {/* Swap Button */}
                <div className="flex justify-center text-blue-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-gray-800/30 hover:bg-gray-800/50"
                    onClick={() => {
                      const temp = fromToken
                      setFromToken(toToken)
                      setToToken(temp)
                      const tempAmount = fromAmount
                      setFromAmount(toAmount)
                      setToAmount(tempAmount)
                    }}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="space-y-2 text-white">
                  <Label>To</Label>
                  <div className="flex gap-2">
                    <Select onValueChange={(value) => setToToken(mockTokens.find(t => t.id === value) || null)}>
                      <SelectTrigger className="flex-1 bg-gray-800/30 border-gray-700/50">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTokens.map((token) => (
                          <SelectItem key={token.id} value={token.id}>
                            <div className="flex items-center gap-2">
                              <img src={token.image} alt={token.name} className="h-6 w-6 rounded-full" />
                              <span>{token.name}</span>
                              <span className="text-gray-400">({token.symbol})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="flex-1 bg-gray-800/30 border-gray-700/50"
                      placeholder="0.00"
                      readOnly
                    />
                  </div>
                  {toToken && (
                    <p className="text-sm text-gray-400">
                      Balance: {toToken.balance} {toToken.symbol} (${formatNumber(toToken.value)})
                    </p>
                  )}
                </div>

                {/* Swap Button */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={quote ? handleConfirmSwap : handleSwap}
                  disabled={isLoading || !fromToken || !toToken || !fromAmount}
                >
                  {isLoading ? "Processing..." : quote ? "Confirm Swap" : "Get Quote"}
                </Button>

                {/* Swap Details */}
                {quote && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h3 className="font-medium mb-2">Swap Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price Impact</span>
                          <span className={quote.priceImpact > 0.1 ? "text-red-400" : "text-green-400"}>
                            {quote.priceImpact.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fee</span>
                          <span>{quote.fee.toFixed(6)} {quote.fromToken.symbol}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Minimum Received</span>
                          <span>{quote.minimumReceived.toFixed(6)} {quote.toToken.symbol}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Route</span>
                          <span>{quote.route.join(" → ")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="text-sm text-yellow-500">
                          <p className="font-medium">Important:</p>
                          <p>Please review the swap details carefully before confirming. Transactions cannot be reversed.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 