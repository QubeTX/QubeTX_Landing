'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import FeatureCard from '../ui/FeatureCard'
import type { Feature } from '@/data/content'
import styles from './Features.module.css'

type FeaturesProps = {
  items: Feature[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const Features: FC<FeaturesProps> = ({ items }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section 
      ref={ref}
      className={styles.features} 
      aria-label="Core capabilities"
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <div className={styles.topLine} aria-hidden="true" />
      {items.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </motion.section>
  )
}

export default Features
