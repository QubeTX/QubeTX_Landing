import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

import Process from './Process'

describe('Process', () => {
  it('renders the section heading', () => {
    render(<Process />)
    expect(screen.getByRole('heading', { name: /our process/i })).toBeInTheDocument()
  })

  it('renders all step numbers', () => {
    render(<Process />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('04')).toBeInTheDocument()
    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText('06')).toBeInTheDocument()
  })

  it('renders all step titles', () => {
    render(<Process />)
    expect(screen.getByText('Discovery')).toBeInTheDocument()
    expect(screen.getByText('Strategy')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Launch')).toBeInTheDocument()
    expect(screen.getByText('Growth')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<Process />)
    expect(screen.getByText(/understanding your business goals/i)).toBeInTheDocument()
    expect(screen.getByText(/comprehensive roadmap/i)).toBeInTheDocument()
  })
})
