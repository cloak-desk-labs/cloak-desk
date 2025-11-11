"use client"

import * as React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { queryClient } from "@/lib/api"
import { config } from "@/lib/wagmi-config"
import { Toaster } from "@/components/ui/use-toast"
import { WalletConnectSetupCheck } from "@/components/wallet-connect-setup-check"
import "@rainbow-me/rainbowkit/styles.css"

/**
 * Providers component
 * Wraps the app with all necessary providers
 * 
 * RainbowKitProvider is configured with dark theme and mobile support
 * Phantom wallet and other mobile wallets are available through WalletConnect
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7c3aed",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
          modalSize="compact"
        >
          {children}
          <Toaster />
          <WalletConnectSetupCheck />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

