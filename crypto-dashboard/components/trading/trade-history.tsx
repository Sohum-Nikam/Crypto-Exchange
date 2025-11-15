"use client"

import { useEffect, useState } from "react"

// Generate mock trade history
const generateTradeHistory = (symbol: string) => {
  const basePrice = symbol === "BTC" ? 43000 : symbol === "ETH" ? 2300 : symbol === "SOL" ? 140 : 1

  const trades = []

  for (let i = 0; i < 15; i++) {
    const isBuy = Math.random() > 0.5
    const price = basePrice * (1 + (Math.random() - 0.5) * 0.01)
    const amount = Math.random() * 2
    const date = new Date()
    date.setMinutes(date.getMinutes() - i * Math.floor(Math.random() * 10))

    trades.push({
      id: `trade-${i}`,
      price: price,
      amount: amount,
      total: price * amount,
      type: isBuy ? "buy" : "sell",
      time: date,
    })
  }

  return trades.sort((a, b) => b.time.getTime() - a.time.getTime())
}

interface TradeHistoryProps {
  symbol: string
  currentPrice: number
}

export function TradeHistory({ symbol, currentPrice }: TradeHistoryProps) {
  const [trades, setTrades] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTrades(generateTradeHistory(symbol))
      setIsLoading(false)
    }, 500)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrades((prev) => {
        const isBuy = Math.random() > 0.5
        const basePrice = symbol === "BTC" ? 43000 : symbol === "ETH" ? 2300 : symbol === "SOL" ? 140 : 1
        const price = basePrice * (1 + (Math.random() - 0.5) * 0.01)
        const amount = Math.random() * 2

        return [
          {
            id: `trade-new-${Date.now()}`,
            price: price,
            amount: amount,
            total: price * amount,
            type: isBuy ? "buy" : "sell",
            time: new Date(),
          },
          ...prev.slice(0, 14),
        ]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [symbol])

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
      <div className="space-y-1">
        {trades.map((trade) => (
          <div key={trade.id} className="flex justify-between text-sm">
            <span className={trade.type === "buy" ? "text-green-400" : "text-red-400"}>
              ${trade.price.toFixed(2)}
            </span>
            <span className="text-gray-400">{trade.amount.toFixed(4)}</span>
            <span className="text-gray-400">{trade.time.toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
