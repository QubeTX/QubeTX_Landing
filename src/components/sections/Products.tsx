'use client';

import { useEffect, useRef, type FC } from 'react'
import { motion, useInView } from 'framer-motion'
import ProductCard from '../ui/ProductCard'
import SectionHeading from '../ui/SectionHeading'
import { PRODUCTS } from '@/data/content'
import { animate, stagger, utils } from '@/lib/motion/anime'
import { useInViewOnce } from '@/lib/motion/useInViewOnce'
import { useMotionPreference } from '@/lib/motion/useMotionPreference'
import { createContainerVariants } from '@/lib/motion/variants'
import styles from './Products.module.css'

const container = createContainerVariants(0.1)

const BOOT_LINE = '$ qubetx --products'

/**
 * The product line — striped full-width rows (machine-report idiom), each
 * linking to its reports.qubetx.com page. Terminal flavor is concentrated
 * in the header's boot line: typed once on first scroll into view, with a
 * forever-blinking block cursor (CSS).
 */
const Products: FC = () => {
  const listRef = useRef(null)
  const isInView = useInView(listRef, { once: true, margin: '-10% 0px' })
  const bootRef = useRef<HTMLSpanElement | null>(null)
  const typedRef = useRef(false)
  const reduced = useMotionPreference()
  const [bootInViewRef, bootInView] = useInViewOnce<HTMLSpanElement>({ threshold: 0.5 })

  // Pre-rendered chars revealed with a per-char stagger = typewriter
  useEffect(() => {
    if (!bootInView || typedRef.current) return
    typedRef.current = true
    const chars = bootRef.current?.querySelectorAll<HTMLElement>('[data-boot-char]')
    if (!chars?.length || reduced) return
    utils.set(chars, { opacity: 0 })
    animate(chars, { opacity: 1, duration: 40, delay: stagger(28) })
  }, [bootInView, reduced])

  const setBootRefs = (node: HTMLSpanElement | null) => {
    bootRef.current = node
    bootInViewRef(node)
  }

  return (
    <section className={styles.section} aria-label="Product line">
      <SectionHeading
        label="02 // Product line"
        title="Terminal-grade tooling"
        subtitle="Diagnostic software we build, ship, and run ourselves — free to try at reports.qubetx.com."
        aside={
          <span className={styles.boot} ref={setBootRefs} aria-hidden="true">
            {BOOT_LINE.split('').map((ch, i) => (
              <span key={i} data-boot-char>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
            <span className={styles.cursor}>▮</span>
          </span>
        }
      />

      <motion.ul
        ref={listRef}
        className={styles.rows}
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} striped={i % 2 === 1} />
        ))}
      </motion.ul>
    </section>
  )
}

export default Products
