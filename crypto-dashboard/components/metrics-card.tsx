import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import type React from "react" // Added import for React

interface MetricsCardProps {
  title: string
  value: string
  change: {
    value: string
    percentage: string
    isPositive: boolean
  }
  icon: React.ReactNode
  color: string
}

export function MetricsCard({ title, value, change, icon, color }: MetricsCardProps) {
  return (
    <Card className="p-6 bg-gray-900/50 border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold mb-2 text-white">{value}</p>
      <div className="flex items-center gap-1">
        {change.isPositive ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`text-sm ${change.isPositive ? "text-green-500" : "text-red-500"}`}>
          {change.percentage}
        </span>
        <span className="text-sm text-gray-400 ml-1">({change.value})</span>
      </div>
    </Card>
  )
}
