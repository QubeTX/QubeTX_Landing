import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from './About'
import { ABOUT_CONTENT, PROCESS } from '@/data/content'

describe('About', () => {
  it('renders the section title and manifesto', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { name: new RegExp(ABOUT_CONTENT.title, 'i') })
    ).toBeInTheDocument()
    for (const paragraph of ABOUT_CONTENT.manifesto) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
  })

  it('renders all stats', () => {
    render(<About />)
    for (const stat of ABOUT_CONTENT.stats) {
      // values like "06" also appear as process step numbers — any match is fine
      expect(screen.getAllByText(stat.value).length).toBeGreaterThan(0)
      expect(screen.getByText(stat.label)).toBeInTheDocument()
    }
  })

  it('renders all six process steps (absorbed Process section)', () => {
    render(<About />)
    for (const step of PROCESS) {
      expect(screen.getByRole('heading', { name: step.title })).toBeInTheDocument()
      expect(screen.getByText(step.description)).toBeInTheDocument()
    }
  })
})
