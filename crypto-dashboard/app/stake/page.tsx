"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft,
  Lock,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface StakingOption {
  id: string
  name: string
  symbol: string
  image: string
  apy: number
  minStake: number
  lockPeriod: number
  totalStaked: number
  maxStake: number
  rewards: {
    daily: number
    monthly: number
    yearly: number
  }
}

interface StakingPosition {
  id: string
  option: StakingOption
  amount: number
  startDate: string
  endDate: string
  rewards: number
  status: "active" | "completed" | "failed"
}

const stakingOptions: StakingOption[] = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    apy: 5.2,
    minStake: 0.1,
    lockPeriod: 30,
    totalStaked: 150000,
    maxStake: 100,
    rewards: {
      daily: 0.014,
      monthly: 0.43,
      yearly: 5.2
    }
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    apy: 7.8,
    minStake: 1,
    lockPeriod: 60,
    totalStaked: 85000,
    maxStake: 1000,
    rewards: {
      daily: 0.021,
      monthly: 0.65,
      yearly: 7.8
    }
  },
  {
    id: "dot",
    name: "Polkadot",
    symbol: "DOT",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    apy: 12.5,
    minStake: 10,
    lockPeriod: 90,
    totalStaked: 45000,
    maxStake: 5000,
    rewards: {
      daily: 0.034,
      monthly: 1.04,
      yearly: 12.5
    }
  }
]

const stakingPositions: StakingPosition[] = [
  {
    id: "1",
    option: stakingOptions[0],
    amount: 2.5,
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    rewards: 0.11,
    status: "active"
  },
  {
    id: "2",
    option: stakingOptions[1],
    amount: 50,
    startDate: "2024-02-15",
    endDate: "2024-04-15",
    rewards: 0.65,
    status: "active"
  }
]

export default function StakePage() {
  const [selectedOption, setSelectedOption] = useState<StakingOption | null>(null)
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleStake = async () => {
    if (!selectedOption || !amount) {
      toast.error("Please select a token and enter an amount")
      return
    }

    const stakeAmount = parseFloat(amount)
    if (stakeAmount < selectedOption.minStake) {
      toast.error(`Minimum stake amount is ${selectedOption.minStake} ${selectedOption.symbol}`)
      return
    }

    if (stakeAmount > selectedOption.maxStake) {
      toast.error(`Maximum stake amount is ${selectedOption.maxStake} ${selectedOption.symbol}`)
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Successfully staked tokens")
      setAmount("")
      setSelectedOption(null)
    } catch (error) {
      toast.error("Failed to stake tokens")
    } finally {
      setIsLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Stake Tokens</h1>
            <p className="text-sm text-gray-400">Earn rewards by staking your tokens</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2 border-gray-700 text-gray-300 hover:text-white hover:border-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl text-white">
              <h2 className="text-xl font-semibold mb-6">Available Staking Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border ${
                      selectedOption?.id === option.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-800/50 bg-gray-800/30"
                    } cursor-pointer hover:border-primary/50 transition-colors`}
                    onClick={() => setSelectedOption(option)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img src={option.image} alt={option.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <h3 className="font-medium text-white">{option.name}</h3>
                        <p className="text-sm text-gray-400">{option.symbol}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">APY</span>
                        <span className="text-green-400 font-medium">{option.apy}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Lock Period</span>
                        <span className="text-white">{option.lockPeriod} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Min Stake</span>
                        <span className="text-white">{option.minStake} {option.symbol}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Max Stake</span>
                        <span className="text-white">{option.maxStake} {option.symbol}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedOption && (
              <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
                <h2 className="text-xl font-semibold mb-6">Stake {selectedOption.name}</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Stake</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder={`Enter amount (min ${selectedOption.minStake} ${selectedOption.symbol})`}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-gray-800/30 border-gray-700/50"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Estimated Rewards</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-800/30 rounded-lg">
                        <p className="text-sm text-gray-400">Daily</p>
                        <p className="text-lg font-medium text-white">
                          {formatNumber(parseFloat(amount || "0") * selectedOption.rewards.daily / 100)} {selectedOption.symbol}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-800/30 rounded-lg">
                        <p className="text-sm text-gray-400">Monthly</p>
                        <p className="text-lg font-medium text-white">
                          {formatNumber(parseFloat(amount || "0") * selectedOption.rewards.monthly / 100)} {selectedOption.symbol}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-800/30 rounded-lg">
                        <p className="text-sm text-gray-400">Yearly</p>
                        <p className="text-lg font-medium text-white">
                          {formatNumber(parseFloat(amount || "0") * selectedOption.rewards.yearly / 100)} {selectedOption.symbol}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <p className="text-sm text-yellow-500">
                        Your tokens will be locked for {selectedOption.lockPeriod} days. Early unstaking is not allowed.
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleStake}
                    disabled={isLoading || !amount}
                  >
                    {isLoading ? "Staking..." : "Stake Tokens"}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <Card className="p-6 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-6 text-white">Active Staking Positions</h2>
            <div className="space-y-4">
              {stakingPositions.map((position) => (
                <div key={position.id} className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={position.option.image} alt={position.option.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-medium text-white">{position.option.name}</h3>
                      <p className="text-sm text-gray-400">{position.amount} {position.option.symbol}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Start Date</span>
                      <span className="text-white">{new Date(position.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">End Date</span>
                      <span className="text-white">{new Date(position.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Rewards Earned</span>
                      <span className="text-green-400">{formatNumber(position.rewards)} {position.option.symbol}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Status</span>
                      <div className="flex items-center gap-1">
                        {position.status === "active" ? (
                          <>
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-yellow-500">Active</span>
                          </>
                        ) : position.status === "completed" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-green-500">Completed</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-red-500">Failed</span>
                          </>
                        )}
                      </div>
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