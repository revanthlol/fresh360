import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeader({ 
  label, 
  title, 
  subtitle, 
  centered = true,
  light = false 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "max-w-3xl space-y-4 mb-16",
      centered ? "mx-auto text-center" : "text-left"
    )}>
      <span className={cn(
        "inline-block text-xs font-bold uppercase tracking-[0.2em]",
        light ? "text-white/60" : "text-brand-green"
      )}>
        {label}
      </span>
      <h2 className={cn(
        "text-4xl md:text-5xl font-display font-bold leading-tight",
        light ? "text-white" : "text-slate-900"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg leading-relaxed",
          light ? "text-slate-400" : "text-slate-500"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
