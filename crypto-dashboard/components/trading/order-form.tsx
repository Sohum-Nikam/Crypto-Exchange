"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

interface Crypto {
  name: string
  symbol: string
  price: number
  change24h: number
}

interface OrderFormProps {
  action: "buy" | "sell"
  orderType: "market" | "limit"
  crypto: Crypto
  onSubmit: (orderData: any) => Promise<void>
  isLoading: boolean
}

export function OrderForm({ action, orderType, crypto, onSubmit, isLoading }: OrderFormProps) {
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [total, setTotal] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [balance, setBalance] = useState(action === "buy" ? 10000 : 0.5) // Mock balance

  // Update price when crypto changes
  useEffect(() => {
    setPrice(crypto.price.toString())
  }, [crypto])

  // Calculate total when amount or price changes
  useEffect(() => {
    if (amount && price) {
      const calculatedTotal = Number.parseFloat(amount) * Number.parseFloat(price)
      setTotal(calculatedTotal)
    } else {
      setTotal(0)
    }
  }, [amount, price])

  // Handle percentage slider change
  const handlePercentageChange = (value: number[]) => {
    const percent = value[0]
    setPercentage(percent)

    if (action === "buy") {
      const maxAmount = balance / Number.parseFloat(price)
      const newAmount = ((maxAmount * percent) / 100).toFixed(8)
      setAmount(newAmount)
    } else {
      const newAmount = ((balance * percent) / 100).toFixed(8)
      setAmount(newAmount)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    setTotal(Number(value) * (price ? Number(price) : crypto.price))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPrice(value)
    setTotal(Number(amount) * Number(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      action,
      orderType,
      amount: Number(amount),
      price: price ? Number(price) : crypto.price,
      total,
      symbol: crypto.symbol
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <label htmlFor="amount">Amount ({crypto.symbol})</label>
          <span className="text-muted-foreground">
            Available: {action === "buy" ? `$${balance.toLocaleString()}` : `${balance.toFixed(8)} ${crypto.symbol}`}
          </span>
        </div>
        <Input
          id="amount"
          type="number"
          placeholder={`Amount in ${crypto.symbol}`}
          value={amount}
          onChange={handleAmountChange}
          step="0.00000001"
          min="0"
          required
          className="bg-gray-800/30 border-gray-700/50"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Percentage</span>
          <span>{percentage}%</span>
        </div>
        <Slider value={[percentage]} onValueChange={handlePercentageChange} max={100} step={1} />
        <div className="grid grid-cols-4 gap-2 mt-2">
          {[25, 50, 75, 100].map((percent) => (
            <Button
              key={percent}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handlePercentageChange([percent])}
            >
              {percent}%
            </Button>
          ))}
        </div>
      </div>

      {orderType === "limit" && (
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm">
            Price (USD)
          </label>
          <Input
            id="price"
            type="number"
            placeholder="Price per coin"
            value={price}
            onChange={handlePriceChange}
            step="0.01"
            min="0"
            required
            className="bg-gray-800/30 border-gray-700/50"
            disabled={isLoading}
          />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="total" className="text-sm">
          Total (USD)
        </label>
        <Input
          id="total"
          type="text"
          value={`$${total.toFixed(2)}`}
          readOnly
          className="bg-gray-800/30 border-gray-700/50"
        />
      </div>

      <Alert variant="outline" className="bg-secondary/20 border-secondary">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          {orderType === "market"
            ? "Market orders are executed immediately at the best available price."
            : "Limit orders are executed only when the market reaches your specified price."}
        </AlertDescription>
      </Alert>

      <Button
        type="submit"
        className={`w-full ${
          action === "buy"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
        disabled={isLoading || !amount || (orderType === "limit" && !price)}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          `${action === "buy" ? "Buy" : "Sell"} ${crypto.symbol}`
        )}
      </Button>
    </form>
  )
}
