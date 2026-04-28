'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { 
    name: 'Brands', 
    href: '#',
    dropdown: [
      { name: 'Juicera', href: '/brands/juicera', color: '#B45309' },
      { name: 'Fuzzy', href: '/brands/fuzzy', color: '#D97706' },
      { name: 'Refrizz', href: '/brands/refrizz', color: '#F59E0B' },
    ]
  },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Track whether we're mounted so createPortal works safely (SSR guard)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // The mobile overlay — rendered into <body> via portal so it is never
  // trapped inside the header's backdrop-filter stacking context.
  const mobileOverlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          // z-[200] > header z-50, fully covers viewport from body level
          className="fixed inset-0 z-[200] lg:hidden"
          style={{ backgroundColor: 'rgba(12,10,9,0.97)' }}
        >
          {/* Blurred amber glow in background */}
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-amber-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {/* Close button — top-right corner */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-4 text-white bg-stone-900 border border-white/10 rounded-2xl shadow-xl active:scale-90 transition-transform"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo top-left */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="absolute top-6 left-6 flex items-center"
          >
            <span className="text-2xl font-black tracking-tighter uppercase text-white">
              Fresh<span className="text-amber-600">360</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="h-full flex flex-col items-center justify-center px-6 text-center">
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                }
              }}
              className="flex flex-col space-y-2 w-full max-w-xs"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  <Link
                    href={link.href === '#' ? '/products' : link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-3xl sm:text-4xl font-black tracking-tighter uppercase block py-2 transition-colors duration-300',
                      pathname === (link.href === '#' ? '/products' : link.href)
                        ? 'text-amber-600'
                        : 'text-white hover:text-amber-500'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="pt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="px-10 py-5 bg-amber-600 text-stone-950 rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-[0_20px_50px_rgba(217,119,6,0.3)] inline-block hover:bg-white transition-colors duration-500"
                >
                  Start Refreshing
                </Link>
              </motion.div>
            </motion.nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out selection:bg-amber-600 selection:text-stone-900',
          scrolled
            ? 'py-4 bg-stone-950/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl'
            : 'py-10 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-black tracking-tighter uppercase text-white">
              Fresh<span className="text-amber-600 transition-colors group-hover:text-amber-500">360</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div className="flex items-center cursor-pointer space-x-2 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-white transition-all">
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-6 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="bg-stone-900 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden p-3 backdrop-blur-3xl">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center space-x-4 px-5 py-4 text-[11px] font-black text-stone-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all group/item uppercase tracking-widest"
                          >
                            <div
                              className="w-2 h-2 rounded-full shadow-lg transition-all group-hover/item:scale-150"
                              style={{ backgroundColor: subItem.color }}
                            />
                            <span className="group-hover/item:translate-x-1 transition-transform">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2',
                      pathname === link.href ? 'text-amber-600' : 'text-stone-400 hover:text-white'
                    )}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/contact"
              className="group relative px-8 py-3.5 bg-amber-600 text-stone-950 text-[10px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] active:scale-95"
            >
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </div>

          {/* Mobile hamburger — ONLY this stays in the header */}
          <button
            className="lg:hidden p-4 text-white bg-stone-900 border border-white/10 rounded-2xl shadow-xl transition-all active:scale-90"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Portal: renders overlay at <body> level, escaping header's stacking context */}
      {mounted && createPortal(mobileOverlay, document.body)}
    </>
  )
}
