export type BrandId = 'juicera' | 'fuzzy' | 'refrizz'
export type CategoryId = 'cold-pressed-juice' | 'nut-milk' | 'carbonated' | 'goli-soda'

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    metadata: any
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
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  brand: Brand
  category: 'cold-pressed-juice' | 'nut-milk' | 'carbonated' | 'goli-soda'
  tagline: string
  description: string
  ingredients: string[]
  benefits: string[]
  image: SanityImageAsset
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
