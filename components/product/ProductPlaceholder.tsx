import React from 'react'

interface ProductPlaceholderProps {
  name: string
  brandId?: string
  className?: string
}

import { SanityImageAsset } from '@/lib/types'

export function hasProductImage(image: SanityImageAsset | null | undefined): boolean {
  return !!(image?.asset?._ref && image.asset._ref !== '')
}

export default function ProductPlaceholder({
  name,
  brandId = 'juicera',
  className = '',
}: ProductPlaceholderProps) {
  const getIcon = () => {
    switch (brandId) {
      case 'fuzzy': return '⚡'
      case 'refrizz': return '🫧'
      default: return '🌿'
    }
  }

  const getBgColor = () => {
    switch (brandId) {
      case 'fuzzy': return 'bg-teal-50'
      case 'refrizz': return 'bg-orange-50'
      default: return 'bg-green-50'
    }
  }

  const getTextColor = () => {
    switch (brandId) {
      case 'fuzzy': return 'text-teal-700'
      case 'refrizz': return 'text-orange-700'
      default: return 'text-green-700'
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${getBgColor()} ${className}`}>
      <span className="text-6xl mb-4 grayscale opacity-50">{getIcon()}</span>
      <h3 className={`text-lg font-bold font-[family-name:var(--font-playfair)] opacity-40 ${getTextColor()}`}>
        {name}
      </h3>
      <p className="text-xs uppercase tracking-widest mt-2 opacity-30">Freshly Sourced</p>
    </div>
  )
}
