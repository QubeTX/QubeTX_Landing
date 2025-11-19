# QubeTX Landing – Project Overview

## TL;DR
- Next.js 16 App Router site that statically exports to `out/` for GitHub Pages.
- React 19 + TypeScript UI composed from `src/components` and rendered via `app/page.tsx`.
- Hero/Features/Process/TechStack/Projects/Contact sections draw content from `src/data/content.ts`.
- Custom background motion uses `@react-three/fiber` + Three.js via `DotMatrix`.
- ESLint (React + TS rules) is the primary quality gate; no automated tests yet.
- Fresh `.gitignore` keeps `.next/`, `node_modules/`, `dist/`, and `out/` out of commits so GitHub pushes no longer choke on 100MB binaries.

## Current Status
The landing page now runs on Next.js with the App Router. Global layout lives under `app/` (`layout.tsx` wires fonts/meta, `page.tsx` composes all sections). Presentation logic remains modularized inside `src/components` (`layout`, `sections`, `ui`, `effects`). Content constants in `src/data/content.ts` keep copy centralized for easy future swaps. Background animation blends Lenis smooth scrolling with a Three.js instanced mesh grid (`DotMatrix`) to create the brand's neon field; effects are only mounted client-side via `use client`. Static assets sit in `public/` and are referenced directly. `next.config.mjs` forces `output: 'export'` plus `turbopack.root` so local dev doesn't jump up to unintended parent lockfiles.

## Build & Test Commands
- `npm run dev` – Next dev server on http://localhost:3000 using Turbopack.
- `npm run build` – Generates the static export under `out/`.
- `npm run start` – Serves the pre-built output locally (Node server).
- `npm run lint` – ESLint with React + TypeScript rules; run after edits (no Vitest suite yet).

## Workspace File Tree
```
.
├── AGENTS.md
├── CHANGELOG.md
├── CODEX_PROJECT.md
├── README.md
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── dorsey.png
│   ├── gvalley.png
│   ├── logoQUBETX.png
│   ├── logoQUBETX_horizontal.png
│   ├── magz.png
│   └── qubeTXFavicon.png
├── src
│   ├── components
│   │   ├── effects
│   │   │   └── DotMatrix.tsx
│   │   ├── layout
│   │   ├── sections
│   │   └── ui
│   ├── data
│   │   └── content.ts
│   ├── r3f.d.ts
│   └── types
│       └── global.d.ts
└── tsconfig.json
```

## Key Docs & References
- `QubeTX_Design_System.md` – typography, gradients, and motion guardrails.
- `AGENTS.md` – collaboration/process expectations.
- `CHANGELOG.md` – release notes + daily changes (keep current).
- `CODEX_PROJECT.md` – this overview + workspace tree (update when structure shifts).
