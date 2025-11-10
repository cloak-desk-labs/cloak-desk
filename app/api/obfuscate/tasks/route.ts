import { NextRequest, NextResponse } from "next/server"
import { ObfuscationTask, ApiResponse } from "@/lib/api"

/**
 * GET /api/obfuscate/tasks
 * List user's obfuscation tasks
 */
export async function GET(request: NextRequest) {
  try {
    // In production, fetch from database filtered by user wallet
    const mockTasks: ObfuscationTask[] = [
      {
        id: "task-1",
        status: "completed",
        sourceWallet: "0x1234567890123456789012345678901234567890",
        tokens: ["ETH", "USDC"],
        profile: "standard",
        txHash: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
        costEstimate: "50",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "task-2",
        status: "processing",
        sourceWallet: "0x1234567890123456789012345678901234567890",
        tokens: ["ETH"],
        profile: "light",
        costEstimate: "25",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ]

    return NextResponse.json({ success: true, data: mockTasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

