import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ShoppingCartProvider } from "@/lib/shopping-cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "What Should I Eat Today?",
  description: "AI-powered meal planning for busy students and professionals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShoppingCartProvider>
          {children}
          <Toaster />
        </ShoppingCartProvider>
      </body>
    </html>
  )
}



import './globals.css'