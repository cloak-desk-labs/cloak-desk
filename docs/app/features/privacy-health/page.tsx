import Link from "next/link"
import { Shield, ArrowLeft, AlertTriangle, CheckCircle, Info } from "lucide-react"

export default function PrivacyHealthPage() {
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
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              Privacy Health
            </h1>
          </div>
          <p className="text-xl text-muted">
            Analyze your wallet&apos;s privacy exposure and get actionable insights
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              Privacy Health provides comprehensive analysis of your wallet&apos;s privacy exposure.
              It evaluates various risk factors and provides a predictability score to help you
              understand how traceable your transactions are.
            </p>
            <p className="text-muted leading-relaxed">
              The system analyzes transaction patterns, timing, DEX preferences, token reuse,
              and gas fingerprinting to identify potential privacy vulnerabilities.
            </p>
          </section>

          {/* Predictability Score */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Predictability Score</h2>
            <p className="text-muted leading-relaxed mb-4">
              Your predictability score ranges from 0 to 100, where lower scores indicate better privacy.
              The score is calculated based on multiple factors:
            </p>
            <ul className="space-y-2 text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>Transaction timing patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>DEX and protocol preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>Token reuse patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>Gas price fingerprinting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>Address linking patterns</span>
              </li>
            </ul>
          </section>

          {/* Inference Vectors */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Inference Vectors</h2>
            <p className="text-muted leading-relaxed mb-4">
              Inference vectors are patterns that analytics services can use to identify or link your wallet.
              The system identifies high, medium, and low-risk vectors:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-danger pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-danger" />
                  <span className="font-semibold text-textPrimary">High Risk</span>
                </div>
                <p className="text-muted text-sm">
                  Linked funding addresses, known exchange deposits, or clear transaction patterns
                </p>
              </div>
              <div className="border-l-4 border-warning pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-warning" />
                  <span className="font-semibold text-textPrimary">Medium Risk</span>
                </div>
                <p className="text-muted text-sm">
                  Frequent DEX usage, predictable timing, or token preference patterns
                </p>
              </div>
              <div className="border-l-4 border-success pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-semibold text-textPrimary">Low Risk</span>
                </div>
                <p className="text-muted text-sm">
                  Minor patterns that could be improved but don&apos;t pose immediate privacy risks
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Simulator */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Privacy Simulator</h2>
            <p className="text-muted leading-relaxed">
              Use the Privacy Simulator to preview how different privacy strategies would affect
              your predictability score. Adjust settings like split funds, random delays, relayer routing,
              and address rotation to see estimated improvements.
            </p>
          </section>

          {/* Recommendations */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Improving Your Privacy</h2>
            <p className="text-muted leading-relaxed mb-4">
              Based on your analysis, consider these actions:
            </p>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-2">
                <ArrowLeft className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5 rotate-[-90deg]" />
                <span>Use stealth routing to break transaction links</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowLeft className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5 rotate-[-90deg]" />
                <span>Rotate through multiple DEXs to avoid pattern detection</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowLeft className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5 rotate-[-90deg]" />
                <span>Add random delays to transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowLeft className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5 rotate-[-90deg]" />
                <span>Use wallet shadowing to create decoy transactions</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

