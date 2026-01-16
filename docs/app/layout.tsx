import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CloakDesk Documentation - Privacy-First Blockchain Dashboard",
  description: "Complete documentation for CloakDesk - Privacy-first web dashboard for blockchain privacy and anonymity",
  keywords: [
    "CloakDesk",
    "blockchain privacy",
    "crypto privacy",
    "wallet privacy",
    "transaction obfuscation",
    "zero-knowledge proofs",
    "MPC vault",
    "stealth routing",
    "documentation",
  ],
  authors: [{ name: "CloakDesk Team" }],
  creator: "CloakDesk",
  publisher: "CloakDesk",
  metadataBase: new URL("https://docs.cloakdesk.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://docs.cloakdesk.xyz",
    title: "CloakDesk Documentation - Privacy-First Blockchain Dashboard",
    description: "Complete documentation for CloakDesk - Privacy-first web dashboard for blockchain privacy and anonymity",
    siteName: "CloakDesk Documentation",
    images: [
      {
        url: "https://docs.cloakdesk.xyz/og-banner.png",
        width: 1440,
        height: 810,
        alt: "CloakDesk Documentation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloakDesk Documentation - Privacy-First Blockchain Dashboard",
    description: "Complete documentation for CloakDesk - Privacy-first web dashboard for blockchain privacy and anonymity",
    images: ["https://docs.cloakdesk.xyz/og-banner.png"],
    creator: "@cloakdesk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-bg900/50 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="relative h-8 w-8">
                  <Image
                    src="/logo.png"
                    alt="CloakDesk Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-xl font-bold gradient-text">CloakDesk Docs</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  href="/getting-started"
                  className="text-sm text-muted hover:text-textPrimary transition-colors"
                >
                  Getting Started
                </Link>
                <Link
                  href="/features"
                  className="text-sm text-muted hover:text-textPrimary transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/api"
                  className="text-sm text-muted hover:text-textPrimary transition-colors"
                >
                  API
                </Link>
                <a
                  href="https://www.cloakdesk.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primaryStart hover:text-primaryEnd transition-colors"
                >
                  Open App →
                </a>
              </div>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t border-white/10 bg-bg800 mt-20">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-8 w-8">
                    <Image
                      src="/logo.png"
                      alt="CloakDesk Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-semibold gradient-text">CloakDesk</span>
                </div>
                <p className="text-sm text-muted">
                  Privacy-first blockchain dashboard documentation
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-textPrimary mb-4">Documentation</h4>
                <ul className="space-y-2 text-sm text-muted">
                  <li>
                    <Link href="/getting-started" className="hover:text-textPrimary transition-colors">
                      Getting Started
                    </Link>
                  </li>
                  <li>
                    <Link href="/features" className="hover:text-textPrimary transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/api" className="hover:text-textPrimary transition-colors">
                      API Reference
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-textPrimary mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted">
                  <li>
                    <a
                      href="https://www.cloakdesk.xyz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-textPrimary transition-colors"
                    >
                      Open App
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/cloak-desk-labs/cloak-desk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-textPrimary transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:support@cloakdesk.io"
                      className="hover:text-textPrimary transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted">
              <p>&copy; {new Date().getFullYear()} CloakDesk. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

