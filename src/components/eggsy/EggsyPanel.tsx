'use client'

import { useEffect, useRef, type FC, type PointerEvent } from 'react'
import { motion } from 'framer-motion'
import DotGrid, { firePulse } from '@/components/effects/DotGrid'
import { animate, stagger, utils } from '@/lib/motion/anime'
import { useSlotRoll } from '@/lib/motion/SlotRoll'
import { prefersReducedMotion } from '@/lib/motion/useMotionPreference'
import { EGGS, buildEggKeyText, EGG_KEY_FILENAME } from '@/data/eggKey'
import styles from './EggsyPanel.module.css'

const BOOT_LINE = '$ qubetx --eggs --decrypt'
const RESTING = 'Download the egg key'
const SAVED = 'Egg key saved'

/**
 * /eggsy — a no-scroll "decrypted dossier" that hands over the easter-egg key.
 * Reuses the brand DotGrid field, the Quiver-generated cube-egg centerpiece,
 * and the house slot-roll flash on the download control. The download is a
 * client-side Blob (static export = no server), built from the shared EGGS
 * data so it can never drift from the on-page table.
 */
const EggsyPanel: FC = () => {
  const bootRef = useRef<HTMLSpanElement | null>(null)
  const artRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const [rollRef, roll] = useSlotRoll(RESTING, { color: null })

  // Arrival choreography: type the boot line, draw the art up, beat the field.
  useEffect(() => {
    if (prefersReducedMotion()) return

    const chars = bootRef.current?.querySelectorAll<HTMLElement>('[data-boot-char]')
    if (chars?.length) {
      utils.set(chars, { opacity: 0 })
      animate(chars, { opacity: 1, duration: 30, delay: stagger(34) })
    }

    if (artRef.current) {
      utils.set(artRef.current, { opacity: 0, scale: 0.72 })
      animate(artRef.current, {
        opacity: [0, 1],
        scale: [0.72, 1],
        duration: 1100,
        ease: 'out(4)',
      })
    }

    const beat = window.setTimeout(() => {
      firePulse({ x: window.innerWidth / 2, y: window.innerHeight / 2, strength: 2.2 })
    }, 420)
    return () => window.clearTimeout(beat)
  }, [])

  const onDownload = () => {
    const blob = new Blob([buildEggKeyText()], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = EGG_KEY_FILENAME
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)

    roll.flash(SAVED)
    const r = btnRef.current?.getBoundingClientRect()
    if (r) firePulse({ x: r.left + r.width / 2, y: r.top + r.height / 2, strength: 1.8 })
  }

  // The slot roll owns the label node's children; guard against double-roll.
  const onEnter = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
  }

  return (
    <main className={styles.root}>
      <DotGrid className={styles.dots} />

      <section className={styles.panel} aria-labelledby="eggsy-title">
        <span className={styles.boot} ref={bootRef} aria-hidden="true">
          {BOOT_LINE.split('').map((ch, i) => (
            <span key={i} data-boot-char>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
          <span className={styles.cursor}>▮</span>
        </span>

        <div className={styles.art} ref={artRef} aria-hidden="true">
          {/* Quiver-generated (arrow-1.1-max): wireframe cube cracking open
              like an egg, glowing core. Rendered as an <img> so it scales and
              takes the CSS bloom; decorative, hence empty alt. */}
          <img src="/eggsy-cube.svg" alt="" width={320} height={344} draggable={false} />
        </div>

        <p className={styles.kicker}>Classified // egg key</p>
        <h1 className={styles.title} id="eggsy-title">
          You found the key.
        </h1>
        <p className={styles.sub}>
          {EGGS.length} easter eggs are hidden across this site. Here&rsquo;s exactly how to set
          each one off.
        </p>

        <ul className={styles.table}>
          {EGGS.map((egg) => (
            <li key={egg.n} className={styles.row}>
              <span className={styles.num}>{egg.n}</span>
              <span className={styles.eggName}>{egg.name}</span>
              <span className={styles.trigger}>{egg.trigger}</span>
            </li>
          ))}
        </ul>

        <motion.button
          type="button"
          ref={btnRef}
          className={styles.download}
          data-interactive="true"
          onClick={onDownload}
          onPointerEnter={onEnter}
          whileTap={{ scaleX: 1.03, scaleY: 0.93 }}
          transition={{ type: 'spring', stiffness: 600, damping: 18 }}
        >
          <span className={styles.labelText}>
            <span ref={rollRef} className={styles.labelRoll}>
              {RESTING}
            </span>
            <span className={styles.labelSizer} aria-hidden="true">
              {RESTING}
            </span>
            <span className={styles.labelSizer} aria-hidden="true">
              {SAVED}
            </span>
          </span>
          <span className={styles.dl} aria-hidden="true">
            ↓
          </span>
        </motion.button>

        <p className={styles.breadcrumb} title="…the old codes still work" aria-hidden="true">
          ↑↑↓↓←→←→BA
        </p>
      </section>
    </main>
  )
}

export default EggsyPanel
