'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TECH_STACK } from '@/data/content';
import { createContainerVariants, slideUpVariants, sectionTitleAnimation } from '@/utils/animations';
import { PretextBlock } from '@/lib/pretext';
import styles from './TechStack.module.css';

const container = createContainerVariants(0.1);

const SECTION_SUBTITLE = 'Leveraging the latest tools for performance, scalability, and experience.';

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.techStack} aria-labelledby="tech-stack-title">
      <motion.div
        initial={sectionTitleAnimation.initial}
        animate={sectionTitleAnimation.getAnimate(isInView)}
        transition={sectionTitleAnimation.transition}
      >
        <h2 id="tech-stack-title" className={`unbounded-heading ${styles.sectionTitle}`}>
          Built With Modern Tech
        </h2>
        <PretextBlock text={SECTION_SUBTITLE} lineHeight={1.6} as="p" className={styles.sectionSubtitle}>
          {SECTION_SUBTITLE}
        </PretextBlock>
      </motion.div>

      <motion.div
        ref={ref}
        className={styles.grid}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {TECH_STACK.map((tech) => (
          <motion.div key={tech.id} className={styles.item} variants={slideUpVariants} data-interactive="true">
            <div className={styles.icon}>{tech.icon}</div>
            <PretextBlock text={tech.name} lineHeight={1.4} as="span" className={styles.name}>
              {tech.name}
            </PretextBlock>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

