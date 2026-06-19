import { describe, it, expect } from 'vitest'
import { EGGS, buildEggKeyText, EGG_KEY_FILENAME } from './eggKey'

describe('eggKey', () => {
  it('has four eggs, each with required fields and a zero-padded index', () => {
    expect(EGGS).toHaveLength(4)
    for (const egg of EGGS) {
      expect(egg.n).toMatch(/^\d{2}$/)
      expect(egg.name.length).toBeGreaterThan(0)
      expect(egg.trigger.length).toBeGreaterThan(0)
      expect(egg.effect.length).toBeGreaterThan(0)
    }
  })

  it('builds a public .txt dossier from EGGS, with no internal references', () => {
    const text = buildEggKeyText()
    expect(EGG_KEY_FILENAME).toMatch(/\.txt$/)
    for (const egg of EGGS) {
      expect(text).toContain(egg.name.toUpperCase())
      expect(text).toContain(egg.trigger)
      expect(text).toContain(egg.effect)
    }
    expect(text).toContain('QUBETX')
    // Public-facing: must not leak source paths or "answer key" framing.
    expect(text).not.toMatch(/src\//)
  })
})
