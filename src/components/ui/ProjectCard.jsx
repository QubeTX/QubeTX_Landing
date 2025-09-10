import React from 'react'
import styles from './ProjectCard.module.css'

function ProjectCard({ href, image, alt, title, tags, description }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
      <div className={styles.projectCard}>
        <div className={styles.projectImageWrapper}>
          <img src={image} alt={alt} className={styles.projectImage} />
          <div className={styles.projectOverlay}>
            <span className={styles.visitSite}>Visit Site →</span>
          </div>
        </div>
        <div className={styles.projectContent}>
          <h2 className={`unbounded-heading ${styles.projectTitle}`}>{title}</h2>
          <div className={styles.projectTags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <p className={styles.projectDescription}>{description}</p>
        </div>
      </div>
    </a>
  )
}

export default ProjectCard