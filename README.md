# QubeTX Landing Page

The official landing page for **QubeTX**, a department of ES Development LLC under the E. SHAUGHNESSY group. QubeTX provides professional web development, maintenance services, and backend API infrastructure for modern digital businesses.

**Live site:** [qubetx.com](https://qubetx.com)

## What We Do

QubeTX specializes in five core areas:

- **Web Development** — Modern, responsive websites and complex web applications
- **Maintenance** — Security updates, performance optimization, and technical support
- **API Infrastructure** — Scalable backend systems with modern architecture patterns
- **Cloud Solutions** — Hosting, CDN implementation, and serverless architectures
- **Security & Performance** — Audits, SSL implementation, and optimization

## Featured Projects

The landing page showcases our public portfolio including:

- **Leon Lee Dorsey** — Digital presence for NYC's renowned jazz bassist and educator
- **System Reports** — Cross-platform CLI system diagnostics in Rust
- **MAGZ Sports Group** — Sports marketing platform for elite athletes and brands
- **Green Valley** — Commercial lawn care provider in Houston
- **QorkMe** — Bauhaus-inspired URL shortener
- **Bauhaus QR Generator** — AI-enhanced QR code generator
- **Foundry RMP** — Raw materials processor for CivMC
- **SHAUGHV Timer** — Precision countdown and interval timer

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 | React framework with App Router, static export |
| UI | React 19 | Component-based architecture |
| Language | TypeScript | Type-safe development with strict mode |
| Styling | Tailwind CSS v4 | Utility-first CSS with `@theme` directive |
| 3D | React Three Fiber | Interactive dot matrix background |
| Animation | Framer Motion | Scroll-triggered animations and transitions |
| Scroll | Lenis | Smooth scrolling with inertia |
| Text Intelligence | @chenglou/pretext | Layout-shift prevention, orphan/widow control |
| Deployment | GitHub Pages | Static export via CI/CD |

### Typography

- **Unbounded** — Headlines and titles (display font)
- **Space Grotesk** — Body text (sans-serif)
- **Space Mono** — Technical text, tags, and subtitles (monospace)

All fonts loaded via `next/font/google` with `display: "swap"` optimization.

### Design System

- **Primary Blue:** `#0066FF`
- **Dark Background:** `#0a0f1c`
- **Gradient:** `#2563eb` (blue) to `#7c3aed` (purple)
- **Grid Unit:** 8px base
- **Breakpoints:** 375px, 390px, 414px, 768px, 1200px
- **Touch Target Minimum:** 44px

Full design specifications in `QubeTX_Design_System.md`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Development

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Run tests
npm test

# Production build (outputs to out/)
npm run build
```

---

## Architecture

### Project Structure

```
app/
├── layout.tsx          # Root layout: fonts, PretextProvider, SmoothScroll, CustomCursor
├── page.tsx            # Home page: assembles all sections with DotMatrix background
├── globals.css         # Global styles, @theme config, CSS variables, animations
└── wallpaper/          # Standalone animated wallpaper page

src/
├── components/
│   ├── layout/         # Header, Footer
│   ├── sections/       # Hero, Features, Process, TechStack, Projects, Contact
│   ├── ui/             # FeatureCard, ProjectCard, ContactButton, QubeTXLogo
│   └── effects/        # CustomCursor, SmoothScroll, DotMatrix (R3F)
├── lib/
│   └── pretext/        # Pretext integration layer (see below)
├── data/
│   └── content.ts      # Centralized content with TypeScript types
├── utils/
│   └── animations.ts   # Shared Framer Motion variants
└── test/
    ├── setup.ts        # Vitest setup with auto-mocks
    └── mocks/          # Framer Motion and Pretext mocks
```

### Pretext Integration

The site uses [@chenglou/pretext](https://github.com/chenglou/pretext) for JS-driven text measurement beneath the CSS responsive design. Pretext is a pure JavaScript library that measures text via Canvas (no DOM reflows) and performs layout as pure arithmetic — enabling real-time container-aware text intelligence at near-zero cost.

**What it provides:**
- **Layout-shift prevention** — Reserves exact text height via `min-height` before fonts load
- **Orphan/widow prevention** — Binary-search shrinkwrap narrows `max-width` to eliminate single-word last lines

**Architecture:**
```
src/lib/pretext/
├── resizeCoordinator.ts  # Single global window.resize listener + RAF gate
├── useContainerWidth.ts  # Sync clientWidth measurement hook (NO ResizeObserver)
├── PretextProvider.tsx   # Font readiness context (document.fonts.ready + check)
├── PretextBlock.tsx      # Drop-in wrapper: min-height + optional shrinkwrap
├── index.ts              # Barrel export
└── __tests__/            # Unit tests
```

**How it works:**
1. `PretextProvider` wraps the app in `layout.tsx`, waits for all fonts to load
2. `PretextBlock` wraps individual text elements, reads computed font from the DOM
3. On mount and resize, it calls Pretext's `prepare()` (one-time, ~0.04ms) then `layout()` (hot path, ~0.0002ms)
4. Sets `min-height` for layout-shift prevention and optionally `max-width` for shrinkwrap
5. `resizeCoordinator` ensures all instances share a single `window.resize` listener with RAF coalescing

**Critical constraints:**
- **No ResizeObserver** — Causes text vibration/oscillation feedback loops with shrinkwrap
- **No shrinkwrap on centered text** — `max-width` narrowing conflicts with `text-align: center`
- **Raw .ts source** — Requires `transpilePackages` in Next.js config

**Where it's applied:**

| Component | Elements | Shrinkwrap |
|-----------|----------|------------|
| Hero | Subtitle, company text | Subtitle only |
| FeatureCard | Title, description | Description only |
| Process | Step title, step description | Description only |
| TechStack | Tech names | No |
| ProjectCard | Title, description | Description only |
| Contact | Title, subtitle | No (centered) |
| Footer | Tagline | No |
| Section subtitles | Process, TechStack, Projects, Contact | No (centered) |

### Responsive Design

The site uses a layered responsive approach:

1. **CSS `clamp()` functions** — Fluid scaling for font sizes, padding, margins, gaps
2. **CSS variables** — Typography scale and spacing in `:root`
3. **Media queries** — Fine-tuning at 768px, 414px, 390px, 375px breakpoints
4. **Pretext** — Runtime text measurement for layout-shift prevention and orphan control
5. **CSS Grid `auto-fit`** — Responsive columns without media queries

### React Three Fiber

The `DotMatrix` component creates an interactive 3D dot grid background:
- Instanced mesh rendering for 2500 dots (single draw call)
- Mouse interaction via `useThree` pointer tracking
- Wave animation via `useFrame` loop
- Uses `// @ts-nocheck` due to R3F type complexity
- Type augmentations in `src/r3f.d.ts`

### Custom Cursor

- Active only on `pointer: fine` devices (desktop)
- Layered design: bloom, ring, core
- Magnetic attraction to `[data-interactive]` elements
- Respects `prefers-reduced-motion`
- Global `cursor: none` via CSS

### Animations

All Framer Motion variants centralized in `src/utils/animations.ts`:
- `createContainerVariants()` — Staggered child animations
- `slideUpVariants` / `slideLeftVariants` — Section entrance animations
- `heroItemVariants` — Hero text cascade
- `sectionTitleAnimation` — Scroll-triggered title reveals

---

## Build & Deployment

### Build Configuration

```javascript
// next.config.mjs
output: 'export'                              // Static HTML export
images: { unoptimized: true }                 // No image optimization (GitHub Pages)
transpilePackages: ['@chenglou/pretext']      // Raw .ts source compilation
```

```json
// tsconfig.json highlights
"allowImportingTsExtensions": true    // Required for Pretext .ts imports
"lib": ["dom", "dom.iterable", "esnext", "ES2022.Intl"]  // Intl.Segmenter types
"moduleResolution": "bundler"         // Next.js 16 default
"target": "ES2017"
```

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **build-and-test** — TypeScript check, Vitest, build, artifact upload
2. **deploy-preview** — Preview deployments for pull requests
3. **deploy-production** — Auto-deploy to GitHub Pages on push to `main`
4. **code-quality** — Security audit, bundle size reporting
5. **notify** — Build status notifications

### Deployment

- **Platform:** GitHub Pages
- **Trigger:** Push to `main` branch
- **Custom Domain:** `qubetx.com` (configured via `public/CNAME`)
- **Output:** Static export in `out/` directory

---

## Testing

```bash
npm test          # Run all tests
npm run test:watch  # Watch mode
```

- **Framework:** Vitest 4 with jsdom environment
- **Libraries:** React Testing Library, jest-dom matchers
- **Coverage:** 72 tests across 14 test files
- **Mocks:** Framer Motion (`src/test/mocks/framer-motion.ts`), Pretext (`src/test/mocks/pretext.tsx`)
- **Auto-mock:** `@/lib/pretext` mocked globally in `src/test/setup.ts`
- **CSS Modules:** Non-scoped class name strategy for test readability

---

## License

Copyright 2024-2026 QubeTX / ES Development LLC. All rights reserved.
