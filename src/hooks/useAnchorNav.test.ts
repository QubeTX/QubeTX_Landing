import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAnchorNav } from './useAnchorNav'

// useLenis is mocked to undefined (setup.ts), so the hook takes the native
// scrollIntoView fallback — jsdom lacks it, so each target stubs its own.
function addSection(id: string) {
  const el = document.createElement('div')
  el.id = id
  el.scrollIntoView = vi.fn()
  document.body.appendChild(el)
  return el
}

describe('useAnchorNav', () => {
  beforeEach(() => {
    document.body.replaceChildren()
    history.replaceState(null, '', '/')
  })

  it('ignores non-anchor hrefs', () => {
    const { result } = renderHook(() => useAnchorNav())
    expect(result.current('/wallpaper')).toBe(false)
  })

  it('returns false when the target does not exist', () => {
    const { result } = renderHook(() => useAnchorNav())
    expect(result.current('#missing')).toBe(false)
  })

  it('scrolls, updates the hash, and moves focus to the target', () => {
    const el = addSection('services')
    const { result } = renderHook(() => useAnchorNav())

    expect(result.current('#services')).toBe(true)
    expect(el.scrollIntoView).toHaveBeenCalled()
    expect(window.location.hash).toBe('#services')
    expect(el.getAttribute('tabindex')).toBe('-1')
    expect(document.activeElement).toBe(el)
  })

  it('focuses without scrolling — the scroll engine owns the scroll', () => {
    const el = addSection('contact')
    const focus = vi.spyOn(el, 'focus')
    const { result } = renderHook(() => useAnchorNav())

    result.current('#contact')
    expect(focus).toHaveBeenCalledWith({ preventScroll: true })
  })

  it('leaves an existing tabindex untouched', () => {
    const el = addSection('main-content')
    el.setAttribute('tabindex', '0')
    const { result } = renderHook(() => useAnchorNav())

    result.current('#main-content')
    expect(el.getAttribute('tabindex')).toBe('0')
    expect(document.activeElement).toBe(el)
  })
})
