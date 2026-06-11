import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Technologies from './Technologies'
import { TECH_STACK } from '@/data/content'

describe('Technologies', () => {
  it('renders the section heading', () => {
    render(<Technologies />)
    expect(screen.getByRole('heading', { name: /built with modern tech/i })).toBeInTheDocument()
  })

  it('renders every tech item with its glyph', () => {
    render(<Technologies />)
    for (const tech of TECH_STACK) {
      expect(screen.getByText(tech.name)).toBeInTheDocument()
    }
    expect(screen.getByText('▲')).toBeInTheDocument()
    expect(screen.getByText('RS')).toBeInTheDocument()
  })
})
