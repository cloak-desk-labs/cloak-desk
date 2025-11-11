"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatAddress } from "@/lib/utils"
import { Store, Star, Shield, CheckCircle } from "lucide-react"

/**
 * Relayer Marketplace page
 * Browse and select relayers for obfuscation
 */
export default function RelayerMarketplacePage() {
  // Mock relayers
  const relayers = [
    {
      id: "1",
      name: "StealthRelay Alpha",
      stake: "100,000$CLOAK",
      uptime: 99.8,
      avgFees: "0.5%",
      compliancePolicy: "kyc-optional" as const,
      rating: 4.8,
      supportedChains: [1, 137],
      contractAddress: "0x1111...1111",
    },
    {
      id: "2",
      name: "PrivacyNode Pro",
      stake: "250,000$CLOAK",
      uptime: 99.9,
      avgFees: "0.3%",
      compliancePolicy: "no-kyc" as const,
      rating: 4.9,
      supportedChains: [1, 137, 42161],
      contractAddress: "0x2222...2222",
    },
    {
      id: "3",
      name: "SecureRelay",
      stake: "50,000$CLOAK",
      uptime: 98.5,
      avgFees: "0.7%",
      compliancePolicy: "kyc-enforced" as const,
      rating: 4.5,
      supportedChains: [1],
      contractAddress: "0x3333...3333",
    },
  ]

  const getComplianceBadge = (policy: string) => {
    switch (policy) {
      case "kyc-enforced":
        return <Badge variant="danger">KYC Enforced</Badge>
      case "kyc-optional":
        return <Badge variant="warning">KYC Optional</Badge>
      case "no-kyc":
        return <Badge variant="success">No KYC</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Relayer Marketplace</h1>
        <p className="mt-2 text-muted">
          Browse and select relayers for your obfuscation needs
        </p>
      </div>

      {/* Relayer List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relayers.map((relayer) => (
          <Card key={relayer.id} hover>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    {relayer.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {formatAddress(relayer.contractAddress)}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{relayer.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Stake</span>
                  <span className="font-medium">{relayer.stake}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Uptime</span>
                  <span className="font-medium">{relayer.uptime}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Avg Fees</span>
                  <span className="font-medium">{relayer.avgFees}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted mb-2">Compliance</p>
                {getComplianceBadge(relayer.compliancePolicy)}
              </div>

              <div>
                <p className="text-sm text-muted mb-2">Supported Chains</p>
                <div className="flex flex-wrap gap-2">
                  {relayer.supportedChains.map((chainId) => (
                    <Badge key={chainId} variant="info">
                      Chain {chainId}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="primary" className="w-full">
                Select Relayer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Onboard Relayer */}
      <Card>
        <CardHeader>
          <CardTitle>Become a Relayer</CardTitle>
          <CardDescription>
            Submit an application to join the relayer network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-primaryStart/20 bg-bg700 p-4">
              <p className="text-sm font-medium mb-2">Requirements</p>
              <ul className="text-sm text-muted space-y-1">
                <li>• Minimum stake: 10,000$CLOAK</li>
                <li>• 99%+ uptime SLA</li>
                <li>• Compliance policy declaration</li>
              </ul>
            </div>
            <Button variant="secondary" className="w-full">
              Submit Application
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

