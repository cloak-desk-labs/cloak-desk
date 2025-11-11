import Link from "next/link"
import { Shield, Route, UserCog, Lock, Eye, Store, Trophy, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features - CloakDesk Documentation",
  description: "Explore CloakDesk privacy features including Privacy Health, Stealth Routing, Wallet Shadowing, and more",
  openGraph: {
    title: "Features - CloakDesk Documentation",
    description: "Explore CloakDesk privacy features including Privacy Health, Stealth Routing, Wallet Shadowing, and more",
    url: "https://docs.cloakdesk.xyz/features",
    images: [
      {
        url: "https://docs.cloakdesk.xyz/og-banner.png",
        width: 1440,
        height: 810,
        alt: "CloakDesk Documentation - Features",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features - CloakDesk Documentation",
    description: "Explore CloakDesk privacy features including Privacy Health, Stealth Routing, Wallet Shadowing, and more",
    images: ["https://docs.cloakdesk.xyz/og-banner.png"],
  },
}

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: "Privacy Health",
      description: "Analyze your wallet's privacy exposure with advanced analytics. Get detailed risk scores and actionable insights to improve your anonymity.",
      href: "/features/privacy-health",
    },
    {
      icon: Route,
      title: "Stealth Routing",
      description: "Obfuscate transactions through multi-hop routing and relayer networks. Break transaction patterns and enhance privacy.",
      href: "/features/stealth-routing",
    },
    {
      icon: UserCog,
      title: "Wallet Shadowing",
      description: "Create decoy wallets and generate noise to mask your real transaction patterns. Confuse on-chain analysis.",
      href: "/features/wallet-shadowing",
    },
    {
      icon: Lock,
      title: "MPC Vault",
      description: "Non-custodial multi-party computation for secure key management. Never store private keys in one place.",
      href: "/features/mpc-vault",
    },
    {
      icon: Eye,
      title: "Selective Disclosure",
      description: "Generate zero-knowledge proofs for verifiable claims without revealing sensitive information. Prove without exposing.",
      href: "/features/selective-disclosure",
    },
    {
      icon: Store,
      title: "Relayer Marketplace",
      description: "Browse and select from trusted relayers for transaction obfuscation. Compare fees, ratings, and compliance policies.",
      href: "/features/relayer-marketplace",
    },
    {
      icon: Trophy,
      title: "Privacy Leaderboard",
      description: "Track your privacy ranking and compete with others. Earn badges for maintaining excellent privacy practices.",
      href: "/features/leaderboard",
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">
            <span className="gradient-text">Features</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Comprehensive suite of privacy tools for blockchain anonymity
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="card-hover group"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-textPrimary mb-2 group-hover:text-primaryStart transition-colors">
                  {feature.title}
                </h2>
                <p className="text-muted mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-sm text-primaryStart opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

