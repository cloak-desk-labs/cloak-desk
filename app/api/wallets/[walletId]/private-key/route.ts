import { NextRequest, NextResponse } from "next/server"
import { getCollection, DecoyWallet } from "@/lib/mongodb"
import { decryptPrivateKey } from "@/lib/encryption"
import { isAddress } from "viem"
import { ObjectId } from "mongodb"

/**
 * GET /api/wallets/:walletId/private-key
 * Get decrypted private key for a specific wallet
 * 
 * Query parameters:
 * - userId: string (wallet address of the user, for authorization)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { walletId: string } }
) {
  try {
    const { walletId } = params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // Validate inputs
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

    if (!walletId) {
      return NextResponse.json(
        { success: false, error: "walletId is required" },
        { status: 400 }
      )
    }

    // Get wallet from MongoDB
    const walletsCollection = await getCollection<DecoyWallet>("decoy_wallets")

    // Find wallet and verify ownership
    // Validate ObjectId format
    if (!ObjectId.isValid(walletId)) {
      return NextResponse.json(
        { success: false, error: "Invalid wallet ID format" },
        { status: 400 }
      )
    }

    const wallet = await walletsCollection.findOne({
      _id: new ObjectId(walletId) as any,
      userId: userId.toLowerCase(),
      status: { $ne: "deleted" },
    })

    if (!wallet) {
      return NextResponse.json(
        { success: false, error: "Wallet not found or not owned by user" },
        { status: 404 }
      )
    }

    // Decrypt private key
    try {
      const privateKey = decryptPrivateKey(wallet.privateKeyEncrypted)

      return NextResponse.json({
        success: true,
        data: {
          walletId: wallet._id?.toString(),
          address: wallet.address,
          privateKey,
          // Security warning in response
          warning: "Keep this private key secure. Never share it with anyone.",
        },
      })
    } catch (error) {
      console.error("Error decrypting private key:", error)
      
      // Return more detailed error message to help diagnose the issue
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to decrypt private key"
      
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessage,
          // Include helpful context in development
          ...(process.env.NODE_ENV === "development" && {
            hint: "Check that ENCRYPTION_KEY environment variable is set and matches the key used during wallet creation."
          })
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error fetching private key:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

