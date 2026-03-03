'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import type { Project } from '@/data/content'
import { createContainerVariants, sectionTitleAnimation } from '@/utils/animations'
import styles from './Projects.module.css'

type ProjectsProps = {
  items: Project[]
}

const container = createContainerVariants(0.2)

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
        <p className={styles.sectionSubtitle}>A collection of our public work</p>
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
