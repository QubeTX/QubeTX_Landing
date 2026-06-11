import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from './Contact'
import { CONTACT_CTA } from '@/data/content'

describe('Contact', () => {
  it('renders the heading', () => {
    render(<Contact cta={CONTACT_CTA} />)
    expect(screen.getByRole('heading', { name: /start your project/i })).toBeInTheDocument()
  })

  it('renders the CTA as an external link to the form', () => {
    render(<Contact cta={CONTACT_CTA} />)
    const link = screen.getByRole('link', { name: new RegExp(CONTACT_CTA.label, 'i') })
    expect(link).toHaveAttribute('href', CONTACT_CTA.href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
