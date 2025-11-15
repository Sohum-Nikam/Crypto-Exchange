"use client"

import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CryptoPerformanceGraph } from "@/components/crypto-performance-graph"

// Mock data for top blockchain networks
const chainsData = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    tvl: "$48.2B",
    change24h: 3.12,
    marketShare: 32,
    performance: [2250, 2280, 2310, 2290, 2320, 2300, 2325],
    protocols: 1452,
    description: "Smart contract platform powering DeFi and NFTs",
  },
  {
    id: "binance",
    name: "BNB Chain",
    symbol: "BNB",
    tvl: "$12.8B",
    change24h: 0.87,
    marketShare: 18,
    performance: [558, 560, 562, 561, 563, 562, 563],
    protocols: 612,
    description: "Binance's blockchain for DeFi, GameFi, and SocialFi",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    tvl: "$8.4B",
    change24h: 5.67,
    marketShare: 14,
    performance: [135, 138, 140, 142, 141, 143, 144],
    protocols: 284,
    description: "High-performance blockchain with fast transactions",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    symbol: "ARB",
    tvl: "$6.2B",
    change24h: 2.54,
    marketShare: 10,
    performance: [1.12, 1.14, 1.15, 1.13, 1.16, 1.15, 1.16],
    protocols: 187,
    description: "Ethereum L2 scaling solution with lower fees",
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    tvl: "$4.1B",
    change24h: 1.23,
    marketShare: 8,
    performance: [0.85, 0.86, 0.87, 0.86, 0.88, 0.87, 0.88],
    protocols: 423,
    description: "Ethereum scaling platform for Web3 applications",
  },
]

export function TopChains() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Top Performing Blockchain Networks</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chainsData.map((chain) => (
          <Card key={chain.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <img src={`/placeholder.svg?height=48&width=48&text=${chain.symbol}`} alt={chain.name} />
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{chain.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">{chain.symbol}</span>
                    <span className={`text-sm ${chain.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {chain.change24h >= 0 ? "+" : ""}
                      {chain.change24h}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total Value Locked</div>
                <div className="font-semibold">{chain.tvl}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Market Share</span>
                <span>{chain.marketShare}%</span>
              </div>
              <Progress value={chain.marketShare} className="h-2" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Active Protocols</div>
                <div className="font-medium">{chain.protocols}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Description</div>
                <div className="text-sm">{chain.description}</div>
              </div>
            </div>

            <div className="mt-4 h-[120px]">
              <CryptoPerformanceGraph data={chain.performance} change={chain.change24h} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
