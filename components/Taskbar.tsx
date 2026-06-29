'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

export default function Taskbar() {
  const pathname = usePathname()
  const { toggle } = useTheme()
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const pageLabel =
    pathname.includes('/about') ? 'ABOUT.SYS'
    : pathname.includes('/projects') ? 'PROJECTS.EXE'
    : pathname.includes('/blog') ? 'BLOG.TXT'
    : pathname.includes('/contact') ? 'GUEST.LOG'
    : 'BOOLU.ART'

  return (
    <div className="taskbar">
      <button className="start-btn">
        <span style={{ marginRight: 4 }}>▓</span> Start
      </button>
      <div className="taskbar-separator" />
      <div className="taskbar-apps">
        <button className="taskbar-app active">
          📁 {pageLabel}
        </button>
      </div>
      <div className="taskbar-tray">
        <button className="taskbar-clock" onClick={toggle} title="Toggle theme">
          {time}
        </button>
      </div>
    </div>
  )
}
