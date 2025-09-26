import React from 'react'
import type { Project } from '@/data/content'
import styles from './ProjectCard.module.css'

type ProjectCardProps = Project

const ProjectCard: React.FC<ProjectCardProps> = ({ id, href, image, alt, title, tags, description }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
      <article className={styles.projectCard}>
        <div className={styles.projectImageWrapper}>
          <img src={image} alt={alt} className={styles.projectImage} loading="lazy" />
          <div className={styles.projectOverlay} aria-hidden="true">
            <span className={styles.visitSite}>Visit Site →</span>
          </div>
        </div>
        <div className={styles.projectContent}>
          <h3 className={`unbounded-heading ${styles.projectTitle}`}>{title}</h3>
          <ul className={styles.projectTags} aria-label="Project tags">
            {tags.map((tag) => (
              <li key={`${id}-${tag}`} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={styles.projectDescription}>{description}</p>
        </div>
      </article>
    </a>
  )
}

export default ProjectCard
