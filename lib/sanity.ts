import { client } from '../sanity/client'
import type { Brand, Product } from './types'

// Helper fragment for brand to satisfy the Brand interface which expects both id and slug
const BRAND_FIELDS = `
  _id,
  name,
  id,
  "slug": id,
  tagline,
  description,
  color,
  heroImage,
  usps,
  primaryColor
`

// Get all brands
export async function getAllBrands(): Promise<Brand[]> {
  return await client.fetch(`*[_type == "brand"] | order(name asc) {
    ${BRAND_FIELDS}
  }`)
}

// Get single brand by slug
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  return await client.fetch(
    `*[_type == "brand" && id.current == $slug][0] {
      ${BRAND_FIELDS}
    }`,
    { slug }
  )
}

// Get all products (with brand data expanded via ->)
export async function getAllProducts(): Promise<Product[]> {
  return await client.fetch(`*[_type == "product"] | order(sortOrder asc, name asc) {
    ...,
    brand-> {
      ${BRAND_FIELDS}
    }
  }`)
}

// Get products filtered by brand slug
export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  return await client.fetch(
    `*[_type == "product" && brand->id.current == $brandSlug] | order(sortOrder asc) {
      ...,
      brand-> {
        ${BRAND_FIELDS}
      }
    }`,
    { brandSlug }
  )
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      ...,
      brand-> {
        ${BRAND_FIELDS}
      }
    }`,
    { slug }
  )
}

// Get featured products for homepage
export async function getFeaturedProducts(): Promise<Product[]> {
  return await client.fetch(`*[_type == "product" && featured == true] | order(sortOrder asc) [0...6] {
    ...,
    brand-> {
      ${BRAND_FIELDS}
    }
  }`)
}

// Get related products (same brand, excluding current product, max 3)
export async function getRelatedProducts(productSlug: string, brandId: string): Promise<Product[]> {
  return await client.fetch(
    `*[_type == "product" && brand->id.current == $brandId && slug.current != $productSlug] | order(sortOrder asc) [0...3] {
      ...,
      brand-> {
        ${BRAND_FIELDS}
      }
    }`,
    { productSlug, brandId }
  )
}
