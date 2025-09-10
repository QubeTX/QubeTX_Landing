import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2024 QubeTX - A Department of{' '}
        <a href="https://emmettshaughnessy.com" target="_blank" rel="noopener noreferrer">
          ES Development LLC
        </a>
      </p>
    </footer>
  )
}

export default Footer