import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({ subsets: ['latin'] })
import { Web3Modal } from "../context/Web3Modal";
import Navbar from '@/components/Navbar'
export const metadata: Metadata = {
  title: 'Dutch Digital Invest',
  description: 'Dutch Digital Invest Dapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ` min-h-screen`} ><ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          ><Web3Modal>
            <Navbar />
           {children}</Web3Modal>
          </ThemeProvider>
          <Toaster /></body>
    </html>
  )
}
