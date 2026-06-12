'use client'

import { useRef, useState, type FC } from 'react'
import { useSlotRoll } from '@/lib/motion/SlotRoll'
import styles from './SlotRollDemos.module.css'

/** §17's live specimens — each panel drives the engine a different way. */

export const FlashDemo: FC = () => {
  const [labelRef, label] = useSlotRoll('Copy summary')
  const [quietRef, quiet] = useSlotRoll('Save draft', { color: null })
  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.primary}
        onClick={() => label.flash('Copied')}
        data-interactive="true"
      >
        <span ref={labelRef} className={styles.labelStack}>
          Copy summary
        </span>
      </button>
      <button
        type="button"
        className={styles.secondary}
        onClick={() => quiet.flash('Saved')}
        data-interactive="true"
      >
        <span ref={quietRef} className={styles.labelStack}>
          Save draft
        </span>
      </button>
      <p className={styles.hint}>
        → <code>label.flash(&apos;Copied&apos;)</code> rolls there and back on its own. Spam the
        buttons — flashes coalesce, nothing stutters. The left roll arrives blue; the right is the
        quiet ink-only variant.
      </p>
    </div>
  )
}

const MONTHS = ['April 2026', 'May 2026', 'June 2026', 'July 2026']

export const PeriodDemo: FC = () => {
  const at = useRef(0)
  const [labelRef, label] = useSlotRoll(MONTHS[0])

  const step = (dir: 1 | -1) => {
    at.current = (at.current + dir + MONTHS.length) % MONTHS.length
    label.set(MONTHS[at.current], { direction: dir === 1 ? 'up' : 'down' })
  }

  return (
    <div className={styles.row}>
      <button type="button" className={styles.chev} onClick={() => step(-1)} aria-label="Previous period" data-interactive="true">
        ‹
      </button>
      <span ref={labelRef} className={styles.period}>
        April 2026
      </span>
      <button type="button" className={styles.chev} onClick={() => step(1)} aria-label="Next period" data-interactive="true">
        ›
      </button>
      <p className={styles.hint}>
        → Forward rolls <code>up</code>, back rolls <code>down</code> — the glyphs move the way
        the data moves. <code>skipUnchanged</code> keeps &quot;2026&quot; perfectly still.
      </p>
    </div>
  )
}

export const CounterDemo: FC = () => {
  const value = useRef(2847210)
  const [numRef, num] = useSlotRoll('$2,847,210')

  const tick = () => {
    value.current += Math.floor(Math.random() * 9000) - 3000
    num.set(`$${value.current.toLocaleString('en-US')}`, { direction: 'up' })
  }

  return (
    <div className={styles.row}>
      <span ref={numRef} className={styles.counter}>
        $2,847,210
      </span>
      <button type="button" className={styles.secondary} onClick={tick} data-interactive="true">
        Post a transaction
      </button>
      <p className={styles.hint}>
        → A live value rolls only the digits that changed — a 7-digit figure moving by hundreds
        rolls two or three cells, never the whole number.
      </p>
    </div>
  )
}

export const InterruptDemo: FC = () => {
  const [mode, setMode] = useState<'interrupt' | 'queue'>('interrupt')
  const [labelRef, label] = useSlotRoll('Ready')
  const flip = useRef(false)

  const fire = () => {
    flip.current = !flip.current
    label.set(flip.current ? 'Syncing' : 'Ready', {
      interrupt: mode === 'interrupt',
      color: null,
    })
  }

  return (
    <div className={styles.row}>
      <span ref={labelRef} className={styles.period}>
        Ready
      </span>
      <button type="button" className={styles.secondary} onClick={fire} data-interactive="true">
        Toggle state fast
      </button>
      <label className={styles.modeSwitch}>
        <input
          type="checkbox"
          checked={mode === 'queue'}
          onChange={(e) => setMode(e.target.checked ? 'queue' : 'interrupt')}
        />
        <span>interrupt: false (queue + coalesce)</span>
      </label>
      <p className={styles.hint}>
        → Default <code>interrupt: true</code> fast-forwards a running roll; <code>false</code>{' '}
        lets it finish and replays only the LATEST request. Either way a label never shows two
        values at once.
      </p>
    </div>
  )
}
