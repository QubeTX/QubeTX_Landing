'use client'

import { useRef, useState, type FC } from 'react'
import { decode } from '@/lib/motion/decode'
import { RevealText } from '@/lib/motion/RevealText'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import RollingLabel from '@/components/ui/RollingLink'
import styles from './TextMotionDemos.module.css'

/** §19's live specimens. */

export const DecodeDemo: FC = () => {
  const lineRef = useRef<HTMLSpanElement | null>(null)
  const reduced = useMotionPreference()

  const replay = () => {
    if (!reduced && lineRef.current) decode(lineRef.current, 450)
  }

  return (
    <div className={styles.row}>
      <span ref={lineRef} className={styles.decodeLine}>
        Web Development &amp; Digital Infrastructure
      </span>
      <button type="button" className={styles.replay} onClick={replay} data-interactive="true">
        Decode
      </button>
      <p className={styles.hint}>
        → <code>decode(el, 450)</code>: glyphs scramble and resolve left → right. Used on
        eyebrows, section pills, and stat labels — anywhere a label should feel freshly verified.
      </p>
    </div>
  )
}

export const RevealDemo: FC = () => {
  const [run, setRun] = useState(0)

  return (
    <div className={styles.row}>
      <div className={styles.revealStage}>
        <RevealText
          key={run}
          text="Detail is the product."
          as="div"
          mode="words"
          className={styles.revealSample}
          threshold={0.2}
        />
      </div>
      <button
        type="button"
        className={styles.replay}
        onClick={() => setRun((n) => n + 1)}
        data-interactive="true"
      >
        Replay
      </button>
      <p className={styles.hint}>
        → <code>&lt;RevealText mode=&quot;words&quot;&gt;</code>: server HTML is the visible
        sentence; client masks it and rises word-by-word on first view (STAGGER_MS.words). The
        replay remounts — production reveals fire once.
      </p>
    </div>
  )
}

export const LetterRollDemo: FC = () => (
  <div className={styles.row}>
    <a href="#text-motion" className={styles.rollLink}>
      <RollingLabel text="Stacked-copy letter roll" />
    </a>
    <span className={styles.hint} style={{ flexBasis: '100%' }}>
      → Two stacked copies per character in an overflow mask; hover rolls the stack −100%,
      staggered 18ms L→R (anime <code>out(4)</code>). Footer links and dense link lists.
    </span>
  </div>
)
