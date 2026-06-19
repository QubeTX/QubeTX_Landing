import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Work from './Work'
import { PROJECTS } from '@/data/content'

describe('Work', () => {
  it('renders the section heading', () => {
    render(<Work items={PROJECTS} />)
    expect(screen.getByRole('heading', { name: /client projects/i })).toBeInTheDocument()
  })

  it('renders all six projects and no System Reports card', () => {
    render(<Work items={PROJECTS} />)
    for (const project of PROJECTS) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
    expect(screen.queryByText('System Reports')).toBeNull()
    expect(PROJECTS).toHaveLength(6)
  })
})
