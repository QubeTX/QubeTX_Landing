import { describe, it, expect } from 'vitest'
import { DS_GROUPS, DS_KIT_FILENAME, DS_SECTIONS, DS_VERSION } from './designSystem'
import pkg from '../../package.json'

describe('design-system registry', () => {
  it('stays in lockstep with the package version', () => {
    expect(DS_VERSION).toBe(pkg.version)
    expect(DS_KIT_FILENAME).toBe(`qubetx-design-system-v${pkg.version}.zip`)
  })

  it('has unique ids and sequential two-digit numbering', () => {
    const ids = DS_SECTIONS.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    DS_SECTIONS.forEach((s, i) => {
      expect(s.num).toBe(String(i).padStart(2, '0'))
    })
  })

  it('only uses registered groups, in sidebar order', () => {
    for (const s of DS_SECTIONS) {
      expect(DS_GROUPS).toContain(s.group)
    }
    // Sections are contiguous per group (registry order == page order)
    const seen: string[] = []
    for (const s of DS_SECTIONS) {
      if (seen.at(-1) !== s.group) seen.push(s.group)
    }
    expect(seen).toEqual(DS_GROUPS)
  })
})
