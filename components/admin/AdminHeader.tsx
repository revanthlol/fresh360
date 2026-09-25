'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileEdit, ExternalLink, LogOut, Shield } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { logoutAdminAction } from '@/app/admin/actions'
import { cn } from '@/lib/utils'

interface AdminHeaderProps {
  user?: string
}

export function AdminHeader({ user = 'admin' }: AdminHeaderProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/admin/studio')

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Emblem + Title */}
          <div className="flex items-center gap-4 shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2 group transition-opacity hover:opacity-90"
              aria-label="Fresh 360 Home"
            >
              <Logo size="sm" variant="light" />
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              <Shield className="w-3 h-3 text-brand-green" />
              <span>Admin Console</span>
            </div>
          </div>

          {/* Center: Navigation Controls */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <Link
              href="/admin"
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all",
                !isStudio
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-brand-green" />
              <span>Operations & Inquiries</span>
            </Link>

            <Link
              href="/admin/studio"
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all",
                isStudio
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              )}
            >
              <FileEdit className="w-3.5 h-3.5 text-brand-teal" />
              <span>Sanity Studio</span>
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Open public website in new tab"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <div className="hidden sm:flex items-center text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              <span className="font-mono text-[11px]">{user}</span>
            </div>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer border border-red-200/60"
                title="Sign out of Admin Console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </header>
  )
}
