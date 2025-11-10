import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Application UI state store
 * Manages sidebar state, theme, modals, and other UI preferences
 */
interface AppState {
  // Sidebar state
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // Theme state (always dark for now, but keeping for future)
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void

  // Modal states
  connectWalletModalOpen: boolean
  setConnectWalletModalOpen: (open: boolean) => void

  // User preferences
  notificationsEnabled: boolean
  setNotificationsEnabled: (enabled: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Sidebar defaults to open on desktop
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Theme always dark for now
      theme: "dark",
      setTheme: (theme) => set({ theme }),

      // Modal states
      connectWalletModalOpen: false,
      setConnectWalletModalOpen: (open) => set({ connectWalletModalOpen: open }),

      // Notifications
      notificationsEnabled: true,
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    }),
    {
      name: "cloak-desk-storage",
      // Only persist sidebar and theme preferences
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
        notificationsEnabled: state.notificationsEnabled,
      }),
    }
  )
)

