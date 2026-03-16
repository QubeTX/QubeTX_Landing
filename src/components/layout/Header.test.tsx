import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/ui/QubeTXLogo', () => ({
  default: ({ className }: { className?: string }) => <svg data-testid="logo-svg" className={className} />,
}))

import Header from './Header'

describe('Header', () => {
  it('renders the QubeTX text', () => {
    render(<Header />)
    expect(screen.getByText('QubeTX')).toBeInTheDocument()
  })

  it('links to #main-content', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: /qubetx - back to top/i })
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('has the correct aria-label', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: /qubetx - back to top/i })
    expect(link).toBeInTheDocument()
  })

  it('renders skip to content link', () => {
    render(<Header />)
    const skipLink = screen.getByRole('link', { name: /skip to content/i })
    expect(skipLink).toHaveAttribute('href', '#main-content')
    expect(skipLink).toHaveClass('sr-only')
  })

  it('renders the logo SVG', () => {
    render(<Header />)
    expect(screen.getByTestId('logo-svg')).toBeInTheDocument()
  })
})
