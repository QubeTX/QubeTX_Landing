'use client';

import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { Service } from '@/data/content'
import { SERVICE_ICONS } from './icons'
import LabelPill from './LabelPill'
import { slideUpVariants } from '@/lib/motion/variants'
import { PretextBlock } from '@/lib/pretext'
import styles from './ServiceCard.module.css'

type ServiceCardProps = Service & {
  index: number
}

/**
 * Grid cell (machine-report idiom): mono pill + stroked icon up top,
 * display title, Pretext-shrinkwrapped description. The cell id is the
 * SERVICES dropdown's anchor target.
 */
const ServiceCard: FC<ServiceCardProps> = ({ id, icon, title, description, index }) => {
  const Icon = SERVICE_ICONS[icon]

  return (
    <motion.article
      id={`service-${id}`}
      className={styles.card}
      data-interactive="true"
      data-glow
      variants={slideUpVariants}
    >
      <div className={styles.top}>
        <LabelPill>{`0${index + 1}`}</LabelPill>
        <span className={styles.icon} aria-hidden="true">
          {Icon && <Icon size={20} strokeWidth={1.5} />}
        </span>
      </div>
      <PretextBlock text={title} lineHeight={1.2} as="h3" className={styles.title}>
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

export default ServiceCard
