import type { FC, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './DemoPanel.module.css'

type DemoPanelProps = {
  /** Mono caption above the panel (■ marker added automatically). */
  caption: string
  children: ReactNode
  /** Center the specimen instead of flowing it. */
  center?: boolean
  className?: string
}

/** Specimen frame: every live demo on the page sits in one of these. */
const DemoPanel: FC<DemoPanelProps> = ({ caption, children, center, className }) => (
  <div className={clsx(styles.panel, className)}>
    <div className={styles.caption}>
      <span className={styles.square} aria-hidden="true" />
      {caption}
    </div>
    <div className={clsx(styles.stage, center && styles.center)}>{children}</div>
  </div>
)

export default DemoPanel
