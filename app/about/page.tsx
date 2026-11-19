/* eslint-disable @next/next/no-img-element */
import AppWindow from '@/components/AppWindow'

export default function About() {
  return (
    <AppWindow title="ABOUT.SYS — BOOLU">
      <div className="win-content-scroll">
        <div className="win-about-body">

          <div className="win-about-header">
            BOOLU.art
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
              <p>BOOLU.art is my personal hobby website and blog.</p>
              <p>I write about: what I&apos;m working on for fun, what I&apos;ve been reading, what I&apos;ve been thinking, what I&apos;ve been listening to, and anything else I want to talk about.</p>
              <p>Topics:</p>
              <ul>
                <li>Philosophy, mindfulness, human-machine interaction, alignment</li>
                <li>Digital art, electronics, maker builds</li>
                <li>Electronic music and festivals</li>
                <li>Books: non-fiction, contemporary fiction, mystery, thriller, sci-fi</li>
                <li>Film: documentaries, sci-fi, queer cinema</li>
                <li>True crime</li>
              </ul>
            </div>
          </div>

          <p>this is the most boring page here. i hope.</p>

        </div>
      </div>
    </AppWindow>
  )
}
