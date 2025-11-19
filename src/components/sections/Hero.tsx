'use client';

import type { FC } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { HeroContent } from '@/data/content'
import styles from './Hero.module.css'

type HeroProps = {
  content: HeroContent
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50
    }
  }
}

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
        <motion.span variants={item}>{title}</motion.span>
        <motion.span variants={item}>{conjunction}</motion.span>
        <motion.span className={styles.highlight} variants={item}>{highlight}</motion.span>
      </motion.h1>

      <motion.p className={styles.subtitle} variants={item}>
        {subheadline}
      </motion.p>

      <motion.p className={styles.company} variants={item}>
        {company}
      </motion.p>
    </motion.div>
  )
}

export default Hero
