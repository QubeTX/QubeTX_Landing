'use client'

import { useEffect, useRef } from 'react'

/**
 * Matches a typed key sequence (O(1) position pointer, no buffers).
 * Ignores keystrokes inside inputs/textareas/contentEditable.
 */
export function useKeySequence(sequence: string[], onMatch: () => void): void {
  const onMatchRef = useRef(onMatch)
  useEffect(() => {
    onMatchRef.current = onMatch
  })
  const key = sequence.join('|')

  useEffect(() => {
    const seq = key.split('|')
    let pos = 0

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      const pressed = e.key.toLowerCase()
      if (pressed === seq[pos]) {
        pos += 1
      } else {
        pos = pressed === seq[0] ? 1 : 0
      }
      if (pos === seq.length) {
        pos = 0
        onMatchRef.current()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key])
}

export const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
]

export const QUBETX = ['q', 'u', 'b', 'e', 't', 'x']
