'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const NAV_ITEMS = [
  { label: 'ABOUT.SYS',    href: '/about' },
  { label: 'PROJECTS.EXE', href: '/projects' },
  { label: 'BLOG.TXT',     href: '/blog' },
  { label: 'GUEST.LOG',    href: '/contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav className="col col-1" role="navigation" aria-label="Site navigation">
      <Link href="/" className="nav-brand" id="nav-brand">
        C:\BOOLU\ART&gt;
      </Link>

      <ul className="nav-list" role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className={`nav-item${isActive(item.href) ? ' active' : ''}`}>
            <Link
              href={item.href}
              id={`nav-${item.href.slice(1)}`}
              aria-current={isActive(item.href) ? 'page' : undefined}
              data-nav
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="theme-toggle">
        <button onClick={toggle} data-nav aria-label="Toggle theme">
          {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
        </button>
      </div>
    </nav>
  )
}
