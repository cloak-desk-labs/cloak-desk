"use client"

import * as React from "react"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"

/**
 * Privacy Radar Chart Component
 * Displays predictability breakdown in a radar/spider chart format
 */
export function PrivacyRadarChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "#9ba7b2", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#9ba7b2", fontSize: 10 }}
        />
        <Radar
          name="Predictability"
          dataKey="value"
          stroke="#06b6d4"
          fill="#7c3aed"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

