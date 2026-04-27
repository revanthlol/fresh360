import Link from 'next/link'
import { Metadata } from 'next'
import { Heart, ShieldCheck, Target, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Our Story | Fresh 360 Degrees Foods',
  description: 'Learn about the journey of Fresh 360 Degrees Foods LLP and our commitment to bringing you the purest cold-pressed beverages.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Story Hero */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[var(--color-juicera)] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Our Story</span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 font-[family-name:var(--font-heading)] text-slate-900 leading-tight">
                Crafting <span className="italic text-slate-400">Purity</span> in Every Bottle
              </h1>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Fresh 360 Degrees Foods LLP was born out of a simple realization: the beverages we consume daily are often stripped of their natural goodness through heat pasteurization and artificial additives.
                </p>
                <p>
                  We decided to change that. By bringing together traditional methods and modern cold-press technology, we created a system that preserves 100% of the nutrients, flavors, and life found in nature&apos;s bounty.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-[64px] bg-slate-100 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-juicera)]/20 to-transparent z-10" />
              <div className="flex items-center justify-center h-full text-9xl">🥭</div>
              <div className="absolute bottom-12 left-12 right-12 bg-white/80 backdrop-blur-md p-8 rounded-3xl z-20 border border-white/40">
                <p className="text-slate-900 font-bold text-xl mb-1">Founded in Hyderabad</p>
                <p className="text-slate-600">Committed to local farmers and sustainable sourcing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-heading)]">The Pillars of Fresh 360</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Our commitment to quality isn&apos;t just a promise; it&apos;s the foundation of everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Zero Additives', desc: 'No sugar, no water, no preservatives. Just 100% pure nature.' },
              { icon: ShieldCheck, title: 'Cold-Pressed', desc: 'No heat involved. We keep the enzymes alive and the vitamins intact.' },
              { icon: Target, title: 'Precision Sourcing', desc: 'We hand-pick the finest produce from verified sustainable farms.' },
              { icon: Zap, title: 'Fresh Daily', desc: 'Small batch production to ensure you get the freshest bottle possible.' }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-[var(--color-juicera)]">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-heading)]">One Vision, Three Flavors</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Across our three distinct brands, we maintain the same uncompromising standard of excellence.
            </p>
          </div>

          <div className="space-y-12">
            {[
              { brand: 'Juicera', color: 'var(--color-juicera)', desc: 'The purist choice. 100% cold-pressed fruit and vegetable juices designed for health and vitality.' },
              { brand: 'Fuzzy', color: 'var(--color-fuzzy)', desc: 'Innovation meets tradition. Carbonated cold-pressed beverages that bring a healthy fizz to your life.' },
              { brand: 'Refrizz', color: 'var(--color-refrizz)', desc: 'A nostalgic tribute. Reimagining the classic Goli Soda with premium ingredients and natural flavors.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-[32px] border border-slate-100 bg-slate-50/30">
                <div 
                  className="w-full md:w-48 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.brand}
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-heading)]">Join the Fresh Revolution</h2>
          <p className="text-xl text-slate-400 mb-12">
            Experience the difference that true purity makes. Your journey to a healthier lifestyle starts with a single sip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-[var(--color-juicera)] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-[var(--color-juicera)]/20"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
