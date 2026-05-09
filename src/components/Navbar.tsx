'use client'

import Link from 'next/link'
import { ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#080808]/95 backdrop-blur-sm border-b border-[#1f1f1f]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl tracking-[0.2em] text-[#efefef] hover:text-[#d4af7a] transition-colors">
            ELARA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Shop', 'New Arrivals', 'About'].map(item => (
              <Link
                key={item}
                href={item === 'Shop' ? '/shop' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="font-body text-sm tracking-widest text-[#888] hover:text-[#efefef] transition-colors uppercase"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link href="/wishlist" className="text-[#888] hover:text-[#efefef] transition-colors">
              <Heart size={18} />
            </Link>
            <button
              onClick={toggleCart}
              className="relative text-[#888] hover:text-[#efefef] transition-colors"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#d4af7a] text-[#080808] text-[10px] font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-[#888] hover:text-[#efefef] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center gap-8">
          {['Shop', 'New Arrivals', 'About'].map(item => (
            <Link
              key={item}
              href={item === 'Shop' ? '/shop' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="font-display text-4xl tracking-widest text-[#efefef] hover:text-[#d4af7a] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
