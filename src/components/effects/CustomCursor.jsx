import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './CustomCursor.module.css'

function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [cursorEnlarged, setCursorEnlarged] = useState(false)
  const positionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)
  const cleanupRef = useRef([])

  useEffect(() => {
    const cursorDot = cursorDotRef.current
    const cursorRing = cursorRingRef.current

    const updateCursorPosition = () => {
      if (cursorDot && cursorRing) {
        const { x, y } = positionRef.current
        cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`
        cursorRing.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    const moveCursor = (e) => {
      positionRef.current.x = e.clientX
      positionRef.current.y = e.clientY

      if (!cursorEnlarged) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        animationFrameRef.current = requestAnimationFrame(updateCursorPosition)
      }
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

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Simplified magnetic effect with debouncing
    const setupInteractiveElements = () => {
      // Clean up previous listeners
      cleanupRef.current.forEach(({ el, handlers }) => {
        el.removeEventListener('mouseenter', handlers.handleEnter)
        el.removeEventListener('mouseleave', handlers.handleLeave)
      })
      cleanupRef.current = []

      const interactiveElements = document.querySelectorAll('a, button, [role="button"], [data-interactive="true"]')
      
      interactiveElements.forEach(el => {
        const handleEnter = () => {
          setCursorEnlarged(true)
          if (cursorDot && cursorRing) {
            cursorDot.classList.add(styles.enlarged)
            cursorRing.classList.add(styles.enlarged)
          }
        }

        const handleLeave = () => {
          setCursorEnlarged(false)
          if (cursorDot && cursorRing) {
            cursorDot.classList.remove(styles.enlarged)
            cursorRing.classList.remove(styles.enlarged)
            // Smoothly return to mouse position
            const { x, y } = positionRef.current
            cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`
            cursorRing.style.transform = `translate3d(${x}px, ${y}px, 0)`
          }
        }

        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)

        cleanupRef.current.push({
          el,
          handlers: { handleEnter, handleLeave }
        })
      })
    }

    // Initial setup with delay
    const timer = setTimeout(setupInteractiveElements, 100)

    // Only observe significant DOM changes
    let observerTimeout
    const observer = new MutationObserver(() => {
      clearTimeout(observerTimeout)
      observerTimeout = setTimeout(setupInteractiveElements, 500)
    })
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false,
      characterData: false
    })

    return () => {
      clearTimeout(timer)
      clearTimeout(observerTimeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      observer.disconnect()
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)

      cleanupRef.current.forEach(({ el, handlers }) => {
        el.removeEventListener('mouseenter', handlers.handleEnter)
        el.removeEventListener('mouseleave', handlers.handleLeave)
      })
      cleanupRef.current = []
    }
  }, [cursorEnlarged])

  return (
    <>
      <div ref={cursorDotRef} className={styles.cursorDot}></div>
      <div ref={cursorRingRef} className={styles.cursorRing}></div>
    </>
  )
}

export default CustomCursor