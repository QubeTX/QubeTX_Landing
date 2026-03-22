import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

import ProjectCard from './ProjectCard'

describe('ProjectCard', () => {
  const baseProps = {
    id: 'test-project',
    href: 'https://example.com',
    image: '/test.png',
    alt: 'Test Project Image',
    title: 'Test Project',
    tags: ['React', 'TypeScript', 'Next.js'],
    description: 'A test project description.',
  }

  it('renders the title', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByRole('heading', { name: /Test Project/i })).toBeInTheDocument()
  })

  it('renders the image with correct alt text', () => {
    render(<ProjectCard {...baseProps} />)
    const img = screen.getByAltText('Test Project Image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.png')
  })

  it('renders all tags', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByText('A test project description.')).toBeInTheDocument()
  })

  it('wraps in a link with correct href, target, and rel', () => {
    render(<ProjectCard {...baseProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
