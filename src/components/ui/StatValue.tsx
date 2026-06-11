'use client'

import { useEffect, useRef, type FC } from 'react'
import { animate } from '@/lib/motion/anime'
import { decode } from '@/lib/motion/decode'
import { useInViewOnce } from '@/lib/motion/useInViewOnce'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import styles from './StatValue.module.css'

type StatValueProps = {
  /** e.g. "07", "100%" — numeric part counts up, formatting preserved */
  value: string
  label: string
}

/**
 * About-section stat. Makira Black numeral counts up on first view;
 * hovering "re-verifies" it — the numeral re-rolls through a fast count
 * and the label scramble-decodes (terminal flavor, repeatable).
 */
const StatValue: FC<StatValueProps> = ({ value, label }) => {
  const numRef = useRef<HTMLSpanElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const ranRef = useRef(false)
  const rollingRef = useRef(false)
  const reduced = useMotionPreference()
  const [inViewRef, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.6 })

  const roll = (duration: number) => {
    const el = numRef.current
    if (!el || rollingRef.current) return
    const match = value.match(/^(\D*)(\d+)(\D*)$/)
    if (!match) return
    const [, prefix, digits, suffix] = match
    const target = parseInt(digits, 10)
    const pad = digits.length
    const counter = { n: 0 }
    rollingRef.current = true

    animate(counter, {
      n: target,
      duration,
      ease: 'out(3)',
      onUpdate: () => {
        el.textContent = `${prefix}${String(Math.round(counter.n)).padStart(pad, '0')}${suffix}`
      },
      onComplete: () => {
        el.textContent = value
        rollingRef.current = false
      },
    })
  }

  useEffect(() => {
    if (!inView || ranRef.current) return
    ranRef.current = true
    if (!reduced) roll(1200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced])

  const onReverify = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced) return
    roll(550)
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
