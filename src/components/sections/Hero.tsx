'use client';

import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { HeroContent } from '@/data/content'
import { createContainerVariants, heroItemVariants } from '@/utils/animations'
import { PretextBlock } from '@/lib/pretext'
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

      <PretextBlock text={subheadline} lineHeight={1.6} shrinkwrap className={styles.subtitle}>
        <motion.p variants={heroItemVariants}>
          {subheadline}
        </motion.p>
      </PretextBlock>

      <PretextBlock text={company} lineHeight={1.6} className={styles.company}>
        <motion.p variants={heroItemVariants}>
          {company}
        </motion.p>
      </PretextBlock>
    </motion.div>
  )
}

export default Hero
