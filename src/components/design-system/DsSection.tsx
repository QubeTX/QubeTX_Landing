import type { FC, ReactNode } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { DS_SECTIONS } from '@/data/designSystem'
import styles from './DsSection.module.css'

type DsSectionProps = {
  /** Registry id — eyebrow number, title, and group come from DS_SECTIONS. */
  id: string
  /** Mono lede paragraph under the heading. */
  lede?: string
  children: ReactNode
}

/**
 * Standard design-system section: registry-driven numbering + the house
 * SectionHeading (the page documents the system with the system). Anchor
 * offset accounts for nothing fixed on this route — the sidebar is a
 * column, not an overlay — but a small margin keeps jumps comfortable.
 */
const DsSection: FC<DsSectionProps> = ({ id, lede, children }) => {
  const meta = DS_SECTIONS.find((s) => s.id === id)
  if (!meta) throw new Error(`DsSection: unknown section id "${id}"`)
  return (
    <section id={id} data-group={meta.group} className={styles.section}>
      <SectionHeading label={`${meta.num} // ${meta.label}`} title={meta.title} subtitle={lede} />
      <div className={styles.body}>{children}</div>
    </section>
  )
}

export default DsSection
