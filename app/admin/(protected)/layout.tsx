import React from 'react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/admin-auth'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { SessionGuard } from '@/components/admin/SessionGuard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  if (!session.authenticated) {
    redirect('/admin/login?reason=expired')
  }

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-[#F8FAF8] text-slate-900 flex flex-col font-sans lg:overflow-hidden">
      <SessionGuard />
      <AdminHeader user={session.user || 'admin'} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col min-h-0 lg:overflow-hidden">
        {children}
      </main>
    </div>
  )
}
