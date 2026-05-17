import React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function PageHeader({ 
  title, 
  subtitle, 
  centered = true,
  className
}: PageHeaderProps) {
  return (
    <div className={cn(
      "relative pt-40 pb-20 overflow-hidden bg-transparent border-b border-emerald-100/70",
      centered ? "text-center" : "text-left",
      className
    )}>
      {/* Abstract Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
