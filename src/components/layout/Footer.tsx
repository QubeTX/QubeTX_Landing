'use client'

import { useLenis } from 'lenis/react'
import { motion, useScroll } from 'framer-motion'
import styles from './Footer.module.css'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import { NAV_ITEMS, PRODUCTS } from '@/data/content'
import { PretextBlock } from '@/lib/pretext'
import { RevealText } from '@/lib/motion/RevealText'
import RollingLabel from '@/components/ui/RollingLink'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  ...NAV_ITEMS.filter((item) => item.id !== 'services').map(({ label, href }) => ({
    label,
    href,
  })),
]

const CONNECT_LINKS = [
  { label: 'Start Your Project', href: '#contact' },
  { label: 'emmettshaughnessy.com', href: 'https://emmettshaughnessy.com', external: true },
]

export default function Footer() {
  const lenis = useLenis()
  const { scrollYProgress } = useScroll()

  const backToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <a className={styles.brandLink} href="#main-content" aria-label="QubeTX - Back to top" onClick={backToTop}>
            <QubeTXLogo className={styles.brandLogo} />
            <span className={styles.brandName}>QubeTX</span>
          </a>
          <PretextBlock
            text="Web Development & Digital Infrastructure"
            lineHeight={1.6}
            as="p"
            className={styles.tagline}
          >
            Web Development &amp; Digital Infrastructure
          </PretextBlock>
        </div>

        <div className={styles.columns}>
          <nav className={styles.column} aria-labelledby="footer-nav-title">
            <h3 id="footer-nav-title" className={styles.columnTitle}>Navigation</h3>
            <ul className={styles.columnList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <RollingLabel text={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.column} aria-labelledby="footer-products-title">
            <h3 id="footer-products-title" className={styles.columnTitle}>Products</h3>
            <ul className={styles.columnList}>
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <a href={product.href} target="_blank" rel="noopener noreferrer">
                    {product.code}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.column} aria-labelledby="footer-connect-title">
            <h3 id="footer-connect-title" className={styles.columnTitle}>Connect</h3>
            <ul className={styles.columnList}>
              {CONNECT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...('external' in link && link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {link.label}
                    {'external' in link && link.external && (
                      <span className="sr-only"> (opens in a new tab)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          className={styles.backToTop}
          onClick={backToTop}
          aria-label="Back to top"
          data-interactive="true"
        >
          <svg viewBox="0 0 36 36" className={styles.ring} aria-hidden="true">
            <circle cx="18" cy="18" r="16" className={styles.ringTrack} />
            <motion.circle
              cx="18"
              cy="18"
              r="16"
              className={styles.ringFill}
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <span className={styles.arrowUp} aria-hidden="true">↑</span>
        </button>
      </div>

      {/* Oversized wordmark — per-char masked rise on scroll into view */}
      <RevealText
        text="QUBETX"
        as="div"
        mode="chars"
        staggerMs={18}
        className={styles.wordmark}
        threshold={0.3}
      />

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} QubeTX &mdash; A Department of{' '}
          <a href="https://emmettshaughnessy.com" target="_blank" rel="noopener noreferrer">
            ES Development LLC
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        <span className={styles.konamiHint} aria-hidden="true" title="…the old codes still work">
          ↑↑↓↓←→←→BA
        </span>
      </div>
    </footer>
  )
}
