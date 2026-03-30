'use client';

import type { FC } from 'react'
import ContactButton from '../ui/ContactButton'
import type { ContactCta } from '@/data/content'
import { PretextBlock } from '@/lib/pretext'
import styles from './Contact.module.css'

type ContactProps = {
  cta: ContactCta
}

const CONTACT_SUBTITLE = "Ready to transform your digital presence? Let's discuss your project."

const Contact: FC<ContactProps> = ({ cta }) => {
  return (
    <section className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.contactCard}>
        <PretextBlock text="Get In Touch" lineHeight={1.2} as="h2" className={`unbounded-heading ${styles.contactTitle}`}>
          Get In Touch
        </PretextBlock>
        <PretextBlock text={CONTACT_SUBTITLE} lineHeight={1.6} as="p" className={styles.contactSubtitle}>
          Ready to transform your digital presence? Let&apos;s discuss your project.
        </PretextBlock>

        <div className={styles.contactButtonWrapper}>
          <ContactButton href={cta.href}>{cta.label}</ContactButton>
        </div>
      </div>
    </section>
  )
}

export default Contact
