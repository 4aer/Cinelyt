import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cinelyt",
  description: "AI-powered streaming discovery",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-zinc-950 text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}