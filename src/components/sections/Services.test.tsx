import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Services from './Services'
import { SERVICES } from '@/data/content'

describe('Services', () => {
  it('renders the section heading', () => {
    render(<Services items={SERVICES} />)
    expect(screen.getByRole('heading', { name: /what we build/i })).toBeInTheDocument()
  })

  it('renders one card per service with the dropdown anchor ids', () => {
    render(<Services items={SERVICES} />)
    for (const service of SERVICES) {
      expect(screen.getByText(service.title)).toBeInTheDocument()
      expect(document.getElementById(`service-${service.id}`)).not.toBeNull()
    }
  })
})
