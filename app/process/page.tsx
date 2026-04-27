import { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, ThermometerSnowflake, Leaf, FlaskConical, Truck, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Process | How We Make Cold-Pressed Juice | Fresh 360',
  description: 'Discover the meticulous 6-step cold-pressing process that ensures Fresh 360 beverages are the purest and most nutritious on the market.',
}

export default function ProcessPage() {
  const steps = [
    {
      icon: Leaf,
      title: 'Ethical Sourcing',
      desc: 'We hand-pick only the finest, export-quality produce from our network of verified local farms in Hyderabad and beyond.',
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      icon: Droplets,
      title: 'Hygienic Cleaning',
      desc: 'Every piece of fruit and vegetable undergoes a multi-stage ozone wash to remove contaminants while preserving natural integrity.',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: ThermometerSnowflake,
      title: 'Hydraulic Cold-Press',
      desc: 'Using thousands of pounds of pressure, we extract every drop without generating heat, keeping enzymes and vitamins alive.',
      color: 'text-[var(--color-juicera)]',
      bg: 'bg-[#F0F7F0]'
    },
    {
      icon: FlaskConical,
      title: 'Zero Additives',
      desc: 'No water, no sugar, no preservatives. The juice is immediately bottled in a climate-controlled environment.',
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: CheckCircle,
      title: 'Quality Seal',
      desc: 'Each batch is tested for brix levels and purity before receiving the Fresh 360 seal of excellence.',
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      icon: Truck,
      title: 'Cold-Chain Delivery',
      desc: 'Our refrigerated vehicles ensure the juice stays at exactly 4°C from our facility to your doorstep.',
      color: 'text-slate-900',
      bg: 'bg-slate-100'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-[var(--color-juicera)] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">The Cold-Press Advantage</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-[family-name:var(--font-heading)] text-slate-900">
            From Farm to Bottle, <br className="hidden md:block" /> 
            <span className="text-slate-400 italic">No Compromises.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Unlike standard centrifugal juicing that uses heat and high-speed blades, our cold-press technology preserves the cellular structure of the plant, delivering maximum nutrition.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative">
            {/* Vertical Line for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2" />
            
            <div className="space-y-24">
              {steps.map((step, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${step.bg} ${step.color} mb-8 shadow-sm border border-slate-100`}>
                      <step.icon className="w-10 h-10" />
                    </div>
                    <div className="flex items-center justify-center lg:justify-start mb-4 space-x-4">
                      <span className="text-4xl font-black text-slate-100 font-[family-name:var(--font-heading)]">0{i + 1}</span>
                      <h2 className="text-3xl font-bold text-slate-900 font-[family-name:var(--font-heading)]">{step.title}</h2>
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {step.desc}
                    </p>
                  </div>

                  {/* Visual Placeholder */}
                  <div className="flex-1 w-full max-w-md">
                    <div className="aspect-video lg:aspect-square bg-slate-50 rounded-[48px] border-4 border-white shadow-2xl relative overflow-hidden flex items-center justify-center">
                       <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-transparent" />
                       <span className="text-6xl">{i === 0 ? '🚜' : i === 1 ? '🧼' : i === 2 ? '⚙️' : i === 3 ? '🧪' : i === 4 ? '🏷️' : '🚚'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 font-[family-name:var(--font-heading)]">Cold-Pressed vs. <br />Standard Juicing</h2>
              <div className="space-y-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-[var(--color-juicera)] mb-2 uppercase text-xs tracking-widest">Our Cold-Pressed Way</h4>
                  <p className="text-slate-300">Preserves 100% of minerals and enzymes. No heat. No oxidation. Lasts up to 5 days with full nutrition.</p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 opacity-50">
                  <h4 className="font-bold text-slate-400 mb-2 uppercase text-xs tracking-widest">The Standard Way</h4>
                  <p className="text-slate-500">Fast-spinning blades create heat, destroying vitamins instantly. High oxidation. Loses most nutrition within minutes.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-[40px] border border-white/10 overflow-hidden flex items-center justify-center p-12">
               <div className="absolute inset-0 bg-[var(--color-juicera)] opacity-5 blur-[100px]" />
               <div className="text-center relative z-10">
                  <div className="text-8xl mb-6">🧬</div>
                  <h3 className="text-2xl font-bold mb-4">Bio-Availability</h3>
                  <p className="text-slate-400">Because our juice is pressed without heat, your body can absorb the nutrients almost immediately, providing a natural energy boost that lasts.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8 font-[family-name:var(--font-heading)]">Taste the Difference</h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Now that you know how we make it, experience the result of our obsession with quality.
          </p>
          <Link 
            href="/products"
            className="inline-flex items-center bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
          >
            Order Your Cold-Pressed Juice
          </Link>
        </div>
      </section>
    </div>
  )
}
