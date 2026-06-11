'use client';

import type { FC } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { Product } from '@/data/content'
import { ArrowUpRight } from './icons'
import { slideUpVariants } from '@/lib/motion/variants'
import { PretextBlock } from '@/lib/pretext'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  product: Product
  striped?: boolean
}

/**
 * One striped product row: [code chip] [name + tagline + description]
 * [tags] [status] [visit ↗]. The whole row is an external link to its
 * reports.qubetx.com page. The compound hover (bg + chip fill + arrow
 * slide) is pure CSS — :hover/:focus-visible with descendant selectors.
 */
const ProductCard: FC<ProductCardProps> = ({ product, striped }) => {
  const { code, name, tagline, description, href, status, tags } = product

  return (
    <motion.li variants={slideUpVariants} className={styles.item}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(styles.row, striped && styles.striped)}
        data-interactive="true"
      >
        <span className={styles.code}>{code}</span>

        <span className={styles.main}>
          <span className={styles.name}>
            {name}
            <span className={styles.tagline}> — {tagline}</span>
          </span>
          <PretextBlock
            text={description}
            lineHeight={1.6}
            shrinkwrap
            as="span"
            className={styles.description}
          >
            {description}
          </PretextBlock>
        </span>

        <span className={styles.tags} aria-hidden="true">
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </span>

        <span className={styles.status} data-status={status}>
          {status}
        </span>

        <span className={styles.visit}>
          Visit
          <ArrowUpRight size={14} strokeWidth={2} className={styles.arrow} aria-hidden="true" />
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </motion.li>
  )
}

export default ProductCard
