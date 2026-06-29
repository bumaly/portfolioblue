import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const contactEmailTo = process.env.CONTACT_EMAIL_TO || 'you@example.com'

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    if (name.length > 100) {
      return NextResponse.json({ error: 'Name must be 100 characters or less' }, { status: 400 })
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message must be 1000 characters or less' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Resend's default onboarding email for testing
      to: [contactEmailTo],
      subject: `New Transmission from ${name}`,
      text: `
        IDENTIFIER: ${name}
        RETURN PATH: ${email}
        PAYLOAD:
        ${message}
      `,
    })

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send message', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
