/* eslint-disable @next/next/no-img-element */
/* ════════════════════════════════════════════════════════
   About Page
   Full width 2-column grid within Col 2+3 area
   ════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <section className="col col-3">


      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'clamp(16px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(8px, 2vw, 14px)', marginBottom: 'clamp(16px, 3vw, 23px)', flexWrap: 'wrap' }}>
            <h1 className="page-title" style={{ marginBottom: 0, fontSize: 'clamp(24px, 6vw, 32px)' }}>BOOLU</h1>
            <span style={{ opacity: 0.4, fontSize: 'clamp(12px, 3vw, 16px)' }}>{'//'}</span>
            <p className="page-subtitle" style={{ marginBottom: 0, fontSize: 'clamp(11px, 3vw, 14px)' }}>CREATIVE TECHNOLOGIST</p>
          </div>

          <div className="clearfix">
            <div className="about-photo">
              <img 
                src="/about-portrait.jpg" 
                alt="Portrait of BOOLU" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  border: '1px solid var(--border)',
                  filter: 'grayscale(20%)',
                  display: 'block'
                }} 
              />
              <div style={{ 
                marginTop: '18px', 
                fontSize: '12px', 
                opacity: 0.5, 
                letterSpacing: '0.1em',
                textAlign: 'center'
              }}>
                [ PORTRAIT.JPG ]
              </div>
            </div>

            <div className="about-bio">
              <p>
                BOOLU is a creative technologist building interactive and immersive experiences with code, electronics, and sound.
              </p>
              <p>
                They explore the emotional and psychological tensions of the human experience with technology, examining memory, identity, and connection.
              </p>
              <p>
                Their work asks the audience to become a participant: to explore their own hyperindividual relationship with everyday and emergent technologies like AI, smart devices, and digital replicas.
              </p>
            </div>

            <div className="ascii-divider" style={{ marginTop: '35px' }}>{'// ────────────────────────────────────────'}</div>
            
            <div style={{ marginTop: '23px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '9px' }}>CREATIVE PHILOSOPHY</h3>
              <div className="about-bio" style={{ marginTop: '14px' }}>
                <p>
                  Their practice is driven by a desire to tell deeply human stories and build spaces for genuine empathy with technology as a medium.
                </p>
                <p>
                  They regard technology as a tool for intimate personal expression and communication - a way to explore vulnerability, memory, and identity. They want technology&apos;s presence to be felt emotionally and tactilely, inviting the audience to experience the human presence within the machine.
                </p>
                <p>
                  By designing interactive narrative-driven experiences, BOOLU challenges our modern relationship with technology as an isolating and profit-driven extraction tool. Instead of algorithms manipulating human attention, they reclaim code, hardware, and interaction to build empathy, connection, and reflection.
                </p>
              </div>
            </div>

            <div className="ascii-divider" style={{ marginTop: 'clamp(24px, 5vw, 35px)' }}>{'// ────────────────────────────────────────'}</div>

            <div className="about-bio" style={{ marginTop: 'clamp(24px, 5vw, 35px)', textAlign: 'left' }}>
              <p>
                BOOLU is from Manila, Philippines and is based in Barcelona, Spain. They speak English, Tagalog (Filipino), and Spanish. They have an established career in technology and hold an MBA from a global top business school. They enjoy producing electronic music, adventure travel, and bouldering. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
