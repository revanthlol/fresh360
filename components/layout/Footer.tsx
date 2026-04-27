import Link from 'next/link'

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const footerLinks = {
  brands: [
    { name: 'Juicera', href: '/brands/juicera', color: '#2D6A2D' },
    { name: 'Fuzzy', href: '/brands/fuzzy', color: '#0F766E' },
    { name: 'Refrizz', href: '/brands/refrizz', color: '#C2410C' },
  ],
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Our Process', href: '/process' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  socials: [
    { name: 'Instagram', href: '#', icon: InstagramIcon },
    { name: 'Facebook', href: '#', icon: FacebookIcon },
    { name: 'YouTube', href: '#', icon: YoutubeIcon },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="text-[18px] font-bold text-[var(--color-juicera)] font-[family-name:var(--font-heading)]">
                Fresh 360
              </Link>
              <p className="text-[14px] text-[var(--color-muted)] mt-2 italic font-medium">
                Taste the Freshness
              </p>
            </div>
            <div className="space-y-3 text-[14px] text-[var(--color-slate)]">
              <p className="flex flex-col">
                <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">WhatsApp</span>
                <Link href="tel:+919110328633" className="hover:text-[var(--color-juicera)] transition-colors">
                  +91 91103 28633
                </Link>
              </p>
              <p className="flex flex-col">
                <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">Email</span>
                <Link href="mailto:support@fresh360.com" className="hover:text-[var(--color-juicera)] transition-colors">
                  support@fresh360.com
                </Link>
              </p>
              <p className="flex flex-col">
                <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">Website</span>
                <Link href="https://www.fresh360.com" className="hover:text-[var(--color-juicera)] transition-colors">
                  www.fresh360.com
                </Link>
              </p>
            </div>
          </div>

          {/* Column 2: Our Brands */}
          <div className="space-y-6">
            <h3 className="font-bold text-[var(--color-slate)] text-sm uppercase tracking-widest">Our Brands</h3>
            <ul className="space-y-4">
              {footerLinks.brands.map((brand) => (
                <li key={brand.name}>
                  <Link 
                    href={brand.href}
                    className="group flex items-center space-x-3 text-[15px] text-[var(--color-muted)] hover:text-[var(--color-slate)] transition-colors"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: brand.color }}
                    />
                    <span>{brand.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-[var(--color-slate)] text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-[15px] text-[var(--color-muted)] hover:text-[var(--color-slate)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-6">
            <h3 className="font-bold text-[var(--color-slate)] text-sm uppercase tracking-widest">Follow Us</h3>
            <div className="flex items-center space-x-4">
              {footerLinks.socials.map((social) => (
                <Link 
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-juicera)] hover:border-[var(--color-juicera)] transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--color-muted)] text-center md:text-left">
            © 2025 Fresh 360 Degrees Foods LLP. All rights reserved.
          </p>
          <p className="text-[13px] text-[var(--color-muted)] flex items-center space-x-1">
            <span>Made with ❤️ in India</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
