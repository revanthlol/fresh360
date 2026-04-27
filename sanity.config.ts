import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './sanity/schemas/index'

export default defineConfig({
  name: 'fresh360',
  title: 'Fresh 360 CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemas,
  },
})
