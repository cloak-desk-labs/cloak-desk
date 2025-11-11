import { NextRequest, NextResponse } from "next/server"
import { getCollection, DecoyWallet } from "@/lib/mongodb"
import { decryptPrivateKey } from "@/lib/encryption"
import { isAddress } from "viem"

/**
 * GET /api/wallets
 * Get all decoy wallets for a user
 * 
 * Query parameters:
 * - userId: string (wallet address of the user)
 * - includePrivateKey: boolean (whether to include decrypted private keys)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const includePrivateKey = searchParams.get("includePrivateKey") === "true"

    // Validate userId
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

    // Get wallets from MongoDB
    const walletsCollection = await getCollection<DecoyWallet>("decoy_wallets")

    // Query wallets for this user
    const wallets = await walletsCollection
      .find({
        userId: userId.toLowerCase(),
        status: { $ne: "deleted" }, // Exclude deleted wallets
      })
      .sort({ createdAt: -1 }) // Newest first
      .toArray()

    // Format response
    const formattedWallets = wallets.map((wallet) => {
      const walletData: any = {
        id: wallet._id?.toString(),
        address: wallet.address,
        persona: wallet.persona,
        status: wallet.status,
        createdAt: wallet.createdAt.toISOString(),
        updatedAt: wallet.updatedAt.toISOString(),
      }

      // Include private key if requested (decrypted)
      if (includePrivateKey) {
        try {
          walletData.privateKey = decryptPrivateKey(wallet.privateKeyEncrypted)
        } catch (error) {
          console.error(`Error decrypting private key for wallet ${wallet.address}:`, error)
          walletData.privateKey = null
          walletData.decryptionError = true
        }
      }

      return walletData
    })

    return NextResponse.json({
      success: true,
      data: {
        wallets: formattedWallets,
        count: formattedWallets.length,
      },
    })
  } catch (error) {
    console.error("Error fetching wallets:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/wallets
 * Delete (deactivate) a decoy wallet
 * 
 * Request body:
 * - userId: string (wallet address of the user)
 * - walletId: string (ID of the wallet to delete)
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, walletId } = body

    // Validate inputs
    if (!userId || !walletId) {
      return NextResponse.json(
        { success: false, error: "userId and walletId are required" },
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

    // Get wallets collection
    const walletsCollection = await getCollection<DecoyWallet>("decoy_wallets")

    // Validate ObjectId format
    const { ObjectId } = await import("mongodb")
    if (!ObjectId.isValid(walletId)) {
      return NextResponse.json(
        { success: false, error: "Invalid wallet ID format" },
        { status: 400 }
      )
    }

    // Update wallet status to deleted (soft delete)
    const result = await walletsCollection.updateOne(
      {
        _id: new ObjectId(walletId) as any,
        userId: userId.toLowerCase(),
      },
      {
        $set: {
          status: "deleted",
          updatedAt: new Date(),
        },
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Wallet not found or not owned by user" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        message: "Wallet deleted successfully",
      },
    })
  } catch (error) {
    console.error("Error deleting wallet:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

