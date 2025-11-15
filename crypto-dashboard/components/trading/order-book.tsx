"use client"

import { useEffect, useState } from "react"

// Generate mock order book data
const generateOrderBook = (symbol: string) => {
  const basePrice = symbol === "BTC" ? 43000 : symbol === "ETH" ? 2300 : symbol === "SOL" ? 140 : 1

  const asks = []
  const bids = []

  // Generate asks (sell orders)
  let askPrice = basePrice * 1.005
  for (let i = 0; i < 10; i++) {
    askPrice += basePrice * (Math.random() * 0.002)
    const amount = Math.random() * 2
    asks.push({
      price: askPrice,
      amount: amount,
      total: askPrice * amount,
    })
  }

  // Generate bids (buy orders)
  let bidPrice = basePrice * 0.995
  for (let i = 0; i < 10; i++) {
    bidPrice -= basePrice * (Math.random() * 0.002)
    const amount = Math.random() * 2
    bids.push({
      price: bidPrice,
      amount: amount,
      total: bidPrice * amount,
    })
  }

  // Sort asks in ascending order and bids in descending order
  asks.sort((a, b) => a.price - b.price)
  bids.sort((a, b) => b.price - a.price)

  return { asks, bids }
}

interface OrderBookProps {
  symbol: string
  currentPrice: number
}

export function OrderBook({ symbol, currentPrice }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState<{ asks: any[]; bids: any[] }>({ asks: [], bids: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOrderBook(generateOrderBook(symbol))
      setIsLoading(false)
    }, 500)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOrderBook((prev) => {
        const newBook = { ...prev }

        // Randomly update some orders
        if (Math.random() > 0.5) {
          const askIndex = Math.floor(Math.random() * newBook.asks.length)
          newBook.asks[askIndex].amount = Math.max(0.01, newBook.asks[askIndex].amount + (Math.random() - 0.5) * 0.2)
          newBook.asks[askIndex].total = newBook.asks[askIndex].price * newBook.asks[askIndex].amount
        }

        if (Math.random() > 0.5) {
          const bidIndex = Math.floor(Math.random() * newBook.bids.length)
          newBook.bids[bidIndex].amount = Math.max(0.01, newBook.bids[bidIndex].amount + (Math.random() - 0.5) * 0.2)
          newBook.bids[bidIndex].total = newBook.bids[bidIndex].price * newBook.bids[bidIndex].amount
        }

        return newBook
      })
    }, 2000)

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
    <div className="space-y-4">
      {/* Sell Orders */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Price</span>
          <span>Amount</span>
          <span>Total</span>
        </div>
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={`sell-${i}`} className="flex justify-between text-sm">
              <span className="text-red-400">${(currentPrice * (1 + (i + 1) * 0.001)).toFixed(2)}</span>
              <span className="text-gray-400">{(Math.random() * 2).toFixed(4)}</span>
              <span className="text-gray-400">${((currentPrice * (1 + (i + 1) * 0.001)) * (Math.random() * 2)).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Price */}
      <div className="text-center py-2 border-y border-gray-800">
        <span className="text-lg font-semibold">${currentPrice.toFixed(2)}</span>
      </div>

      {/* Buy Orders */}
      <div className="space-y-1">
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={`buy-${i}`} className="flex justify-between text-sm">
              <span className="text-green-400">${(currentPrice * (1 - (i + 1) * 0.001)).toFixed(2)}</span>
              <span className="text-gray-400">{(Math.random() * 2).toFixed(4)}</span>
              <span className="text-gray-400">${((currentPrice * (1 - (i + 1) * 0.001)) * (Math.random() * 2)).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
