/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Background colors
        bg900: "#0b0f14",
        bg800: "#0f1720",
        bg700: "#1a2332",
        // Primary accent (teal to violet gradient)
        primaryStart: "#06b6d4",
        primaryEnd: "#7c3aed",
        electric: "#8b5cf6",
        // Text colors
        muted: "#9ba7b2",
        textPrimary: "#ffffff",
        textSecondary: "#cbd5e1",
        // Status colors
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["Exo 2", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        neon: "0 6px 30px rgba(124, 58, 237, 0.12)",
        "neon-lg": "0 10px 50px rgba(124, 58, 237, 0.2)",
        "neon-teal": "0 6px 30px rgba(6, 182, 212, 0.15)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)",
        "gradient-radial": "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(124, 58, 237, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.8), 0 0 30px rgba(124, 58, 237, 0.4)" },
        },
      },
    },
  },
  plugins: [],
}

