"use client"

import * as React from "react"
import { Topbar } from "./topbar"
import { TwoLevelSidebar } from "./two-level-sidebar"
import { ShadowOverlay } from "@/components/shadow-overlay"

/**
 * AppShell component
 * Provides the main layout structure for dashboard pages
 * Includes sidebar, topbar, and content area
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Animated Shadow Overlay Background */}
      <ShadowOverlay
        color="rgba(124, 58, 237, 0.15)"
        animation={{
          scale: 30,
          speed: 50,
        }}
        noise={{
          opacity: 0.1,
          scale: 1,
        }}
        sizing="fill"
      />
      
      {/* Sidebar - Fixed positioning, above background */}
      <TwoLevelSidebar />
      
      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-[384px] relative z-10">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

