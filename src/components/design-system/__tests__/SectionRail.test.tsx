import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, act } from '@testing-library/react'
import SectionRail from '../SectionRail'
import { DS_SECTIONS } from '@/data/designSystem'

describe('SectionRail', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Wide-viewport gate: the rail only exists ≥1600px
    Object.defineProperty(window, 'innerWidth', { value: 1920, configurable: true })
  })
  afterEach(() => vi.useRealTimers())

  it('renders one cube tick per registry section + the slot-rolled readout', () => {
    const { container } = render(<SectionRail />)
    act(() => {
      vi.advanceTimersByTime(50) // measurement effect
    })
    const ticks = container.querySelectorAll('[class*="tick"]')
    expect(ticks).toHaveLength(DS_SECTIONS.length)
    // Readout controllers built slot cells over the resting text
    const srs = container.querySelectorAll('[data-slot-sr]')
    expect(srs.length).toBe(2)
    expect(srs[0].textContent).toContain('SEC')
    act(() => vi.runOnlyPendingTimers())
  })

  it('stays hidden (renders nothing) under 1600px', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true })
    const { container } = render(<SectionRail />)
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(container.querySelector('svg')).toBeNull()
    act(() => vi.runOnlyPendingTimers())
  })

  it('is decorative (aria-hidden) and pointer-transparent', () => {
    const { container } = render(<SectionRail />)
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    act(() => vi.runOnlyPendingTimers())
  })
})
