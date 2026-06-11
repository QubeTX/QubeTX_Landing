'use client';

import { useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import StatValue from '../ui/StatValue'
import RoutedText from '../ui/RoutedText'
import QubeTXLogo from '../ui/QubeTXLogo'
import { ABOUT_CONTENT, PROCESS } from '@/data/content'
import { createContainerVariants, slideUpVariants } from '@/lib/motion/variants'
import { PretextBlock } from '@/lib/pretext'
import styles from './About.module.css'

const container = createContainerVariants(0.12)

/**
 * About Us — manifesto + stats strip + the six-step process as striped rows
 * (absorbs the old standalone Process section; a hidden #process alias keeps
 * old deep links working — it lives in page.tsx).
 */
const About: FC = () => {
  const processRef = useRef(null)
  const processInView = useInView(processRef, { once: true, margin: '-10% 0px' })

  return (
    <section className={styles.section} aria-label="About us">
      <SectionHeading label="04 // About us" title={ABOUT_CONTENT.title} />

      <div className={styles.manifesto}>
        {/* Pretext showcase: layoutNextLine routes the lead paragraph around
            the cube (≥1024px, fonts ready) — plain paragraph otherwise */}
        <RoutedText
          text={ABOUT_CONTENT.manifesto[0]}
          lineHeight={1.7}
          className={styles.paragraph}
          obstacle={<QubeTXLogo size={96} className={styles.manifestoCube} />}
        />
        {ABOUT_CONTENT.manifesto.slice(1).map((paragraph) => (
          <PretextBlock
            key={paragraph.slice(0, 24)}
            text={paragraph}
            lineHeight={1.7}
            shrinkwrap
            as="p"
            className={styles.paragraph}
          >
            {paragraph}
          </PretextBlock>
        ))}
      </div>

      <div className={styles.stats}>
        {ABOUT_CONTENT.stats.map((stat) => (
          <StatValue key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <h3 className={styles.processTitle}>How we work</h3>
      <motion.ol
        ref={processRef}
        className={styles.process}
        variants={container}
        initial="hidden"
        animate={processInView ? 'show' : 'hidden'}
      >
        {PROCESS.map((step, i) => (
          <motion.li
            key={step.id}
            className={styles.step}
            data-striped={i % 2 === 1 || undefined}
            variants={slideUpVariants}
          >
            <span className={styles.stepNumber} aria-hidden="true">
              {step.number}
            </span>
            <span className={styles.stepBody}>
              <PretextBlock text={step.title} lineHeight={1.2} as="h4" className={styles.stepTitle}>
                {step.title}
              </PretextBlock>
              <PretextBlock
                text={step.description}
                lineHeight={1.6}
                shrinkwrap
                as="p"
                className={styles.stepDescription}
              >
                {step.description}
              </PretextBlock>
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}

export default About
