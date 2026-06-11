'use client'

import type { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ArrowRight } from './icons'
import styles from './OutlineButton.module.css'

type OutlineButtonProps = {
  href: string
  children: ReactNode
  className?: string
  /** Marks the element for the cursor's magnetic docking mode */
  magnetic?: boolean
}

/**
 * The outlined GET STARTED → CTA from the mockup: 1px brand-blue border,
 * gradient sweep fill on hover (CSS), cash.app-style squash on press (FM).
 */
const OutlineButton: FC<OutlineButtonProps> = ({ href, children, className, magnetic }) => {
  const isExternal = /^https?:\/\//.test(href)

  return (
    <motion.a
      href={href}
      className={clsx(styles.button, className)}
      data-interactive="true"
      data-magnetic={magnetic ? 'true' : undefined}
      whileTap={{ scaleX: 1.04, scaleY: 0.92 }}
      transition={{ type: 'spring', stiffness: 600, damping: 18 }}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span className={styles.labelText}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        <ArrowRight size={16} strokeWidth={2} />
      </span>
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </motion.a>
  )
}

export default OutlineButton
