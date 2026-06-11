import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'
import { HERO_CONTENT } from '@/data/content'

describe('Hero', () => {
  it('renders the eyebrow', () => {
    render(<Hero content={HERO_CONTENT} />)
    expect(screen.getByText(HERO_CONTENT.eyebrow)).toBeInTheDocument()
  })

  it('renders all three headline lines', () => {
    render(<Hero content={HERO_CONTENT} />)
    for (const line of HERO_CONTENT.headline) {
      expect(screen.getByText(line)).toBeInTheDocument()
    }
  })

  it('renders the description', () => {
    render(<Hero content={HERO_CONTENT} />)
    expect(screen.getByText(HERO_CONTENT.description)).toBeInTheDocument()
  })

  it('renders the primary CTA as an external link to the contact form', () => {
    render(<Hero content={HERO_CONTENT} />)
    const link = screen.getByRole('link', { name: new RegExp(HERO_CONTENT.primaryCta.label, 'i') })
    expect(link).toHaveAttribute('href', HERO_CONTENT.primaryCta.href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the secondary CTA pointing at the services anchor', () => {
    render(<Hero content={HERO_CONTENT} />)
    const link = screen.getByRole('link', { name: new RegExp(HERO_CONTENT.secondaryCta.label, 'i') })
    expect(link).toHaveAttribute('href', '#services')
  })

  it('renders the company line and the dot-field slot', () => {
    const { container } = render(<Hero content={HERO_CONTENT} />)
    expect(screen.getByText(HERO_CONTENT.company)).toBeInTheDocument()
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
