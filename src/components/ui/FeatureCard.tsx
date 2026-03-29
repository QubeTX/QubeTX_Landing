'use client';

import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { Feature } from '@/data/content'
import { slideUpVariants } from '@/utils/animations'
import { PretextBlock } from '@/lib/pretext'
import styles from './FeatureCard.module.css'

type FeatureCardProps = Feature

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, lineBreak, description }) => {
  const fullTitle = lineBreak ? `${title} ${lineBreak}` : title

  return (
    <motion.article
      className={styles.featureCard}
      data-interactive="true"
      variants={slideUpVariants}
    >
      <div className={styles.icon} aria-hidden="true">
        <span>
          {icon}
        </span>
      </div>
      <PretextBlock
        text={fullTitle}
        lineHeight={1.3}
        as="h2"
        className={`unbounded-heading ${styles.title}`}
      >
        {title}
        {lineBreak && (
          <>
            <br />
            {lineBreak}
          </>
        )}
      </PretextBlock>
      <PretextBlock
        text={description}
        lineHeight={1.65}
        shrinkwrap
        as="p"
        className={styles.description}
      >
        {description}
      </PretextBlock>
    </motion.article>
  )
}

export default FeatureCard
