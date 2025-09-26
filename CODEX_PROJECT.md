# QubeTX Landing – Project Overview

## TL;DR
- React 19 + Vite single-page marketing site for QubeTX, now fully migrated to TypeScript.
- Componentized layout with shared content data (`src/data/content.ts`) to eliminate duplication and keep sections reusable.
- Custom cursor effect now renders a soft bloom trail and automatically disables for touch devices and reduced-motion users.
- Vitest provides smoke coverage; run `npm test` for CI parity and `npm run build` for production bundling. CI now runs `npx tsc --noEmit`, `npm test`, and the production build on every push.

## Current Status
QubeTX Landing presents the agency's capabilities, featured projects, and contact CTA. The app bootstraps from `src/main.tsx`, renders `<App />`, and composes layout/section/UI atoms housed under `src/components`. Centralized content data feeds Hero, Features, Projects, and Contact sections, encouraging reuse for future pages or alternative feeds. Styling relies on CSS Modules with a global variables/reset layer in `src/styles/global.css`. Responsive breakpoints and fluid typography are tuned for 375–1200px+ viewports. The cursor effect (`CustomCursor`) now renders a bloom/trailing treatment while only engaging when a fine pointer is available and honoring the user's reduced-motion preference.

## Build & Test Commands
- `npm run dev` – start Vite dev server on `http://localhost:8080`.
- `npm run build` – produce an optimized bundle in `dist/`.
- `npm run preview` – serve the production bundle locally.
- `npm test` – execute the Vitest suite in CI mode.

## Workspace File Tree
```
.
├── index.html
├── package.json
├── src
│   ├── App.tsx
│   ├── __tests__
│   │   └── Hero.test.tsx
│   ├── components
│   │   ├── effects
│   │   │   └── CustomCursor.tsx
│   │   ├── layout
│   │   │   ├── Footer.module.css
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.module.css
│   │   │   └── Header.tsx
│   │   ├── sections
│   │   │   ├── Contact.module.css
│   │   │   ├── Contact.tsx
│   │   │   ├── Features.module.css
│   │   │   ├── Features.tsx
│   │   │   ├── Hero.module.css
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.module.css
│   │   │   └── Projects.tsx
│   │   └── ui
│   │       ├── ContactButton.module.css
│   │       ├── ContactButton.tsx
│   │       ├── FeatureCard.module.css
│   │       ├── FeatureCard.tsx
│   │       ├── ProjectCard.module.css
│   │       └── ProjectCard.tsx
│   ├── data
│   │   └── content.ts
│   ├── main.tsx
│   ├── setupTests.ts
│   ├── styles
│   │   ├── App.module.css
│   │   └── global.css
│   └── types
│       └── global.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Key Docs & References
- `CHANGELOG.md` – release history and day-to-day updates.
- `QubeTX_Design_System.md` – typography, color, and component guidance.
- `AGENTS.md` – agent workflow and collaboration rules.
