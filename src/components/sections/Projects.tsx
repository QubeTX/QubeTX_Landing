import type { FC } from 'react'
import ProjectCard from '../ui/ProjectCard'
import type { Project } from '@/data/content'
import styles from './Projects.module.css'

type ProjectsProps = {
  items: Project[]
}

const Projects: FC<ProjectsProps> = ({ items }) => {
  return (
    <section className={styles.projects} aria-labelledby="featured-projects">
      <h2 id="featured-projects" className={`unbounded-heading ${styles.sectionTitle}`}>
        Featured Projects
      </h2>
      <p className={styles.sectionSubtitle}>Crafted with precision, powered by passion</p>

      <div className={styles.projectGrid}>
        {items.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
