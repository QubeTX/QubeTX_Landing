import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MockIntersectionObserver } from '@/test/setup'
import StatValue from './StatValue'

const srText = (root: HTMLElement) =>
  root.querySelector('[data-slot-sr]')?.textContent ?? null

describe('StatValue', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renders value and label as plain text before scrolling into view', () => {
    const { container } = render(<StatValue value="07" label="Client Projects" />)
    expect(screen.getByText('07')).toBeInTheDocument()
    expect(screen.getByText('Client Projects')).toBeInTheDocument()
    expect(container.querySelector('[data-slot-cell]')).toBeNull()
  })

  it('slot-machines on first view and lands on the real value', () => {
    const { container } = render(<StatValue value="07" label="Client Projects" />)
    act(() => {
      MockIntersectionObserver.instances.forEach((io) => io.trigger(true))
    })
    // Sequence started: cells built over the plain text
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(container.querySelector('[data-slot-cell]')).not.toBeNull()

    act(() => {
      vi.runAllTimers() // 3 scrambles + landing + settle
    })
    expect(srText(container)).toBe('07')
    const chars = Array.from(container.querySelectorAll<HTMLElement>('[data-slot-cell]'))
      .map((c) => c.dataset.char ?? '')
      .join('')
    expect(chars).toBe('07')
  })

  it('preserves prefix/suffix formatting through the roll', () => {
    const { container } = render(<StatValue value="100%" label="Dedication" />)
    act(() => {
      MockIntersectionObserver.instances.forEach((io) => io.trigger(true))
      vi.runAllTimers()
    })
    expect(srText(container)).toBe('100%')
  })

  it('hover re-verifies: rolls again and re-lands on the same value', () => {
    const { container } = render(<StatValue value="07" label="Client Projects" />)
    act(() => {
      MockIntersectionObserver.instances.forEach((io) => io.trigger(true))
      vi.runAllTimers()
    })
    const stat = container.firstElementChild as HTMLElement
    fireEvent.pointerOver(stat, { pointerType: 'mouse' }) // onPointerEnter quirk
    act(() => {
      vi.runAllTimers()
    })
    expect(srText(container)).toBe('07')
  })

  it('re-entrancy: hovering mid-roll is a no-op and the value still lands', () => {
    const { container } = render(<StatValue value="06" label="Years" />)
    act(() => {
      MockIntersectionObserver.instances.forEach((io) => io.trigger(true))
      vi.advanceTimersByTime(150) // mid-sequence
    })
    const stat = container.firstElementChild as HTMLElement
    fireEvent.pointerOver(stat, { pointerType: 'mouse' })
    act(() => {
      vi.runAllTimers()
    })
    expect(srText(container)).toBe('06')
  })

  it('ignores touch pointers for the reverify', () => {
    const { container } = render(<StatValue value="07" label="Client Projects" />)
    act(() => {
      MockIntersectionObserver.instances.forEach((io) => io.trigger(true))
      vi.runAllTimers()
    })
    const stat = container.firstElementChild as HTMLElement
    const before = container.innerHTML
    fireEvent.pointerOver(stat, { pointerType: 'touch' })
    expect(container.innerHTML).toBe(before)
  })
})
