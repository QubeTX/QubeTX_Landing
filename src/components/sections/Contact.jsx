import React from 'react'
import ContactButton from '../ui/ContactButton'
import styles from './Contact.module.css'

function Contact() {
  return (
    <div className={styles.contact}>
      <h2 className={`unbounded-heading ${styles.contactTitle}`}>Get In Touch</h2>
      <p className={styles.contactSubtitle}>
        Ready to transform your digital presence? Let's discuss your project.
      </p>
      
      <div className={styles.contactButtonWrapper}>
        <ContactButton />
      </div>
    </div>
  )
}

export default Contact