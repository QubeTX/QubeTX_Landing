'use client';

import { useRef } from 'react'
import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/content'
import { slideUpVariants } from '@/utils/animations'
import styles from './ProjectCard.module.css'

type ProjectCardProps = Project

const ProjectCard: FC<ProjectCardProps> = ({ id, href, image, alt, title, tags, description }) => {
  const ref = useRef<HTMLElement>(null)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.projectLink}
      variants={slideUpVariants}
      aria-label={`Visit project site for ${title}`}
    >
      <article
        ref={ref}
        className={styles.projectCard}
      >
        <div className={styles.projectImageWrapper}>
          <img src={image} alt={alt} className={styles.projectImage} loading="lazy" />
          <div className={styles.projectOverlay} aria-hidden="true">
            <span className={styles.visitSite}>Visit Site →</span>
          </div>
        </div>
        <div className={styles.projectContent}>
          <h3 className={`unbounded-heading ${styles.projectTitle}`}>
            {title}
            <span className="sr-only"> (opens in a new tab)</span>
          </h3>
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
    </motion.a>
  )
}

export default ProjectCard
