import Link from "next/link"
import { ArrowRight, Wallet, Shield, CheckCircle } from "lucide-react"

export default function GettingStartedPage() {
  const steps = [
    {
      number: 1,
      title: "Connect Your Wallet",
      description: "Connect your Ethereum wallet using WalletConnect or MetaMask. CloakDesk supports all major wallet providers.",
      icon: Wallet,
    },
    {
      number: 2,
      title: "View Privacy Health",
      description: "Get an instant analysis of your wallet's privacy exposure. See risk scores and actionable recommendations.",
      icon: Shield,
    },
    {
      number: 3,
      title: "Use Privacy Tools",
      description: "Explore stealth routing, wallet shadowing, MPC vault, and other privacy-enhancing features.",
      icon: CheckCircle,
    },
  ]

  const features = [
    "Privacy Health Analysis",
    "Stealth Routing",
    "Wallet Shadowing",
    "MPC Vault",
    "Selective Disclosure",
    "Relayer Marketplace",
    "Privacy Leaderboard",
  ]

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">
            Getting Started
          </h1>
          <p className="text-xl text-muted">
            Learn how to use CloakDesk to protect your blockchain privacy
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary flex-shrink-0">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primaryStart">Step {step.number}</span>
                      <h2 className="text-2xl font-semibold text-textPrimary">{step.title}</h2>
                    </div>
                    <p className="text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Features List */}
        <div className="card mb-16">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Available Features</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span className="text-textSecondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Next Steps</h2>
          <p className="text-muted mb-6">
            Now that you're set up, explore the features and start protecting your privacy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/features"
              className="btn-primary inline-flex items-center gap-2"
            >
              Explore Features
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://cloakdesk.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Open App
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

