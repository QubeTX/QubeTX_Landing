'use client'

import { useEffect, useRef, type FC } from 'react'
import { animate, cubicBezier, utils } from '@/lib/motion/anime'
import { useInViewOnce } from '@/lib/motion/useInViewOnce'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import styles from './EaseCurve.module.css'

export type CurveSpec =
  | { kind: 'bezier'; params: [number, number, number, number] }
  | { kind: 'pow'; power: number }

type EaseCurveProps = {
  /** Token / role name ("EASE — the house curve"). */
  name: string
  /** The notation line ("cubic-bezier(0.25, 1, 0.5, 1)"). */
  notation: string
  curve: CurveSpec
  /** ms for the demo run. */
  duration?: number
}

const W = 200
const H = 120
const PAD_X = 10
const PAD_TOP = 30 // overshoot headroom (the slot curve peaks ~1.1)
const PAD_BOTTOM = 14

const toX = (t: number) => PAD_X + t * (W - PAD_X * 2)
const toY = (v: number) => H - PAD_BOTTOM - v * (H - PAD_TOP - PAD_BOTTOM)

function curvePath(curve: CurveSpec): string {
  if (curve.kind === 'bezier') {
    const [x1, y1, x2, y2] = curve.params
    return `M ${toX(0)} ${toY(0)} C ${toX(x1)} ${toY(y1)}, ${toX(x2)} ${toY(y2)}, ${toX(1)} ${toY(1)}`
  }
  const points: string[] = []
  for (let i = 0; i <= 32; i++) {
    const t = i / 32
    const v = 1 - (1 - t) ** curve.power
    points.push(`${i === 0 ? 'M' : 'L'} ${toX(t)} ${toY(v)}`)
  }
  return points.join(' ')
}

/**
 * Live easing visualizer: the curve as geometry plus the curve as FEEL —
 * a dot rides (time, eased value) along the plot while a block translates
 * with the eased value alone. Plays once in view; click replays. The demo
 * runs on the real anime engine through the seam, so what you see is what
 * ships. Reduced motion: static end state.
 */
const EaseCurve: FC<EaseCurveProps> = ({ name, notation, curve, duration = 1100 }) => {
  const dotRef = useRef<SVGCircleElement | null>(null)
  const blockRef = useRef<HTMLSpanElement | null>(null)
  const laneRef = useRef<HTMLSpanElement | null>(null)
  const stateRef = useRef({ t: 0, v: 0 })
  const reduced = useMotionPreference()
  const [inViewRef, inView] = useInViewOnce<HTMLButtonElement>({ threshold: 0.4 })

  const play = () => {
    if (reduced) return
    const state = stateRef.current
    utils.remove(state)
    state.t = 0
    state.v = 0
    // Travel in px: translateX(%) would resolve against the 22px block
    const travel = laneRef.current ? laneRef.current.offsetWidth : 0
    const ease = curve.kind === 'bezier' ? cubicBezier(...curve.params) : `out(${curve.power})`
    animate(state, {
      t: { to: 1, ease: 'linear' },
      v: { to: 1, ease },
      duration,
      onUpdate: () => {
        if (dotRef.current) {
          dotRef.current.setAttribute('cx', String(toX(state.t)))
          dotRef.current.setAttribute('cy', String(toY(state.v)))
        }
        if (blockRef.current) {
          blockRef.current.style.transform = `translateX(${state.v * travel}px)`
        }
      },
    })
  }

  useEffect(() => {
    const state = stateRef.current
    if (!inView) return
    if (reduced) {
      // Final state, no run
      if (dotRef.current) {
        dotRef.current.setAttribute('cx', String(toX(1)))
        dotRef.current.setAttribute('cy', String(toY(1)))
      }
      if (blockRef.current && laneRef.current) {
        blockRef.current.style.transform = `translateX(${laneRef.current.offsetWidth}px)`
      }
      return
    }
    play()
    return () => {
      utils.remove(state)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced])

  return (
    // Accessible name = the visible content (aria-label would mismatch);
    // the replay affordance is announced by the sr-only suffix.
    <button type="button" ref={inViewRef} className={styles.card} onClick={play}>
      <div className={styles.name}>
        {name}
        <span className="sr-only"> — activate to replay the easing demo</span>
      </div>
      <svg className={styles.plot} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <line x1={toX(0)} y1={toY(0)} x2={toX(1)} y2={toY(0)} className={styles.axis} />
        <line x1={toX(0)} y1={toY(1)} x2={toX(1)} y2={toY(1)} className={styles.axisFaint} />
        <path d={curvePath(curve)} className={styles.curve} />
        <circle ref={dotRef} cx={toX(0)} cy={toY(0)} r="4" className={styles.dot} />
      </svg>
      <div className={styles.track} aria-hidden="true">
        <span ref={laneRef} className={styles.blockLane}>
          <span ref={blockRef} className={styles.block} />
        </span>
      </div>
      <div className={styles.notation}>{notation}</div>
    </button>
  )
}

export default EaseCurve
