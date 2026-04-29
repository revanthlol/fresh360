"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Process', href: '/process' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // ✅ Always start false (safe server default), sync on first client paint via useEffect
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll() // sync immediately on mount
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Always scroll to top when navigating
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      router.push(href)
    }
  }

  return (
    <>
      <nav
        suppressHydrationWarning
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6",
          "transition-[padding,background-color,backdrop-filter,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          mounted && scrolled
            ? "bg-white/80 backdrop-blur-xl py-3 shadow-sm shadow-black/5 border-b border-slate-100/80"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center cursor-pointer group"
          >
            <span className="font-display font-extrabold text-[1.35rem] tracking-tight leading-none text-slate-900 transition-opacity duration-200 group-hover:opacity-80">
              Fresh<span className="text-brand-green">360°</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "relative text-sm font-medium py-1 cursor-pointer",
                  "transition-colors duration-200 hover:text-brand-green",
                  pathname === link.href
                    ? "text-brand-green font-bold"
                    : "text-slate-600"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-green rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
            <Link
              href="https://wa.me/919110328633"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "bg-brand-green text-white px-5 py-2.5 rounded-full text-sm font-bold",
                "flex items-center gap-2",
                "transition-all duration-200 hover:bg-brand-green/90 hover:shadow-lg hover:scale-105 active:scale-95"
              )}
            >
              <MessageCircle size={16} />
              Chat Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-black/5 transition-colors duration-150 cursor-pointer"
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
        </div>

        {/* Mobile Dropdown — always has solid background regardless of page scroll */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex flex-col gap-1 md:hidden shadow-2xl shadow-black/10"
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
                      "w-full text-left text-base font-medium px-4 py-3 rounded-xl transition-colors duration-150 cursor-pointer",
                      pathname === link.href
                        ? "text-brand-green bg-brand-green-light font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-brand-green"
                    )}
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04 + 0.04, duration: 0.16 }}
                className="mt-2 pb-2"
              >
                <Link
                  href="https://wa.me/919110328633"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green text-white px-4 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-green/90 transition-colors active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Full-screen backdrop — tapping anywhere outside closes the menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
