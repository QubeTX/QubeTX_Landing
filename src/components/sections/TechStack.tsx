'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TECH_STACK } from '@/data/content';
import styles from './TechStack.module.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.techStack} aria-labelledby="tech-stack-title">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
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
          <motion.div key={tech.id} className={styles.item} variants={item} data-interactive="true">
            <div className={styles.icon}>{tech.icon}</div>
            <span className={styles.name}>{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

