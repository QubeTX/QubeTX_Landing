import type { FC } from 'react'
import styles from './SpaceScale.module.css'

export type SpaceStep = { token: string; px: number; note?: string }

type SpaceScaleProps = { steps: SpaceStep[] }

/** The 8px ladder as visual bars — width IS the value. */
const SpaceScale: FC<SpaceScaleProps> = ({ steps }) => (
  <div className={styles.scale}>
    {steps.map((step) => (
      <div key={step.token} className={styles.row}>
        <span className={styles.token}>{step.token}</span>
        <span className={styles.bar} style={{ width: step.px }} aria-hidden="true" />
        <span className={styles.px}>
          {step.px}px{step.note ? ` · ${step.note}` : ''}
        </span>
      </div>
    ))}
  </div>
)

export default SpaceScale
