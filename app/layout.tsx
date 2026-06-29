import type { Metadata } from 'next'
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import Nav from '@/components/Nav'
import Shell from '@/components/Shell'
import { Suspense } from 'react'

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'BOOLU.ART — Digital Illustration & Mixed Media Portfolio',
  description: 'Portfolio of BOOLU — digital illustrator and mixed media artist. Exploring colour, form, and narrative through digital and traditional media.',
  keywords: ['digital illustration', 'mixed media', 'art portfolio', 'boolu'],
  openGraph: {
    title: 'BOOLU.ART',
    description: 'Digital Illustration & Mixed Media Portfolio',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${ibmPlexMono.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Shell>
              <Nav />
              <main className="main-content">
                {children}
              </main>
            </Shell>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
