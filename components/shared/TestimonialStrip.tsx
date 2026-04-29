import React from 'react'
import { Quote, Star } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Bangalore",
    text: "Juicera's Elixir is my go-to post-workout drink. The ginger and lemon kick is exactly what I need to refresh.",
    rating: 5
  },
  {
    name: "Priya V.",
    location: "Mumbai",
    text: "Fuzzy is the perfect alternative to sugary sodas. It feels light and actually tastes like real fruit because it IS real fruit!",
    rating: 5
  },
  {
    name: "Anand K.",
    location: "Chennai",
    text: "Refrizz brings back childhood memories of goli soda but with a premium twist. Clean, fizzy, and fun.",
    rating: 5
  }
]

export function TestimonialStrip() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionHeader 
          label="Testimonials"
          title="What Our Drinkers Say"
          subtitle="Real stories from people who have made the switch to Fresh 360."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col space-y-6 hover:shadow-md transition-shadow">
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-4 -left-2 text-slate-100" size={48} />
                <p className="relative z-10 text-slate-600 italic leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-slate-400 text-xs">{t.location}</p>
                </div>
                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
