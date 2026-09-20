'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RotateCcw, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error('Fresh 360 Application Error:', error)
  }, [error])

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full mx-auto text-center">
        {/* Brand Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Logo size="md" variant="light" />
          </Link>
        </div>

        {/* Error Card */}
        <div className="bg-white/85 backdrop-blur-2xl border border-white/80 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-emerald-950/[0.06]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Unexpected Recipe Glitch</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-3">
            Something Went Off-Blend
          </h1>

          {/* Explanation */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
            We ran into an unexpected hiccup while serving this page. Don&apos;t worry—our freshest ingredients are still intact.
          </p>

          {/* Digest or details in development */}
          {error?.digest && (
            <div className="mb-6 p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-mono text-[11px] max-w-sm mx-auto truncate">
              Reference ID: {error.digest}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {/* Try again */}
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand-green hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-brand-green/25 hover:shadow-xl hover:shadow-brand-green/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            {/* Redirect button to Home */}
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-sm border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Return to Homepage</span>
            </Link>
          </div>

          {/* Quick Help */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
            Need urgent assistance?{' '}
            <a
              href="https://wa.me/919705522020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green font-bold hover:underline"
            >
              Chat with our team on WhatsApp →
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Fresh 360</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
