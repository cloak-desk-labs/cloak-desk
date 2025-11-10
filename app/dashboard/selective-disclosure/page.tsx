"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { copyToClipboard } from "@/lib/utils"
import { Eye, Copy, Download, Share2 } from "lucide-react"

/**
 * Selective Disclosure page
 * Generate and manage ZK proofs
 */
export default function SelectiveDisclosurePage() {
  const { toast } = useToast()
  const [proofType, setProofType] = React.useState("")
  const [proofs, setProofs] = React.useState<Array<{
    id: string
    type: string
    proof: string
    createdAt: string
  }>>([])

  const proofTypes = [
    { value: "kyc", label: "I passed KYC", description: "Prove KYC verification without revealing identity" },
    { value: "token-balance", label: "I hold >= X tokens", description: "Prove token balance threshold" },
    { value: "contribution", label: "I contributed to project Y", description: "Prove project contribution" },
  ]

  const handleGenerateProof = () => {
    if (!proofType) {
      toast({
        title: "Error",
        description: "Please select a proof type",
      })
      return
    }

    const newProof = {
      id: Date.now().toString(),
      type: proofType,
      proof: `zk-proof-${proofType}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    setProofs([newProof, ...proofs])
    toast({
      title: "Proof Generated",
      description: "Your ZK proof has been generated successfully",
    })
  }

  const handleCopyProof = async (proof: string) => {
    const success = await copyToClipboard(proof)
    if (success) {
      toast({
        title: "Copied",
        description: "Proof copied to clipboard",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Selective Disclosure</h1>
        <p className="mt-2 text-muted">
          Generate verifiable, privacy-preserving proofs
        </p>
      </div>

      {/* Generate Proof */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Proof</CardTitle>
          <CardDescription>
            Create a zero-knowledge proof for your claim
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Proof Type</label>
            <Select value={proofType} onValueChange={setProofType}>
              <SelectTrigger>
                <SelectValue placeholder="Select proof type" />
              </SelectTrigger>
              <SelectContent>
                {proofTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <p className="font-medium">{type.label}</p>
                      <p className="text-xs text-muted">{type.description}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {proofType === "token-balance" && (
            <div>
              <label className="text-sm font-medium mb-2 block">Minimum Amount</label>
              <input
                type="number"
                placeholder="1000"
                className="w-full rounded-xl border border-white/10 bg-bg700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primaryStart"
              />
            </div>
          )}

          <Button variant="primary" className="w-full" onClick={handleGenerateProof}>
            Generate Proof
          </Button>
        </CardContent>
      </Card>

      {/* Proof History */}
      <Card>
        <CardHeader>
          <CardTitle>Proof History</CardTitle>
          <CardDescription>
            Your generated proofs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {proofs.length === 0 ? (
            <p className="text-center text-muted py-8">No proofs generated yet</p>
          ) : (
            <div className="space-y-4">
              {proofs.map((proof) => (
                <div
                  key={proof.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Eye className="h-5 w-5 text-muted" />
                    <div>
                      <p className="font-medium capitalize">{proof.type.replace("-", " ")}</p>
                      <p className="text-sm text-muted font-mono">{proof.proof.slice(0, 20)}...</p>
                      <p className="text-xs text-muted mt-1">
                        {new Date(proof.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyProof(proof.proof)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Auditor Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Grant Access</CardTitle>
          <CardDescription>
            Create time-limited view keys for auditors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Duration</label>
            <Select defaultValue="24h">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary" className="w-full">
            Generate View Key
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

