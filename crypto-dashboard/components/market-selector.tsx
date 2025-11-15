"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Market {
  name: string
  symbol: string
  price: number
  change24h: number
}

interface MarketSelectorProps {
  selectedMarket: Market
  onMarketChange?: (market: Market) => void
}

const markets: Market[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3500,
    change24h: 2.5
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 50000,
    change24h: 1.8
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 100,
    change24h: 5.2
  }
]

export function MarketSelector({ selectedMarket, onMarketChange }: MarketSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
              {selectedMarket.symbol[0]}
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
              U
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {selectedMarket.symbol}/USDT
            </h2>
            <div className="text-xs text-gray-400">Uniswap V3 • {selectedMarket.name}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-gray-900 border-gray-800">
        {markets.map((market) => (
          <DropdownMenuItem
            key={market.symbol}
            className="flex items-center justify-between p-2 hover:bg-gray-800"
            onClick={() => onMarketChange?.(market)}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                {market.symbol[0]}
              </div>
              <span>{market.symbol}/USDT</span>
            </div>
            <span className={`text-sm ${market.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {market.change24h}%
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 