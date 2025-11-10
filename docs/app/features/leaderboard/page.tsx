import Link from "next/link"
import { Trophy, ArrowLeft, Star, Award, TrendingUp } from "lucide-react"

export default function LeaderboardPage() {
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
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              Privacy Leaderboard
            </h1>
          </div>
          <p className="text-xl text-muted">
            Track your privacy ranking and compete with others
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              The Privacy Leaderboard gamifies privacy by ranking users based on their privacy
              health scores and privacy-enhancing activities. Compete with others to maintain
              the best privacy practices and earn recognition.
            </p>
            <p className="text-muted leading-relaxed">
              Rankings are updated in real-time based on predictability scores, privacy tool usage,
              and overall privacy hygiene. Top performers earn badges and recognition.
            </p>
          </section>

          {/* How It Works */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Privacy Score</h3>
                  <p className="text-muted">
                    Your ranking is based on your privacy health score. Lower predictability
                    scores and better privacy practices result in higher rankings.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Award className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Badges & Achievements</h3>
                  <p className="text-muted">
                    Earn badges for maintaining excellent privacy practices, using privacy tools,
                    and achieving privacy milestones.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg700 flex-shrink-0">
                  <Star className="h-5 w-5 text-primaryStart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">Recognition</h3>
                  <p className="text-muted">
                    Top performers are featured on the leaderboard and receive special recognition
                    for their commitment to privacy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ranking Factors */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Ranking Factors</h2>
            <p className="text-muted leading-relaxed mb-4">
              Your leaderboard position is determined by several factors:
            </p>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Privacy Health Score:</strong> Lower predictability scores improve ranking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Privacy Tool Usage:</strong> Active use of stealth routing, wallet shadowing, etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Consistency:</strong> Maintaining good privacy practices over time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">•</span>
                <span><strong className="text-textPrimary">Improvement:</strong> Progress in reducing privacy exposure</span>
              </li>
            </ul>
          </section>

          {/* Benefits */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Benefits</h2>
            <ul className="space-y-2 text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Motivation to improve privacy practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Community recognition for privacy excellence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Gamified approach to privacy education</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Real-time tracking of privacy improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primaryStart mt-1">✓</span>
                <span>Badges and achievements to showcase privacy commitment</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

