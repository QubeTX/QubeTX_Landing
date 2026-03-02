'use client';

import { useRef } from 'react'
import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { Feature } from '@/data/content'
import styles from './FeatureCard.module.css'

type FeatureCardProps = Feature

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, lineBreak, description }) => {
  const ref = useRef<HTMLElement>(null)

  return (
    <motion.article
      ref={ref}
      className={styles.featureCard}
      data-interactive="true"
      variants={itemVariant}
    >
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
    </motion.article>
  )
}

export default FeatureCard
