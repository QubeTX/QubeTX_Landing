import { describe, it, expect } from 'vitest'
import {
  HERO_CONTENT,
  FEATURES,
  PROJECTS,
  TECH_STACK,
  PROCESS,
  CONTACT_CTA,
} from './content'

describe('HERO_CONTENT', () => {
  it('has all required fields', () => {
    expect(HERO_CONTENT.title).toBeDefined()
    expect(HERO_CONTENT.conjunction).toBeDefined()
    expect(HERO_CONTENT.highlight).toBeDefined()
    expect(HERO_CONTENT.subheadline).toBeDefined()
    expect(HERO_CONTENT.company).toBeDefined()
  })

  it('fields are non-empty strings', () => {
    expect(HERO_CONTENT.title.length).toBeGreaterThan(0)
    expect(HERO_CONTENT.conjunction.length).toBeGreaterThan(0)
    expect(HERO_CONTENT.highlight.length).toBeGreaterThan(0)
    expect(HERO_CONTENT.subheadline.length).toBeGreaterThan(0)
    expect(HERO_CONTENT.company.length).toBeGreaterThan(0)
  })
})

describe('FEATURES', () => {
  it('is a non-empty array', () => {
    expect(FEATURES.length).toBeGreaterThan(0)
  })

  it('each feature has required fields', () => {
    for (const feature of FEATURES) {
      expect(feature.id).toBeDefined()
      expect(feature.icon).toBeDefined()
      expect(feature.title).toBeDefined()
      expect(feature.description).toBeDefined()
    }
  })

  it('has unique IDs', () => {
    const ids = FEATURES.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('PROJECTS', () => {
  it('is a non-empty array', () => {
    expect(PROJECTS.length).toBeGreaterThan(0)
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
