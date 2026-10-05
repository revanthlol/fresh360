import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const envPath = path.join(projectRoot, '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const separator = line.indexOf('=')
    if (separator < 1 || line.trimStart().startsWith('#')) continue
    const key = line.slice(0, separator).trim()
    if (!process.env[key]) process.env[key] = line.slice(separator + 1).trim()
  }
}

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset, SANITY_API_TOKEN: token } = process.env
if (!projectId || !dataset || !token) throw new Error('Sanity project, dataset, and write token must be configured')

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token })
const flavours = ['Lime', 'Orange', 'Blue Mojito', 'Jeera', 'Chilli Mango', 'Root Beer', 'Sugandhi', 'Paan']
const slugFor = (flavour) => `fizzo-${flavour.toLowerCase().replaceAll(' ', '-')}`
const productDocuments = flavours.map((name, index) => ({
  _id: `product-${slugFor(name)}`,
  _type: 'product',
  name,
  slug: { _type: 'slug', current: slugFor(name) },
  category: 'artificially-flavoured-fizzy',
  featured: false,
  sortOrder: 20 + index,
}))

async function main() {
  const existingBrand = await client.fetch('*[_type == "brand" && id.current == "fizzo"][0]{_id, heroImage}')
  const existingProducts = await client.fetch(
    '*[_type == "product" && slug.current in $slugs]{_id, "slug":slug.current}',
    { slugs: productDocuments.map((product) => product.slug.current) },
  )
  for (const existing of existingProducts) {
    if (existing._id !== `product-${existing.slug}`) {
      throw new Error(`Existing product with slug ${existing.slug} has another ID; review it before seeding`)
    }
  }

  const brandId = existingBrand?._id || 'brand-fizzo'
  for (const product of productDocuments) product.brand = { _type: 'reference', _ref: brandId }

  console.log(`Dataset: ${projectId}/${dataset}`)
  console.log(`Brand: ${existingBrand ? 'already exists' : 'create Fizzo'}`)
  console.log(`Products: ${flavours.join(', ')}`)
  console.log(`Existing matching products: ${existingProducts.length}`)
  if (process.argv.includes('--dry-run')) return

  let heroImage = existingBrand?.heroImage
  if (!heroImage) {
    const imagePath = path.join(projectRoot, 'public/images/brands/fizzo-concept.webp')
    if (!fs.existsSync(imagePath)) throw new Error(`Missing Fizzo brand concept image: ${imagePath}`)
    const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
      filename: 'fizzo-goli-soda-concept.webp',
      title: 'Fizzo Goli Soda concept image',
      description: 'Unlabelled generated brand visual. Not final product packaging.',
    })
    heroImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  }

  const transaction = client.transaction()
  if (!existingBrand) {
    transaction.createIfNotExists({
      _id: brandId,
      _type: 'brand',
      name: 'Fizzo',
      id: { _type: 'slug', current: 'fizzo' },
      tagline: 'Bold fizzy flavours in a Goli soda bottle.',
      description: 'Fizzo is Fresh 360’s artificially flavoured fizzy beverage line. Its eight flavours are Lime, Orange, Blue Mojito, Jeera, Chilli Mango, Root Beer, Sugandhi, and Paan.',
      color: '#C2410C',
      primaryColor: '#C2410C',
      heroImage,
      usps: ['Artificially flavoured', 'Goli soda bottle', 'Eight flavours'],
    })
  } else if (!existingBrand.heroImage) {
    transaction.patch(brandId, (patch) => patch.setIfMissing({ heroImage }))
  }
  for (const product of productDocuments) transaction.createIfNotExists(product)
  await transaction.commit()
  console.log('Fizzo brand and eight product records seeded.')
}

main().catch((error) => {
  console.error('Fizzo seed failed:', error.message)
  process.exitCode = 1
})
