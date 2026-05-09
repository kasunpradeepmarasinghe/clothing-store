import Link from 'next/link'
import { mockProducts } from '@/lib/mock-data'
import { ProductCard } from '@/components/ProductCard'

export default function HomePage() {
  const featured = mockProducts.filter(p => p.featured).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/20 via-transparent to-[#080808]" />
        <div className="relative text-center z-10 px-6">
          <p className="font-body text-xs tracking-[0.4em] text-[#d4af7a] uppercase mb-6 animate-fade-in">
            New Collection
          </p>
          <h1 className="font-display text-7xl md:text-9xl font-light tracking-[0.05em] text-[#efefef] mb-8 animate-fade-up">
            Effortless
          </h1>
          <p className="font-body text-sm text-[#888] tracking-widest mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Minimal clothing for the modern wardrobe
          </p>
          <Link
            href="/shop"
            className="inline-block font-body text-xs tracking-[0.3em] uppercase border border-[#efefef] text-[#efefef] px-10 py-4 hover:bg-[#efefef] hover:text-[#080808] transition-all duration-300 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Shop Now
          </Link>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555]">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#555]" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-body text-xs text-[#d4af7a] tracking-[0.3em] uppercase mb-3">Curated</p>
            <h2 className="font-display text-5xl font-light tracking-wide">Featured</h2>
          </div>
          <Link
            href="/shop"
            className="font-body text-xs tracking-[0.3em] uppercase text-[#888] hover:text-[#efefef] transition-colors border-b border-[#333] pb-1 hover:border-[#efefef]"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="bg-[#0f0f0f] py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs text-[#d4af7a] tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
            <h2 className="font-display text-5xl font-light leading-tight text-[#efefef] mb-6">
              Less, but<br />better.
            </h2>
            <p className="font-body text-sm text-[#666] leading-relaxed mb-8">
              We believe in quality over quantity. Each piece in our collection is designed to last, to layer, and to be worn endlessly.
            </p>
            <Link
              href="/shop"
              className="font-body text-xs tracking-[0.3em] uppercase text-[#888] hover:text-[#efefef] transition-colors"
            >
              Explore Collection →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 h-80">
            <div className="bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600')] bg-cover bg-center rounded" />
            <div className="bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600')] bg-cover bg-center rounded mt-6" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] py-12 mt-0">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-2xl tracking-[0.2em] mb-3">ELARA</p>
            <p className="font-body text-xs text-[#555] leading-relaxed">
              Minimal clothing. Maximum expression.
            </p>
          </div>
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-[#888] mb-4">Shop</p>
            {['All Products', 'New Arrivals', 'Sale'].map(item => (
              <Link key={item} href="/shop" className="block font-body text-xs text-[#555] hover:text-[#efefef] transition-colors mb-2">
                {item}
              </Link>
            ))}
          </div>
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-[#888] mb-4">Help</p>
            {['Size Guide', 'Shipping', 'Returns'].map(item => (
              <p key={item} className="font-body text-xs text-[#555] mb-2">{item}</p>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-[#1a1a1a]">
          <p className="font-body text-xs text-[#333] tracking-wider">© 2025 ELARA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
