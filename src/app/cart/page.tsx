'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { Order } from '@/types'
import Image from 'next/image'

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<'review' | 'details' | 'success'>('review')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    address: '',
    city: '',
    payment_method: 'cod' as 'cod' | 'card',
  })

  const handleSubmit = async () => {
    if (!form.customer_name || !form.phone || !form.address) return
    setLoading(true)
    try {
      const order: Order = { ...form, items, total: totalPrice }
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      if (res.ok) {
        clearCart()
        setStep('success')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="font-body text-xs text-[#d4af7a] tracking-[0.3em] uppercase mb-4">Thank you</p>
          <h1 className="font-display text-5xl font-light mb-4">Order Confirmed</h1>
          <p className="font-body text-sm text-[#666] mb-8">We will contact you shortly to confirm delivery.</p>
          <a href="/shop" className="font-body text-xs tracking-[0.3em] uppercase border border-[#efefef] text-[#efefef] px-8 py-3 hover:bg-[#efefef] hover:text-[#080808] transition-all">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-light text-[#333] mb-4">Your bag is empty</h1>
          <a href="/shop" className="font-body text-xs text-[#888] hover:text-[#efefef] tracking-widest uppercase transition-colors">
            Shop Now →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-body text-xs text-[#d4af7a] tracking-[0.3em] uppercase mb-2">Almost there</p>
          <h1 className="font-display text-5xl font-light">Checkout</h1>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-8 mb-12 pb-6 border-b border-[#1f1f1f]">
          {['Review', 'Details'].map((s, i) => (
            <button
              key={s}
              onClick={() => i === 0 ? setStep('review') : step === 'details' && setStep('details')}
              className={`font-body text-xs tracking-[0.2em] uppercase ${
                (step === 'review' && i === 0) || (step === 'details' && i === 1)
                  ? 'text-[#efefef]'
                  : 'text-[#444]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {step === 'review' && (
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-5 py-5 border-b border-[#1a1a1a]">
                  <div className="relative w-20 h-24 bg-[#111] flex-shrink-0">
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm text-[#efefef]">{item.product.name}</p>
                    <p className="font-body text-xs text-[#555] mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                    <p className="font-body text-sm text-[#d4af7a] mt-2">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0f0f0f] border border-[#1f1f1f] p-6 h-fit">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[#888] mb-5">Order Summary</p>
              <div className="space-y-3 mb-5 text-sm font-body">
                <div className="flex justify-between text-[#666]">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[#666]">
                  <span>Delivery</span>
                  <span>{totalPrice >= 5000 ? 'Free' : formatPrice(350)}</span>
                </div>
                <div className="flex justify-between text-[#efefef] pt-3 border-t border-[#1f1f1f] font-medium">
                  <span>Total</span>
                  <span className="text-[#d4af7a]">{formatPrice(totalPrice >= 5000 ? totalPrice : totalPrice + 350)}</span>
                </div>
              </div>
              <button
                onClick={() => setStep('details')}
                className="w-full py-4 bg-[#efefef] text-[#080808] font-body text-xs tracking-[0.3em] uppercase hover:bg-[#d4af7a] transition-colors"
              >
                Continue
              </button>
              {totalPrice < 5000 && (
                <p className="font-body text-xs text-[#555] text-center mt-3">
                  Add {formatPrice(5000 - totalPrice)} more for free delivery
                </p>
              )}
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-[#888] block mb-2">Full Name</label>
                  <input
                    type="text"
                    value={form.customer_name}
                    onChange={e => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full bg-[#0f0f0f] border border-[#1f1f1f] text-[#efefef] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#555] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-[#888] block mb-2">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#0f0f0f] border border-[#1f1f1f] text-[#efefef] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#555] transition-colors"
                    placeholder="07X XXX XXXX"
                  />
                </div>
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.2em] uppercase text-[#888] block mb-2">Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#0f0f0f] border border-[#1f1f1f] text-[#efefef] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#555] transition-colors"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.2em] uppercase text-[#888] block mb-2">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-[#0f0f0f] border border-[#1f1f1f] text-[#efefef] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#555] transition-colors"
                  placeholder="Colombo"
                />
              </div>

              {/* Payment */}
              <div>
                <label className="font-body text-xs tracking-[0.2em] uppercase text-[#888] block mb-3">Payment</label>
                <div className="flex gap-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery' },
                    { value: 'card', label: 'Card / Online' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, payment_method: opt.value as 'cod' | 'card' })}
                      className={`flex-1 py-3 font-body text-xs tracking-wider uppercase border transition-all ${
                        form.payment_method === opt.value
                          ? 'border-[#d4af7a] text-[#d4af7a]'
                          : 'border-[#1f1f1f] text-[#555] hover:border-[#333]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#0f0f0f] border border-[#1f1f1f] p-6 h-fit">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[#888] mb-5">Order Total</p>
              <p className="font-display text-3xl text-[#d4af7a] mb-6">
                {formatPrice(totalPrice >= 5000 ? totalPrice : totalPrice + 350)}
              </p>
              <button
                onClick={handleSubmit}
                disabled={loading || !form.customer_name || !form.phone || !form.address}
                className="w-full py-4 bg-[#efefef] text-[#080808] font-body text-xs tracking-[0.3em] uppercase hover:bg-[#d4af7a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
