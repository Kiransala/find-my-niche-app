import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NicheFinder - AI-Powered Business Niche Discovery",
  description:
    "Discover profitable business opportunities with our AI-powered niche finder. Get personalized recommendations based on your interests, skills, and market analysis.",
  keywords:
    "business niche finder, AI business analysis, entrepreneurship, startup ideas, market research, business opportunities, niche discovery",
  authors: [{ name: "NicheFinder Team" }],
  openGraph: {
    title: "NicheFinder - AI-Powered Business Niche Discovery",
    description: "Find your perfect business niche with AI-powered analysis and personalized recommendations",
    type: "website",
    siteName: "NicheFinder",
  },
  twitter: {
    card: "summary_large_image",
    title: "NicheFinder - AI-Powered Business Niche Discovery",
    description: "Find your perfect business niche with AI-powered analysis",
  },
  robots: {
    index: true,
    follow: true,
  },
 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
