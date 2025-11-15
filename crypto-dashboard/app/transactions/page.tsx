"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Search,
  Settings,
  User,
  Wallet,
  Zap
} from "lucide-react"

const transactions = [
  {
    id: 1,
    asset: "Bitcoin",
    amount: "$46,975",
    type: "buy",
    date: "2024-03-15",
    status: "completed"
  },
  {
    id: 2,
    asset: "Ethereum",
    amount: "$3,250",
    type: "sell",
    date: "2024-03-14",
    status: "completed"
  },
  {
    id: 3,
    asset: "Solana",
    amount: "$98.50",
    type: "buy",
    date: "2024-03-13",
    status: "pending"
  },
  {
    id: 4,
    asset: "Polygon",
    amount: "$0.85",
    type: "buy",
    date: "2024-03-12",
    status: "completed"
  },
  {
    id: 5,
    asset: "Cardano",
    amount: "$0.58",
    type: "sell",
    date: "2024-03-11",
    status: "completed"
  }
]

export default function TransactionsPage() {
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
                placeholder="Search transactions..."
                className="bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-400/50 pl-9 focus:ring-primary/50 backdrop-blur-sm"
                readOnly
                aria-label="Search transactions"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400/50" 
                aria-hidden="true"
              />
            </div>
          </div>
          <nav className="space-y-1 px-2" aria-label="Main navigation">
            <Link href="/trading">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Dashboard</span>
              </Button>
            </Link>
            <Link href="/statistics">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
              >
                <BarChart3 className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Statistics & Income</span>
              </Button>
            </Link>
            <Link href="/market">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Market</span>
              </Button>
            </Link>
            <Link href="/wallet">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
              >
                <Wallet className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Wallet</span>
              </Button>
            </Link>
            <Link href="/yield">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
              >
                <Zap className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Yield Vaults</span>
              </Button>
            </Link>
            <Link href="/support">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
              >
                <LifeBuoy className="h-4 w-4" aria-hidden="true" />
                <span className="text-white">Support</span>
              </Button>
            </Link>
            <Link href="/settings">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-white hover:text-white hover:bg-gray-800/30"
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">Transaction History</h1>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">Recent Transactions</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50">
                    <span className="text-sm">Export</span>
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700/50 text-gray-400 hover:text-white hover:border-primary/50">
                    <span className="text-sm">Filter</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="group relative p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm border border-gray-800/30 hover:border-primary/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className={`w-10 h-10 rounded-full ${transaction.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center text-xs font-bold backdrop-blur-sm relative`}>
                            {transaction.type === 'buy' ? (
                              <ArrowDown className="h-5 w-5 text-green-400" />
                            ) : (
                              <ArrowUp className="h-5 w-5 text-red-400" />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-primary transition-colors duration-300">{transaction.asset}</p>
                          <p className="text-sm text-gray-400">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">{transaction.amount}</p>
                        <div className={`flex items-center gap-1 justify-end ${transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {transaction.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                          <p className="text-sm capitalize">{transaction.status}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 