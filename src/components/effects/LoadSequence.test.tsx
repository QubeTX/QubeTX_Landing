import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import LoadSequence from './LoadSequence'

describe('LoadSequence', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-loading', '')
  })

  it('lifts the data-loading FOUC guard on mount', () => {
    render(<LoadSequence />)
    expect(document.documentElement).not.toHaveAttribute('data-loading')
  })

  it('renders nothing', () => {
    const { container } = render(<LoadSequence />)
    expect(container).toBeEmptyDOMElement()
  })
})
