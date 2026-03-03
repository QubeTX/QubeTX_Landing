import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

import TechStack from './TechStack'

describe('TechStack', () => {
  it('renders the section heading', () => {
    render(<TechStack />)
    expect(screen.getByRole('heading', { name: /built with modern tech/i })).toBeInTheDocument()
  })

  it('renders all tech item names', () => {
    render(<TechStack />)
    expect(screen.getByText('Next.js 16')).toBeInTheDocument()
    expect(screen.getByText('React 19')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
    expect(screen.getByText('Three.js')).toBeInTheDocument()
    expect(screen.getByText('Framer Motion')).toBeInTheDocument()
  })

  it('renders tech item icons', () => {
    render(<TechStack />)
    expect(screen.getByText('▲')).toBeInTheDocument()
    expect(screen.getByText('TS')).toBeInTheDocument()
  })
})
