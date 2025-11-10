import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, sepolia, polygon, arbitrum, optimism } from "viem/chains"

/**
 * Wagmi configuration for wallet connections
 * Supports multiple EVM chains
 * 
 * Note: You need a WalletConnect Project ID from https://cloud.walletconnect.com
 * For development, you can use a test project ID or create a free account
 */
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId || projectId === "your-project-id") {
  if (typeof window !== "undefined") {
    console.warn(
      "⚠️ WalletConnect Project ID not set.\n" +
      "Please set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in your .env.local file.\n" +
      "Get your project ID from: https://cloud.walletconnect.com\n" +
      "Wallet connection may not work without a valid project ID."
    )
  }
}

// Use a placeholder that won't cause errors, but won't work either
// User must set their own project ID
export const config = getDefaultConfig({
  appName: "CloakDesk",
  projectId: projectId || "00000000000000000000000000000000",
  chains: [mainnet, sepolia, polygon, arbitrum, optimism],
  ssr: true,
})

