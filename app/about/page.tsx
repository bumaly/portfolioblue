/* eslint-disable @next/next/no-img-element */
import AppWindow from '@/components/AppWindow'

export default function About() {
  return (
    <AppWindow title="ABOUT.SYS — BOOLU" statusLeft="BOOLU.ART" statusRight="Creative Technologist">
      <div className="win-content-scroll">
        <div className="win-about-body">

          <div className="win-about-header">
            📄 BOOLU // CREATIVE TECHNOLOGIST
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ flexShrink: 0, width: '180px' }}>
              <img
                src="/about-portrait.jpg"
                alt="Portrait of BOOLU"
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '2px solid',
                  borderColor: '#808080 #FFFFFF #FFFFFF #808080',
                  display: 'block',
                  filter: 'grayscale(10%)',
                }}
              />
              <div style={{ textAlign: 'center', fontSize: '10px', color: '#808080', marginTop: '4px' }}>
                PORTRAIT.JPG
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <p>BOOLU is a creative technologist building interactive and immersive experiences with code, electronics, and sound.</p>
              <p>They explore the emotional and psychological tensions of the human experience with technology, examining memory, identity, and connection.</p>
              <p>Their work asks the audience to become a participant: to explore their own hyperindividual relationship with everyday and emergent technologies like AI, smart devices, and digital replicas.</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #C0C0C0', margin: '16px 0' }} />

          <div className="win-about-section-title">CREATIVE PHILOSOPHY</div>
          <p>Their practice is driven by a desire to tell deeply human stories and build spaces for genuine empathy with technology as a medium.</p>
          <p>They regard technology as a tool for intimate personal expression and communication — a way to explore vulnerability, memory, and identity. They want technology&apos;s presence to be felt emotionally and tactilely, inviting the audience to experience the human presence within the machine.</p>
          <p>By designing interactive narrative-driven experiences, BOOLU challenges our modern relationship with technology as an isolating and profit-driven extraction tool. Instead of algorithms manipulating human attention, they reclaim code, hardware, and interaction to build empathy, connection, and reflection.</p>

          <div style={{ borderTop: '1px solid #C0C0C0', margin: '16px 0' }} />

          <div className="win-about-section-title">BACKGROUND</div>
          <p>BOOLU is from Manila, Philippines and is based in Barcelona, Spain. They speak English, Tagalog (Filipino), and Spanish. They have an established career in technology and hold an MBA from a global top business school. They enjoy producing electronic music, adventure travel, and bouldering.</p>

        </div>
      </div>
    </AppWindow>
  )
}
