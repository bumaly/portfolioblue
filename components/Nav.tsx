/* ════════════════════════════════════════════════════════
   Nav — Col 1 sidebar, file-tree navigation
   Active item: inverted-rect highlight (white box / blue text)
   ════════════════════════════════════════════════════════ */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'ABOUT',   href: '/about',    arrow: '▶' },
  { label: 'PROJECTS',href: '/projects', arrow: '·' },
  { label: 'BLOG',    href: '/blog',     arrow: '·' },
  { label: 'CONTACT', href: '/contact',  arrow: '·' },
]

export default function Nav() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav
      className="col col-1"
      role="navigation"
      aria-label="Site navigation"
    >
      {/* Brand */}
      <Link href="/" className="nav-brand" id="nav-brand">
        C:\BOOLU\ART\&gt;
      </Link>

      {/* Tree nav */}
      <ul className="nav-list" role="list">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href)
          let label = item.label;
          if (item.label === 'PROJECTS') label = 'PROJECTS.EXE';
          else if (item.label === 'ABOUT') label = 'ABOUT.SYS';
          else if (item.label === 'BLOG') label = 'BLOG.TXT';
          else if (item.label === 'CONTACT') label = 'GUEST.LOG';

          return (
            <li key={item.href} className={`nav-item${active ? ' active' : ''}`}>
              <Link
                href={item.href}
                id={`nav-${item.label.toLowerCase()}`}
                aria-current={active ? 'page' : undefined}
                data-nav
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
