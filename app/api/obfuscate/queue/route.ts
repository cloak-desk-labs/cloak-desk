import { NextRequest, NextResponse } from "next/server"
import { ObfuscationTask, ApiResponse } from "@/lib/api"
import { isAddress } from "viem"
import { getPublicClient } from "@/lib/blockchain"
import { getCollection, ObfuscationTaskDocument } from "@/lib/mongodb"

/**
 * POST /api/obfuscate/queue
 * Queue an obfuscation task
 * 
 * Note: In production, this would:
 * 1. Validate inputs and wallet balance
 * 2. Calculate real cost estimate from current gas prices
 * 3. Store task in database
 * 4. Queue for processing by relayer network
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, sourceWallet, tokens, profile, scheduledFor, relayerId, chainId = 1 } = body

    // Validate required fields
    if (!userId || !sourceWallet || !tokens || !profile) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: userId, sourceWallet, tokens, and profile are required" },
        { status: 400 }
      )
    }

    // Validate address formats
    if (!isAddress(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid userId wallet address format" },
        { status: 400 }
      )
    }

    if (!isAddress(sourceWallet)) {
      return NextResponse.json(
        { success: false, error: "Invalid source wallet address" },
        { status: 400 }
      )
    }

    // Validate tokens array
    if (!Array.isArray(tokens) || tokens.length === 0) {
      return NextResponse.json(
        { success: false, error: "tokens must be a non-empty array" },
        { status: 400 }
      )
    }

    // Validate profile
    const validProfiles = ["light", "standard", "max"]
    if (!validProfiles.includes(profile)) {
      return NextResponse.json(
        { success: false, error: `profile must be one of: ${validProfiles.join(", ")}` },
        { status: 400 }
      )
    }

    // Calculate real cost estimate based on current gas prices
    let costEstimate = "50" // Default
    try {
      const client = getPublicClient(chainId)
      const block = await client.getBlock({ blockTag: "latest" })
      
      // Estimate gas cost based on profile
      // Light: ~100k gas, Standard: ~200k gas, Max: ~500k gas
      const gasEstimates = {
        light: 100000n,
        standard: 200000n,
        max: 500000n,
      }
      
      const gasLimit = gasEstimates[profile as keyof typeof gasEstimates] || gasEstimates.standard
      
      // Use base fee + priority fee (estimate)
      // In production, use actual gas price oracle
      const baseFee = block.baseFeePerGas || BigInt(20000000000) // 20 gwei default
      const priorityFee = BigInt(2000000000) // 2 gwei priority
      const gasPrice = baseFee + priorityFee
      
      // Calculate cost in wei, then convert to ETH
      const costWei = gasLimit * gasPrice
      const costEth = Number(costWei) / 1e18
      
      // Convert to credits (1 ETH = 100 credits, for example)
      costEstimate = Math.ceil(costEth * 100).toString()
    } catch (error) {
      console.error("Error calculating cost estimate:", error)
      // Fall back to default estimates
      costEstimate = profile === "light" ? "25" : profile === "standard" ? "50" : "100"
    }

    // Store task in MongoDB
    const tasksCollection = await getCollection<ObfuscationTaskDocument>("obfuscation_tasks")
    const now = new Date()

    // Create task document
    const taskDocument: Omit<ObfuscationTaskDocument, "_id"> = {
      userId: userId.toLowerCase(), // Normalize to lowercase
      sourceWallet: sourceWallet.toLowerCase(),
      tokens,
      profile,
      status: "queued",
      scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
      relayerId: relayerId || undefined,
      costEstimate,
      chainId,
      createdAt: now,
      updatedAt: now,
    }

    // Insert task into database
    const result = await tasksCollection.insertOne(taskDocument as any)

    // Convert to API response format
    const task: ObfuscationTask = {
      id: result.insertedId.toString(),
      status: "queued",
      sourceWallet,
      tokens,
      profile,
      scheduledFor: scheduledFor || undefined,
      relayerId: relayerId || undefined,
      costEstimate,
      createdAt: now.toISOString(),
    }

    // In production:
    // 1. Validate wallet has sufficient balance
    // 2. Queue for processing by relayer network
    // 3. Send notification to user

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    console.error("Error queueing task:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

