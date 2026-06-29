'use client'

import { useState, useEffect } from 'react'
import AppWindow from '@/components/AppWindow'

type GuestbookEntry = { id: number; name: string; message: string; createdAt: string }

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [guestbookStatus, setGuestbookStatus] = useState<'idle' | 'loading'>('idle')
  const [entries, setEntries] = useState<GuestbookEntry[]>([])

  useEffect(() => {
    fetch('/api/guestbook')
      .then(res => res.json())
      .then(data => setEntries(data))
      .catch(err => console.error(err))
  }, [])

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('loading')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { 'Content-Type': 'application/json' }
    })
    setFormStatus(res.ok ? 'success' : 'error')
  }

  const handleGuestbookSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setGuestbookStatus('loading')
    const form = e.currentTarget
    const formData = new FormData(form)
    const res = await fetch('/api/guestbook', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
      const newEntry = await res.json()
      setEntries([newEntry, ...entries])
      form.reset()
    }
    setGuestbookStatus('idle')
  }

  const statusRight = entries.length > 0 ? `${entries.length} entries` : 'No entries'

  return (
    <AppWindow title="GUEST.LOG — BOOLU" statusLeft="CONTACT + GUESTBOOK" statusRight={statusRight}>
      <div className="win-content-scroll">
        <div className="win-about-body">

          {/* ── Contact form ─────────────────────────────── */}
          <div className="win-about-header">📋 TRANSMIT.MSG // DIRECT COMM LINK</div>

          <form onSubmit={handleContactSubmit} style={{ maxWidth: '480px' }}>
            <div className="win-form-group">
              <input type="text" name="name" className="win-form-input" placeholder="NAME" required />
            </div>
            <div className="win-form-group">
              <input type="email" name="email" className="win-form-input" placeholder="EMAIL" required />
            </div>
            <div className="win-form-group">
              <textarea name="message" className="win-form-textarea" placeholder="MESSAGE" required />
            </div>
            <button type="submit" className="win-btn-primary" disabled={formStatus === 'loading'}>
              {formStatus === 'loading' ? 'SENDING...' : 'SEND →'}
            </button>
            {formStatus === 'success' && (
              <div className="win-status-msg win-status-msg--ok">TRANSMISSION SUCCESSFUL.</div>
            )}
            {formStatus === 'error' && (
              <div className="win-status-msg win-status-msg--err">TRANSMISSION FAILED. RETRY.</div>
            )}
          </form>

          <div style={{ borderTop: '1px solid #808080', margin: '20px 0' }} />

          {/* ── Guestbook ────────────────────────────────── */}
          <div className="win-about-header">📝 PUBLIC.LOG // GUESTBOOK ENTRIES</div>

          <form onSubmit={handleGuestbookSubmit} style={{ maxWidth: '480px', marginBottom: '20px' }}>
            {/* ponytail: honeypot — traps bots, never displayed */}
            <input type="text" name="website_url" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div className="win-form-group">
              <input type="text" name="name" className="win-form-input" placeholder="NAME" required />
            </div>
            <div className="win-form-group">
              <textarea name="message" className="win-form-textarea win-form-textarea--short" placeholder="LEAVE A PUBLIC MESSAGE..." required />
            </div>
            <button type="submit" className="win-btn-primary" disabled={guestbookStatus === 'loading'}>
              {guestbookStatus === 'loading' ? 'SIGNING...' : 'SIGN LOG →'}
            </button>
          </form>

          <div>
            {entries.length === 0 ? (
              <div className="win-empty win-empty--contact">
                <div style={{ fontSize: '20px' }}>📋</div>
                <div>No entries yet.</div>
                <div style={{ fontSize: '11px' }}>Be the first to sign.</div>
              </div>
            ) : (
              entries.map(entry => (
                <div key={entry.id} className="win-log-entry">
                  <div className="win-log-entry-header">
                    <span className="win-log-entry-name">[{entry.name.toUpperCase()}]</span>
                    <span className="win-log-entry-date">
                      {new Date(entry.createdAt).toISOString().replace('T', ' ').slice(0, 16)}
                    </span>
                  </div>
                  <div className="win-log-entry-message">{entry.message}</div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </AppWindow>
  )
}
