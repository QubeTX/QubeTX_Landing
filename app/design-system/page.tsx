import type { Metadata, Viewport } from 'next'
import Sidebar from '@/components/design-system/Sidebar'
import SectionRail from '@/components/design-system/SectionRail'
import { SECTION_COMPONENTS } from '@/components/design-system/sections'
import { DS_SECTIONS, DS_VERSION } from '@/data/designSystem'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'QubeTX Design System — the system of record',
  description:
    `The QubeTX design system v${DS_VERSION}: tokens, components, motion primitives, ` +
    'and the laws behind qubetx.com — documented with live specimens and a downloadable kit.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

/**
 * /design-system — the Millis-anatomy documentation page: sticky grouped
 * sidebar (with the kit download), 26 numbered sections of live specimens,
 * and the section rail. No site Header/BootScreen/LoadSequence here — the
 * sidebar owns navigation and the boot moment belongs to the home route.
 */
export default function DesignSystemPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.main} id="ds-content">
        {SECTION_COMPONENTS.map((Section, i) => (
          <Section key={DS_SECTIONS[i]?.id ?? i} />
        ))}
      </main>
      <SectionRail />
    </div>
  )
}
