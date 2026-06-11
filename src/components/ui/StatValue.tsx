'use client'

import { useEffect, useRef, type FC } from 'react'
import { animate } from '@/lib/motion/anime'
import { useInViewOnce } from '@/lib/motion/useInViewOnce'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import styles from './StatValue.module.css'

type StatValueProps = {
  /** e.g. "07", "100%" — numeric part counts up, formatting preserved */
  value: string
  label: string
}

/** About-section stat: Makira Black numeral counts up on first view. */
const StatValue: FC<StatValueProps> = ({ value, label }) => {
  const numRef = useRef<HTMLSpanElement | null>(null)
  const ranRef = useRef(false)
  const reduced = useMotionPreference()
  const [inViewRef, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.6 })

  useEffect(() => {
    if (!inView || ranRef.current) return
    ranRef.current = true
    const el = numRef.current
    if (!el || reduced) return

    const match = value.match(/^(\D*)(\d+)(\D*)$/)
    if (!match) return
    const [, prefix, digits, suffix] = match
    const target = parseInt(digits, 10)
    const pad = digits.length
    const counter = { n: 0 }

    animate(counter, {
      n: target,
      duration: 1200,
      ease: 'out(3)',
      onUpdate: () => {
        el.textContent = `${prefix}${String(Math.round(counter.n)).padStart(pad, '0')}${suffix}`
      },
      onComplete: () => {
        el.textContent = value
      },
    })
  }, [inView, reduced, value])

  return (
    <div ref={inViewRef} className={styles.stat}>
      <span ref={numRef} className={styles.value}>
        {value}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default StatValue
