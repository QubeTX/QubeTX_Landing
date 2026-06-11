'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import SectionHeading from '../ui/SectionHeading'
import type { Project } from '@/data/content'
import { createContainerVariants } from '@/lib/motion/variants'
import styles from './Work.module.css'

type WorkProps = {
  items: Project[]
}

const container = createContainerVariants(0.12)

const Work: FC<WorkProps> = ({ items }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className={styles.section} aria-label="Selected work">
      <SectionHeading
        label="05 // Selected work"
        title="Client projects"
        subtitle="A collection of our public work."
      />
      <motion.div
        ref={ref}
        className={styles.grid}
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {items.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </motion.div>
    </section>
  )
}

export default Work
