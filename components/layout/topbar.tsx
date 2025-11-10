"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useDisconnect } from "wagmi"
import { Bell, Search, Menu, Book } from "lucide-react"
import { useAppStore } from "@/state/useAppStore"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

/**
 * Topbar component for dashboard
 * Contains search, notifications, wallet connection, and account menu
 */
export function Topbar() {
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const { toast } = useToast()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-bg900/50 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Logo - clickable, links to dashboard overview */}
      <Link href="/dashboard/overview" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image
          src="/logo.png"
          alt="CloakDesk Logo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          priority
        />
        <span className="hidden sm:inline-block text-lg font-semibold gradient-text">
          CloakDesk
        </span>
      </Link>

      {/* Search bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-xl border border-white/5 bg-bg900/40 backdrop-blur-lg px-10 py-2 text-sm text-textPrimary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primaryStart/50 focus:ring-offset-2 focus:ring-offset-bg900 focus:border-white/10 focus:bg-bg900/50"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Documentation Link */}
        <a
          href={process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg h-9 w-9 text-muted hover:text-textPrimary hover:bg-bg800/30 transition-colors"
          aria-label="Documentation"
          title="Documentation"
        >
          <Book className="h-5 w-5" />
        </a>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            toast({
              title: "Notifications",
              description: "No new notifications",
            })
          }}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {/* Wallet connection */}
        <div className="flex items-center">
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
                        <Button onClick={openConnectModal} variant="primary" size="sm">
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
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={openChainModal}
                          variant="secondary"
                          size="sm"
                          className="hidden sm:flex"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 16,
                                height: 16,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 16, height: 16 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ""}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={openAccountModal}>
                              Account Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={openChainModal}>
                              Switch Network
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                // Disconnect the wallet using wagmi's disconnect function
                                disconnect()
                                // Show success notification
                                toast({
                                  title: "Disconnected",
                                  description: "Wallet disconnected successfully",
                                })
                                // Redirect to landing page immediately
                                // The dashboard layout will handle showing connect modal if user navigates back
                                router.push("/")
                              }}
                            >
                              Disconnect
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </header>
  )
}

