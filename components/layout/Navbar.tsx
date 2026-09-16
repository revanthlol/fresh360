"use client"

import React, { useState, useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Menu, 
  X, 
  MessageCircle, 
  Home, 
  Info, 
  Sparkles, 
  Package, 
  RefreshCw, 
  Mail,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/shared/Logo'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const defaultNavLinks: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Process', href: '/process', icon: RefreshCw },
  { name: 'Contact', href: '/contact', icon: Mail },
]

const singlePageNavLinks: NavItem[] = [
  { name: 'Home', href: '#top', icon: Home },
  { name: 'About', href: '#about', icon: Info },
  { name: 'Brands', href: '#brands', icon: Sparkles },
  { name: 'Products', href: '#products', icon: Package },
  { name: 'Process', href: '#process', icon: RefreshCw },
  { name: 'Contact', href: '#contact', icon: Mail },
]

const brandLinks = [
  { name: 'Juicera', href: '/brands/juicera', tone: 'text-brand-green' },
  { name: 'Fruizy', href: '/brands/fruizy', tone: 'text-brand-teal' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('#top')
  const pathname = usePathname()
  const router = useRouter()
  const isSinglePage = process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true'
  const navLinks = isSinglePage ? singlePageNavLinks : defaultNavLinks

  const getScrollSnapshot = () => (typeof window === 'undefined' ? false : window.scrollY > 20)
  const isScrolled = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {}
      window.addEventListener('scroll', onStoreChange, { passive: true })
      return () => window.removeEventListener('scroll', onStoreChange)
    },
    getScrollSnapshot,
    () => false
  )

  // Track active section for single-page scrolling
  useEffect(() => {
    if (!isSinglePage) return

    const sectionIds = ['contact', 'process', 'products', 'brands', 'about', 'top']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      if (window.scrollY < 120) {
        setActiveSection('#top')
        return
      }

      for (const id of sectionIds) {
        if (id === 'top') continue
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${id}`)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSinglePage])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('#')) {
      setActiveSection(href)
      const id = href.substring(1)
      if (id === 'top' || !id) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      return
    }

    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
      router.push(href)
    }
  }

  const checkIsActive = (href: string) => {
    if (isSinglePage) {
      return activeSection === href
    }
    return pathname === href
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1500] flex justify-center p-3 sm:p-4 pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', damping: 22 }}
          className={cn(
            "pointer-events-auto relative flex items-center justify-between w-full max-w-5xl px-3.5 sm:px-5 py-2 sm:py-2.5",
            "rounded-2xl transition-all duration-500 ease-out",
            isScrolled
              ? "bg-white/80 backdrop-blur-2xl [backdrop-filter:blur(24px)_saturate(160%)] border border-slate-200/80 shadow-2xl shadow-emerald-950/[0.08]"
              : "bg-white/45 backdrop-blur-xl [backdrop-filter:blur(16px)_saturate(130%)] border border-white/70 shadow-lg shadow-black/[0.02] hover:bg-white/60"
          )}
        >
          {/* Left: Logo */}
          <button
            onClick={() => handleNavClick(isSinglePage ? '#top' : '/')}
            className="flex items-center cursor-pointer group shrink-0"
            aria-label="Fresh 360 Degrees Foods"
          >
            <Logo size="sm" variant="light" />
          </button>

          {/* Center: Desktop Segmented Control Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/[0.04] p-1 rounded-xl border border-slate-900/[0.05] relative">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link.href)
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 z-10 cursor-pointer",
                    isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-white rounded-lg border border-slate-200/90 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              )
            })}

            {!isSinglePage && (
              <div className="group relative">
                <Link
                  href="/products"
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 z-10 inline-flex items-center",
                    pathname.startsWith('/products') || pathname.startsWith('/brands')
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {(pathname.startsWith('/products') || pathname.startsWith('/brands')) && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-white rounded-lg border border-slate-200/90 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">Products</span>
                </Link>

                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-2xl backdrop-blur-2xl">
                    {brandLinks.map((brand) => (
                      <Link
                        key={brand.href}
                        href={brand.href}
                        className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-50"
                      >
                        <span>{brand.name}</span>
                        <span className={cn("text-[9px] uppercase tracking-[0.25em]", brand.tone)}>{brand.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="https://wa.me/919705522020"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl",
                "bg-brand-green text-white hover:bg-brand-green/90",
                "shadow-md shadow-brand-green/25 hover:shadow-lg hover:shadow-brand-green/35",
                "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <MessageCircle size={15} />
              <span>Chat Now</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden rounded-xl border border-slate-200/80 bg-white/60 text-slate-800 hover:bg-white hover:text-brand-green transition-colors cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay (LePrint inspired) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-md md:hidden"
              aria-hidden="true"
            />

            {/* Floating Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-20 z-40 bg-white/90 backdrop-blur-3xl [backdrop-filter:blur(24px)_saturate(160%)] border border-white/80 rounded-3xl p-5 shadow-2xl shadow-slate-900/25 md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = checkIsActive(link.href)
                  const Icon = link.icon
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-2xl transition-all group text-left cursor-pointer",
                        isActive
                          ? "bg-emerald-500/10 border border-brand-green/20 text-slate-900"
                          : "hover:bg-slate-900/[0.04] text-slate-700 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                            isActive
                              ? "bg-brand-green text-white shadow-sm"
                              : "bg-slate-100 text-slate-500 group-hover:text-slate-900"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={cn("text-sm font-bold", isActive ? "text-slate-900" : "text-slate-700")}>
                          {link.name}
                        </span>
                      </div>
                      <ChevronRight className={cn("w-4 h-4 transition-transform", isActive ? "text-brand-green" : "text-slate-400 group-hover:translate-x-0.5")} />
                    </button>
                  )
                })}

                {!isSinglePage && (
                  <div className="mt-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-2">
                    <p className="px-3 pb-1.5 pt-1 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Brands</p>
                    <Link
                      href="/products"
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-white"
                    >
                      All Products
                    </Link>
                    {brandLinks.map((brand) => (
                      <Link
                        key={brand.href}
                        href={brand.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-white"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200/60 mt-1">
                  <Link
                    href="https://wa.me/919705522020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-brand-green to-emerald-600 text-white shadow-lg shadow-brand-green/25 hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle size={18} />
                    <span>Chat on WhatsApp</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
