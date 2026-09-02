"use client"

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, CheckCircle2, MessageCircle, Mail, Layers, ShieldCheck } from 'lucide-react'
import { Product } from '@/lib/sanity'
import { ProductMediaFrame } from './ProductMediaFrame'
import { cn } from '@/lib/utils'

interface ProductQuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductQuickViewModal({ product, isOpen, onClose }: ProductQuickViewModalProps) {
  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!product) return null

  const brandColors: Record<string, { bg: string; text: string; border: string }> = {
    juicera: {
      bg: 'bg-emerald-50 text-emerald-700',
      text: 'text-brand-green',
      border: 'border-emerald-200',
    },
    fuzzy: {
      bg: 'bg-teal-50 text-teal-700',
      text: 'text-brand-teal',
      border: 'border-teal-200',
    },
    refrizz: {
      bg: 'bg-amber-50 text-amber-700',
      text: 'text-brand-orange',
      border: 'border-amber-200',
    },
  }

  const brandId = (product.brand?.id?.current || 'juicera') as keyof typeof brandColors
  const activeColor = brandColors[brandId] || brandColors.juicera

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9705522020'
  const whatsappMessage = encodeURIComponent(
    `Hello Fresh 360, I'm interested in learning more or placing an inquiry for ${product.name} (${product.brand?.name || 'Fresh 360'}).`
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-emerald-100/80 z-10 p-6 sm:p-8 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-slate-100/90 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors active:scale-95"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Image Column */}
              <div className="md:col-span-5 relative flex items-center justify-center">
                <div className="w-full relative rounded-3xl overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(235,248,235,0.7))] p-6 border border-emerald-100/80 shadow-inner">
                  <ProductMediaFrame
                    image={product.image}
                    alt={product.name}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="max-h-[380px] w-auto mx-auto object-contain drop-shadow-xl"
                  />
                  {/* Floating Badge */}
                  <div
                    className={cn(
                      'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm',
                      activeColor.bg,
                      activeColor.border
                    )}
                  >
                    {product.brand?.name || 'Fresh 360'}
                  </div>
                </div>
              </div>

              {/* Details Column */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {product.category
                        ? product.category
                            .split('-')
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(' ')
                        : 'Cold Pressed'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <ShieldCheck size={14} /> 100% Pure & Fresh
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-lg font-medium text-emerald-700/90 mt-1">
                    {product.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {product.description ||
                    'Crafted under strict sterile conditions using the finest hand-selected produce. Free of synthetic preservatives, added sugars, or artificial colors.'}
                </p>

                {/* Benefits / Highlights */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-emerald-500" /> Key Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
                        >
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Layers size={14} className="text-emerald-500" /> Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="inline-block bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Actions */}
                <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-100">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle size={17} />
                    Inquire via WhatsApp
                  </a>

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Mail size={17} />
                    Send Bulk Inquiry
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
