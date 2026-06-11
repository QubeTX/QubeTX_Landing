'use client';

import type { FC } from 'react'
import SectionHeading from '../ui/SectionHeading'
import OutlineButton from '../ui/OutlineButton'
import type { ContactCta } from '@/data/content'
import { PretextBlock } from '@/lib/pretext'
import styles from './Contact.module.css'

type ContactProps = {
  cta: ContactCta
}

const CONTACT_SUBTITLE =
  "Ready to transform your digital presence? Tell us what you're building and we'll take it from there."

/** Terminal-panel CTA. Left-aligned (so the subtitle can shrinkwrap safely). */
const Contact: FC<ContactProps> = ({ cta }) => {
  return (
    <section className={styles.section} aria-label="Contact">
      <div className={styles.panel}>
        <SectionHeading label="06 // Contact" title="Start your project" />
        <PretextBlock
          text={CONTACT_SUBTITLE}
          lineHeight={1.65}
          shrinkwrap
          as="p"
          className={styles.subtitle}
        >
          {CONTACT_SUBTITLE}
        </PretextBlock>
        <div className={styles.buttonRow}>
          <OutlineButton href={cta.href} magnetic>
            {cta.label}
          </OutlineButton>
          <span className={styles.prompt} aria-hidden="true">
            response time: &lt; 24h <span className={styles.cursor}>▮</span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Contact
