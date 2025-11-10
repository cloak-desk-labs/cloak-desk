import Link from "next/link"
import { Store, ArrowLeft, Star, Shield, Zap, DollarSign } from "lucide-react"

export default function RelayerMarketplacePage() {
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
              <Store className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              Relayer Marketplace
            </h1>
          </div>
          <p className="text-xl text-muted">
            Browse and select from trusted relayers for transaction obfuscation
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              The Relayer Marketplace is a decentralized platform where you can discover, compare,
              and select relayers for your privacy-enhanced transactions.
            </p>
            <p className="text-muted leading-relaxed">
              Each relayer is rated based on performance, reliability, fees, and privacy practices,
              helping you make informed decisions about which relayers to trust with your transactions.
            </p>
          </section>

          {/* Features */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Ratings & Reviews</h3>
                  <p className="text-sm text-muted">
                    See user ratings and reviews for each relayer to assess reliability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Fee Comparison</h3>
                  <p className="text-sm text-muted">
                    Compare fees across different relayers to find the best rates
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Privacy Policies</h3>
                  <p className="text-sm text-muted">
                    Review each relayer&apos;s privacy and data retention policies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Performance Metrics</h3>
                  <p className="text-sm text-muted">
                    View uptime, latency, and transaction success rates
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">How to Use</h2>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg700 text-primaryStart font-semibold flex-shrink-0">1</span>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Browse Relayers</h3>
                  <p className="text-muted">
                    Explore the marketplace to see available relayers with their ratings,
                    fees, and performance metrics.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg700 text-primaryStart font-semibold flex-shrink-0">2</span>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Compare Options</h3>
                  <p className="text-muted">
                    Use filters and sorting to compare relayers based on your priorities:
                    fees, privacy, performance, or reliability.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg700 text-primaryStart font-semibold flex-shrink-0">3</span>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Select Relayers</h3>
                  <p className="text-muted">
                    Choose one or more relayers for your transaction routing. You can
                    use multiple relayers for enhanced privacy.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg700 text-primaryStart font-semibold flex-shrink-0">4</span>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Execute Transactions</h3>
                  <p className="text-muted">
                    Route your transactions through selected relayers and monitor their
                    performance in real-time.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Benefits */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Benefits</h2>
            <ul className="space-y-2 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Transparent pricing and fee comparison</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Community-driven ratings and reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Multiple relayer options for redundancy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Performance monitoring and analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Privacy-focused relayer selection</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

