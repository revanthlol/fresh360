import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'

// Only patch content fields on existing records; never replace documents or media.
for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const separator = line.indexOf('=')
  if (separator < 1 || line.trimStart().startsWith('#')) continue
  const key = line.slice(0, separator).trim()
  process.env[key] ||= line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, '$2')
}
const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset, SANITY_API_TOKEN: token } = process.env
if (!projectId || !dataset || !token) throw new Error('Sanity project, dataset and write token are required')
const client = createClient({ projectId, dataset, token, apiVersion: '2026-02-01', useCdn: false, perspective: 'raw' })
const content = JSON.parse(fs.readFileSync('data/fizzo-content.json', 'utf8'))
try {
const documents = await client.fetch('*[_type == "brand" && id.current == "fizzo" || _type == "product" && brand._ref in *[_type == "brand" && id.current == "fizzo"]._id]')
if (documents.some((doc) => doc._id.startsWith('drafts.') || doc._id.startsWith('versions.'))) {
  throw new Error('Fizzo has unpublished edits; reconcile these before updating published content')
}
const brands = documents.filter((doc) => doc._type === 'brand')
if (brands.length !== 1) throw new Error('Expected exactly one existing Fizzo brand')
const updates = [{ document: brands[0], fields: content.brand }]
for (const product of content.products) {
  const matches = documents.filter((doc) => doc._type === 'product' && doc.name === product.name)
  if (matches.length !== 1) throw new Error(`Expected exactly one existing product for ${product.name}`)
  if (product.tagline.length > 80 || product.description.length > 400) throw new Error(`Copy exceeds schema limits for ${product.name}`)
  updates.push({ document: matches[0], fields: product })
}
const changed = updates.filter(({ document, fields }) => Object.entries(fields).some(([key, value]) => JSON.stringify(document[key]) !== JSON.stringify(value)))
console.log(JSON.stringify({ projectId, dataset, changed: changed.map(({ document, fields }) => ({ id: document._id, fields: Object.keys(fields) })) }, null, 2))
if (process.argv.includes('--apply') && changed.length) {
  const backupDir = path.resolve('output/cms-backups')
  fs.mkdirSync(backupDir, { recursive: true })
  const backup = path.join(backupDir, `fizzo-${Date.now()}.json`)
  fs.writeFileSync(backup, JSON.stringify(documents, null, 2) + '\n', { mode: 0o600 })
  let transaction = client.transaction()
  for (const { document, fields } of changed) {
    transaction = transaction.patch(document._id, (patch) => patch.ifRevisionId(document._rev).set(fields))
  }
  await transaction.commit()
  const fresh = await client.fetch('*[_id in $ids]', { ids: updates.map(({ document }) => document._id) })
  for (const { document, fields } of updates) {
    const actual = fresh.find((doc) => doc._id === document._id)
    if (!actual || Object.entries(fields).some(([key, value]) => JSON.stringify(actual[key]) !== JSON.stringify(value))) {
      throw new Error(`Read-back verification failed for ${document._id}`)
    }
    for (const key of ['slug', 'brand', 'image', 'heroImage', 'sortOrder', 'featured']) {
      if (JSON.stringify(actual[key]) !== JSON.stringify(document[key])) throw new Error(`Preserved field changed: ${key}`)
    }
  }
  console.log(`Updated and verified ${updates.length} records. Backup: ${backup}`)
}

} catch (error) {
  console.error(`Fizzo update failed (${error.code || error.statusCode || "unknown"}). Request details omitted to protect credentials.`)
  process.exitCode = 1
}
