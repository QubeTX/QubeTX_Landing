'use client';

import { useRef } from 'react'
import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/content'
import { slideUpVariants } from '@/utils/animations'
import styles from './ProjectCard.module.css'

type ProjectCardProps = Project & { target?: string }

const ProjectCard: FC<ProjectCardProps> = ({ id, href, image, alt, title, tags, description, target = "_blank" }) => {
  const ref = useRef<HTMLElement>(null)

  return (
    <motion.a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={styles.projectLink}
      variants={slideUpVariants}
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
      {target === '_blank' && (
        <span className="sr-only">(opens in a new tab)</span>
      )}
    </motion.a>
  )
}

export default ProjectCard
