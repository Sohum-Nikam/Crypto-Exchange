import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { AuthLayout } from "@/components/auth-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vaultify - Crypto Dashboard",
  description: "A modern crypto dashboard with real-time data and analytics",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  )
}


import './globals.css'
