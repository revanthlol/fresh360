export default function BrandDetailLoading() {
  return (
    <div className="pt-20">
      {/* Brand Hero Skeleton */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-4xl space-y-8">
            <div className="h-10 w-48 bg-slate-200 animate-pulse rounded-full" />
            <div className="h-24 w-3/4 bg-slate-200 animate-pulse rounded-2xl" />
            <div className="h-20 w-full bg-slate-100 animate-pulse rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Brand Philosophy / USPs Skeleton */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-12 w-12 bg-slate-100 animate-pulse rounded-2xl" />
                <div className="h-8 w-3/4 bg-slate-100 animate-pulse rounded-lg" />
                <div className="h-16 w-full bg-slate-50 animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Products Skeleton */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <div className="h-12 w-64 bg-slate-200 animate-pulse rounded-xl" />
              <div className="h-6 w-48 bg-slate-100 animate-pulse rounded-lg" />
            </div>
            <div className="h-12 w-40 bg-slate-200 animate-pulse rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-square rounded-[32px] bg-white animate-pulse mb-6 border border-slate-100" />
                <div className="px-2 space-y-3">
                  <div className="h-6 w-3/4 bg-slate-100 animate-pulse rounded-lg" />
                  <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
