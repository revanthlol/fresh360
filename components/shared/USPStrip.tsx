import React from 'react'
import { Leaf, Zap, Droplets, Heart } from 'lucide-react'

const usps = [
  {
    icon: Leaf,
    title: '100% Organic',
    desc: 'Farm-sourced ingredients only.'
  },
  {
    icon: Droplets,
    title: 'Cold Pressed',
    desc: 'Retaining every bit of nutrition.'
  },
  {
    icon: Zap,
    title: 'No Added Sugar',
    desc: 'Natural sweetness from fruits.'
  },
  {
    icon: Heart,
    title: 'Preservative Free',
    desc: 'Pure goodness, no chemicals.'
  }
]

export function USPStrip() {
  return (
    <section className="py-16 bg-brand-green text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {usps.map((usp, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-white/20">
                <usp.icon size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-display font-bold">{usp.title}</h4>
                <p className="text-white/60 text-sm">{usp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
