import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"



const satoshiFont = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../public/fonts/Satoshi-Black.woff2',
      weight: '400',
      style: 'black',
    },
    {
      path: '../public/./fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: '400',
      style: 'light',
    },
  ],
  display: 'swap',
})

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
      <body className={satoshiFont.className + ` min-h-screen`} ><ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          ><Web3Modal>
            <Navbar />
           {children}</Web3Modal>
          </ThemeProvider>
          <Toaster richColors  position="top-right" /></body>
    </html>
  )
}
