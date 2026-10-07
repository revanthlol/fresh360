"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/lib/sanity'
import { cn } from '@/lib/utils'
import { ProductMediaFrame } from './ProductMediaFrame'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const brandColors = {
    juicera: 'text-brand-green bg-brand-green-light',
    fruizy: 'text-brand-teal bg-brand-teal-light',
    fizzo: 'text-brand-orange bg-brand-orange-light',
  }

  const brandId = (product.brand?.id?.current || 'juicera') as keyof typeof brandColors

  return (
    <article
      className={cn(
        "group relative home-card rounded-[2rem] overflow-hidden transition-shadow duration-200 hover:shadow-lg",
        className
      )}
    >
      <Link href={`/products/${product.slug.current}`} className="block">
        <div className="product-image-hover relative">
          <ProductMediaFrame
            image={product.image}
            alt={product.name}
            brandName={product.brand?.name}
            accentColor={product.brand?.primaryColor || product.brand?.color}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="rounded-none home-media"
            imageClassName="transition-transform duration-200"
          />

          <div className={cn(
            "absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md",
            brandColors[brandId]
          )}>
            {product.brand?.name || 'Fresh 360'}
          </div>
        </div>

        <div className="p-6 space-y-2">
          <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-green transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed min-h-10">
              {product.tagline || ''}
          </p>
          
          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 italic">
              {product.category?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Beverage'}
            </span>
            <div className="w-8 h-8 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(237,247,237,0.96))] flex items-center justify-center text-slate-400 group-hover:bg-brand-green group-hover:text-white transition-colors">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
