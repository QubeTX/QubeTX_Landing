import type { FC } from 'react'
import FeatureCard from '../ui/FeatureCard'
import type { Feature } from '@/data/content'
import styles from './Features.module.css'

type FeaturesProps = {
  items: Feature[]
}

const Features: FC<FeaturesProps> = ({ items }) => {
  return (
    <section className={styles.features} aria-label="Core capabilities">
      <div className={styles.topLine} aria-hidden="true" />
      {items.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </section>
  )
}

export default Features
