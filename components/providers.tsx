"use client"

import * as React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { queryClient } from "@/lib/api"
import { config } from "@/lib/wagmi-config"
import { Toaster } from "@/components/ui/use-toast"
import { WalletConnectSetupCheck } from "@/components/wallet-connect-setup-check"
import "@rainbow-me/rainbowkit/styles.css"

/**
 * Providers component
 * Wraps the app with all necessary providers
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
          <Toaster />
          <WalletConnectSetupCheck />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

