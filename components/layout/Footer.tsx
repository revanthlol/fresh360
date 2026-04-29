"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleInternalLink = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      router.push(href)
    }
  }

  const socialLinks = [
    { 
      label: "Instagram", 
      href: "https://instagram.com/fresh360",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      )
    },
    { 
      label: "Facebook", 
      href: "https://facebook.com/fresh360",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      )
    },
    { 
      label: "Youtube", 
      href: "https://youtube.com/@fresh360",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 69.44 69.44 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 69.44 69.44 0 0 1-15 0 2 2 0 0 1-2-2z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
      )
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-8">
            <button onClick={() => handleInternalLink('/')} className="flex items-center group cursor-pointer">
              <span className="font-display font-extrabold text-2xl tracking-tight leading-none text-slate-900 transition-opacity duration-200 group-hover:opacity-80">
                Fresh<span className="text-brand-green">360°</span>
              </span>
            </button>
            <p className="text-slate-500 text-base leading-relaxed max-w-xs">
              Crafting nature&apos;s purest flavors into premium cold-pressed experiences. No preservatives, no added sugar—just 100% natural goodness delivered to your doorstep.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <Link 
                  key={i}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl hover:bg-brand-green hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-slate-900 mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-brand-green rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Our Story', href: '/about' },
                { name: 'The Process', href: '/process' },
                { name: 'Product List', href: '/products' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleInternalLink(link.href)}
                    className="text-slate-500 hover:text-brand-green transition-colors flex items-center group cursor-pointer"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-brand-green mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Brands */}
          <div>
            <h4 className="font-display font-bold text-lg text-slate-900 mb-8 relative inline-block">
              Our Brands
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-brand-teal rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Juicera (Cold Pressed)', href: '/brands/juicera' },
                { name: 'Fuzzy (Sparkling)', href: '/brands/fuzzy' },
                { name: 'Refrizz (Goli Soda)', href: '/brands/refrizz' },
              ].map((brand) => (
                <li key={brand.name}>
                  <button
                    onClick={() => handleInternalLink(brand.href)}
                    className="text-slate-500 hover:text-brand-teal transition-colors flex items-center group cursor-pointer"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-brand-teal mr-0 group-hover:mr-2 transition-all duration-300" />
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg text-slate-900 mb-8 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-brand-orange rounded-full" />
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl shrink-0 transition-colors group-hover:bg-brand-green group-hover:text-white shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Address</span>
                  <address className="text-slate-600 text-sm not-italic leading-relaxed">
                    #1- 21-223, West Venkata Puram,<br />
                    Tirumalagiri, Hyderabad, 500015
                  </address>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 text-brand-teal rounded-xl shrink-0 transition-colors group-hover:bg-brand-teal group-hover:text-white shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Call Us</span>
                  <a href="tel:+919391311652" className="text-slate-600 text-sm hover:text-brand-teal transition-colors">+91 93913 11652</a>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 transition-colors group-hover:bg-brand-orange group-hover:text-white shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</span>
                  <a href="mailto:support@fresh360degrees.in" className="text-slate-600 text-sm hover:text-brand-orange transition-colors">support@fresh360degrees.in</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Fresh 360 Degrees Foods LLP. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <Link href="/legal/privacy" className="hover:text-brand-green transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-brand-green transition-colors">Terms of Service</Link>
            <button 
              onClick={scrollToTop}
              className="hover:text-brand-green transition-colors flex items-center gap-2 group"
            >
              Back to Top
              <span className="group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
