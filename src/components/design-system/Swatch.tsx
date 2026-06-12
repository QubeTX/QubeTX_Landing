'use client'

import type { FC, PointerEvent } from 'react'
import { useRef } from 'react'
import { decode } from '@/lib/motion/decode'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import styles from './Swatch.module.css'

export type SwatchSpec = {
  /** CSS custom property name, e.g. "--color-void". */
  token: string
  /** Resolved value shown in the meta line (hex / gradient / rgba). */
  value: string
  use: string
  /** Optional contrast/constraint annotation (AA notes, "never darken"…). */
  note?: string
  /** For gradient/special chips: a CSS background override. */
  background?: string
}

type SwatchProps = { spec: SwatchSpec }

/**
 * One palette row: chip + token name (scramble-decodes on hover — terminal
 * flavor, mouse only) + value + use + constraint note.
 */
export const Swatch: FC<SwatchProps> = ({ spec }) => {
  const nameRef = useRef<HTMLSpanElement | null>(null)
  const reduced = useMotionPreference()

  const onEnter = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced || !nameRef.current) return
    decode(nameRef.current, 320)
  }

  return (
    <div className={styles.row} onPointerEnter={onEnter}>
      <span
        className={styles.chip}
        style={{ background: spec.background ?? `var(${spec.token})` }}
        aria-hidden="true"
      />
      <span ref={nameRef} className={styles.token}>
        {spec.token}
      </span>
      <span className={styles.value}>{spec.value}</span>
      <span className={styles.use}>
        {spec.use}
        {spec.note && <em className={styles.note}> — {spec.note}</em>}
      </span>
    </div>
  )
}

type SwatchRowProps = { specs: SwatchSpec[] }

export const SwatchTable: FC<SwatchRowProps> = ({ specs }) => (
  <div className={styles.table}>
    {specs.map((s) => (
      <Swatch key={s.token + s.use} spec={s} />
    ))}
  </div>
)
