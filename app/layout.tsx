import type { Metadata } from 'next'
import { Syne, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Fresh 360 | Premium Cold-Pressed Juices & Crafted Beverages',
  description: 'Experience the gold standard of purity. Fresh 360 Degrees Foods LLP delivers artisanal cold-pressed juices, organic nut milks, and signature refreshments across Hyderabad.',
  keywords: 'cold-pressed juice, organic nut milk, fresh 360, juicera, fuzzy, refrizz, hyderabad beverages, premium drinks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden relative">
        <Navbar />
        <div className="flex-grow flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <WhatsAppFloat />
      </body>
    </html>
  )
}
