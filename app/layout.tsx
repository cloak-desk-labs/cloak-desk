import type { Metadata } from "next"
import { Exo_2 } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const exo2 = Exo_2({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-exo2",
})

// Base URL for absolute image URLs
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://cloakdesk.xyz")

export const metadata: Metadata = {
  title: "CloakDesk - Privacy-First Web Dashboard",
  description: "Privacy-first web dashboard for blockchain privacy and anonymity",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "CloakDesk - Privacy-First Web Dashboard",
    description: "Monitor your privacy health, analyze wallet exposure, and protect your blockchain anonymity all in one place",
    url: baseUrl,
    siteName: "CloakDesk",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "CloakDesk - Your Privacy Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloakDesk - Privacy-First Web Dashboard",
    description: "Monitor your privacy health, analyze wallet exposure, and protect your blockchain anonymity all in one place",
    images: ["/og-banner.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={exo2.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

