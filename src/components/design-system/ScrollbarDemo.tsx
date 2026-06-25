'use client'

import { useRef } from 'react'
import { useBrandScrollbar } from '@/lib/motion/useBrandScrollbar'
import styles from './ScrollbarDemo.module.css'

/**
 * §22's live overlay specimen — the brand scrollbar's animated rail attached
 * to a real scroll container. `data-bs-section` / `data-bs-num` feed the
 * survey ticks; the readout reads `SEC NN · NN%` (SectionRail's convention).
 * Always-visible preset (autoHide off) so the rail reads at a glance; drag the
 * rule or scroll to drive it.
 */

const SECTIONS = [
  {
    num: '01',
    name: 'Baseline',
    title: 'Native baseline',
    body: 'The real browser bar, recolored to the QubeTX palette. The one layer that can never vanish — there is no grey default to fall back to.',
  },
  {
    num: '02',
    name: 'Overlay',
    title: 'Overlay rule',
    body: 'A slim brand-gradient rule drawn over a hidden native bar. Opt-in per surface — showcase and operational screens, never every page.',
  },
  {
    num: '03',
    name: 'Ticks',
    title: 'Survey ticks',
    body: 'Containers that mark [data-bs-section] get survey ticks. Passed ticks read ink, the active station reads blue — the same SEC NN · NN% language as this page’s rail.',
  },
  {
    num: '04',
    name: 'Degrade',
    title: 'Degrades safely',
    body: 'Tear the overlay down and the branded native bar shows through — never the grey default. The overlay is a progressive enhancement over a solid baseline.',
  },
  {
    num: '05',
    name: 'Motion',
    title: 'Reduced motion',
    body: 'Under prefers-reduced-motion the rail renders fully drawn and static — no entrance wipe, no tick growth. Skip to the final state, never a slower version.',
  },
]

export default function ScrollbarDemo() {
  const ref = useRef<HTMLDivElement>(null)
  useBrandScrollbar(ref, { ticks: true, readout: true, autoHide: false, width: 16 })

  return (
    <div className={styles.wrap}>
      <div ref={ref} className={styles.scroll}>
        {SECTIONS.map((s) => (
          <section key={s.num} data-bs-section={s.name} data-bs-num={s.num} className={styles.sec}>
            <h4>
              {s.num} · {s.title}
            </h4>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
