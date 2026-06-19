# Changelog

All notable changes to the QubeTX Landing Page project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Brand fonts now render.** Makira and IBM Plex Mono are injected as
  `next/font` CSS variables, but the `.variable` classes sat on `<body>` while
  the `--font-stack-sans` / `--font-sans` token chain reads them from `:root`.
  A custom property declared on `:root` resolves its `var()`s at `:root`, where
  the body-scoped variables don't exist — so the whole stack went invalid and
  every surface fell back to the system sans. The variable classes now sit on
  `<html>`, so the token chain resolves and the brand type paints everywhere.

### Changed
- **QorkMe joins the product line.** `qork.me` moves from the Work section
  (client/portfolio projects) into Products as **QK-300 · QorkMe** — a URL
  shortener that now ships a universal `qork` CLI and agent-ready
  infrastructure, so it belongs with the tooling we build, ship, and run
  ourselves. The Products section copy no longer claims everything lives under
  reports.qubetx.com; the About counters read 06 Products Shipped / 06 Client
  Projects.
- **SD-300 and shaughvOS temporarily hidden** from the product line (and the
  footer, which renders from the same list) pending WIP. Preserved in source —
  reinstate by uncommenting their entries in `src/data/content.ts` and the
  matching codes in `content.test.ts`.

## [3.1.0] - 2026-06-11

The design system becomes a product: a full documentation page, a reusable
technical-register component family, and a downloadable kit. Plus the slot
roll (shipped to production earlier this version cycle) and the DotGrid
wave-ripple rework, now formally documented.

### Added
- **`/design-system`** — the QubeTX system of record: 26 numbered sections
  (tokens, components, motion, patterns) with LIVE specimens (the real
  production components), normative rule grids, copy-paste recipes, and an
  agent-facing implementation note closing every section. Millis-anatomy
  chrome: grouped sticky sidebar with scroll-spy + kit download, a
  right-edge **SectionRail** (scroll-drawn circuit trace, isometric cube
  ticks per section, slot-rolled `SEC NN · PP%` readout; ≥1600px),
  mobile top-bar collapse with a jump select
- **The technical register** (`src/components/terminal/`): `TerminalFrame`
  (terminal chrome whose lines **boot-print** like the loading screen —
  server HTML carries the full text; reveal streams on first view with live
  timestamps), `CommandTable`, `CapabilityRows`, `InstallBlock` (OS tabs +
  copy command with the slot-roll Copy → Copied flash), `DownloadCard` —
  generalized from reports.qubetx.com layouts, rendered in v3 tokens, the
  canonical anatomy for every future product page
- **The downloadable kit** (`public/qubetx-design-system-v3.1.0.zip`, built
  from live source by `npm run build:kit`): tokens css (sliced from
  globals.css), fonts (+ standalone @font-face css), the motion/pretext/ui/
  terminal/effects source layers with their tests, `package-snippet.json`,
  and agent docs — `SKILL.md` (the qubetx-design agent skill),
  `MOTION_GUIDE.md`, `README.md`, plus DESIGN_SYSTEM.md and BOOT_SCREEN.md
- **The slot roll** (`src/lib/motion/slotText.ts` + `SlotRoll.tsx`) — the
  house micro-interaction for changing labels (vendored from slot-text
  v0.2.2 MIT via the Millis kit, QubeTX-tuned: `--color-arrival` blue
  settling to ink; the destination rule: external = hover teaser,
  internal = click flash); live on both CTAs, the hero TextLink, the boot
  odometer, the About stats slot-machine, and the footer SYS_STATUS cycle
- Doc/specimen primitives (`src/components/design-system/`): CodeBlock +
  tinyTint (dependency-free code tinter), RuleGrid, DemoPanel, AgentNote,
  Swatch/TypeSpecimen/SpaceScale, EaseCurve (live easing visualizers),
  SpringDemo, slot-roll/text/dot-field/cursor/Pretext live demos

### Changed
- **DotGrid ripples are wave objects** (`makeRippleWave`/`applyRippleWaves`,
  pure + unit-tested): per-event cost 8–36ms → 0.2ms; pointer throttle
  tightened 24px/90ms → 16px/45ms (the swell now tracks the cursor); zero
  frames >25ms at 2× ripple density
- Boot arming is **home-route only** (`location.pathname === '/'` guard in
  the layout inline script) — `/design-system` and `/wallpaper` never boot
- Footer Connect column gains the Design System link; lucide registry gains
  Download/Copy/Check

## [3.0.0] - 2026-06-11

Complete ground-up redesign ("v3"), driven by the new hero mockup and the
component standards of qube-machine-report-homepage. Deployed via Vercel.

### Added
- **Brand fonts**: self-hosted Makira Sans (display + body) and IBM Plex Mono via `next/font/local` (`src/fonts/`)
- **Anime.js v4 motion system** (`src/lib/motion/`): tokens, reduced-motion store, IO triggers, anime scopes, server-rendered text splitter + masked reveals, magnetic pull, proximity glow — with strict per-element ownership rules (anime / Framer Motion / raw rAF / CSS)
- **DotGrid**: fully anime.js-driven interactive hero dot field (Canvas 2D blitter; breathe/pulse channels; distance-delay ripples; feathered edges dissolving into the next section; `qubetx:pulse` event bus)
- **LoadSequence**: single page-load timeline (header rise → eyebrow scramble-decode → masked headline rises → gradient sweep → CTAs → "system online" pulse) with an inline-script FOUC guard
- **ScrollTrace**: scroll-scrubbed circuit trace with isometric cube junctions — draws scrolling down, reverses scrolling up (paused timeline + Lenis seek)
- **New sections**: Products ("Terminal-grade tooling" — TR-300/SD-300/ND-300/WB-300/shaughvOS striped rows linking to reports.qubetx.com), About ("Detail is the product." — manifesto, count-up stats with re-verify hover, process rows)
- **Header**: fixed 3-zone nav with SERVICES disclosure dropdown, IO scroll-spy underline, terminal bracket hovers, full-screen mobile menu
- **Footer**: product/nav/connect columns, stroked oversized wordmark, scroll-progress back-to-top ring, letter-roll links
- **CursorEngine**: rebuilt cursor physics (dt-normalized lerp, settle-cancelled rAF, velocity squash/stretch, magnetic docking, press states)
- **RoutedText**: Pretext `layoutNextLine` obstacle routing — the About lead paragraph flows around a wireframe cube
- **Easter eggs** (+ `EASTER_EGGS.md` answer key): console signature, "qubetx" shockwave, Konami TR-300 WEB REPORT terminal, logo de-render/redraw
- **TV tier**: `--container-max` widens to 1800px at ≥2560px; container-query headline sizing scales with it

### Changed
- Palette to deep void (`#05070f`) with brand blue→purple gradient accents; machine-report visual standards (1px hairline grids, mono label pills, striped rows, version-badge chips, `cubic-bezier(0.25,1,0.5,1)` easing everywhere)
- Hero copy to the mockup: "Solid code. / Stronger systems. / Limitless possibilities."
- `#projects` → `#work`, `#process` → inside `#about` (hidden alias anchors preserved)
- CI now runs `npm test` between lint and build
- PretextProvider readiness resolves computed font names (fixes a permanent 3s degradation timeout under next/font)

### Removed
- R3F DotMatrix background on the index route (the `/wallpaper` page keeps its R3F effect), Unbounded/Space Grotesk/Space Mono Google fonts, aurora background layers, unused deps (`sass`, `tailwind-merge`, `@react-three/drei`)

## [2.7.0] - 2026-03-29

### Added
- **@chenglou/pretext integration** for comprehensive responsive text intelligence — layout-shift prevention, orphan/widow control, and continuous container-aware scaling
- `PretextProvider` context component with font readiness gating (`document.fonts.ready` + `document.fonts.check()`)
- `PretextBlock` drop-in wrapper component applying `min-height` (layout-shift prevention) and `max-width` shrinkwrap (orphan/widow prevention)
- `useContainerWidth` hook using sync `clientWidth` reads + `window.resize` coalesced through a single `requestAnimationFrame` gate (no ResizeObserver — prevents text vibration)
- `resizeCoordinator` singleton module sharing one global resize listener across all PretextBlock instances
- Core library at `src/lib/pretext/` with barrel export
- Unit tests for `resizeCoordinator` and `PretextProvider`
- Shared Pretext mock for component tests (`src/test/mocks/pretext.tsx`)
- Auto-mock of `@/lib/pretext` in test setup for all component tests

### Changed
- Hero subtitle and company text wrapped with PretextBlock (shrinkwrap on subtitle)
- FeatureCard titles and descriptions wrapped with PretextBlock (shrinkwrap on descriptions)
- Process step descriptions wrapped with PretextBlock (shrinkwrap)
- ProjectCard titles and descriptions wrapped with PretextBlock (shrinkwrap on descriptions)
- Section subtitles (Process, TechStack, Projects, Contact) wrapped with PretextBlock for min-height only (no shrinkwrap — conflicts with `text-align: center`)
- TechStack tech names wrapped with PretextBlock for min-height
- Footer tagline wrapped with PretextBlock
- Contact section converted to client component for PretextBlock hook support

### Fixed
- Removed `shrinkwrap` from centered section subtitles (Projects, Contact, Process, TechStack) — shrinkwrap `max-width` narrowing conflicts with `text-align: center` + `margin: 0 auto`, pulling text off-center
- Added `text-align: center` to ContactButton so button text centers correctly when it wraps at narrow viewports

### Configuration
- `next.config.mjs`: Added `transpilePackages: ['@chenglou/pretext']` (package ships raw .ts source)
- `tsconfig.json`: Added `allowImportingTsExtensions: true` and `ES2022.Intl` to lib array
- Test setup: Auto-mocks `@/lib/pretext` for all component tests

## [2.6.0] - 2026-03-22

### Added
- **Global `:focus-visible` keyboard focus styles** — Added zero-specificity `:where(*):focus-visible` rule to `app/globals.css` with electric blue outline, ensuring keyboard users always see focus indicators (critical since the custom cursor hides the native pointer)
- **Skip-to-content link** — Added a visually hidden "Skip to content" link as the first focusable element in `Header.tsx`; appears on keyboard focus with high-contrast blue styling and ring indicator
- **Semantic `<nav>` footer columns** — Replaced generic `<div>` wrappers with `<nav aria-labelledby="...">` elements for the Navigation and Connect footer columns in `Footer.tsx`
- **ProjectCard `aria-label`** — Added `aria-label="Visit project site for {title}"` to each project card link to give screen readers a clear destination label instead of reading all nested card text
- **Screen-reader announcements for external links** — Added visually hidden "(opens in a new tab)" text to all `target="_blank"` links across `ContactButton.tsx`, `ProjectCard.tsx`, and `Footer.tsx`
- **New tests** — Skip-to-content link test in `Header.test.tsx`; semantic nav assertion in `Footer.test.tsx`

### Changed
- Renamed anchor target from `id="top"` to `id="main-content"` in `app/page.tsx` with `tabIndex={-1}` for proper skip link focus management
- Updated all `#top` references to `#main-content` in `Header.tsx` and `Footer.tsx`
- Switched test assertions from exact string matching to regex patterns in `ContactButton.test.tsx`, `ProjectCard.test.tsx`, and `Footer.test.tsx` to accommodate sr-only text additions

### Removed
- **Closed 17 stale/duplicate PRs** — 16 auto-generated Jules (Google Gemini) "Palette" accessibility PRs and 1 stale ImgBot PR. All contained quality issues including `pnpm-lock.yaml` bloat (~5,600 lines each; project uses npm), `serve.pid` artifacts, `.Jules/palette.md` journal files, and massive duplication (same fix proposed 2–8 times). Best implementations were cherry-picked and consolidated into this single clean release. Deleted all 17 associated remote branches.

## [2.5.2] - 2026-03-09

### Fixed
- **CI lint failure** — Rewrote framer-motion test mock (`src/test/mocks/framer-motion.ts`) to filter motion props via a `Set` instead of destructuring, eliminating 15 unused-variable warnings; added `displayName` to the `forwardRef` component to fix the `react/display-name` error

## [2.5.1] - 2026-03-09

### Changed
- **Renamed Bauhaus Timer → SHAUGHV Timer** in project cards (`src/data/content.ts`): updated id, title, alt text, tags, and description
- **Updated timer screenshot** (`public/timer.png`) with fresh capture from [timer.emmetts.dev](https://timer.emmetts.dev)
- **White QubeTX logo** — Added `color` prop to `QubeTXLogo` component (defaults to white); logo now renders white site-wide to match adjacent text

## [2.5.0] - 2026-03-03

### Performance

- **CustomCursor event delegation** — Replaced per-element `pointerenter`/`pointerleave` listeners and `MutationObserver` with two delegated `pointerover`/`pointerout` listeners on `document.body`, eliminating DOM re-querying on every mutation (`src/components/effects/CustomCursor.tsx`)

### Refactoring

- **Shared animation variants** — Extracted duplicate framer-motion variant definitions into `src/utils/animations.ts` with `createContainerVariants()`, `slideUpVariants`, `slideLeftVariants`, `heroItemVariants`, and `sectionTitleAnimation`; updated 7 component files to use shared imports (Features, Projects, Process, TechStack, Hero, FeatureCard, ProjectCard)

### Added

- **Test infrastructure** — Vitest with React Testing Library, jsdom environment, CSS module support, and framer-motion mock (`vitest.config.ts`, `src/test/setup.ts`, `src/test/mocks/framer-motion.ts`)
- **63 component tests across 12 test files** covering data exports, UI components (ContactButton, FeatureCard, ProjectCard), section components (Contact, Features, Projects, Process, TechStack, Hero), and layout components (Header, Footer)
- `npm test` and `npm run test:watch` scripts

## [2.4.0] - 2026-03-02

### Changed
- **Unified card hover behavior** across Feature, Project, and Process cards — all now share the same `translateY(-5px)` lift with a gradient bar reveal on top, matching the Process section pattern
- **Glassmorphic section containers** — Features, Process, Projects, TechStack, and Contact sections all receive a consistent frosted-glass treatment (`rgba(13, 17, 23, 0.65)` background, `backdrop-filter: blur(12px)`, subtle border, rounded corners)
- **Header and Footer frosted glass** — both now have translucent backgrounds with backdrop blur for depth against the DotMatrix background
- **Contact section** restructured from a flat layout with a `::before` divider line into a centered glassmorphic card wrapper (`.contactCard`)
- **Footer bottom bar** centered; removed commit hash display (`commitInfo`/`commitLabel` styles and `__GIT_COMMIT__` reference)
- **Features section** simplified — removed complex layered gradient background, animated grid-line pseudo-elements (`::before`/`::after`), `@keyframes float`/`pulse`, and the decorative `topLine` element; max-width reduced from 1280px to 1200px
- **Projects section** max-width reduced from 1400px to 1200px for consistency with other sections

### Removed
- 3D mouse-tracking tilt effect from FeatureCard and ProjectCard (removed `useMotionValue`, `useSpring`, `useTransform`, `rotateX`/`rotateY`, `translateZ` layers, and `whileHover` scale)
- Shimmer animation (`::after` sweep + `@keyframes shimmer`) from FeatureCard
- Overlay gradient (`::before`) hover effect from FeatureCard
- `backdrop-filter: blur(10px)` and layered `box-shadow` from FeatureCard base styles
- Icon `rotate(5deg)` on FeatureCard hover (kept `scale(1.1)`)
- Features section `topLine` decorative element and its mobile `display: none` rule
- Features section `::before` grid-dot pattern and `::after` pulsing overlay with `float`/`pulse` keyframes

## [2.3.0] - 2026-03-02

### Added
- New colorized QubeTX SVG logo (`public/qubetx-logo.svg`) with brand gradient strokes (Primary Blue outer frame, Gradient Blue left face, Gradient Purple right face, blue-to-purple gradient cross-sections)
- SVG favicon (`public/favicon.svg`) with white rounded-rect background and solid Primary Blue strokes for small-size visibility
- `QubeTXLogo` inline SVG React component (`src/components/ui/QubeTXLogo.tsx`) with `useId`-based unique gradient IDs to prevent collision when rendered in multiple locations
- Multi-column Footer with logo section, navigation anchor links, connect links, and bottom bar with copyright/commit info
- Section `id` attributes on page wrappers (`#top`, `#services`, `#process`, `#projects`, `#contact`) enabling footer anchor navigation
- Favicon metadata in `layout.tsx` with SVG primary and PNG fallback for Apple devices

### Changed
- Header now renders inline SVG logo via `QubeTXLogo` component alongside "QubeTX" Unbounded wordmark (replaces `<img>` tag with `logoSrc`/`logoAlt` props)
- Header wordmark hidden on screens <= 375px, showing only cube mark
- Footer fully rewritten from single-line copyright to structured multi-column layout with Navigation and Connect columns
- `page.tsx` now imports and renders Header and Footer components, wrapping sections with anchor-link `id` attributes

## [2.2.1] - 2025-12-05

### Added
- Committed `.claude/` configuration directory for shared Claude Code settings

### Changed
- Added `next-env.d.ts` to `.gitignore` (auto-generated by Next.js, should not be tracked)

## [2.2.0] - 2025-12-05

### Added
- New `/wallpaper` route serving an interactive animated wallpaper page
- `WallpaperMatrix` component: a tuned variant of `DotMatrix` with lower opacity (0.2), slower animation, and smoother mouse interaction optimized for 16:9 displays
- `animate-pulse-slow` animation class for subtle glow effects (4s ease-in-out cycle)
- Centered QubeTX logo with radial glow effect and "A Department of ES Dev LLC" tagline

### Changed
- Grid configuration for wallpaper uses 60×35 dots with 0.6 spacing for widescreen optimization
- Separated `viewport` export from `metadata` in wallpaper page per Next.js 16 best practices

## [2.1.8] - 2025-11-19

### Fixed
- Anchored the custom cursor to the viewport origin so its glow, ring, and dot now track the real pointer instead of sitting ~200px offset and blocking interactive elements.

## [2.1.7] - 2025-11-19

### Added
- Project-wide `.gitignore` covering Next.js build output, caches, and dependency directories so only source files land in version control.

### Fixed
- Removed the committed `node_modules/` tree (including the 120MB `@next/swc` binary) plus other generated artifacts so pushes stay under GitHub's 100MB file limit.

## [2.1.6] - 2025-11-19

### Added
- ESLint devDependencies and a working `npm run lint` script that runs the full TypeScript/React rule set.
- Updated CODEX_PROJECT.md and AGENTS.md with the current Next.js App Router workflow and workspace tree.

### Changed
- Replaced the legacy Vite node_modules with the correct Next.js dependency graph and regenerated `package-lock.json`.
- Cleaned up dot-matrix and UI components to use `import type`/JSX-safe props so the stricter linting passes without `@ts-nocheck`.
 
### Fixed
- Set `turbopack.root` inside `next.config.mjs` so Next.js no longer climbs to `/Users/realemmetts` when multiple lockfiles exist, restoring local dev/build commands.

## [2.1.5] - 2025-11-19

### Fixed
- Restored the Features section build by importing the missing `FC` type so TypeScript compilation succeeds
- Typed Hero motion variants so Framer Motion accepts the spring transition during TypeScript checks
- Imported the missing `FC` type in the Projects section to keep TypeScript builds passing

## [2.1.4] - 2025-09-27

### Added
- ESLint configuration with React and TypeScript rules plus an `npm run lint` script for local checks

### Changed
- Updated components to use `import type` for React typings and satisfied new lint expectations
- Escaped apostrophes in contact messaging to comply with JSX accessibility linting

## [2.1.3] - 2025-09-26

### Changed
- Rebuilt the custom cursor for precise tracking with intensified blue/purple bloom layers
- Energized global background with animated lighting gradients that respect the original brand palette
- Tidied UI accessibility by hiding decorative feature icons and pruning unused animations

## [2.1.2] - 2025-09-26

### Changed
- Updated CI pipeline to run TypeScript checks and Vitest suite after dependency install
- Streamlined secondary code-quality job to reuse the production build for bundle metrics

## [2.1.1] - 2025-09-26

### Changed
- Rebuilt the custom cursor with layered bloom, ring, and core elements for a modern glow and subtle trailing motion
- Smoothed cursor interpolation and throttled interactive listener updates to prevent aggressive snapping
- Updated cursor styling to centralize opacity control while retaining reduced-motion and touch safeguards

## [2.1.0] - 2025-09-26

### Added
- TypeScript toolchain (`typescript`, React DOM types) with strict configuration and global CSS module declarations
- `CODEX_PROJECT.md` with current project overview and workspace tree
- Centralized content source in `src/data/content.ts` powering sections for reuse and future expansion

### Changed
- Migrated all React components to `.tsx` with explicit props and accessibility improvements
- Updated custom cursor to respect reduced-motion preferences and pointer availability
- Refined section semantics, project tag markup, and global cursor styles for better accessibility

## [2.0.2] - 2025-09-26

### Added
- Vitest test harness with Hero component coverage and shared Testing Library setup

### Changed
- `AGENTS.md` instructions now document run-mode testing commands and updated dev server ports

## [2.0.1] - 2025-09-26

### Added
- `AGENTS.md` contributor guidelines with project structure, workflow, and review expectations

## [2.0.0] - 2025-09-10

### Changed
- **BREAKING**: Migrated from static HTML/CSS to React 19 with Vite
- Restructured entire codebase to component-based architecture
- Moved all styling to CSS Modules for better encapsulation
- Enhanced responsive design with additional breakpoints (375px, 390px, 414px)
- Migrated all image assets to public/ directory
- Updated build system from static files to Vite bundler

### Added
- React 19 component architecture
- Vite 7 build tool and development server
- CSS Modules for scoped styling
- Custom magnetic cursor effect with React hooks
- Component organization (layout, sections, ui, effects)
- npm package management
- Hot Module Replacement for development
- Production build optimization
- Development server on port 8080, preview on port 8081
- `CLAUDE.md` file for Claude Code guidance and project context
- `OG_TREE.txt` file with complete project structure snapshot
- `CHANGELOG.md` file to track project history

### Improved
- Mobile responsiveness with fluid typography using clamp()
- Touch target sizes (minimum 44px)
- Button heights (minimum 48px)
- Progressive enhancement for smaller devices
- Development workflow with HMR

## [1.3.0] - 2025-06-28

### Added
- MAGZ Sports Group project to portfolio section
- Contact section with email link

### Fixed
- Project card layout issues on mobile devices
- Full-height styling for project cards
- Grid layout improvements for better responsiveness

### Changed
- Updated project grid from 3-column to 2-column layout
- Enhanced project card hover states and transitions

## [1.2.0] - 2025-02-19

### Fixed
- Cursor behavior improvements
- Various layout and scaling issues
- Feature card spacing and alignment

### Changed
- Updated base CSS for better variable management
- Improved responsive design breakpoints
- Enhanced typography scaling

## [1.1.0] - 2024-12-09

### Added
- QubeTX Design System documentation (`QubeTX_Design_System.md`)
- Detailed design specifications including:
  - Neo-Bauhaus inspired aesthetic
  - Typography system (Unbounded, Space Grotesk, Space Mono)
  - Color palette and gradients
  - Grid system (8px base unit)
  - Component patterns
  - Animation guidelines

### Changed
- Updated favicon for better visibility at small scale
- Compressed all project preview images for faster loading
- Optimized image assets using ImgBot

## [1.0.0] - 2024-11-16

### Added
- Complete redesign for new QubeTX brand identity
- Project portfolio section featuring:
  - Dorsey Memorial Community Center
  - Golden Valley Golf & Country Club
- Modular CSS architecture with component separation
- Custom CSS properties for theme management
- Responsive design with mobile-first approach

### Changed
- Updated QubeTX logo to new brand design
- Restructured CSS into modular components:
  - `base.css` - CSS variables and resets
  - `components/` - Individual component styles
  - `utils/` - Typography and responsive utilities
- Enhanced hover states and animations

## [0.1.0] - 2024-11-14

### Added
- Initial project setup
- Basic HTML structure
- GitHub Pages deployment configuration
- Custom domain setup via CNAME (qubetx.com)
- Essential image assets:
  - QubeTX logo (horizontal and standard variants)
  - Favicon

### Project Information
- **Type**: React SPA with Vite
- **Deployment**: GitHub Pages
- **Domain**: qubetx.com
- **Purpose**: Official landing page for QubeTX, a department of ES Development LLC
