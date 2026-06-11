'use client'

import { createTimeline, svg as animeSvg, stagger, utils } from '@/lib/motion/anime'
import { prefersReducedMotion } from '@/lib/motion/useMotionPreference'
import { firePulse } from '../DotGrid'

/**
 * Logo click-spam egg: 5 clicks within 2.5s and the wireframe cube
 * de-renders (strokes un-draw) then redraws itself with an elastic settle
 * and a dot-field pulse at the logo's position. Stroke drawing only —
 * never fights the SVG groups' attribute matrices.
 */
export function attachLogoRedraw(logoSvg: SVGSVGElement): () => void {
  const anchor = logoSvg.closest('a')
  if (!anchor) return () => {}

  let clicks: number[] = []
  let running = false

  const onClick = () => {
    const now = performance.now()
    clicks = clicks.filter((t) => now - t < 2500)
    clicks.push(now)
    if (clicks.length < 5 || running || prefersReducedMotion()) return
    clicks = []
    running = true

    const paths = Array.from(logoSvg.querySelectorAll('path'))
    const drawables = paths.flatMap((p) => animeSvg.createDrawable(p))

    createTimeline()
      .add(drawables, {
        draw: '0 0',
        duration: 350,
        ease: 'out(3)',
        delay: stagger(18),
      })
      .add(drawables, {
        draw: '0 1',
        duration: 900,
        ease: 'outElastic(1, .7)',
        delay: stagger(24),
      })
      .then(() => {
        running = false
        utils.set(drawables, { draw: '0 1' })
        const rect = logoSvg.getBoundingClientRect()
        firePulse({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          strength: 2,
        })
      })
  }

  anchor.addEventListener('click', onClick)
  return () => anchor.removeEventListener('click', onClick)
}
