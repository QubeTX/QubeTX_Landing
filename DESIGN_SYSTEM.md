# QubeTX Design System — v3

**The exhaustive reference for every agent and human working on this site.**
Source of truth for tokens, components, motion, and the rules that keep it all
coherent. Supersedes `QubeTX_Design_System.md` (v2, retained for history).

The site is itself the portfolio piece: every detail demonstrates the design
and engineering care QubeTX sells to clients. When in doubt, match what exists.

---

## 1. Identity

| Aspect | Standard |
|---|---|
| Aesthetic | Deep-void technical: near-black navy, blue→purple brand gradient, terminal/diagnostic flavor (mono labels, version chips, striped rows, 1px hairline grids) |
| Lineage | Hero/header from the 2026 mockup; structural idioms from `qube-machine-report-homepage` (visual standards only — architecture stays TS + CSS Modules) |
| Motion character | cash.app-derived: **intentional** (punchy, ramped, never indecisive), **effortless** (smooth, flowing), **organic** (anchored to physics) |
| Copy voice | Confident, terminal-tinged, sentence case in data — UPPERCASE is always CSS (`text-transform`), never stored |

## 2. Design tokens (`app/globals.css`)

### Palette

| Token | Value | Use |
|---|---|---|
| `--color-void` | `#05070f` | Page / hero / header / cell background |
| `--color-background` | `#0a0f1c` | Alt background |
| `--color-surface` / `--card-bg` | `#0d1117` | Cards, terminal chrome, panels |
| `--color-surface-raised` | `#111827` | Hovered cells, dropdown panel |
| `--primary-blue` / `--color-primary` | `#0066FF` | Accent, eyebrow, active nav, focus ring, status ACTIVE |
| `--gradient-blue` | `#2563eb` | Gradient start |
| `--gradient-purple` | `#7c3aed` | Gradient end |
| `--gradient-brand` | `linear-gradient(90deg, #2563eb, #7c3aed)` | Headline line 3, stats, progress bar, hairline rules |
| `--color-border` | `#1a2236` | 1px hairlines, grid-cell gaps, pills |
| `--color-border-bright` | `#2c3a5c` | Hovered borders, code chips, wordmark stroke |
| `--text-primary` | `#ffffff` | Primary text |
| `--text-secondary` | `#94a3b8` | Body secondary |
| `--color-text-dim` | `#76869f` | Mono labels, metadata — **do not darken; this is tuned to ≥4.5:1 AA on void** |
| `--color-arrival` | `#3385ff` | Slot-roll arrival flash (≈5.7:1 AA on void — `--primary-blue` is only ~4.3:1, too dim for transient text on void). Never persists: arrivals settle to ink in ~280ms. |
| `--glow-blue` | `rgba(37,99,235,0.25)` | Button hover glow |
| Status green | `#22c55e` | `[OK]` flashes, STABLE chips (hardcoded where used) |
| Stripe alt | `#070a14` | Alternating row background (hardcoded in row modules) |

### Typography

| Token / pattern | Value | Use |
|---|---|---|
| `--font-sans` / `--font-display` | Makira (local; 400/500/700/900) | Body (sans), headings + numerals (display @700/900) |
| `--font-mono` | IBM Plex Mono (local; 400/500/600) | All labels, nav, eyebrows, terminal text, tags |
| `--text-display` | `clamp(2.4rem, 1rem + 7.5vw, 6.75rem)` | vw fallback for the hero h1 |
| Hero h1 actual | `clamp(2.25rem, 8cqw, 5.75rem)` | **Container-query sizing** — `.content` is `container-type: inline-size`; 8cqw keeps the longest line ("Limitless possibilities." ≈ 12.2em in Makira Black) single-line at any column width |
| `--text-h2` | `clamp(1.75rem, 1rem + 3vw, 3rem)` | Section titles (Makira 900, uppercase, lh 1.05, ls −0.02em) |
| `--text-h3` | `clamp(1.125rem, 1rem + .75vw, 1.5rem)` | Card titles (Makira 700) |
| `--text-mono-label` | `0.7rem` + `letter-spacing: 0.12em` + uppercase | Pills, nav, column titles |
| `--text-body` | `clamp(.9375rem, .875rem + .35vw, 1.0625rem)` | Card/body prose |

Font files live in `src/fonts/*.woff2`, declared in `src/fonts/index.ts` via
`next/font/local`. **Never reference families by literal name** — next/font
rewrites them (`__makira_xxxxxx`); always go through the CSS variables.

### Structure & motion tokens

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.25, 1, 0.5, 1)` — THE easing for every CSS transition |
| `--container-max` | `1440px`; **`1800px` at ≥2560px** (TV tier — all section containers use it; the cqw headline scales automatically) |
| `--grid-unit` … `--space-3xl` | 8px ladder (unchanged from v2) |
| `--section-spacing`, `--container-padding-x` | clamp()-based section rhythm |
| Touch targets | 44px minimums enforced **only under `@media (pointer: coarse)`**; fine-pointer UI uses padding-based hit areas |

### Background stack (back → front)
solid void → static CSS dot texture (28px pitch, continuity with the hero
field) → static bottom-right corner glow → ScrollTrace SVG → content.
**Deliberately static** — DotGrid and ScrollTrace own background motion.

## 3. Layout idioms (machine-report standards)

- **Grid cells**: container `background: var(--color-border); gap: 1px; border: 1px solid var(--color-border)`; cells `background: var(--color-void)`. (Services, Technologies, Stats.)
- **Striped rows**: full-width rows, `+` borders between, alternating void/`#070a14`. (Products, About process.)
- **Label pills**: `LabelPill` — mono 0.7rem chip (`pill`) or blue left-bar (`bar`, hero eyebrow). Section numbering: `01 // Services` … `06 // Contact`.
- **Version chips**: bordered mono chip that fills `--primary-blue` on row hover (ProductCard `code`).
- **Section headings**: always via `SectionHeading` (pill decode → word-rise title → gradient hairline).

## 4. Component inventory

### Layout (`src/components/layout/`)
| Component | Notes |
|---|---|
| `Header` | Fixed, 3-zone grid. `useScrolled(24)` → `data-scrolled` (blur + hairline + 60px). Scroll-spy underline = FM `layoutId="nav-active"` fed by `useActiveSection`. Nav links carry CSS `[`bracket`]` hovers. CTA wrapped in `Magnetic`. Carries `data-load="header"` entrance targets. |
| `NavDropdown` | SERVICES disclosure (not ARIA menu): `aria-expanded/controls`, hover/click/ArrowDown open, Escape (refocus) / outside / focus-out close, FM clip-path + item stagger. Items target `#service-{id}`. |
| `MobileMenu` | <1024px full-screen overlay: oversized staggered links, flattened services sub-list, focus trap/restore, `data-menu-open` on `<html>`, Lenis stop/start. |
| `Footer` | Nav/Products/Connect mono columns (letter-roll labels), stroked `QUBETX` wordmark (`RevealText mode="chars"`), back-to-top with FM `pathLength` progress ring → `lenis.scrollTo(0)`, `SysStatus` line, Konami hint glyph (40% opacity). |
| `SysStatus` | Footer `SYS_STATUS:` terminal line — the slot roll's resident showcase. Status word cycles `NOMINAL → SCANNING → SECURE` every 7s with the full arrival-blue language; aria-hidden flavor; cycles ONLY in-view + tab-visible (continuous raw IO — `useInViewOnce` is fire-once); static under reduced motion; sizer stack reserves the widest word (zero CLS). |

### Sections (`src/components/sections/`) — page order & anchors
`Hero` (`#main-content`) → `Services` (`#services`) → `Products` (`#products`)
→ `Technologies` (`#technologies`) → `About` (`#about`, hidden `#process`
alias) → `Work` (`#work`, hidden `#projects` alias) → `Contact` (`#contact`).
All section wrappers get `scroll-mt-[88px]`. Section data comes ONLY from
`src/data/content.ts` (`NAV_ITEMS`, `SERVICES`, `PRODUCTS`, `ABOUT_CONTENT`,
`PROCESS`, `PROJECTS`, `TECH_STACK`, `HERO_CONTENT`, `CONTACT_CTA`).

| Section | Composition |
|---|---|
| `Hero` | Mockup composition: bar eyebrow (decode target) → 3 masked headline lines (last = gradient via `background-clip`, swept by LoadSequence) → Pretext-shrinkwrapped mono description → `Magnetic`+`OutlineButton` + `TextLink ⠿` → company line → `DotGrid` full-bleed layer → scroll cue. |
| `Services` | Grid cells of `ServiceCard` (pill index, lucide icon nudge, proximity glow via `useProximityGlow` + `data-glow`). Card ids `service-{id}` are the dropdown anchors. The leftover row space is filled by `MatrixDisplay` (`.filler` spans the remaining tracks — the grid uses explicit breakpoint column counts because `grid-column: auto / -1` with an auto start resolves to span 1, not "rest of row"). |
| `Products` | `SectionHeading` with typed `$ qubetx --products` boot line (`[data-boot-char]` stagger) + blinking `▮`; `ProductCard` striped rows → reports.qubetx.com (CSS-only compound hover). |
| `Technologies` | Mono glyph strip cells (`▲ ⚛ TS tw RS aj fm`). |
| `About` | "Detail is the product." → `RoutedText` lead paragraph (Pretext obstacle routing around the cube) + Pretext paragraph → `StatValue` cells (slot-machine entrance + re-verify hover) → process striped rows. |
| `Work` | 7 client `ProjectCard`s (image, tags, pointer micro-tilt ≤3.5°). |
| `Contact` | Terminal panel: heading, shrinkwrapped subtitle, `Magnetic` CTA, `response time: < 24h ▮` prompt, corner glow. |

### UI primitives (`src/components/ui/`)
| Component | Props / contract |
|---|---|
| `LabelPill` | `variant: 'pill' \| 'bar'`. Letter-spaced — **never Pretext-measured**. |
| `OutlineButton` | `href, size: 'sm'\|'md', magnetic` (sets `data-magnetic` for cursor docking), `hoverLabel` (external: slot-roll teaser on hover, mouse only), `flashLabel` (internal: click-flash + auto-revert). Gradient-sweep fill + arrow slide (CSS), FM `whileTap` squash. Slot rolls here are **quiet** (`color: null` — the hovered face is the brand gradient). A hidden sizer stack keeps the button at the widest label's width (zero CLS). External links auto-get `target/rel` + sr-only note. |
| `TextLink` | Mono link, growing underline, optional `glyph` (aria-hidden), `flashLabel` (internal: slot-roll click-flash, arrival blue). With `flashLabel`, in-page hrefs also route through `useAnchorNav` (Lenis smooth scroll instead of the native hash jump). |
| `Magnetic` | Pull wrapper (`useMagnetic`) — **owns its node's transform; never put FM/anime transforms on the same node**. Display via CSS class (so media queries can override). |
| `SectionHeading` | `label, title, subtitle?, aside?, align?`. The one section-heading system. |
| `ServiceCard` / `ProductCard` / `ProjectCard` | See sections above. |
| `StatValue` | About stat. Slot-machine entrance on first view (3 scrambled quiet rolls ~300ms apart, landing on the real value with the arrival-blue flash); hover re-verify = 2 scrambles back to the same value + label `decode()` (decode stays on the LABEL node — never the same node as the roll). Prefix/digits/suffix parsing preserved (`"100%"`); reduced motion shows the server-rendered final value untouched. |
| `RollingLabel` (`RollingLink.tsx`) | Letter-roll hover (stacked copies in masks, anime stagger 18ms). |
| `RoutedText` | Pretext `layoutNextLine` obstacle routing; falls back to the plain paragraph (<1024px / fonts not ready / no JS). |
| `QubeTXLogo` | Stroke-only SVG cube; `size/className/color`. Paths are `svg.createDrawable`-friendly (used by the logo egg). |
| `icons.ts` | Lucide registry: `SERVICE_ICONS[IconKey]` + chrome icons. Render 20px, `strokeWidth 1.5`, `aria-hidden`. |

### Effects (`src/components/effects/`)
| Component | Architecture |
|---|---|
| `DotGrid` | **Fully anime.js-driven** hero dot field. Canvas 2D is only the blitter; anime animates a flat array of dot objects. Geometry: `src/lib/motion/dotGridGeometry.ts` (TL→BR size/alpha/color ramp; feathered left edge + bottom band with true-invisible CULLING; ≤1400 dots via pitch widening). Channels are separated — idle loop owns `breathe`, ripples own `pulse`/`mix` — so they never fight. All delays are **distance functions**, not grid staggers (radially correct + cull-safe). Pointer ripples are **amplitude-attenuated** (`rippleFalloff`, smoothstep to 0 at 280px move / 460px tap) and only retarget the dots in reach — both halves are load-bearing: falloff keeps the swell local to the cursor, subset-scoped `utils.remove` lets the trail behind the cursor finish decaying instead of being cancelled into a frozen lit state on every pointer event (uniform full-field ripples saturated the whole grid while the pointer moved). Pointer listeners are **window-level** (the field shows behind the fixed header and past the hero, where events never bubble through the hero subtree — the radius bound makes out-of-reach moves no-ops); the layer itself is `pointer-events:none` (it extends ~26vh past the hero). External ripples via the **`qubetx:pulse`** CustomEvent (`firePulse`) stay **field-wide** (radius ∞ — the load beat/eggs sweep the whole field). IO pauses offscreen; resize via `resizeCoordinator`; reduced motion = static ramp. |
| `BootScreen` | First-load SYSTEM_INITIALIZER overlay (covers hydration/font jank): server-rendered so it paints pre-hydration (cursor/dot/first-line alive via pure CSS), timestamped log stream + progress driven post-hydration, completion fully dynamic = max(5s minimum, fonts loaded, window `load`, double-rAF painted frame) with an AWAITING RENDERER SYNC log line if readiness outlasts the minimum. Armed pre-paint by the layout inline script via `html[data-boot]` — only when `sessionStorage['qubetx:booted']` is absent and motion isn't reduced (return visits/reduced-motion/no-JS never see it; 10s failsafe). On completion: flag set, attribute lifted, `qubetx:boot-complete` fires and LoadSequence's entrance plays behind the 700ms fade. The percent readout is a slot-roll odometer (`attachSlotText`, armed path only: up / 120ms / 0 stagger / 0 bounce / quiet — the 90ms tick outruns any color fade); the controller is destroyed in the effect cleanup and the server-rendered `0%` keeps the pre-hydration overlay intact. |
| `LoadSequence` | Single anime timeline owner of header+hero entrance via `data-load` attributes (no FM on those nodes). Waits for `qubetx:boot-complete` while `html[data-boot]` is armed. Order: header (y/opacity, stagger 60) → eyebrow + scramble-decode → masked line rises (stagger 90) → gradient `background-position` sweep → description → CTAs → company → bottom-right `qubetx:pulse`. FOUC guard: inline `<script>` in layout sets `html[data-loading]` (CSS hides `[data-load]`), 3s failsafe, `suppressHydrationWarning` on `<html>`; LoadSequence sets real initial states, lifts the attr, plays. |
| `ScrollTrace` | Scroll-scrubbed circuit trace + isometric cube junctions (`scrollTracePath.ts`, pure). Paused timeline of `svg.createDrawable` segments **seek()ed from Lenis progress** (draws down, reverses up; native-scroll fallback). Gutter = true outer margin when `(vw − --container-max)/2 > 88`, else hairline lane at x≈11. Hidden <1024px. No SVG filters ever (glow = second wider stroke at 0.06). |
| `MatrixDisplay` | LED dot-matrix word board (Services filler): anime.js sweeps words (`QUBETX/BUILD/SHIP/SECURE/SCALE`) across a coarse dot grid via per-dot `lit` channels, column-staggered, endless loop. Board pitch derives from the longest word (`src/lib/motion/dotFont.ts` 5×7 bitmap font, pure + tested) so glyphs always span ~the full cell. IO-paused, resizeCoordinator rebuilds, reduced motion = static first word. |
| `ScrollProgress` | 2px gradient bar, FM `scaleX` MotionValue (zero re-renders). |
| `CustomCursor` + `cursorEngine.ts` | Same dot/ring/bloom identity, real engine: single rAF, transform-only writes, **dt-normalized lerp** (`1−(1−k)^(dt·60)`), **settle-cancelled loop (idle cost zero)**, velocity squash/stretch, press squash, mode scaling, magnetic ring-docking to `[data-magnetic]` centers. Modes via `data-mode` for CSS looks. CSS: no backdrop-filter, blur never animated. |
| `easter-eggs/` | See `EASTER_EGGS.md` (the answer key). Provider mounts once in `page.tsx`; Konami terminal is code-split. |

## 5. Motion system (`src/lib/motion/`)

### Ownership rules (load-bearing — violating these causes fighting animations)
- **anime.js v4**: DotGrid values, ScrollTrace timeline, text reveals/decode/typewriter/letter-rolls, logo redraw, Konami boot.
- **Framer Motion**: AnimatePresence exits, `layoutId` indicators, `whileInView` card entrances, `whileTap` squash, `useScroll` MotionValues.
- **raw rAF**: cursor engine, `useMagnetic`, ProjectCard tilt.
- **slotText engine**: per-character label changes — it owns its cells' inline transitions entirely (zero deps, no anime/FM). Never point another owner at a slot container's children.
- **CSS only**: every simple hover (brackets, underlines, sweeps, blink, scanlines).
- **One owner per element property.** An FM-variant element is never an anime target — anime targets live one level down (split spans, SVG paths).
- **Lenis** is the single scroll driver (window-native, so IO and FM `useScroll` just work). Anchor nav goes through `useAnchorNav` → `lenis.scrollTo`. Overlays call `stop()/start()`.
- Scroll **triggers** = IntersectionObserver (`useInViewOnce`); scroll **scrubbing** = Lenis callback. **anime's `onScroll` is banned** (unverified vs the no-ResizeObserver law). **ResizeObserver is banned codebase-wide** — resizes via `src/lib/pretext/resizeCoordinator`.
- Reduced motion = **skip to final state** (`useMotionPreference` / `prefersReducedMotion()`), never slower versions.

### Primitives
`tokens.ts` (EASE in FM/CSS forms + `EASE_ANIME` **function** — anime 4.4 removed string cubic-bezier; `EASE_SLOT_CSS` overshoot for the slot roll; DUR/MS/STAGGER_MS/SPRING presets) ·
`anime.ts` (sole animejs import seam — also the test mock seam) ·
`variants.ts` (FM variants; `src/utils/animations.ts` is a re-export shim) ·
`useMotionPreference` · `useInViewOnce` (**initial state must stay false — deriving it from `typeof IntersectionObserver` breaks SSR hydration**) ·
`useAnimeScope` · `splitText`/`RevealText` (server-rendered visible splitter; hidden states applied client-side; `aria-label` carries the unsplit text) ·
`slotText`/`SlotRoll` (the slot roll — see below) ·
`useMagnetic` · `useProximityGlow` (--mx/--my vars; gradient falloff does the distance math) ·
`decode` (glyph scramble) · `colorRamp` (LUT; alpha via `ctx.globalAlpha`) ·
`dotGridGeometry` · `scrollTracePath`.

### The slot roll (`slotText.ts` / `SlotRoll.tsx`)

**The house micro-interaction for short text that changes in place** — a
button label caught mid-action, a counter, a status word. Each character
sits in its own clipped cell; the new glyph rolls in while the old rolls
out, landing with a small spring overshoot and per-glyph wobble; incoming
glyphs arrive in `--color-arrival` blue and settle to ink in ~280ms.

**Provenance.** Adapted from `slot-text` v0.2.2 (MIT · textmotion.dev) via
the Millis design system kit. Vendored, not installed: the upstream React
wrapper SSR-renders an *empty* span (violates the server-HTML-shows-final-
state rule), the npm name was repurposed mid-2026 (supply-chain caution),
and an in-repo copy carries the QubeTX defaults. Pure CSS transforms +
timers — zero dependencies, no anime.js, no FM.

**API** (all exported through `src/lib/motion`):

```
buildSlotText(el, text)                      build cells (sr name + aria-hidden cells)
animateSlotText(el, text, options?)          roll a built container to new text
clearSlotText(el, text?)                     tear down to a plain text node
attachSlotText(el, text, options?)           controller: set / flash (auto-revert) / destroy
<SlotRoll text as? className? options?>      declarative — rolls on `text` prop change
useSlotRoll(restingText, options?)           → [refCallback, { set, flash }] for event-driven labels
```

| Option | Default | Meaning |
|---|---|---|
| `direction` | `'down'` | `'up'` for forward/advance travel (counters up, next-period) |
| `stagger` | `40` | ms between adjacent cells |
| `duration` | `240` | ms per glyph roll |
| `exitOffset` | `50` | ms head start for the outgoing glyph |
| `easing` | `EASE_SLOT_CSS` | `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot |
| `bounce` | `0.3` | per-glyph speed/stagger jitter + settle tilt |
| `color` | `var(--color-arrival)` | arrival tint: string, `(i,total)=>string`, or `null` = quiet ink roll |
| `colorFade` | `280` | ms for arrival → ink settle |
| `skipUnchanged` | `true` | unchanged characters hold still (a 7-digit value changing one digit rolls one cell) |
| `interrupt` | `true` | a new roll fast-forwards a running one; `false` queues the latest (flash uses this — spam coalesces) |

**The rules (normative):**

1. **Labels only.** A word or two — buttons, counters, status words.
   Sentences/headings belong to `RevealText`; scrambles to `decode`.
2. **The destination rule (QubeTX, supersedes Millis "never on hover"):**
   links that *leave the site* roll on **hover** to a teaser label
   (`hoverLabel` — announce the departure before the click); links *within
   the site* roll on **interaction** (`flashLabel` click-flash). Mouse
   pointers only — coarse pointers never hover-roll.
3. **Blue on arrival, ink at rest.** The arrival color never persists. Pass
   `color: null` (quiet roll) on gradient surfaces — the hovered
   OutlineButton face is the brand gradient, where the blue vanishes.
4. **Direction follows travel.** Counting up / advancing = `'up'`;
   reverting / going back = `'down'` (hover-roll enters up, leaves down).
5. **Reduced motion snaps.** The engine consults `prefersReducedMotion()`
   at animate time and rebuilds final state instantly. No opt-out.
6. **Meaningful change only** (the footer `SysStatus` cycle is the one
   sanctioned showcase — and it pays for itself by pausing offscreen,
   in hidden tabs, and under reduced motion).
7. **The engine owns the container's children.** Never hand-author cells,
   never let React reconcile them (render the initial text once — `SlotRoll`
   does this via a `useState`-captured initial), never point `decode()`/
   Pretext/anime/FM at the same node. Never wrap a slot container in
   `PretextBlock`.
8. **Reserve the width.** A label changing width eases smoothly, but
   hover/auto-driven layout shifts COUNT toward CLS (input exemption covers
   taps/keys only). Every shipped surface holds max width via an invisible
   sizer stack (`grid-area: 1/1` siblings).

**A11y model:** a visually-hidden `[data-slot-sr]` span carries the
accessible name (updated immediately on every roll — assistive tech never
waits out the animation); the per-character cells are `aria-hidden`. DOM:
`[data-slot-text] > [data-slot-sr] + [data-slot-cell]*`, each cell =
`[data-slot-sizer]` (invisible, owns the width) + `[data-slot-face]`
(absolute, animates). Structural styles are inline (the splitText pattern) —
no global CSS, no Tailwind-scanner dependency.

## 6. Pretext rules (text intelligence)

- `PretextBlock` everywhere body text wraps: `min-height` always; `shrinkwrap` **only on left-aligned text** (never centered — pulls off-center).
- **Never measure letter-spaced text** (pills, eyebrows, nav — canvas ignores letter-spacing).
- Pretext-wrapped text animates as **whole blocks** (opacity/transform); per-char splitting is only for headings the page owns directly.
- `PretextProvider` resolves **computed** font names from the CSS vars (literal names never match next/font's rewritten families — that bug used to force a permanent 3s degradation).
- Advanced API showcase: `RoutedText` (`prepareWithSegments` + `layoutNextLine` per-line widths). The Konami terminal deliberately does NOT use Pretext (short mono lines never wrap).

## 7. Micro-interaction catalog

| Pattern | Spec | Where |
|---|---|---|
| Button squash | FM `whileTap` scaleX 1.04 / scaleY 0.92, spring 600/18 | All OutlineButtons |
| Gradient sweep fill | `background-position 100%→0`, 350ms ease-out, arrow +4px | OutlineButton hover |
| Magnetic pull | ≤6px toward pointer, lerp 0.18, settle-cancel | Hero/header/contact CTAs (+ cursor ring docks via `data-magnetic`) |
| Bracket hover | `[` `]` pseudo-elements fade/slide in 150ms | Header nav |
| Letter roll | stacked copies, y −100%, 420ms `out(4)`, stagger 18ms | Footer links |
| Proximity glow | `--mx/--my` radial gradient, reacts before hover | Service cards |
| Micro-tilt | ≤3.5° rotateX/Y from cached rect, rAF-gated vars | Project cards |
| CTA hover teaser | slot roll up to `hoverLabel`, down on leave (quiet/ink, mouse only) | Hero + header "Get Started", Contact CTA (external destinations) |
| CTA click flash | slot-roll `flash()` to `flashLabel`, auto-revert 1.4s; TextLink also smooth-scrolls via `useAnchorNav` | "Explore Our Services" (internal destinations) |
| Boot odometer | per-digit slot roll: up / 120ms / 0 stagger / quiet, interrupt churn at the 90ms tick | BootScreen percent readout |
| Stat slot-machine | 3 scrambled quiet rolls (~300ms apart) → arrival-blue landing on the real value | About stats, first view |
| Re-verify | 2 scrambled rolls back to the same value + label decode on hover | About stats |
| Status cycle | slot roll up, arrival blue, every 7s — in-view + tab-visible only | Footer `SYS_STATUS` |
| Pointer ripple | elastic swell around the cursor: distance-delayed, amplitude falls to 0 at 280px (tap 460px); `qubetx:pulse` events sweep the full field | Hero dot field (move + tap) |
| Decode | glyph scramble resolving L→R, 450ms | Eyebrow, section pills, stat labels |
| Boot type | per-char opacity stagger 28ms + CSS blink cursor | Products heading |

## 8. Accessibility & performance budgets

- Lighthouse (v3 ship): **100 a11y / 100 best practices / 100 SEO**; real-navigation CLS 0.000.
- Contrast floor: `--color-text-dim` is tuned to AA on void — don't darken it.
- Keyboard: dropdown (Enter/ArrowDown/Escape+refocus), mobile menu (trap + restore), terminal (Escape, focused exit), all hover states have `:focus-visible` twins.
- External links: `target="_blank" rel="noopener noreferrer"` + sr-only "(opens in a new tab)" — enforced by tests.
- Frame budget: DotGrid ≤2.3ms rippling / ~1ms idle / 0 offscreen; cursor 0 idle; ScrollTrace ~0.4ms per scroll frame. `will-change: transform` ONLY on the 3 cursor layers. No animated filters, no backdrop-filter except the scrolled header.
- Bundle: animejs subset ~15kB gz; R3F/three removed from the index route (−~150kB gz); Konami terminal code-split.

## 9. Testing conventions

- Vitest + RTL, jsdom. `src/test/setup.ts` auto-mocks: `@/lib/pretext`, raw `@chenglou/pretext`, `framer-motion`, `animejs`, `lenis/react`; stubs `IntersectionObserver` (`.trigger()`/`.emit()` helpers on `MockIntersectionObserver`) and `matchMedia`.
- Components must render **correct final-state DOM with all mocks active** (the splitter renders real text server-side — that's why).
- Pure modules get real unit tests: `dotGridGeometry`, `colorRamp`, `scrollTracePath`, `cursorEngine` (manual `tick(dt)` → assert transform strings), `splitText`, `useKeySequence`, hooks.
- jsdom event quirks: React `onMouseEnter` ← `fireEvent.mouseOver`; `onPointerEnter` ← `fireEvent.pointerOver` (pass `{ pointerType: 'mouse' }`); `onFocus` ← `fireEvent.focusIn`. (Or prefer CSS `:hover` so there's nothing to simulate.)
- Slot-roll tests: jsdom never fires `transitionend` and rects are 0 — the engine's **safety-net rebuild** is what makes final states reachable; assert after `vi.runAllTimers()`/`advanceTimersByTime`, and assert the accessible text via `[data-slot-sr]` (it updates immediately). React/RTL hold internal timers under fake timers — assert cell absence (`[data-slot-cell]`), not `vi.getTimerCount() === 0`, for "engine did nothing" cases.
- CI: lint → `npm test` → build. All three must pass before merge; **push to `main` deploys via Vercel**.

## 10. Hard-won gotchas (read before touching motion/text)

1. **anime.js 4.4**: `ease: 'cubicBezier(...)'` string syntax is REMOVED — import the `cubicBezier` function (already wrapped as `EASE_ANIME`). Named eases (`'out(3)'`, `'inOutSine'`, `'outElastic(1, .6)'`) still work as strings.
2. **SSR hydration**: never derive initial React state from browser-API presence (`typeof IntersectionObserver`) — Node lacks them and the server HTML diverges. Same family: the FOUC-guard attribute needs `suppressHydrationWarning` on `<html>`.
3. **react-hooks v7 lint**: no synchronous `setState` in effects (defer through rAF) and no ref reads during render (`useMemo`/`useState` initializers instead).
4. **CSS-var/inline-style specificity**: an inline `display` beats any media query — wrappers like `Magnetic` must set display via a class.
5. **CSS animations override inline styles** — never animate a property (e.g. opacity) that an engine writes inline on the same element.
6. **Container queries** are how the headline fits its column exactly (`8cqw` vs the longest line's 12.2em) — vw clamps can't know column width.
7. Dot tween channels must be **separated by property** (`breathe` vs `pulse`) — `utils.remove(targets, undefined, prop)` then only clears the ripple channel.
8. SVG `<g>` elements with attribute matrices: never write transforms onto them (CSS transform replaces the matrix) — animate strokes (`createDrawable`) or the root `<svg>` instead.
9. **Windows/macOS case-insensitive module resolution**: `slotText.ts` and `SlotText.tsx` in one folder resolve to the SAME module specifier — the React layer is named `SlotRoll.tsx` for exactly this reason. Never add a file differing only in case.
10. **Slot roll × gradient-clip text**: `StatValue`'s `.value` is `background-clip: text` + `color: transparent`. The engine's rest color resolves to `transparent`, so the arrival blue crossfades into the gradient showing through — container-level clip applies to descendant glyphs. If a browser ever drops clip on transformed faces, the fallbacks are (in order): per-face `background: inherit` + clip chain, solid ink during rolls, solid brand blue.
11. **Slot roll × letter-spacing**: sizers inherit tracking so each cell carries its glyph + trailing track; total width is preserved but faces center within the tracked cell. Verified visually on the 0.12em mono labels — check again before using on wider tracking.
