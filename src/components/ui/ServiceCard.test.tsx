import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ServiceCard from './ServiceCard'
import type { Service } from '@/data/content'

const service: Service = {
  id: 'test-service',
  icon: 'code',
  title: 'Test Service',
  description: 'A test description for this service.',
}

describe('ServiceCard', () => {
  it('renders pill index, lucide icon, title, and description', () => {
    const { container } = render(<ServiceCard {...service} index={2} />)
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.getByText('Test Service')).toBeInTheDocument()
    expect(screen.getByText('A test description for this service.')).toBeInTheDocument()
  })

  it('carries the service anchor id and data-interactive', () => {
    render(<ServiceCard {...service} index={0} />)
    const article = screen.getByRole('article')
    expect(article).toHaveAttribute('id', 'service-test-service')
    expect(article).toHaveAttribute('data-interactive', 'true')
  })
})
