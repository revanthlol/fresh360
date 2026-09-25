import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Home } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const resolvedParams = await searchParams
  const redirectParam = resolvedParams?.redirect || '/admin'

  return (
    <div className="min-h-screen bg-[#eff7ef] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105" aria-label="Fresh 360 Degrees Foods">
            <Logo size="md" variant="light" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Operational Console</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-950/[0.08]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-display text-slate-900">
              Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authenticate with your administrative credentials to access operations and Sanity Studio.
            </p>
          </div>

          <Suspense fallback={<div className="py-8 text-center text-xs text-slate-400">Loading form...</div>}>
            <AdminLoginForm redirectTo={redirectParam} />
          </Suspense>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>256-bit Session Security</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-green font-semibold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
