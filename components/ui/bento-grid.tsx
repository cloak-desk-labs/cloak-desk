"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Video,
  Globe,
} from "lucide-react"

export interface BentoItem {
  title: string
  description: string
  icon: React.ReactNode
  status?: string
  tags?: string[]
  meta?: string
  cta?: string
  colSpan?: number
  hasPersistentHover?: boolean
}

interface BentoGridProps {
  items: BentoItem[]
  className?: string
}

const itemsSample: BentoItem[] = [
  {
    title: "Analytics Dashboard",
    meta: "v2.4.1",
    description:
      "Real-time metrics with AI-powered insights and predictive analytics",
    icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
    status: "Live",
    tags: ["Statistics", "Reports", "AI"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Task Manager",
    meta: "84 completed",
    description: "Automated workflow management with priority scheduling",
    icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    status: "Updated",
    tags: ["Productivity", "Automation"],
  },
  {
    title: "Media Library",
    meta: "12GB used",
    description: "Cloud storage with intelligent content processing",
    icon: <Video className="w-4 h-4 text-purple-500" />,
    tags: ["Storage", "CDN"],
    colSpan: 2,
  },
  {
    title: "Global Network",
    meta: "6 regions",
    description: "Multi-region deployment with edge computing",
    icon: <Globe className="w-4 h-4 text-sky-500" />,
    status: "Beta",
    tags: ["Infrastructure", "Edge"],
  },
]

export function BentoGrid({ items = itemsSample, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
            "border border-white/5",
            "backdrop-blur-xl",
            "bg-bg900/50",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
            "hover:shadow-[0_2px_12px_rgba(124,58,237,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
            "hover:-translate-y-0.5 hover:border-white/10 hover:bg-bg900/60",
            "will-change-transform",
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
            {
              "shadow-[0_2px_12px_rgba(124,58,237,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)] -translate-y-0.5 border-white/10 bg-bg900/60":
                item.hasPersistentHover,
            }
          )}
        >
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 group-hover:bg-gradient-to-br group-hover:from-primaryStart group-hover:to-primaryEnd transition-all duration-300">
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                  "bg-white/10 text-muted",
                  "transition-colors duration-300 group-hover:bg-white/20"
                )}
              >
                {item.status || "Active"}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-textPrimary tracking-tight text-[15px]">
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-muted font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-muted leading-snug font-[425]">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 text-xs text-muted">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                {item.cta || "Explore →"}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-primaryStart/20 to-transparent",
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300"
            )}
          />
        </div>
      ))}
    </div>
  )
}

/**
 * BentoCard - Individual card component using BentoGrid styling
 * Can be used as a drop-in replacement for Card components
 */
export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode
  status?: string
  tags?: string[]
  meta?: string
  cta?: string
  hasPersistentHover?: boolean
}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      title,
      description,
      icon,
      status,
      tags,
      meta,
      cta,
      hasPersistentHover = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative p-6 rounded-xl overflow-hidden transition-all duration-300",
          "border border-white/5",
          "backdrop-blur-xl",
          "bg-bg900/50",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
          "hover:shadow-[0_2px_12px_rgba(124,58,237,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
          "hover:-translate-y-0.5 hover:border-white/10 hover:bg-bg900/60",
          "will-change-transform",
          {
            "shadow-[0_2px_12px_rgba(124,58,237,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)] -translate-y-0.5 border-white/10 bg-bg900/60":
              hasPersistentHover,
          },
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            hasPersistentHover
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
        </div>

        <div className="relative flex flex-col space-y-3">
          {(icon || status) && (
            <div className="flex items-center justify-between">
              {icon && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 group-hover:bg-gradient-to-br group-hover:from-primaryStart group-hover:to-primaryEnd transition-all duration-300">
                  {icon}
                </div>
              )}
              {status && (
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                    "bg-white/10 text-muted",
                    "transition-colors duration-300 group-hover:bg-white/20"
                  )}
                >
                  {status}
                </span>
              )}
            </div>
          )}

          {(title || description) && (
            <div className="space-y-2">
              {title && (
                <h3 className="font-medium text-textPrimary tracking-tight text-[15px]">
                  {title}
                  {meta && (
                    <span className="ml-2 text-xs text-muted font-normal">
                      {meta}
                    </span>
                  )}
                </h3>
              )}
              {description && (
                <p className="text-sm text-muted leading-snug font-[425]">
                  {description}
                </p>
              )}
            </div>
          )}

          {children && <div>{children}</div>}

          {(tags || cta) && (
            <div className="flex items-center justify-between mt-2">
              {tags && tags.length > 0 && (
                <div className="flex items-center space-x-2 text-xs text-muted">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {cta && (
                <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  {cta}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-primaryStart/20 to-transparent",
            hasPersistentHover
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300"
          )}
        />
      </div>
    )
  }
)
BentoCard.displayName = "BentoCard"

