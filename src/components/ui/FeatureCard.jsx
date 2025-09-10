import React from 'react'
import styles from './FeatureCard.module.css'

function FeatureCard({ icon, title, lineBreak, description }) {
  return (
    <div className={styles.featureCard} data-interactive="true">
      <div className={styles.icon}>{icon}</div>
      <h2 className={`unbounded-heading ${styles.title}`}>
        {title}
        {lineBreak && (
          <>
            <br />
            {lineBreak}
          </>
        )}
      </h2>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

export default FeatureCard