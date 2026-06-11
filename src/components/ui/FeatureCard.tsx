'use client';

import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { Service } from '@/data/content'
import { SERVICE_ICONS } from './icons'
import { slideUpVariants } from '@/utils/animations'
import { PretextBlock } from '@/lib/pretext'
import styles from './FeatureCard.module.css'

type FeatureCardProps = Service

const FeatureCard: FC<FeatureCardProps> = ({ id, icon, title, description }) => {
  const Icon = SERVICE_ICONS[icon]

  return (
    <motion.article
      id={`service-${id}`}
      className={styles.featureCard}
      data-interactive="true"
      variants={slideUpVariants}
    >
      <div className={styles.icon} aria-hidden="true">
        {Icon && <Icon size={28} strokeWidth={1.5} />}
      </div>
      <PretextBlock
        text={title}
        lineHeight={1.3}
        as="h2"
        className={`unbounded-heading ${styles.title}`}
      >
        {title}
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
