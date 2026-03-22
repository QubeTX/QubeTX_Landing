'use client'

import styles from './Footer.module.css'
import QubeTXLogo from '@/components/ui/QubeTXLogo'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const CONNECT_LINKS = [
  { label: 'Start Your Project', href: '#contact' },
  { label: 'emmettshaughnessy.com', href: 'https://emmettshaughnessy.com', external: true },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Logo section */}
        <div className={styles.brand}>
          <a className={styles.brandLink} href="#main-content" aria-label="QubeTX - Back to top">
            <QubeTXLogo className={styles.brandLogo} />
            <span className={styles.brandName}>QubeTX</span>
          </a>
          <p className={styles.tagline}>Web Development &amp; Digital Infrastructure</p>
        </div>

        {/* Navigation columns */}
        <div className={styles.columns}>
          <nav className={styles.column} aria-labelledby="footer-nav-title">
            <h3 id="footer-nav-title" className={styles.columnTitle}>Navigation</h3>
            <ul className={styles.columnList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
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
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} QubeTX &mdash; A Department of{' '}
          <a href="https://emmettshaughnessy.com" target="_blank" rel="noopener noreferrer">
            ES Development LLC
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
