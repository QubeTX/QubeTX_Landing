import type { FC, ReactNode } from 'react'
import styles from './RuleGrid.module.css'

export type Rule = { title: string; body: ReactNode }

type RuleGridProps = {
  rules: Rule[]
  /** Eyebrow prefix — "RULE" (default), "PRINCIPLE", "LAW"… */
  prefix?: string
}

/** The Millis-style normative grid: numbered spec cards, three across. */
const RuleGrid: FC<RuleGridProps> = ({ rules, prefix = 'RULE' }) => (
  <div className={styles.grid}>
    {rules.map((rule, i) => (
      <div key={rule.title} className={styles.card}>
        <div className={styles.num}>
          {prefix} / {String(i + 1).padStart(2, '0')}
        </div>
        {/* h3: these sit directly under the section h2 (heading order) */}
        <h3 className={styles.title}>{rule.title}</h3>
        <div className={styles.body}>{rule.body}</div>
      </div>
    ))}
  </div>
)

export default RuleGrid
