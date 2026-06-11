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
    const { name, message, website_url } = body

    // 1. Invisible Honeypot: If this field is filled, it's a bot.
    if (website_url) {
      // Silently drop the request but return success so the bot doesn't retry
      return NextResponse.json({ success: true, fake: true })
    }

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    // 2. Link Blocking / Anti-Spam
    const urlPattern = /(http:\/\/|https:\/\/|www\.|<a\s+href)/i
    if (urlPattern.test(message) || urlPattern.test(name)) {
      return NextResponse.json({ error: 'Links are not allowed in the public log' }, { status: 400 })
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
