'use client'

import { useEffect, useRef, type FC } from 'react'
import { animate, utils } from '@/lib/motion/anime'
import { buildColorRamp, rampIndex } from '@/lib/motion/colorRamp'
import { computeGrid, nearestDotIndex, type DotGridGeometry } from '@/lib/motion/dotGridGeometry'
import { prefersReducedMotion } from '@/lib/motion/useMotionPreference'
import { EASE_ANIME } from '@/lib/motion/tokens'
import { subscribe as subscribeResize } from '@/lib/pretext/resizeCoordinator'

/**
 * The hero dot-matrix field — fully anime.js-driven (replaces the R3F
 * DotMatrix). anime.js animates a flat array of plain dot objects
 * (breathe/pulse/mix channels); this component is just the Canvas 2D
 * blitter that paints whatever the engine computed.
 *
 * Optimization model:
 * - feathered geometry CULLS invisible dots — anime never ticks them
 * - all choreography uses distance-based delay functions (radially correct
 *   ripples, no dependence on a complete lattice)
 * - one paint loop, paused off-screen (IO); engine pauses on hidden tabs
 *
 * Interactions:
 * - pointer move/down on the [data-dot-pointer-surface] ancestor (or the
 *   container itself) → elastic ripple from the nearest dot
 * - window 'qubetx:pulse' CustomEvent {x, y, strength} → external ripple
 *   (load-sequence beat, easter eggs, logo snap-back)
 *
 * The container is pointer-events:none (it may extend past the hero into
 * the next section); events come from the pointer surface. Resize goes
 * through the shared resizeCoordinator (NO ResizeObserver — codebase law).
 * Reduced motion: static ramp, no loops, no ripples.
 */

export const PULSE_EVENT = 'qubetx:pulse'

export type PulseDetail = { x: number; y: number; strength?: number }

/** Fire a dot-field ripple from a viewport coordinate. */
export function firePulse(detail: PulseDetail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PULSE_EVENT, { detail }))
  }
}

const LUT = buildColorRamp('#0066FF', '#7c3aed', 256)
const DPR_CAP = 1.5
/** ms of delay per px of distance from the ripple origin */
const RIPPLE_SPEED = 0.35
const IDLE_SPEED = 0.16
const ENTRANCE_SPEED = 0.22

type DotGridProps = {
  className?: string
  /** Skip the corner entrance (used when remounting after resize). */
  entrance?: boolean
}

const DotGrid: FC<DotGridProps> = ({ className, entrance = true }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return // jsdom / very old browsers

    const reduced = prefersReducedMotion()
    let geo: DotGridGeometry = {
      dots: [],
      cols: 0,
      rows: 0,
      pitch: 28,
      offsetX: 0,
      offsetY: 0,
      width: 0,
      height: 0,
    }
    let raf: number | null = null
    let visible = true
    let idleAnim: ReturnType<typeof animate> | null = null
    let disposed = false

    const distDelay = (speed: number, ox: number, oy: number) => (_t: unknown, i: number) =>
      Math.hypot(geo.dots[i].x - ox, geo.dots[i].y - oy) * speed

    const draw = () => {
      ctx.clearRect(0, 0, geo.width, geo.height)
      for (const dot of geo.dots) {
        const r = dot.baseR * dot.breathe * dot.pulse * dot.scale
        if (r <= 0.05) continue
        const alpha = Math.min(1, dot.baseA * dot.alpha + dot.mix * 0.3)
        if (alpha <= 0.01) continue
        ctx.globalAlpha = alpha
        ctx.fillStyle = LUT[rampIndex(dot.baseMix * 0.7 + dot.mix * 0.3)]
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = () => {
      raf = null
      if (!visible || disposed) return
      draw()
      raf = requestAnimationFrame(loop)
    }
    const startLoop = () => {
      if (raf == null && visible && !disposed) raf = requestAnimationFrame(loop)
    }
    const stopLoop = () => {
      if (raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    const sizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return rect
    }

    const startIdle = () => {
      if (reduced || geo.dots.length === 0) return
      idleAnim = animate(geo.dots, {
        breathe: [
          { to: 1.14, duration: 1700, ease: 'inOutSine' },
          { to: 1, duration: 1700, ease: 'inOutSine' },
        ],
        loop: true,
        delay: distDelay(IDLE_SPEED, geo.width / 2, geo.height / 2),
      })
    }

    const build = (withEntrance: boolean) => {
      utils.remove(geo.dots)
      idleAnim = null
      const rect = sizeCanvas()
      geo = computeGrid(rect.width, rect.height, undefined, undefined, true)
      if (geo.dots.length === 0) return

      if (reduced || !withEntrance) {
        draw()
        startIdle()
        return
      }

      // Entrance: sweep in from the bottom-right (the ramp's bright corner)
      for (const dot of geo.dots) {
        dot.scale = 0
        dot.alpha = 0
      }
      animate(geo.dots, {
        scale: [0, 1],
        alpha: [0, 1],
        duration: 600,
        ease: 'out(3)',
        delay: distDelay(ENTRANCE_SPEED, geo.width, geo.height),
      }).then(() => {
        if (!disposed) startIdle()
      })
    }

    const ripple = (originIndex: number, strength = 1) => {
      if (reduced || originIndex < 0 || geo.dots.length === 0) return
      const origin = geo.dots[originIndex]
      utils.remove(geo.dots, undefined, 'pulse')
      utils.remove(geo.dots, undefined, 'mix')
      animate(geo.dots, {
        pulse: [
          { to: 1 + 1.2 * strength, duration: 160, ease: 'out(2)' },
          { to: 1, duration: 520, ease: 'outElastic(1, .6)' },
        ],
        mix: [
          { to: Math.min(1, 0.8 * strength), duration: 160, ease: EASE_ANIME },
          { to: 0, duration: 600, ease: EASE_ANIME },
        ],
        delay: distDelay(RIPPLE_SPEED, origin.x, origin.y),
      })
    }

    // Pointer → ripple, throttled by distance (≥24px) or time (≥90ms)
    const lastPoint = { x: -9999, y: -9999, t: 0 }
    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const now = performance.now()
      const dx = x - lastPoint.x
      const dy = y - lastPoint.y
      if (e.type === 'pointermove' && dx * dx + dy * dy < 576 && now - lastPoint.t < 90) return
      lastPoint.x = x
      lastPoint.y = y
      lastPoint.t = now
      ripple(nearestDotIndex(geo, x, y), e.type === 'pointerdown' ? 1.6 : 1)
    }

    const onExternalPulse = (e: Event) => {
      const { x, y, strength = 1.5 } = (e as CustomEvent<PulseDetail>).detail ?? {
        x: 0,
        y: 0,
      }
      const rect = container.getBoundingClientRect()
      ripple(nearestDotIndex(geo, x - rect.left, y - rect.top), strength)
    }

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting)
            if (visible) {
              idleAnim?.play()
              startLoop()
            } else {
              idleAnim?.pause()
              stopLoop()
            }
          })
        : null
    io?.observe(container)

    build(entrance)
    startLoop()

    // Pointer events come from the surface ancestor (the container itself is
    // pointer-events:none so its below-the-hero extension never blocks clicks)
    const surface =
      (container.closest('[data-dot-pointer-surface]') as HTMLElement | null) ?? container
    const unsubscribeResize = subscribeResize(() => build(false))
    surface.addEventListener('pointermove', onPointer, { passive: true })
    surface.addEventListener('pointerdown', onPointer, { passive: true })
    window.addEventListener(PULSE_EVENT, onExternalPulse)

    return () => {
      disposed = true
      stopLoop()
      io?.disconnect()
      unsubscribeResize()
      surface.removeEventListener('pointermove', onPointer)
      surface.removeEventListener('pointerdown', onPointer)
      window.removeEventListener(PULSE_EVENT, onExternalPulse)
      utils.remove(geo.dots)
    }
  }, [entrance])

  return (
    <div ref={containerRef} className={className} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}

export default DotGrid
