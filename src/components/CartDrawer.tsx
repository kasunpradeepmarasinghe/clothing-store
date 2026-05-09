'use client'

import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice } = useCart()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-[#111111] border-l border-[#1f1f1f] transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1f1f1f]">
          <span className="font-display text-xl tracking-widest">BAG ({items.length})</span>
          <button onClick={closeCart} className="text-[#888] hover:text-[#efefef] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-[#888]">
              <ShoppingBag size={40} strokeWidth={1} />
              <p className="font-body text-sm tracking-widest uppercase">Your bag is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                <div className="relative w-20 h-24 bg-[#1a1a1a] rounded overflow-hidden flex-shrink-0">
                  {item.product.images[0] && (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-[#efefef] truncate">{item.product.name}</p>
                  <p className="font-body text-xs text-[#888] mt-1">Size: {item.size}</p>
                  <p className="font-body text-sm text-[#d4af7a] mt-1">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                      className="w-6 h-6 border border-[#333] flex items-center justify-center text-[#888] hover:text-[#efefef] hover:border-[#888] transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="font-body text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                      className="w-6 h-6 border border-[#333] flex items-center justify-center text-[#888] hover:text-[#efefef] hover:border-[#888] transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="ml-auto text-[#555] hover:text-[#efefef] transition-colors text-xs tracking-wider uppercase"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#1f1f1f] space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-[#888] tracking-widest uppercase">Total</span>
              <span className="font-display text-xl">{formatPrice(totalPrice)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full bg-[#efefef] text-[#080808] text-center py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-[#d4af7a] transition-colors"
            >
              Checkout
            </Link>
            <p className="text-center font-body text-xs text-[#555] tracking-wider">
              Free delivery on orders over LKR 5,000
            </p>
          </div>
        )}
      </div>
    </>
  )
}
