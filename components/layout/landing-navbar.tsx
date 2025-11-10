"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Book, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Landing Navbar Component
 * Fixed navbar for the landing page with logo, docs link, and start app button
 */
export function LandingNavbar() {
  const router = useRouter()
  const { isConnected } = useAccount()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bg900/80 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo - compact */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative h-7 w-7">
              <Image
                src="/logo.png"
                alt="CloakDesk Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base font-semibold gradient-text hidden sm:inline">CloakDesk</span>
          </Link>

          {/* Right side - Docs and Start App */}
          <div className="flex items-center gap-2">
            {/* Documentation Link */}
            <a
              href={process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-textSecondary hover:text-textPrimary hover:bg-bg800/50 transition-colors"
            >
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Docs</span>
            </a>

            {/* Start App / Connect Wallet Button */}
            {isConnected ? (
              <Button
                onClick={() => router.push("/dashboard/overview")}
                variant="primary"
                size="sm"
                className="group text-sm h-8 px-4"
              >
                Start App
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <div className="scale-90 origin-right">
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

