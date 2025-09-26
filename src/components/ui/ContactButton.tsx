import React from 'react'
import styles from './ContactButton.module.css'

type ContactButtonProps = {
  href: string
  children: React.ReactNode
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

const ContactButton: React.FC<ContactButtonProps> = ({
  href,
  children,
  target = '_blank',
  rel = 'noopener noreferrer'
}) => {
  return (
    <a href={href} target={target} rel={rel} className={styles.contactButton}>
      <span>{children}</span>
      <svg
        className={styles.arrowIcon}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

export default ContactButton
