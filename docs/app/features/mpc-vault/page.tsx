import Link from "next/link"
import { Lock, ArrowLeft, Shield, Key, Users } from "lucide-react"

export default function MPCVaultPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/features"
          className="inline-flex items-center gap-2 text-muted hover:text-textPrimary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Features
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              MPC Vault
            </h1>
          </div>
          <p className="text-xl text-muted">
            Non-custodial multi-party computation for secure key management
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              MPC (Multi-Party Computation) Vault provides secure, non-custodial key management
              by splitting private keys into multiple shares that are never stored together.
            </p>
            <p className="text-muted leading-relaxed">
              Unlike traditional wallets where a single private key can be compromised, MPC Vault
              requires multiple parties to collaborate to sign transactions, eliminating single
              points of failure.
            </p>
          </section>

          {/* How It Works */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Key className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Key Generation</h3>
                  <p className="text-muted">
                    Private keys are split into multiple shares using cryptographic secret sharing.
                    No single share reveals information about the complete key.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Users className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Distributed Storage</h3>
                  <p className="text-muted">
                    Key shares are stored across multiple parties or devices. You control some shares,
                    while trusted parties or secure hardware hold others.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Shield className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Threshold Signing</h3>
                  <p className="text-muted">
                    Transactions are signed using threshold cryptography. Multiple parties collaborate
                    to produce a signature without any party ever seeing the complete private key.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Security Benefits */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Security Benefits</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">No Single Point of Failure:</strong> Private keys are never stored in one location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Non-Custodial:</strong> You maintain control over your keys and funds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Threshold Security:</strong> Requires multiple parties to authorize transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Recovery Options:</strong> Configurable backup and recovery mechanisms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Privacy Preserving:</strong> Key shares don&apos;t reveal transaction details</span>
              </li>
            </ul>
          </section>

          {/* Use Cases */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Use Cases</h2>
            <p className="text-muted leading-relaxed mb-4">
              MPC Vault is ideal for:
            </p>
            <ul className="space-y-2 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>High-value asset storage requiring enhanced security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Organizations requiring multi-signature approval workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Users who want to eliminate seed phrase risks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>DeFi protocols and DAOs needing secure treasury management</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

