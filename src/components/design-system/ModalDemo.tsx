'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import styles from './ModalDemo.module.css'

/**
 * §16's live specimen — the three common dialog shapes driven by the one
 * Modal primitive: a confirm, a form, and a terminal-flavored
 * type-to-confirm for destructive actions. Open one and try Esc, the scrim,
 * Tab (focus trap), and the X.
 */

type Which = null | 'confirm' | 'form' | 'destruct'

export default function ModalDemo() {
  const [open, setOpen] = useState<Which>(null)
  const [confirmText, setConfirmText] = useState('')
  const close = () => {
    setOpen(null)
    setConfirmText('')
  }

  return (
    <div className={styles.row}>
      <button type="button" className={styles.trigger} onClick={() => setOpen('confirm')}>
        Confirm dialog
      </button>
      <button type="button" className={styles.trigger} onClick={() => setOpen('form')}>
        Form dialog
      </button>
      <button type="button" className={styles.trigger} onClick={() => setOpen('destruct')}>
        Type-to-confirm
      </button>

      <Modal
        open={open === 'confirm'}
        onClose={close}
        eyebrow="Confirm"
        title="Ship to production?"
        actions={
          <>
            <button type="button" className={styles.ghost} onClick={close}>
              Cancel
            </button>
            <button type="button" className={styles.primary} onClick={close}>
              Ship it
            </button>
          </>
        }
      >
        This promotes the current build to production. You can roll back from the deploys list at
        any time.
      </Modal>

      <Modal
        open={open === 'form'}
        onClose={close}
        eyebrow="New project"
        title="Name your project"
        actions={
          <>
            <button type="button" className={styles.ghost} onClick={close}>
              Cancel
            </button>
            <button type="button" className={styles.primary} onClick={close}>
              Create
            </button>
          </>
        }
      >
        Pick a short, lowercase slug — it becomes the subdomain.
        <label className={styles.field}>
          <span>Project name</span>
          <input type="text" placeholder="acme-web" />
        </label>
      </Modal>

      <Modal
        open={open === 'destruct'}
        onClose={close}
        eyebrow="Destructive"
        title="Delete this deployment?"
        actions={
          <>
            <button type="button" className={styles.ghost} onClick={close}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.danger}
              disabled={confirmText !== 'DELETE'}
              onClick={close}
            >
              Delete
            </button>
          </>
        }
      >
        This cannot be undone. Type <code>DELETE</code> to confirm.
        <label className={styles.field}>
          <span className="sr-only">Type DELETE to confirm</span>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
          />
        </label>
      </Modal>
    </div>
  )
}
