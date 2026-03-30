# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QubeTX Landing Page - A modern Next.js website serving as the official landing page for QubeTX, a department of ES Development LLC. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, featuring 3D interactive effects via React Three Fiber.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Component-based UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework (new @theme syntax)
- **React Three Fiber** - 3D graphics with Three.js
- **Framer Motion** - Animation library
- **Lenis** - Smooth scroll implementation
- **@chenglou/pretext** - Text measurement and responsive layout intelligence
- **GitHub Pages** - Static export deployment via CI/CD

## Development Commands

```bash
# Install dependencies
npm install

# Development server (default Next.js port 3000)
npm run dev

# Production build (outputs to out/ directory)
npm run build

# Production preview
npm run start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Architecture

### App Router Structure

This project uses Next.js App Router (not Pages Router):

- `app/layout.tsx` - Root layout with font configuration, metadata, PretextProvider, and global effects (SmoothScroll, CustomCursor)
- `app/page.tsx` - Home page assembling all sections with DotMatrix background
- `app/globals.css` - Global styles, Tailwind imports, CSS variables, and animations

### Component Organization

```
src/components/
├── layout/          # Page structure components
│   ├── Header.tsx
│   └── Footer.tsx
├── sections/        # Main content sections
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Process.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── ui/              # Reusable UI components
│   ├── FeatureCard.tsx
│   ├── ProjectCard.tsx
│   ├── ContactButton.tsx
│   └── QubeTXLogo.tsx
└── effects/         # Visual effects
    ├── CustomCursor.tsx    # Magnetic cursor with bloom
    ├── SmoothScroll.tsx    # Lenis smooth scrolling
    └── DotMatrix.tsx       # R3F 3D dot grid background
```

### Pretext Integration (`src/lib/pretext/`)

The site uses `@chenglou/pretext` for JS-driven text measurement beneath the CSS responsive design. Pretext provides two capabilities: **layout-shift prevention** (reserving exact text height via `min-height`) and **orphan/widow prevention** (narrowing `max-width` via binary-search shrinkwrap).

```
src/lib/pretext/
├── resizeCoordinator.ts  # Single global window.resize listener + RAF gate
├── useContainerWidth.ts  # Sync clientWidth measurement hook (NO ResizeObserver)
├── PretextProvider.tsx   # Font readiness context (document.fonts.ready)
├── PretextBlock.tsx      # Drop-in wrapper: min-height + shrinkwrap max-width
├── index.ts              # Barrel export
└── __tests__/            # Unit tests for coordinator and provider
```

**Critical Rules:**
- **NEVER use ResizeObserver** with Pretext — causes text vibration/oscillation with shrinkwrap. Confirmed across multiple projects after two failed attempts. The correct pattern: sync `clientWidth` reads + `window.resize` coalesced through a single RAF gate.
- **NEVER use `shrinkwrap` on centered text** — shrinkwrap narrows `max-width`, which conflicts with `text-align: center` + `margin: 0 auto`, pulling text off-center. Centered elements (section subtitles) should use PretextBlock for `min-height` only.
- PretextBlock reads font properties from `getComputedStyle()` to handle `next/font/google` rewritten names (e.g. `"__Unbounded_a1b2c3"`)
- `prepare()` is re-called only when resolved font size changes >0.5px (for `clamp()` values)
- All enhancements are additive (`min-height`, narrower `max-width`) and gracefully degrade if fonts aren't loaded
- Package ships raw `.ts` source — requires `transpilePackages` in next.config and `allowImportingTsExtensions` in tsconfig

**PretextBlock props:**
- `text` (string) — plain text content to measure
- `lineHeight` (number) — unitless ratio matching CSS `line-height`
- `shrinkwrap` (boolean) — enable orphan/widow prevention via `max-width` narrowing (only for left-aligned text)
- `as` (ElementType) — rendered HTML element (defaults to `div`)
- `className`, `style` — pass-through styling

**Usage patterns:**
```tsx
{/* Left-aligned paragraph — use shrinkwrap for orphan prevention */}
<PretextBlock text={description} lineHeight={1.65} shrinkwrap as="p" className={styles.description}>
  {description}
</PretextBlock>

{/* Centered subtitle — NO shrinkwrap (conflicts with centering) */}
<PretextBlock text={subtitle} lineHeight={1.6} as="p" className={styles.sectionSubtitle}>
  {subtitle}
</PretextBlock>

{/* Short title — min-height only, no shrinkwrap needed */}
<PretextBlock text={title} lineHeight={1.3} as="h3" className={styles.title}>
  {title}
</PretextBlock>
```

**Testing:** All component tests auto-mock `@/lib/pretext` via `src/test/setup.ts`. Core library tests in `src/lib/pretext/__tests__/` unmock and test the real modules with mocked `@chenglou/pretext` (canvas unavailable in jsdom).

### Data Layer

- `src/data/content.ts` - Centralized content data with TypeScript types
  - Export typed constants: `HERO_CONTENT`, `FEATURES`, `PROJECTS`, `CONTACT_CTA`
  - Single source of truth for all copy and content
  - Types: `Feature`, `Project`, `HeroContent`, `ContactCta`

### Styling Architecture

**Tailwind CSS v4 with @theme syntax:**

- Global styles in `app/globals.css` using `@import "tailwindcss"`
- Theme configuration via `@theme` directive (not traditional config file)
- Custom CSS variables defined in `:root` for backward compatibility
- Font variables injected from Next.js font optimization
- No separate `tailwind.config.ts` - configuration in CSS via `@theme`

**Key styling patterns:**
- Utility-first with Tailwind classes
- CSS variables for legacy design system values
- Custom animations defined in globals.css (`ambientPulse`, `auroraShift`)
- Responsive design with Tailwind breakpoints
- Custom cursor hidden via CSS on touch devices (`@media (pointer: fine)`)

### React Three Fiber Integration

`DotMatrix.tsx` creates an interactive 3D dot grid:
- Uses `@react-three/fiber` Canvas and hooks
- Instanced mesh rendering for performance (2500 dots)
- Mouse interaction via `useThree` hook
- Wave animation with `useFrame`
- Wrapped in Suspense for progressive loading

**Important:** R3F components use `// @ts-nocheck` due to type complexity. Type definitions in `src/r3f.d.ts`.

## Build Configuration

### next.config.mjs

```javascript
output: 'export'           // Static export for GitHub Pages
images: { unoptimized: true }  // No Next.js image optimization
```

### TypeScript Configuration

- **Module Resolution**: `bundler` (Next.js 16 default)
- **JSX**: `react-jsx` (automatic runtime)
- **Path Alias**: `@/*` → `./src/*`
- **Target**: ES2017
- **Strict mode enabled**

### PostCSS Configuration

Uses Tailwind CSS v4 PostCSS plugin:
```javascript
"@tailwindcss/postcss": {}
```

## Design System

Follows specifications in `QubeTX_Design_System.md`:

### Typography
- **Unbounded**: Headlines and titles (next/font/google)
- **Space Grotesk**: Body text (next/font/google)
- **Space Mono**: Technical text and tags (next/font/google)

### Color System
- Primary Blue: `#0066FF`
- Dark Background: `#0a0f1c`
- Card Background: `#0d1117`
- Gradient Blue: `#2563eb`
- Gradient Purple: `#7c3aed`

### Grid System
- 8px base unit (`--grid-unit`)
- Responsive spacing with CSS clamp() functions
- Mobile-first breakpoints: 375px, 390px, 414px, 768px, 1200px
- Touch target minimum: 44px

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **build-and-test** - Type check, run tests, build, upload artifacts
2. **deploy-preview** - Preview deployments for PRs
3. **deploy-production** - Auto-deploy to GitHub Pages on main branch push
4. **code-quality** - Security audit, bundle size reporting
5. **notify** - Build status notifications

**Important:** The build outputs to `out/` directory (not `dist/`). CI uses `npm test` which must be configured.

## Deployment

- **Platform**: GitHub Pages
- **Trigger**: Push to main branch
- **Process**: Automated via GitHub Actions
- **Custom Domain**: Configured via `public/CNAME`
- **Build Artifacts**: Static export in `out/` directory

## Key Implementation Details

### Font Loading
Fonts are loaded via Next.js `next/font/google` in `app/layout.tsx`:
- Creates CSS variables (`--font-unbounded`, `--font-space-grotesk`, `--font-space-mono`)
- Applied to body via className with `.variable`
- Optimized with `display: "swap"`

### Custom Cursor
- Only active on devices with `pointer: fine` (non-touch)
- Global cursor disabled via CSS in globals.css
- Magnetic attraction to interactive elements
- Respects `prefers-reduced-motion`
- Layered design with bloom, ring, and core elements

### Smooth Scrolling
- Implemented via Lenis library
- Client component wrapping app content
- Disabled on touch devices for native feel

### Static Assets
- Located in `public/` directory
- Referenced as `/filename.png` in code
- Includes: logos, project images, favicon, CNAME

## Common Gotchas

1. **This is NOT a Vite project** - It's Next.js with App Router
2. **Tailwind v4 syntax** - Uses `@theme` directive, not traditional config
3. **Static export mode** - Some Next.js features unavailable (ISR, API routes)
4. **Images unoptimized** - Next.js Image component works but without optimization
5. **R3F type issues** - Use `// @ts-nocheck` for complex Three.js typing
6. **Build output** - Goes to `out/` not `dist/` (some CI references still say `dist/`)
7. **Port differences** - Dev server is port 3000 (Next.js default), not 8080
8. **Pretext ships raw .ts** - Requires `transpilePackages` and `allowImportingTsExtensions` — see Pretext Integration section
9. **Pretext shrinkwrap + centering** - Never use `shrinkwrap` on `text-align: center` elements — it breaks centering by narrowing `max-width`
