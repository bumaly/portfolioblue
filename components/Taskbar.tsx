'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { NAV_ITEMS } from '@/lib/nav-items'

export default function Taskbar() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const pageLabel = NAV_ITEMS.find(i => pathname.startsWith(i.href))?.label ?? 'BOOLU.ART'

  return (
    <div className="taskbar">
      <button className="start-btn" onClick={toggle} title="Toggle dark/light mode">
        <span style={{ marginRight: 4 }}>▓</span> {theme === 'dark' ? '☀ Light' : '☾ Dark'}
      </button>
      <div className="taskbar-separator" />
      <div className="taskbar-apps">
        <button className="taskbar-app active">
          📁 {pageLabel}
        </button>
      </div>
      <div className="taskbar-tray">
        <button className="taskbar-clock">
          {time}
        </button>
      </div>
    </div>
  )
}
