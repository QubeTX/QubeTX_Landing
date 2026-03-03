import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/ui/QubeTXLogo', () => ({
  default: ({ className }: { className?: string }) => <svg data-testid="logo-svg" className={className} />,
}))

import Footer from './Footer'

describe('Footer', () => {
  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '#services')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Process' })).toHaveAttribute('href', '#process')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('renders connect links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Start Your Project' })).toHaveAttribute('href', '#contact')
    expect(screen.getByRole('link', { name: 'emmettshaughnessy.com(opens in a new tab)' })).toHaveAttribute('href', 'https://emmettshaughnessy.com')
  })

  it('renders dynamic year in copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('sets external link attributes correctly', () => {
    render(<Footer />)
    const externalLink = screen.getByRole('link', { name: 'emmettshaughnessy.com(opens in a new tab)' })
    expect(externalLink).toHaveAttribute('target', '_blank')
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the ES Development LLC link', () => {
    render(<Footer />)
    const esDevLink = screen.getByRole('link', { name: 'ES Development LLC(opens in a new tab)' })
    expect(esDevLink).toHaveAttribute('href', 'https://emmettshaughnessy.com')
    expect(esDevLink).toHaveAttribute('target', '_blank')
    expect(esDevLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
