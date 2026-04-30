import React from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FSSAIBadgeProps {
  className?: string
  variant?: 'small' | 'large'
}

export function FSSAIBadge({ className, variant = 'small' }: FSSAIBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5",
      variant === 'large' ? "text-sm py-2" : "text-[10px] font-bold uppercase tracking-wider",
      className
    )}>
      <CheckCircle size={variant === 'large' ? 18 : 14} />
      <span>FSSAI Certified</span>
    </div>
  )
}
