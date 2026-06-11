import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NavDropdown from './NavDropdown'
import type { NavItem } from '@/data/content'

const item: NavItem = {
  id: 'services',
  label: 'Services',
  href: '#services',
  children: [
    { label: 'Web Development', href: '#service-web-development' },
    { label: 'Maintenance', href: '#service-maintenance' },
  ],
}

describe('NavDropdown', () => {
  it('wires aria-expanded and aria-controls to the panel', () => {
    render(<NavDropdown item={item} active={false} onNavigate={() => {}} />)
    const trigger = screen.getByRole('button', { name: /services/i })
    expect(trigger).toHaveAttribute('aria-controls')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    expect(screen.getByRole('list').id).toBe(trigger.getAttribute('aria-controls'))
  })

  it('ArrowDown opens the panel and focuses the first item', async () => {
    render(<NavDropdown item={item} active={false} onNavigate={() => {}} />)
    const trigger = screen.getByRole('button', { name: /services/i })

    fireEvent.keyDown(trigger, { key: 'ArrowDown' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await act(async () => {
      await new Promise((r) => requestAnimationFrame(r))
    })
    expect(screen.getByRole('link', { name: /web development/i })).toHaveFocus()
  })

  it('selecting an item calls onNavigate and closes the panel', () => {
    const onNavigate = vi.fn()
    render(<NavDropdown item={item} active={false} onNavigate={onNavigate} />)
    fireEvent.click(screen.getByRole('button', { name: /services/i }))
    fireEvent.click(screen.getByRole('link', { name: /maintenance/i }))

    expect(onNavigate).toHaveBeenCalledWith('#service-maintenance')
    expect(screen.getByRole('button', { name: /services/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })
})
