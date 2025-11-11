"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, Users, Shield, CheckCircle } from "lucide-react"

/**
 * MPC Vault page
 * Non-custodial MPC key management
 */
export default function MPCVaultPage() {
  const [vaultCreated, setVaultCreated] = React.useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">MPC Vault</h1>
        <p className="mt-2 text-muted">
          Non-custodial multi-party computation for secure key management
        </p>
      </div>

      {!vaultCreated ? (
        <Card>
          <CardHeader>
            <CardTitle>Create MPC Vault</CardTitle>
            <CardDescription>
              Set up a 2-of-3 MPC vault with guardians for recovery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primaryStart" />
                <p className="font-medium">User Key</p>
                <p className="text-sm text-muted">Your local key</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primaryEnd" />
                <p className="font-medium">Guardian</p>
                <p className="text-sm text-muted">Social recovery</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4 text-center">
                <Lock className="h-8 w-8 mx-auto mb-2 text-electric" />
                <p className="font-medium">Relayer Node</p>
                <p className="text-sm text-muted">Network node</p>
              </div>
            </div>

            <div className="rounded-lg border border-primaryStart/20 bg-bg700 p-4">
              <p className="text-sm font-medium mb-2">Threshold: 2-of-3</p>
              <p className="text-xs text-muted">
                Any 2 of the 3 keys are required to sign transactions
              </p>
            </div>

            <Button variant="primary" className="w-full" onClick={() => setVaultCreated(true)}>
              Create Vault
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Vault Status</CardTitle>
              <CardDescription>
                Your MPC vault is active and ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">Vault Created</span>
                </div>
                <div>
                  <p className="text-sm text-muted mb-2">Vault Address</p>
                  <p className="font-mono text-sm">0x1234...5678</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guardians</CardTitle>
              <CardDescription>
                Manage your recovery guardians
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted" />
                    <div>
                      <p className="font-medium">Guardian 1</p>
                      <p className="text-sm text-muted">0x1111...1111</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
                <Button variant="secondary" className="w-full">
                  Add Guardian
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Staking & Fees</CardTitle>
              <CardDescription>
                MPC operator staking requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Operator Stake</span>
                  <span className="font-medium">10,000$CLOAK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Monthly Fee</span>
                  <span className="font-medium">50$CLOAK</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

