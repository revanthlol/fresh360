"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { urlFor, Product } from '@/lib/sanity'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const brandColors = {
    juicera: 'text-brand-green bg-brand-green-light',
    fuzzy: 'text-brand-teal bg-brand-teal-light',
    refrizz: 'text-brand-orange bg-brand-orange-light',
  }

  const brandId = (product.brand?.id?.current || 'juicera') as keyof typeof brandColors

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        "group relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden transition-all hover:shadow-2xl",
        className
      )}
    >
      <Link href={`/products/${product.slug.current}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          {product.image ? (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              fill
              className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-4xl grayscale opacity-20">
                🥤
             </div>
          )}
          
          <div className={cn(
            "absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
            brandColors[brandId]
          )}>
            {product.brand?.name || 'Fresh 360'}
          </div>
        </div>

        <div className="p-6 space-y-2">
          <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-green transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2 min-h-[40px]">
            {product.tagline}
          </p>
          
          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 italic">
              {product.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-green group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
