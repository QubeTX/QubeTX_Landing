'use client'

import { useEffect, type RefObject } from 'react'
import { createBrandScrollbar, type BrandScrollbarOptions } from './brandScrollbar'
import { subscribe as subscribeResize } from '@/lib/pretext/resizeCoordinator'

/**
 * React wrapper for the brand scrollbar overlay (Layer 2). Attaches the engine
 * to a scroll element on mount, re-measures through the shared resizeCoordinator
 * (never a ResizeObserver — Pretext law), and tears down on unmount.
 *
 * The scroll element MUST have a positioned parent (the engine overlays the
 * rail onto it). Reduced motion renders the rail statically — handled inside
 * the engine.
 *
 * USAGE
 *   const ref = useRef<HTMLDivElement>(null)
 *   useBrandScrollbar(ref, { ticks: true, readout: true, autoHide: false })
 *   return (
 *     <div className="host">                   // positioned parent
 *       <div ref={ref} className="scroll">…</div>
 *     </div>
 *   )
 */
export function useBrandScrollbar(
  ref: RefObject<HTMLElement | null>,
  options: BrandScrollbarOptions = {}
) {
  const { ticks = false, readout = false, autoHide = true, width = 14, idle = 1300, rest = 0.26 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const sb = createBrandScrollbar(el, { ticks, readout, autoHide, width, idle, rest })
    const unsubscribe = subscribeResize(sb.refresh)
    return () => {
      unsubscribe()
      sb.destroy()
    }
  }, [ref, ticks, readout, autoHide, width, idle, rest])
}
