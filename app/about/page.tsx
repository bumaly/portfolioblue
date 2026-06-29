/* eslint-disable @next/next/no-img-element */
export default function About() {
  return (
    <section className="col col-3" style={{ overflowY: 'auto' }}>
      <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(24px, 4vw, 36px)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <h1 className="page-title" style={{ marginBottom: 0 }}>BOOLU</h1>
            <span style={{ opacity: 0.3, fontFamily: 'var(--font-mono)', fontSize: '16px' }}>//</span>
            <span className="page-subtitle" style={{ marginBottom: 0 }}>Creative Technologist</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>

        {/* Photo + bio */}
        <div className="clearfix">
          <div className="about-photo">
            <img
              src="/about-portrait.jpg"
              alt="Portrait of BOOLU"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'grayscale(15%)',
              }}
            />
            <div style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.4, letterSpacing: '0.1em' }}>
              PORTRAIT.JPG
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
        </div>

        <hr className="section-divider" />

        {/* Philosophy */}
        <div style={{ marginBottom: '32px' }}>
          <div className="section-label">Creative Philosophy</div>
          <div className="about-bio">
            <p>
              Their practice is driven by a desire to tell deeply human stories and build spaces for genuine empathy with technology as a medium.
            </p>
            <p>
              They regard technology as a tool for intimate personal expression and communication — a way to explore vulnerability, memory, and identity. They want technology&apos;s presence to be felt emotionally and tactilely, inviting the audience to experience the human presence within the machine.
            </p>
            <p>
              By designing interactive narrative-driven experiences, BOOLU challenges our modern relationship with technology as an isolating and profit-driven extraction tool. Instead of algorithms manipulating human attention, they reclaim code, hardware, and interaction to build empathy, connection, and reflection.
            </p>
          </div>
        </div>

        <hr className="section-divider" />

        {/* Background */}
        <div className="about-bio">
          <p>
            BOOLU is from Manila, Philippines and is based in Barcelona, Spain. They speak English, Tagalog (Filipino), and Spanish. They have an established career in technology and hold an MBA from a global top business school. They enjoy producing electronic music, adventure travel, and bouldering.
          </p>
        </div>

      </div>
    </section>
  )
}
