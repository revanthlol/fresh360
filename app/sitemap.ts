import { MetadataRoute } from 'next'
import { getProducts, getBrands } from '@/lib/sanity'
import type { Product, Brand } from '@/lib/sanity' // ✅ use the SAME types

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  let products: Product[] = []
  let brands: Brand[] = []

  try {
    products = await getProducts()
    brands = await getBrands()
  } catch (error) {
    console.error('Error fetching data for sitemap:', error)
  }

  const productUrls: MetadataRoute.Sitemap = products
    .filter((product) => product?.slug?.current)
    .map((product) => ({
      url: `${baseUrl}/products/${product.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  const brandUrls: MetadataRoute.Sitemap = brands
    .filter((brand) => brand?.id?.current)
    .map((brand) => ({
      url: `${baseUrl}/brands/${brand.id.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const staticRoutes = [
    '',
    '/about',
    '/process',
    '/products',
    '/contact',
    '/legal/privacy',
    '/legal/terms',
  ]

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.6,
  }))

  return [...staticUrls, ...productUrls, ...brandUrls]
}