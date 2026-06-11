import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import type { Service } from '@/data/content'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

vi.mock('../ui/FeatureCard', () => ({
  default: ({ title }: { title: string }) => <div data-testid="feature-card">{title}</div>,
}))

import Features from './Features'

const items: Service[] = [
  { id: 'a', icon: 'code', title: 'Web Development', description: 'desc a' },
  { id: 'b', icon: 'wrench', title: 'Maintenance', description: 'desc b' },
  { id: 'c', icon: 'network', title: 'API Infrastructure', description: 'desc c' },
]

describe('Features', () => {
  it('renders the correct number of service cards', () => {
    render(<Features items={items} />)
    const cards = screen.getAllByTestId('feature-card')
    expect(cards).toHaveLength(3)
  })

  it('passes service data to each card', () => {
    render(<Features items={items} />)
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Maintenance')).toBeInTheDocument()
    expect(screen.getByText('API Infrastructure')).toBeInTheDocument()
  })
})
