"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  QrCode,
  Send,
  Receive,
  Settings,
  User
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const assets = [
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "2.5",
    value: "$6,213.75",
    change: "+1.8%",
    isPositive: true
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0.1",
    value: "$4,125.04",
    change: "+2.5%",
    isPositive: true
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    balance: "1,000",
    value: "$1,000.00",
    change: "0%",
    isPositive: true
  }
]

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState("assets")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Wallet</h1>
            <p className="text-sm text-gray-400">Manage your assets and transactions</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2 border-gray-700 text-gray-300 hover:text-white hover:border-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-sm text-gray-400">john.doe@example.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2 border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                  <QrCode className="h-4 w-4" />
                  Show QR Code
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-gray-800/50 hover:bg-gray-800">
                  <Send className="h-6 w-6" />
                  <span>Send</span>
                </Button>
                <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-gray-800/50 hover:bg-gray-800">
                  <Receive className="h-6 w-6" />
                  <span>Receive</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Wallet Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Total Balance</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {showBalance ? "$11,338.79" : "****"}
                </p>
                <div className="flex items-center text-green-500">
                  <span className="text-sm">+2.1%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <Button
                    variant={activeTab === "assets" ? "default" : "ghost"}
                    onClick={() => setActiveTab("assets")}
                  >
                    Assets
                  </Button>
                  <Button
                    variant={activeTab === "activity" ? "default" : "ghost"}
                    onClick={() => setActiveTab("activity")}
                  >
                    Activity
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Explorer
                </Button>
              </div>

              {activeTab === "assets" && (
                <div className="space-y-4">
                  {assets.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                          {asset.symbol[0]}
                        </div>
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-sm text-gray-400">{asset.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{showBalance ? asset.value : "****"}</p>
                        <p className="text-sm text-gray-400">
                          {showBalance ? `${asset.balance} ${asset.symbol}` : "****"}
                        </p>
                        <p className={`text-sm ${asset.isPositive ? "text-green-500" : "text-red-500"}`}>
                          {asset.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "activity" && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-red-500" />
                        <span className="font-medium">Sent ETH</span>
                      </div>
                      <span className="text-sm text-gray-400">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">To: 0x7f...3d4f</span>
                      <span className="text-red-500">-0.5 ETH</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Receive className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Received BTC</span>
                      </div>
                      <span className="text-sm text-gray-400">5 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">From: 0x9a...7b2c</span>
                      <span className="text-green-500">+0.1 BTC</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 