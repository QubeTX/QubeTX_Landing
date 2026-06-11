import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import EasterEggProvider from './EasterEggProvider'
import { PULSE_EVENT } from '../DotGrid'

describe('EasterEggProvider', () => {
  it('prints the console signature once', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<EasterEggProvider />)
    render(<EasterEggProvider />)
    const signatureCalls = spy.mock.calls.filter((args) =>
      String(args[0]).includes('SYSTEMS NOMINAL')
    )
    expect(signatureCalls).toHaveLength(1)
    spy.mockRestore()
  })

  it('typing "qubetx" fires a dot-field pulse', () => {
    render(<EasterEggProvider />)
    const onPulse = vi.fn()
    window.addEventListener(PULSE_EVENT, onPulse)
    for (const key of ['q', 'u', 'b', 'e', 't', 'x']) {
      fireEvent.keyDown(window, { key })
    }
    window.removeEventListener(PULSE_EVENT, onPulse)
    expect(onPulse).toHaveBeenCalledTimes(1)
  })
})
