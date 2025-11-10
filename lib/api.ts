import { QueryClient } from "@tanstack/react-query"

/**
 * React Query client configuration
 * Provides caching, refetching, and optimistic updates for API calls
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
})

/**
 * API base URL - can be configured via environment variable
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

/**
 * API response types
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * Privacy analysis job response
 */
export interface PrivacyAnalysisJob {
  jobId: string
  status: "pending" | "processing" | "completed" | "failed"
  createdAt: string
  completedAt?: string
  results?: PrivacyAnalysisResults
}

export interface PrivacyAnalysisResults {
  predictabilityScore: number // 0-100, lower is better
  breakdown: {
    timingPatterns: number
    dexPreference: number
    tokenReuse: number
    gasFingerprint: number
  }
  inferenceVectors: InferenceVector[]
}

export interface InferenceVector {
  id: string
  type: string
  description: string
  riskLevel: "low" | "medium" | "high"
  recommendedAction: string
}

/**
 * Relayer information
 */
export interface Relayer {
  id: string
  name: string
  stake: string // Amount staked
  uptime: number // Percentage
  avgFees: string
  compliancePolicy: "kyc-enforced" | "kyc-optional" | "no-kyc"
  rating: number // 1-5
  supportedChains: number[]
  contractAddress: string
}

/**
 * Obfuscation task
 */
export interface ObfuscationTask {
  id: string
  status: "queued" | "processing" | "completed" | "failed"
  sourceWallet: string
  tokens: string[]
  profile: "light" | "standard" | "max"
  scheduledFor?: string
  txHash?: string
  relayerId?: string
  costEstimate: string
  createdAt: string
}

/**
 * ZK Proof
 */
export interface ZKProof {
  id: string
  type: "kyc" | "token-balance" | "contribution"
  claim: Record<string, any>
  proof: string
  verificationLink: string
  createdAt: string
}

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  rank: number
  alias: string // Anonymized hash
  unpredictabilityScore: number
  badges: string[]
  lastActivity: string
  chain: string
}

/**
 * API client functions
 * These are typed wrappers around fetch calls
 */

export async function startPrivacyAnalysis(walletAddress: string): Promise<ApiResponse<PrivacyAnalysisJob>> {
  const response = await fetch(`${API_BASE_URL}/analysis/deep-scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  })
  return response.json()
}

export async function getPrivacyAnalysisJob(jobId: string): Promise<ApiResponse<PrivacyAnalysisJob>> {
  const response = await fetch(`${API_BASE_URL}/analysis/${jobId}`)
  return response.json()
}

export async function queryRelayers(filters?: {
  compliancePolicy?: string
  minRating?: number
  supportedChain?: number
}): Promise<ApiResponse<Relayer[]>> {
  const response = await fetch(`${API_BASE_URL}/relayers/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters || {}),
  })
  return response.json()
}

export async function queueObfuscationTask(task: {
  sourceWallet: string
  tokens: string[]
  profile: "light" | "standard" | "max"
  scheduledFor?: string
  relayerId?: string
}): Promise<ApiResponse<ObfuscationTask>> {
  const response = await fetch(`${API_BASE_URL}/obfuscate/queue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  return response.json()
}

export async function getObfuscationTasks(): Promise<ApiResponse<ObfuscationTask[]>> {
  const response = await fetch(`${API_BASE_URL}/obfuscate/tasks`)
  return response.json()
}

export async function generateProof(proofType: string, claim: Record<string, any>): Promise<ApiResponse<ZKProof>> {
  const response = await fetch(`${API_BASE_URL}/proof/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: proofType, claim }),
  })
  return response.json()
}

export async function getLeaderboard(filters?: {
  timeRange?: string
  chain?: string
}): Promise<ApiResponse<LeaderboardEntry[]>> {
  const params = new URLSearchParams(filters as any)
  const response = await fetch(`${API_BASE_URL}/leaderboard?${params}`)
  return response.json()
}

export async function createMPCVault(config: {
  guardians: string[]
  threshold: number
}): Promise<ApiResponse<{ vaultId: string; address: string }>> {
  const response = await fetch(`${API_BASE_URL}/mpc/create-vault`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  })
  return response.json()
}

export async function buyCredits(amount: number, paymentMethod: string): Promise<ApiResponse<{ txHash: string }>> {
  const response = await fetch(`${API_BASE_URL}/payments/credits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, paymentMethod }),
  })
  return response.json()
}

