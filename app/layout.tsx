import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SwiftVisa | AI-Powered Visa Eligibility Screening",
  description:
    "SwiftVisa uses advanced AI and official immigration policies to provide accurate visa eligibility assessments. Check your eligibility for work, student, PR, and tourist visas.",
  keywords: [
    "visa eligibility",
    "immigration",
    "AI visa screening",
    "work visa",
    "student visa",
    "permanent residency",
  ],
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#2563eb",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
