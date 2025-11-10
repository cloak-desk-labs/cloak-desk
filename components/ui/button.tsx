"use client"

import * as React from "react"
import { HoverButton } from "./hover-button"

/**
 * Button component - Now uses HoverButton with animated hover effects
 * Maintains backward compatibility with existing Button API
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <HoverButton
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

