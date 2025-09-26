import React from 'react'
import type { HeroContent } from '@/data/content'
import styles from './Hero.module.css'

type HeroProps = {
  content: HeroContent
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const { title, conjunction, highlight, subheadline, company } = content

  return (
    <div className={styles.hero}>
      <h1 className={`${styles.title} unbounded-title`}>
        {title}
        <span>{conjunction}</span>
        <span className={styles.highlight}>{highlight}</span>
      </h1>

      <p className={styles.subtitle}>{subheadline}</p>

      <p className={styles.company}>{company}</p>
    </div>
  )
}

export default Hero
