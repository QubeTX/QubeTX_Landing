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

- `app/layout.tsx` - Root layout with font configuration, metadata, and global effects (SmoothScroll, CustomCursor)
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
│   ├── Projects.tsx
│   └── Contact.tsx
├── ui/              # Reusable UI components
│   ├── FeatureCard.tsx
│   ├── ProjectCard.tsx
│   └── ContactButton.tsx
└── effects/         # Visual effects
    ├── CustomCursor.tsx    # Magnetic cursor with bloom
    ├── SmoothScroll.tsx    # Lenis smooth scrolling
    └── DotMatrix.tsx       # R3F 3D dot grid background
```

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
