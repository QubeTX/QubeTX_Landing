'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { createTimeline, svg as animeSvg, utils } from '@/lib/motion/anime'
import { buildTrace } from '@/lib/motion/scrollTracePath'
import { prefersReducedMotion } from '@/lib/motion/useMotionPreference'

/**
 * §20's live specimen: a miniature ScrollTrace scrubbed by its own transit
 * through the viewport — the paused drawable timeline seeks from how far
 * the panel has traveled, so the circuit draws scrolling down and reverses
 * scrolling up (the scrub pattern demonstrating itself, left-gutter lane
 * and junction cubes included). Geometry is pure buildTrace(); the server
 * renders the complete final-state SVG.
 */

const W = 460
const H = 420
const PAD = 14
const GUTTER_X = 40
const TL_DURATION = 1000

export default function TraceDemo() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null)
  const lenis = useLenis()

  const geo = useMemo(
    () =>
      buildTrace({
        junctions: [120, 240, 350],
        startY: PAD,
        endY: H - PAD,
        gutterX: GUTTER_X,
        amplitude: 14,
        cubeR: 9,
      }),
    []
  )

  // Seek from the panel's viewport transit: 0 as its top enters from below,
  // 1 as its bottom leaves above — bidirectional for free.
  const seek = () => {
    const tl = tlRef.current
    const el = svgRef.current
    if (!tl || !el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)))
    tl.seek(progress * TL_DURATION)
  }

  // The paused timeline — the exact ScrollTrace build, at demo scale.
  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl || !geo.d) return

    const main = svgEl.querySelector<SVGPathElement>('[data-demo-trace]')
    if (!main) return
    const cubeGroups = Array.from(svgEl.querySelectorAll<SVGGElement>('[data-demo-cube]'))

    if (prefersReducedMotion()) {
      utils.set([main, ...cubeGroups.flatMap((g) => Array.from(g.children))], { opacity: 0.6 })
      return
    }

    const [drawable] = animeSvg.createDrawable(main)
    const tl = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    tl.add(drawable, { draw: ['0 0', '0 1'], duration: TL_DURATION }, 0)
    for (const group of cubeGroups) {
      const at = Number(group.dataset.demoCube) * TL_DURATION
      const drawables = Array.from(group.querySelectorAll('path')).flatMap((edge) =>
        animeSvg.createDrawable(edge)
      )
      tl.add(drawables, { draw: ['0 0', '0 1'], duration: 40 }, Math.max(0, at - 20))
    }
    tlRef.current = tl
    seek()

    return () => {
      tl.pause()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo])

  useLenis(() => seek())

  useEffect(() => {
    if (lenis) return // Lenis callback above is driving
    const onScroll = () => seek()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, geo])

  const labelY = (at: number) => PAD + at * (H - PAD * 2)

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', maxWidth: W }}
    >
      <defs>
        <linearGradient
          id="trace-demo-gradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#0066FF" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* cheap glow pass — same d, wider stroke, no filters (the law) */}
      <path d={geo.d} fill="none" stroke="#2563eb" strokeWidth={5} opacity={0.06} />
      <path
        data-demo-trace
        d={geo.d}
        fill="none"
        stroke="url(#trace-demo-gradient)"
        strokeWidth={1.5}
        opacity={0.55}
      />
      {geo.cubes.map((cube, i) => (
        <g key={i} data-demo-cube={cube.at} opacity={0.7}>
          {cube.paths.map((d, j) => (
            <path key={j} d={d} fill="none" stroke="#2563eb" strokeWidth={1.2} />
          ))}
        </g>
      ))}
      {/* ghost section markers — what the junction cubes anchor to */}
      {geo.cubes.map((cube, i) => (
        <text
          key={`label-${i}`}
          x={GUTTER_X + 28}
          y={labelY(cube.at) + 3}
          style={{
            fill: 'var(--color-text-dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            opacity: 0.7,
          }}
        >
          {`SECTION 0${i + 1}`}
        </text>
      ))}
    </svg>
  )
}
