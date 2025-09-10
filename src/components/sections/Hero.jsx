import React from 'react'
import styles from './Hero.module.css'

function Hero() {
  return (
    <div className={styles.hero}>
      <h1 className={`${styles.title} unbounded-title`}>
        Web Development
        <span>and</span>
        <span className={styles.highlight}>Digital Infrastructure</span>
      </h1>

      <p className={styles.subtitle}>
        Professional website development, maintenance services, and backend API infrastructure
        for modern digital businesses
      </p>

      <p className={styles.company}>
        A Department of ES Development LLC
      </p>
    </div>
  )
}

export default Hero