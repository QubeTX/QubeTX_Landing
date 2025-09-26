import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HERO_CONTENT } from '../data/content'
import Hero from '../components/sections/Hero'

describe('Hero', () => {
  it('renders the hero headline and supporting copy', () => {
    render(<Hero content={HERO_CONTENT} />)

    expect(
      screen.getByRole('heading', {
        name: /web development and digital infrastructure/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /professional website development, maintenance services, and backend api infrastructure/i
      )
    ).toBeInTheDocument()

    expect(screen.getByText(/a department of es development llc/i)).toBeInTheDocument()
  })
})
