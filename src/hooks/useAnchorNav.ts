'use client'

import { useCallback } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Smooth-scrolls to an in-page anchor through Lenis (the single scroll
 * driver — CSS scroll-behavior is intentionally absent). Links keep their
 * real href for no-JS/a11y; call this from onClick and preventDefault when
 * it returns true.
 */
export function useAnchorNav(offset = -88) {
  const lenis = useLenis()

  return useCallback(
    (href: string): boolean => {
      if (!href.startsWith('#')) return false
      const el = document.querySelector<HTMLElement>(href)
      if (!el) return false

      if (lenis) {
        lenis.scrollTo(href, { offset })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      history.replaceState(null, '', href)

      // Keyboard/SR users: focus must travel with the scroll, or the next
      // Tab resumes from the trigger. preventScroll — the engine above owns
      // the scroll; native focus-scroll would fight it.
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
      return true
    },
    [lenis, offset]
  )
}
