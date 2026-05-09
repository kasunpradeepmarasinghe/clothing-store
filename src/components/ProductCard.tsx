'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useWishlist } from '@/context/WishlistContext'
import { useState } from 'react'

export function ProductCard({ product }: { product: Product }) {
  const { toggle, isWishlisted } = useWishlist()
  const [imgIndex, setImgIndex] = useState(0)

  return (
    <div className="group relative">
      <Link href={`/shop/${product.slug}`}>
        <div
          className="relative overflow-hidden bg-[#111111] aspect-[3/4]"
          onMouseEnter={() => product.images[1] && setImgIndex(1)}
          onMouseLeave={() => setImgIndex(0)}
        >
          {product.images[imgIndex] && (
            <Image
              src={product.images[imgIndex]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {!product.in_stock && (
              <span className="bg-[#080808]/80 text-[#888] text-[10px] px-2 py-1 tracking-widest uppercase">
                Sold Out
              </span>
            )}
            {product.original_price && product.in_stock && (
              <span className="bg-[#d4af7a] text-[#080808] text-[10px] px-2 py-1 tracking-widest uppercase font-medium">
                Sale
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggle(product.id)}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#efefef] transition-all opacity-0 group-hover:opacity-100"
      >
        <Heart
          size={16}
          className={isWishlisted(product.id) ? 'fill-[#d4af7a] text-[#d4af7a]' : ''}
        />
      </button>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <Link href={`/shop/${product.slug}`}>
          <p className="font-body text-sm text-[#efefef] hover:text-[#d4af7a] transition-colors">
            {product.name}
          </p>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-body text-sm text-[#d4af7a]">{formatPrice(product.price)}</p>
          {product.original_price && (
            <p className="font-body text-xs text-[#555] line-through">{formatPrice(product.original_price)}</p>
          )}
        </div>
      </div>
    </div>
  )
}
