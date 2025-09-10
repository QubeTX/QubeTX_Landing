import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  // Access the git commit info injected at build time
  const commitInfo = typeof __GIT_COMMIT__ !== 'undefined' ? __GIT_COMMIT__ : 'Development'
  
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2025 QubeTX - A Department of{' '}
        <a href="https://emmettshaughnessy.com" target="_blank" rel="noopener noreferrer">
          ES Development LLC
        </a>
      </p>
      <p className={styles.commitInfo}>
        <span className={styles.commitLabel}>Commit:</span> {commitInfo}
      </p>
    </footer>
  )
}

export default Footer