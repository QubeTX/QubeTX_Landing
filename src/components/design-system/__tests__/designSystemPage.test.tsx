import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import DesignSystemPage from '../../../../app/design-system/page'
import { DS_SECTIONS, DS_KIT_FILENAME } from '@/data/designSystem'

describe('/design-system page structure', () => {
  it('renders every registry section as an anchored element', () => {
    const { container } = render(<DesignSystemPage />)
    for (const s of DS_SECTIONS) {
      expect(container.querySelector(`#${CSS.escape(s.id)}`), `missing #${s.id}`).not.toBeNull()
    }
  })

  it('sidebar nav links match the registry 1:1', () => {
    render(<DesignSystemPage />)
    const nav = screen.getByRole('navigation', { name: /design system sections/i })
    const links = within(nav).getAllByRole('link')
    expect(links).toHaveLength(DS_SECTIONS.length)
    links.forEach((link, i) => {
      expect(link).toHaveAttribute('href', `#${DS_SECTIONS[i].id}`)
      expect(link.textContent).toContain(DS_SECTIONS[i].num)
    })
  })

  it('offers the kit download from the sidebar', () => {
    render(<DesignSystemPage />)
    const download = screen.getByRole('link', { name: /download kit/i })
    expect(download).toHaveAttribute('href', `/${DS_KIT_FILENAME}`)
    expect(download).toHaveAttribute('download')
  })

  it('offers the mobile jump select covering every section', () => {
    render(<DesignSystemPage />)
    const select = screen.getByLabelText(/jump to section/i)
    expect(select.querySelectorAll('option')).toHaveLength(DS_SECTIONS.length)
  })
})
