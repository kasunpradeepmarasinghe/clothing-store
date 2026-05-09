import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { Navbar } from '@/components/Navbar'
import { CartDrawer } from '@/components/CartDrawer'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'ELARA — Minimal Clothing',
  description: 'Effortless, minimal clothing for the modern wardrobe.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <CartDrawer />
            <main>{children}</main>
            <WhatsAppButton />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
