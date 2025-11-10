# CloakDesk

Privacy-first web dashboard for blockchain privacy and anonymity. Built with Next.js, TypeScript, TailwindCSS, and modern web3 technologies.

## Features

- **Privacy Health Analysis**: Assess wallet predictability and privacy exposure
- **Stealth Routing**: Obfuscate transactions through multi-hop routing
- **Wallet Shadowing**: Create decoy wallets for noise generation
- **MPC Vault**: Non-custodial multi-party computation key management
- **Selective Disclosure**: Generate zero-knowledge proofs for verifiable claims
- **Relayer Marketplace**: Browse and select relayers for obfuscation
- **Leaderboard**: Track privacy rankings and earn badges

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom cyberpunk theme
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Data Fetching**: TanStack Query (React Query)
- **State Management**: Zustand
- **Wallet Connection**: Wagmi + RainbowKit
- **Blockchain**: Ethers.js
- **Charts**: Recharts
- **Graph Visualization**: Cytoscape.js

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- WalletConnect Project ID (for wallet connections)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cloak-desk
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env.local` file:
```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id

# RPC URLs (optional, defaults to public endpoints)
NEXT_PUBLIC_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY

# API URL (optional, defaults to /api)
NEXT_PUBLIC_API_URL=/api
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
cloak-desk/
├── app/                    # Next.js app router pages
│   ├── api/               # API route handlers
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Radix UI components
│   ├── layout/            # Layout components (Sidebar, Topbar)
│   ├── charts/            # Chart components
│   └── graphs/            # Graph visualization components
├── lib/
│   ├── api.ts             # API client functions
│   ├── ethers.ts          # Ethers.js utilities
│   ├── zk.ts              # ZK proof helpers
│   ├── utils.ts           # Utility functions
│   └── wagmi-config.ts    # Wagmi configuration
├── state/
│   └── useAppStore.ts     # Zustand store
└── public/                # Static assets
```

## API Routes

All API routes are stubbed with mock data. To integrate with a real backend:

1. Update API functions in `lib/api.ts`
2. Replace mock data in `app/api/**/route.ts` files
3. Configure backend endpoints in `.env.local`

### Available Endpoints

- `POST /api/analysis/deep-scan` - Start privacy analysis
- `GET /api/analysis/:jobId` - Get analysis results
- `POST /api/relayers/query` - Query relayers
- `POST /api/obfuscate/queue` - Queue obfuscation task
- `GET /api/obfuscate/tasks` - List user tasks
- `POST /api/proof/generate` - Generate ZK proof
- `GET /api/leaderboard` - Get leaderboard data
- `POST /api/mpc/create-vault` - Create MPC vault
- `POST /api/payments/credits` - Buy credits

## Development

### Build for Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

### Testing

```bash
# Unit tests (when implemented)
pnpm test

# E2E tests (when implemented)
pnpm test:e2e
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables

Required:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID

Optional:
- `NEXT_PUBLIC_RPC_URL` - Custom RPC endpoint
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Architecture Notes

### State Management

- **Zustand**: UI state (sidebar, modals, theme)
- **React Query**: Server state (API data, caching)
- **Wagmi**: Wallet connection state

### Component Patterns

- All UI components use Radix UI primitives for accessibility
- Components are typed with TypeScript
- Styling uses TailwindCSS with custom design tokens
- Animations use Framer Motion for subtle interactions

### Security Considerations

- Never store private keys server-side
- All sensitive operations require wallet signatures
- ZK proofs are generated client-side or via secure backend
- Relayer interactions use meta-transactions

## Backend Integration

To integrate with a real backend:

1. **Update API Client** (`lib/api.ts`):
   - Replace mock functions with actual fetch calls
   - Add authentication headers if needed
   - Handle errors appropriately

2. **Update API Routes** (`app/api/**/route.ts`):
   - Connect to your database
   - Implement actual business logic
   - Add authentication/authorization

3. **ZK Proof Generation**:
   - Integrate with ZK proof generation service
   - Update `lib/zk.ts` with real implementations

4. **Relayer Integration**:
   - Connect to relayer APIs
   - Implement transaction forwarding
   - Add relayer selection logic

## Design System

### Colors

- **Backgrounds**: `bg-900` (#0b0f14), `bg-800` (#0f1720)
- **Primary**: Teal to violet gradient (`#06b6d4` → `#7c3aed`)
- **Electric**: `#8b5cf6`
- **Muted Text**: `#9ba7b2`
- **Status**: Success (`#10b981`), Danger (`#ef4444`), Warning (`#f59e0b`)

### Typography

- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale using Tailwind defaults

### Components

All components follow accessibility best practices:
- Keyboard navigation
- ARIA labels
- Focus management
- Color contrast >= 4.5:1

## Contributing

1. Follow the code style (ESLint + Prettier)
2. Write clear, documented code
3. Add comments for complex logic
4. Test your changes thoroughly

## License

[Add your license here]

## Support

For issues and questions:
- GitHub Issues: [repository-url]/issues
- Email: support@cloakdesk.io

## Disclaimer

This software is provided for educational and research purposes. Privacy tooling is complex, and no solution provides absolute anonymity. Users should understand the risks and limitations before using obfuscation features. Always comply with local laws and regulations.

