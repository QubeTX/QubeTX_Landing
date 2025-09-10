import React from 'react'
import styles from './ContactButton.module.css'

function ContactButton() {
  return (
    <a 
      href="https://app.youform.com/forms/3lbykv4l" 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.contactButton}
    >
      <span>Start Your Project</span>
      <svg 
        className={styles.arrowIcon} 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
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