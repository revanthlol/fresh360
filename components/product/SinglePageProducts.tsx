"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, Pause, Play } from 'lucide-react'
import { Brand, Product } from '@/lib/sanity'
import { ProductMediaFrame } from './ProductMediaFrame'
import { ProductQuickViewModal } from './ProductQuickViewModal'
import { cn } from '@/lib/utils'

interface SinglePageProductsProps { products: Product[]; brands: Brand[]; id?: string }

const defaultBrandColors: Record<string, { foreground: string; surface: string }> = {
  juicera: { foreground: '#2D6A2D', surface: '#F0F7F0' },
  fruizy: { foreground: '#0F766E', surface: '#CCFBF1' },
  fizzo: { foreground: '#C2410C', surface: '#FEF3C7' },
}

function brandColor(brand: Brand | undefined, fallbackId = '') {
  const id = brand?.id?.current === 'fuzzy' ? 'fruizy' : brand?.id?.current || fallbackId
  const fallback = defaultBrandColors[id] || { foreground: '#2D6A2D', surface: '#F0F7F0' }
  const foreground = brand?.primaryColor || brand?.color || fallback.foreground
  return { foreground, surface: fallback.surface }
}

const canonicalBrandId = (brandId?: string) => brandId === 'fuzzy' ? 'fruizy' : brandId
const brandLabel = (brand?: Brand) => canonicalBrandId(brand?.id?.current) === 'fruizy' ? 'Fruizy' : brand?.name || 'Fresh 360'
const portfolioBrands = [
  { id: 'juicera', name: 'Juicera' },
  { id: 'fruizy', name: 'Fruizy' },
  { id: 'fizzo', name: 'Fizzo' },
] as const

export function SinglePageProducts({ products, brands, id = 'products' }: SinglePageProductsProps) {
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null)
  const closeModal = useCallback(() => setActiveModalProduct(null), [])
  const [keyboardModal, setKeyboardModal] = useState(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const manuallyPausedRef = useRef(false)
  const modalOpenRef = useRef(false)
  useEffect(() => { modalOpenRef.current = Boolean(activeModalProduct) }, [activeModalProduct])
  const [isRailPaused, setIsRailPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pauseAutoScrollRef = useRef(false)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectBrand = useCallback((brandId: string) => setSelectedBrand(brandId), [])
  const filteredProducts = useMemo(() => selectedBrand === 'all'
    ? products
    : products.filter((product) => canonicalBrandId(product.brand?.id?.current) === selectedBrand), [products, selectedBrand])
  const activeProductIndex = activeModalProduct ? filteredProducts.findIndex((product) => product._id === activeModalProduct._id) : -1
  const navigateProduct = useCallback((direction: -1 | 1) => {
    setActiveModalProduct((current) => {
      const index = filteredProducts.findIndex((product) => product._id === current?._id)
      if (index < 0 || filteredProducts.length < 2) return current
      return filteredProducts[(index + direction + filteredProducts.length) % filteredProducts.length]
    })
  }, [filteredProducts])
  const previousProduct = useCallback(() => navigateProduct(-1), [navigateProduct])
  const nextProduct = useCallback(() => navigateProduct(1), [navigateProduct])
  const activeBrand = brands.find((brand) => canonicalBrandId(brand.id?.current) === selectedBrand)
  const activeBrandLabel = portfolioBrands.find((brand) => brand.id === selectedBrand)?.name || (activeBrand && brandLabel(activeBrand))
  const copies = filteredProducts.length < 2 ? 1 : filteredProducts.length < 4 ? 5 : 3
  const railProducts = Array.from({ length: copies }, (_, copy) => filteredProducts.map((product) => ({ product, copy }))).flat()
  const middleCopy = Math.floor(copies / 2)
  const setRailPaused = (paused: boolean) => {
    pauseAutoScrollRef.current = paused
    setIsRailPaused(paused)
  }

  useEffect(() => {
    const applyHashSelection = () => {
      const match = window.location.hash.match(/^#products\?brand=([^&]+)/)
      if (match) {
        selectBrand(canonicalBrandId(decodeURIComponent(match[1])) || 'all')
        requestAnimationFrame(() => document.getElementById('products')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }))
      }
    }
    const handleBrandSelection = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail
      if (detail) selectBrand(canonicalBrandId(detail) || 'all')
    }
    applyHashSelection()
    window.addEventListener('hashchange', applyHashSelection)
    window.addEventListener('fresh360:select-brand', handleBrandSelection)
    return () => {
      window.removeEventListener('hashchange', applyHashSelection)
      window.removeEventListener('fresh360:select-brand', handleBrandSelection)
    }
  }, [selectBrand])

  useEffect(() => {
    const rail = scrollContainerRef.current
    if (!rail || filteredProducts.length < 2) return
    const copies = filteredProducts.length < 4 ? 5 : 3
    const middleCopy = Math.floor(copies / 2)
    const measureGroup = () => {
      const first = rail.children[0] as HTMLElement | undefined
      const next = rail.children[filteredProducts.length] as HTMLElement | undefined
      return first && next ? next.offsetLeft - first.offsetLeft : 0
    }
    let groupWidth = measureGroup()
    rail.scrollLeft = groupWidth * middleCopy
    const resizeObserver = new ResizeObserver(() => {
      groupWidth = measureGroup()
      rail.scrollLeft = groupWidth * middleCopy
    })
    resizeObserver.observe(rail)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wrapRail = () => {
      if (groupWidth && rail.scrollLeft >= groupWidth * (middleCopy + 1)) rail.scrollLeft -= groupWidth
      if (groupWidth && rail.scrollLeft < groupWidth * (middleCopy - 1)) rail.scrollLeft += groupWidth
    }
    rail.addEventListener("scroll", wrapRail, { passive: true })
    const autoTimer = window.setInterval(() => {
      if (modalOpenRef.current || reduceMotion.matches || manuallyPausedRef.current || pauseAutoScrollRef.current || document.hidden) return
      const first = rail.children[0] as HTMLElement | undefined
      const second = rail.children[1] as HTMLElement | undefined
      if (first && second) rail.scrollBy({ left: second.offsetLeft - first.offsetLeft, behavior: 'smooth' })
    }, 3400)
    return () => {
      rail.removeEventListener("scroll", wrapRail)
      window.clearInterval(autoTimer)
      resizeObserver.disconnect()
    }
  }, [filteredProducts.length, selectedBrand])

  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }, [])

  const scrollRail = (direction: -1 | 1, keyboard = false) => {
    const rail = scrollContainerRef.current
    if (!rail) return
    pauseAutoScrollRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    const first = rail.children[0] as HTMLElement | undefined
    const second = rail.children[1] as HTMLElement | undefined
    if (!first || !second) return
    rail.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft), behavior: keyboard || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    resumeTimerRef.current = setTimeout(() => setRailPaused(false), 1800)
  }

  return (
    <section id={id} className="product-collection relative scroll-mt-24 overflow-hidden bg-slate-50 py-16">
      <div className="container relative z-10 mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-12">
        <div className="collection-heading mb-6 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Explore our drinks</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">Browse the Fresh 360 collection by brand. Open a product for the details available.</p>
          </div>
          {filteredProducts.length > 1 && <div className="flex shrink-0 gap-2" aria-label="Product carousel controls">
            <button type="button" aria-label={manuallyPaused ? 'Resume product movement' : 'Pause product movement'} aria-pressed={manuallyPaused} onClick={() => { manuallyPausedRef.current = !manuallyPausedRef.current; setManuallyPaused(manuallyPausedRef.current) }} className="press-feedback flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 focus-visible:ring-2 focus-visible:ring-brand-green">{manuallyPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}</button>
            <button type="button" onClick={(event) => scrollRail(-1, event.detail === 0)} aria-label="Show previous products" className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm transition-colors hover:border-brand-green hover:text-brand-green active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"><ChevronLeft size={22} aria-hidden="true" /></button>
            <button type="button" onClick={(event) => scrollRail(1, event.detail === 0)} aria-label="Show next products" className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm transition-colors hover:border-brand-green hover:text-brand-green active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"><ChevronRight size={22} aria-hidden="true" /></button>
          </div>}
        </div>

        <div className="mb-4 flex gap-5 overflow-x-auto border-b border-slate-200 pb-px" role="group" aria-label="Filter products by brand">
          <button type="button" onClick={() => selectBrand('all')} aria-pressed={selectedBrand === 'all'} className={cn('shrink-0 border-b-2 px-1 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green', selectedBrand === 'all' ? 'border-brand-green text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900')}>
            All drinks <span className="ml-1 text-xs tabular-nums text-slate-400">{products.length}</span>
          </button>
          {portfolioBrands.map(({ id: brandId, name }) => {
            const brand = brands.find((candidate) => canonicalBrandId(candidate.id?.current) === brandId)
            const count = products.filter((product) => canonicalBrandId(product.brand?.id?.current) === brandId).length
            const color = brandColor(brand, brandId)
            return (
              <button key={brandId} type="button" onClick={() => selectBrand(brandId)} aria-pressed={selectedBrand === brandId} style={{ '--brand-accent': color.foreground } as React.CSSProperties} className={cn('shrink-0 border-b-2 px-1 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green', selectedBrand === brandId ? 'border-[var(--brand-accent)] text-[var(--brand-accent)]' : 'border-transparent text-slate-500 hover:text-slate-900')}>
                {name}<span className="ml-1.5 text-xs tabular-nums text-slate-400">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="mb-3 flex min-h-6 items-center justify-between text-sm text-slate-500" aria-live="polite">
          <p>{activeBrandLabel ? `${activeBrandLabel} collection` : 'Complete collection'}</p>
          <p className="tabular-nums">{filteredProducts.length} {filteredProducts.length === 1 ? 'drink' : 'drinks'}</p>
        </div>

        {filteredProducts.length ? (
          <div className="relative">
            <div ref={scrollContainerRef} onMouseEnter={() => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); setRailPaused(true) }} onMouseLeave={() => { if (!scrollContainerRef.current?.contains(document.activeElement)) setRailPaused(false) }} onFocusCapture={() => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); setRailPaused(true) }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null) && !event.currentTarget.matches(':hover')) setRailPaused(false) }} onTouchStart={() => setRailPaused(true)} onTouchEnd={() => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); resumeTimerRef.current = setTimeout(() => setRailPaused(false), 2500) }} onWheel={() => { setRailPaused(true); if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); resumeTimerRef.current = setTimeout(() => setRailPaused(false), 1800) }} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:snap-none sm:gap-6" aria-label="Products. Hover or focus to pause movement">
            {railProducts.map(({ product, copy }) => {
              const color = brandColor(product.brand)
              return (
                <article key={`${copy}-${product._id}`} aria-hidden={copy !== middleCopy ? true : undefined} className="group w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
                  <button type="button" tabIndex={copy === middleCopy ? 0 : -1} onClick={(event) => { setKeyboardModal(event.detail === 0); setActiveModalProduct(product) }} aria-label={`Quick view: ${product.name}`} className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-brand-green">
                    <div className="product-image-hover relative overflow-hidden rounded-[1.5rem]" style={{ backgroundColor: color.surface }}>
                      <ProductMediaFrame image={product.image} alt={product.name} brandName={brandLabel(product.brand)} accentColor={color.foreground} sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 50vw, 33vw" className="collection-media aspect-[4/5] w-full rounded-[1.5rem] bg-transparent" imageClassName="object-cover transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                      <span className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-sm transition-colors group-hover:bg-slate-900 group-hover:text-white"><Eye size={17} aria-hidden="true" /></span>
                    </div>
                    <div className="pt-4">
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold text-slate-500">{brandLabel(product.brand)}</p>
                        {product.category && <p className="max-w-[60%] text-right text-xs leading-relaxed text-slate-500">{product.category.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')}</p>}
                      </div>
                      <h3 className="font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-[var(--brand-accent)]" style={{ '--brand-accent': color.foreground } as React.CSSProperties}>{product.name}</h3>
                      {product.tagline && <p className="mt-1 text-sm leading-relaxed text-slate-600">{product.tagline}</p>}
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Eye size={13} aria-hidden="true" /> View details</span>
                    </div>
                  </button>
                </article>
              )
            })}
            </div>
            <div aria-hidden="true" className="pointer-events-none collection-edge absolute left-0 top-0 h-full w-4 sm:w-6" />
            <div aria-hidden="true" className="pointer-events-none collection-edge absolute right-0 top-0 h-full w-4 sm:w-6" />
            <span className="sr-only" aria-live="polite">{isRailPaused || manuallyPaused ? 'Product movement paused' : 'Product movement resumes when the rail is not in use'}</span>
          </div>
        ) : (
          <div className="border-y border-slate-200 py-14 text-center">
            <h3 className="font-display text-xl font-bold text-slate-800">{activeBrandLabel ? `No ${activeBrandLabel} products are published yet` : 'No products are available yet'}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">There are no published products in this collection right now.</p>
          </div>
        )}
      </div>
      <ProductQuickViewModal product={activeModalProduct} isOpen={Boolean(activeModalProduct)} onClose={closeModal} instant={keyboardModal} onPrevious={filteredProducts.length > 1 ? previousProduct : undefined} onNext={filteredProducts.length > 1 ? nextProduct : undefined} position={activeProductIndex + 1} total={filteredProducts.length} />
    </section>
  )
}
