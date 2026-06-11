import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

import OutlineButton from './OutlineButton'

describe('OutlineButton', () => {
  it('renders an anchor with the given label', () => {
    render(<OutlineButton href="#contact">Get Started</OutlineButton>)
    const link = screen.getByRole('link', { name: /get started/i })
    expect(link).toHaveAttribute('href', '#contact')
  })

  it('adds new-tab attributes and an sr-only note for external links', () => {
    render(<OutlineButton href="https://example.com">Go</OutlineButton>)
    const link = screen.getByRole('link', { name: /go/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('(opens in a new tab)')).toBeInTheDocument()
  })

  it('does not add new-tab attributes for anchor links', () => {
    render(<OutlineButton href="#services">Explore</OutlineButton>)
    const link = screen.getByRole('link', { name: /explore/i })
    expect(link).not.toHaveAttribute('target')
  })

  it('marks itself for cursor interaction, and magnetic when requested', () => {
    render(<OutlineButton href="#contact" magnetic>CTA</OutlineButton>)
    const link = screen.getByRole('link', { name: /cta/i })
    expect(link).toHaveAttribute('data-interactive', 'true')
    expect(link).toHaveAttribute('data-magnetic', 'true')
  })
})
