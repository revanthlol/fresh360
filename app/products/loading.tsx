export default function ProductsLoading() {
  return (
    <div className="pt-20">
      {/* Hero Skeleton */}
      <section className="bg-slate-50 py-24 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="h-16 w-3/4 bg-slate-200 animate-pulse rounded-2xl mb-6" />
            <div className="h-20 w-full bg-slate-200 animate-pulse rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Brand Filters Skeleton */}
      <section className="sticky top-[72px] bg-white/80 backdrop-blur-md z-40 py-6 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-32 bg-slate-200 animate-pulse rounded-full shrink-0" />
            ))}
          </div>
          <div className="hidden md:block h-6 w-40 bg-slate-200 animate-pulse rounded-lg" />
        </div>
      </section>

      {/* Products Grid Skeleton */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-square rounded-[32px] bg-slate-100 animate-pulse mb-6" />
                <div className="px-2 space-y-3">
                  <div className="h-8 w-2/3 bg-slate-100 animate-pulse rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 animate-pulse rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
