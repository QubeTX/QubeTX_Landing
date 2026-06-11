import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import { useKeySequence, QUBETX, KONAMI } from './useKeySequence'

const type = (keys: string[]) => {
  for (const key of keys) fireEvent.keyDown(window, { key })
}

describe('useKeySequence', () => {
  it('fires after the exact sequence', () => {
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(QUBETX, onMatch))
    type(['q', 'u', 'b', 'e', 't', 'x'])
    expect(onMatch).toHaveBeenCalledTimes(1)
  })

  it('recovers from a wrong key and restarts on the first key', () => {
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(QUBETX, onMatch))
    type(['q', 'u', 'z', 'q', 'u', 'b', 'e', 't', 'x'])
    expect(onMatch).toHaveBeenCalledTimes(1)
  })

  it('matches the Konami arrows case-insensitively', () => {
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(KONAMI, onMatch))
    type([
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ])
    expect(onMatch).toHaveBeenCalledTimes(1)
  })

  it('ignores keystrokes inside inputs', () => {
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(QUBETX, onMatch))
    const input = document.createElement('input')
    document.body.appendChild(input)
    for (const key of ['q', 'u', 'b', 'e', 't', 'x']) {
      fireEvent.keyDown(input, { key })
    }
    expect(onMatch).not.toHaveBeenCalled()
    input.remove()
  })
})
