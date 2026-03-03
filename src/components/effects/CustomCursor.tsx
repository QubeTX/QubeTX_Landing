"use client";

import { useEffect, useRef, useState, type FC } from 'react'
import styles from './CustomCursor.module.css'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-interactive="true"]'

type Position = {
  x: number
  y: number
}

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

const createInitialPosition = (): Position => ({
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
})

const CustomCursor: FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null)
  const cursorRingRef = useRef<HTMLDivElement | null>(null)
  const cursorBloomRef = useRef<HTMLDivElement | null>(null)

  const pointerRef = useRef<Position>(createInitialPosition())
  const ringPositionRef = useRef<Position>(createInitialPosition())
  const bloomPositionRef = useRef<Position>(createInitialPosition())

  const animationFrameRef = useRef<number | null>(null)
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

    // Ensure we don't start at 0,0 if window is available
    if (pointerRef.current.x === 0 && pointerRef.current.y === 0) {
      pointerRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
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

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false
      return target.closest(INTERACTIVE_SELECTOR) !== null
    }

    const handlePointerOver = (event: PointerEvent) => {
      if (isInteractive(event.target)) {
        setCursorVisibility(true)
        toggleCursorState(true)
      }
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (isInteractive(event.target)) {
        if (!isInteractive(event.relatedTarget)) {
          toggleCursorState(false)
        }
      }
    }

    document.body.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.body.addEventListener('pointerout', handlePointerOut, { passive: true })

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', handleWindowLeave)
    document.addEventListener('mouseleave', handleWindowLeave)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', handleWindowLeave)
      document.removeEventListener('mouseleave', handleWindowLeave)
      document.body.removeEventListener('pointerover', handlePointerOver)
      document.body.removeEventListener('pointerout', handlePointerOut)

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
