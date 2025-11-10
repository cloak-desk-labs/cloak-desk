"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
  Search,
  ChevronDown,
  Book,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/state/useAppStore"

// Softer spring animation curve
const softSpringEasing = "cubic-bezier(0.25, 1.1, 0.4, 1)"

interface MenuItemT {
  icon?: React.ReactNode
  label: string
  href?: string
  hasDropdown?: boolean
  isActive?: boolean
  external?: boolean
  children?: MenuItemT[]
}

interface MenuSectionT {
  title: string
  items: MenuItemT[]
}

interface SidebarContent {
  title: string
  sections: MenuSectionT[]
}

function getSidebarContent(): SidebarContent {
  return {
    title: "CloakDesk",
    sections: [
      {
        title: "Dashboard",
        items: [
          {
            icon: <LayoutDashboard size={16} className="text-textPrimary" />,
            label: "Overview",
            href: "/dashboard/overview",
          },
          {
            icon: <Shield size={16} className="text-textPrimary" />,
            label: "Privacy Health",
            href: "/dashboard/privacy-health",
          },
        ],
      },
      {
        title: "Privacy Tools",
        items: [
          {
            icon: <Route size={16} className="text-textPrimary" />,
            label: "Stealth Routing",
            href: "/dashboard/stealth-routing",
          },
          {
            icon: <UserCog size={16} className="text-textPrimary" />,
            label: "Wallet Shadowing",
            href: "/dashboard/wallet-shadowing",
          },
          {
            icon: <Lock size={16} className="text-textPrimary" />,
            label: "MPC Vault",
            href: "/dashboard/mpc-vault",
          },
          {
            icon: <Eye size={16} className="text-textPrimary" />,
            label: "Selective Disclosure",
            href: "/dashboard/selective-disclosure",
          },
        ],
      },
      {
        title: "Community",
        items: [
          {
            icon: <Store size={16} className="text-textPrimary" />,
            label: "Relayer Marketplace",
            href: "/dashboard/relayer-marketplace",
          },
          {
            icon: <Trophy size={16} className="text-textPrimary" />,
            label: "Leaderboard",
            href: "/dashboard/leaderboard",
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            icon: <Settings size={16} className="text-textPrimary" />,
            label: "Settings",
            href: "/dashboard/settings",
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            icon: <Book size={16} className="text-textPrimary" />,
            label: "Documentation",
            href: process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001",
            external: true,
          },
        ],
      },
    ],
  }
}

/* ---------------------------- Left Icon Nav Rail -------------------------- */

function IconNavButton({
  children,
  isActive = false,
  onClick,
}: {
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center rounded-lg size-10 min-w-10 transition-colors duration-500",
        isActive
          ? "bg-bg800/40 text-textPrimary"
          : "hover:bg-bg800/30 text-muted hover:text-textPrimary"
      )}
      style={{ transitionTimingFunction: softSpringEasing }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function IconNavigation({
  activePath,
  onPathChange,
}: {
  activePath: string
  onPathChange: (path: string) => void
}) {
  const navItems = [
    { id: "overview", icon: <LayoutDashboard size={16} />, label: "Overview", path: "/dashboard/overview" },
    { id: "privacy", icon: <Shield size={16} />, label: "Privacy", path: "/dashboard/privacy-health" },
    { id: "routing", icon: <Route size={16} />, label: "Routing", path: "/dashboard/stealth-routing" },
    { id: "shadowing", icon: <UserCog size={16} />, label: "Shadowing", path: "/dashboard/wallet-shadowing" },
    { id: "vault", icon: <Lock size={16} />, label: "Vault", path: "/dashboard/mpc-vault" },
    { id: "disclosure", icon: <Eye size={16} />, label: "Disclosure", path: "/dashboard/selective-disclosure" },
    { id: "marketplace", icon: <Store size={16} />, label: "Marketplace", path: "/dashboard/relayer-marketplace" },
  ]

  const isActive = (path: string) => activePath.startsWith(path)

  return (
    <aside className="bg-bg900/50 backdrop-blur-xl border-r border-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex flex-col gap-2 items-center p-4 w-16 h-screen relative">
      {/* Logo - clickable, links to dashboard overview */}
      <Link href="/dashboard/overview" className="mb-2 size-10 flex items-center justify-center hover:opacity-80 transition-opacity">
        <Image
          src="/logo.png"
          alt="CloakDesk Logo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          priority
        />
      </Link>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-2 w-full items-center">
        {navItems.map((item) => (
          <IconNavButton
            key={item.id}
            isActive={isActive(item.path)}
            onClick={() => onPathChange(item.path)}
          >
            {item.icon}
          </IconNavButton>
        ))}
      </div>

      <div className="flex-1" />

      {/* Bottom section */}
      <div className="flex flex-col gap-2 w-full items-center">
        <IconNavButton
          isActive={activePath === "/dashboard/settings"}
          onClick={() => onPathChange("/dashboard/settings")}
        >
          <Settings size={16} />
        </IconNavButton>
      </div>
    </aside>
  )
}

/* ------------------------------ Right Sidebar ----------------------------- */

function BrandBadge() {
  return (
    <div className="relative shrink-0 w-full">
      <Link href="/dashboard/overview" className="flex items-center p-1 w-full hover:opacity-80 transition-opacity">
        <div className="h-10 w-8 flex items-center justify-center pl-2">
          <Image
            src="/logo.png"
            alt="CloakDesk Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
        </div>
        <div className="px-2 py-1">
          <div className="font-semibold text-[16px] text-textPrimary">CloakDesk</div>
        </div>
      </Link>
    </div>
  )
}

function SearchContainer({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div
      className={cn(
        "relative shrink-0 transition-all duration-500",
        isCollapsed ? "w-full flex justify-center" : "w-full"
      )}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={cn(
          "bg-bg900/40 backdrop-blur-lg h-10 relative rounded-lg flex items-center transition-all duration-500 border border-white/5",
          isCollapsed ? "w-10 min-w-10 justify-center" : "w-full"
        )}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <div
          className={cn(
            "flex items-center justify-center shrink-0",
            isCollapsed ? "p-1" : "px-1"
          )}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="size-8 flex items-center justify-center">
            <Search size={16} className="text-textPrimary" />
          </div>
        </div>

        <div
          className={cn(
            "flex-1 relative transition-opacity duration-500 overflow-hidden",
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="flex flex-col justify-center size-full">
            <div className="flex flex-col gap-2 items-start justify-center pr-2 py-1 w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[14px] text-textPrimary placeholder:text-muted leading-[20px]"
                tabIndex={isCollapsed ? -1 : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({
  title,
  onToggleCollapse,
  isCollapsed,
}: {
  title: string
  onToggleCollapse: () => void
  isCollapsed: boolean
}) {
  if (isCollapsed) {
    return (
      <div
        className="w-full flex justify-center transition-all duration-500"
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 hover:bg-bg800/30 text-muted hover:text-textPrimary"
          style={{ transitionTimingFunction: softSpringEasing }}
          aria-label="Expand sidebar"
        >
          <span className="inline-block rotate-180">
            <ChevronDown size={16} />
          </span>
        </button>
      </div>
    )
  }

  return (
    <div
      className="w-full overflow-hidden transition-all duration-500"
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center h-10">
          <div className="px-2 py-1">
            <div className="font-semibold text-[18px] text-textPrimary leading-[27px]">{title}</div>
          </div>
        </div>
        <div className="pr-1">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 hover:bg-bg800/30 text-muted hover:text-textPrimary"
            style={{ transitionTimingFunction: softSpringEasing }}
            aria-label="Collapse sidebar"
          >
            <ChevronDown size={16} className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailSidebar({ activePath }: { activePath: string }) {
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [isCollapsed, setIsCollapsed] = useState(false)
  const content = getSidebarContent()

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemKey)) next.delete(itemKey)
      else next.add(itemKey)
      return next
    })
  }

  const toggleCollapse = () => setIsCollapsed((s) => !s)

  const handleItemClick = (href?: string, external?: boolean) => {
    if (href) {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(href)
      }
    }
  }

  return (
    <aside
      className={cn(
        "bg-bg900/50 backdrop-blur-xl border-r border-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex flex-col gap-4 items-start p-4 transition-all duration-500 h-screen relative",
        isCollapsed ? "w-16 min-w-16 !px-0 justify-center" : "w-80"
      )}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      {!isCollapsed && <BrandBadge />}

      <SectionTitle title={content.title} onToggleCollapse={toggleCollapse} isCollapsed={isCollapsed} />
      <SearchContainer isCollapsed={isCollapsed} />

      <div
        className={cn(
          "flex flex-col w-full overflow-y-auto transition-all duration-500",
          isCollapsed ? "gap-2 items-center" : "gap-4 items-start"
        )}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        {content.sections.map((section, index) => (
          <MenuSection
            key={`section-${index}`}
            section={section}
            expandedItems={expandedItems}
            onToggleExpanded={toggleExpanded}
            isCollapsed={isCollapsed}
            activePath={activePath}
            onItemClick={handleItemClick}
          />
        ))}
      </div>
    </aside>
  )
}

/* ------------------------------ Menu Elements ---------------------------- */

function MenuItem({
  item,
  isExpanded,
  onToggle,
  onItemClick,
  isCollapsed,
  isActive,
}: {
  item: MenuItemT
  isExpanded?: boolean
  onToggle?: () => void
  onItemClick?: () => void
  isCollapsed?: boolean
  isActive?: boolean
}) {
  const handleClick = () => {
    if (item.hasDropdown && onToggle) onToggle()
    else onItemClick?.()
  }

  return (
    <div
      className={cn(
        "relative shrink-0 transition-all duration-500",
        isCollapsed ? "w-full flex justify-center" : "w-full"
      )}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={cn(
          "rounded-lg cursor-pointer transition-all duration-500 flex items-center relative",
          isActive ? "bg-bg800/40" : "hover:bg-bg800/30",
          isCollapsed ? "w-10 min-w-10 h-10 justify-center p-4" : "w-full h-10 px-4 py-2"
        )}
        style={{ transitionTimingFunction: softSpringEasing }}
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
      >
        <div className="flex items-center justify-center shrink-0">{item.icon}</div>

        <div
          className={cn(
            "flex-1 relative transition-opacity duration-500 overflow-hidden",
            isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-3"
          )}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="text-[14px] text-textPrimary leading-[20px] truncate">{item.label}</div>
        </div>

        {item.hasDropdown && (
          <div
            className={cn(
              "flex items-center justify-center shrink-0 transition-opacity duration-500",
              isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-2"
            )}
            style={{ transitionTimingFunction: softSpringEasing }}
          >
            <ChevronDown
              size={16}
              className="text-textPrimary transition-transform duration-500"
              style={{
                transitionTimingFunction: softSpringEasing,
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SubMenuItem({
  item,
  onItemClick,
  isActive,
}: {
  item: MenuItemT
  onItemClick?: () => void
  isActive?: boolean
}) {
  return (
    <div className="w-full pl-9 pr-1 py-[1px]">
      <div
        className={cn(
          "h-10 w-full rounded-lg cursor-pointer transition-colors flex items-center px-3 py-1",
          isActive ? "bg-bg800/40" : "hover:bg-bg800/30"
        )}
        onClick={onItemClick}
      >
        <div className="flex-1 min-w-0">
          <div className="text-[14px] text-muted leading-[18px] truncate">{item.label}</div>
        </div>
      </div>
    </div>
  )
}

function MenuSection({
  section,
  expandedItems,
  onToggleExpanded,
  isCollapsed,
  activePath,
  onItemClick,
}: {
  section: MenuSectionT
  expandedItems: Set<string>
  onToggleExpanded: (itemKey: string) => void
  isCollapsed?: boolean
  activePath: string
  onItemClick: (href?: string, external?: boolean) => void
}) {
  return (
    <div className="flex flex-col w-full">
      <div
        className={cn(
          "relative shrink-0 w-full transition-all duration-500 overflow-hidden",
          isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100"
        )}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <div className="flex items-center h-10 px-4">
          <div className="text-[14px] text-muted">{section.title}</div>
        </div>
      </div>

      {section.items.map((item, index) => {
        const itemKey = `${section.title}-${index}`
        const isExpanded = expandedItems.has(itemKey)
        const isActive = item.href === activePath

        return (
          <div key={itemKey} className="w-full flex flex-col">
            <MenuItem
              item={item}
              isExpanded={isExpanded}
              onToggle={() => onToggleExpanded(itemKey)}
              onItemClick={() => onItemClick(item.href, item.external)}
              isCollapsed={isCollapsed}
              isActive={isActive}
            />

            {isExpanded && item.children && !isCollapsed && (
              <div className="flex flex-col gap-1 mb-2">
                {item.children.map((child, childIndex) => {
                  const childIsActive = child.href === activePath
                  return (
                    <SubMenuItem
                      key={`${itemKey}-${childIndex}`}
                      item={child}
                      onItemClick={() => onItemClick(child.href)}
                      isActive={childIsActive}
                    />
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* --------------------------------- Layout -------------------------------- */

export function TwoLevelSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { sidebarOpen, setSidebarOpen } = useAppStore()

  const handlePathChange = (path: string) => {
    router.push(path)
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 z-[100] flex flex-row transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <IconNavigation activePath={pathname} onPathChange={handlePathChange} />
        <DetailSidebar activePath={pathname} />
      </div>
    </>
  )
}
