"use client"

import * as React from "react"
import { useAccount, useBalance, useBlockNumber, usePublicClient } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Wallet, Activity, TrendingUp, ExternalLink } from "lucide-react"
import { formatAddress, formatEther } from "@/lib/utils"
import Link from "next/link"
import { WalletGraph } from "@/components/graphs/wallet-graph"
import { getObfuscationTasks, startPrivacyAnalysis, getLeaderboard, ObfuscationTask } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

/**
 * Overview page - Dashboard home
 * Shows KPIs, wallet summary, and recent activity with REAL blockchain data
 */
export default function OverviewPage() {
  const { address, chain } = useAccount()
  const publicClient = usePublicClient()
  
  // Fetch real ETH balance
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address: address,
  })

  // Fetch block number for recent activity
  const { data: blockNumber } = useBlockNumber()

  // Fetch pending obfuscation tasks
  const { data: tasksData } = useQuery({
    queryKey: ["obfuscation-tasks", address],
    queryFn: async () => {
      if (!address) return null
      // Fetch tasks with wallet address parameter
      const response = await fetch(`/api/obfuscate/tasks?walletAddress=${address}`)
      const data = await response.json()
      return data.success ? data.data : null
    },
    enabled: !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // State for recent transactions
  const [recentTransactions, setRecentTransactions] = React.useState<any[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = React.useState(false)

  // Fetch recent transactions from blockchain
  React.useEffect(() => {
    if (!address || !publicClient || !blockNumber) return

    const fetchTransactions = async () => {
      setIsLoadingTransactions(true)
      try {
        const transactions: any[] = []
        
        // Try to get transaction history using getLogs for ERC20 transfers
        // and also check recent blocks for ETH transfers
        try {
          // Get recent blocks (last 50 blocks) to find transactions
          const blocksToCheck = Math.min(50, Number(blockNumber))
          
          // Check blocks in batches to avoid rate limits
          for (let i = 0; i < Math.min(blocksToCheck, 20); i++) {
            try {
              const block = await publicClient.getBlock({
                blockNumber: blockNumber - BigInt(i),
                includeTransactions: true,
              })
              
              if (block.transactions) {
                for (const tx of block.transactions) {
                  if (typeof tx === "object" && "from" in tx) {
                    const isFromAddress = tx.from?.toLowerCase() === address?.toLowerCase()
                    const isToAddress = tx.to?.toLowerCase() === address?.toLowerCase()
                    
                    if (isFromAddress || isToAddress) {
                      transactions.push({
                        hash: tx.hash,
                        from: tx.from,
                        to: tx.to,
                        value: tx.value || BigInt(0),
                        timestamp: new Date(Number(block.timestamp) * 1000),
                        blockNumber: block.number,
                      })
                    }
                  }
                }
              }
              
              // Stop if we have enough transactions
              if (transactions.length >= 5) break
            } catch (err) {
              // Skip blocks that fail
              continue
            }
          }
        } catch (error) {
          console.error("Error fetching transactions:", error)
        }
        
        // Sort by block number (newest first) and limit to 5
        transactions.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
        setRecentTransactions(transactions.slice(0, 5))
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setIsLoadingTransactions(false)
      }
    }

    fetchTransactions()
    // Refetch every 30 seconds
    const interval = setInterval(fetchTransactions, 30000)
    return () => clearInterval(interval)
  }, [address, publicClient, blockNumber])

  // Calculate pending operations from real data
  const pendingOps = React.useMemo(() => {
    if (!tasksData) return 0
    return tasksData.filter(
      (task: ObfuscationTask) => task.status === "queued" || task.status === "processing"
    ).length
  }, [tasksData])

  const behaviorStudy = React.useMemo(() => {
    if (!recentTransactions || recentTransactions.length === 0 || !address) {
      return null
    }

    const total = recentTransactions.length
    let outgoing = 0
    let incoming = 0
    let totalValue = BigInt(0)
    const timestamps: number[] = []
    const counterparties = new Set<string>()

    for (const tx of recentTransactions) {
      if (!tx || !tx.value) continue
      totalValue += tx.value

      if (tx.from?.toLowerCase() === address.toLowerCase()) {
        outgoing += 1
        if (tx.to) {
          counterparties.add(tx.to.toLowerCase())
        }
      } else if (tx.to?.toLowerCase() === address.toLowerCase()) {
        incoming += 1
        if (tx.from) {
          counterparties.add(tx.from.toLowerCase())
        }
      }

      if (tx.timestamp instanceof Date) {
        timestamps.push(tx.timestamp.getTime())
      }
    }

    let avgTimeMinutes = 0
    if (timestamps.length > 1) {
      timestamps.sort((a, b) => a - b)
      let totalDiff = 0
      for (let i = 1; i < timestamps.length; i++) {
        totalDiff += timestamps[i] - timestamps[i - 1]
      }
      avgTimeMinutes = Math.round(totalDiff / (timestamps.length - 1) / 60000)
    }

    const avgValueEth = total > 0 ? Number(formatEther(totalValue)) / total : 0

    return {
      total,
      outgoing,
      incoming,
      avgValueEth,
      uniqueCounterparties: counterparties.size,
      avgTimeMinutes,
    }
  }, [recentTransactions, address])

  // Fetch leaderboard data (lightweight, can be auto-fetched)
  const { data: leaderboardData } = useQuery({
    queryKey: ["leaderboard-kpi", address],
    queryFn: async () => {
      if (!address) return null
      const response = await getLeaderboard({ walletAddress: address })
      return response.success && response.data?.[0] ? response.data[0] : null
    },
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })

  // Calculate real KPIs from fetched data
  // Note: Predictability score requires running analysis - users can run it from Privacy Health page
  const kpis = {
    predictabilityScore: 0, // Run analysis from Privacy Health page to get real score
    stealthCredits: 1250, // Would come from credits API - keeping default for now
    pendingOps: pendingOps,
    anonymityRank: leaderboardData?.rank || 0,
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
                <span className="font-medium">
                  {balanceLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : balance ? (
                    `${parseFloat(formatEther(balance.value)).toFixed(4)} ${balance.symbol}`
                  ) : (
                    "0 ETH"
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Network</span>
                <span className="font-medium">{chain?.name || "Unknown"}</span>
              </div>
              {address && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Address</span>
                  <span className="font-mono text-xs">{formatAddress(address)}</span>
                </div>
              )}
            </div>
            {chain?.blockExplorers?.default && address && (
              <a
                href={`${chain.blockExplorers.default.url}/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primaryStart hover:text-primaryEnd transition-colors"
              >
                View on Explorer
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
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
            {isLoadingTransactions ? (
              <div className="text-center py-8 text-muted">Loading transactions...</div>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted">
                <p className="text-sm">No recent transactions found</p>
                <p className="text-xs mt-2">Transactions will appear here as they occur</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((tx, index) => (
                  <div
                    key={tx.hash || index}
                    className="flex items-start gap-4 rounded-lg border border-white/10 p-3 hover:border-primaryStart/30 transition-colors"
                  >
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        tx.from?.toLowerCase() === address?.toLowerCase()
                          ? "bg-danger"
                          : "bg-success"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {tx.from?.toLowerCase() === address?.toLowerCase()
                          ? "Sent"
                          : "Received"}{" "}
                        {tx.value ? formatEther(tx.value) : "0"} ETH
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted font-mono truncate">
                          {tx.to && formatAddress(tx.to)}
                        </p>
                        {chain?.blockExplorers?.default && tx.hash && (
                          <a
                            href={`${chain.blockExplorers.default.url}/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primaryStart hover:text-primaryEnd transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      {tx.blockNumber && (
                        <p className="text-xs text-muted mt-1">
                          Block #{tx.blockNumber.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Wallet Graph */}
      <WalletGraph 
        walletAddress={address} 
        connectedAddresses={recentTransactions
          .map(tx => [tx.from, tx.to])
          .flat()
          .filter((addr): addr is string => !!addr && addr.toLowerCase() !== address?.toLowerCase())
          .filter((addr, index, self) => self.indexOf(addr) === index)
          .slice(0, 5)
        }
      />

      {behaviorStudy && (
        <Card>
          <CardHeader>
            <CardTitle>Behavioral Study (Last {behaviorStudy.total} Transactions)</CardTitle>
            <CardDescription>
              Snapshot of how your recent activity might look to basic on-chain analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted">Direction</p>
                <p className="mt-1 text-lg font-semibold text-textPrimary">
                  {behaviorStudy.outgoing} sent / {behaviorStudy.incoming} received
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Average Transaction Size</p>
                <p className="mt-1 text-lg font-semibold text-textPrimary">
                  {behaviorStudy.avgValueEth.toFixed(4)} ETH
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Unique Counterparties</p>
                <p className="mt-1 text-lg font-semibold text-textPrimary">
                  {behaviorStudy.uniqueCounterparties}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Average Time Between Transactions</p>
                <p className="mt-1 text-lg font-semibold text-textPrimary">
                  {behaviorStudy.avgTimeMinutes > 0 ? `${behaviorStudy.avgTimeMinutes} min` : "n/a"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">
                  Based on the last {behaviorStudy.total} transactions visible to the selected network.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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

