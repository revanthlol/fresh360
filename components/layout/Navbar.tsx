'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { 
    name: 'Brands', 
    href: '#',
    dropdown: [
      { name: 'Juicera', href: '/brands/juicera', color: '#2D6A2D' },
      { name: 'Fuzzy', href: '/brands/fuzzy', color: '#0F766E' },
      { name: 'Refrizz', href: '/brands/refrizz', color: '#C2410C' },
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

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setIsOpen(false)
  }, [pathname, isOpen])

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white border-b border-[var(--color-border)]",
      scrolled ? "shadow-sm py-3" : "py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-[20px] font-bold text-[var(--color-juicera)] font-[family-name:var(--font-heading)]">
            Fresh 360
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <div className="flex items-center cursor-pointer space-x-1 py-2 text-sm font-medium text-[var(--color-slate)] hover:text-[var(--color-juicera)] transition-colors">
                  <span>{link.name}</span>
                  <ChevronDown className="w-4 h-4" />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden py-2">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: subItem.color }}
                          />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[var(--color-juicera)]",
                    pathname === link.href ? "text-[var(--color-juicera)] font-semibold" : "text-[var(--color-slate)]"
                  )}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="https://wa.me/919110328633?text=Hi%2C%20I%27m%20interested%20in%20Fresh%20360%20products"
            target="_blank"
            className="bg-[#25D366] text-white text-[14px] font-medium px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity"
          >
            WhatsApp Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-[var(--color-slate)]"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "fixed inset-0 z-[100] lg:hidden transition-opacity duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={() => setIsOpen(false)}
        />
        
        {/* Drawer Content */}
        <div className={cn(
          "absolute top-0 right-0 h-full w-[280px] bg-white transition-transform duration-300 ease-in-out p-6 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold text-[var(--color-juicera)] font-[family-name:var(--font-heading)]">
              Fresh 360
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-[var(--color-slate)]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col">
                {link.dropdown ? (
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                      {link.name}
                    </span>
                    <div className="flex flex-col space-y-4 pl-2">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-3 text-[15px] text-[var(--color-slate)]"
                        >
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: subItem.color }}
                          />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[15px] transition-colors",
                      pathname === link.href ? "text-[var(--color-juicera)] font-semibold" : "text-[var(--color-slate)]"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Link
              href="https://wa.me/919110328633?text=Hi%2C%20I%27m%20interested%20in%20Fresh%20360%20products"
              target="_blank"
              className="w-full bg-[#25D366] text-white py-3 rounded-[8px] font-medium flex items-center justify-center"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
