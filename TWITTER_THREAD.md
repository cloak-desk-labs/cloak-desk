# CloakDesk Technical Twitter Thread

1/ Built a privacy analytics engine that identifies on-chain inference vectors.

Problem: Your transaction patterns leak information. Timing, gas prices, DEX usage, token reuse—all trackable.

Solution: Analyze real tx data via viem, compute statistical variance, generate predictability scores.

Tech: Next.js 14, TypeScript, viem (multi-chain), MongoDB, AES-256-GCM encryption.

2/ Privacy analysis algorithm:

Fetches tx history using viem's getBlock with includeTransactions. Processes blocks in batches of 10 to avoid RPC rate limits.

Analyzes 4 vectors:
- Timing variance: σ² of inter-tx intervals
- DEX clustering: |unique contracts| / |total txs|
- Value patterns: reuse frequency
- Gas fingerprint: variance in gasPrice

```typescript
const timeVariance = transactions.reduce((sum, tx, i) => {
  const diff = tx.timestamp - transactions[i-1].timestamp
  return sum + Math.pow(diff - avgDiff, 2)
}, 0) / transactions.length

const predictability = Math.min(100, 100 - timeVariance / 3600)
```

3/ Stealth routing implementation:

Queues obfuscation tasks with real-time gas estimation:
```typescript
const block = await client.getBlock({ blockTag: 'latest' })
const baseFee = block.baseFeePerGas || 20_000_000_000n
const priorityFee = 2_000_000_000n
const gasPrice = baseFee + priorityFee
const costWei = gasLimit * gasPrice
```

Profiles: light (100k gas), standard (200k gas), max (500k gas).

Tasks stored in MongoDB, processed by relayer network via meta-txs.

4/ Wallet shadowing (decoy generation):

Generates wallets using ethers.Wallet.createRandom(). Private keys encrypted with AES-256-GCM before storage:

```typescript
const iv = crypto.randomBytes(16)
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
const encrypted = cipher.update(privateKey, 'utf8', 'hex')
const authTag = cipher.getAuthTag()
// Storage format: iv:authTag:encryptedData (all hex)
```

Keys derived from ENCRYPTION_KEY env var (32 bytes). Uses PBKDF2 if key isn't hex.

5/ MPC vault architecture:

Non-custodial threshold signatures. Key fragments distributed across multiple parties. No single party can reconstruct the key.

Use case: High-value wallets requiring t-of-n signatures. Eliminates single points of failure.

Currently stubbed—integration with MPC libraries (tss-lib, multi-party-ecdsa) planned.

6/ ZK proof generation:

Selective disclosure proofs. Prove claims without revealing data:
- KYC status (prove verified without revealing identity)
- Token balance (prove >= X without revealing exact amount)
- Contributions (prove participation without revealing amount)

Currently stubbed—will integrate Circom/SnarkJS for real circuit compilation.

7/ Blockchain data processing:

Multi-chain support via viem's chain abstraction:
- Mainnet (1), Polygon (137), Arbitrum (42161), Optimism (10), Sepolia (11155111)

Fetches up to 500 txs per analysis. Scans last 100 blocks by default. Parallel block fetching with Promise.all() for performance.

In production: Use The Graph or Alchemy for faster queries. Current implementation scans blocks directly.

8/ Transaction graph analysis:

Uses Cytoscape.js for network visualization. Renders wallet connections, tx flows, cluster detection.

Helps identify which addresses are linked. Shows transaction graph structure that needs obfuscation.

Graph analysis identifies:
- Strongly connected components
- Bridge nodes (high centrality)
- Isolated clusters

9/ Relayer marketplace:

Decentralized relayer selection. Users browse relayers by:
- Uptime percentage
- Fee structure (flat vs percentage)
- Supported chains
- Privacy guarantees (no-logging policies)

Relayers execute obfuscation via meta-transactions. User signs payload, relayer submits tx and pays gas.

10/ API architecture:

Next.js App Router API routes:
```
POST /api/analysis/deep-scan
  - Validates address with viem's isAddress()
  - Fetches tx history
  - Runs privacy analysis
  - Returns jobId + results

POST /api/obfuscate/queue
  - Validates inputs (userId, sourceWallet, tokens, profile)
  - Calculates gas cost estimate
  - Stores task in MongoDB
  - Returns taskId

GET /api/obfuscate/tasks
  - Queries MongoDB by userId
  - Returns task list with status
```

11/ Encryption implementation details:

AES-256-GCM provides authenticated encryption. Random IV per encryption prevents pattern analysis. Auth tag detects tampering.

Key management:
- 32-byte key from ENCRYPTION_KEY env var
- PBKDF2 derivation if key isn't hex (100k iterations, SHA-256)
- Warns if key not set (data won't be decryptable after restart)

Format: `iv:authTag:encryptedData` (all hex strings, colon-separated)

12/ Privacy analysis inference vectors:

Generates risk vectors based on scores:
- High risk (>70): Predictable timing, single DEX usage
- Medium risk (50-70): Moderate patterns
- Low risk (<50): Good privacy practices

Each vector includes:
- Type (timing, DEX, token, gas)
- Description
- Risk level
- Recommended action

Example: "Predictable Timing - Your transactions follow a consistent timing pattern. Risk: High. Action: Add random delays."

13/ State management:

- Zustand: UI state (sidebar, modals, theme)
- TanStack Query: Server state (API data, caching, refetching)
- Wagmi: Wallet connection state (address, chain, balance)

React Query caches API responses. Refetches on window focus, network reconnect. Optimistic updates for task creation.

14/ Performance optimizations:

- Batch block processing (10 blocks parallel)
- Transaction limit (500 max per analysis)
- MongoDB indexing on userId, sourceWallet, status
- React Query caching (staleTime: 5min)
- Lazy loading for graph visualization

Block scanning is the bottleneck. In production, use indexers (The Graph, Alchemy) for faster queries.

15/ Security considerations:

- Private keys never stored in plaintext server-side
- All sensitive ops require wallet signatures
- Encryption keys in env vars (never in code)
- ZK proofs generated client-side or secure backend
- Relayer meta-txs (user never exposes private key)

Encryption key rotation: Change ENCRYPTION_KEY → re-encrypt all stored keys. Old keys become unreadable.

16/ Multi-chain transaction fetching:

Uses viem's createPublicClient with chain-specific configs:
```typescript
const CHAIN_MAP: Record<number, Chain> = {
  1: mainnet,
  137: polygon,
  42161: arbitrum,
  10: optimism,
  11155111: sepolia,
}

const client = createPublicClient({
  chain: CHAIN_MAP[chainId],
  transport: http(rpcUrl, { timeout: 30000 }),
})
```

RPC URLs from env or public endpoints. Timeout: 30s.

17/ Privacy leaderboard:

Gamified scoring system. Tracks:
- Predictability scores (lower = better)
- Obfuscation activity count
- Privacy health improvements over time
- Network graph complexity (more decoys = higher score)

Rankings calculated from composite score. Badges for milestones (10 obfuscations, 50% predictability reduction, etc.)

18/ Future work:

- The Graph integration (faster tx queries)
- Cross-chain privacy analysis
- Real ZK circuits (Circom/SnarkJS)
- Relayer reputation system (on-chain ratings)
- Differential privacy for analytics

Current limitations:
- Block scanning is slow (use indexers in prod)
- ZK proofs are stubbed (need circuit compilation)
- MPC is stubbed (need tss-lib integration)

19/ Tech stack:

Frontend: Next.js 14 (App Router), React Server Components, TailwindCSS
State: Zustand, TanStack Query, Wagmi
Blockchain: viem, ethers.js
Database: MongoDB
Encryption: Node.js crypto (AES-256-GCM)
Visualization: Cytoscape.js, Recharts

All open-source. Privacy tools should be auditable.

20/ Takeaways:

On-chain privacy is hard. Transaction patterns leak information. Timing, gas, DEX usage—all trackable.

CloakDesk analyzes these patterns, identifies risks, and provides obfuscation tools (stealth routing, decoy wallets).

But privacy is a spectrum. Absolute anonymity is impossible on public blockchains. Best we can do is reduce inference vectors.

#Web3 #Privacy #Blockchain #ZeroKnowledge #Ethereum

