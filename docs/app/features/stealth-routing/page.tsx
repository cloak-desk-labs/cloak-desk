import Link from "next/link"
import { Route, ArrowLeft, Shield, Users, Zap } from "lucide-react"

export default function StealthRoutingPage() {
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
              <Route className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              Stealth Routing
            </h1>
          </div>
          <p className="text-xl text-muted">
            Obfuscate transactions through multi-hop routing and relayer networks
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              Stealth Routing breaks the direct link between your source and destination addresses
              by routing transactions through multiple intermediate addresses and relayers.
            </p>
            <p className="text-muted leading-relaxed">
              This makes it extremely difficult for on-chain analytics to trace the flow of funds
              and identify the true origin or destination of your transactions.
            </p>
          </section>

          {/* How It Works */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <span className="text-lg font-bold text-primaryStart">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Initiate Transaction</h3>
                  <p className="text-muted">
                    Start by specifying your source address and destination. The system will calculate
                    the optimal routing path through available relayers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <span className="text-lg font-bold text-primaryStart">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Multi-Hop Routing</h3>
                  <p className="text-muted">
                    Your transaction is split and routed through multiple intermediate addresses
                    and relayer nodes, creating a complex path that obscures the origin.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <span className="text-lg font-bold text-primaryStart">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Final Delivery</h3>
                  <p className="text-muted">
                    The final relayer delivers your funds to the destination address, completing
                    the obfuscated transaction flow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Benefits</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Enhanced Privacy</h3>
                  <p className="text-sm text-muted">
                    Break direct links between source and destination addresses
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Relayer Network</h3>
                  <p className="text-sm text-muted">
                    Leverage a distributed network of trusted relayers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Optimized Paths</h3>
                  <p className="text-sm text-muted">
                    Automatic path optimization for cost and privacy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Route className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-textPrimary mb-1">Multiple Hops</h3>
                  <p className="text-sm text-muted">
                    Configure the number of hops for desired privacy level
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Usage */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Getting Started</h2>
            <p className="text-muted leading-relaxed mb-4">
              To use Stealth Routing:
            </p>
            <ol className="space-y-2 text-muted list-decimal list-inside">
              <li>Navigate to the Stealth Routing page in the dashboard</li>
              <li>Enter your source and destination addresses</li>
              <li>Select the desired number of hops and relayer preferences</li>
              <li>Review the estimated fees and privacy improvement</li>
              <li>Confirm and execute the routed transaction</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

