import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Sparkles, Compass } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Organic background aura blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-[350px] h-[350px] bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full mx-auto text-center">
        {/* Brand Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105" aria-label="Fresh 360 Degrees Foods">
            <Logo size="md" variant="light" />
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white/80 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-emerald-950/[0.06]">

          {/* Large Numerals */}
          <h1 className="font-display font-extrabold text-7xl sm:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-brand-green via-brand-teal to-emerald-700 tracking-tight mb-4">
            404
          </h1>

          {/* Title */}
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
            Looks Like This Drop Spilled
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            The page you are looking for doesn&apos;t exist, has been relocated, or is currently enjoying a quick break in the shade.
          </p>

          {/* Primary Action Button (Redirect to Home) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand-green hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-brand-green/25 hover:shadow-xl hover:shadow-brand-green/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/#products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-sm border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-4 h-4 text-slate-500" />
              <span>Explore Products</span>
            </Link>
          </div>

          {/* Helpful Quick Links Footer */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span>Looking for something else?</span>
            <Link href="/#contact" className="text-brand-teal hover:underline font-bold">
              Contact Support →
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Fresh 360 Degrees</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
