'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS } from '@/data/content';
import { createContainerVariants, slideLeftVariants, sectionTitleAnimation } from '@/utils/animations';
import { PretextBlock } from '@/lib/pretext';
import styles from './Process.module.css';

const container = createContainerVariants(0.2);

const SECTION_SUBTITLE = 'From concept to deployment, we follow a structured approach to ensure success.';

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.process} aria-labelledby="process-title">
      <motion.div
        initial={sectionTitleAnimation.initial}
        animate={sectionTitleAnimation.getAnimate(isInView)}
        transition={sectionTitleAnimation.transition}
      >
        <h2 id="process-title" className={`unbounded-heading ${styles.sectionTitle}`}>
          Our Process
        </h2>
        <PretextBlock text={SECTION_SUBTITLE} lineHeight={1.6} as="p" className={styles.sectionSubtitle}>
          {SECTION_SUBTITLE}
        </PretextBlock>
      </motion.div>

      <motion.div
        ref={ref}
        className={styles.timeline}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {PROCESS.map((step) => (
          <motion.div key={step.id} className={styles.step} variants={slideLeftVariants}>
            <div className={styles.number}>{step.number}</div>
            <PretextBlock text={step.title} lineHeight={1.3} as="h3" className={styles.title}>
              {step.title}
            </PretextBlock>
            <PretextBlock text={step.description} lineHeight={1.6} shrinkwrap as="p" className={styles.description}>
              {step.description}
            </PretextBlock>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

