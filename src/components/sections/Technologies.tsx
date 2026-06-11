'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { TECH_STACK } from '@/data/content'
import { createContainerVariants, slideUpVariants } from '@/lib/motion/variants'
import styles from './Technologies.module.css'

const container = createContainerVariants(0.06)

const Technologies: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className={styles.section} aria-label="Technologies">
      <SectionHeading
        label="03 // Technologies"
        title="Built with modern tech"
        subtitle="The stack behind this page and everything we ship."
      />
      <motion.ul
        ref={ref}
        className={styles.strip}
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {TECH_STACK.map((tech) => (
          <motion.li key={tech.id} className={styles.cell} variants={slideUpVariants}>
            <span className={styles.glyph} aria-hidden="true">
              {tech.icon}
            </span>
            <span className={styles.name}>{tech.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

export default Technologies
