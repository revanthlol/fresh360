"use client"

import React from 'react'
import { motion } from 'motion/react'
import { ProductCard } from './ProductCard'
import { Product } from '@/lib/sanity'

interface AnimatedProductGridProps {
  products: Product[]
}

export function AnimatedProductGrid({ products }: AnimatedProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, idx) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: idx * 0.12,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}
