import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Products from './Products'
import { PRODUCTS } from '@/data/content'

describe('Products', () => {
  it('renders the section heading and the terminal boot line', () => {
    render(<Products />)
    expect(screen.getByRole('heading', { name: /terminal-grade tooling/i })).toBeInTheDocument()
    expect(document.querySelectorAll('[data-boot-char]').length).toBeGreaterThan(0)
  })

  it('renders every product as an external link', () => {
    render(<Products />)
    for (const product of PRODUCTS) {
      const link = screen.getByRole('link', {
        name: new RegExp(product.name, 'i'),
      })
      expect(link).toHaveAttribute('href', product.href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('shows all product codes', () => {
    render(<Products />)
    for (const product of PRODUCTS) {
      expect(screen.getByText(product.code)).toBeInTheDocument()
    }
  })
})
