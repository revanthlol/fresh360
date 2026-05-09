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
    <footer className="bg-[#122412] border-t border-white/5 pt-24 pb-12 overflow-hidden relative text-white">
      {/* Decorative background elements - adjusted for dark theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-teal/10 rounded-full -ml-48 -mb-48 blur-[100px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-8">
            <button onClick={() => handleInternalLink('/')} className="flex items-center group cursor-pointer">
              <span className="font-display font-extrabold text-4xl tracking-tight leading-none text-white transition-opacity duration-200 group-hover:opacity-80">
                Fresh<span className="text-brand-green">360</span>
              </span>
            </button>
            <p className="text-white/50 text-base leading-relaxed max-w-xs">
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
                  className="w-10 h-10 flex items-center justify-center bg-white/5 text-white/70 rounded-xl hover:bg-brand-green hover:text-white transition-all duration-300 hover:-translate-y-1 border border-white/10 hover:border-brand-green/50"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-brand-green rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Our Story', href: '/about' },
                { name: 'The Process', href: '/process' },
                { name: 'Product List', href: '/products' },
                { name: 'Certifications', href: '/certifications' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleInternalLink(link.href)}
                    className="text-white/50 hover:text-brand-green transition-colors flex items-center group cursor-pointer"
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
            <h4 className="font-display font-bold text-lg text-white mb-8 relative inline-block">
              Our Brands
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-brand-teal rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Juicera (Pure Cold Pressed)', href: '/brands/juicera' },
                { name: 'Fuzzy (Goli Soda with Juice)', href: '/brands/fuzzy' },
              ].map((brand) => (
                <li key={brand.name}>
                  <button
                    onClick={() => handleInternalLink(brand.href)}
                    className="text-white/50 hover:text-brand-teal transition-colors flex items-center group cursor-pointer"
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
            <h4 className="font-display font-bold text-lg text-white mb-8 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-brand-orange rounded-full" />
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-brand-green rounded-xl shrink-0 transition-all group-hover:bg-brand-green group-hover:text-white border border-white/10 group-hover:border-brand-green/50">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white/30 uppercase tracking-wider mb-1">Address</span>
                  <address className="text-white/60 text-sm not-italic leading-relaxed">
                    #1- 21-223, West Venkata Puram, Road No. 9, Tirumalagiri,<br />
                    Secunderabad, Telangana-500015
                  </address>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-brand-teal rounded-xl shrink-0 transition-all group-hover:bg-brand-teal group-hover:text-white border border-white/10 group-hover:border-brand-teal/50">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white/30 uppercase tracking-wider mb-1">Call Us</span>
                  <a href="tel:+919705522020" className="text-white/60 text-sm hover:text-brand-teal transition-colors">+91 97055 22020</a>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-brand-orange rounded-xl shrink-0 transition-all group-hover:bg-brand-orange group-hover:text-white border border-white/10 group-hover:border-brand-orange/50">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white/30 uppercase tracking-wider mb-1">Email</span>
                  <a href="mailto:support@fresh360degrees.in" className="text-white/60 text-sm hover:text-brand-orange transition-colors">support@fresh360degrees.in</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Fresh 360 Degrees Foods LLP. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-white/30">
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
