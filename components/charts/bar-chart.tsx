"use client"

import * as React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

/**
 * Bar Chart Component
 * Generic bar chart for displaying various metrics
 */
export function BarChartComponent({
  data,
  dataKey,
  xKey,
}: {
  data: Array<Record<string, any>>
  dataKey: string
  xKey: string
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
        <XAxis
          dataKey={xKey}
          tick={{ fill: "#9ba7b2", fontSize: 12 }}
          stroke="#1a2332"
        />
        <YAxis
          tick={{ fill: "#9ba7b2", fontSize: 12 }}
          stroke="#1a2332"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0f1720",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey={dataKey} fill="url(#colorGradient)" />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}

