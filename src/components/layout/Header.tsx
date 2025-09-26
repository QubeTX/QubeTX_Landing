import React from 'react'
import styles from './Header.module.css'

type HeaderProps = {
  logoSrc?: string
  logoAlt?: string
}

const Header: React.FC<HeaderProps> = ({
  logoSrc = '/logoQUBETX_horizontal.png',
  logoAlt = 'QubeTX Logo'
}) => {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="#top">
        <img src={logoSrc} alt={logoAlt} loading="lazy" />
      </a>
    </header>
  )
}

export default Header
