import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

import FeatureCard from './FeatureCard'

describe('FeatureCard', () => {
  const baseProps = {
    id: 'test-feature',
    icon: '🎨',
    title: 'Test Feature',
    description: 'A test description for this feature.',
  }

  it('renders the icon', () => {
    render(<FeatureCard {...baseProps} />)
    expect(screen.getByText('🎨')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<FeatureCard {...baseProps} />)
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<FeatureCard {...baseProps} />)
    expect(screen.getByText('A test description for this feature.')).toBeInTheDocument()
  })

  it('renders lineBreak text when provided', () => {
    render(<FeatureCard {...baseProps} lineBreak="Extra Line" />)
    expect(screen.getByText(/Extra Line/)).toBeInTheDocument()
  })

  it('does not render lineBreak when not provided', () => {
    const { container } = render(<FeatureCard {...baseProps} />)
    expect(container.querySelector('br')).toBeNull()
  })

  it('has data-interactive attribute', () => {
    render(<FeatureCard {...baseProps} />)
    const article = screen.getByRole('article')
    expect(article).toHaveAttribute('data-interactive', 'true')
  })
})
