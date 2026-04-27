export default function ProductDetailLoading() {
  return (
    <div className="pt-20">
      {/* Navigation Breadcrumb Skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex items-center space-x-2">
        <div className="h-4 w-20 bg-slate-100 animate-pulse rounded" />
        <div className="h-4 w-4 bg-slate-100 animate-pulse rounded" />
        <div className="h-4 w-24 bg-slate-100 animate-pulse rounded" />
        <div className="h-4 w-4 bg-slate-100 animate-pulse rounded" />
        <div className="h-4 w-32 bg-slate-200 animate-pulse rounded" />
      </div>

      {/* Main Product Section Skeleton */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Product Image Skeleton */}
            <div className="aspect-square rounded-[48px] bg-slate-100 animate-pulse" />

            {/* Right: Product Details Skeleton */}
            <div className="flex flex-col space-y-8">
              <div>
                <div className="h-6 w-32 bg-slate-100 animate-pulse rounded-full mb-4" />
                <div className="h-16 w-3/4 bg-slate-200 animate-pulse rounded-2xl mb-4" />
                <div className="h-8 w-1/2 bg-slate-100 animate-pulse rounded-xl" />
              </div>

              <div className="space-y-4">
                <div className="h-4 w-full bg-slate-100 animate-pulse rounded" />
                <div className="h-4 w-full bg-slate-100 animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-slate-100 animate-pulse rounded" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-16 bg-slate-200 animate-pulse rounded-2xl" />
                <div className="flex-1 h-16 bg-slate-100 animate-pulse rounded-2xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-slate-100 animate-pulse rounded" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-10 w-24 bg-slate-50 animate-pulse rounded-lg" />
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-slate-100 animate-pulse rounded" />
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-4 w-full bg-slate-50 animate-pulse rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
