'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import type { Project } from '@/data/content'
import { createContainerVariants, sectionTitleAnimation } from '@/utils/animations'
import { PretextBlock } from '@/lib/pretext'
import styles from './Projects.module.css'

type ProjectsProps = {
  items: Project[]
}

const container = createContainerVariants(0.2)

const SECTION_SUBTITLE = 'A collection of our public work'

const Projects: FC<ProjectsProps> = ({ items }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className={styles.projects} aria-labelledby="projects-heading">
      <motion.div
        initial={sectionTitleAnimation.initial}
        animate={sectionTitleAnimation.getAnimate(isInView)}
        transition={sectionTitleAnimation.transition}
      >
        <h2 id="projects-heading" className={`unbounded-heading ${styles.sectionTitle}`}>
          Projects
        </h2>
        <PretextBlock text={SECTION_SUBTITLE} lineHeight={1.6} shrinkwrap as="p" className={styles.sectionSubtitle}>
          {SECTION_SUBTITLE}
        </PretextBlock>
      </motion.div>

      <motion.div
        ref={ref}
        className={styles.projectGrid}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {items.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
