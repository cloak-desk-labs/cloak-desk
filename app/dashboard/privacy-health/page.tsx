"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PrivacyRadarChart } from "@/components/charts/privacy-radar"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { startPrivacyAnalysis, getPrivacyAnalysisJob } from "@/lib/api"
import { useAccount } from "wagmi"
import { useToast } from "@/components/ui/use-toast"
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"

/**
 * Privacy Health page
 * Shows predictability analysis, inference vectors, and privacy simulator
 */
export default function PrivacyHealthPage() {
  const { address } = useAccount()
  const { toast } = useToast()
  const [simulatorValues, setSimulatorValues] = React.useState({
    splitFunds: false,
    randomDelay: 50,
    routeViaRelayers: false,
    rotateAddress: false,
  })

  // Mock radar data
  const radarData = [
    { name: "Timing", value: 65 },
    { name: "DEX Preference", value: 42 },
    { name: "Token Reuse", value: 38 },
    { name: "Gas Fingerprint", value: 55 },
  ]

  // Mock inference vectors
  const inferenceVectors = [
    {
      id: "1",
      type: "Linked Funding Address",
      description: "Your wallet is linked to a known exchange deposit address",
      riskLevel: "high" as const,
      recommendedAction: "Use stealth routing to break the link",
    },
    {
      id: "2",
      type: "DEX A Frequent",
      description: "You frequently use DEX A, creating a pattern",
      riskLevel: "medium" as const,
      recommendedAction: "Rotate through multiple DEXs",
    },
    {
      id: "3",
      type: "Matching Trade Signature",
      description: "Your trade patterns match known trader profiles",
      riskLevel: "low" as const,
      recommendedAction: "Add random delays to trades",
    },
  ]

  const handleRunAnalysis = async () => {
    if (!address) return

    toast({
      title: "Analysis Started",
      description: "Privacy analysis is running in the background",
    })

    // In production, this would call the actual API
    // const result = await startPrivacyAnalysis(address)
  }

  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "high":
        return "text-danger"
      case "medium":
        return "text-warning"
      case "low":
        return "text-success"
    }
  }

  const getRiskBadge = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "high":
        return "badge-danger"
      case "medium":
        return "badge-warning"
      case "low":
        return "badge-success"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Privacy Health</h1>
        <p className="mt-2 text-muted">
          Analyze your wallet's predictability and privacy exposure
        </p>
      </div>

      {/* Predictability Score */}
      <Card>
        <CardHeader>
          <CardTitle>Predictability Score</CardTitle>
          <CardDescription>
            Lower is more private. Current score: 42/100
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={58} className="h-3" />
            <div className="mt-2 flex justify-between text-sm text-muted">
              <span>More Private</span>
              <span>More Predictable</span>
            </div>
          </div>
          <PrivacyRadarChart data={radarData} />
        </CardContent>
      </Card>

      {/* Top Inference Vectors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Inference Vectors</CardTitle>
          <CardDescription>
            Things public analytics can infer about your wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {inferenceVectors.map((vector) => (
              <AccordionItem key={vector.id} value={vector.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className={`badge ${getRiskBadge(vector.riskLevel)}`}>
                      {vector.riskLevel}
                    </span>
                    <span className="font-medium">{vector.type}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-11">
                    <p className="text-sm text-muted">{vector.description}</p>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-muted" />
                      <span className="text-sm font-medium">Recommended:</span>
                      <span className="text-sm text-muted">{vector.recommendedAction}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Privacy Simulator */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Simulator</CardTitle>
          <CardDescription>
            Preview how different strategies affect your predictability score
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Split Funds</label>
                <p className="text-xs text-muted">Divide transactions across multiple addresses</p>
              </div>
              <Switch
                checked={simulatorValues.splitFunds}
                onCheckedChange={(checked) =>
                  setSimulatorValues({ ...simulatorValues, splitFunds: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Random Delay</label>
                <span className="text-sm text-muted">{simulatorValues.randomDelay}%</span>
              </div>
              <Slider
                value={[simulatorValues.randomDelay]}
                onValueChange={([value]) =>
                  setSimulatorValues({ ...simulatorValues, randomDelay: value })
                }
                max={100}
                step={5}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Route via Relayers</label>
                <p className="text-xs text-muted">Use relayer network for obfuscation</p>
              </div>
              <Switch
                checked={simulatorValues.routeViaRelayers}
                onCheckedChange={(checked) =>
                  setSimulatorValues({ ...simulatorValues, routeViaRelayers: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Rotate Address</label>
                <p className="text-xs text-muted">Use new addresses for each transaction</p>
              </div>
              <Switch
                checked={simulatorValues.rotateAddress}
                onCheckedChange={(checked) =>
                  setSimulatorValues({ ...simulatorValues, rotateAddress: checked })
                }
              />
            </div>
          </div>

          <div className="rounded-lg border border-primaryStart/20 bg-bg700 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Simulated Score:</span>
              <span className="text-2xl font-bold gradient-text">28/100</span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Estimated improvement: -14 points
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Center */}
      <Card>
        <CardHeader>
          <CardTitle>Action Center</CardTitle>
          <CardDescription>
            Quick actions to improve your privacy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="primary" className="w-full" onClick={handleRunAnalysis}>
              Run Obfuscation
            </Button>
            <Button variant="secondary" className="w-full">
              Create Stealth Wallet
            </Button>
            <Button variant="secondary" className="w-full">
              Purchase Credits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

