'use client'

import type { FC } from 'react'
import { motion } from 'framer-motion'
import { SPRING } from '@/lib/motion/tokens'
import styles from './SpringDemo.module.css'

/**
 * The three Framer Motion spring presets, felt directly: press the pads.
 * (FM owns these nodes' transforms — nothing else animates them.)
 */
const SpringDemo: FC = () => (
  <div className={styles.row}>
    <motion.button
      type="button"
      className={styles.pad}
      whileTap={{ scaleX: 1.04, scaleY: 0.92 }}
      transition={SPRING.press}
      data-interactive="true"
    >
      <span className={styles.label}>SPRING.press</span>
      <span className={styles.meta}>600 / 18 · button squash</span>
    </motion.button>
    <motion.button
      type="button"
      className={styles.pad}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING.card}
      data-interactive="true"
    >
      <span className={styles.label}>SPRING.card</span>
      <span className={styles.meta}>260 / 22 · card lift</span>
    </motion.button>
    <motion.button
      type="button"
      className={styles.pad}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      transition={SPRING.soft}
      data-interactive="true"
    >
      <span className={styles.label}>SPRING.soft</span>
      <span className={styles.meta}>120 / 14 · gentle return</span>
    </motion.button>
  </div>
)

export default SpringDemo
