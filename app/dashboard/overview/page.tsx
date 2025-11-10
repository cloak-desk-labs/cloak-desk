"use client"

import * as React from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Wallet, Activity, TrendingUp } from "lucide-react"
import { formatAddress } from "@/lib/utils"
import Link from "next/link"
import { WalletGraph } from "@/components/graphs/wallet-graph"

/**
 * Overview page - Dashboard home
 * Shows KPIs, wallet summary, and recent activity
 */
export default function OverviewPage() {
  const { address } = useAccount()

  // Mock data - in production, fetch from API
  const kpis = {
    predictabilityScore: 42, // Lower is better
    stealthCredits: 1250,
    pendingOps: 3,
    anonymityRank: 156,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">How visible are you?</h1>
        <p className="mt-2 text-muted">
          Overview of your privacy health and wallet activity
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictability Score</CardTitle>
            <Shield className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.predictabilityScore}</div>
            <p className="text-xs text-muted mt-1">
              Lower is more private
            </p>
            <Progress value={100 - kpis.predictabilityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stealth Credits</CardTitle>
            <Wallet className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.stealthCredits.toLocaleString()}</div>
            <p className="text-xs text-muted mt-1">
              Available credits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Ops</CardTitle>
            <Activity className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.pendingOps}</div>
            <p className="text-xs text-muted mt-1">
              Relayer operations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anonymity Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{kpis.anonymityRank}</div>
            <p className="text-xs text-muted mt-1">
              Leaderboard position
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Wallet Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Summary</CardTitle>
            <CardDescription>
              {address && formatAddress(address)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">ETH Balance</span>
                <span className="font-medium">2.45 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">USDC Balance</span>
                <span className="font-medium">1,250 USDC</span>
              </div>
            </div>
            <Button className="w-full" variant="primary">
              Make Private
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest transactions and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border border-white/10 p-3">
                <div className="h-2 w-2 rounded-full bg-success mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Obfuscation completed</p>
                  <p className="text-xs text-muted">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-white/10 p-3">
                <div className="h-2 w-2 rounded-full bg-warning mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Privacy score updated</p>
                  <p className="text-xs text-muted">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Graph */}
      <WalletGraph walletAddress={address} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/privacy-health">
              <Button variant="primary">Run Deep Analysis</Button>
            </Link>
            <Link href="/dashboard/stealth-routing">
              <Button variant="secondary">Create Obfuscation Task</Button>
            </Link>
            <Link href="/dashboard/relayer-marketplace">
              <Button variant="secondary">Browse Relayers</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

