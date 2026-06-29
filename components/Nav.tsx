'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/nav-items'

export default function Nav() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <div className="file-pane">
      <div className="file-pane-titlebar">
        <span className="window-icon">📁</span>
        C:\BOOLU\ART
        <div className="window-controls" style={{ marginLeft: 'auto' }}>
          <button className="win-btn" aria-label="Minimize">_</button>
          <button className="win-btn" aria-label="Maximize">□</button>
          <button className="win-btn win-btn-close" aria-label="Close">✕</button>
        </div>
      </div>
<div className="file-tree-container">
        <div className="tree-root-label">📁 BOOLU.ART</div>
        <div className="file-tree">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div className={`tree-item${isActive(item.href) ? ' active' : ''}`} data-nav>
                <span className="tree-indent">├─</span>
                <span className="tree-icon">{item.icon}</span>
                <span className="tree-label">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="file-pane-statusbar">
        <div className="status-cell">4 objects</div>
      </div>
    </div>
  )
}
