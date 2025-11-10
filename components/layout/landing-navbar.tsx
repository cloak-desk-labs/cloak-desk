"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Book, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DOCS_URL } from "@/lib/utils"

/**
 * Landing Navbar Component
 * Fixed navbar for the landing page with logo, docs link, and start app button
 */
export function LandingNavbar() {
  const router = useRouter()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4 sm:px-6">
      <div className="relative rounded-2xl border border-white/10 bg-bg900/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] shadow-neon/20 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none">
        <div className="relative flex h-14 items-center justify-between px-4 sm:px-6">
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
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-textSecondary hover:text-textPrimary hover:bg-bg800/50 transition-colors"
            >
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Docs</span>
            </a>

            {/* Start App / Connect Wallet Button */}
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
                          <Button onClick={openConnectModal} variant="primary" size="sm" className="group">
                            Connect Wallet
                          </Button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <Button onClick={openChainModal} variant="danger" size="sm">
                            Wrong network
                          </Button>
                        )
                      }

                      return (
                        <Button
                          onClick={() => router.push("/dashboard/overview")}
                          variant="primary"
                          size="sm"
                          className="group"
                        >
                          Start App
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </nav>
  )
}

