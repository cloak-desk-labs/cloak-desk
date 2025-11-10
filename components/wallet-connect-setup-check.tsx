"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * WalletConnect Setup Check
 * Shows a helpful message if WalletConnect Project ID is not configured
 */
export function WalletConnectSetupCheck() {
  const [showWarning, setShowWarning] = React.useState(false)

  React.useEffect(() => {
    // Check if project ID is set (client-side only)
    const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
    if (!projectId || projectId === "your-project-id" || projectId === "00000000000000000000000000000000") {
      setShowWarning(true)
    }
  }, [])

  if (!showWarning) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="border-warning/50 bg-warning/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertCircle className="h-5 w-5" />
            WalletConnect Setup Required
          </CardTitle>
          <CardDescription>
            To connect wallets, you need to set up WalletConnect
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted">
            1. Get a free Project ID from{" "}
            <a
              href="https://cloud.walletconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primaryStart hover:underline"
            >
              cloud.walletconnect.com
            </a>
          </p>
          <p className="text-muted">
            2. Create a <code className="bg-bg700 px-1 rounded">.env.local</code> file in the project root
          </p>
          <p className="text-muted">
            3. Add: <code className="bg-bg700 px-1 rounded">NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id</code>
          </p>
          <p className="text-muted">
            4. Restart the dev server
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

