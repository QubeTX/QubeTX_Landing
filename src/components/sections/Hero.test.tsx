import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import type { HeroContent } from '@/data/content'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

import Hero from './Hero'

const content: HeroContent = {
  title: 'Web Development',
  conjunction: 'and',
  highlight: 'Digital Infrastructure',
  subheadline: 'Professional website development, maintenance services, and backend API infrastructure for modern digital businesses',
  company: 'A Department of ES Development LLC',
} as const

describe('Hero', () => {
  it('renders the title parts', () => {
    render(<Hero content={content} />)
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('and')).toBeInTheDocument()
    expect(screen.getByText('Digital Infrastructure')).toBeInTheDocument()
  })

  it('renders the subheadline', () => {
    render(<Hero content={content} />)
    expect(screen.getByText(/professional website development/i)).toBeInTheDocument()
  })

  it('renders the company name', () => {
    render(<Hero content={content} />)
    expect(screen.getByText(/a department of es development llc/i)).toBeInTheDocument()
  })
})
