# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QubeTX Landing Page **v3** — the official landing page for QubeTX, a department
of ES Development LLC. Single-page site (plus `/wallpaper`), ground-up redesign
shipped 2026-06: deep-void aesthetic, heavy Anime.js v4 + Framer Motion
choreography, terminal/diagnostic flavor, themed easter eggs. The site is
itself the portfolio piece — it demonstrates the attention to detail QubeTX
sells to clients.

**Read `DESIGN_SYSTEM.md` first for any visual/motion/component work** — it is
the exhaustive reference (tokens, component inventory, motion ownership rules,
micro-interaction specs, gotchas). `EASTER_EGGS.md` is the egg answer key.
`BOOT_SCREEN.md` documents the first-load boot overlay's architecture and
decisions — read it before touching BootScreen/LoadSequence/the inline script.

## Technology Stack

- **Next.js 16** (App Router, `output: 'export'` static export to `out/`)
- **React 19**, **TypeScript** (strict), **Tailwind CSS v4** (`@theme` in CSS; components use CSS Modules)
- **anime.js v4** (`animejs@4.4+`) — imperative motion engine (DotGrid, ScrollTrace, text reveals)
- **Framer Motion 12** — presence/layout/scroll MotionValues/tap springs
- **Lenis** — the single scroll driver (`SmoothScroll` ReactLenis root)
- **@chenglou/pretext** — text measurement (min-height, shrinkwrap, obstacle routing)
- **Local fonts** — Makira Sans + IBM Plex Mono via `next/font/local` (`src/fonts/`)
- **lucide-react** — stroked icons (registry in `src/components/ui/icons.ts`)
- React Three Fiber remains ONLY on `/wallpaper` (`WallpaperMatrix`); the index route has no three.js

## Deployment

- **Vercel.** Push to `main` ⇒ production deploy. Work on feature branches;
  merge only after the full gate (lint + test + build) and visual QA pass.
- Static export still builds to `out/` (`next build`); CI (`.github/workflows/ci.yml`)
  runs lint → `npm test` → build on pushes/PRs.

## Development Commands

```bash
npm install
npm run dev        # port 3000
npm run build      # static export → out/
npm run build:kit  # regenerate public/qubetx-design-system.zip (stable permalink; version inside)
npm run lint
npm test           # vitest run (50+ files / 250+ tests at v3.1.0)
npx tsc --noEmit

# Full gate — run before EVERY commit (CI enforces the same three):
npm run lint; npm test; npm run build
```

## Architecture

### Page assembly (`app/page.tsx`)
`ScrollTrace` + `ScrollProgress` (background/overlay) → `Header` →
`#main-content Hero` → `#services Services` → `#products Products` →
`#technologies Technologies` → `#about About` (hidden `#process` alias) →
`#work Work` (hidden `#projects` alias) → `#contact Contact` → `Footer` →
`LoadSequence` + `EasterEggProvider`. Section wrappers carry `scroll-mt-[88px]`.

**Routes**: `/` (above) · `/wallpaper` (R3F matrix) · `/design-system` (the
system of record: 26 live-specimen sections from the `src/data/designSystem.ts`
registry, sidebar w/ kit download, SectionRail; no Header/boot/eggs there —
boot arming is gated to `location.pathname === '/'` in the layout script).

### Directory map
```
app/                      layout (fonts, FOUC-guard inline script), page, globals.css
                          (tokens — keep the @kit-tokens markers), design-system/, wallpaper/
src/data/content.ts       ALL copy/data: NAV_ITEMS, SERVICES, PRODUCTS, ABOUT_CONTENT,
                          PROCESS, PROJECTS, TECH_STACK, HERO_CONTENT, CONTACT_CTA
src/data/designSystem.ts  /design-system registry: DS_VERSION (== package.json,
                          test-enforced), DS_SECTIONS (single structure source)
src/fonts/                woff2 + next/font/local declarations
src/lib/motion/           motion system: tokens, anime seam, preference store, IO trigger,
                          scopes, splitText/RevealText, slotText/SlotRoll (slot roll),
                          magnetic, proximity glow, decode, colorRamp, dotGridGeometry,
                          scrollTracePath (pure, unit-tested)
src/lib/pretext/          Pretext integration (provider, block, resizeCoordinator)
src/components/layout/    Header, NavDropdown, MobileMenu, Footer, SysStatus
src/components/sections/  Hero, Services, Products, Technologies, About, Work, Contact
src/components/terminal/  the technical register (product pages): TerminalFrame
                          (boot-print render), CommandTable, CapabilityRows,
                          InstallBlock (copy = slot-roll flash), DownloadCard
src/components/design-system/  /design-system chrome + doc primitives + demos
                          (Sidebar, DsSection, SectionRail, CodeBlock, RuleGrid,
                          DemoPanel, AgentNote, visualizers) + sections/ (26)
kit/ + scripts/           kit docs (README/SKILL/MOTION_GUIDE) + manifest +
                          build-kit.mjs → public/qubetx-design-system.zip
                          (committed; stable permalink — saved name is versioned
                          via the sidebar link's download attribute)
src/components/ui/        LabelPill, OutlineButton, TextLink, Magnetic, SectionHeading,
                          ServiceCard, ProductCard, ProjectCard, StatValue, RollingLink,
                          RoutedText, QubeTXLogo, icons
src/components/effects/   BootScreen (first-load terminal overlay; sessionStorage-
                          gated, arms via html[data-boot]), DotGrid, LoadSequence,
                          ScrollTrace, ScrollProgress, CustomCursor + cursorEngine,
                          SmoothScroll, easter-eggs/, WallpaperMatrix (wallpaper only)
src/hooks/                useScrolled, useActiveSection, useAnchorNav
src/test/                 setup.ts (global mocks) + mocks/ (framer-motion, animejs, pretext)
```

## Motion System — LOAD-BEARING RULES

Full specs in `DESIGN_SYSTEM.md` §5. The short version every change must obey:

1. **One animation owner per element property.** anime.js owns dot values,
   timelines, text reveals; Framer Motion owns presence/layout/whileTap/
   useScroll; raw rAF owns cursor/magnetic/tilt; CSS owns simple hovers.
   An FM-variant element is never also an anime target.
2. **NO ResizeObserver anywhere** (Pretext law — causes shrinkwrap
   oscillation). Resizes go through `src/lib/pretext/resizeCoordinator`.
   Scroll triggers = IntersectionObserver (`useInViewOnce`); scrubbing =
   Lenis callbacks. anime's `onScroll` is banned.
3. **Reduced motion = skip to final state**, never slower
   (`useMotionPreference` / `prefersReducedMotion()`).
4. anime.js is imported ONLY via `src/lib/motion/anime.ts` (the test-mock seam).
5. Anchor navigation goes through `useAnchorNav` (Lenis scrollTo); CSS
   `scroll-behavior: smooth` is intentionally absent.
6. Server HTML always shows FINAL state (visible text); hidden/initial states
   are applied client-side (LoadSequence/RevealText), guarded against FOUC by
   the `html[data-loading]` inline script (3s failsafe).
7. **Short text that changes in place goes through the slot roll**
   (`src/lib/motion/slotText.ts` + `SlotRoll.tsx`; DESIGN_SYSTEM §5 "The
   slot roll"). Destination rule: external links roll on HOVER to a teaser
   (`hoverLabel`), internal links roll on INTERACTION (`flashLabel`).
   Arrival `--color-arrival` blue settles to ink; `color: null` (quiet) on
   gradient surfaces; reduced motion snaps; the engine owns its container's
   children (never decode/Pretext/anime/FM on the same node). NB: the React
   layer is `SlotRoll.tsx` because `SlotText.tsx` would collide with
   `slotText.ts` on case-insensitive filesystems.

## Pretext Integration (`src/lib/pretext/`)

Unchanged core rules (confirmed across many projects):

- **NEVER use ResizeObserver** with Pretext — sync `clientWidth` reads +
  `window.resize` coalesced through one RAF gate (`resizeCoordinator`).
- **NEVER `shrinkwrap` centered text** (narrowed `max-width` breaks centering).
  Left-aligned text: `shrinkwrap` welcome. Centered: `min-height` only.
- **Never measure letter-spaced text** (mono pills/eyebrows/nav) — canvas
  measurement ignores `letter-spacing`.
- Pretext-wrapped text animates as whole blocks only (opacity/transform).
- `PretextBlock` reads `getComputedStyle()` (handles next/font rewritten
  names). `PretextProvider` resolves **computed** family names for its
  readiness check — literal names never match under next/font.
- Advanced APIs in play: `RoutedText` uses `prepareWithSegments` +
  `layoutNextLine` to flow the About lead paragraph around the cube.
- Package ships raw `.ts` → `transpilePackages` in next.config +
  `allowImportingTsExtensions` in tsconfig.

## Testing

- Vitest 4 + RTL + jsdom. `src/test/setup.ts` auto-mocks `@/lib/pretext`,
  raw `@chenglou/pretext`, `framer-motion`, `animejs`, `lenis/react`, and
  stubs `IntersectionObserver` (exported `MockIntersectionObserver` with
  `.trigger()`/`.emit()`) and `matchMedia`.
- Components must render correct **final-state DOM with all mocks active**.
- Pure modules (geometry, ramps, cursor engine, splitters, key sequences)
  get real unit tests — `cursorEngine` is tested by calling `tick(dt)`
  manually and asserting transform strings.
- jsdom/React-19 event quirks: `onMouseEnter` fires via `fireEvent.mouseOver`,
  `onFocus` via `fireEvent.focusIn` — or prefer CSS `:hover` so there is
  nothing to simulate.
- **jsdom cannot exercise canvas/anime/Lenis paths** — verify all motion work
  in a real Chrome session (DevTools MCP) before calling it done; this is how
  every real bug in the v3 build was caught. For widths <500px use device
  emulation (browser windows won't resize smaller).
- Lighthouse "navigation" CLS on the dev server can be spurious — confirm with
  a buffered PerformanceObserver layout-shift trace in a real navigation.

## Project Learnings & Decisions (v3 redesign — keep these)

1. **anime.js 4.4 removed string cubic-bezier easings** — import the
   `cubicBezier` function (wrapped as `EASE_ANIME` in `lib/motion/tokens`).
   The old string form silently warned 1300×/load and fell back to default.
2. **Hydration**: never initialize React state from browser-API presence
   (`typeof IntersectionObserver === 'undefined'` is TRUE in Node → server
   HTML diverges). The FOUC-guard attribute on `<html>` requires
   `suppressHydrationWarning`.
3. **react-hooks v7 lint**: no sync `setState` inside effects (defer via
   rAF); no ref reads during render (`useMemo` instead).
4. **Container queries** size the hero headline (`8cqw`, longest line is
   ~12.2em of Makira Black) — the only way to guarantee single-line fit to a
   column. `--text-display` (vw clamp) is kept as the no-CQ fallback.
5. **DotGrid optimization model**: anime animates plain JS objects (idle
   `breathe`, entrance) and canvas only blits; **ripples are wave objects**
   (`makeRippleWave`/`applyRippleWaves`, pure + unit-tested) evaluated per
   frame into `pulse`/`mix` — one owner per channel. Per-dot anime tween
   bursts for ripples cost ~8–36ms of synchronous pointer-handler time
   (anime instance creation; v4 'replace' composition was even slower) —
   never go back to per-event tween creation at this scale. Feathered
   geometry CULLS invisible dots; all delays are distance functions; waves
   are index-aligned to the dot array, so clear them on every rebuild.
6. **CSS animations beat inline styles** — never animate a property an engine
   writes inline on the same node. **Inline `display` beats media queries** —
   wrappers (Magnetic) set display via class.
7. **SVG groups with attribute matrices** must not receive transforms
   (CSS transform replaces the matrix) — animate strokes via
   `svg.createDrawable` or the root `<svg>`.
8. **`--color-text-dim` (#76869f) is contrast-tuned** (≥4.5:1 AA on void) —
   don't darken. Touch-target 44px minimums apply under
   `@media (pointer: coarse)` only.
9. **TV tier**: `--container-max` 1440px → 1800px at ≥2560px; everything
   (sections, cqw headline, ScrollTrace gutter) derives from the token.
10. **`qubetx:pulse` CustomEvent** is the dot-field's external trigger bus
    (load beat, typing egg, logo egg) — reuse it rather than reaching into
    DotGrid.
11. Lighthouse at ship: 100 a11y / 100 best-practices / 100 SEO;
    real-navigation CLS 0.000. Keep it that way.
12. **`grid-column: auto / -1` does NOT mean "span the rest of the row"** —
    with an auto start it resolves to a span of 1 ending at -1. To fill
    leftover tracks (Services' MatrixDisplay filler), use explicit
    breakpoint column counts + a matching `span N`.
13. Canvas boards (DotGrid/MatrixDisplay) rebuild only via
    `resizeCoordinator` (window resize) — layout-driven width changes
    without a resize won't re-measure them. Column-count changes are
    media-query (resize) driven, so this holds; keep it that way.
14. **Fullscreen `position: fixed` overlays must portal to `document.body`.**
    Any ancestor with a transform (LoadSequence leaves inline
    `translateY(0px)` on every `[data-load]` element — identity still
    counts), `filter`, or `backdrop-filter` (the scrolled header) becomes
    the overlay's containing block, shrinking `inset: 0` to that ancestor's
    box. This silently broke the mobile menu (overlay collapsed to the
    44px `.right` box — only the X showed). MobileMenu's `BodyPortal` is
    the pattern: portal as an AnimatePresence *child* (a bare
    `createPortal` return fails `isValidElement` and gets dropped), only
    while open (no SSR `document` access).

## Common Gotchas

1. This is **NOT** a Vite project — Next.js App Router, static export.
2. Tailwind v4 `@theme` lives in `app/globals.css` (no config file); most
   styling is CSS Modules with the `--ease-out` / token vars.
3. Static export: no ISR/API routes; images unoptimized.
4. Build output is `out/` (Vercel serves it; no GitHub Pages anymore).
5. Display text is stored in sentence case — UPPERCASE is `text-transform`.
6. The dev server may warn about a stray lockfile workspace root — harmless,
   machine-level issue.
7. R3F/three types: `src/r3f.d.ts` + `// @ts-nocheck` only inside
   `WallpaperMatrix`.
8. CSS-module HMR does not remount components — canvas boards (DotGrid,
   MatrixDisplay) keep stale dimensions after CSS-only edits. Hard-reload
   before judging a visual bug in dev.
9. Deploys are Vercel-only. Legacy GitHub Pages was disabled 2026-06 (API
   verified 404) — don't re-enable it.

## Design System

`DESIGN_SYSTEM.md` (v3) is authoritative. `QubeTX_Design_System.md` is the
retired v2 spec, kept for history.
