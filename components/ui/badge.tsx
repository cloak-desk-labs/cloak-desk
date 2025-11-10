"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Badge component for status indicators
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "danger" | "warning" | "info"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-bg700 text-textSecondary",
      success: "bg-success/10 text-success",
      danger: "bg-danger/10 text-danger",
      warning: "bg-warning/10 text-warning",
      info: "bg-info/10 text-info",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }

