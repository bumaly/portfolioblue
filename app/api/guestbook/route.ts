import { NextResponse } from 'next/server'
import { db } from '@/db'
import { guestbookEntries } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const entries = await db.select().from(guestbookEntries).orderBy(desc(guestbookEntries.createdAt))
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    const newEntry = await db.insert(guestbookEntries).values({
      name,
      message,
    }).returning()

    return NextResponse.json(newEntry[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
  }
}
