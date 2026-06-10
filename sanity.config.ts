import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { projectId, dataset } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'BOOLU.ART Studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool(),
    visionTool(),
  ],
})
