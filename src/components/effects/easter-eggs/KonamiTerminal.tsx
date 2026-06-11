'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { animate, stagger, utils } from '@/lib/motion/anime'
import { prefersReducedMotion } from '@/lib/motion/useMotionPreference'
import { EASE } from '@/lib/motion/tokens'
import styles from './KonamiTerminal.module.css'

type KonamiTerminalProps = {
  onClose: () => void
}

function buildReport(): { text: string; ok?: boolean }[] {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
  const cores =
    typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? '??' : '??'
  const vw = typeof window !== 'undefined' ? window.innerWidth : 0
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0
  const uptime =
    typeof performance !== 'undefined' ? (performance.now() / 1000).toFixed(1) : '0.0'
  const pointer =
    typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches
      ? 'FINE'
      : 'COARSE'

  return [
    { text: 'QUBETX TR-300 // WEB REPORT v3.0' },
    { text: '─────────────────────────────────' },
    { text: 'HOST .............. qubetx.com' },
    { text: 'OS ................ shaughvOS (web build)' },
    { text: 'FRAMEWORK ......... next@16 / react@19', ok: true },
    { text: 'RENDER ............ STATIC EXPORT', ok: true },
    { text: 'MOTION ............ animejs@4 + framer-motion@12', ok: true },
    { text: 'TEXT ENGINE ....... @chenglou/pretext', ok: true },
    { text: `CPU CORES ......... ${cores}` },
    { text: `VIEWPORT .......... ${vw}x${vh} @ ${dpr}x` },
    { text: `POINTER ........... ${pointer}` },
    { text: `UPTIME ............ ${uptime}s` },
    { text: '─────────────────────────────────' },
    { text: 'ALL SYSTEMS NOMINAL — REPORT COMPLETE', ok: true },
    { text: '> the real reports live at reports.qubetx.com' },
  ]
}

/**
 * The Konami egg: a full-screen TR-300-style terminal that boot-prints a
 * diagnostic of the site itself. ESC or the exit button closes it (CRT
 * power-off handled by the parent AnimatePresence exit).
 */
export default function KonamiTerminal({ onClose }: KonamiTerminalProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const lenis = useLenis()
  const report = useMemo(() => buildReport(), [])

  useEffect(() => {
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const lines = bodyRef.current?.querySelectorAll('[data-term-line]')
    if (lines?.length && !prefersReducedMotion()) {
      utils.set(lines, { opacity: 0, x: -6 })
      animate(lines, {
        opacity: 1,
        x: 0,
        duration: 220,
        ease: 'out(2)',
        delay: stagger(90),
      })
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [lenis, onClose])

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="TR-300 web report"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
      exit={{ scaleY: 0.004, scaleX: 0.6, opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.frame}>
        <div className={styles.titleBar}>
          <span className={styles.dots} aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <span className={styles.title}>tr-300 — web report</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            data-interactive="true"
          >
            [esc] exit
          </button>
        </div>
        <div ref={bodyRef} className={styles.body}>
          {report.map((line, i) => (
            <div key={i} data-term-line className={styles.line}>
              {line.text.includes('reports.qubetx.com') ? (
                <a
                  href="https://reports.qubetx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {line.text}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                line.text
              )}
              {line.ok && <span className={styles.ok}> [OK]</span>}
            </div>
          ))}
          <div className={styles.line} aria-hidden="true">
            <span className={styles.cursor}>▮</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
