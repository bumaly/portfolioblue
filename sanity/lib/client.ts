import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We use false because we want fresh data for portfolio
})
