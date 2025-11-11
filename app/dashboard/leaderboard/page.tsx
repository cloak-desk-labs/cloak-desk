"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"
import { useAccount } from "wagmi"
import { useQuery } from "@tanstack/react-query"
import { getLeaderboard } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"

/**
 * Leaderboard page
 * Shows top anonymized users by unpredictability score
 * Uses real blockchain data to calculate scores
 */
export default function LeaderboardPage() {
  const { address } = useAccount()
  
  // Fetch real leaderboard data for connected wallet
  const { data: leaderboardData, isLoading } = useQuery({
    queryKey: ["leaderboard", address],
    queryFn: async () => {
      if (!address) return null
      const response = await getLeaderboard({ walletAddress: address })
      return response.success ? response.data : null
    },
    enabled: !!address,
  })

  const entries = leaderboardData || []

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-warning" />
    if (rank === 2) return <Medal className="h-5 w-5 text-muted" />
    if (rank === 3) return <Award className="h-5 w-5 text-warning" />
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Leaderboard</h1>
        <p className="mt-2 text-muted">
          Top anonymized users ranked by unpredictability score
        </p>
      </div>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Privacy Champions</CardTitle>
          <CardDescription>
            Higher scores indicate better privacy practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted">Loading leaderboard...</div>
          ) : !address ? (
            <div className="text-center py-8 text-muted">
              <p className="text-sm">Connect your wallet to see your leaderboard position</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <p className="text-sm">No leaderboard data available</p>
              <p className="text-xs mt-2">Your wallet needs transaction history to calculate a score</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div
                  key={entry.rank || index}
                  className="flex items-center justify-between rounded-lg border border-white/10 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(entry.rank) || (
                        <span className="text-lg font-bold text-muted">#{entry.rank || index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium font-mono">{entry.alias}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {entry.badges.map((badge) => (
                          <Badge key={badge} variant="info" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg gradient-text">{entry.unpredictabilityScore}</p>
                    <p className="text-sm text-muted">
                      {entry.lastActivity ? formatDistanceToNow(new Date(entry.lastActivity), { addSuffix: true }) : "N/A"}
                    </p>
                    <p className="text-xs text-muted mt-1 capitalize">{entry.chain}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earn Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Earn Privacy Badges</CardTitle>
          <CardDescription>
            Complete actions to earn badges and improve your rank
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 p-4">
              <p className="font-medium mb-1">Privacy Master</p>
              <p className="text-sm text-muted">Achieve score &gt; 90</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4">
              <p className="font-medium mb-1">Stealth Legend</p>
              <p className="text-sm text-muted">Complete 100 obfuscations</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4">
              <p className="font-medium mb-1">MPC Pioneer</p>
              <p className="text-sm text-muted">Set up MPC vault</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

