import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'
import { NAV_ITEMS, SERVICES, CONTACT_CTA } from '@/data/content'

describe('Header', () => {
  it('renders the skip link and logo back-to-top anchor', () => {
    render(<Header />)
    expect(screen.getByText('Skip to content')).toHaveAttribute('href', '#main-content')
    expect(screen.getByLabelText(/back to top/i)).toHaveAttribute('href', '#main-content')
  })

  it('renders every nav item from NAV_ITEMS', () => {
    render(<Header />)
    for (const item of NAV_ITEMS) {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0)
    }
  })

  it('SERVICES dropdown opens on click and lists all service anchors', () => {
    render(<Header />)
    const trigger = screen.getByRole('button', { name: /services/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    for (const service of SERVICES) {
      const link = screen.getByRole('link', { name: new RegExp(service.title, 'i') })
      expect(link).toHaveAttribute('href', `#service-${service.id}`)
    }
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute(
      'href',
      '#services'
    )
  })

  it('Escape closes the dropdown and restores focus to the trigger', () => {
    render(<Header />)
    const trigger = screen.getByRole('button', { name: /services/i })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
  })

  it('outside pointerdown closes the dropdown', () => {
    render(<Header />)
    const trigger = screen.getByRole('button', { name: /services/i })
    fireEvent.click(trigger)
    fireEvent.pointerDown(document.body)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders the GET STARTED CTA pointing at the contact form', () => {
    render(<Header />)
    const cta = screen.getByRole('link', { name: /get started/i })
    expect(cta).toHaveAttribute('href', CONTACT_CTA.href)
    expect(cta).toHaveAttribute('target', '_blank')
  })

  it('renders the mobile menu trigger', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })
})
