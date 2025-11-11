import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, sepolia, polygon, arbitrum, optimism } from "viem/chains"
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  phantomWallet,
  trustWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets"

/**
 * Wagmi configuration for wallet connections
 * Supports multiple EVM chains and mobile wallets including Phantom
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

// Configure wallet connection with mobile support
// Explicitly include Phantom wallet for EVM chains on both desktop and mobile
// Phantom wallet supports EVM chains and works through WalletConnect on mobile
export const config = getDefaultConfig({
  appName: "CloakDesk",
  appDescription: "Privacy-first blockchain privacy dashboard",
  appUrl: typeof window !== "undefined" ? window.location.origin : "https://cloakdesk.io",
  appIcon: typeof window !== "undefined" ? `${window.location.origin}/icon.png` : undefined,
  projectId: projectId || "00000000000000000000000000000000",
  chains: [mainnet, sepolia, polygon, arbitrum, optimism],
  // Explicitly include Phantom wallet in the wallet list
  // This ensures it's available in the wallet selection modal on desktop
  // 
  // IMPORTANT: On mobile, Phantom may not appear in WalletConnect's modal wallet list
  // Users can connect Phantom on mobile by:
  // 1. Scanning the WalletConnect QR code with the Phantom app (Phantom supports WalletConnect)
  // 2. Using Phantom's in-app browser: Open Phantom → Tap Explore icon → Enter dApp URL
  // 3. The WalletConnect modal will show a QR code that Phantom can scan
  //
  // Note: WalletConnect's mobile modal shows wallets from their registry.
  // Phantom should work via QR code scanning even if it doesn't appear in the list.
  wallets: [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        phantomWallet, // Phantom wallet for EVM chains - works on mobile via WalletConnect QR code
        trustWallet,
        rainbowWallet,
        // walletConnectWallet is automatically included by getDefaultConfig
      ],
    },
  ],
  ssr: true,
})

