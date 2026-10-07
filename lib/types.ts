export type BrandId = 'juicera' | 'fruizy' | 'fizzo'
export type CategoryId = 'cold-pressed-juice' | 'nut-milk' | 'carbonated' | 'goli-soda' | 'artificially-flavoured-fizzy'

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    metadata?: Record<string, unknown>
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Brand {
  _id: string
  name: string
  id: { current: string } // This is the slug field in the schema named 'id'
  tagline: string
  description: string
  color: string
  heroImage: SanityImageAsset
  usps: string[]
  primaryColor: string
  labelNote?: string
  metaDescription?: string
  socialCaption?: string
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  brand?: Brand
  category?: CategoryId
  tagline?: string
  description?: string
  ingredients?: string[]
  tasteNotes?: string[]
  servingSuggestion?: string
  labelStatements?: string[]
  vegetarian?: boolean
  benefits?: string[]
  image?: SanityImageAsset
  featured: boolean
  sortOrder: number
}

export interface ContactFormData {
  name: string
  phone: string
  email: string
  brandInterest: BrandId | 'general'
  message: string
}
