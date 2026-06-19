import { describe, it, expect } from 'vitest'
import {
  HERO_CONTENT,
  SERVICES,
  NAV_ITEMS,
  PRODUCTS,
  ABOUT_CONTENT,
  PROJECTS,
  TECH_STACK,
  PROCESS,
  CONTACT_CTA,
} from './content'

describe('HERO_CONTENT', () => {
  it('has all required fields', () => {
    expect(HERO_CONTENT.eyebrow).toBeDefined()
    expect(HERO_CONTENT.headline).toBeDefined()
    expect(HERO_CONTENT.description).toBeDefined()
    expect(HERO_CONTENT.primaryCta).toBeDefined()
    expect(HERO_CONTENT.secondaryCta).toBeDefined()
    expect(HERO_CONTENT.company).toBeDefined()
  })

  it('headline is exactly three non-empty lines (mockup composition)', () => {
    expect(HERO_CONTENT.headline).toHaveLength(3)
    for (const line of HERO_CONTENT.headline) {
      expect(line.length).toBeGreaterThan(0)
    }
  })

  it('primary CTA points at the contact form, secondary at services', () => {
    expect(HERO_CONTENT.primaryCta.href).toBe(CONTACT_CTA.href)
    expect(HERO_CONTENT.secondaryCta.href).toBe('#services')
  })
})

describe('SERVICES', () => {
  it('has five services', () => {
    expect(SERVICES).toHaveLength(5)
  })

  it('each service has required fields', () => {
    for (const service of SERVICES) {
      expect(service.id).toBeDefined()
      expect(service.icon).toBeDefined()
      expect(service.title.length).toBeGreaterThan(0)
      expect(service.description.length).toBeGreaterThan(0)
    }
  })

  it('has unique IDs', () => {
    const ids = SERVICES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('NAV_ITEMS', () => {
  it('matches the mockup nav (five items)', () => {
    expect(NAV_ITEMS.map((n) => n.label)).toEqual([
      'Services',
      'Technologies',
      'About Us',
      'Work',
      'Contact',
    ])
  })

  it('all hrefs are page anchors', () => {
    for (const item of NAV_ITEMS) {
      expect(item.href).toMatch(/^#/)
    }
  })

  it('Services children map to service card anchors', () => {
    const services = NAV_ITEMS.find((n) => n.id === 'services')
    expect(services?.children).toHaveLength(SERVICES.length)
    for (const child of services?.children ?? []) {
      const serviceId = child.href.replace('#service-', '')
      expect(SERVICES.some((s) => s.id === serviceId)).toBe(true)
    }
  })
})

describe('PRODUCTS', () => {
  it('has the product line', () => {
    expect(PRODUCTS.map((p) => p.code)).toEqual([
      'TR-300',
      // 'SD-300',   // TEMP HIDDEN (WIP) — reinstate alongside content.ts
      'ND-300',
      'WB-300',
      // 'SHAUGHVOS', // TEMP HIDDEN (WIP) — reinstate alongside content.ts
      'QK-300',
    ])
  })

  it('every product is an https link on a QubeTX-owned domain', () => {
    for (const product of PRODUCTS) {
      expect(product.href).toMatch(/^https:\/\/(reports\.qubetx\.com|qork\.me)/)
    }
  })

  it('each product has required fields and unique IDs', () => {
    for (const product of PRODUCTS) {
      expect(product.id).toBeDefined()
      expect(product.name.length).toBeGreaterThan(0)
      expect(product.tagline.length).toBeGreaterThan(0)
      expect(product.description.length).toBeGreaterThan(0)
      expect(product.tags.length).toBeGreaterThan(0)
      expect(['STABLE', 'ACTIVE']).toContain(product.status)
    }
    const ids = PRODUCTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('ABOUT_CONTENT', () => {
  it('has a title, manifesto paragraphs, and stats', () => {
    expect(ABOUT_CONTENT.title.length).toBeGreaterThan(0)
    expect(ABOUT_CONTENT.manifesto.length).toBeGreaterThan(0)
    expect(ABOUT_CONTENT.stats.length).toBeGreaterThan(0)
    for (const stat of ABOUT_CONTENT.stats) {
      expect(stat.value.length).toBeGreaterThan(0)
      expect(stat.label.length).toBeGreaterThan(0)
    }
  })
})

describe('PROJECTS', () => {
  it('does not contain the System Reports project (lives in PRODUCTS now)', () => {
    expect(PROJECTS.some((p) => p.id === 'system-reports')).toBe(false)
    expect(PROJECTS).toHaveLength(6)
  })

  it('each project has required fields', () => {
    for (const project of PROJECTS) {
      expect(project.id).toBeDefined()
      expect(project.href).toBeDefined()
      expect(project.image).toBeDefined()
      expect(project.alt).toBeDefined()
      expect(project.title).toBeDefined()
      expect(project.tags.length).toBeGreaterThan(0)
      expect(project.description).toBeDefined()
    }
  })

  it('has unique IDs', () => {
    const ids = PROJECTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all hrefs are valid HTTPS URLs', () => {
    for (const project of PROJECTS) {
      expect(project.href).toMatch(/^https:\/\//)
    }
  })
})

describe('TECH_STACK', () => {
  it('is a non-empty array', () => {
    expect(TECH_STACK.length).toBeGreaterThan(0)
  })

  it('each item has required fields', () => {
    for (const item of TECH_STACK) {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.icon).toBeDefined()
    }
  })

  it('has unique IDs', () => {
    const ids = TECH_STACK.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('PROCESS', () => {
  it('is a non-empty array', () => {
    expect(PROCESS.length).toBeGreaterThan(0)
  })

  it('each step has required fields', () => {
    for (const step of PROCESS) {
      expect(step.id).toBeDefined()
      expect(step.number).toBeDefined()
      expect(step.title).toBeDefined()
      expect(step.description).toBeDefined()
    }
  })

  it('has unique IDs', () => {
    const ids = PROCESS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('steps are ordered by number', () => {
    for (let i = 1; i < PROCESS.length; i++) {
      const prev = parseInt(PROCESS[i - 1].number, 10)
      const curr = parseInt(PROCESS[i].number, 10)
      expect(curr).toBeGreaterThan(prev)
    }
  })
})

describe('CONTACT_CTA', () => {
  it('has a non-empty label', () => {
    expect(CONTACT_CTA.label.length).toBeGreaterThan(0)
  })

  it('has a valid HTTPS href', () => {
    expect(CONTACT_CTA.href).toMatch(/^https:\/\//)
  })
})
