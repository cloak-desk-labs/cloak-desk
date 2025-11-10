"use client"

import * as React from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

/**
 * Dashboard layout with wallet connection guard
 * Shows connect modal if wallet not connected
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isConnected, isConnecting } = useAccount()
  const router = useRouter()
  const [showConnectModal, setShowConnectModal] = React.useState(false)

  React.useEffect(() => {
    if (!isConnected && !isConnecting) {
      setShowConnectModal(true)
    } else if (isConnected) {
      setShowConnectModal(false)
    }
  }, [isConnected, isConnecting])

  // If not connected, show connect modal
  if (!isConnected) {
    return (
      <AppShell>
        <div className="flex h-full items-center justify-center p-4">
          <Dialog open={showConnectModal} onOpenChange={setShowConnectModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect Your Wallet</DialogTitle>
                <DialogDescription>
                  Please connect your wallet to access the dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <ConnectButton />
                <button
                  onClick={() => router.push("/")}
                  className="text-sm text-muted hover:text-textPrimary transition-colors"
                >
                  Back to landing page
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </AppShell>
    )
  }

  return <AppShell>{children}</AppShell>
}

