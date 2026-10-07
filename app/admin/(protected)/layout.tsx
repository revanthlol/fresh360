import React from 'react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/admin-auth'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { SessionGuard } from '@/components/admin/SessionGuard'
import { AdminContent } from '@/components/admin/AdminContent'

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
    <AdminContent header={<AdminHeader user={session.user || 'admin'} />}>
      <SessionGuard />
      {children}
    </AdminContent>
  )
}
