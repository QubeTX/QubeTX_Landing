'use client'

import { useEffect, useRef, type FC } from 'react'
import { animateSlotText, buildSlotText, clearSlotText } from '@/lib/motion/slotText'
import { decode } from '@/lib/motion/decode'
import { useInViewOnce } from '@/lib/motion/useInViewOnce'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import styles from './StatValue.module.css'

type StatValueProps = {
  /** e.g. "07", "100%" — digits roll, prefix/suffix formatting preserved */
  value: string
  label: string
}

/**
 * About-section stat. The Makira Black numeral slot-machines on first view —
 * a few scrambled quiet rolls landing on the real value with the arrival-blue
 * flash. Hovering "re-verifies" it: a shorter scramble back to the same
 * value while the label scramble-decodes (terminal flavor, repeatable).
 */
const StatValue: FC<StatValueProps> = ({ value, label }) => {
  const numRef = useRef<HTMLSpanElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const ranRef = useRef(false)
  const rollingRef = useRef(false)
  const timersRef = useRef<number[]>([])
  const reduced = useMotionPreference()
  const [inViewRef, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.6 })

  /** Slot-machine: `steps` scrambled same-shape values, then the real one. */
  const roll = (steps: number, stepMs: number) => {
    const el = numRef.current
    if (!el || rollingRef.current) return
    const match = value.match(/^(\D*)(\d+)(\D*)$/)
    if (!match) return
    const [, prefix, digits, suffix] = match
    rollingRef.current = true
    if (!el.querySelector('[data-slot-cell]')) buildSlotText(el, value)

    // Same digit count, never the target, never a repeat of the last step.
    let last = digits
    const scramble = () => {
      let next = last
      while (next === last || next === digits) {
        next = Array.from(digits, () => String(Math.floor(Math.random() * 10))).join('')
      }
      last = next
      return next
    }

    for (let i = 0; i < steps; i++) {
      timersRef.current.push(
        window.setTimeout(() => {
          animateSlotText(el, `${prefix}${scramble()}${suffix}`, {
            direction: 'up',
            color: null, // quiet intermediates — the blue is saved for the landing
            duration: 200,
            stagger: 30,
          })
        }, i * stepMs)
      )
    }
    // The landing: default options — arrival blue settling into the gradient.
    timersRef.current.push(
      window.setTimeout(() => {
        animateSlotText(el, value, { direction: 'up' })
      }, steps * stepMs)
    )
    timersRef.current.push(
      window.setTimeout(() => {
        rollingRef.current = false
      }, steps * stepMs + 700) // landing roll + color fade + safety net
    )
  }

  useEffect(() => {
    if (!inView || ranRef.current) return
    ranRef.current = true
    if (!reduced) roll(3, 300) // ~1.2s — the old count-up's budget
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced])

  // Unmount: clear sequence timers, settle the engine, restore plain text.
  useEffect(() => {
    const el = numRef.current
    const timers = timersRef.current
    return () => {
      timers.forEach((t) => window.clearTimeout(t))
      if (el) clearSlotText(el, value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onReverify = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced) return
    roll(2, 260)
    if (labelRef.current) decode(labelRef.current, 320)
  }

  return (
    <div ref={inViewRef} className={styles.stat} onPointerEnter={onReverify}>
      <span ref={numRef} className={styles.value}>
        {value}
      </span>
      <span ref={labelRef} className={styles.label}>
        {label}
      </span>
    </div>
  )
}

export default StatValue
