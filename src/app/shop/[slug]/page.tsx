'use client'

import { useState } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Heart, ChevronDown } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import { ProductCard } from '@/components/ProductCard'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = mockProducts.find(p => p.slug === params.slug)
  if (!product) notFound()

  const { addItem, openCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()

  const [selectedSize, setSelectedSize] = useState('')
  const [activeImg, setActiveImg] = useState(0)
  const [sizeError, setSizeError] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const related = mockProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return }
    addItem(product, selectedSize)
    openCart()
    setSizeError(false)
  }

  const handleWhatsApp = () => {
    const msg = `Hi! I'd like to order:\n*${product.name}*\nSize: ${selectedSize || 'TBD'}\nPrice: ${formatPrice(product.price)}`
    window.open(getWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94771234567', msg), '_blank')
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] bg-[#111111] overflow-hidden">
              {product.images[activeImg] && (
                <Image
                  src={product.images[activeImg]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-16 h-20 bg-[#111111] overflow-hidden border transition-colors ${
                      activeImg === i ? 'border-[#d4af7a]' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pt-4">
            <p className="font-body text-xs text-[#555] tracking-[0.3em] uppercase mb-3">{product.category}</p>
            <h1 className="font-display text-4xl font-light tracking-wide mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-8">
              <p className="font-body text-xl text-[#d4af7a]">{formatPrice(product.price)}</p>
              {product.original_price && (
                <p className="font-body text-sm text-[#444] line-through">{formatPrice(product.original_price)}</p>
              )}
            </div>

            <p className="font-body text-sm text-[#666] leading-relaxed mb-10">{product.description}</p>

            {/* Size selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-[#888]">Select Size</p>
                <button
                  onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                  className="font-body text-xs text-[#555] hover:text-[#efefef] transition-colors flex items-center gap-1"
                >
                  Size Guide <ChevronDown size={12} className={`transition-transform ${sizeGuideOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {sizeGuideOpen && (
                <div className="mb-4 p-4 bg-[#111111] border border-[#1f1f1f] text-xs font-body text-[#888]">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[#555]">
                        <th className="text-left pb-2">Size</th>
                        <th className="text-left pb-2">Chest (in)</th>
                        <th className="text-left pb-2">Waist (in)</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      {[['XS','30-32','24-26'],['S','32-34','26-28'],['M','34-36','28-30'],['L','36-38','30-32'],['XL','38-40','32-34']].map(([s,c,w]) => (
                        <tr key={s} className="border-t border-[#1a1a1a]">
                          <td className="py-1.5 text-[#efefef]">{s}</td>
                          <td className="py-1.5">{c}</td>
                          <td className="py-1.5">{w}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={`w-12 h-12 font-body text-sm border transition-all ${
                      selectedSize === size
                        ? 'border-[#efefef] text-[#efefef] bg-[#efefef]/10'
                        : 'border-[#2a2a2a] text-[#666] hover:border-[#555] hover:text-[#efefef]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="font-body text-xs text-[#d4af7a] mt-2">Please select a size</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="w-full py-4 font-body text-xs tracking-[0.3em] uppercase bg-[#efefef] text-[#080808] hover:bg-[#d4af7a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {product.in_stock ? 'Add to Bag' : 'Sold Out'}
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-4 font-body text-xs tracking-[0.3em] uppercase border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-colors flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order via WhatsApp
              </button>

              <button
                onClick={() => toggle(product.id)}
                className="w-full py-4 font-body text-xs tracking-[0.3em] uppercase border border-[#1f1f1f] text-[#666] hover:border-[#333] hover:text-[#efefef] transition-colors flex items-center justify-center gap-2"
              >
                <Heart size={14} className={isWishlisted(product.id) ? 'fill-[#d4af7a] text-[#d4af7a]' : ''} />
                {isWishlisted(product.id) ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="mb-10">
              <p className="font-body text-xs text-[#d4af7a] tracking-[0.3em] uppercase mb-2">You may also like</p>
              <h2 className="font-display text-4xl font-light">Related</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
