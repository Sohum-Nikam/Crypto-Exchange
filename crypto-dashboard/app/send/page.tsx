"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft,
  Copy,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Asset {
  id: string
  name: string
  symbol: string
  balance: string
  value: string
}

interface Transaction {
  id: string
  type: "send" | "receive"
  asset: string
  amount: string
  address: string
  status: "pending" | "completed" | "failed"
  timestamp: string
}

const assets: Asset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0.1",
    value: "$4,125.04"
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    balance: "2.5",
    value: "$6,213.75"
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    balance: "1,000",
    value: "$1,000.00"
  }
]

const transactions: Transaction[] = [
  {
    id: "1",
    type: "send",
    asset: "ETH",
    amount: "0.5",
    address: "0x7f...3d4f",
    status: "completed",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    type: "receive",
    asset: "BTC",
    amount: "0.1",
    address: "0x9a...7b2c",
    status: "completed",
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    type: "send",
    asset: "USDC",
    amount: "500",
    address: "0x3b...8f2d",
    status: "pending",
    timestamp: "1 hour ago"
  }
]

export default function SendPage() {
  const [selectedAsset, setSelectedAsset] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [recipientAddress, setRecipientAddress] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)

  const handleSend = async () => {
    if (!selectedAsset || !amount || !recipientAddress) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Transaction sent successfully")
      setAmount("")
      setRecipientAddress("")
    } catch (error) {
      toast.error("Failed to send transaction")
    } finally {
      setIsLoading(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(recipientAddress)
    setAddressCopied(true)
    setTimeout(() => setAddressCopied(false), 2000)
  }

  const formatNumber = (value: string) => {
    return parseFloat(value).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Send Assets</h1>
            <p className="text-sm text-gray-400">Transfer your crypto assets securely</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2 border-gray-700 text-gray-300 hover:text-white hover:border-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-6 text-white">Send Assets</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="asset" className="text-white">Select Asset</Label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger className="bg-gray-800/30 border-gray-700/50 text-white">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{asset.name}</span>
                          <span className="text-gray-400">({asset.balance} {asset.symbol})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-800/30 border-gray-700/50 text-white"
                />
                {selectedAsset && (
                  <p className="text-sm text-white">
                    Available: {assets.find(a => a.id === selectedAsset)?.balance} {assets.find(a => a.id === selectedAsset)?.symbol}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-white">Recipient Address</Label>
                <div className="relative">
                  <Input
                    id="address"
                    placeholder="Enter recipient address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="bg-gray-800/30 border-gray-700/50 pr-10 text-white"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
                    onClick={copyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {addressCopied && (
                  <p className="text-sm text-green-400">Address copied to clipboard</p>
                )}
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleSend}
                disabled={isLoading || !selectedAsset || !amount || !recipientAddress}
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <p className="text-sm text-yellow-500">
                    Please double-check the recipient address before sending. Transactions cannot be reversed.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-6 text-white">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 bg-gray-800/30 rounded-lg text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {tx.type === "send" ? (
                        <Send className="h-4 w-4 text-red-500" />
                      ) : (
                        <Send className="h-4 w-4 text-green-500 rotate-180" />
                      )}
                      <span className="font-medium">
                        {tx.type === "send" ? "Sent" : "Received"} {tx.asset}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{tx.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {tx.type === "send" ? "To" : "From"}: {tx.address}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={tx.type === "send" ? "text-red-500" : "text-green-500"}>
                        {tx.type === "send" ? "-" : "+"}{tx.amount} {tx.asset}
                      </span>
                      {tx.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : tx.status === "pending" ? (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 