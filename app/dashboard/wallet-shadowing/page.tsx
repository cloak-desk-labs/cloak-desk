"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccount } from "wagmi"
import { formatAddress } from "@/lib/utils"
import { Plus, Users, Activity } from "lucide-react"

/**
 * Wallet Shadowing page
 * Create and manage decoy wallets
 */
export default function WalletShadowingPage() {
  const { address } = useAccount()
  const [decoyCount, setDecoyCount] = React.useState(5)
  const [persona, setPersona] = React.useState("small-trader")

  // Mock decoys
  const decoys = [
    { id: "1", address: "0x1111...1111", persona: "whale", status: "active" },
    { id: "2", address: "0x2222...2222", persona: "degen", status: "active" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Wallet Shadowing</h1>
        <p className="mt-2 text-muted">
          Create decoy wallets to add noise and obfuscate your activity
        </p>
      </div>

      {/* Create Decoys */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Decoy Wallets</CardTitle>
          <CardDescription>
            Create mirror wallets with automated activity patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Number of Decoys: {decoyCount}
            </label>
            <Slider
              value={[decoyCount]}
              onValueChange={([value]) => setDecoyCount(value)}
              min={2}
              max={10}
              step={1}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Persona</label>
            <Select value={persona} onValueChange={setPersona}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whale">Whale (large trades, infrequent)</SelectItem>
                <SelectItem value="degen">Degen (frequent trades, high risk)</SelectItem>
                <SelectItem value="small-trader">Small Trader (moderate activity)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
            <p className="text-sm text-warning">
              ⚠️ Warning: Decoy wallets require funding and will incur gas costs
            </p>
          </div>

          <Button variant="primary" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Generate & Deploy Decoys
          </Button>
        </CardContent>
      </Card>

      {/* Active Decoys */}
      <Card>
        <CardHeader>
          <CardTitle>Active Decoys</CardTitle>
          <CardDescription>
            {decoys.length} decoy wallets currently active
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {decoys.map((decoy) => (
              <div
                key={decoy.id}
                className="flex items-center justify-between rounded-lg border border-white/10 p-4"
              >
                <div className="flex items-center gap-4">
                  <Users className="h-5 w-5 text-muted" />
                  <div>
                    <p className="font-medium">{formatAddress(decoy.address)}</p>
                    <p className="text-sm text-muted capitalize">{decoy.persona}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-success">Active</span>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Noise Metric */}
      <Card>
        <CardHeader>
          <CardTitle>Noise Metric</CardTitle>
          <CardDescription>
            How much obfuscation noise your decoys add
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Noise Level</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="h-3 rounded-full bg-bg700 overflow-hidden">
                <div className="h-full w-[42%] bg-gradient-primary" />
              </div>
            </div>
            <p className="text-sm text-muted">
              Your main wallet activity is mixed with {decoys.length} decoy wallets,
              making pattern analysis significantly harder.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

