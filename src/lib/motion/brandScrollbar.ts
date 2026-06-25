/**
 * Brand scrollbar — the custom, animated, brand-aware OVERLAY scrollbar.
 *
 * Layer 2 of the system (layer 1 is the native restyle in globals.css). This
 * is the QubeTX port of the Millis/Theia `BrandScrollbar` engine, re-themed
 * and bent to the house motion rules:
 *   · anime.js only via the `./anime` seam (test-mockable, audited surface);
 *   · NO ResizeObserver (Pretext law) — `refresh()` is called by the React
 *     hook through the shared resizeCoordinator instead;
 *   · reduced motion = SKIP TO FINAL STATE (static rail), never slower;
 *   · the off-brand "plumb bob" is dropped — QubeTX's motif is the cube /
 *     circuit (carried by ScrollTrace / SectionRail), so the overlay is a
 *     clean kinetic rule (brand gradient) + optional survey ticks + a mono
 *     `SEC NN · NN%` readout that matches SectionRail's convention.
 *
 * Visuals come from CSS custom properties on the host (--bs-accent /
 * --bs-track / --bs-mono / --bs-readout-*). Framework-agnostic on purpose:
 * `createBrandScrollbar(el, opts)` works anywhere; `useBrandScrollbar` wraps
 * it for React.
 *
 * USAGE
 *   const sb = createBrandScrollbar(scrollEl, { ticks: true, readout: true })
 *   sb.refresh()   // after layout / content changes
 *   sb.destroy()
 */

import { animate, createTimeline, stagger } from './anime'
import { prefersReducedMotion } from './useMotionPreference'
import { MS, STAGGER_MS } from './tokens'

export type BrandScrollbarOptions = {
  /** Auto-read `[data-bs-section]` / `[data-bs-num]` children into survey ticks. */
  ticks?: boolean
  /** Show the mono `SEC NN · NN%` readout pill beside the thumb. */
  readout?: boolean
  /** Fade the rail to a faint rest when idle; reveal on scroll / hover. */
  autoHide?: boolean
  /** Rail strip width in px. */
  width?: number
  /** ms before auto-hide. */
  idle?: number
  /** Resting opacity (auto-hide never fully removes the branded rail). */
  rest?: number
}

export type BrandScrollbarInstance = {
  /** Re-measure after layout / content changes. */
  refresh: () => void
  /** Tear down: remove the rail, restore the native (branded) bar. */
  destroy: () => void
  /** The scroll element this instance owns. */
  readonly scroll: HTMLElement
  /** The injected rail element (null after destroy) — for tests. */
  readonly rail: HTMLDivElement | null
}

type Tick = {
  pct: number
  el: HTMLElement
  tick: HTMLDivElement
  num: string
  passed: boolean
}

const SVG_NS = 'http://www.w3.org/2000/svg'

function svgEl(name: string, attrs?: Record<string, string | number>, style?: string): SVGElement {
  const e = document.createElementNS(SVG_NS, name)
  if (attrs) for (const k in attrs) e.setAttribute(k, String(attrs[k]))
  if (style) e.setAttribute('style', style)
  return e
}

class BrandScrollbar implements BrandScrollbarInstance {
  readonly scroll: HTMLElement
  rail: HTMLDivElement | null = null

  private o: Required<BrandScrollbarOptions>
  private reduced: boolean

  private sv!: SVGElement
  private thumb!: HTMLDivElement
  private tickWrap!: HTMLDivElement
  private readoutEl: HTMLDivElement | null = null

  private cx = 0
  private tw = 4
  private trackH = 0
  private scrollable = 0
  private thumbH = 40
  private maxThumb = 0
  private curTop = 0
  private ticks: Tick[] = []
  private tickEls: HTMLDivElement[] = []

  private shown: boolean
  private dragging = false
  private frame = false
  private hideTimer: ReturnType<typeof setTimeout> | null = null
  private roText = ''

  private onScroll!: () => void
  private onEnter!: () => void
  private onLeave!: () => void
  private tEnter!: () => void
  private tLeave!: () => void
  private down!: (e: PointerEvent) => void
  private railClick!: (e: PointerEvent) => void

  constructor(scrollEl: HTMLElement, opts: BrandScrollbarOptions = {}) {
    this.scroll = scrollEl
    this.o = {
      ticks: opts.ticks ?? false,
      readout: opts.readout ?? false,
      autoHide: opts.autoHide ?? true,
      width: opts.width ?? 14,
      idle: opts.idle ?? 1300,
      rest: opts.rest ?? 0.26,
    }
    this.reduced = prefersReducedMotion()
    this.shown = !this.o.autoHide

    this.build()
    this.bind()
    this.refresh()
    this.entrance()
  }

  /* ---- DOM ------------------------------------------------------------- */
  private build() {
    const host = this.scroll.parentElement
    if (!host) throw new Error('BrandScrollbar: scroll element needs a positioned parent')
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative'
    this.scroll.classList.add('bs-scroll') // hides the native bar (globals.css)

    const W = this.o.width
    this.cx = W / 2

    const rail = document.createElement('div')
    rail.className = 'bs-rail'
    rail.setAttribute('aria-hidden', 'true')
    rail.style.cssText =
      `position:absolute;top:0;right:0;bottom:0;width:${W}px;z-index:6;` +
      `pointer-events:none;opacity:${this.o.autoHide ? this.o.rest : 1};` +
      `transition:opacity .28s var(--ease-out, cubic-bezier(0.25,1,0.5,1));`
    this.rail = rail

    // ghost track — a faint full-height rule down the strip centre
    const sv = svgEl('svg', {
      width: W,
      height: '100%',
      preserveAspectRatio: 'none',
    }, 'position:absolute;inset:0;overflow:visible;')
    sv.appendChild(
      svgEl('line', { x1: this.cx, y1: 0, x2: this.cx, y2: '100%' },
        'stroke:var(--bs-track,rgba(0,102,255,.16));stroke-width:1.5;')
    )
    this.sv = sv
    rail.appendChild(sv)

    // ticks layer (positioned in refresh)
    this.tickWrap = document.createElement('div')
    this.tickWrap.className = 'bs-ticks'
    this.tickWrap.style.cssText = 'position:absolute;inset:0;'
    rail.appendChild(this.tickWrap)

    // thumb — the kinetic accent rule (slim brand-gradient handle)
    const thumb = document.createElement('div')
    thumb.className = 'bs-thumb'
    thumb.style.cssText =
      `position:absolute;left:${this.cx - this.tw / 2}px;width:${this.tw}px;` +
      `border-radius:${this.tw}px;top:0;height:40px;` +
      `background:var(--bs-accent,var(--primary-blue,#0066ff));cursor:grab;` +
      `pointer-events:auto;transform:translateY(0);will-change:transform;`
    this.thumb = thumb
    rail.appendChild(thumb)

    // readout — mono pill that rides beside the thumb (SEC NN · NN%)
    if (this.o.readout) {
      const ro = document.createElement('div')
      ro.className = 'bs-readout'
      ro.style.cssText =
        `position:absolute;right:${W + 6}px;top:0;white-space:nowrap;` +
        `font-family:var(--bs-mono,ui-monospace,monospace);font-size:10px;font-weight:600;` +
        `letter-spacing:.14em;text-transform:uppercase;` +
        `color:var(--bs-readout-fg,#fff);background:var(--bs-readout-bg,#111827);` +
        `padding:3px 7px;border-radius:3px;pointer-events:none;transform:translateY(-50%);` +
        // auto-hide starts the readout hidden (reveal() shows it); always-visible
        // rails show it from the start since reveal() is a no-op when autoHide is off
        `opacity:${this.o.autoHide ? 0 : 1};transition:opacity .15s ease;`
      this.readoutEl = ro
      rail.appendChild(ro)
    }

    host.appendChild(rail)
  }

  /* ---- measurement ----------------------------------------------------- */
  refresh = () => {
    const s = this.scroll
    const view = s.clientHeight
    const total = s.scrollHeight
    this.trackH = view
    this.scrollable = Math.max(0, total - view)
    // thumb height tracks the visible fraction, capped so it always reads as a
    // slim handle rather than a big block on short content
    const prop = total > 0 ? (view / total) * view : view
    this.thumbH = Math.max(32, Math.min(view * 0.2, prop))
    this.thumb.style.height = `${this.thumbH}px`
    this.maxThumb = Math.max(0, view - this.thumbH)
    if (this.o.ticks) this.layoutTicks()
    this.render(false)
  }

  private layoutTicks() {
    this.tickWrap.innerHTML = ''
    this.tickEls = []
    const secs = Array.from(this.scroll.querySelectorAll<HTMLElement>('[data-bs-section]'))
    if (!secs.length) {
      this.ticks = []
      return
    }
    const total = this.scroll.scrollHeight
    const W = this.o.width
    this.ticks = secs.map((el) => {
      const pct = Math.max(0, Math.min(1, el.offsetTop / total))
      const t = document.createElement('div')
      t.className = 'bs-tick'
      t.style.cssText =
        `position:absolute;left:${W / 2 + 3}px;width:7px;height:1.5px;` +
        `background:var(--bs-track,rgba(0,102,255,.18));top:${(pct * this.trackH).toFixed(1)}px;`
      this.tickWrap.appendChild(t)
      this.tickEls.push(t)
      return { pct, el, tick: t, num: el.getAttribute('data-bs-num') || '', passed: false }
    })
  }

  /* ---- events ---------------------------------------------------------- */
  private bind() {
    this.onScroll = () => {
      this.reveal()
      this.req()
    }
    this.scroll.addEventListener('scroll', this.onScroll, { passive: true })

    const host = this.scroll.parentElement
    this.onEnter = () => this.reveal(true)
    this.onLeave = () => {
      if (this.o.autoHide && !this.dragging) this.scheduleHide()
    }
    host?.addEventListener('pointerenter', this.onEnter)
    host?.addEventListener('pointerleave', this.onLeave)

    // hover-grow on the thumb
    this.tEnter = () => {
      if (!this.reduced)
        animate(this.thumb, { width: this.tw + 2, left: this.cx - (this.tw + 2) / 2, duration: 120, ease: 'outQuad' })
    }
    this.tLeave = () => {
      if (!this.dragging && !this.reduced)
        animate(this.thumb, { width: this.tw, left: this.cx - this.tw / 2, duration: 160, ease: 'outQuad' })
    }
    this.thumb.addEventListener('pointerenter', this.tEnter)
    this.thumb.addEventListener('pointerleave', this.tLeave)

    // drag the thumb
    this.down = (e: PointerEvent) => {
      e.preventDefault()
      this.dragging = true
      this.reveal(true)
      this.thumb.style.cursor = 'grabbing'
      const startY = e.clientY
      const startTop = this.curTop
      const move = (ev: PointerEvent) => {
        const dy = ev.clientY - startY
        const ratio = this.maxThumb > 0 ? (startTop + dy) / this.maxThumb : 0
        this.scroll.scrollTop = Math.max(0, Math.min(1, ratio)) * this.scrollable
      }
      const up = () => {
        this.dragging = false
        this.thumb.style.cursor = 'grab'
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        if (this.o.autoHide) this.scheduleHide()
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    }
    this.thumb.addEventListener('pointerdown', this.down)

    // click the rail to page toward the pointer
    this.railClick = (e: PointerEvent) => {
      if (e.target === this.thumb) return
      const r = this.rail!.getBoundingClientRect()
      const y = e.clientY - r.top
      const target = (y / this.trackH) * this.scrollable
      const dir = target > this.scroll.scrollTop ? 1 : -1
      this.scroll.scrollBy({ top: dir * this.scroll.clientHeight * 0.9, behavior: 'smooth' })
    }
    this.sv.style.pointerEvents = 'auto'
    this.sv.addEventListener('pointerdown', this.railClick as EventListener)
  }

  private req() {
    if (this.frame) return
    this.frame = true
    requestAnimationFrame(() => {
      this.frame = false
      this.render(true)
    })
  }

  /* ---- render ---------------------------------------------------------- */
  private render(_animated: boolean) {
    const p = this.scrollable > 0 ? this.scroll.scrollTop / this.scrollable : 0
    const top = p * this.maxThumb
    this.curTop = top
    this.thumb.style.transform = `translateY(${top}px)`

    if (this.readoutEl) {
      const pct = Math.round(p * 100)
      let label = `${pct}%`
      if (this.o.ticks && this.ticks.length) {
        let active = this.ticks[0]
        for (const t of this.ticks) if (p + 0.001 >= t.pct) active = t
        label = (active.num ? `SEC ${active.num} · ` : '') + `${pct}%`
      }
      if (label !== this.roText) {
        this.readoutEl.textContent = label
        this.roText = label
      }
      const cy = top + this.thumbH / 2
      this.readoutEl.style.top = `${Math.max(12, Math.min(this.trackH - 12, cy))}px`
    }

    if (this.o.ticks && this.ticks.length) {
      let activeIdx = 0
      this.ticks.forEach((t, i) => {
        if (p + 0.001 >= t.pct) activeIdx = i
      })
      this.ticks.forEach((t, i) => {
        const passed = p >= t.pct
        if (passed !== t.passed) {
          t.passed = passed
          if (!this.reduced) animate(t.tick, { width: passed ? 11 : 7, duration: 200, ease: 'outQuad' })
          else t.tick.style.width = `${passed ? 11 : 7}px`
        }
        // active station reads accent; passed reads ink; pending reads track
        t.tick.style.background =
          i === activeIdx
            ? 'var(--bs-accent-solid,#0066ff)'
            : t.passed
              ? 'var(--text-primary,#fff)'
              : 'var(--bs-track,rgba(0,102,255,.18))'
      })
    }
  }

  /* ---- visibility ------------------------------------------------------ */
  private reveal(hold = false) {
    if (!this.o.autoHide) return
    if (this.hideTimer) clearTimeout(this.hideTimer)
    if (!this.shown) {
      this.shown = true
      this.rail!.style.opacity = '1'
    }
    if (this.readoutEl) this.readoutEl.style.opacity = '1'
    if (!hold) this.scheduleHide()
  }

  private scheduleHide() {
    if (this.hideTimer) clearTimeout(this.hideTimer)
    this.hideTimer = setTimeout(() => {
      this.shown = false
      this.rail!.style.opacity = String(this.o.rest) // a faint branded rest — never gone
      if (this.readoutEl) this.readoutEl.style.opacity = '0'
    }, this.o.idle)
  }

  /* ---- entrance -------------------------------------------------------- */
  private entrance() {
    if (this.reduced) {
      // SKIP TO FINAL STATE
      if (!this.o.autoHide) this.rail!.style.opacity = '1'
      if (this.readoutEl && !this.o.autoHide) this.readoutEl.style.opacity = '1'
      return
    }
    const tl = createTimeline({ defaults: { ease: 'outQuad' } })
    this.sv.style.transformOrigin = 'top'
    tl.add(this.sv, { scaleY: [0, 1], duration: MS.fast }, 0)
    tl.add(this.thumb, { opacity: [0, 1], duration: MS.micro + 40 }, MS.micro + 40)
    if (this.tickEls.length)
      tl.add(this.tickEls, { opacity: [0, 1], scaleX: [0, 1], duration: 160, delay: stagger(STAGGER_MS.chars + 10) }, 260)
    if (!this.o.autoHide) tl.add(this.rail!, { opacity: [0, 1], duration: MS.micro }, 0)
    else {
      this.rail!.style.opacity = '1'
      this.scheduleHide()
    }
  }

  /* ---- teardown -------------------------------------------------------- */
  destroy = () => {
    if (this.hideTimer) clearTimeout(this.hideTimer)
    this.scroll.removeEventListener('scroll', this.onScroll)
    const host = this.scroll.parentElement
    host?.removeEventListener('pointerenter', this.onEnter)
    host?.removeEventListener('pointerleave', this.onLeave)
    if (this.rail?.parentElement) this.rail.parentElement.removeChild(this.rail)
    this.rail = null
    this.scroll.classList.remove('bs-scroll')
  }
}

/** Attach a brand-aware overlay scrollbar to an element. */
export function createBrandScrollbar(
  scrollEl: HTMLElement,
  opts: BrandScrollbarOptions = {}
): BrandScrollbarInstance {
  return new BrandScrollbar(scrollEl, opts)
}
