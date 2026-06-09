import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Flashy — Learn a Language",
  description:
    "Study Spanish, French, Portuguese, German, and Japanese with flippable flashcards and quizzes. Friendly, fast, and made for English speakers.",
  applicationName: "Flashy",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flashy",
  },
  manifest: "/manifest.webmanifest",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-background ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
