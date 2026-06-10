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
        [ CONTACT & GUESTBOOK ]
      </header>

      <div className="contact-grid">
        {/* Left Column: Contact Form */}
        <div className="contact-col">
          <h2 className="page-title">TRANSMIT MESSAGE</h2>
          <p className="page-subtitle">DIRECT COMM LINK TO BOOLU.</p>

          <form onSubmit={handleContactSubmit} style={{ marginTop: '28px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">NAME</label>
              <input type="text" id="name" name="name" className="form-input" required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">EMAIL</label>
              <input type="email" id="email" name="email" className="form-input" required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="message">MESSAGE</label>
              <textarea id="message" name="message" className="form-textarea" required></textarea>
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
          <h2 className="page-title">PUBLIC LOG</h2>
          <p className="page-subtitle">GUESTBOOK ENTRIES (AUTO-PUBLISHED)</p>

          <form onSubmit={handleGuestbookSubmit} style={{ marginBottom: '37px' }}>
             <div style={{ display: 'flex', gap: '9px', marginBottom: '9px' }}>
                <input type="text" name="name" className="form-input" placeholder="NAME" required style={{ flex: 1 }} />
             </div>
             <textarea name="message" className="form-textarea" placeholder="LEAVE A PUBLIC MESSAGE..." required style={{ minHeight: '69px', marginBottom: '9px' }}></textarea>
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
                 <div key={entry.id} className="guestbook-entry">
                   <div className="guestbook-name">{entry.name}</div>
                   <div className="guestbook-date">{new Date(entry.createdAt).toLocaleString()}</div>
                   <div className="guestbook-message">{entry.message}</div>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>
    </section>
  )
}
