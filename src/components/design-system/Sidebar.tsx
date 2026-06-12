'use client'

import { useMemo } from 'react'
import clsx from 'clsx'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import { Download } from '@/components/ui/icons'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useAnchorNav } from '@/hooks/useAnchorNav'
import { DS_DATE, DS_GROUPS, DS_KIT_FILENAME, DS_SECTIONS, DS_VERSION } from '@/data/designSystem'
import styles from './Sidebar.module.css'

/**
 * The design-system sidebar (Millis anatomy): brand block + version, the
 * Download-kit button, and the grouped numbered section nav with live
 * scroll-spy (useActiveSection — the same IO mechanism as the site header).
 * On <900px the page collapses this into a sticky top bar with a section
 * select (see Sidebar.module.css + the select handler below).
 */
export default function Sidebar() {
  const ids = useMemo(() => DS_SECTIONS.map((s) => s.id), [])
  const active = useActiveSection(ids)
  const navigate = useAnchorNav(-16)

  const onClick = (e: React.MouseEvent, href: string) => {
    if (navigate(href)) e.preventDefault()
  }

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`#${e.target.value}`)
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <a className={styles.brandLink} href="/" aria-label="QubeTX home">
          <QubeTXLogo className={styles.brandLogo} />
          <span className={styles.brandName}>QubeTX</span>
        </a>
        <div className={styles.meta}>
          <span>Design System</span>
          <span className={styles.metaVersion}>
            v{DS_VERSION} · {DS_DATE}
          </span>
        </div>
      </div>

      <a className={styles.download} href={`/${DS_KIT_FILENAME}`} download data-interactive="true">
        <Download size={16} strokeWidth={2} aria-hidden="true" />
        <span>Download kit (.zip)</span>
      </a>

      {/* Mobile: the nav collapses to a select driving the same smooth jumps */}
      <label className={styles.jump}>
        <span className="sr-only">Jump to section</span>
        <select value={active ?? 'top'} onChange={onSelect}>
          {DS_GROUPS.map((group) => (
            <optgroup key={group} label={group}>
              {DS_SECTIONS.filter((s) => s.group === group).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.num} · {s.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <nav className={styles.nav} aria-label="Design system sections">
        {DS_GROUPS.map((group) => (
          <div key={group} className={styles.group}>
            <div className={styles.groupLabel}>{group}</div>
            {DS_SECTIONS.filter((s) => s.group === group).map((s) => (
              <a
                key={s.id}
                className={clsx(styles.item)}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'page' : undefined}
                onClick={(e) => onClick(e, `#${s.id}`)}
              >
                <span className={styles.num}>{s.num}</span>
                <span className={styles.label}>{s.label}</span>
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <span>
          v{DS_VERSION} · {DS_DATE}
        </span>
        <a href="/" className={styles.footerLink}>
          qubetx.com
        </a>
      </div>
    </aside>
  )
}
