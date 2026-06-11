import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MobileMenu from './MobileMenu'
import { NAV_ITEMS, SERVICES, CONTACT_CTA } from '@/data/content'

function renderMenu(onNavigate = vi.fn()) {
  render(<MobileMenu items={NAV_ITEMS} cta={CONTACT_CTA} onNavigate={onNavigate} />)
  return onNavigate
}

describe('MobileMenu', () => {
  it('opens from the hamburger and shows all nav items + flattened services', () => {
    renderMenu()
    const trigger = screen.getByRole('button', { name: /open menu/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.documentElement).toHaveAttribute('data-menu-open')

    for (const item of NAV_ITEMS) {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0)
    }
    for (const service of SERVICES) {
      expect(
        screen.getByRole('link', { name: new RegExp(`^${service.title}$`, 'i') })
      ).toHaveAttribute('href', `#service-${service.id}`)
    }
  })

  it('Escape closes the overlay and clears the html flag', () => {
    renderMenu()
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    expect(document.documentElement).not.toHaveAttribute('data-menu-open')
  })

  it('link click navigates and closes', () => {
    const onNavigate = renderMenu()
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    fireEvent.click(screen.getByRole('link', { name: /work/i }))

    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    // navigation is deferred one frame so the overlay can begin exiting
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        expect(onNavigate).toHaveBeenCalledWith('#work')
        resolve()
      })
    })
  })

  it('renders the CTA inside the overlay', () => {
    renderMenu()
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    expect(
      screen.getByRole('link', { name: new RegExp(CONTACT_CTA.label, 'i') })
    ).toHaveAttribute('href', CONTACT_CTA.href)
  })
})
