import { NextRequest, NextResponse } from "next/server"
import { LeaderboardEntry, ApiResponse } from "@/lib/api"
import { getWalletTransactions, analyzeWalletPrivacy } from "@/lib/blockchain"
import { isAddress } from "viem"

/**
 * GET /api/leaderboard
 * Fetch leaderboard data
 * 
 * Note: In production, this would:
 * 1. Query a database of wallet scores calculated from blockchain analysis
 * 2. Apply filters and pagination
 * 3. Cache results for performance
 * 
 * For now, this accepts a wallet address query parameter to calculate score on-the-fly
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange")
    const chain = searchParams.get("chain")
    const walletAddress = searchParams.get("walletAddress")
    const chainId = chain === "polygon" ? 137 : chain === "arbitrum" ? 42161 : 1

    // If a specific wallet address is provided, calculate its score
    if (walletAddress && isAddress(walletAddress)) {
      try {
        const transactions = await getWalletTransactions(
          walletAddress as `0x${string}`,
          chainId,
          500
        )

        if (transactions.length === 0) {
          return NextResponse.json({
            success: true,
            data: [],
            message: "No transactions found for this wallet",
          })
        }

        const analysis = analyzeWalletPrivacy(transactions)
        
        // Calculate unpredictability score (inverse of predictability)
        const unpredictabilityScore = Math.round(100 - analysis.predictabilityScore)
        
        // Determine badges based on score and activity
        const badges: string[] = []
        if (unpredictabilityScore >= 90) {
          badges.push("privacy-master")
        }
        if (transactions.length >= 100) {
          badges.push("stealth-legend")
        }

        const entry: LeaderboardEntry = {
          rank: 0, // Would be calculated from database
          alias: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
          unpredictabilityScore,
          badges,
          lastActivity: transactions[0]
            ? new Date(transactions[0].timestamp * 1000).toISOString()
            : new Date().toISOString(),
          chain: chain || "ethereum",
        }

        return NextResponse.json({ success: true, data: [entry] })
      } catch (error) {
        console.error("Error calculating wallet score:", error)
        return NextResponse.json(
          { success: false, error: "Error analyzing wallet" },
          { status: 500 }
        )
      }
    }

    // Without a wallet address, return empty array
    // In production, this would return top wallets from database
    // For now, we require a wallet address to calculate scores
    return NextResponse.json({
      success: true,
      data: [],
      message: "Provide walletAddress query parameter to calculate score",
    })
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

