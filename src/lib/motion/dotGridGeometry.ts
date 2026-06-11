/**
 * DotGrid geometry — pure module, unit-tested.
 *
 * The mockup ramp: dots grow and brighten along the top-left → bottom-right
 * diagonal. Baselines are static; anime.js animates only the multiplier
 * channels (`breathe` for the idle loop, `pulse`/`mix` for ripples) so the
 * idle animation and ripples never fight over the same tween values.
 * Render: radius = baseR * breathe * pulse.
 */

export type Dot = {
  x: number
  y: number
  /** Static baseline radius (px), ramped 1.0 → 2.6 toward bottom-right. */
  baseR: number
  /** Static baseline alpha, ramped 0.12 → 0.55. */
  baseA: number
  /** Static color-ramp position (0 = blue, 1 = purple). */
  baseMix: number
  /** Idle-loop multiplier channel (anime.js). */
  breathe: number
  /** Ripple multiplier channel (anime.js). */
  pulse: number
  /** Transient color flash channel (anime.js). */
  mix: number
  /** Entrance scale channel (anime.js). */
  scale: number
  /** Entrance alpha channel (anime.js). */
  alpha: number
}

export type DotGridGeometry = {
  dots: Dot[]
  cols: number
  rows: number
  pitch: number
  offsetX: number
  offsetY: number
}

export const DOT_PITCH = 28
export const MAX_DOTS = 900

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/**
 * Builds a centered grid for the given box. If the box would exceed
 * `maxDots`, the pitch widens until it fits (frame-budget knob).
 */
export function computeGrid(
  width: number,
  height: number,
  pitch = DOT_PITCH,
  maxDots = MAX_DOTS
): DotGridGeometry {
  if (width <= 0 || height <= 0) {
    return { dots: [], cols: 0, rows: 0, pitch, offsetX: 0, offsetY: 0 }
  }

  let p = pitch
  let cols = Math.max(1, Math.floor(width / p))
  let rows = Math.max(1, Math.floor(height / p))
  while (cols * rows > maxDots) {
    p += 4
    cols = Math.max(1, Math.floor(width / p))
    rows = Math.max(1, Math.floor(height / p))
  }

  const offsetX = (width - (cols - 1) * p) / 2
  const offsetY = (height - (rows - 1) * p) / 2

  const dots: Dot[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tx = cols === 1 ? 1 : c / (cols - 1)
      const ty = rows === 1 ? 1 : r / (rows - 1)
      const t = clamp01(tx * 0.5 + ty * 0.5)
      dots.push({
        x: offsetX + c * p,
        y: offsetY + r * p,
        baseR: 1 + 1.6 * t,
        baseA: 0.12 + 0.43 * t,
        baseMix: t,
        breathe: 1,
        pulse: 1,
        mix: 0,
        scale: 1,
        alpha: 1,
      })
    }
  }

  return { dots, cols, rows, pitch: p, offsetX, offsetY }
}

/** Index of the grid dot nearest to a point — pure math, no DOM reads. */
export function nearestDotIndex(geo: DotGridGeometry, px: number, py: number): number {
  if (geo.dots.length === 0) return -1
  const clampInt = (v: number, max: number) => Math.max(0, Math.min(max, v))
  const c = clampInt(Math.round((px - geo.offsetX) / geo.pitch), geo.cols - 1)
  const r = clampInt(Math.round((py - geo.offsetY) / geo.pitch), geo.rows - 1)
  return r * geo.cols + c
}
