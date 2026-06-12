import type { CSSProperties, FC, ReactNode } from 'react'
import styles from './TypeSpecimen.module.css'

type TypeSpecimenProps = {
  /** Token / role name, e.g. "--text-h2 · Makira 900 · uppercase". */
  meta: string
  /** The sample, rendered at the real styles. */
  children: ReactNode
  /** Inline styles carrying the actual type treatment under test. */
  sampleStyle?: CSSProperties
  sampleClassName?: string
}

/** A type-ramp row: mono meta line above the live sample. */
const TypeSpecimen: FC<TypeSpecimenProps> = ({ meta, children, sampleStyle, sampleClassName }) => (
  <div className={styles.specimen}>
    <div className={styles.meta}>{meta}</div>
    <div className={sampleClassName ?? styles.sample} style={sampleStyle}>
      {children}
    </div>
  </div>
)

export default TypeSpecimen
