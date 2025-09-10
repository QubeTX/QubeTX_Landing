import React from 'react'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logoQUBETX_horizontal.png" alt="QubeTX Logo" />
      </div>
    </header>
  )
}

export default Header