'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import ServiceCard from '../ui/ServiceCard'
import SectionHeading from '../ui/SectionHeading'
import type { Service } from '@/data/content'
import { createContainerVariants } from '@/lib/motion/variants'
import { useProximityGlow } from '@/lib/motion/useProximityGlow'
import styles from './Services.module.css'

type ServicesProps = {
  items: Service[]
}

const container = createContainerVariants(0.08)

const Services: FC<ServicesProps> = ({ items }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const glowRef = useProximityGlow<HTMLDivElement>()

  return (
    <section className={styles.section} aria-label="Services">
      <SectionHeading
        label="01 // Services"
        title="What we build"
        subtitle="Web development, infrastructure, and everything that keeps both running."
      />
      <motion.div
        ref={(node: HTMLDivElement | null) => {
          const inViewRef = ref as React.MutableRefObject<HTMLDivElement | null>
          inViewRef.current = node
          glowRef.current = node
        }}
        className={styles.grid}
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {items.map((service, i) => (
          <ServiceCard key={service.id} index={i} {...service} />
        ))}
      </motion.div>
    </section>
  )
}

export default Services
