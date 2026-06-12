'use client'

import type { FC } from 'react'
import styles from './CursorSandbox.module.css'

/**
 * §21's sandbox — zones the global CustomCursor (mounted in the root
 * layout) reacts to. Fine pointers only; touch devices keep the native
 * cursor and see static panels.
 */
const CursorSandbox: FC = () => (
  <div className={styles.grid}>
    <div className={styles.zone}>
      <span className={styles.zoneLabel}>Default</span>
      <p>The dot leads, the ring trails with dt-normalized lerp; velocity squashes the ring along its travel axis.</p>
    </div>
    <div className={styles.zone}>
      <span className={styles.zoneLabel}>Interactive</span>
      <button type="button" className={styles.target} data-interactive="true">
        data-interactive
      </button>
      <p>Ring scales up over anything marked interactive.</p>
    </div>
    <div className={styles.zone}>
      <span className={styles.zoneLabel}>Magnetic dock</span>
      <button type="button" className={styles.target} data-interactive="true" data-magnetic="true">
        data-magnetic
      </button>
      <p>The ring DOCKS to the element&apos;s center — the cursor and the magnetic pull meet halfway.</p>
    </div>
  </div>
)

export default CursorSandbox
