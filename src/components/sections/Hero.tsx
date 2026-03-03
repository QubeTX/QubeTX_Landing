'use client';

import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { HeroContent } from '@/data/content'
import { createContainerVariants, heroItemVariants } from '@/utils/animations'
import styles from './Hero.module.css'

type HeroProps = {
  content: HeroContent
}

const container = createContainerVariants(0.1, 0.3)

const Hero: FC<HeroProps> = ({ content }) => {
  const { title, conjunction, highlight, subheadline, company } = content

  return (
    <motion.div 
      className={styles.hero}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1 className={`${styles.title} unbounded-title`}>
        <motion.span variants={heroItemVariants}>{title}</motion.span>
        <motion.span variants={heroItemVariants}>{conjunction}</motion.span>
        <motion.span className={styles.highlight} variants={heroItemVariants}>{highlight}</motion.span>
      </motion.h1>

      <motion.p className={styles.subtitle} variants={heroItemVariants}>
        {subheadline}
      </motion.p>

      <motion.p className={styles.company} variants={heroItemVariants}>
        {company}
      </motion.p>
    </motion.div>
  )
}

export default Hero
