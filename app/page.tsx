"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  Route,
  Lock,
  ArrowRight,
  UserCog,
  Eye,
  Store,
  Trophy,
  LayoutDashboard,
  Sparkles,
  LockKeyhole,
  Network,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { ShadowOverlay } from "@/components/shadow-overlay"
import CyberMatrixHero from "@/components/ui/cyber-matrix-hero"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { LandingNavbar } from "@/components/layout/landing-navbar"
import Image from "next/image"
import { DOCS_URL } from "@/lib/utils"

/**
 * Landing page component
 * Marketing hero with comprehensive feature showcase
 * Automatically redirects to dashboard when wallet is connected
 */
export default function LandingPage() {
  const router = useRouter()
  // Get account status - will be false if providers aren't ready
  const { isConnected } = useAccount()

  // Redirect to dashboard when wallet connects
  React.useEffect(() => {
    if (isConnected) {
      router.push("/dashboard/overview")
    }
  }, [isConnected, router])

  // Core privacy tools
  const privacyTools = [
    {
      icon: Shield,
      title: "Privacy Health",
      description: "Analyze your wallet's privacy exposure with advanced analytics. Get detailed risk scores and actionable insights to improve your anonymity.",
      color: "from-primaryStart to-primaryEnd",
      iconBg: "bg-primaryStart/20",
      href: "/dashboard/privacy-health",
    },
    {
      icon: Route,
      title: "Stealth Routing",
      description: "Obfuscate transactions through multi-hop routing and relayer networks. Break transaction patterns and enhance privacy.",
      color: "from-primaryStart to-primaryEnd",
      iconBg: "bg-primaryStart/20",
      href: "/dashboard/stealth-routing",
    },
    {
      icon: UserCog,
      title: "Wallet Shadowing",
      description: "Create decoy wallets and generate noise to mask your real transaction patterns. Confuse on-chain analysis.",
      color: "from-electric to-primaryStart",
      iconBg: "bg-electric/20",
      href: "/dashboard/wallet-shadowing",
    },
    {
      icon: Lock,
      title: "MPC Vault",
      description: "Non-custodial multi-party computation for secure key management. Never store private keys in one place.",
      color: "from-primaryStart to-primaryEnd",
      iconBg: "bg-primaryStart/20",
      href: "/dashboard/mpc-vault",
    },
    {
      icon: Eye,
      title: "Selective Disclosure",
      description: "Generate zero-knowledge proofs for verifiable claims without revealing sensitive information. Prove without exposing.",
      color: "from-primaryStart to-electric",
      iconBg: "bg-primaryStart/20",
      href: "/dashboard/selective-disclosure",
    },
    {
      icon: Network,
      title: "Network Graph",
      description: "Visualize wallet connections and network topology. Understand your privacy footprint at a glance.",
      color: "from-electric to-primaryStart",
      iconBg: "bg-electric/20",
      href: "/dashboard/overview",
    },
  ]

  // Community features
  const communityFeatures = [
    {
      icon: Store,
      title: "Relayer Marketplace",
      description: "Browse and select from trusted relayers for transaction obfuscation. Compare fees, ratings, and compliance policies.",
      color: "from-primaryStart to-primaryEnd",
      iconBg: "bg-primaryStart/20",
      href: "/dashboard/relayer-marketplace",
    },
    {
      icon: Trophy,
      title: "Privacy Leaderboard",
      description: "Track your privacy ranking and compete with others. Earn badges for maintaining excellent privacy practices.",
      color: "from-primaryStart to-electric",
      iconBg: "bg-primaryStart/20",
      href: "/dashboard/leaderboard",
    },
  ]

  // Key benefits
  const benefits = [
    {
      icon: LockKeyhole,
      title: "Non-Custodial",
      description: "Your keys, your control. We never have access to your private keys or funds.",
    },
    {
      icon: Sparkles,
      title: "Zero-Knowledge",
      description: "Prove claims without revealing sensitive data. Privacy-preserving verification.",
    },
    {
      icon: Shield,
      title: "Advanced Analytics",
      description: "Deep insights into your privacy exposure with actionable recommendations.",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-bg900">
      {/* Fixed Navbar */}
      <LandingNavbar />

      {/* Cyber Matrix Hero Section */}
      <CyberMatrixHero />

      {/* Dashboard Preview Section with Scroll Animation */}
      <section className="relative z-10 bg-bg900">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl md:text-5xl font-bold text-textPrimary mb-6">
                Your Privacy Dashboard
              </h2>
              <p className="text-xl md:text-2xl text-textSecondary max-w-3xl mx-auto mb-8">
                Monitor your privacy health, analyze wallet exposure, and protect your blockchain anonymity
                <br />
                <span className="gradient-text font-semibold">all in one place</span>
              </p>
            </>
          }
        >
          <Image
            src="/screenshot.png"
            alt="CloakDesk Dashboard Preview"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* Privacy Tools Section */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-bg900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-textPrimary sm:text-5xl mb-4">
            <span className="gradient-text">Privacy Tools</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Comprehensive suite of tools to protect your blockchain privacy and anonymity
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {privacyTools.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full group relative overflow-hidden border-white/10 hover:border-primaryStart/30 transition-all duration-300 hover:shadow-neon">
                    <CardHeader className="relative">
                      {/* Icon with gradient background */}
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="h-7 w-7 text-white !text-white transition-colors duration-300" style={{ color: '#ffffff' }} />
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-primaryStart transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-primaryStart opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="mr-2 font-medium">Learn more</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Community Features Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-bg900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-textPrimary sm:text-5xl mb-4">
            <span className="gradient-text">Community & Marketplace</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Connect with the community and access trusted services
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full group relative overflow-hidden border-white/10 hover:border-primaryStart/30 transition-all duration-300 hover:shadow-neon">
                    <CardHeader className="relative">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} border border-white/10 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 shadow-lg`}>
                          <Icon className="h-8 w-8 text-white !text-white transition-colors duration-300" style={{ color: '#ffffff' }} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 group-hover:text-primaryStart transition-colors duration-300">
                            {feature.title}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {feature.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-primaryStart opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="mr-2 font-medium">Explore</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-bg900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-textPrimary sm:text-5xl mb-4">
            Why <span className="gradient-text">CloakDesk</span>?
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Built with privacy and security as core principles
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-6 shadow-neon">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-textPrimary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-bg900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-br from-bg800/80 to-bg700/40 backdrop-blur-sm p-12 shadow-neon-lg">
            <h2 className="text-3xl font-bold text-textPrimary sm:text-4xl mb-4">
              Ready to <span className="gradient-text">enhance your privacy</span>?
            </h2>
            <p className="text-lg text-muted mb-8">
              Connect your wallet and start using CloakDesk to protect your blockchain privacy
            </p>
            <div className="flex justify-center gap-4">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted
                  const connected = ready && account && chain

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <Button onClick={openConnectModal} variant="primary" size="lg" className="group">
                              Connect Wallet
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                          )
                        }

                        if (chain.unsupported) {
                          return (
                            <Button onClick={openChainModal} variant="danger" size="lg">
                              Wrong network
                            </Button>
                          )
                        }

                        return (
                          <Button
                            onClick={() => router.push("/dashboard/overview")}
                            size="lg"
                            variant="primary"
                            className="group"
                          >
                            Go to Dashboard
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        )
                      })()}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-bg800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-textPrimary">CloakDesk</h3>
              <p className="mt-2 text-sm text-muted">
                Privacy-first blockchain dashboard
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-textPrimary">Resources</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>
                  <a 
                    href={DOCS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-textPrimary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-textPrimary">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-textPrimary">Contact</h4>
              <p className="mt-2 text-sm text-muted">
                support@cloakdesk.io
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted">
            <p>&copy; {new Date().getFullYear()} CloakDesk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
