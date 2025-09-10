import React from 'react'
import FeatureCard from '../ui/FeatureCard'
import styles from './Features.module.css'

const features = [
  {
    icon: '🎨',
    title: 'Web Development',
    description: 'Modern, responsive website design and development with cutting-edge technologies. From static sites to complex web applications, we create tailored solutions that elevate your digital presence.'
  },
  {
    icon: '🔧',
    title: 'Maintenance',
    description: 'Comprehensive website maintenance including security updates, performance optimization, content updates, and technical support. Keep your digital platform running at peak efficiency.'
  },
  {
    icon: '⚡',
    title: 'API Infrastructure',
    description: 'Scalable and secure API development with modern architecture patterns. Build robust backend systems that power your applications with high performance and reliability.'
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Expert cloud infrastructure deployment and management. Leverage the power of cloud computing with optimized hosting solutions, CDN implementation, and serverless architectures.'
  },
  {
    icon: '🛡️',
    title: 'Security &',
    lineBreak: 'Performance',
    description: 'Comprehensive security audits, SSL implementation, and performance optimization. Ensure your digital assets are protected while delivering lightning-fast experiences to your users.'
  }
]

function Features() {
  return (
    <div className={styles.features}>
      <div className={styles.topLine}></div>
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  )
}

export default Features