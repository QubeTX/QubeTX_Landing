import type { FC } from 'react'
import type { Feature } from '@/data/content'
import styles from './FeatureCard.module.css'

type FeatureCardProps = Feature

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, lineBreak, description }) => {
  return (
    <article className={styles.featureCard} data-interactive="true">
      <div className={styles.icon} aria-hidden="true">
        <span>
          {icon}
        </span>
      </div>
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
    </article>
  )
}

export default FeatureCard
