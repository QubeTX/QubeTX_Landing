'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { X } from '@/components/ui/icons'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import { EASE } from '@/lib/motion/tokens'
import styles from './Modal.module.css'

/**
 * The fixed overlay must render outside any transformed/backdrop-filtered
 * ancestor (gotcha #14) — those re-base position:fixed to the ancestor's box.
 * Portaled to document.body, AS AN AnimatePresence CHILD (a bare createPortal
 * is dropped by AnimatePresence; PresenceContext crosses portals), and only
 * while open so SSR never touches document.
 */
function BodyPortal({ children }: { children: ReactNode }) {
  return createPortal(children, document.body)
}

type ModalProps = {
  open: boolean
  onClose: () => void
  /** Dialog title (becomes the accessible name via aria-labelledby). */
  title: string
  /** Optional mono eyebrow above the title. */
  eyebrow?: string
  children: ReactNode
  /** Footer action row (buttons). */
  actions?: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * The house dialog primitive (the QubeTX answer to the reference kits' modal):
 * a deep-void panel on a dimmed scrim, mono eyebrow, gradient-capable actions,
 * sharp-but-soft house radius. Centered card on desktop → bottom sheet under
 * 600px. Reuses the proven MobileMenu mechanics: body-portal, Framer Motion
 * presence, focus trap, Esc-to-close, scrim dismiss, focus return, body scroll
 * lock + lenis.stop()/start(). Reduced motion skips straight to the final
 * state. Controlled: drive `open` from the parent.
 */
export default function Modal({ open, onClose, title, eyebrow, children, actions }: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const lenis = useLenis()
  const reduced = useMotionPreference()
  const titleId = useId()

  useEffect(() => {
    if (!open) return

    restoreRef.current = (document.activeElement as HTMLElement | null) ?? null
    document.documentElement.setAttribute('data-modal-open', '')
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    // Move focus into the panel once it has mounted.
    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ;(focusables[0] ?? panel).focus()
    })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        if (f.length === 0) {
          e.preventDefault()
          panelRef.current.focus()
          return
        }
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.removeAttribute('data-modal-open')
      document.body.style.overflow = ''
      lenis?.start()
      restoreRef.current?.focus?.()
    }
  }, [open, onClose, lenis])

  return (
    <AnimatePresence>
      {open && (
        <BodyPortal>
          <motion.div
            className={styles.scrim}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
          >
            <motion.div
              ref={panelRef}
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
            >
              <button
                type="button"
                className={styles.close}
                aria-label="Close dialog"
                onClick={onClose}
              >
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>

              <div className={styles.head}>
                {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
              </div>

              <div className={styles.body}>{children}</div>

              {actions && <div className={styles.actions}>{actions}</div>}
            </motion.div>
          </motion.div>
        </BodyPortal>
      )}
    </AnimatePresence>
  )
}
