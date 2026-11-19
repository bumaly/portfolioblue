import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import Nav from '@/components/Nav'
import Taskbar from '@/components/Taskbar'
import { Suspense } from 'react'

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'boolu.art',
  description: "BOOLU's personal hobby website and blog.",
  keywords: ['boolu', 'personal blog', 'philosophy', 'digital art', 'electronics', 'maker', 'electronic music', 'books', 'film'],
  openGraph: {
    title: 'boolu.art',
    description: "BOOLU's personal hobby website and blog.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={ibmPlexMono.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="desktop">
            <div className="desktop-area">
              <Suspense fallback={null}>
                <Nav />
                <main className="window-pane">
                  {children}
                </main>
              </Suspense>
            </div>
            <Taskbar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
