import { NextRequest, NextResponse } from "next/server"
import { generateWallets } from "@/lib/wallet-generation"
import { getCollection, DecoyWallet } from "@/lib/mongodb"
import { isAddress } from "viem"

/**
 * POST /api/wallets/generate
 * Generate and store decoy wallets for a user
 * 
 * Request body:
 * - userId: string (wallet address of the user)
 * - count: number (number of wallets to generate, 1-10)
 * - persona: string (wallet persona type)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, count = 1, persona = "small-trader" } = body

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

    // Validate count
    const walletCount = Math.min(Math.max(parseInt(count.toString()) || 1, 1), 10)
    if (walletCount < 1 || walletCount > 10) {
      return NextResponse.json(
        { success: false, error: "Count must be between 1 and 10" },
        { status: 400 }
      )
    }

    // Validate persona
    const validPersonas = ["whale", "degen", "small-trader"]
    const walletPersona = validPersonas.includes(persona) ? persona : "small-trader"

    // Generate wallets
    const generatedWallets = generateWallets(walletCount)

    // Store wallets in MongoDB
    const walletsCollection = await getCollection<DecoyWallet>("decoy_wallets")
    const now = new Date()

    // Prepare wallet documents for insertion
    const walletDocuments: Omit<DecoyWallet, "_id">[] = generatedWallets.map((wallet) => ({
      userId: userId.toLowerCase(), // Normalize to lowercase
      address: wallet.address,
      privateKeyEncrypted: wallet.privateKeyEncrypted,
      persona: walletPersona,
      status: "active",
      createdAt: now,
      updatedAt: now,
    }))

    // Insert wallets into database
    const result = await walletsCollection.insertMany(walletDocuments)

    // Return wallet addresses and IDs (not private keys for security)
    const insertedIds = Object.values(result.insertedIds)
    const savedWallets = walletDocuments.map((doc, index) => ({
      id: insertedIds[index].toString(),
      address: doc.address,
      persona: doc.persona,
      status: doc.status,
      createdAt: doc.createdAt.toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: {
        wallets: savedWallets,
        count: savedWallets.length,
      },
    })
  } catch (error) {
    console.error("Error generating wallets:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

