'use client'

import styles from './Header.module.css'
import QubeTXLogo from '@/components/ui/QubeTXLogo'

export default function Header() {
  return (
    <header className={styles.header}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>
      <a className={styles.logo} href="#main-content" aria-label="QubeTX - Back to top">
        <QubeTXLogo className={styles.logoMark} />
        <span className={styles.logoText}>QubeTX</span>
      </a>
    </header>
  )
}
