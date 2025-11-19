'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import type { Project } from '@/data/content'
import styles from './Projects.module.css'

type ProjectsProps = {
  items: Project[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const Projects: FC<ProjectsProps> = ({ items }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className={styles.projects} aria-labelledby="featured-projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 id="featured-projects" className={`unbounded-heading ${styles.sectionTitle}`}>
          Featured Projects
        </h2>
        <p className={styles.sectionSubtitle}>Crafted with precision, powered by passion</p>
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
