"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useAccount } from "wagmi"
import { formatAddress } from "@/lib/utils"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { generateDecoyWallets, getDecoyWallets, getWalletPrivateKey, deleteDecoyWallet, DecoyWallet } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Users, Copy, Trash2, Key, Check } from "lucide-react"

/**
 * Wallet Shadowing page
 * Create and manage decoy wallets with real wallet generation and MongoDB storage
 */
export default function WalletShadowingPage() {
  const { address } = useAccount()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [decoyCount, setDecoyCount] = React.useState(5)
  const [persona, setPersona] = React.useState("small-trader")
  const [showPrivateKeyDialog, setShowPrivateKeyDialog] = React.useState(false)
  const [selectedWallet, setSelectedWallet] = React.useState<DecoyWallet | null>(null)
  const [privateKey, setPrivateKey] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)

  // Fetch real decoy wallets from MongoDB
  const { data: walletsData, isLoading: walletsLoading } = useQuery({
    queryKey: ["decoy-wallets", address],
    queryFn: async () => {
      if (!address) return null
      const response = await getDecoyWallets(address, false)
      return response.success ? response.data : null
    },
    enabled: !!address,
  })

  const decoys = walletsData?.wallets || []

  // Generate wallets mutation
  const generateMutation = useMutation({
    mutationFn: async () => {
      if (!address) throw new Error("Wallet not connected")
      const response = await generateDecoyWallets(address, decoyCount, persona)
      if (!response.success) {
        throw new Error(response.error || "Failed to generate wallets")
      }
      return response.data
    },
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Wallets Generated",
          description: `Successfully generated ${data.count} decoy wallet(s)`,
        })
        // Refetch wallets
        queryClient.invalidateQueries({ queryKey: ["decoy-wallets", address] })
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate wallets",
      })
    },
  })

  // Delete wallet mutation
  const deleteMutation = useMutation({
    mutationFn: async (walletId: string) => {
      if (!address) throw new Error("Wallet not connected")
      const response = await deleteDecoyWallet(walletId, address)
      if (!response.success) {
        throw new Error(response.error || "Failed to delete wallet")
      }
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Wallet Deleted",
        description: "Decoy wallet has been deleted",
      })
      queryClient.invalidateQueries({ queryKey: ["decoy-wallets", address] })
    },
    onError: (error: Error) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete wallet",
      })
    },
  })

  // Handle generate wallets
  const handleGenerateWallets = () => {
    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to generate decoy wallets",
      })
      return
    }
    generateMutation.mutate()
  }

  // Handle view private key
  const handleViewPrivateKey = async (wallet: DecoyWallet) => {
    if (!address) return

    setSelectedWallet(wallet)
    setShowPrivateKeyDialog(true)
    setPrivateKey(null)

    try {
      const response = await getWalletPrivateKey(wallet.id, address)
      if (response.success && response.data) {
        setPrivateKey(response.data.privateKey)
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to retrieve private key",
        })
        setShowPrivateKeyDialog(false)
      }
    } catch (error) {
      console.error("Error fetching private key:", error)
      toast({
        title: "Error",
        description: "Failed to retrieve private key",
      })
      setShowPrivateKeyDialog(false)
    }
  }

  // Handle copy private key
  const handleCopyPrivateKey = () => {
    if (privateKey) {
      navigator.clipboard.writeText(privateKey)
      setCopied(true)
      toast({
        title: "Copied",
        description: "Private key copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Handle delete wallet
  const handleDeleteWallet = (walletId: string) => {
    if (confirm("Are you sure you want to delete this decoy wallet? This action cannot be undone.")) {
      deleteMutation.mutate(walletId)
    }
  }

  // Calculate noise level based on number of active decoys
  const noiseLevel = Math.min(100, (decoys.length / 10) * 100)

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

          <Button
            variant="primary"
            className="w-full"
            onClick={handleGenerateWallets}
            disabled={generateMutation.isPending || !address}
          >
            <Plus className="mr-2 h-4 w-4" />
            {generateMutation.isPending ? "Generating..." : "Generate & Deploy Decoys"}
          </Button>
        </CardContent>
      </Card>

      {/* Active Decoys */}
      <Card>
        <CardHeader>
          <CardTitle>Active Decoys</CardTitle>
          <CardDescription>
            {walletsLoading ? "Loading..." : `${decoys.length} decoy wallet(s) currently active`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {walletsLoading ? (
            <div className="text-center py-8 text-muted">Loading wallets...</div>
          ) : decoys.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <p className="text-sm">No decoy wallets found</p>
              <p className="text-xs mt-2">Generate decoy wallets to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {decoys.map((decoy) => (
                <div
                  key={decoy.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-muted" />
                    <div>
                      <p className="font-medium font-mono">{formatAddress(decoy.address)}</p>
                      <p className="text-sm text-muted capitalize">{decoy.persona}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${decoy.status === "active" ? "badge-success" : "badge-warning"}`}>
                      {decoy.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewPrivateKey(decoy)}
                      title="View Private Key"
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteWallet(decoy.id)}
                      disabled={deleteMutation.isPending}
                      title="Delete Wallet"
                    >
                      <Trash2 className="h-4 w-4 text-danger" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                <span className="font-medium">{noiseLevel.toFixed(0)}%</span>
              </div>
              <div className="h-3 rounded-full bg-bg700 overflow-hidden">
                <div className="h-full bg-gradient-primary transition-all duration-300" style={{ width: `${noiseLevel}%` }} />
              </div>
            </div>
            <p className="text-sm text-muted">
              Your main wallet activity is mixed with {decoys.length} decoy wallet(s),
              making pattern analysis significantly harder.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Private Key Dialog */}
      <Dialog open={showPrivateKeyDialog} onOpenChange={setShowPrivateKeyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Private Key</DialogTitle>
            <DialogDescription>
              Warning: Keep this private key secure. Never share it with anyone. Anyone with this key can control the wallet.
            </DialogDescription>
          </DialogHeader>

          {selectedWallet && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted">Wallet Address</label>
                <p className="font-mono text-sm mt-1 p-2 bg-bg700 rounded border border-white/10">
                  {selectedWallet.address}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted">Private Key</label>
                {privateKey ? (
                  <div className="relative mt-1">
                    <p className="font-mono text-sm p-2 bg-bg700 rounded border border-danger/30 break-all">
                      {privateKey}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleCopyPrivateKey}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted mt-1">Loading private key...</p>
                )}
              </div>

              <div className="rounded-lg border border-danger/20 bg-danger/5 p-4">
                <p className="text-sm text-danger">
                  ⚠️ Security Warning: Store this private key in a secure location. If you lose it, you will lose access to this wallet permanently.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowPrivateKeyDialog(false)}>
              Close
            </Button>
            {privateKey && (
              <Button variant="primary" onClick={handleCopyPrivateKey}>
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied!" : "Copy Private Key"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

