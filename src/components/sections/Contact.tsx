import type { FC } from 'react'
import ContactButton from '../ui/ContactButton'
import type { ContactCta } from '@/data/content'
import styles from './Contact.module.css'

type ContactProps = {
  cta: ContactCta
}

const Contact: FC<ContactProps> = ({ cta }) => {
  return (
    <section className={styles.contact} aria-labelledby="contact-heading">
      <h2 id="contact-heading" className={`unbounded-heading ${styles.contactTitle}`}>
        Get In Touch
      </h2>
      <p className={styles.contactSubtitle}>
        Ready to transform your digital presence? Let&apos;s discuss your project.
      </p>

      <div className={styles.contactButtonWrapper}>
        <ContactButton href={cta.href}>{cta.label}</ContactButton>
      </div>
    </section>
  )
}

export default Contact
