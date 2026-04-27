'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Mail, MapPin, Zap, Sparkles, MessageSquare } from 'lucide-react'

const footerLinks = {
  brands: [
    { name: 'Juicera', href: '/brands/juicera' },
    { name: 'Fuzzy', href: '/brands/fuzzy' },
    { name: 'Refrizz', href: '/brands/refrizz' },
  ],
  explore: [
    { name: 'The Portfolio', href: '/products' },
    { name: 'Our Craft', href: '/process' },
    { name: 'The Story', href: '/about' },
    { name: 'Distribution', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Health Disclaimer', href: '/health' },
  ]
}

export default function Footer() {
  return (
    <footer className="relative bg-stone-950 text-stone-200 overflow-hidden pt-24 md:pt-40 selection:bg-amber-600 selection:text-stone-900 border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.015] pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
        <h2 className="text-[25vw] md:text-[20vw] font-black leading-none tracking-tighter uppercase whitespace-nowrap text-white">
          FRESH 360
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 md:mb-40"
        >
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 md:p-20 rounded-[50px] md:rounded-[80px] flex flex-col md:flex-row items-center justify-between gap-12 shadow-3xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-600/20 transition-colors duration-1000" />
            
            <div className="max-w-2xl text-center md:text-left relative z-10 space-y-6 md:space-y-8">
              <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-white/5 text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] border border-white/5 mx-auto md:mx-0">
                <Sparkles className="w-4 h-4" />
                <span>Stone & Gold Quality</span>
              </div>
              <h3 className="text-3xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase break-words">
                READY FOR A <br /> 
                <span className="text-amber-600 text-3xl sm:text-6xl md:text-8xl">360 CHANGE?</span>
              </h3>
              <p className="text-base md:text-2xl text-stone-500 font-black uppercase tracking-tighter leading-tight">
                Experience purity in every drop. Crafted for the conscious.
              </p>
            </div>
            
            <Link 
              href="/products"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-amber-600 text-stone-950 flex flex-col items-center justify-center font-black text-[8px] md:text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-110 hover:bg-white active:scale-95 transition-all duration-700 shrink-0 relative z-10"
            >
              <Zap className="w-6 h-6 md:w-10 md:h-10 mb-2 md:mb-3" />
              <span>Shop Now</span>
            </Link>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 pb-24 border-b border-white/5">
          
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
            <Link href="/" className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white">
              FRESH<span className="text-amber-600">360</span>
            </Link>
            <p className="text-lg text-stone-500 leading-snug font-black uppercase tracking-tight max-w-sm">
              The gold standard of cold-pressed purity. 360 degrees of refreshment, crafted for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Zap, href: '#' },
                { Icon: MessageSquare, href: '#' },
                { Icon: Sparkles, href: '#' }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all text-stone-500 hover:text-stone-950 group">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Series</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.brands.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base md:text-lg font-black text-stone-500 hover:text-white transition-colors uppercase tracking-tight flex items-center group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-amber-600 mr-0 group-hover:mr-3 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Explore</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base md:text-lg font-black text-stone-500 hover:text-white transition-colors uppercase tracking-tight flex items-center group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-amber-600 mr-0 group-hover:mr-3 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6 md:gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                <p className="text-xs md:text-sm font-black text-stone-500 uppercase leading-relaxed tracking-tight">
                  Banjara Hills, Hyderabad,<br />Telangana, India 500034
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs md:text-sm font-black text-stone-500 uppercase tracking-tight">hello@fresh360.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-700 text-center md:text-left">
            © 2025 Fresh 360 Degrees Foods LLP. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 md:space-x-8">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-widest text-stone-700 hover:text-amber-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
