'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TECH_STACK } from '@/data/content';
import { createContainerVariants, slideUpVariants, sectionTitleAnimation } from '@/utils/animations';
import styles from './TechStack.module.css';

const container = createContainerVariants(0.1);

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
        <p className={styles.sectionSubtitle}>
          Leveraging the latest tools for performance, scalability, and experience.
        </p>
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
            <span className={styles.name}>{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

