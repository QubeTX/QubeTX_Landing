'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS } from '@/data/content';
import styles from './Process.module.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.process} aria-labelledby="process-title">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 id="process-title" className={`unbounded-heading ${styles.sectionTitle}`}>
          Our Process
        </h2>
        <p className={styles.sectionSubtitle}>
          From concept to deployment, we follow a structured approach to ensure success.
        </p>
      </motion.div>

      <motion.div 
        ref={ref}
        className={styles.timeline}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {PROCESS.map((step) => (
          <motion.div key={step.id} className={styles.step} variants={item}>
            <div className={styles.number}>{step.number}</div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

