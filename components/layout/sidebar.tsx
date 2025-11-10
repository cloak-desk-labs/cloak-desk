"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Shield,
  Route,
  UserCog,
  Lock,
  Eye,
  Store,
  Trophy,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/state/useAppStore"

/**
 * Navigation items for the sidebar
 */
const navItems = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/privacy-health", label: "Privacy Health", icon: Shield },
  { href: "/dashboard/stealth-routing", label: "Stealth Routing", icon: Route },
  { href: "/dashboard/wallet-shadowing", label: "Wallet Shadowing", icon: UserCog },
  { href: "/dashboard/mpc-vault", label: "MPC Vault", icon: Lock },
  { href: "/dashboard/selective-disclosure", label: "Selective Disclosure", icon: Eye },
  { href: "/dashboard/relayer-marketplace", label: "Relayer Marketplace", icon: Store },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

/**
 * Sidebar component for dashboard navigation
 * Collapsible and responsive
 */
export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useAppStore()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/10 bg-bg800 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CloakDesk</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-textSecondary hover:text-textPrimary"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-primary text-white shadow-neon"
                      : "text-muted hover:bg-bg700 hover:text-textPrimary"
                  )}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false)
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <p className="text-xs text-muted text-center">
              Privacy-first dashboard
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

