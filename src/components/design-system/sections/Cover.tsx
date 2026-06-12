'use client'

import LabelPill from '@/components/ui/LabelPill'
import { RevealText } from '@/lib/motion/RevealText'
import { DS_DATE, DS_VERSION } from '@/data/designSystem'
import styles from './Cover.module.css'

/**
 * §00 — the cover. The page's masthead: what this document is, what version
 * of the system it describes, and the one-sentence thesis the whole site
 * argues for.
 */
export default function Cover() {
  return (
    <section id="top" data-group="Showcase" className={styles.cover}>
      <div className={styles.eyebrowRow}>
        <LabelPill variant="bar">QubeTX // Design system</LabelPill>
        <span className={styles.version} aria-hidden="true">
          V{DS_VERSION} · {DS_DATE.toUpperCase()}
        </span>
      </div>

      <h1 className={styles.title}>
        <RevealText text="The system of record." as="span" mode="words" threshold={0.2} />
      </h1>

      <p className={styles.lede}>
        Every token, component, motion primitive, and law behind qubetx.com — documented with the
        thing itself. The specimens on this page are the real components, imported live: if it
        renders here, it ships. This is the central design system for every QubeTX project from
        here on out, written for the people and the agents who will build them.
      </p>

      <dl className={styles.meta}>
        <div>
          <dt>Spec of record</dt>
          <dd>
            <code>DESIGN_SYSTEM.md</code> in the qubetx.com repo — this page renders it live
          </dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>Next.js 16 · React 19 · TypeScript · anime.js v4 · Framer Motion 12 · Lenis</dd>
        </div>
        <div>
          <dt>Kit</dt>
          <dd>Sidebar → Download kit (.zip): tokens, fonts, source modules, agent docs</dd>
        </div>
      </dl>
    </section>
  )
}
