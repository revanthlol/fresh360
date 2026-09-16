"use client"

import React, { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/shared/Logo'

const defaultNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Process', href: '/process' },
  { name: 'Contact', href: '/contact' },
]

const singlePageNavLinks = [
  { name: 'Home', href: '#top' },
  { name: 'About', href: '#about' },
  { name: 'Brands', href: '#brands' },
  { name: 'Products', href: '#products' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
]

const brandLinks = [
  { name: 'Juicera', href: '/brands/juicera', tone: 'text-brand-green' },
  { name: 'Fruizy', href: '/brands/fruizy', tone: 'text-brand-teal' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isSinglePage = process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true'
  const navLinks = isSinglePage ? singlePageNavLinks : defaultNavLinks

  const getScrollSnapshot = () => (typeof window === 'undefined' ? false : window.scrollY > 20)
  const scrolled = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {}
      window.addEventListener('scroll', onStoreChange, { passive: true })
      return () => window.removeEventListener('scroll', onStoreChange)
    },
    getScrollSnapshot,
    () => false
  )

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('#')) {
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

    // Always scroll to top when navigating
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
      router.push(href)
    }
  }

  return (
    <>
      <header
        suppressHydrationWarning
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-5 transition-all duration-300 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto relative">
          <nav
            aria-label="Main Navigation"
            className={cn(
              "relative rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto",
              "flex items-center justify-between px-4 sm:px-6 md:px-7 py-2.5 sm:py-3",
              // Premium Frosted Glass Effect
              scrolled
                ? "bg-white/85 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.12),0_1px_3px_0_rgba(0,0,0,0.04)] border border-white/80 ring-1 ring-slate-900/[0.05]"
                : "bg-white/65 backdrop-blur-xl backdrop-saturate-125 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.06)] border border-white/75 hover:bg-white/75 ring-1 ring-white/50"
            )}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick(isSinglePage ? '#top' : '/')}
              className="flex items-center cursor-pointer group shrink-0"
              aria-label="Fresh 360 Home"
            >
              <Logo size="md" variant="light" />
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "relative text-sm font-semibold px-3.5 py-1.5 rounded-full cursor-pointer",
                    "transition-all duration-200",
                    pathname === link.href
                      ? "text-brand-green bg-emerald-500/10"
                      : "text-slate-700 hover:text-brand-green hover:bg-slate-900/[0.04]"
                  )}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-brand-green rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              ))}

              {!isSinglePage && (
                <div className="group relative">
                  <Link
                    href="/products"
                    className={cn(
                      "relative text-sm font-semibold px-3.5 py-1.5 rounded-full cursor-pointer inline-flex items-center",
                      "transition-all duration-200",
                      pathname.startsWith('/products') || pathname.startsWith('/brands')
                        ? "text-brand-green bg-emerald-500/10"
                        : "text-slate-700 hover:text-brand-green hover:bg-slate-900/[0.04]"
                    )}
                  >
                    Products
                    {(pathname.startsWith('/products') || pathname.startsWith('/brands')) && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute bottom-1 left-3 right-3 h-0.5 bg-brand-green rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>

                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-[1.25rem] border border-white/80 bg-white/95 p-1.5 shadow-[0_20px_50px_-22px_rgba(15,23,42,0.22)] backdrop-blur-2xl ring-1 ring-slate-900/[0.05]">
                      {brandLinks.map((brand) => (
                        <Link
                          key={brand.href}
                          href={brand.href}
                          className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                        >
                          <span>{brand.name}</span>
                          <span className={cn("text-[10px] uppercase tracking-[0.28em]", brand.tone)}>{brand.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pl-2">
                <Link
                  href="https://wa.me/919705522020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "bg-gradient-to-r from-brand-green to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-bold",
                    "flex items-center gap-2 shadow-md shadow-brand-green/20",
                    "transition-all duration-200 hover:shadow-lg hover:shadow-brand-green/30 hover:scale-[1.03] active:scale-[0.97]"
                  )}
                >
                  <MessageCircle size={16} />
                  Chat Now
                </Link>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-full text-slate-800 hover:bg-black/5 transition-colors duration-150 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>

          {/* Floating Mobile Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto absolute top-full left-0 right-0 mt-2.5 bg-white/95 backdrop-blur-2xl backdrop-saturate-150 border border-white/80 rounded-3xl p-4 flex flex-col gap-1 md:hidden shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.05]"
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.16, ease: "easeOut" }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "w-full text-left text-base font-medium px-4 py-3 rounded-2xl transition-colors duration-150 cursor-pointer",
                        pathname === link.href
                          ? "text-brand-green bg-emerald-50 font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-brand-green"
                      )}
                    >
                      {link.name}
                    </button>
                  </motion.div>
                ))}

                {!isSinglePage && (
                  <div className="mt-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-2">
                    <p className="px-3 pb-2 pt-1 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Brands</p>
                    <Link
                      href="/products"
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
                    >
                      All Products
                    </Link>
                    {brandLinks.map((brand) => (
                      <Link
                        key={brand.href}
                        href={brand.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.04, duration: 0.16 }}
                  className="mt-2 pb-1"
                >
                  <Link
                    href="https://wa.me/919705522020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-brand-green to-emerald-600 text-white px-4 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-green/20 transition-all active:scale-[0.98]"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Full-screen backdrop — tapping anywhere outside closes the menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[3px] md:hidden"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
