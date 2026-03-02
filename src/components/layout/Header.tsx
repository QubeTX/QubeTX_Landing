'use client'

import styles from './Header.module.css'
import QubeTXLogo from '@/components/ui/QubeTXLogo'

export default function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="#top" aria-label="QubeTX - Back to top">
        <QubeTXLogo className={styles.logoMark} />
        <span className={styles.logoText}>QubeTX</span>
      </a>
    </header>
  )
}
