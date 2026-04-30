import { MetadataRoute } from 'next'
import { getProducts, getBrands } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fresh360.com'

  // Fetch dynamic routes
  let products = []
  let brands = []
  
  try {
    products = await getProducts()
    brands = await getBrands()
  } catch (error) {
    console.error('Error fetching data for sitemap:', error)
  }

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const brandUrls = brands.map((brand: any) => ({
    url: `${baseUrl}/brands/${brand.id.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const staticUrls = [
    '',
    '/about',
    '/process',
    '/products',
    '/contact',
    '/legal/privacy',
    '/legal/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'monthly') as 'daily' | 'monthly',
    priority: route === '' ? 1 : 0.6,
  }))

  return [...staticUrls, ...productUrls, ...brandUrls]
}
