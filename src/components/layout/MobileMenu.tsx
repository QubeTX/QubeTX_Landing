'use client'

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import type { NavItem } from '@/data/content'
import { Menu, X } from '@/components/ui/icons'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import OutlineButton from '@/components/ui/OutlineButton'
import { EASE } from '@/lib/motion/tokens'
import styles from './MobileMenu.module.css'

type MobileMenuProps = {
  items: NavItem[]
  cta: { label: string; href: string }
  onNavigate: (href: string) => void
}

const OVERLAY_ID = 'mobile-menu'

/**
 * The fullscreen overlay must render outside the header subtree: header
 * ancestors acquire transforms (LoadSequence leaves inline `translateY(0)`
 * on [data-load="header"] elements) and backdrop-filter (scrolled header),
 * and either one re-bases position:fixed to that ancestor — shrinking the
 * overlay to the ancestor's box. Rendered as an AnimatePresence child (not
 * a bare createPortal, which AnimatePresence drops) so exit presence still
 * works — PresenceContext crosses portals. Only mounted while open, so
 * document is never touched during SSR.
 */
function BodyPortal({ children }: { children: ReactNode }) {
  return createPortal(children, document.body)
}

export default function MobileMenu({ items, cta, onNavigate }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const lenis = useLenis()

  const close = useCallback(
    (refocus = true) => {
      setOpen(false)
      if (refocus) triggerRef.current?.focus()
    },
    []
  )

  // Scroll lock + html flag while open; Escape closes; focus moves to close button
  useEffect(() => {
    if (!open) return

    document.documentElement.setAttribute('data-menu-open', '')
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      // Minimal focus trap: cycle Tab within the overlay
      if (e.key === 'Tab' && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
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
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.removeAttribute('data-menu-open')
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [open, close, lenis])

  const navigate = (href: string) => {
    close(false)
    // Let the overlay begin exiting before the scroll starts
    requestAnimationFrame(() => onNavigate(href))
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={OVERLAY_ID}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <BodyPortal>
            <motion.div
              ref={overlayRef}
              id={OVERLAY_ID}
              className={styles.overlay}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <div className={styles.topRow}>
                <span className={styles.brand}>
                  <QubeTXLogo className={styles.logoMark} />
                  <span className={styles.logoText}>QubeTX</span>
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  className={styles.close}
                  aria-label="Close menu"
                  onClick={() => close()}
                >
                  <X size={24} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>

              <nav className={styles.nav} aria-label="Mobile">
                <ul className={styles.list}>
                  {items.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease: EASE }}
                    >
                      <a
                        href={item.href}
                        className={styles.link}
                        onClick={(e) => {
                          e.preventDefault()
                          navigate(item.href)
                        }}
                      >
                        <span className={styles.index} aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                      </a>
                      {item.children && (
                        <ul className={styles.subList}>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                className={styles.subLink}
                                onClick={(e) => {
                                  e.preventDefault()
                                  navigate(child.href)
                                }}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className={styles.ctaRow}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + items.length * 0.06, ease: EASE }}
              >
                <OutlineButton href={cta.href}>{cta.label}</OutlineButton>
              </motion.div>
            </motion.div>
          </BodyPortal>
        )}
      </AnimatePresence>
    </>
  )
}
