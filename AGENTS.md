# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with `main.jsx` bootstrapping `App.jsx`. UI code is partitioned into `components/` (`layout`, `sections`, `ui`, `effects`) and scoped styles reside in `styles/` as CSS Modules (`*.module.css`). Static assets for production builds are kept in `public/`, while the compiled output in `dist/` mirrors GitHub Pages deployments. Design references and architectural notes live alongside the root docs (`README.md`, `QubeTX_Design_System.md`).

## Build, Test, and Development Commands
Run `npm install` once to sync dependencies. Use `npm run dev` for the Vite dev server on `http://localhost:8080` (HMR tunnels through port 443). Execute `npm run build` to generate an optimized bundle under `dist/`, and `npm run preview` to serve that bundle locally on `http://localhost:8081`. Run the automated test suite with `npm test` (non-watch mode) or `npm run test:watch` to stay in Vitest's watcher—press `Ctrl+C` to exit.

## Coding Style & Naming Conventions
Author React components in JSX with PascalCase filenames (`Hero.jsx`) and default exports. Hooks, helpers, and event handlers stay camelCase. Keep indentation at two spaces; stick with single quotes in JavaScript as seen in the existing codebase. Co-locate component styles as CSS Modules and expose class names through the imported `styles` object. Prefix branches with the work type (e.g., `feature/`, `fix/`), matching deployment automation.

## Testing Guidelines
Vitest with Testing Library lives under `src/__tests__/`. New specs should assert user-facing behavior, import render helpers from `@testing-library/react`, and share utilities through `src/setupTests.js`. Use `npm test` to perform a one-off CI-style run (equivalent to `vitest run`) and avoid the watch prompt. For exploratory work, `npm run test:watch` starts the watcher; end the session with `Ctrl+C` or by pressing `q` when prompted. Always follow with `npm run build` to confirm the bundle succeeds.

## Commit & Pull Request Guidelines
Prefer Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) as reflected in history. Each change should focus on a single concern with descriptive bodies explaining context and verification. Pull requests must link the relevant issue, summarize UI changes with before/after screenshots, and confirm both `npm run build` and the Vitest suite pass before requesting review.
