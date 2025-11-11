import { ethers } from "ethers"
import { encryptPrivateKey, isValidPrivateKey } from "./encryption"

/**
 * Wallet generation utilities
 * Generates new Ethereum wallets using ethers.js
 */

/**
 * Generated wallet interface
 */
export interface GeneratedWallet {
  address: string
  privateKey: string
  privateKeyEncrypted: string
}

/**
 * Generate a new Ethereum wallet
 * Returns address, private key, and encrypted private key
 */
export function generateWallet(): GeneratedWallet {
  try {
    // Generate new random wallet using ethers.js
    const wallet = ethers.Wallet.createRandom()

    // Get address and private key
    const address = wallet.address
    const privateKey = wallet.privateKey

    // Validate private key
    if (!isValidPrivateKey(privateKey)) {
      throw new Error("Generated invalid private key")
    }

    // Encrypt private key for storage
    const privateKeyEncrypted = encryptPrivateKey(privateKey)

    return {
      address,
      privateKey,
      privateKeyEncrypted,
    }
  } catch (error) {
    console.error("Error generating wallet:", error)
    throw new Error("Failed to generate wallet")
  }
}

/**
 * Generate multiple wallets
 * Useful for creating multiple decoy wallets at once
 */
export function generateWallets(count: number): GeneratedWallet[] {
  if (count < 1 || count > 100) {
    throw new Error("Count must be between 1 and 100")
  }

  const wallets: GeneratedWallet[] = []

  for (let i = 0; i < count; i++) {
    try {
      const wallet = generateWallet()
      wallets.push(wallet)
    } catch (error) {
      console.error(`Error generating wallet ${i + 1}:`, error)
      // Continue generating other wallets even if one fails
    }
  }

  return wallets
}

/**
 * Validate wallet address format
 */
export function isValidWalletAddress(address: string): boolean {
  try {
    return ethers.isAddress(address)
  } catch {
    return false
  }
}

/**
 * Get wallet from private key
 * Useful for restoring wallets from private keys
 */
export function getWalletFromPrivateKey(privateKey: string): {
  address: string
  wallet: ethers.Wallet
} {
  try {
    if (!isValidPrivateKey(privateKey)) {
      throw new Error("Invalid private key format")
    }

    const wallet = new ethers.Wallet(privateKey)
    return {
      address: wallet.address,
      wallet,
    }
  } catch (error) {
    console.error("Error getting wallet from private key:", error)
    throw new Error("Failed to get wallet from private key")
  }
}



