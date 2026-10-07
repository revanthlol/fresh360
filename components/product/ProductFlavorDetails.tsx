import type { Product } from '@/lib/types'

export function ProductFlavorDetails({ product }: { product: Product }) {
  if (!product.tasteNotes?.length && !product.servingSuggestion && !product.labelStatements?.length && product.vegetarian !== true) return null

  return (
    <div className="space-y-5 text-base leading-relaxed text-slate-700">
      {product.tasteNotes?.length ? <div>
        <h3 className="mb-1 text-sm font-semibold text-slate-900">Taste notes</h3>
        <p>{product.tasteNotes.join(' · ')}</p>
      </div> : null}
      {product.servingSuggestion ? <div>
        <h3 className="mb-1 text-sm font-semibold text-slate-900">Best with</h3>
        <p>{product.servingSuggestion}</p>
      </div> : null}
      {product.labelStatements?.length ? <div className="border-t border-slate-200 pt-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Label information</h3>
        <ul className="space-y-2 text-xs font-medium leading-relaxed">
          {product.labelStatements.map((statement) => <li key={statement}>{statement}</li>)}
        </ul>
      </div> : null}
      {product.vegetarian === true ? <p className="flex items-center gap-2 text-sm font-medium">
        <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center border border-brand-green"><span className="h-2 w-2 rounded-full bg-brand-green" /></span>
        Vegetarian
      </p> : null}
      {product.brand?.labelNote ? <p className="text-sm text-slate-600">{product.brand.labelNote}</p> : null}
    </div>
  )
}
