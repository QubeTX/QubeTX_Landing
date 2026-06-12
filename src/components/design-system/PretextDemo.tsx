'use client'

import { useState, type FC } from 'react'
import { PretextBlock } from '@/lib/pretext'
import styles from './PretextDemo.module.css'

const SAMPLE =
  'Pretext measures this paragraph with canvas measureText before the DOM lays it out — so the height is reserved ahead of time and the last line never wraps a single orphan word alone.'

/**
 * §23's live specimen: drag the width — the paragraph is measured, its
 * height reserved, and (being left-aligned) shrinkwrapped so no orphan
 * word ever wraps alone.
 */
const PretextDemo: FC = () => {
  const [width, setWidth] = useState(420)

  return (
    <div className={styles.wrap}>
      <label className={styles.control}>
        <span>Container width — {width}px</span>
        <input
          type="range"
          min={240}
          max={640}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </label>
      <div className={styles.stage} style={{ width }}>
        {/* key remounts per width: the demo simulates distinct layouts, not
            live resize (production reflows go through resizeCoordinator) */}
        <PretextBlock
          key={width}
          text={SAMPLE}
          lineHeight={1.65}
          shrinkwrap
          as="p"
          className={styles.sample}
        >
          {SAMPLE}
        </PretextBlock>
      </div>
    </div>
  )
}

export default PretextDemo
