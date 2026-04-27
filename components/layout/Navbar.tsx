'use client'

import { useState, useEffect } from 'react'
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
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => setIsOpen(false), 0)
      return () => clearTimeout(timeoutId)
    }
  }, [pathname, isOpen])

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out selection:bg-amber-600 selection:text-stone-900",
      scrolled 
        ? "py-4 bg-stone-950/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl" 
        : "py-10 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-[110] flex items-center space-x-2 group">
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
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-6 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="bg-stone-900 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden p-3 backdrop-blur-3xl">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-4 px-5 py-4 text-[11px] font-black text-stone-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all group/item uppercase tracking-widest"
                        >
                          <div 
                            className="w-2 h-2 rounded-full shadow-lg transition-all group-hover/item:scale-150 group-hover/item:shadow-amber-600/50" 
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
                    "text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2",
                    pathname === link.href ? "text-amber-600" : "text-stone-400 hover:text-white"
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

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden relative z-[110] p-4 text-white bg-stone-900 border border-white/10 rounded-2xl shadow-xl transition-all active:scale-90"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] lg:hidden bg-stone-950/98 backdrop-blur-3xl"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <motion.div 
              className="relative h-full flex flex-col items-center justify-center px-6 py-20 text-center"
            >
              <motion.nav 
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
                className="flex flex-col space-y-4 md:space-y-8 w-full max-w-sm"
              >
                {navLinks.map((link) => (
                  <motion.div 
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
                      show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    <Link
                      href={link.href === '#' ? '/products' : link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase transition-all block py-2",
                        pathname === link.href ? "text-amber-600 scale-110" : "text-white hover:text-amber-600 hover:scale-105 active:scale-95"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="pt-12 md:pt-20"
                >
                  <Link
                    href="/contact"
                    className="px-12 py-6 bg-amber-600 text-stone-950 rounded-full font-black uppercase tracking-[0.4em] text-[10px] md:text-xs shadow-[0_20px_50px_rgba(217,119,6,0.3)] block hover:bg-white hover:scale-105 transition-all duration-500"
                  >
                    Start Refreshing
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
