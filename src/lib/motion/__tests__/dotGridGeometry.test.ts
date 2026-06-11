import { describe, it, expect } from 'vitest'
import { computeGrid, nearestDotIndex, MAX_DOTS } from '../dotGridGeometry'

describe('computeGrid', () => {
  it('returns an empty grid for degenerate boxes', () => {
    expect(computeGrid(0, 100).dots).toHaveLength(0)
    expect(computeGrid(100, -5).dots).toHaveLength(0)
  })

  it('fills the box at the requested pitch', () => {
    const geo = computeGrid(280, 280, 28)
    expect(geo.cols).toBe(10)
    expect(geo.rows).toBe(10)
    expect(geo.dots).toHaveLength(100)
  })

  it('widens the pitch instead of exceeding the dot budget', () => {
    const geo = computeGrid(4000, 4000, 28)
    expect(geo.dots.length).toBeLessThanOrEqual(MAX_DOTS)
    expect(geo.pitch).toBeGreaterThan(28)
  })

  it('ramps size/alpha/color toward the bottom-right (mockup gradient)', () => {
    const geo = computeGrid(560, 560, 28)
    const first = geo.dots[0]
    const last = geo.dots[geo.dots.length - 1]
    expect(first.baseR).toBeLessThan(last.baseR)
    expect(first.baseA).toBeLessThan(last.baseA)
    expect(first.baseMix).toBe(0)
    expect(last.baseMix).toBe(1)
  })

  it('initializes animation channels at identity', () => {
    const geo = computeGrid(100, 100, 28)
    for (const dot of geo.dots) {
      expect(dot.breathe).toBe(1)
      expect(dot.pulse).toBe(1)
      expect(dot.mix).toBe(0)
    }
  })
})

describe('nearestDotIndex', () => {
  it('returns -1 for an empty grid', () => {
    expect(nearestDotIndex(computeGrid(0, 0), 10, 10)).toBe(-1)
  })

  it('finds the dot under the pointer', () => {
    const geo = computeGrid(280, 280, 28)
    const idx = nearestDotIndex(geo, geo.dots[33].x + 3, geo.dots[33].y - 3)
    expect(idx).toBe(33)
  })

  it('clamps out-of-bounds points to the grid edge', () => {
    const geo = computeGrid(280, 280, 28)
    expect(nearestDotIndex(geo, -999, -999)).toBe(0)
    expect(nearestDotIndex(geo, 9999, 9999)).toBe(geo.dots.length - 1)
  })
})
