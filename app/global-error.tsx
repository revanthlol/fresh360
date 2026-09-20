'use client'

import React from 'react'
import Link from 'next/link'
import { RotateCcw, Home } from 'lucide-react'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-[#eff7ef] text-slate-900 min-h-screen flex items-center justify-center p-6 font-sans antialiased">
        <div className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 text-2xl font-black">
            360
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Something Went Wrong
          </h1>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            A critical error occurred while loading the application shell.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2D6A2D] text-white text-sm font-bold shadow-md hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-800 text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Go to Home</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
