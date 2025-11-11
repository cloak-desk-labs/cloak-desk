import { NextRequest, NextResponse } from "next/server"
import { ObfuscationTask, ApiResponse } from "@/lib/api"
import { getCollection, ObfuscationTaskDocument } from "@/lib/mongodb"
import { isAddress } from "viem"

/**
 * GET /api/obfuscate/tasks
 * List user's obfuscation tasks from database
 * 
 * Query parameters:
 * - userId: string (wallet address of the user, required)
 * - chainId: number (optional, filter by chain)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const chainId = searchParams.get("chainId")

    // Validate userId is provided
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId (wallet address) is required" },
        { status: 400 }
      )
    }

    // Validate wallet address format
    if (!isAddress(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid wallet address format" },
        { status: 400 }
      )
    }

    // Get tasks from MongoDB
    const tasksCollection = await getCollection<ObfuscationTaskDocument>("obfuscation_tasks")

    // Build query filter
    const query: any = {
      userId: userId.toLowerCase(), // Normalize to lowercase
    }

    // Add chainId filter if provided
    if (chainId) {
      const chainIdNum = parseInt(chainId)
      if (!isNaN(chainIdNum)) {
        query.chainId = chainIdNum
      }
    }

    // Fetch tasks from database, sorted by creation date (newest first)
    const taskDocuments = await tasksCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    // Convert to API response format
    const tasks: ObfuscationTask[] = taskDocuments.map((doc) => ({
      id: doc._id?.toString() || "",
      status: doc.status,
      sourceWallet: doc.sourceWallet,
      tokens: doc.tokens,
      profile: doc.profile,
      scheduledFor: doc.scheduledFor?.toISOString(),
      txHash: doc.txHash,
      relayerId: doc.relayerId,
      costEstimate: doc.costEstimate,
      createdAt: doc.createdAt.toISOString(),
    }))

    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

