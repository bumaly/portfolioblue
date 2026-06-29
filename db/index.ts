import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

let _db: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (!_db) _db = drizzle(neon(process.env.DATABASE_URL!))
  return _db
}
