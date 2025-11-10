import Link from "next/link"
import { Eye, ArrowLeft, Shield, CheckCircle, Lock } from "lucide-react"

export default function SelectiveDisclosurePage() {
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
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              Selective Disclosure
            </h1>
          </div>
          <p className="text-xl text-muted">
            Generate zero-knowledge proofs for verifiable claims without revealing sensitive information
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              Selective Disclosure allows you to prove statements about your blockchain activity
              without revealing the underlying data. Using zero-knowledge proofs (ZKPs), you can
              demonstrate compliance, eligibility, or other attributes while maintaining privacy.
            </p>
            <p className="text-muted leading-relaxed">
              This is particularly useful for KYC/AML compliance, DeFi protocol eligibility,
              creditworthiness verification, and other scenarios where proof is needed without
              full disclosure.
            </p>
          </section>

          {/* How It Works */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Lock className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Generate Proof</h3>
                  <p className="text-muted">
                    Create a zero-knowledge proof that demonstrates a specific claim about your
                    blockchain data without revealing the actual data or addresses involved.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Shield className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Verify Claim</h3>
                  <p className="text-muted">
                    The verifier can cryptographically verify that your claim is true without
                    learning any additional information about your transactions or addresses.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Maintain Privacy</h3>
                  <p className="text-muted">
                    Your privacy is preserved throughout the process. Only the specific claim
                    is proven, with all other information remaining hidden.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Use Cases</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">KYC/AML Compliance</h3>
                <p className="text-muted">
                  Prove you meet regulatory requirements without revealing your full transaction history
                  or wallet addresses.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">DeFi Protocol Eligibility</h3>
                <p className="text-muted">
                  Demonstrate you meet protocol requirements (e.g., minimum balance, transaction history)
                  without exposing your financial details.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">Creditworthiness</h3>
                <p className="text-muted">
                  Prove your financial standing or creditworthiness to lenders or service providers
                  while maintaining transaction privacy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">Whitelisting</h3>
                <p className="text-muted">
                  Prove eligibility for whitelisted events, airdrops, or token sales without revealing
                  your wallet address or transaction patterns.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Benefits</h2>
            <ul className="space-y-2 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Maintain privacy while proving claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Cryptographically verifiable proofs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Compliance without full disclosure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Selective information sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Reduced risk of data breaches</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

