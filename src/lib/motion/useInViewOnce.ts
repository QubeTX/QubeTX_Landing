'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type InViewOptions = {
  threshold?: number
  rootMargin?: string
}

/**
 * The one scroll trigger for the motion system: IntersectionObserver,
 * fires once, then disconnects.
 *
 * IO is the sanctioned trigger because Lenis scrolls the window natively
 * (so IO fires correctly) and ResizeObserver is banned codebase-wide.
 * Degrades to immediately-in-view when IO is unavailable.
 */
export function useInViewOnce<T extends Element>(
  options: InViewOptions = {}
): [(node: T | null) => void, boolean] {
  const { threshold = 0, rootMargin = '0px' } = options
  // No IO available (very old browsers) → degrade to immediately in view
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined'
  )
  const nodeRef = useRef<T | null>(null)

  const refCallback = useCallback((node: T | null) => {
    nodeRef.current = node
  }, [])

  useEffect(() => {
    if (inView) return
    const node = nodeRef.current
    if (!node) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [inView, threshold, rootMargin])

  return [refCallback, inView]
}
