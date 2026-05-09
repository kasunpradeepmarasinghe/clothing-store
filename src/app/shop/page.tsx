'use client'

import { useState } from 'react'
import { mockProducts, categories } from '@/lib/mock-data'
import { ProductCard } from '@/components/ProductCard'

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="font-body text-xs text-[#d4af7a] tracking-[0.3em] uppercase mb-3">Collection</p>
          <h1 className="font-display text-6xl font-light tracking-wide">Shop</h1>
        </div>

        {/* Category filter */}
        <div className="flex gap-8 mb-12 border-b border-[#1f1f1f] pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-xs tracking-[0.2em] uppercase pb-4 -mb-4 border-b-2 transition-all ${
                activeCategory === cat
                  ? 'border-[#d4af7a] text-[#efefef]'
                  : 'border-transparent text-[#555] hover:text-[#888]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-[#333]">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
