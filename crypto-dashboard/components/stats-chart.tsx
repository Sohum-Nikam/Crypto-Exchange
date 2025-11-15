"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const monthlyData = [
  { date: "Mar", value: 300 },
  { date: "Apr", value: 350 },
  { date: "May", value: 200 },
  { date: "Jun", value: 400 },
  { date: "Jul", value: 300 },
  { date: "Aug", value: 200 },
  { date: "Sep", value: 450 },
  { date: "Oct", value: 500 },
  { date: "Nov", value: 480 },
  { date: "Dec", value: 400 },
  { date: "Jan", value: 350 },
  { date: "Feb", value: 400 },
]

const dailyData = [
  { date: "00:00", value: 400 },
  { date: "04:00", value: 450 },
  { date: "08:00", value: 420 },
  { date: "12:00", value: 480 },
  { date: "16:00", value: 460 },
  { date: "20:00", value: 500 },
  { date: "24:00", value: 480 },
]

const sixMonthsData = [
  { date: "Sep", value: 450 },
  { date: "Oct", value: 500 },
  { date: "Nov", value: 480 },
  { date: "Dec", value: 400 },
  { date: "Jan", value: 350 },
  { date: "Feb", value: 400 },
]

export function StatsChart() {
  const [timeRange, setTimeRange] = useState("month")

  const getData = () => {
    switch (timeRange) {
      case "day":
        return dailyData
      case "month":
        return monthlyData
      case "6months":
        return sixMonthsData
      default:
        return monthlyData
    }
  }

  return (
    <div className="h-[400px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800">
            <SelectItem value="day" className="text-white hover:bg-gray-800">Today</SelectItem>
            <SelectItem value="month" className="text-white hover:bg-gray-800">Last Month</SelectItem>
            <SelectItem value="6months" className="text-white hover:bg-gray-800">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={getData()}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#333" 
            opacity={0.1}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888' }}
            style={{
              fontSize: '12px',
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888' }}
            style={{
              fontSize: '12px',
            }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-gray-800/50 bg-gray-900/80 p-3 shadow-lg backdrop-blur-sm">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium text-white">Value</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{payload[0].value}</div>
                      <div className="text-xs text-gray-400">{payload[0].payload.date}</div>
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
            stroke="url(#colorValue)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: "#3B82F6",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
