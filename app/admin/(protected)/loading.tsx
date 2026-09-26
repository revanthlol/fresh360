import React from 'react'

export default function AdminLoadingSkeleton() {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs shrink-0">
        <div className="space-y-1.5">
          <div className="h-7 w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-96 max-w-full bg-slate-100 rounded-lg" />
        </div>
        <div className="h-10 w-44 bg-slate-200 rounded-xl shrink-0" />
      </div>

      {/* Inquiries Header Skeleton */}
      <div className="flex-1 min-h-0 flex flex-col gap-3">
        <div className="space-y-1.5 shrink-0">
          <div className="h-6 w-48 bg-slate-200 rounded-lg" />
          <div className="h-3.5 w-80 max-w-full bg-slate-100 rounded-md" />
        </div>

        {/* Controls Bar Skeleton */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto py-1.5 px-0.5">
            <div className="h-9 w-28 bg-slate-200 rounded-xl" />
            <div className="h-9 w-20 bg-slate-100 rounded-xl" />
            <div className="h-9 w-24 bg-slate-100 rounded-xl" />
            <div className="h-9 w-24 bg-slate-100 rounded-xl" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-80 md:w-96 bg-slate-100 rounded-xl" />
            <div className="h-10 w-24 bg-slate-100 rounded-xl hidden sm:block" />
          </div>
        </div>

        {/* Bounded Table Skeleton Card */}
        <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
          {/* Header row */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3.5 grid grid-cols-6 gap-4 shrink-0">
            <div className="h-3.5 w-20 bg-slate-200 rounded" />
            <div className="h-3.5 w-24 bg-slate-200 rounded" />
            <div className="h-3.5 w-32 bg-slate-200 rounded col-span-2" />
            <div className="h-3.5 w-16 bg-slate-200 rounded" />
            <div className="h-3.5 w-16 bg-slate-200 rounded text-right justify-self-end" />
          </div>

          {/* Row skeletons with horizontal borders */}
          <div className="flex-1 divide-y divide-slate-200 overflow-hidden p-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="px-4 py-4 grid grid-cols-6 gap-4 items-center border-b border-slate-200/80">
                {/* Customer */}
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-40 bg-slate-100 rounded" />
                </div>
                {/* Brand & Type */}
                <div className="space-y-1.5">
                  <div className="h-4 w-16 bg-slate-100 rounded-md" />
                  <div className="h-3.5 w-24 bg-slate-200 rounded" />
                </div>
                {/* Message preview */}
                <div className="col-span-2 space-y-1.5 pr-4">
                  <div className="h-3.5 w-full bg-slate-100 rounded" />
                  <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
                </div>
                {/* Date */}
                <div>
                  <div className="h-3.5 w-20 bg-slate-100 rounded" />
                </div>
                {/* Status + Actions */}
                <div className="flex items-center justify-end gap-3">
                  <div className="h-7 w-20 bg-slate-100 rounded-lg" />
                  <div className="h-7 w-7 bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
