import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import type { Project } from '@/data/content'

vi.mock('framer-motion', async () => {
  const mocks = await import('@/test/mocks/framer-motion')
  return mocks
})

vi.mock('../ui/ProjectCard', () => ({
  default: ({ title }: { title: string }) => <div data-testid="project-card">{title}</div>,
}))

import Projects from './Projects'

const items: Project[] = [
  {
    id: 'proj-1',
    href: 'https://example.com',
    image: '/img1.png',
    alt: 'Project One',
    title: 'Project One',
    tags: ['Tag'],
    description: 'First project',
  },
  {
    id: 'proj-2',
    href: 'https://example.com/2',
    image: '/img2.png',
    alt: 'Project Two',
    title: 'Project Two',
    tags: ['Tag'],
    description: 'Second project',
  },
]

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects items={items} />)
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Projects items={items} />)
    expect(screen.getByText(/a collection of our public work/i)).toBeInTheDocument()
  })

  it('renders the correct number of project cards', () => {
    render(<Projects items={items} />)
    const cards = screen.getAllByTestId('project-card')
    expect(cards).toHaveLength(2)
  })

  it('passes project data to each card', () => {
    render(<Projects items={items} />)
    expect(screen.getByText('Project One')).toBeInTheDocument()
    expect(screen.getByText('Project Two')).toBeInTheDocument()
  })
})
