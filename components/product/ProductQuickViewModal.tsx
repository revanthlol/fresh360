"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { X, Sparkles, CheckCircle2, MessageCircle, Mail, Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/lib/sanity'
import { ProductMediaFrame } from './ProductMediaFrame'
import { ProductFlavorDetails } from './ProductFlavorDetails'

interface ProductQuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  instant?: boolean
  onPrevious?: () => void
  onNext?: () => void
  position?: number
  total?: number
}

export function ProductQuickViewModal({ product, isOpen, onClose, instant = false, onPrevious, onNext, position, total }: ProductQuickViewModalProps) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
    }

    const dialog = dialogRef.current
    if (!dialog) return
    const scrollY = window.scrollY
    const body = document.body
    const root = document.documentElement
    const saved = { position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight, rootOverflow: root.style.overflow }
    const scrollbar = window.innerWidth - root.clientWidth
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0
    Object.assign(body.style, { position: 'fixed', top: `-${scrollY}px`, left: '0', right: '0', width: '100%', overflow: 'hidden', paddingRight: `${padding + scrollbar}px` })
    root.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    window.addEventListener('keydown', handleKeyDown)
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      cancelAnimationFrame(focusFrame)
      dialog.close()
      Object.assign(body.style, { position: saved.position, top: saved.top, left: saved.left, right: saved.right, width: saved.width, overflow: saved.overflow, paddingRight: saved.paddingRight })
      root.style.overflow = saved.rootOverflow
      window.scrollTo({ top: scrollY, behavior: 'instant' })
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !onPrevious || !onNext) return
    const navigate = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'ArrowLeft') { event.preventDefault(); onPrevious() }
      if (event.key === 'ArrowRight') { event.preventDefault(); onNext() }
    }
    window.addEventListener('keydown', navigate)
    return () => window.removeEventListener('keydown', navigate)
  }, [isOpen, onPrevious, onNext])

  if (!product) return null

  const activeColor = product.brand?.primaryColor || product.brand?.color || '#2D6A2D'

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9705522020'
  const whatsappMessage = encodeURIComponent(
    `Hello Fresh 360, I'm interested in learning more or placing an inquiry for ${product.name} (${product.brand?.name || 'Fresh 360'}).`
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <dialog ref={dialogRef} aria-labelledby="product-quick-view-title" onCancel={(event) => { event.preventDefault(); onClose() }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-transparent">
        <div className="flex h-full items-center justify-center px-2 py-8 md:px-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion || instant ? 0 : 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          <div className="relative w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, transform: reduceMotion || instant ? "translateY(0px) scale(1)" : "translateY(8px) scale(0.97)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: reduceMotion || instant ? "translateY(0px) scale(1)" : "translateY(4px) scale(0.98)" }}
            transition={{ duration: reduceMotion || instant ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative mx-6 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain rounded-2xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8 md:mx-0 md:p-10"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-slate-100/90 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors active:scale-95"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* The photograph uses the same frame as the product carousel. */}
              <div className="md:col-span-5 relative pt-8 md:pt-0">
                <div className="relative">
                  <ProductMediaFrame
                    image={product.image}
                    alt={product.name}
                    brandName={product.brand?.name}
                    accentColor={activeColor}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="mx-auto aspect-[3/4] w-full max-w-72 rounded-xl bg-transparent sm:max-w-80 md:max-w-none"
                    imageClassName="object-contain"
                  />

                </div>
                {total && position ? <p className="mt-3 text-center text-sm tabular-nums text-slate-500" aria-live="polite">{position} of {total}<span className="sr-only">: {product.name}</span></p> : null}
              </div>

              {/* Details Column */}
              <div className="min-w-0 md:col-span-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {product.category
                        ? product.category
                            .split('-')
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(' ')
                        : 'Beverage'}
                    </span>
                  </div>

                  <h2 id="product-quick-view-title" className="text-2xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
                    {product.name}
                  </h2>
                  {product.tagline && <p className="text-lg font-medium text-emerald-700/90 mt-1">{product.tagline}</p>}
                </div>

                {/* Description */}
                {product.description && <p className="text-slate-600 leading-relaxed text-base max-w-[65ch]">{product.description}</p>}

                {/* Benefits / Highlights */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-emerald-500" /> Key Highlights
                    </h3>
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
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Layers size={14} className="text-emerald-500" /> Ingredients
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="inline-block max-w-full break-words bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <ProductFlavorDetails product={product} />

                {/* Call to Actions */}
                <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-100">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-emerald-600/20 press-feedback"
                  >
                    <MessageCircle size={17} />
                    Inquire via WhatsApp
                  </a>

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-full text-sm press-feedback"
                  >
                    <Mail size={17} />
                    Send Bulk Inquiry
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
                  {onPrevious && onNext && (
                    <>
                      <button type="button" onClick={onPrevious} aria-label="Previous product" className="press-feedback absolute left-0 top-1/2 md:-left-14 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/95 text-slate-900 shadow-md hover:bg-white">
                        <ChevronLeft size={22} aria-hidden="true" />
                      </button>
                      <button type="button" onClick={onNext} aria-label="Next product" className="press-feedback absolute right-0 top-1/2 md:-right-14 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/95 text-slate-900 shadow-md hover:bg-white">
                        <ChevronRight size={22} aria-hidden="true" />
                      </button>
                    </>
                  )}
          </div>
        </div>
    </dialog>
  )
}
