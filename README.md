# CloakDesk

<div align="center">

![CloakDesk Logo](./public/logo.png)

**Privacy-First Blockchain Privacy Dashboard**

*Advanced on-chain privacy tools for Ethereum and EVM chains*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-6.13-627EEA?style=flat-square&logo=ethereum)](https://ethers.org/)
[![Wagmi](https://img.shields.io/badge/Wagmi-2.6-627EEA?style=flat-square)](https://wagmi.sh/)

[Live App](https://cloakdesk.app) • [Documentation](https://docs.cloakdesk.xyz) • [GitHub](https://github.com/cloakdesk)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Security](#security)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

CloakDesk is a comprehensive privacy-first dashboard for blockchain users who want to audit, analyze, and enhance their on-chain privacy. Built with modern web3 technologies, it provides tools for privacy analysis, transaction obfuscation, wallet shadowing, and zero-knowledge proof generation.

### Core Philosophy

- **Privacy as a Spectrum** - Not binary anonymity, but configurable privacy levels
- **User Control** - You decide what gets revealed
- **Transparency** - Understand your exposure before it becomes a problem
- **Practical Privacy** - Tools that work with transparent blockchains

---

## ✨ Features

### 🔒 Privacy Health Analysis

Analyze wallet predictability and privacy exposure using advanced on-chain analytics:

- **Timing Pattern Analysis** - Detect predictable transaction timing
- **DEX Preference Tracking** - Identify repeated DEX usage patterns
- **Token Reuse Detection** - Flag address reuse and token patterns
- **Gas Fingerprinting** - Analyze gas price patterns that create signatures
- **Inference Vector Detection** - Identify what external analysts can infer
- **Real-time Scoring** - Privacy score that updates with each transaction

**Technical Implementation:**
- Fetches transaction history via `viem` with batch processing (10 blocks at a time)
- Statistical variance calculations for timing patterns
- Graph clustering algorithms for address linking
- Heuristic-based analysis (Meiklejohn et al., 2013)

### 🛣️ Stealth Routing

Obfuscate transactions through multi-hop relayer networks:

- **Multi-Hop Routing** - Route transactions through multiple relayers
- **Profile-Based Obfuscation** - Light, Standard, and Max privacy profiles
- **Real-time Gas Estimation** - Dynamic cost calculation based on current network state
- **Task Queue Management** - Queue and track obfuscation tasks
- **Cross-Chain Support** - Works across Ethereum, Polygon, Arbitrum, Optimism

**Technical Implementation:**
```typescript
// Gas estimation with EIP-1559 support
const block = await client.getBlock({ blockTag: 'latest' })
const baseFee = block.baseFeePerGas || 20_000_000_000n
const priorityFee = 2_000_000_000n
const gasPrice = baseFee + priorityFee
const costWei = gasLimit * gasPrice
```

### 👥 Wallet Shadowing

Create decoy wallets with automated activity patterns:

- **Decoy Wallet Generation** - Generate wallets with `ethers.Wallet.createRandom()`
- **Persona-Based Activity** - Whale, Degen, or Small Trader personas
- **Encrypted Storage** - Private keys encrypted with AES-256-GCM
- **MongoDB Integration** - Persistent storage with encrypted keys
- **Noise Generation** - Create believable decoy transaction patterns

**Security Implementation:**
```typescript
// AES-256-GCM encryption
const iv = crypto.randomBytes(16)
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
const encrypted = cipher.update(privateKey, 'utf8', 'hex')
const authTag = cipher.getAuthTag()
// Storage: iv:authTag:encryptedData (hex format)
```

### 🔐 MPC Vault

Non-custodial multi-party computation key management:

- **Threshold Signatures** - Split private keys using Shamir's Secret Sharing
- **Configurable Thresholds** - Set K-of-N schemes (e.g., 3-of-5, 2-of-3)
- **ECDSA Multi-Party** - Collaborative signature generation without key reconstruction
- **Device Distribution** - Distribute key shards across devices/parties
- **No Single Point of Failure** - K-1 shards reveal nothing

**Cryptographic Details:**
- Private key `d` secret-shared as `d = d₁ + d₂ + ... + dₙ mod n`
- No party ever sees the full key `d`
- Signatures computed collaboratively via MPC protocols (SPDZ, BGW)

### 👁️ Selective Disclosure

Generate zero-knowledge proofs for verifiable claims:

- **ZK-SNARKs** - Succinct non-interactive arguments of knowledge
- **Privacy-Preserving KYC** - Prove compliance without exposing wallet addresses
- **Balance Proofs** - Verify funds without revealing exact amounts
- **Contribution Verification** - Prove project contributions without exposing history
- **Simulation-Extractability** - Proofs can't be forged and reveal nothing

**Performance:**
- Proof generation: ~200ms
- Proof verification: ~10ms
- Uses elliptic curve cryptography (PLONK, Groth16)

### 🏪 Relayer Marketplace

Browse and select from a network of independent relayers:

- **Decentralized Network** - No central gatekeeper
- **Relayer Profiles** - Reliability, costs, supported chains
- **Dynamic Selection** - Switch providers mid-stream
- **Cost Comparison** - Compare relayer fees and gas estimates
- **Multi-Chain Support** - Relayers across different EVM chains

### 🏆 Leaderboard

Track privacy rankings and earn badges:

- **Privacy Score Rankings** - Compare your privacy score with others
- **Badge System** - Earn achievements for privacy milestones
- **Progress Tracking** - Monitor privacy improvements over time
- **Community Rankings** - See how you compare to other users

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CloakDesk Frontend                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Next.js    │  │   Wagmi      │  │  React Query │       │
│  │  App Router  │  │  + RainbowKit│  │  (TanStack)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Analysis    │  │  Obfuscation │  │  Wallet APIs │       │
│  │   Routes     │  │    Routes    │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│    Viem      │  │   MongoDB    │  │   Encryption │
│  (Blockchain │  │  (Decoy      │  │   (AES-256-  │
│   Client)    │  │   Wallets)   │  │    GCM)      │
└──────────────┘  └──────────────┘  └──────────────┘
        │
        ▼
┌──────────────┐
│  EVM Chains  │
│  Ethereum    │
│  Polygon     │
│  Arbitrum    │
│  Optimism    │
└──────────────┘
```

### State Management Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    State Management Layers                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Zustand (UI State)                                 │    │
│  │  - Sidebar state                                    │    │
│  │  - Modal states                                     │    │
│  │  - Theme preferences                                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  React Query (Server State)                         │    │
│  │  - API data caching                                 │    │
│  │  - Background refetching                            │    │
│  │  - Optimistic updates                               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Wagmi (Wallet State)                              │    │
│  │  - Wallet connection                               │    │
│  │  - Chain information                               │    │
│  │  - Account data                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
components/
├── ui/                    # Radix UI primitives (accessible, unstyled)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── layout/               # Layout components
│   ├── app-shell.tsx     # Main app shell
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── topbar.tsx        # Top navigation bar
│   └── two-level-sidebar.tsx
├── charts/               # Data visualization
│   ├── privacy-radar.tsx # Radar chart for privacy scores
│   └── bar-chart.tsx     # Bar chart component
└── graphs/               # Graph visualization
    └── wallet-graph.tsx  # Cytoscape.js wallet connection graph
```

---

## 🛠️ Tech Stack

### Frontend Framework

- **[Next.js 14.2](https://nextjs.org/)** - React framework with App Router
  - Server Components for optimal performance
  - API Routes for backend functionality
  - Static Site Generation (SSG)
  - Image optimization
  - Automatic code splitting

### Language & Type Safety

- **[TypeScript 5.3](https://www.typescriptlang.org/)** - Type-safe JavaScript
  - Strict mode enabled
  - Full type coverage
  - Next.js TypeScript integration

### Styling

- **[TailwindCSS 3.4](https://tailwindcss.com/)** - Utility-first CSS
  - Custom cyberpunk color palette
  - Responsive design utilities
  - Dark theme by default
  - Custom animations and transitions

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
  - Unstyled, accessible components
  - Keyboard navigation
  - ARIA labels
  - Focus management

### Animations

- **[Framer Motion 11.3](https://www.framer.com/motion/)** - Animation library
  - Smooth page transitions
  - Component animations
  - Gesture support

### Data Fetching

- **[TanStack Query 5.28](https://tanstack.com/query)** - Server state management
  - Automatic caching
  - Background refetching
  - Optimistic updates
  - Request deduplication

### State Management

- **[Zustand 4.5](https://zustand-demo.pmnd.rs/)** - Lightweight state management
  - Simple API
  - TypeScript support
  - Persistence middleware

### Blockchain Integration

- **[Wagmi 2.6](https://wagmi.sh/)** - React Hooks for Ethereum
  - Wallet connection management
  - Chain switching
  - Transaction handling
  - Account management

- **[Viem 2.6](https://viem.sh/)** - TypeScript Ethereum library
  - Multi-chain support
  - Type-safe contract interactions
  - RPC client abstraction

- **[Ethers.js 6.13](https://ethers.org/)** - Ethereum library
  - Wallet generation
  - Transaction signing
  - Contract interactions

- **[RainbowKit 2.1](https://www.rainbowkit.com/)** - Wallet connection UI
  - Beautiful wallet modal
  - Multi-wallet support (MetaMask, Coinbase, Phantom, Trust, Rainbow)
  - Mobile wallet support via WalletConnect

### Data Visualization

- **[Recharts 2.12](https://recharts.org/)** - Chart library
  - Privacy score radar charts
  - Bar charts for analytics
  - Responsive design

- **[Cytoscape.js 3.27](https://js.cytoscape.org/)** - Graph visualization
  - Wallet connection graphs
  - Interactive network visualization
  - Custom styling and layouts

### Backend & Database

- **[MongoDB 7.0](https://www.mongodb.com/)** - NoSQL database
  - Decoy wallet storage
  - Obfuscation task queue
  - Encrypted private key storage

### Cryptography

- **Node.js Crypto Module** - Built-in cryptographic functions
  - AES-256-GCM encryption
  - PBKDF2 key derivation
  - Secure random number generation

### Utilities

- **[Lucide React 0.400](https://lucide.dev/)** - Icon library
- **[date-fns 3.3](https://date-fns.org/)** - Date manipulation
- **[clsx 2.1](https://github.com/lukeed/clsx)** - Conditional class names
- **[tailwind-merge 2.3](https://github.com/dcastil/tailwind-merge)** - Tailwind class merging

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **WalletConnect Project ID** (get from [cloud.walletconnect.com](https://cloud.walletconnect.com))
- **MongoDB** (for decoy wallet storage - optional for basic features)

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd cloak-desk
```

2. **Install dependencies**:
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

3. **Create `.env.local` file**:
```env
# Required: WalletConnect Project ID
# Get from https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id

# Optional: Custom RPC endpoints
NEXT_PUBLIC_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY

# Optional: Backend API URL (defaults to /api)
NEXT_PUBLIC_API_URL=/api

# Optional: MongoDB connection (for decoy wallet storage)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cloak?retryWrites=true&w=majority

# Required for wallet shadowing: Encryption key (32 bytes hex)
# Generate with: openssl rand -hex 32
ENCRYPTION_KEY=your-32-byte-hex-encryption-key-here
```

4. **Run the development server**:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. **Open your browser**:
```
http://localhost:3000
```

### First Steps

1. **Connect your wallet** - Click "Connect Wallet" and select your preferred wallet
2. **View Privacy Health** - Navigate to Privacy Health to see your current privacy score
3. **Explore Features** - Check out Stealth Routing, Wallet Shadowing, and other features
4. **Read Documentation** - Visit [docs.cloakdesk.xyz](https://docs.cloakdesk.xyz) for detailed guides

---

## 📁 Project Structure

```
cloak-desk/
├── app/                          # Next.js App Router
│   ├── api/                      # API route handlers
│   │   ├── analysis/             # Privacy analysis endpoints
│   │   │   ├── deep-scan/        # POST /api/analysis/deep-scan
│   │   │   └── [jobId]/          # GET /api/analysis/:jobId
│   │   ├── obfuscate/            # Transaction obfuscation
│   │   │   ├── queue/            # POST /api/obfuscate/queue
│   │   │   └── tasks/             # GET /api/obfuscate/tasks
│   │   ├── wallets/              # Decoy wallet management
│   │   │   ├── generate/         # POST /api/wallets/generate
│   │   │   ├── route.ts          # GET /api/wallets
│   │   │   └── [walletId]/
│   │   │       └── private-key/  # GET /api/wallets/:id/private-key
│   │   ├── relayers/             # Relayer queries
│   │   │   └── query/            # POST /api/relayers/query
│   │   ├── proof/                 # Zero-knowledge proofs
│   │   │   └── generate/         # POST /api/proof/generate
│   │   ├── mpc/                   # MPC vault
│   │   │   └── create-vault/     # POST /api/mpc/create-vault
│   │   ├── payments/              # Credit purchases
│   │   │   └── credits/          # POST /api/payments/credits
│   │   └── leaderboard/           # GET /api/leaderboard
│   ├── dashboard/                 # Dashboard pages
│   │   ├── layout.tsx            # Dashboard layout with wallet guard
│   │   ├── overview/             # Dashboard overview page
│   │   ├── privacy-health/       # Privacy analysis page
│   │   ├── stealth-routing/      # Obfuscation task management
│   │   ├── wallet-shadowing/     # Decoy wallet management
│   │   ├── mpc-vault/           # MPC vault interface
│   │   ├── selective-disclosure/ # ZK proof generation
│   │   ├── relayer-marketplace/  # Relayer browser
│   │   ├── leaderboard/          # Privacy rankings
│   │   └── settings/            # User settings
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                    # React components
│   ├── ui/                       # Radix UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── app-shell.tsx         # Main app shell
│   │   ├── sidebar.tsx          # Navigation sidebar
│   │   ├── topbar.tsx           # Top navigation bar
│   │   └── two-level-sidebar.tsx
│   ├── charts/                   # Data visualization
│   │   ├── privacy-radar.tsx     # Privacy score radar chart
│   │   └── bar-chart.tsx         # Bar chart component
│   ├── graphs/                   # Graph visualization
│   │   └── wallet-graph.tsx      # Cytoscape.js wallet graph
│   └── providers.tsx             # React context providers
│
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client functions
│   ├── wagmi-config.ts          # Wagmi + RainbowKit configuration
│   ├── ethers.ts                 # Ethers.js utilities
│   ├── blockchain.ts             # Blockchain interaction helpers
│   ├── encryption.ts             # AES-256-GCM encryption utilities
│   ├── wallet-generation.ts      # Wallet generation functions
│   ├── mongodb.ts                # MongoDB connection and models
│   ├── zk.ts                     # Zero-knowledge proof helpers
│   └── utils.ts                  # General utility functions
│
├── state/                        # State management
│   └── useAppStore.ts           # Zustand store for UI state
│
├── public/                       # Static assets
│   ├── logo.png                 # CloakDesk logo
│   ├── og-banner.png            # Open Graph image
│   ├── screenshot.png           # App screenshot
│   └── favicon.ico              # Site favicon
│
├── docs/                         # Documentation site (separate Next.js app)
│   ├── app/                     # Docs pages
│   ├── public/                  # Docs assets
│   └── package.json            # Docs dependencies
│
├── package.json                  # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # TailwindCSS configuration
├── next.config.js               # Next.js configuration
└── README.md                    # This file
```

---

## 🔌 API Reference

### Privacy Analysis

#### `POST /api/analysis/deep-scan`

Start a deep privacy analysis scan for a wallet address.

**Request Body:**
```typescript
{
  address: string  // Ethereum address to analyze
}
```

**Response:**
```typescript
{
  success: boolean
  data: {
    jobId: string
    status: "completed" | "processing" | "pending"
    results?: {
      predictabilityScore: number  // 0-100, lower is better
      breakdown: {
        timingPatterns: number
        dexPreference: number
        tokenReuse: number
        gasFingerprint: number
      }
      inferenceVectors: Array<{
        id: string
        type: string
        description: string
        riskLevel: "low" | "medium" | "high"
        recommendedAction: string
      }>
    }
  }
  error?: string
}
```

#### `GET /api/analysis/:jobId`

Get analysis results by job ID.

**Response:**
```typescript
{
  success: boolean
  data: PrivacyAnalysisJob
  error?: string
}
```

### Obfuscation Tasks

#### `POST /api/obfuscate/queue`

Queue a transaction for obfuscation.

**Request Body:**
```typescript
{
  userId: string              // Wallet address of user
  sourceWallet: string         // Source wallet address
  tokens: string[]            // Tokens to obfuscate (ETH, USDC, etc.)
  profile: "light" | "standard" | "max"  // Obfuscation profile
  scheduledFor?: string       // ISO timestamp (optional)
  relayerId?: string         // Preferred relayer (optional)
  chainId?: number           // Chain ID (default: 1)
}
```

**Response:**
```typescript
{
  success: boolean
  data: {
    id: string
    status: "queued" | "processing" | "completed" | "failed"
    costEstimate: string
    createdAt: string
  }
  error?: string
}
```

#### `GET /api/obfuscate/tasks`

Get all obfuscation tasks for a user.

**Query Parameters:**
- `userId` (required): Wallet address

**Response:**
```typescript
{
  success: boolean
  data: ObfuscationTask[]
  error?: string
}
```

### Decoy Wallets

#### `POST /api/wallets/generate`

Generate decoy wallets.

**Request Body:**
```typescript
{
  userId: string           // Wallet address of user
  count: number            // Number of wallets to generate (2-10)
  persona: string         // "whale" | "degen" | "small-trader"
}
```

**Response:**
```typescript
{
  success: boolean
  data: {
    count: number
    wallets: Array<{
      id: string
      address: string
      persona: string
      status: "active" | "inactive"
    }>
  }
  error?: string
}
```

#### `GET /api/wallets`

Get all decoy wallets for a user.

**Query Parameters:**
- `userId` (required): Wallet address

**Response:**
```typescript
{
  success: boolean
  data: {
    wallets: DecoyWallet[]
  }
  error?: string
}
```

#### `GET /api/wallets/:walletId/private-key`

Get decrypted private key for a decoy wallet.

**Response:**
```typescript
{
  success: boolean
  data: {
    privateKey: string  // Decrypted private key
  }
  error?: string
}
```

#### `DELETE /api/wallets/:walletId`

Delete a decoy wallet.

**Query Parameters:**
- `userId` (required): Wallet address

**Response:**
```typescript
{
  success: boolean
  data: {
    deleted: boolean
  }
  error?: string
}
```

### Relayers

#### `POST /api/relayers/query`

Query available relayers.

**Request Body:**
```typescript
{
  chainId?: number        // Filter by chain ID
  minReliability?: number // Minimum reliability score
  maxCost?: string        // Maximum cost in wei
}
```

**Response:**
```typescript
{
  success: boolean
  data: {
    relayers: Relayer[]
  }
  error?: string
}
```

### Zero-Knowledge Proofs

#### `POST /api/proof/generate`

Generate a zero-knowledge proof.

**Request Body:**
```typescript
{
  proofType: "balance" | "kyc" | "contribution"
  walletAddress: string
  threshold?: number     // For balance proofs
  // ... other type-specific fields
}
```

**Response:**
```typescript
{
  success: boolean
  data: {
    proof: string        // ZK proof data
    publicInputs: any    // Public inputs for verification
  }
  error?: string
}
```

### Leaderboard

#### `GET /api/leaderboard`

Get privacy leaderboard rankings.

**Query Parameters:**
- `limit` (optional): Number of results (default: 100)
- `offset` (optional): Pagination offset

**Response:**
```typescript
{
  success: boolean
  data: {
    rankings: Array<{
      rank: number
      address: string
      privacyScore: number
      badge?: string
    }>
  }
  error?: string
}
```

---

## 🔒 Security

### Encryption

Private keys are encrypted using **AES-256-GCM** before storage:

```typescript
// Encryption process
const iv = crypto.randomBytes(16)
const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv)
const encrypted = cipher.update(privateKey, 'utf8', 'hex')
const authTag = cipher.getAuthTag()

// Storage format: iv:authTag:encryptedData (all hex)
const stored = `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
```

**Key Requirements:**
- Encryption key must be 32 bytes (256 bits)
- Generate with: `openssl rand -hex 32`
- Store securely in environment variables
- Never commit to version control

### Wallet Security

- **No Server-Side Key Storage** - Private keys never stored unencrypted
- **Client-Side Signing** - All transactions signed in the browser
- **MPC Threshold Security** - Keys split across multiple devices/parties
- **Encrypted Database** - MongoDB stores only encrypted private keys

### Best Practices

1. **Environment Variables** - Never commit `.env.local` to git
2. **Encryption Keys** - Use strong, randomly generated keys
3. **Wallet Signatures** - All sensitive operations require wallet signatures
4. **HTTPS Only** - Always use HTTPS in production
5. **Input Validation** - Validate all user inputs
6. **Rate Limiting** - Implement rate limiting on API routes

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Testing
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
```

### Development Workflow

1. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**:
   - Write TypeScript code with proper types
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**:
```bash
npm run lint         # Check for linting errors
npm run build        # Ensure build succeeds
```

4. **Commit and push**:
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

### Code Style

- **TypeScript** - Strict mode enabled, full type coverage
- **ESLint** - Next.js recommended configuration
- **Formatting** - 2 spaces indentation
- **Components** - Functional components with TypeScript
- **Naming** - camelCase for variables, PascalCase for components

### Adding New Features

1. **Create API route** (if needed):
   - Add file in `app/api/feature-name/route.ts`
   - Export `GET`, `POST`, etc. functions
   - Add TypeScript types

2. **Create dashboard page**:
   - Add file in `app/dashboard/feature-name/page.tsx`
   - Add to sidebar navigation in `components/layout/sidebar.tsx`

3. **Add API client function**:
   - Add function in `lib/api.ts`
   - Export TypeScript interfaces

4. **Update documentation**:
   - Add feature docs in `docs/app/features/feature-name/page.tsx`

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
```bash
git push origin main
```

2. **Import in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**:
   - Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - Add `MONGODB_URI` (if using MongoDB)
   - Add `ENCRYPTION_KEY` (for wallet shadowing)

4. **Deploy**:
   - Vercel will automatically deploy on push
   - Preview deployments for pull requests

### Environment Variables

**Required:**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID

**Optional:**
- `NEXT_PUBLIC_RPC_URL` - Custom RPC endpoint
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `MONGODB_URI` - MongoDB connection string
- `ENCRYPTION_KEY` - 32-byte hex encryption key

### Build Configuration

Next.js automatically optimizes:
- **Code Splitting** - Route-based automatic splitting
- **Image Optimization** - Automatic image optimization
- **CSS Optimization** - Purged unused CSS
- **Minification** - JavaScript and CSS minified

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-start: #7c3aed  /* Violet */
--primary-end: #ec4899     /* Pink */
--electric: #00f5ff        /* Cyan */

/* Background Colors */
--bg900: #0a0a0f          /* Darkest */
--bg800: #111118
--bg700: #1a1a24
--bg600: #252530

/* Text Colors */
--text-primary: #ffffff
--text-secondary: #a0a0a0
--muted: #6b7280

/* Status Colors */
--success: #10b981        /* Green */
--danger: #ef4444         /* Red */
--warning: #f59e0b        /* Orange */
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Sizes**: Responsive scale using Tailwind defaults
- **Line Height**: 1.5 (default), 1.75 (relaxed)

### Components

All components follow accessibility best practices:
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Focus management
- ✅ Color contrast >= 4.5:1
- ✅ Screen reader support

---

## 📊 Performance

### Optimization Features

- **Static Site Generation** - Pre-rendered pages where possible
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **CSS Optimization** - Purged unused styles
- **Caching** - React Query automatic caching
- **Lazy Loading** - Components loaded on demand

### Target Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Performance**: 90+
- **Bundle Size**: Optimized with code splitting

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**:
   - Write clean, documented code
   - Add comments for complex logic
   - Follow TypeScript best practices
   - Update documentation if needed
4. **Test your changes**: `npm run build && npm run lint`
5. **Commit your changes**: `git commit -m "feat: add amazing feature"`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Contribution Guidelines

- ✅ Write clear, documented code
- ✅ Add TypeScript types for all functions
- ✅ Follow existing code style
- ✅ Add tests for new features
- ✅ Update documentation
- ✅ Keep commits atomic and descriptive

---

## 📄 License

[Add your license here]

---

## 🔗 Links

- **Live Application**: [https://cloakdesk.app](https://cloakdesk.app)
- **Documentation**: [https://docs.cloakdesk.xyz](https://docs.cloakdesk.xyz)
- **GitHub Repository**: [https://github.com/cloakdesk](https://github.com/cloakdesk)
- **Support Email**: [support@cloakdesk.io](mailto:support@cloakdesk.io)

---

## ⚠️ Disclaimer

This software is provided for educational and research purposes. Privacy tooling is complex, and no solution provides absolute anonymity. Users should understand the risks and limitations before using obfuscation features. Always comply with local laws and regulations.

**Important Notes:**
- Privacy tools are not a guarantee of anonymity
- On-chain data is permanent and public
- Use privacy tools responsibly
- Understand the technical limitations
- Comply with applicable laws and regulations

---

<div align="center">

**Built with ❤️ by the CloakDesk Team**

[Privacy First](https://cloakdesk.app) • [Documentation](https://docs.cloakdesk.xyz) • [GitHub](https://github.com/cloakdesk)

</div>
