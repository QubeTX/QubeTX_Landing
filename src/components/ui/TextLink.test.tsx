import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TextLink from './TextLink'

describe('TextLink', () => {
  it('renders an anchor with the given label and href', () => {
    render(<TextLink href="#services">Explore Our Services</TextLink>)
    const link = screen.getByRole('link', { name: /explore our services/i })
    expect(link).toHaveAttribute('href', '#services')
  })

  it('renders the glyph as decorative', () => {
    render(
      <TextLink href="#services" glyph="⠿">
        Explore
      </TextLink>
    )
    const glyph = screen.getByText('⠿')
    expect(glyph).toHaveAttribute('aria-hidden', 'true')
  })

  it('adds new-tab attributes for external links', () => {
    render(<TextLink href="https://example.com">Out</TextLink>)
    const link = screen.getByRole('link', { name: /out/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
