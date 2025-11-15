"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CryptoPerformanceGraphProps {
  data: number[]
  change: number
}

export function CryptoPerformanceGraph({ data, change }: CryptoPerformanceGraphProps) {
  // Convert raw data to chart format
  const chartData = data.map((value, index) => ({
    day: index,
    value: value,
  }))

  // Determine color based on price change
  const lineColor = change >= 0 ? "#10b981" : "#ef4444"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="day" tick={false} axisLine={false} tickLine={false} />
        <YAxis domain={["auto", "auto"]} tick={false} axisLine={false} tickLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Price</span>
                      <span className="font-bold">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: lineColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
