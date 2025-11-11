"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccount } from "wagmi"
import { formatAddress } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getObfuscationTasks, queueObfuscationTask } from "@/lib/api"
import { Plus, CheckCircle, Clock, XCircle } from "lucide-react"

/**
 * Stealth Routing page
 * Create and manage obfuscation tasks
 */
export default function StealthRoutingPage() {
  const { address } = useAccount()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [createTaskOpen, setCreateTaskOpen] = React.useState(false)
  const [step, setStep] = React.useState(1)
  
  // Form state for creating tasks
  const [sourceWallet, setSourceWallet] = React.useState<string>("")
  const [tokens, setTokens] = React.useState<string[]>([])
  const [profile, setProfile] = React.useState<"light" | "standard" | "max">("standard")
  const [schedule, setSchedule] = React.useState<string>("immediate")

  // Initialize sourceWallet with connected address
  React.useEffect(() => {
    if (address) {
      setSourceWallet(address)
    }
  }, [address])

  // Fetch real obfuscation tasks from database
  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ["obfuscation-tasks", address],
    queryFn: async () => {
      if (!address) return null
      // Pass userId to the API
      const response = await getObfuscationTasks(address)
      return response.success ? response.data : null
    },
    enabled: !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Mutation for creating tasks
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: {
      userId: string
      sourceWallet: string
      tokens: string[]
      profile: "light" | "standard" | "max"
      scheduledFor?: string
      chainId?: number
    }) => {
      return await queueObfuscationTask(taskData)
    },
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Task Created",
          description: "Obfuscation task queued successfully",
        })
        // Refetch tasks list
        queryClient.invalidateQueries({ queryKey: ["obfuscation-tasks"] })
        // Reset form and close dialog
        setCreateTaskOpen(false)
        setStep(1)
        setSourceWallet(address || "")
        setTokens([])
        setProfile("standard")
        setSchedule("immediate")
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to create task",
        })
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create task",
      })
    },
  })

  const tasks = tasksData || []

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
          {tasksLoading ? (
            <div className="text-center py-8 text-muted">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <p className="text-sm">No obfuscation tasks found</p>
              <p className="text-xs mt-2">Create a task to get started</p>
            </div>
          ) : (
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
          )}
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
                <Select 
                  value={sourceWallet} 
                  onValueChange={setSourceWallet}
                  disabled={!address}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {address && (
                      <SelectItem value={address}>
                        {formatAddress(address)}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {!address && (
                  <p className="text-xs text-muted mt-1">Please connect your wallet first</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Tokens</label>
                <Select 
                  value={tokens[0] || "eth"}
                  onValueChange={(value) => setTokens([value.toUpperCase()])}
                >
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
                <Select value={profile} onValueChange={(value) => setProfile(value as "light" | "standard" | "max")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      Light (delay + split) - 25$CLOAK
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard (multi-hop) - 50$CLOAK
                    </SelectItem>
                    <SelectItem value="max">
                      Max (multi-hop + rotation + decoys) - 100$CLOAK
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
                <Select value={schedule} onValueChange={setSchedule}>
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
                <p className="text-2xl font-bold gradient-text mt-2">
                  {profile === "light" ? "25" : profile === "standard" ? "50" : "100"}$CLOAK
                </p>
                <p className="text-xs text-muted mt-1">
                  Estimated gas: {profile === "light" ? "0.005" : profile === "standard" ? "0.01" : "0.02"} ETH
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
                  if (!address) {
                    toast({
                      title: "Error",
                      description: "Please connect your wallet first",
                    })
                    return
                  }

                  if (!sourceWallet || tokens.length === 0) {
                    toast({
                      title: "Error",
                      description: "Please fill in all required fields",
                    })
                    return
                  }

                  // Create task
                  createTaskMutation.mutate({
                    userId: address,
                    sourceWallet,
                    tokens,
                    profile,
                    scheduledFor: schedule === "immediate" ? undefined : new Date().toISOString(),
                    chainId: 1, // Default to Ethereum mainnet
                  })
                }}
                disabled={createTaskMutation.isPending || !address}
              >
                {createTaskMutation.isPending ? "Creating..." : "Confirm & Queue"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

