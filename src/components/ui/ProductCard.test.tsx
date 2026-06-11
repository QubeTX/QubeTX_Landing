import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductCard from './ProductCard'
import { PRODUCTS } from '@/data/content'

const product = PRODUCTS[0]

describe('ProductCard', () => {
  it('renders code, name, tagline, status, and tags', () => {
    render(<ProductCard product={product} />)
    expect(screen.getByText(product.code)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(product.name))).toBeInTheDocument()
    expect(screen.getByText(product.status)).toBeInTheDocument()
    for (const tag of product.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument()
    }
  })

  it('is one external link to the product page with a new-tab note', () => {
    render(<ProductCard product={product} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', product.href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('(opens in a new tab)')).toBeInTheDocument()
  })

  it('applies the striped variant class', () => {
    render(<ProductCard product={product} striped />)
    expect(screen.getByRole('link').className).toMatch(/striped/)
  })
})
