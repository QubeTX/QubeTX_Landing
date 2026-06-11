'use client'

import { useEffect, useId, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavItem } from '@/data/content'
import { ChevronDown } from '@/components/ui/icons'
import { EASE } from '@/lib/motion/tokens'
import styles from './Header.module.css'

type NavDropdownProps = {
  item: NavItem
  active: boolean
  onNavigate: (href: string) => void
}

/**
 * Disclosure-pattern dropdown (plain anchor links, not an ARIA menu).
 * Click/Enter toggles; ArrowDown opens and focuses the first item; Escape
 * closes and refocuses the trigger; outside pointerdown and focus-out close.
 */
export default function NavDropdown({ item, active, onNavigate }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelId = useId()

  const close = useCallback((refocus = false) => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => {
        wrapperRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
      })
    }
  }

  const onBlurCapture = (e: React.FocusEvent) => {
    if (open && !wrapperRef.current?.contains(e.relatedTarget as Node)) {
      close()
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.dropdownWrapper}
      onBlurCapture={onBlurCapture}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setOpen(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') close()
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.navLink}
        data-active={active || undefined}
        data-open={open || undefined}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
      >
        {item.label}
        <ChevronDown size={14} strokeWidth={2} className={styles.chevron} aria-hidden="true" />
        {active && <motion.span layoutId="nav-active" className={styles.activeIndicator} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={panelId}
            className={styles.dropdownPanel}
            initial={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -6, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {item.children?.map((child, i) => (
              <motion.li
                key={child.href}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: 0.04 + i * 0.03, ease: EASE }}
              >
                <a
                  href={child.href}
                  className={styles.dropdownItem}
                  onClick={(e) => {
                    e.preventDefault()
                    close()
                    onNavigate(child.href)
                  }}
                >
                  <span className={styles.dropdownIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {child.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.18,
                delay: 0.04 + (item.children?.length ?? 0) * 0.03,
                ease: EASE,
              }}
            >
              <a
                href={item.href}
                className={`${styles.dropdownItem} ${styles.dropdownAll}`}
                onClick={(e) => {
                  e.preventDefault()
                  close()
                  onNavigate(item.href)
                }}
              >
                All services
              </a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
