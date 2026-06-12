'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { createTimeline, svg as animeSvg, utils } from '@/lib/motion/anime'
import { cubePaths } from '@/lib/motion/scrollTracePath'
import { attachSlotText, type SlotTextController } from '@/lib/motion/slotText'
import { prefersReducedMotion } from '@/lib/motion/useMotionPreference'
import { subscribe as subscribeResize } from '@/lib/pretext/resizeCoordinator'
import { useActiveSection } from '@/hooks/useActiveSection'
import { DS_SECTIONS } from '@/data/designSystem'
import styles from './SectionRail.module.css'

/**
 * The rail — this page's opt-in expressive layer (the QubeTX answer to the
 * Millis Plumb Line). A vertical trace on the right edge draws with scroll
 * progress (paused timeline seek()ed from Lenis — the ScrollTrace model);
 * an isometric cube tick marks every registry section, inking as the head
 * passes it; a mono readout slot-rolls `SEC NN · PP%` plus the active
 * section's label. Hidden <1600px; reduced motion renders the trace fully
 * drawn and snaps the readout. The rail eats the system's own dog food —
 * drawable strokes, distance-free seeks, and the slot roll.
 */

const TL_DURATION = 1000
const RAIL_X = 14
const TICK_R = 5

type Tick = { id: string; num: string; label: string; fraction: number }

export default function SectionRail() {
  const pathRef = useRef<SVGPathElement | null>(null)
  const tickRefs = useRef(new Map<string, SVGGElement>())
  const lineRef = useRef<HTMLSpanElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const lineCtl = useRef<SlotTextController | null>(null)
  const labelCtl = useRef<SlotTextController | null>(null)
  const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null)
  const lastPct = useRef(-1)
  const activeRef = useRef(DS_SECTIONS[0])
  const [layout, setLayout] = useState<{ height: number; ticks: Tick[] } | null>(null)

  const ids = useMemo(() => DS_SECTIONS.map((s) => s.id), [])
  const active = useActiveSection(ids)
  const lenis = useLenis()

  // Measure: rail height from the viewport, tick fractions from the
  // document — re-measured through the shared resizeCoordinator only.
  useEffect(() => {
    const measure = () => {
      if (window.innerWidth < 1600) {
        setLayout(null)
        return
      }
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const ticks = DS_SECTIONS.map((s) => {
        const el = document.getElementById(s.id)
        const top = el ? el.getBoundingClientRect().top + window.scrollY : 0
        return {
          id: s.id,
          num: s.num,
          label: s.label,
          fraction: Math.min(1, Math.max(0, top / scrollable)),
        }
      })
      setLayout({ height: Math.max(240, window.innerHeight - 220), ticks })
    }
    measure()
    // One late pass: fonts/specimens settle heights after first paint
    const settle = window.setTimeout(measure, 1500)
    const unsubscribe = subscribeResize(measure)
    return () => {
      window.clearTimeout(settle)
      unsubscribe()
    }
  }, [])

  // The drawable trace — rebuilt whenever the layout changes.
  useEffect(() => {
    if (!layout || !pathRef.current) return
    if (prefersReducedMotion()) return // fully drawn, static

    const drawable = animeSvg.createDrawable(pathRef.current)
    const tl = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    tl.add(drawable, { draw: '0 1', duration: TL_DURATION }, 0)
    tlRef.current = tl
    return () => {
      tlRef.current = null
      utils.remove(drawable)
    }
  }, [layout])

  // Readout controllers (quiet odometer line + arrival-blue section label).
  useEffect(() => {
    if (!layout) return
    if (lineRef.current) {
      lineCtl.current = attachSlotText(lineRef.current, 'SEC 00 · 0%', {
        direction: 'up',
        duration: 120,
        stagger: 0,
        bounce: 0,
        color: null,
      })
    }
    if (labelRef.current) {
      labelCtl.current = attachSlotText(labelRef.current, DS_SECTIONS[0].label, {
        direction: 'up',
        duration: 200,
        stagger: 18,
      })
    }
    return () => {
      lineCtl.current?.destroy()
      lineCtl.current = null
      labelCtl.current?.destroy()
      labelCtl.current = null
    }
  }, [layout])

  // Active section → label roll (rare, state-driven).
  useEffect(() => {
    const meta = DS_SECTIONS.find((s) => s.id === active)
    if (!meta) return
    activeRef.current = meta
    labelCtl.current?.set(meta.label)
    lastPct.current = -1 // force the SEC line to refresh with the new number
  }, [active])

  // Scroll → seek the trace, ink the ticks, roll the readout.
  const onProgress = (progress: number) => {
    if (!layout) return
    tlRef.current?.seek(progress * TL_DURATION)
    for (const tick of layout.ticks) {
      const g = tickRefs.current.get(tick.id)
      if (!g) continue
      if (progress >= tick.fraction) g.setAttribute('data-passed', '')
      else g.removeAttribute('data-passed')
    }
    const pct = Math.round(progress * 100)
    if (pct !== lastPct.current) {
      lastPct.current = pct
      lineCtl.current?.set(`SEC ${activeRef.current.num} · ${pct}%`)
    }
  }

  useLenis((instance) => {
    onProgress(instance.progress)
  })

  useEffect(() => {
    if (lenis || !layout) return // Lenis drives; this is the native fallback
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      onProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, layout])

  if (!layout) return null
  const { height, ticks } = layout
  const reduced = prefersReducedMotion()

  return (
    <div className={styles.rail} aria-hidden="true">
      <svg
        className={styles.svg}
        width="28"
        height={height}
        viewBox={`0 0 28 ${height}`}
        fill="none"
      >
        <path className={styles.track} d={`M ${RAIL_X} 0 V ${height}`} />
        <path
          ref={pathRef}
          className={styles.trace}
          d={`M ${RAIL_X} 0 V ${height}`}
          data-static={reduced || undefined}
        />
        {ticks.map((tick) => (
          <g
            key={tick.id}
            ref={(node) => {
              if (node) tickRefs.current.set(tick.id, node)
              else tickRefs.current.delete(tick.id)
            }}
            className={styles.tick}
            data-active={active === tick.id || undefined}
          >
            {cubePaths(RAIL_X, Math.max(TICK_R + 1, tick.fraction * height), TICK_R).map(
              (d, i) => (
                <path key={i} d={d} />
              )
            )}
          </g>
        ))}
      </svg>
      <div className={styles.readout}>
        <span ref={lineRef} className={styles.line}>
          SEC 00 · 0%
        </span>
        <span ref={labelRef} className={styles.label}>
          {DS_SECTIONS[0].label}
        </span>
      </div>
    </div>
  )
}
