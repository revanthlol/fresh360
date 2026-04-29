import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  return builder.image(source).auto('format')
}

export interface Brand {
  _id: string
  name: string
  id: { current: string }
  tagline: string
  description: string
  color: string
  heroImage: any // eslint-disable-line @typescript-eslint/no-explicit-any
  usps: string[]
  primaryColor: string
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  brand: Brand
  category: string
  tagline: string
  description: string
  ingredients: string[]
  benefits: string[]
  image: any // eslint-disable-line @typescript-eslint/no-explicit-any
  featured: boolean
  sortOrder: number
}

export async function getBrands(): Promise<Brand[]> {
  return client.fetch(`*[_type == "brand"] | order(name asc)`)
}

export async function getBrand(slug: string): Promise<Brand> {
  return client.fetch(`*[_type == "brand" && id.current == $slug][0]`, { slug })
}

export async function getProducts(): Promise<Product[]> {
  return client.fetch(`*[_type == "product"] | order(sortOrder asc, name asc) {
    ...,
    brand->
  }`)
}

export async function getProduct(slug: string): Promise<Product> {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0] {
    ...,
    brand->
  }`, { slug })
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  return client.fetch(`*[_type == "product" && brand->id.current == $brandId] | order(sortOrder asc, name asc) {
    ...,
    brand->
  }`, { brandId })
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return client.fetch(`*[_type == "product" && featured == true] | order(sortOrder asc, name asc) [0...6] {
    ...,
    brand->
  }`)
}
