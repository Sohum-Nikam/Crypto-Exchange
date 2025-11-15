"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Market {
  name: string
  symbol: string
  price: number
  change24h: number
}

interface MarketStats {
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

interface PortfolioProps {
  selectedMarket: Market
  marketStats: MarketStats
}

export function Portfolio({ selectedMarket, marketStats }: PortfolioProps) {
// Mock portfolio data
  const portfolio = {
    totalValue: 10000,
    assets: [
  {
    symbol: "BTC",
    amount: 0.5,
        value: 5000,
        change24h: 2.5
  },
  {
    symbol: "ETH",
        amount: 5,
    value: 5000,
        change24h: -1.2
      }
    ]
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Your Portfolio</h3>
        <span className="text-sm text-muted-foreground">Total Value</span>
      </div>

      <div className="text-2xl font-bold mb-4">${portfolio.totalValue.toLocaleString()}</div>

      <div className="space-y-4">
        {portfolio.assets.map((asset) => (
          <div key={asset.symbol} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="font-medium">{asset.symbol}</div>
                <div className="text-xs text-muted-foreground">{asset.amount} {asset.symbol}</div>
              </div>
              <div className="text-right">
                <div>${asset.value.toLocaleString()}</div>
                <div className={`text-xs ${asset.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
                </div>
              </div>
            </div>
            <Progress value={asset.amount} className="h-1" />
          </div>
        ))}
      </div>
    </Card>
  )
}

