'use client'

import React, { useEffect, useState, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hasInteractedState, setHasInteracted] = useState(false)
  const hasInteracted = hasInteractedState || pathname !== '/'
  const [activeCol, setActiveCol] = useState<number>(1)
  const isKeyboardNav = useRef(false)

  useEffect(() => {
    if (!isKeyboardNav.current) return

    const items = Array.from(document.querySelectorAll(`.col-${activeCol} [data-nav]`)) as HTMLElement[]

    document.querySelectorAll('.kbd-focus').forEach(el => {
      if (!el.closest(`.col-${activeCol}`)) el.classList.remove('kbd-focus')
    })

    if (items.length > 0) {
      const hasFocus = items.some(el => el.classList.contains('kbd-focus'))
      if (!hasFocus) {
        const target = items.find(el => el.classList.contains('active') || el.closest('.active')) || items[0]
        target.classList.add('kbd-focus')
        target.focus()
      } else {
        const focused = items.find(el => el.classList.contains('kbd-focus'))
        if (focused && document.activeElement !== focused) focused.focus()
      }
    }
  }, [activeCol, pathname, searchParams])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return

      const keys = ['ArrowUp', 'ArrowDown', 'w', 'W', 's', 'S', 'ArrowRight', 'd', 'D', 'Enter', 'ArrowLeft', 'a', 'A']
      if (!keys.includes(e.key)) return

      e.preventDefault()
      isKeyboardNav.current = true
      if (!hasInteracted) setHasInteracted(true)

      const items = Array.from(document.querySelectorAll(`.col-${activeCol} [data-nav]`)) as HTMLElement[]
      const currentIndex = items.findIndex(el => el.classList.contains('kbd-focus'))

      const k = e.key
      let isUp    = k === 'ArrowUp'    || k === 'w' || k === 'W'
      let isDown  = k === 'ArrowDown'  || k === 's' || k === 'S'
      let isRight = k === 'ArrowRight' || k === 'd' || k === 'D' || k === 'Enter'
      let isLeft  = k === 'ArrowLeft'  || k === 'a' || k === 'A'

      if (window.innerWidth <= 883) {
        if (activeCol === 1) {
          ;[isUp, isDown, isRight, isLeft] = [
            k === 'ArrowLeft'  || k === 'a' || k === 'A',
            k === 'ArrowRight' || k === 'd' || k === 'D',
            isDown || k === 'Enter',
            isUp,
          ]
        } else if (activeCol > 1 && isUp && currentIndex === 0) {
          isLeft = true; isUp = false
        }
      }

      if (isUp) {
        if (items.length > 0 && currentIndex > 0) {
          items.forEach(el => el.classList.remove('kbd-focus'))
          items[currentIndex - 1].classList.add('kbd-focus')
          items[currentIndex - 1].focus()
        }
      } else if (isDown) {
        if (items.length > 0 && currentIndex < items.length - 1) {
          items.forEach(el => el.classList.remove('kbd-focus'))
          items[currentIndex + 1].classList.add('kbd-focus')
          items[currentIndex + 1].focus()
        }
      } else if (isRight) {
        const currentItem = items[currentIndex]
        if (currentItem) {
          currentItem.classList.add('blink')
          setTimeout(() => currentItem.classList.remove('blink'), 200)
          currentItem.click()
          
          if (activeCol < 2) {
            setActiveCol(activeCol + 1)
          }
        }
      } else if (isLeft) {
        if (activeCol > 1) {
          setActiveCol(activeCol - 1)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCol, hasInteracted])

  const handleClick = (e: React.MouseEvent) => {
    // Ignore programmatic/keyboard simulated clicks
    if (e.detail === 0) return

    if (!hasInteracted) setHasInteracted(true)
    isKeyboardNav.current = false
    
    const target = e.target as HTMLElement
    const col1 = target.closest('.col-1')
    const col2 = target.closest('.col-2')
    const col3 = target.closest('.col-3')
    const navItem = target.closest('[data-nav]') as HTMLElement

    if (col3) setActiveCol(3)
    else if (col2) setActiveCol(2)
    else if (col1) setActiveCol(1)

    if (navItem) {
      document.querySelectorAll('.kbd-focus').forEach(el => el.classList.remove('kbd-focus'))
      navItem.classList.add('kbd-focus')
      navItem.classList.add('blink')
      setTimeout(() => navItem.classList.remove('blink'), 200)
    }
  }

  return (
    <div 
      className={`shell ${!hasInteracted ? 'no-interaction' : 'has-interaction'} active-col-${activeCol}`} 
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
