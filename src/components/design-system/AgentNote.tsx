import type { FC, ReactNode } from 'react'
import styles from './AgentNote.module.css'

type AgentNoteProps = {
  children: ReactNode
  /** Optional imperative checklist rendered after the prose. */
  checklist?: string[]
}

/**
 * The standing agent-facing callout — every section of the design-system
 * page ends with one. This is where the section's knowledge becomes an
 * instruction: what to copy, what to call, what must never be done. Written
 * for the coding agents that will build future QubeTX projects against
 * this page and the kit.
 */
const AgentNote: FC<AgentNoteProps> = ({ children, checklist }) => (
  <aside className={styles.note}>
    <div className={styles.eyebrow}>Agent notes</div>
    <div className={styles.body}>{children}</div>
    {checklist && checklist.length > 0 && (
      <ul className={styles.checklist}>
        {checklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
  </aside>
)

export default AgentNote
