import Link from "next/link"
import { Shield, Route, Lock, UserCog, Eye, Store, Trophy, ArrowRight, BookOpen, Code, Zap } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CloakDesk Documentation - Privacy-First Blockchain Dashboard",
  description: "Complete guide to protecting your blockchain privacy with advanced tools and features",
  openGraph: {
    title: "CloakDesk Documentation - Privacy-First Blockchain Dashboard",
    description: "Complete guide to protecting your blockchain privacy with advanced tools and features",
    url: "https://docs.cloakdesk.xyz",
    images: [
      {
        url: "https://docs.cloakdesk.xyz/og-banner.png",
        width: 1440,
        height: 810,
        alt: "CloakDesk Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloakDesk Documentation - Privacy-First Blockchain Dashboard",
    description: "Complete guide to protecting your blockchain privacy with advanced tools and features",
    images: ["https://docs.cloakdesk.xyz/og-banner.png"],
  },
}

export default function DocsHomePage() {
  const quickLinks = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn how to set up and use CloakDesk",
      href: "/getting-started",
      color: "from-primaryStart to-primaryEnd",
    },
    {
      icon: Shield,
      title: "Privacy Health",
      description: "Understand privacy analysis and risk scoring",
      href: "/features/privacy-health",
      color: "from-primaryEnd to-electric",
    },
    {
      icon: Route,
      title: "Stealth Routing",
      description: "Obfuscate transactions through multi-hop routing",
      href: "/features/stealth-routing",
      color: "from-electric to-primaryStart",
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation and endpoints",
      href: "/api",
      color: "from-primaryStart to-primaryEnd",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Privacy Health",
      href: "/features/privacy-health",
    },
    {
      icon: Route,
      title: "Stealth Routing",
      href: "/features/stealth-routing",
    },
    {
      icon: UserCog,
      title: "Wallet Shadowing",
      href: "/features/wallet-shadowing",
    },
    {
      icon: Lock,
      title: "MPC Vault",
      href: "/features/mpc-vault",
    },
    {
      icon: Eye,
      title: "Selective Disclosure",
      href: "/features/selective-disclosure",
    },
    {
      icon: Store,
      title: "Relayer Marketplace",
      href: "/features/relayer-marketplace",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      href: "/features/leaderboard",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative h-16 w-16">
                <Image
                  src="/logo.png"
                  alt="CloakDesk Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-textPrimary sm:text-6xl lg:text-7xl mb-6">
              <span className="gradient-text">CloakDesk</span> Documentation
            </h1>
            <p className="text-xl text-muted sm:text-2xl max-w-3xl mx-auto mb-8">
              Complete guide to protecting your blockchain privacy with advanced tools and features
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/getting-started"
                className="btn-primary inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://www.cloakdesk.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Open App
                <Zap className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-textPrimary mb-8 text-center">
          Quick Start
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.title}
                href={link.href}
                className="card-hover group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${link.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2 group-hover:text-primaryStart transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted">
                    {link.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/10">
        <h2 className="text-3xl font-bold text-textPrimary mb-8 text-center">
          Features
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="card group hover:border-primaryStart/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 group-hover:bg-gradient-primary transition-colors duration-300">
                    <Icon className="h-5 w-5 text-textPrimary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-medium text-textPrimary group-hover:text-primaryStart transition-colors">
                    {feature.title}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

