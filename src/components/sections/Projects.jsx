import React from 'react'
import ProjectCard from '../ui/ProjectCard'
import styles from './Projects.module.css'

const projects = [
  {
    href: 'https://leonleedorsey.com',
    image: '/dorsey.png',
    alt: 'Leon Lee Dorsey Project',
    title: 'Leon Lee Dorsey',
    tags: ['Music', 'Portfolio', 'NYC'],
    description: "A dynamic digital presence for NYC's renowned jazz bassist and educator. The site showcases Leon's extensive musical journey, performances, and educational contributions to the jazz world."
  },
  {
    href: 'https://gvalleytx.com',
    image: '/gvalley.png',
    alt: 'Green Valley Lawn Services Project',
    title: 'Green Valley',
    tags: ['Business', 'Service', 'Houston'],
    description: "A professional website for Houston's premier commercial lawn care provider. The site reflects their commitment to excellence and showcases their comprehensive range of services."
  },
  {
    href: 'https://magzsports.com',
    image: '/magz.png',
    alt: 'MAGZ Sports Group Project',
    title: 'MAGZ Sports Group',
    tags: ['Sports', 'Marketing', 'Agency'],
    description: 'A dynamic sports marketing platform connecting elite collegiate and professional athletes with leading global brands through strategic partnerships and data-driven campaigns.'
  }
]

function Projects() {
  return (
    <div className={styles.projects}>
      <h2 className={`unbounded-heading ${styles.sectionTitle}`}>Featured Projects</h2>
      <p className={styles.sectionSubtitle}>Crafted with precision, powered by passion</p>
      
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  )
}

export default Projects