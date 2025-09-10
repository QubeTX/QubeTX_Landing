import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [cursorEnlarged, setCursorEnlarged] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const cursorDot = cursorDotRef.current
    const cursorRing = cursorRingRef.current

    const moveCursor = (e) => {
      setLastX(e.clientX)
      setLastY(e.clientY)

      requestAnimationFrame(() => {
        if (!cursorEnlarged && cursorDot && cursorRing) {
          cursorDot.style.left = `${e.clientX}px`
          cursorDot.style.top = `${e.clientY}px`
          cursorRing.style.left = `${e.clientX}px`
          cursorRing.style.top = `${e.clientY}px`
        }
      })
    }

    const handleMouseEnter = () => {
      if (cursorDot && cursorRing) {
        cursorDot.style.opacity = '1'
        cursorRing.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      if (cursorDot && cursorRing) {
        cursorDot.style.opacity = '0'
        cursorRing.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add magnetic effect to interactive elements
    const setupInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], .featureCard')
      
      interactiveElements.forEach(el => {
        const handleEnter = () => setCursorEnlarged(true)
        const handleLeave = () => {
          setCursorEnlarged(false)
          // Reset cursor position smoothly
          requestAnimationFrame(() => {
            if (cursorDot && cursorRing) {
              cursorDot.style.left = `${lastX}px`
              cursorDot.style.top = `${lastY}px`
              cursorRing.style.left = `${lastX}px`
              cursorRing.style.top = `${lastY}px`
            }
          })
        }

        const handleMove = (e) => {
          if (cursorEnlarged && cursorDot && cursorRing) {
            const rect = el.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const distanceX = e.clientX - centerX
            const distanceY = e.clientY - centerY
            
            // Magnetic pull effect
            const pull = 0.2 // Adjust pull strength
            const moveX = e.clientX - distanceX * pull
            const moveY = e.clientY - distanceY * pull
            
            requestAnimationFrame(() => {
              cursorDot.style.left = `${moveX}px`
              cursorDot.style.top = `${moveY}px`
              cursorRing.style.left = `${moveX}px`
              cursorRing.style.top = `${moveY}px`
            })
          }
        }

        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
        el.addEventListener('mousemove', handleMove)

        // Store event handlers for cleanup
        el._cursorHandlers = { handleEnter, handleLeave, handleMove }
      })
    }

    // Set up interactive elements after a short delay to ensure DOM is ready
    const timer = setTimeout(setupInteractiveElements, 100)

    // Observe DOM changes and reapply event listeners
    const observer = new MutationObserver(() => {
      setupInteractiveElements()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)

      // Clean up interactive element event listeners
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], .featureCard')
      interactiveElements.forEach(el => {
        if (el._cursorHandlers) {
          el.removeEventListener('mouseenter', el._cursorHandlers.handleEnter)
          el.removeEventListener('mouseleave', el._cursorHandlers.handleLeave)
          el.removeEventListener('mousemove', el._cursorHandlers.handleMove)
        }
      })
    }
  }, [cursorEnlarged, lastX, lastY])

  return (
    <>
      <div ref={cursorDotRef} className={`${styles.cursorDot} ${cursorEnlarged ? styles.enlarged : ''}`}></div>
      <div ref={cursorRingRef} className={`${styles.cursorRing} ${cursorEnlarged ? styles.enlarged : ''}`}></div>
    </>
  )
}

export default CustomCursor