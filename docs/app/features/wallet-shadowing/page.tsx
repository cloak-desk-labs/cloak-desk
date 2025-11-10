import Link from "next/link"
import { UserCog, ArrowLeft, Eye, Shuffle, Sparkles } from "lucide-react"

export default function WalletShadowingPage() {
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
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              Wallet Shadowing
            </h1>
          </div>
          <p className="text-xl text-muted">
            Create decoy wallets and generate noise to mask your real transaction patterns
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              Wallet Shadowing creates decoy wallets and generates synthetic transaction activity
              to confuse on-chain analytics and mask your real transaction patterns.
            </p>
            <p className="text-muted leading-relaxed">
              By creating multiple shadow wallets with similar patterns, analytics services cannot
              reliably distinguish between your real wallet and the decoys, significantly improving
              your privacy.
            </p>
          </section>

          {/* How It Works */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Shuffle className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Create Shadow Wallets</h3>
                  <p className="text-muted">
                    Generate multiple decoy wallets that mimic your transaction patterns,
                    timing, and behavior to create plausible alternatives.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Generate Noise</h3>
                  <p className="text-muted">
                    Create synthetic transactions between shadow wallets to add noise
                    and make pattern analysis more difficult.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Eye className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Confuse Analytics</h3>
                  <p className="text-muted">
                    On-chain analytics services see multiple wallets with similar patterns,
                    making it impossible to identify which is your real wallet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Features</h2>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span>Automatic shadow wallet generation with configurable patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span>Smart noise generation that mimics real transaction behavior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span>Configurable frequency and intensity of shadow activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span>Cost-effective decoy transactions using minimal gas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span>Real-time monitoring of shadow wallet activity</span>
              </li>
            </ul>
          </section>

          {/* Privacy Benefits */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Privacy Benefits</h2>
            <p className="text-muted leading-relaxed mb-4">
              Wallet Shadowing provides several privacy advantages:
            </p>
            <ul className="space-y-2 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Makes it difficult to identify your real wallet among decoys</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Breaks transaction pattern analysis by creating multiple similar patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Reduces the effectiveness of timing-based analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Creates plausible deniability for transaction ownership</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

