import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactButton from './ContactButton'

describe('ContactButton', () => {
  it('renders children text', () => {
    render(<ContactButton href="https://example.com">Click Me</ContactButton>)
    expect(screen.getByText(/Click Me/i)).toBeInTheDocument()
  })

  it('link has correct href', () => {
    render(<ContactButton href="https://example.com">Link</ContactButton>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('defaults to target="_blank" and rel="noopener noreferrer"', () => {
    render(<ContactButton href="https://example.com">Link</ContactButton>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('allows overriding target', () => {
    render(
      <ContactButton href="https://example.com" target="_self">
        Link
      </ContactButton>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_self')
  })

  it('allows overriding rel', () => {
    render(
      <ContactButton href="https://example.com" rel="nofollow">
        Link
      </ContactButton>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('rel', 'nofollow')
  })

  it('renders an SVG arrow icon', () => {
    const { container } = render(
      <ContactButton href="https://example.com">Link</ContactButton>
    )
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
