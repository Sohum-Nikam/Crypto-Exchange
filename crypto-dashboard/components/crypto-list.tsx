"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { CryptoPerformanceGraph } from "@/components/crypto-performance-graph"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

// Mock data for cryptocurrencies
const cryptoData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: "$43,643.21",
    change24h: 2.34,
    marketCap: "$843.5B",
    volume: "$28.4B",
    rating: 4.8,
    performance: [42100, 42300, 43100, 42800, 43500, 43200, 43600],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,323.87",
    change24h: 3.12,
    marketCap: "$278.9B",
    volume: "$15.2B",
    rating: 4.6,
    performance: [2250, 2280, 2310, 2290, 2320, 2300, 2325],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: "$143.52",
    change24h: 5.67,
    marketCap: "$61.2B",
    volume: "$4.8B",
    rating: 4.5,
    performance: [135, 138, 140, 142, 141, 143, 144],
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: "$0.58",
    change24h: -1.23,
    marketCap: "$20.5B",
    volume: "$1.2B",
    rating: 4.2,
    performance: [0.59, 0.58, 0.57, 0.56, 0.57, 0.58, 0.58],
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    price: "$563.21",
    change24h: 0.87,
    marketCap: "$86.7B",
    volume: "$2.1B",
    rating: 4.4,
    performance: [558, 560, 562, 561, 563, 562, 563],
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    price: "$0.62",
    change24h: -0.45,
    marketCap: "$33.2B",
    volume: "$1.8B",
    rating: 4.0,
    performance: [0.63, 0.62, 0.62, 0.61, 0.62, 0.62, 0.62],
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: "$7.83",
    change24h: 2.11,
    marketCap: "$9.8B",
    volume: "$0.7B",
    rating: 4.3,
    performance: [7.65, 7.7, 7.75, 7.8, 7.78, 7.82, 7.83],
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: "$0.12",
    change24h: 8.92,
    marketCap: "$16.4B",
    volume: "$2.3B",
    rating: 3.9,
    performance: [0.11, 0.115, 0.118, 0.12, 0.119, 0.121, 0.12],
  },
]

interface CryptoListProps {
  searchQuery: string
  filterByTrending?: boolean
}

export function CryptoList({ searchQuery, filterByTrending = false }: CryptoListProps) {
  const [expandedCrypto, setExpandedCrypto] = useState<string | null>(null)

  // Filter cryptocurrencies based on search query
  const filteredCryptos = cryptoData
    .filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((crypto) => !filterByTrending || crypto.change24h > 2) // Filter for trending if needed
    .sort((a, b) => (filterByTrending ? b.change24h - a.change24h : 0)) // Sort by change if trending

  const toggleExpand = (id: string) => {
    setExpandedCrypto(expandedCrypto === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {filteredCryptos.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No cryptocurrencies found matching your search.</div>
      ) : (
        filteredCryptos.map((crypto) => (
          <Card
            key={crypto.id}
            className={`p-4 transition-all duration-300 cursor-pointer hover:bg-secondary/20 ${
              expandedCrypto === crypto.id ? "bg-secondary/10" : ""
            }`}
            onClick={() => toggleExpand(crypto.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={`/placeholder.svg?height=40&width=40&text=${crypto.symbol}`} alt={crypto.name} />
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{crypto.name}</h3>
                    <span className="text-sm text-muted-foreground">{crypto.symbol}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-semibold">{crypto.price}</span>
                    <span className={`text-sm ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div>{crypto.marketCap}</div>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-sm text-muted-foreground">Volume (24h)</div>
                  <div>{crypto.volume}</div>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {crypto.rating}
                  </Badge>
                </div>
              </div>
            </div>

            {expandedCrypto === crypto.id && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Performance (7 days)</h4>
                <div className="h-[200px]">
                  <CryptoPerformanceGraph data={crypto.performance} change={crypto.change24h} />
                </div>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  )
}
