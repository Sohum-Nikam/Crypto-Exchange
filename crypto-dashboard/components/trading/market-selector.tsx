/*
  DEPRECATED: This duplicate MarketSelector component is no longer in use.
  Please import MarketSelector from '@/components/market-selector' instead.
*/

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Search } from "lucide-react"

// Mock market data
const markets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 43643.21,
    change24h: 2.34,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 2323.87,
    change24h: 3.12,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 143.52,
    change24h: 5.67,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change24h: -1.23,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: 563.21,
    change24h: 0.87,
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 0.62,
    change24h: -0.45,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 7.83,
    change24h: 2.11,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.12,
    change24h: 8.92,
  },
]

interface MarketSelectorProps {
  selectedCrypto: {
    name: string
    symbol: string
    price: number
    change24h: number
  }
  onSelectCrypto: (crypto: any) => void
}

export function MarketSelector({ selectedCrypto, onSelectCrypto }: MarketSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMarkets = markets.filter(
    (market) =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Markets</h3>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search markets..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filteredMarkets.map((market) => (
          <div
            key={market.symbol}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-secondary/20 ${
              selectedCrypto.symbol === market.symbol ? "bg-secondary/30" : ""
            }`}
            onClick={() => onSelectCrypto(market)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <img src={`/placeholder.svg?height=32&width=32&text=${market.symbol}`} alt={market.name} />
              </Avatar>
              <div>
                <div className="font-medium">{market.name}</div>
                <div className="text-xs text-muted-foreground">{market.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div>${market.price.toLocaleString()}</div>
              <div className={`text-xs ${market.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {market.change24h >= 0 ? "+" : ""}
                {market.change24h}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
