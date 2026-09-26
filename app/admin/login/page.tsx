import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Clock } from 'lucide-react'
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

function FormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-1.5">
        <div className="h-3 w-16 bg-slate-200 rounded" />
        <div className="h-11 w-full bg-slate-100 rounded-xl" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-16 bg-slate-200 rounded" />
        <div className="h-11 w-full bg-slate-100 rounded-xl" />
      </div>
      <div className="h-11 w-full bg-slate-200 rounded-xl mt-2" />
    </div>
  )
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; reason?: string }>
}) {
  const resolvedParams = await searchParams
  const redirectParam = resolvedParams?.redirect || '/admin'
  const isExpired = resolvedParams?.reason === 'expired'

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
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-950/[0.08]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-display text-slate-900">
              Admin Login
            </h1>
          </div>

          {isExpired && (
            <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200">
              <Clock className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Your session timed out for security. Please sign in again.</span>
            </div>
          )}

          <Suspense fallback={<FormSkeleton />}>
            <AdminLoginForm redirectTo={redirectParam} />
          </Suspense>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center text-xs text-slate-600">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-brand-green font-semibold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
