import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from './Contact'
import type { ContactCta } from '@/data/content'

const cta: ContactCta = {
  label: 'Start Your Project',
  href: 'https://app.youform.com/forms/3lbykv4l',
}

describe('Contact', () => {
  it('renders the heading', () => {
    render(<Contact cta={cta} />)
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(<Contact cta={cta} />)
    expect(screen.getByText(/ready to transform your digital presence/i)).toBeInTheDocument()
  })

  it('renders a link with the CTA href and label', () => {
    render(<Contact cta={cta} />)
    const link = screen.getByRole('link', { name: /start your project/i })
    expect(link).toHaveAttribute('href', cta.href)
  })
})
