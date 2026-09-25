'use client'

import React, { useActionState } from 'react'
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react'
import { loginAdminAction } from '@/app/admin/actions'

interface AdminLoginFormProps {
  redirectTo: string
}

export function AdminLoginForm({ redirectTo }: AdminLoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null)

  return (
    <div>
      {state?.error && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="username"
              required
              autoFocus
              placeholder="admin"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-green hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-brand-green/25 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          <span>{isPending ? 'Verifying...' : 'Access Dashboard'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
