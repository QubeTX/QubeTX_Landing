# Repository Guidelines

## Project Structure & Module Organization
- Next.js 16 App Router drives the site. `app/layout.tsx` defines global HTML/head/fonts and `app/page.tsx` assembles every visible section.
- Presentational code still lives in `src/components` (`layout`, `sections`, `ui`, `effects`). Import via the `@/*` alias set in `tsconfig.json`.
- Copy lives in `src/data/content.ts` and is passed into sections for predictable reuse.
- Three.js / R3F helpers are typed via `src/r3f.d.ts`; keep effect-specific code under `src/components/effects`.
- Static assets belong in `public/`. The static export produced by `next build` lands in `out/` and mirrors what gets deployed.

## Build, Test, and Development Commands
- `npm run dev` – Starts the Next dev server on http://localhost:3000 using Turbopack/HMR.
- `npm run build` – Generates the production export into `out/`; required before deployments.
- `npm run start` – Runs the production server against the artefacts from `npm run build`.
- `npm run lint` – ESLint (React + TypeScript rules); run alongside builds.
- `npm test` – Vitest suite (65 tests, 12 files); run before submitting PRs.
- `npm run test:watch` – Vitest in watch mode for active development.

## Coding Style & Naming Conventions
- Use TypeScript everywhere. Default exports for components, PascalCase filenames (`Hero.tsx`, `DotMatrix.tsx`), camelCase hooks/utilities.
- Stick with single quotes in TS/JS, 2-space indentation, and CSS Modules for scoped styles (imported as `styles` in components).
- Client components need `'use client';` at the top. Server-only modules go in `app/` or dedicated helpers—keep effects isolated in client files.
- Keep Lenis/Framer hooks inside `use client` modules, and respect reduced-motion checks when adding new animations.

## Testing Guidelines
- The project uses Vitest with React Testing Library (65 tests across 12 files).
- Test files are colocated with their components (e.g. `Header.test.tsx` lives alongside `Header.tsx`); data tests live in `src/data/`.
- Run `npm test` before opening a PR; `npm run test:watch` during active development.
- Treat `npm run lint` + `npm run build` + `npm test` as the full pre-PR verification combo.

## Commit & Pull Request Guidelines
- Prefer Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) with concise summaries.
- Scope each change to a single concern. Include screenshots/GIFs for UI-affecting PRs.
- Always run `npm run lint` and `npm run build` locally before committing or opening a PR so reviewers inherit a clean state.
