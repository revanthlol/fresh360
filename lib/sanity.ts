import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

import { Brand, Product } from './types'

export type { Brand, Product }

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

export async function getBrands(): Promise<Brand[]> {
  return client.fetch(`
    *[_type == "brand"] | order(name asc) {
      ...,
      heroVideo{
        asset->{
          url
        }
      }
    }
  `)
}

export async function getBrand(slug: string): Promise<Brand> {
  return client.fetch(`
    *[_type == "brand" && id.current == $slug][0] {
      ...,
      heroVideo{
        asset->{
          url
        }
      }
    }
  `, { slug })
}

export async function getProducts(): Promise<Product[]> {
  return client.fetch(`
    *[_type == "product"] | order(sortOrder asc, name asc) {
      ...,
      brand->{
        ...,
        heroVideo{
          asset->{
            url
          }
        }
      }
    }
  `)
}

export async function getProduct(slug: string): Promise<Product> {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      ...,
      brand->{
        ...,
        heroVideo{
          asset->{
            url
          }
        }
      }
    }
  `, { slug })
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  return client.fetch(`
    *[_type == "product" && brand->id.current == $brandId]
    | order(sortOrder asc, name asc) {
      ...,
      brand->{
        ...,
        heroVideo{
          asset->{
            url
          }
        }
      }
    }
  `, { brandId })
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const featured = await client.fetch<Product[]>(`
    *[_type == "product" && featured == true]
    | order(sortOrder asc, name asc) [0...6] {
      ...,
      brand->{
        ...,
        heroVideo{
          asset->{
            url
          }
        }
      }
    }
  `)

  if (featured && featured.length > 0) return featured

  // Fallback
  return client.fetch<Product[]>(`
    *[_type == "product"]
    | order(sortOrder asc, name asc) [0...6] {
      ...,
      brand->{
        ...,
        heroVideo{
          asset->{
            url
          }
        }
      }
    }
  `)
}