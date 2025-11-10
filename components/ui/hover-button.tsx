"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant?: "primary" | "secondary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, variant = "primary", size = "md", ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const [isListening, setIsListening] = React.useState(false)
    const [circles, setCircles] = React.useState<Array<{
      id: number
      x: number
      y: number
      color: string
      fadeState: "in" | "out" | null
    }>>([])
    const lastAddedRef = React.useRef(0)

    // Merge refs
    React.useEffect(() => {
      if (typeof ref === "function") {
        ref(buttonRef.current)
      } else if (ref) {
        ref.current = buttonRef.current
      }
    }, [ref])

    const createCircle = React.useCallback((x: number, y: number) => {
      const buttonWidth = buttonRef.current?.offsetWidth || 0
      const xPos = x / buttonWidth
      const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${
        xPos * 100
      }%)`

      setCircles((prev) => [
        ...prev,
        { id: Date.now(), x, y, color, fadeState: null },
      ])
    }, [])

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!isListening) return
        
        const currentTime = Date.now()
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime
          const rect = event.currentTarget.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          createCircle(x, y)
        }
      },
      [isListening, createCircle]
    )

    const handlePointerEnter = React.useCallback(() => {
      setIsListening(true)
    }, [])

    const handlePointerLeave = React.useCallback(() => {
      setIsListening(false)
    }, [])

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "in" } : c
              )
            )
          }, 0)

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "out" } : c
              )
            )
          }, 1000)

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id))
          }, 2200)
        }
      })
    }, [circles])

    // Size styles
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    // Variant styles - adapted to work with hover effects
    const variantStyles = {
      primary: "text-textPrimary",
      secondary: "text-textSecondary",
      danger: "text-danger",
      ghost: "text-textSecondary",
    }

    // Gradient colors based on variant
    const gradientColors = {
      primary: { start: "#06b6d4", end: "#7c3aed" },
      secondary: { start: "#9ba7b2", end: "#7c3aed" },
      danger: { start: "#ef4444", end: "#f59e0b" },
      ghost: { start: "#9ba7b2", end: "#cbd5e1" },
    }

    return (
      <button
        ref={buttonRef}
        className={cn(
          "relative isolate rounded-3xl",
          "font-medium leading-6",
          "backdrop-blur-lg bg-bg800/50",
          "border border-white/10",
          "cursor-pointer overflow-hidden",
          "transition-all duration-300",
          "hover:border-primaryStart/30 hover:shadow-[0_2px_12px_rgba(124,58,237,0.15)]",
          "before:content-[''] before:absolute before:inset-0",
          "before:rounded-[inherit] before:pointer-events-none",
          "before:z-[1]",
          "before:shadow-[inset_0_0_0_1px_rgba(124,58,237,0.2),inset_0_0_16px_0_rgba(124,58,237,0.1),inset_0_-3px_12px_0_rgba(124,58,237,0.15),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]",
          "before:mix-blend-multiply before:transition-transform before:duration-300",
          "active:before:scale-[0.975]",
          variant === "primary" && "bg-gradient-to-r from-primaryStart/20 to-primaryEnd/20",
          variant === "secondary" && "bg-bg700/50",
          variant === "danger" && "bg-danger/10 border-danger/20",
          variant === "ghost" && "bg-transparent border-transparent",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
        style={{
          "--circle-start": gradientColors[variant].start,
          "--circle-end": gradientColors[variant].end,
          ...props.style,
        } as React.CSSProperties}
      >
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              "absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
              "blur-lg pointer-events-none z-[-1] transition-opacity duration-300",
              fadeState === "in" && "opacity-75",
              fadeState === "out" && "opacity-0 duration-[1.2s]",
              !fadeState && "opacity-0"
            )}
            style={{
              left: x,
              top: y,
              background: color,
            }}
          />
        ))}
        {children && (
          <span className="relative z-10 inline-flex items-center justify-center">{children}</span>
        )}
      </button>
    )
  }
)

HoverButton.displayName = "HoverButton"

export { HoverButton }
