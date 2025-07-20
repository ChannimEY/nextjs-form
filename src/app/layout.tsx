import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import NavbarCom from "@/components/uiComponent/NavbarCom"
import FooterCom from "@/components/uiComponent/FooterCom"
import { CarProvider } from "@/contexts/CarContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Car Marketplace",
  description: "The best place to buy and sell cars.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CarProvider>
          <NavbarCom />
          <main className="min-h-screen bg-background">{children}</main>
          <FooterCom />
          <Toaster />
        </CarProvider>
      </body>
    </html>
  )
}