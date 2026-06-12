'use client'

import { useRef, type FC } from 'react'
import DotGrid, { firePulse } from '@/components/effects/DotGrid'
import MatrixDisplay from '@/components/effects/MatrixDisplay'
import styles from './DotFieldDemo.module.css'

/**
 * §19's live field — a container-sized DotGrid (the production component;
 * move the pointer across it for the wave ripples) plus a pulse trigger on
 * the qubetx:pulse bus, and the LED matrix board.
 */
export const FieldDemo: FC = () => {
  const stageRef = useRef<HTMLDivElement | null>(null)

  const pulse = () => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    firePulse({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      strength: 1.6,
    })
  }

  return (
    <div className={styles.wrap}>
      <div ref={stageRef} className={styles.stage}>
        <DotGrid className={styles.field} entrance={false} />
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.pulseBtn} onClick={pulse} data-interactive="true">
          firePulse(center)
        </button>
        <p className={styles.hint}>
          → Move the pointer across the field: each move spawns a <strong>wave object</strong>{' '}
          (~0.2ms) the blitter evaluates per frame. The button broadcasts on the{' '}
          <code>qubetx:pulse</code> CustomEvent bus — radius ∞, the whole field swells.
        </p>
      </div>
    </div>
  )
}

export const MatrixDemo: FC = () => (
  <div className={styles.matrixWrap}>
    <MatrixDisplay words={['QUBETX', 'BUILD', 'SHIP', 'SECURE', 'SCALE']} className={styles.matrix} />
  </div>
)
