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

export const metadata: Metadata = {
  title: "CloakDesk - Privacy-First Web Dashboard",
  description: "Privacy-first web dashboard for blockchain privacy and anonymity",
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

