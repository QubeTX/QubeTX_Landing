import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

type InteractiveCleanup = {
  el: Element
  handleEnter: () => void
  handleLeave: () => void
}

type Position = {
  x: number
  y: number
}

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

const createInitialPosition = (): Position => ({
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
})

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null)
  const cursorRingRef = useRef<HTMLDivElement | null>(null)
  const cursorBloomRef = useRef<HTMLDivElement | null>(null)

  const pointerRef = useRef<Position>(createInitialPosition())
  const ringPositionRef = useRef<Position>(createInitialPosition())
  const bloomPositionRef = useRef<Position>(createInitialPosition())

  const animationFrameRef = useRef<number | null>(null)
  const scheduledSetupRef = useRef<number | null>(null)
  const cleanupRef = useRef<InteractiveCleanup[]>([])
  const enlargedRef = useRef(false)
  const isVisibleRef = useRef(false)

  const [isPointerFine, setIsPointerFine] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handlePointerChange = () => setIsPointerFine(pointerQuery.matches)
    const handleMotionChange = () => setPrefersReducedMotion(motionQuery.matches)

    handlePointerChange()
    handleMotionChange()

    pointerQuery.addEventListener('change', handlePointerChange)
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      pointerQuery.removeEventListener('change', handlePointerChange)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  const isCursorEnabled = isPointerFine && !prefersReducedMotion

  useEffect(() => {
    if (!isCursorEnabled || typeof window === 'undefined') {
      return
    }

    const cursorDot = cursorDotRef.current
    const cursorRing = cursorRingRef.current
    const cursorBloom = cursorBloomRef.current

    if (!cursorDot || !cursorRing || !cursorBloom) {
      return
    }

    ringPositionRef.current = { ...pointerRef.current }
    bloomPositionRef.current = { ...pointerRef.current }

    const setCursorVisibility = (visible: boolean) => {
      if (isVisibleRef.current === visible) {
        return
      }

      isVisibleRef.current = visible
      cursorDot.style.opacity = visible ? '1' : '0'
      cursorRing.style.opacity = visible ? '1' : '0'
      cursorBloom.style.opacity = visible ? '0.4' : '0'
    }

    const updateCursorVisuals = () => {
      const target = pointerRef.current

      cursorDot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`

      const ringPosition = ringPositionRef.current
      ringPosition.x = lerp(ringPosition.x, target.x, 0.32)
      ringPosition.y = lerp(ringPosition.y, target.y, 0.32)
      cursorRing.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`

      const bloomPosition = bloomPositionRef.current
      bloomPosition.x = lerp(bloomPosition.x, target.x, 0.22)
      bloomPosition.y = lerp(bloomPosition.y, target.y, 0.22)
      cursorBloom.style.transform = `translate3d(${bloomPosition.x}px, ${bloomPosition.y}px, 0)`

      animationFrameRef.current = requestAnimationFrame(updateCursorVisuals)
    }

    animationFrameRef.current = requestAnimationFrame(updateCursorVisuals)

    const toggleCursorState = (isEnlarged: boolean) => {
      if (enlargedRef.current === isEnlarged) {
        return
      }

      enlargedRef.current = isEnlarged
      cursorDot.classList.toggle(styles.enlarged, isEnlarged)
      cursorRing.classList.toggle(styles.enlarged, isEnlarged)
      cursorBloom.classList.toggle(styles.enlarged, isEnlarged)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY
      }

      if (!isVisibleRef.current) {
        setCursorVisibility(true)
      }
    }

    const handleWindowLeave = () => {
      setCursorVisibility(false)
      toggleCursorState(false)
    }

    const setupInteractiveElements = () => {
      cleanupRef.current.forEach(({ el, handleEnter, handleLeave }) => {
        el.removeEventListener('pointerenter', handleEnter)
        el.removeEventListener('pointerleave', handleLeave)
      })
      cleanupRef.current = []

      const interactiveElements = document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], [data-interactive="true"]'
      )

      interactiveElements.forEach((element) => {
        const handleEnter = () => {
          setCursorVisibility(true)
          toggleCursorState(true)
        }
        const handleLeave = () => toggleCursorState(false)

        element.addEventListener('pointerenter', handleEnter)
        element.addEventListener('pointerleave', handleLeave)

        cleanupRef.current.push({ el: element, handleEnter, handleLeave })
      })
    }

    const observer = new MutationObserver(() => {
      if (scheduledSetupRef.current !== null) {
        return
      }

      scheduledSetupRef.current = window.requestAnimationFrame(() => {
        scheduledSetupRef.current = null
        setupInteractiveElements()
      })
    })

    setupInteractiveElements()

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', handleWindowLeave)
    document.addEventListener('mouseleave', handleWindowLeave)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (scheduledSetupRef.current !== null) {
        cancelAnimationFrame(scheduledSetupRef.current)
        scheduledSetupRef.current = null
      }

      observer.disconnect()

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', handleWindowLeave)
      document.removeEventListener('mouseleave', handleWindowLeave)

      cleanupRef.current.forEach(({ el, handleEnter, handleLeave }) => {
        el.removeEventListener('pointerenter', handleEnter)
        el.removeEventListener('pointerleave', handleLeave)
      })
      cleanupRef.current = []

      setCursorVisibility(false)
      toggleCursorState(false)
    }
  }, [isCursorEnabled])

  if (!isCursorEnabled) {
    return null
  }

  return (
    <>
      <div ref={cursorBloomRef} className={styles.cursorBloom} />
      <div ref={cursorRingRef} className={styles.cursorRing} />
      <div ref={cursorDotRef} className={styles.cursorDot} />
    </>
  )
}

export default CustomCursor
