/* ════════════════════════════════════════════════════════
   Contact Page
   2-Col Layout: Col 2 (Form) and Col 3 (Guestbook)
   ════════════════════════════════════════════════════════ */
'use client'

import { useState, useEffect } from 'react'

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

  return (
    <section className="col col-scrollable" style={{ flex: 1, borderRight: 'none' }}>
      <header className="col-header">
        [ GUEST.LOG ]
      </header>

      <div className="contact-grid">
        {/* Left Column: Contact Form */}
        <div className="contact-col">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
            <h2 className="project-detail-title" style={{ margin: 0 }}>TRANSMIT MESSAGE</h2>
            <p className="page-subtitle" style={{ fontSize: '11px', opacity: 0.5, margin: 0, textTransform: 'uppercase' }}>DIRECT COMM LINK TO BOOLU.</p>
          </div>

          <form onSubmit={handleContactSubmit}>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <input type="text" id="name" name="name" className="form-input" placeholder="[ NAME ]" required style={{ padding: '6px 8px', fontSize: '13px', border: '1px solid var(--border)' }} />
            </div>
            
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <input type="email" id="email" name="email" className="form-input" placeholder="[ EMAIL ]" required style={{ padding: '6px 8px', fontSize: '13px', border: '1px solid var(--border)' }} />
            </div>
            
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <textarea id="message" name="message" className="form-textarea" placeholder="[ MESSAGE ]" required style={{ padding: '6px 8px', fontSize: '13px', border: '1px solid var(--border)', minHeight: '60px' }}></textarea>
            </div>
            
            <button type="submit" className="btn-primary" disabled={formStatus === 'loading'}>
              {formStatus === 'loading' ? 'SENDING...' : 'SEND'}
            </button>

            {formStatus === 'success' && (
              <div className="status-msg success">TRANSMISSION SUCCESSFUL.</div>
            )}
            {formStatus === 'error' && (
              <div className="status-msg error">TRANSMISSION FAILED. RETRY.</div>
            )}
          </form>
        </div>

        {/* Right Column: Guestbook */}
        <div className="contact-col">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
            <h2 className="project-detail-title" style={{ margin: 0 }}>PUBLIC LOG</h2>
            <p className="page-subtitle" style={{ fontSize: '11px', opacity: 0.5, margin: 0, textTransform: 'uppercase' }}>GUESTBOOK ENTRIES (AUTO-PUBLISHED)</p>
          </div>

          <form onSubmit={handleGuestbookSubmit} style={{ marginBottom: '37px' }}>
             {/* Honeypot field - invisible to users, traps bots */}
             <input type="text" name="website_url" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
             <div style={{ display: 'flex', gap: '9px', marginBottom: '9px' }}>
                <input type="text" name="name" className="form-input" placeholder="[ NAME ]" required style={{ flex: 1, padding: '6px 8px', fontSize: '13px', border: '1px solid var(--border)' }} />
             </div>
             <textarea name="message" className="form-textarea" placeholder="[ LEAVE A PUBLIC MESSAGE... ]" required style={{ minHeight: '40px', marginBottom: '9px', padding: '6px 8px', fontSize: '13px', border: '1px solid var(--border)' }}></textarea>
             <button type="submit" className="btn-primary" style={{ padding: '7px 14px', fontSize: '12px' }} disabled={guestbookStatus === 'loading'}>
               {guestbookStatus === 'loading' ? 'SIGNING...' : 'SIGN'}
             </button>
          </form>

          <div className="ascii-divider">{'// ────────────────────────────────────────'}</div>

          <div style={{ marginTop: '18px' }}>
             {entries.length === 0 ? (
               <div className="guestbook-entry" style={{ opacity: 0.5 }}>NO LOGS FOUND. BE THE FIRST.</div>
             ) : (
               entries.map(entry => (
                  <div key={entry.id} className="guestbook-entry" style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', overflow: 'hidden' }}>
                      <div className="guestbook-name" style={{ whiteSpace: 'nowrap', flexShrink: 0, marginBottom: 0 }}>
                        [{entry.name.toUpperCase()}]:
                      </div>
                      <div className="guestbook-message" style={{ opacity: 0.9, wordBreak: 'break-word', marginTop: '1px' }}>
                        {entry.message}
                      </div>
                    </div>
                    <div className="guestbook-date" style={{ flexShrink: 0, marginBottom: 0, whiteSpace: 'nowrap' }}>
                      {new Date(entry.createdAt).toISOString().replace('T', ' ').slice(0, 16)}
                    </div>
                  </div>
               ))
             )}
          </div>
        </div>
      </div>
    </section>
  )
}
