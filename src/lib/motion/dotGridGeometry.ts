/**
 * DotGrid geometry — pure module, unit-tested.
 *
 * The mockup ramp: dots grow and brighten along the top-left → bottom-right
 * diagonal. Baselines are static; anime.js animates only the multiplier
 * channels (`breathe` for the idle loop, `pulse`/`mix` for ripples) so the
 * idle animation and ripples never fight over the same tween values.
 * Render: radius = baseR * breathe * pulse.
 *
 * With `feather` enabled the field fades to alpha 0 toward the left edge and
 * across the bottom band (no hard cutoffs — it dissolves into the content
 * column and the next section). Fully transparent dots are CULLED from the
 * array: anime.js never ticks them and the blitter never paints them. All
 * choreography uses distance-based delay functions, so culling is safe
 * (no reliance on a complete row-major lattice).
 */

export type Dot = {
  x: number
  y: number
  /** Static baseline radius (px), ramped 1.0 → 2.6 toward bottom-right. */
  baseR: number
  /** Static baseline alpha (includes feathering). */
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
  width: number
  height: number
}

export const DOT_PITCH = 28
export const MAX_DOTS = 1400

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

const smoothstep = (edge0: number, edge1: number, v: number) => {
  const t = clamp01((v - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function buildDots(
  width: number,
  height: number,
  pitch: number,
  feather: boolean
): { dots: Dot[]; cols: number; rows: number; offsetX: number; offsetY: number } {
  const cols = Math.max(1, Math.floor(width / pitch))
  const rows = Math.max(1, Math.floor(height / pitch))
  const offsetX = (width - (cols - 1) * pitch) / 2
  const offsetY = (height - (rows - 1) * pitch) / 2

  const dots: Dot[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tx = cols === 1 ? 1 : c / (cols - 1)
      const ty = rows === 1 ? 1 : r / (rows - 1)
      const t = clamp01(tx * 0.5 + ty * 0.5)

      let alphaShape = 1
      if (feather) {
        // Dissolve toward the left edge and through the bottom band
        alphaShape = smoothstep(0.04, 0.52, tx) * (1 - smoothstep(0.74, 1, ty))
      }
      const baseA = (0.12 + 0.43 * t) * alphaShape
      if (baseA < 0.012) continue // cull: never ticked, never painted

      dots.push({
        x: offsetX + c * pitch,
        y: offsetY + r * pitch,
        baseR: 1 + 1.6 * t,
        baseA,
        baseMix: t,
        breathe: 1,
        pulse: 1,
        mix: 0,
        scale: 1,
        alpha: 1,
      })
    }
  }
  return { dots, cols, rows, offsetX, offsetY }
}

/**
 * Builds a centered grid for the given box. If the (post-cull) dot count
 * would exceed `maxDots`, the pitch widens until it fits (frame-budget knob).
 */
export function computeGrid(
  width: number,
  height: number,
  pitch = DOT_PITCH,
  maxDots = MAX_DOTS,
  feather = false
): DotGridGeometry {
  if (width <= 0 || height <= 0) {
    return { dots: [], cols: 0, rows: 0, pitch, offsetX: 0, offsetY: 0, width: 0, height: 0 }
  }

  let p = pitch
  let built = buildDots(width, height, p, feather)
  while (built.dots.length > maxDots) {
    p += 4
    built = buildDots(width, height, p, feather)
  }

  return { ...built, pitch: p, width, height }
}

/** Index of the dot nearest to a point — linear scan (cull-safe), pure math. */
export function nearestDotIndex(geo: DotGridGeometry, px: number, py: number): number {
  let best = -1
  let bestDist = Infinity
  for (let i = 0; i < geo.dots.length; i++) {
    const dx = geo.dots[i].x - px
    const dy = geo.dots[i].y - py
    const d = dx * dx + dy * dy
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  }
  return best
}
