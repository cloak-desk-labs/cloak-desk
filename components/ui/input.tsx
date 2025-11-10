"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Input component for form fields
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-white/10 bg-bg800 px-3 py-2 text-sm text-textPrimary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primaryStart focus:ring-offset-2 focus:ring-offset-bg900 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

