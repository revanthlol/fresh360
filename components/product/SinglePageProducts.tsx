"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react'
import { Brand, Product } from '@/lib/sanity'
import { ProductMediaFrame } from './ProductMediaFrame'
import { ProductQuickViewModal } from './ProductQuickViewModal'
import { cn } from '@/lib/utils'

interface SinglePageProductsProps {
  products: Product[]
  brands: Brand[]
  id?: string
}

export function SinglePageProducts({ products, brands, id = 'products' }: SinglePageProductsProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filteredProducts =
    selectedBrand === 'all'
      ? products
      : products.filter((p) => p.brand?.id?.current === selectedBrand)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 360
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const brandColors: Record<string, string> = {
    juicera: 'text-brand-green bg-brand-green-light',
    fruizy: 'text-brand-teal bg-brand-teal-light',
    fuzzy: 'text-brand-teal bg-brand-teal-light',
    refrizz: 'text-brand-orange bg-brand-orange-light',
  }

  return (
    <section id={id} className="py-24 relative overflow-hidden bg-slate-50/50">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-green/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-teal/5 rounded-full translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header with Title and Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-brand-green text-xs font-bold uppercase tracking-widest">
              <Sparkles size={13} /> Complete Collection
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
              Explore Our Pure Refreshments
            </h2>
            <p className="text-slate-600 max-w-2xl text-base md:text-lg">
              Swipe or scroll through our full lineup. Click any bottle for instant detailed flavor profiles, ingredients, and nutrition facts.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline-block mr-1">
              Scroll Bottles
            </span>
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="w-12 h-12 rounded-full home-card border border-emerald-100 flex items-center justify-center text-slate-700 hover:text-brand-green hover:border-brand-green hover:shadow-md active:scale-95 transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="w-12 h-12 rounded-full home-card border border-emerald-100 flex items-center justify-center text-slate-700 hover:text-brand-green hover:border-brand-green hover:shadow-md active:scale-95 transition-all"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedBrand('all')}
            className={cn(
              'px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shrink-0',
              selectedBrand === 'all'
                ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20 scale-105'
                : 'home-card text-slate-600 hover:text-slate-900 border border-slate-200/70 hover:shadow-sm'
            )}
          >
            All Brands ({products.length})
          </button>
          {brands.map((brand) => {
            const count = products.filter((p) => p.brand?.id?.current === brand.id.current).length
            return (
              <button
                key={brand._id}
                onClick={() => setSelectedBrand(brand.id.current)}
                className={cn(
                  'px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shrink-0',
                  selectedBrand === brand.id.current
                    ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20 scale-105'
                    : 'home-card text-slate-600 hover:text-slate-900 border border-slate-200/70 hover:shadow-sm'
                )}
              >
                {brand.name} {count > 0 && `(${count})`}
              </button>
            )
          })}
        </div>

        {/* Horizontal Moving Products Carousel */}
        <div className="relative -mx-6 px-6">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProducts.map((product) => {
              const brandId = (product.brand?.id?.current || 'juicera') as keyof typeof brandColors
              const brandClass = brandColors[brandId] || brandColors.juicera

              return (
                <div
                  key={product._id}
                  className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                    onClick={() => setActiveModalProduct(product)}
                    className="group relative h-full flex flex-col home-card rounded-[2rem] overflow-hidden border border-emerald-100/70 shadow-sm hover:shadow-2xl transition-all cursor-pointer bg-white"
                  >
                    {/* Bottle Visual Stage */}
                    <div className="relative p-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,248,238,0.7))] overflow-hidden flex items-center justify-center">
                      <ProductMediaFrame
                        image={product.image}
                        alt={product.name}
                        sizes="(max-width: 768px) 280px, 340px"
                        className="h-[280px] w-auto mx-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Brand Label */}
                      <div
                        className={cn(
                          'absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md',
                          brandClass
                        )}
                      >
                        {product.brand?.name || 'Fresh 360'}
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-2 bg-white/95 text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform">
                          <Eye size={15} className="text-brand-green" /> Quick View
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                          <span>
                            {product.category
                              ? product.category
                                  .split('-')
                                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                  .join(' ')
                              : 'Cold Pressed'}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-green transition-colors leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mt-1.5 leading-relaxed">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-brand-green">
                          Tap for details
                        </span>
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all">
                          <Eye size={16} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 home-card rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-slate-500 font-medium">No products currently found for this brand.</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={activeModalProduct}
        isOpen={Boolean(activeModalProduct)}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  )
}
