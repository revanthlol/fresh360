import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Leaf, ShieldCheck, Droplets, Heart, PlayCircle, ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import { Product } from '@/lib/types'
import ScrollReveal from '@/components/shared/ScrollReveal'

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* SECTION 1: Hero */}
      <section className="relative min-h-screen flex items-center pt-[120px] pb-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="flex flex-col space-y-8 max-w-xl">
            <div>
              <span className="inline-block text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--color-amber)] font-[family-name:var(--font-dm-sans)] mb-4">
                Premium Cold Pressed Beverages
              </span>
              <h1 className="text-[48px] md:text-[72px] font-bold text-[var(--color-slate)] font-[family-name:var(--font-playfair)] leading-[1.1] whitespace-pre-line">
                Taste the{"\n"}Freshness.
              </h1>
              <p className="mt-6 text-[18px] text-[var(--color-muted)] font-[family-name:var(--font-dm-sans)] leading-relaxed max-w-[480px]">
                Three brands. One promise. No compromises on quality, freshness, or your health.
              </p>
            </div>

            {/* Brand Pills */}
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/brands/juicera"
                className="px-4 py-1.5 rounded-[20px] text-[14px] font-semibold transition-all hover:scale-105 border border-[#B6E2B6] bg-[var(--color-juicera-light)] text-[var(--color-juicera)]"
              >
                Juicera
              </Link>
              <Link 
                href="/brands/fuzzy"
                className="px-4 py-1.5 rounded-[20px] text-[14px] font-semibold transition-all hover:scale-105 border border-[#99F6E4] bg-[var(--color-fuzzy-light)] text-[var(--color-fuzzy)]"
              >
                Fuzzy
              </Link>
              <Link 
                href="/brands/refrizz"
                className="px-4 py-1.5 rounded-[20px] text-[14px] font-semibold transition-all hover:scale-105 border border-[#FDBA74] bg-[var(--color-refrizz-light)] text-[var(--color-refrizz)]"
              >
                Refrizz
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/products"
                className="bg-[var(--color-juicera)] text-white font-semibold px-8 py-4 rounded-[8px] hover:opacity-90 transition-opacity text-center"
              >
                Explore Products
              </Link>
              <Link
                href="https://wa.me/919110328633?text=Hi%2C%20I%27m%20interested%20in%20Fresh%20360%20products"
                target="_blank"
                className="border-2 border-[#25D366] text-[#25D366] font-semibold px-8 py-3.5 rounded-[8px] hover:bg-[#25D366] hover:text-white transition-all text-center"
              >
                WhatsApp Us
              </Link>
            </div>

            {/* USP Strip */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-3 pt-4">
              {[
                "No Preservatives",
                "No Added Sugar",
                "Cold Pressed",
                "Farm Sourced"
              ].map((usp) => (
                <div key={usp} className="flex items-center space-x-2 text-[13px] text-[var(--color-muted)] font-[family-name:var(--font-dm-sans)]">
                  <CheckCircle className="w-3.5 h-3.5 text-[var(--color-juicera)]" />
                  <span>{usp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Visual */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 bg-radial-gradient from-[var(--color-juicera-light)] to-transparent opacity-50 pointer-events-none" />
            
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              {/* Card 2 (Left, behind) */}
              <div className="absolute left-[10%] -rotate-[8deg] z-10 w-[140px] h-[200px] bg-[var(--color-fuzzy)] rounded-[16px] shadow-xl flex items-center justify-center p-4">
                <span className="text-white font-[family-name:var(--font-playfair)] text-lg text-center">Elixir Fizz</span>
              </div>
              
              {/* Card 3 (Right, behind) */}
              <div className="absolute right-[10%] rotate-[8deg] z-10 w-[140px] h-[200px] bg-[var(--color-refrizz)] rounded-[16px] shadow-xl flex items-center justify-center p-4 text-center">
                <span className="text-white font-[family-name:var(--font-playfair)] text-lg">Jeera Soda</span>
              </div>

              {/* Card 1 (Front, Center) */}
              <div className="relative z-20 w-[160px] h-[220px] bg-[var(--color-juicera)] rounded-[16px] shadow-2xl flex items-center justify-center p-4">
                <span className="text-white font-[family-name:var(--font-playfair)] text-2xl">Elixir</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Brand Overview Strip */}
      <section className="bg-[var(--color-slate)] py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <ScrollReveal direction="up" className="flex flex-col items-center">
            <h2 className="text-[36px] font-bold text-white text-center font-[family-name:var(--font-playfair)]">
              Three Brands. One Family.
            </h2>
            <p className="mt-4 text-[16px] text-[#94A3B8] text-center max-w-2xl mb-12">
              Each crafted for a different moment, all made with the same obsession for quality.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { 
                name: 'Juicera', 
                slug: 'juicera', 
                color: '#2D6A2D', 
                tagline: '100% Cold Pressed. Nothing Added. Nothing Removed.' 
              },
              { 
                name: 'Fuzzy', 
                slug: 'fuzzy', 
                color: '#0F766E', 
                tagline: 'Cold Pressed Freshness. Now With a Fizz.' 
              },
              { 
                name: 'Refrizz', 
                slug: 'refrizz', 
                color: '#C2410C', 
                tagline: 'Bold Flavours. Big Fizz. Real Fun.' 
              }
            ].map((brand) => (
              <Link 
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group p-8 bg-[#263244] rounded-[16px] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand)]"
                style={{ '--color-brand': brand.color } as React.CSSProperties}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: brand.color }}
                  />
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
                    {brand.name}
                  </h3>
                </div>
                <p className="text-[14px] text-[#94A3B8] leading-relaxed mb-8 h-10">
                  {brand.tagline}
                </p>
                <div 
                  className="flex items-center text-[14px] font-semibold transition-colors"
                  style={{ color: brand.color }}
                >
                  Explore <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Featured Products */}
      <section className="bg-[#FAFAFA] py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[var(--color-amber)] tracking-[0.2em] uppercase mb-3">
                Our Products
              </span>
              <h2 className="text-[40px] font-bold text-[var(--color-slate)] leading-tight">
                Handpicked Favourites
              </h2>
              <p className="mt-4 text-[16px] text-[var(--color-muted)]">
                A selection from across our three brands.
              </p>
            </div>
            <Link 
              href="/products"
              className="flex items-center text-[15px] font-semibold text-[var(--color-juicera)] hover:underline"
            >
              View All Products <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product: Product) => {
              const brandId = product.brand?.id?.current || 'juicera'
              const brandColorLight = `var(--color-${brandId}-light)`
              const brandColorMain = `var(--color-${brandId})`
              const hasImage = product.image?.asset?._ref && product.image.asset._ref !== ''

              return (
                <Link 
                  key={product._id}
                  href={`/products/${product.slug.current}`}
                  className="group bg-white rounded-[12px] border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 product-card-hover"
                >
                  <div 
                    className="relative h-[200px] flex items-center justify-center p-6"
                    style={{ backgroundColor: brandColorLight }}
                  >
                    {hasImage ? (
                      <Image
                        src={urlFor(product.image).url()}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-[var(--color-slate)] font-[family-name:var(--font-playfair)] text-xl text-center opacity-40">
                        {product.name}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-[12px] text-[10px] font-bold uppercase tracking-wider mb-3"
                      style={{ backgroundColor: brandColorLight, color: brandColorMain }}
                    >
                      {product.brand?.name || 'Brand'}
                    </span>
                    <h3 className="text-[18px] font-bold text-[var(--color-slate)] font-[family-name:var(--font-playfair)] mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[13px] text-[var(--color-muted)] line-clamp-2 h-10">
                      {product.tagline}
                    </p>
                    <div className="mt-4 text-[13px] font-bold" style={{ color: brandColorMain }}>
                      View Details →
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose Us */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up" className="text-center mb-16">
            <span className="text-[12px] font-bold text-[var(--color-amber)] tracking-[0.2em] uppercase mb-3">
              Why Fresh 360
            </span>
            <h2 className="text-[40px] font-bold text-[var(--color-slate)]">
              Obsessed With Freshness
            </h2>
            <p className="mt-4 text-[16px] text-[var(--color-muted)]">
              Every bottle is a commitment to quality you can taste.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { 
                icon: Leaf, 
                title: 'Cold Pressed Process', 
                desc: 'Hydraulic cold press extracts juice without heat, preserving every enzyme and nutrient.' 
              },
              { 
                icon: ShieldCheck, 
                title: 'Zero Additives', 
                desc: 'No preservatives, no stabilisers, no artificial flavours or colours. Ever.' 
              },
              { 
                icon: Droplets, 
                title: 'Farm Sourced', 
                desc: 'Ingredients handpicked from trusted growers. We know where every fruit comes from.' 
              },
              { 
                icon: Heart, 
                title: 'Made Fresh Daily', 
                desc: 'Small batches, maximum freshness. Your order is never sitting on a shelf for months.' 
              }
            ].map((usp, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <usp.icon className="w-8 h-8 text-[var(--color-juicera)]" />
                <h3 className="mt-4 text-[16px] font-bold text-[var(--color-slate)]">
                  {usp.title}
                </h3>
                <p className="mt-2 text-[14px] text-[var(--color-muted)] leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Process Teaser */}
      <section className="bg-[var(--color-juicera-light)] py-20 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[var(--color-amber)] tracking-[0.2em] uppercase mb-3">
              Our Process
            </span>
            <h2 className="text-[40px] font-bold text-[var(--color-slate)] leading-tight mb-8">
              From Farm to{"\n"}Your Doorstep
            </h2>
            
            <div className="space-y-8">
              {[
                { step: '01', title: 'Sourcing', desc: 'Handpicked fruits from trusted farms across India.' },
                { step: '02', title: 'Cold Pressing', desc: 'Hydraulic press at zero heat. Maximum nutrition retained.' },
                { step: '03', title: 'Bottling', desc: 'Glass bottles, sealed fresh within hours of pressing.' },
                { step: '04', title: 'Delivery', desc: 'Cold storage delivery by 8:30 AM at your doorstep.' }
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <span className="text-[12px] font-mono text-[var(--color-amber)] pt-1">{item.step}</span>
                  <div>
                    <h4 className="text-[15px] font-bold text-[var(--color-slate)] mb-1">{item.title}</h4>
                    <p className="text-[13px] text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/process"
              className="inline-block mt-10 px-6 py-3 border-2 border-[var(--color-juicera)] text-[var(--color-juicera)] font-semibold rounded-[8px] hover:bg-[var(--color-juicera)] hover:text-white transition-all w-fit"
            >
              See Full Process →
            </Link>
          </div>

          <div className="relative group cursor-pointer aspect-video bg-[var(--color-juicera)]/80 rounded-[16px] overflow-hidden flex flex-col items-center justify-center shadow-lg">
            <PlayCircle className="w-16 h-16 text-white mb-2 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-white font-medium text-[14px]">Watch Our Process</span>
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonials */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <span className="text-[12px] font-bold text-[var(--color-amber)] tracking-[0.2em] uppercase mb-3">
              What People Say
            </span>
            <h2 className="text-[40px] font-bold text-[var(--color-slate)]">
              Real People. Real Results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                text: "Switched to Juicera Elixir three months ago and my skin has genuinely transformed. The pomegranate juice is incredible.", 
                name: 'Priya S.', 
                loc: 'Hyderabad' 
              },
              { 
                text: "My kids love the Refresh Fizz. Finally a fizzy drink I don't feel guilty giving them.", 
                name: 'Arjun M.', 
                loc: 'Bangalore' 
              },
              { 
                text: "The Almond Crush is my morning ritual now. Best almond milk I've ever had, and I've tried them all.", 
                name: 'Sneha R.', 
                loc: 'Mumbai' 
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-white border border-[var(--color-border)] rounded-[12px] p-8 flex flex-col relative transition-shadow hover:shadow-lg">
                <span className="absolute top-4 left-6 text-[48px] font-bold text-[var(--color-juicera)] opacity-20 font-[family-name:var(--font-playfair)]">&quot;</span>
                <p className="text-[15px] text-[var(--color-slate)] italic leading-relaxed mb-8 z-10 pt-4">
                  {t.text}
                </p>
                <div className="flex items-center space-x-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-juicera-light)] flex items-center justify-center text-[var(--color-juicera)] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="text-[14px] font-bold text-[var(--color-slate)]">{t.name}</h5>
                    <p className="text-[12px] text-[var(--color-muted)]">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA Banner */}
      <section className="bg-[var(--color-slate)] py-20 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[40px] font-bold text-white font-[family-name:var(--font-playfair)] mb-4">
            Ready to Live Healthy?
          </h2>
          <p className="text-[16px] text-[#94A3B8] mb-10 max-w-lg mx-auto">
            Join thousands of customers who start their day with Fresh 360.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[var(--color-juicera)] text-white font-semibold px-10 py-4 rounded-[8px] hover:opacity-90 transition-opacity"
            >
              Explore Products
            </Link>
            <Link
              href="https://wa.me/919110328633?text=Hi%2C%20I%27m%20interested%20in%20Fresh%20360%20products"
              target="_blank"
              className="border-2 border-white text-white font-semibold px-10 py-3.5 rounded-[8px] hover:bg-white hover:text-[var(--color-slate)] transition-all"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
