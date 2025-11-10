"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccount } from "wagmi"
import { formatAddress } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Plus, CheckCircle, Clock, XCircle } from "lucide-react"

/**
 * Stealth Routing page
 * Create and manage obfuscation tasks
 */
export default function StealthRoutingPage() {
  const { address } = useAccount()
  const { toast } = useToast()
  const [createTaskOpen, setCreateTaskOpen] = React.useState(false)
  const [step, setStep] = React.useState(1)

  // Mock tasks
  const tasks = [
    {
      id: "1",
      status: "completed" as const,
      sourceWallet: address || "0x1234...5678",
      tokens: ["ETH", "USDC"],
      profile: "standard" as const,
      txHash: "0xabc...def",
      costEstimate: "50 NOVA",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      status: "processing" as const,
      sourceWallet: address || "0x1234...5678",
      tokens: ["ETH"],
      profile: "light" as const,
      costEstimate: "25 NOVA",
      createdAt: "2024-01-15T14:20:00Z",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "processing":
        return <Clock className="h-5 w-5 text-warning" />
      case "failed":
        return <XCircle className="h-5 w-5 text-danger" />
      default:
        return <Clock className="h-5 w-5 text-muted" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Stealth Routing</h1>
          <p className="mt-2 text-muted">
            Orchestrate obfuscation tasks to enhance privacy
          </p>
        </div>
        <Button onClick={() => setCreateTaskOpen(true)} variant="primary">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Task Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Task Queue</CardTitle>
          <CardDescription>
            Your queued and completed obfuscation tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border border-white/10 p-4"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(task.status)}
                  <div>
                    <p className="font-medium">
                      {task.profile.charAt(0).toUpperCase() + task.profile.slice(1)} Profile
                    </p>
                    <p className="text-sm text-muted">
                      {task.tokens.join(", ")} • {formatAddress(task.sourceWallet)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{task.costEstimate}</p>
                    <p className="text-xs text-muted">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {task.txHash && (
                    <Button variant="ghost" size="sm">
                      View TX
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Task Dialog */}
      <Dialog open={createTaskOpen} onOpenChange={setCreateTaskOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Obfuscation Task</DialogTitle>
            <DialogDescription>
              Step {step} of 4: Configure your obfuscation task
            </DialogDescription>
          </DialogHeader>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Source Wallet</label>
                <Select defaultValue={address || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={address || ""}>
                      {address ? formatAddress(address) : "No wallet"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tokens</label>
                <Select defaultValue="eth">
                  <SelectTrigger>
                    <SelectValue placeholder="Select tokens" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Obfuscation Profile</label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      Light (delay + split) - 25 NOVA
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard (multi-hop) - 50 NOVA
                    </SelectItem>
                    <SelectItem value="max">
                      Max (multi-hop + rotation + decoys) - 100 NOVA
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Schedule</label>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="window">Time Window</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-primaryStart/20 bg-bg700 p-4">
                <p className="text-sm font-medium">Cost Estimate</p>
                <p className="text-2xl font-bold gradient-text mt-2">50 NOVA</p>
                <p className="text-xs text-muted mt-1">
                  Estimated gas: 0.01 ETH
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <Button
                onClick={() => {
                  toast({
                    title: "Task Created",
                    description: "Obfuscation task queued successfully",
                  })
                  setCreateTaskOpen(false)
                  setStep(1)
                }}
              >
                Confirm & Queue
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

