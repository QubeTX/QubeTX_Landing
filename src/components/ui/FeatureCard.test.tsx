import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Service } from '@/data/content'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

import FeatureCard from './FeatureCard'

describe('FeatureCard', () => {
  const baseProps: Service = {
    id: 'test-service',
    icon: 'code',
    title: 'Test Service',
    description: 'A test description for this service.',
  }

  it('renders a lucide icon from the registry key', () => {
    const { container } = render(<FeatureCard {...baseProps} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<FeatureCard {...baseProps} />)
    expect(screen.getByText('Test Service')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<FeatureCard {...baseProps} />)
    expect(screen.getByText('A test description for this service.')).toBeInTheDocument()
  })

  it('carries the service anchor id for the nav dropdown', () => {
    render(<FeatureCard {...baseProps} />)
    const article = screen.getByRole('article')
    expect(article).toHaveAttribute('id', 'service-test-service')
  })

  it('has data-interactive attribute', () => {
    render(<FeatureCard {...baseProps} />)
    const article = screen.getByRole('article')
    expect(article).toHaveAttribute('data-interactive', 'true')
  })
})
