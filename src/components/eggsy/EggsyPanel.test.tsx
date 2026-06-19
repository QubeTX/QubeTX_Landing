import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EggsyPanel from './EggsyPanel'
import { EGGS } from '@/data/eggKey'

describe('EggsyPanel', () => {
  it('renders the title, every egg row, and the download control', () => {
    render(<EggsyPanel />)

    expect(screen.getByRole('heading', { name: /you found the key/i })).toBeInTheDocument()

    for (const egg of EGGS) {
      expect(screen.getByText(egg.name)).toBeInTheDocument()
      expect(screen.getByText(egg.trigger)).toBeInTheDocument()
    }

    expect(
      screen.getByRole('button', { name: /download the egg key/i }),
    ).toBeInTheDocument()
  })
})
