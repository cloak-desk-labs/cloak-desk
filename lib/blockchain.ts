import { createPublicClient, http, Address, Chain } from "viem"
import { mainnet, sepolia, polygon, arbitrum, optimism } from "viem/chains"
import { formatEther, formatUnits } from "viem"

/**
 * Blockchain data utilities
 * Fetches real data from blockchain using viem
 * Supports multiple EVM chains
 */

// Map chain IDs to viem chain objects
const CHAIN_MAP: Record<number, Chain> = {
  1: mainnet,
  11155111: sepolia,
  137: polygon,
  42161: arbitrum,
  10: optimism,
}

/**
 * Get public client for a specific chain
 * Uses RPC URL from environment or public RPC endpoints
 */
export function getPublicClient(chainId: number = 1) {
  const chain = CHAIN_MAP[chainId] || mainnet
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL
  
  return createPublicClient({
    chain,
    transport: http(rpcUrl, {
      timeout: 30000,
    }),
  })
}

/**
 * Transaction data interface
 */
export interface TransactionData {
  hash: string
  from: Address
  to: Address | null
  value: bigint
  blockNumber: bigint
  timestamp: number
  gasUsed?: bigint
  gasPrice?: bigint
  input: string
  status?: "success" | "reverted"
}

/**
 * Token transfer interface
 */
export interface TokenTransfer {
  tokenAddress: Address | null // null for native ETH
  tokenSymbol: string
  from: Address
  to: Address
  value: bigint
  decimals: number
  transactionHash: string
  blockNumber: bigint
  timestamp: number
}

/**
 * Wallet analytics interface
 */
export interface WalletAnalytics {
  totalTransactions: number
  totalVolume: bigint
  uniqueContracts: Set<Address>
  firstTransaction: Date | null
  lastTransaction: Date | null
  avgGasPrice: bigint
  transactionFrequency: number // transactions per day
}

/**
 * Fetch transaction history for a wallet
 * Uses getLogs to find all transactions involving the wallet
 */
export async function getWalletTransactions(
  address: Address,
  chainId: number = 1,
  limit: number = 100
): Promise<TransactionData[]> {
  const client = getPublicClient(chainId)
  const transactions: TransactionData[] = []

  try {
    // Get current block number
    const currentBlock = await client.getBlockNumber()
    
    // Calculate block range (last 10000 blocks, ~35 days on mainnet)
    const fromBlock = currentBlock - BigInt(10000)
    
    // Get all transactions from the wallet
    // Note: This is a simplified approach that scans recent blocks
    // In production, you'd use:
    // 1. Indexer services (The Graph, Alchemy, etc.) - RECOMMENDED
    // 2. Etherscan API for comprehensive transaction history
    // 3. Database caching for better performance
    
    // Limit blocks to check to avoid rate limits and timeout
    // For mainnet, 100 blocks = ~20 minutes of history
    const blocksToCheck = Math.min(100, Number(currentBlock - fromBlock))
    
    // Process blocks in smaller batches to avoid overwhelming the RPC
    const batchSize = 10
    for (let batchStart = 0; batchStart < blocksToCheck && transactions.length < limit; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize, blocksToCheck)
      
      // Process batch in parallel for better performance
      const blockPromises = []
      for (let i = batchStart; i < batchEnd; i++) {
        blockPromises.push(
          (async () => {
            try {
              const blockNumber = currentBlock - BigInt(i)
              const block = await client.getBlock({
                blockNumber,
                includeTransactions: true,
              })

              const relevantTxs: TransactionData[] = []
              
              if (block.transactions) {
                for (const tx of block.transactions) {
                  if (typeof tx === "object" && "from" in tx) {
                    const isRelevant =
                      tx.from?.toLowerCase() === address.toLowerCase() ||
                      tx.to?.toLowerCase() === address.toLowerCase()

                    if (isRelevant) {
                      // Get transaction receipt for status (skip if too many requests)
                      let status: "success" | "reverted" | undefined
                      try {
                        const receipt = await client.getTransactionReceipt({
                          hash: tx.hash,
                        })
                        status = receipt.status === "success" ? "success" : "reverted"
                      } catch {
                        // Receipt might not be available or rate limited
                        // Default to undefined
                      }

                      relevantTxs.push({
                        hash: tx.hash,
                        from: tx.from!,
                        to: tx.to || null,
                        value: tx.value || BigInt(0),
                        blockNumber: block.number,
                        timestamp: Number(block.timestamp),
                        gasUsed: tx.gas,
                        gasPrice: tx.gasPrice,
                        input: tx.input,
                        status,
                      })
                    }
                  }
                }
              }
              
              return relevantTxs
            } catch (error) {
              // Skip blocks that fail
              console.error(`Error fetching block ${i}:`, error)
              return []
            }
          })()
        )
      }
      
      // Wait for batch to complete
      const batchResults = await Promise.all(blockPromises)
      transactions.push(...batchResults.flat())
      
      // Stop if we have enough transactions
      if (transactions.length >= limit) break
    }

    // Sort by block number (newest first)
    transactions.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
    
    return transactions.slice(0, limit)
  } catch (error) {
    console.error("Error fetching wallet transactions:", error)
    return []
  }
}

/**
 * Fetch ERC20 token transfers for a wallet
 * Uses Transfer event logs
 * 
 * Note: This is a simplified implementation. For production, consider using:
 * - Indexer services (The Graph, Alchemy, etc.)
 * - Etherscan API for comprehensive transfer history
 * - Database caching for better performance
 */
export async function getTokenTransfers(
  address: Address,
  chainId: number = 1,
  limit: number = 100
): Promise<TokenTransfer[]> {
  // For now, return empty array as token transfer fetching requires:
  // 1. Complex event decoding
  // 2. Token contract interaction for metadata
  // 3. Indexer services for efficient querying
  
  // In production, integrate with:
  // - Alchemy API: getAssetTransfers
  // - The Graph: Subgraph queries
  // - Etherscan API: tokentx endpoint
  // - Custom indexer database
  
  console.warn("Token transfer fetching not fully implemented. Use an indexer service in production.")
  return []
}

/**
 * Analyze wallet privacy patterns from transaction data
 * Calculates predictability scores based on transaction patterns
 */
export function analyzeWalletPrivacy(
  transactions: TransactionData[]
): {
  timingPatterns: number // 0-100, higher = more predictable
  dexPreference: number // 0-100, higher = more predictable
  tokenReuse: number // 0-100, higher = more predictable
  gasFingerprint: number // 0-100, higher = more predictable
  predictabilityScore: number // 0-100, lower is better
  inferenceVectors: Array<{
    id: string
    type: string
    description: string
    riskLevel: "low" | "medium" | "high"
    recommendedAction: string
  }>
} {
  if (transactions.length === 0) {
    return {
      timingPatterns: 0,
      dexPreference: 0,
      tokenReuse: 0,
      gasFingerprint: 0,
      predictabilityScore: 0,
      inferenceVectors: [],
    }
  }

  // Analyze timing patterns
  // Calculate variance in time between transactions
  const timeDiffs: number[] = []
  for (let i = 1; i < transactions.length; i++) {
    const diff = transactions[i].timestamp - transactions[i - 1].timestamp
    timeDiffs.push(diff)
  }

  const avgTimeDiff =
    timeDiffs.reduce((sum, diff) => sum + diff, 0) / timeDiffs.length
  const timeVariance =
    timeDiffs.reduce(
      (sum, diff) => sum + Math.pow(diff - avgTimeDiff, 2),
      0
    ) / timeDiffs.length

  // Lower variance = more predictable timing
  const timingPatterns = Math.min(100, Math.max(0, 100 - timeVariance / 3600))

  // Analyze DEX preference
  // Count unique contract addresses (DEXs)
  const contractAddresses = new Set<string>()
  transactions.forEach((tx) => {
    if (tx.to && tx.input && tx.input !== "0x") {
      contractAddresses.add(tx.to.toLowerCase())
    }
  })

  // More transactions to fewer contracts = more predictable
  const dexPreference = Math.min(
    100,
    Math.max(0, (transactions.length / Math.max(1, contractAddresses.size)) * 10)
  )

  // Analyze token reuse
  // For now, use transaction value patterns as proxy
  const uniqueValues = new Set<string>()
  transactions.forEach((tx) => {
    if (tx.value > 0) {
      uniqueValues.add(tx.value.toString())
    }
  })

  const tokenReuse = Math.min(
    100,
    Math.max(0, 100 - (uniqueValues.size / transactions.length) * 100)
  )

  // Analyze gas fingerprint
  // Calculate variance in gas prices
  const gasPrices = transactions
    .filter((tx) => tx.gasPrice)
    .map((tx) => Number(tx.gasPrice!))

  if (gasPrices.length === 0) {
    return {
      timingPatterns,
      dexPreference,
      tokenReuse,
      gasFingerprint: 0,
      predictabilityScore: (timingPatterns + dexPreference + tokenReuse) / 3,
      inferenceVectors: generateInferenceVectors(
        timingPatterns,
        dexPreference,
        tokenReuse,
        0
      ),
    }
  }

  const avgGasPrice = gasPrices.reduce((sum, price) => sum + price, 0) / gasPrices.length
  const gasVariance =
    gasPrices.reduce((sum, price) => sum + Math.pow(price - avgGasPrice, 2), 0) /
    gasPrices.length

  // Lower variance = more predictable gas pattern
  const gasFingerprint = Math.min(100, Math.max(0, 100 - gasVariance / 1e9))

  // Calculate overall predictability score
  const predictabilityScore =
    (timingPatterns + dexPreference + tokenReuse + gasFingerprint) / 4

  // Generate inference vectors based on analysis
  const inferenceVectors = generateInferenceVectors(
    timingPatterns,
    dexPreference,
    tokenReuse,
    gasFingerprint
  )

  return {
    timingPatterns,
    dexPreference,
    tokenReuse,
    gasFingerprint,
    predictabilityScore,
    inferenceVectors,
  }
}

/**
 * Generate inference vectors based on analysis results
 */
function generateInferenceVectors(
  timingPatterns: number,
  dexPreference: number,
  tokenReuse: number,
  gasFingerprint: number
): Array<{
  id: string
  type: string
  description: string
  riskLevel: "low" | "medium" | "high"
  recommendedAction: string
}> {
  const vectors: Array<{
    id: string
    type: string
    description: string
    riskLevel: "low" | "medium" | "high"
    recommendedAction: string
  }> = []

  // Timing pattern inference
  if (timingPatterns > 70) {
    vectors.push({
      id: "timing-1",
      type: "Predictable Timing",
      description: "Your transactions follow a consistent timing pattern",
      riskLevel: "high",
      recommendedAction: "Add random delays to transactions",
    })
  } else if (timingPatterns > 50) {
    vectors.push({
      id: "timing-2",
      type: "Moderate Timing Pattern",
      description: "Some timing patterns detected in your transactions",
      riskLevel: "medium",
      recommendedAction: "Vary transaction timing",
    })
  }

  // DEX preference inference
  if (dexPreference > 70) {
    vectors.push({
      id: "dex-1",
      type: "Single DEX Usage",
      description: "You frequently use the same DEX, creating a pattern",
      riskLevel: "high",
      recommendedAction: "Rotate through multiple DEXs",
    })
  } else if (dexPreference > 50) {
    vectors.push({
      id: "dex-2",
      type: "DEX Preference",
      description: "You tend to use a few preferred DEXs",
      riskLevel: "medium",
      recommendedAction: "Diversify DEX usage",
    })
  }

  // Token reuse inference
  if (tokenReuse > 70) {
    vectors.push({
      id: "token-1",
      type: "Token Reuse Pattern",
      description: "You frequently reuse the same token amounts",
      riskLevel: "medium",
      recommendedAction: "Vary transaction amounts",
    })
  }

  // Gas fingerprint inference
  if (gasFingerprint > 70) {
    vectors.push({
      id: "gas-1",
      type: "Gas Fingerprint",
      description: "Your gas price patterns are predictable",
      riskLevel: "low",
      recommendedAction: "Vary gas prices",
    })
  }

  // Exchange linkage (simplified check)
  // In production, this would check against known exchange addresses
  if (vectors.length === 0) {
    vectors.push({
      id: "general-1",
      type: "Low Risk Profile",
      description: "Your transaction patterns show good privacy practices",
      riskLevel: "low",
      recommendedAction: "Continue current practices",
    })
  }

  return vectors
}

/**
 * Get wallet balance (native token)
 */
export async function getWalletBalance(
  address: Address,
  chainId: number = 1
): Promise<bigint> {
  const client = getPublicClient(chainId)
  return await client.getBalance({ address })
}

/**
 * Get transaction count (nonce) for a wallet
 */
export async function getTransactionCount(
  address: Address,
  chainId: number = 1
): Promise<number> {
  const client = getPublicClient(chainId)
  return await client.getTransactionCount({ address })
}

/**
 * Check if an address is a contract
 */
export async function isContract(
  address: Address,
  chainId: number = 1
): Promise<boolean> {
  const client = getPublicClient(chainId)
  const code = await client.getBytecode({ address })
  return code !== undefined && code !== "0x"
}

/**
 * Get block timestamp
 */
export async function getBlockTimestamp(
  blockNumber: bigint,
  chainId: number = 1
): Promise<number> {
  const client = getPublicClient(chainId)
  const block = await client.getBlock({ blockNumber })
  return Number(block.timestamp)
}

/**
 * Format transaction value for display
 */
export function formatTransactionValue(value: bigint, decimals: number = 18): string {
  return formatUnits(value, decimals)
}

/**
 * Calculate transaction frequency (transactions per day)
 */
export function calculateTransactionFrequency(
  transactions: TransactionData[]
): number {
  if (transactions.length < 2) return 0

  const oldestTx = transactions[transactions.length - 1]
  const newestTx = transactions[0]

  const timeDiff = newestTx.timestamp - oldestTx.timestamp
  const daysDiff = timeDiff / (24 * 60 * 60)

  return transactions.length / Math.max(1, daysDiff)
}

