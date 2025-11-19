'use client';

import { useRef } from 'react'
import type { FC, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Feature } from '@/data/content'
import styles from './FeatureCard.module.css'

type FeatureCardProps = Feature

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, lineBreak, description }) => {
  const ref = useRef<HTMLElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article 
      ref={ref}
      className={styles.featureCard} 
      data-interactive="true"
      variants={itemVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.icon} aria-hidden="true" style={{ transform: "translateZ(50px)" }}>
        <span>
          {icon}
        </span>
      </div>
      <h2 className={`unbounded-heading ${styles.title}`} style={{ transform: "translateZ(30px)" }}>
        {title}
        {lineBreak && (
          <>
            <br />
            {lineBreak}
          </>
        )}
      </h2>
      <p className={styles.description} style={{ transform: "translateZ(20px)" }}>{description}</p>
    </motion.article>
  )
}

export default FeatureCard
