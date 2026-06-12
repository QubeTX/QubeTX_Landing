/**
 * Kit manifest — everything the downloadable design-system zip contains,
 * relative to the repo root. scripts/build-kit.mjs consumes this; the
 * vitest manifest test asserts every entry exists (renames fail loudly).
 *
 * `dirs` are copied recursively; `files` map repo path → in-zip path.
 */

export const KIT_DIRS = [
  { from: 'src/lib/motion', to: 'src/lib/motion' },
  { from: 'src/lib/pretext', to: 'src/lib/pretext' },
  { from: 'src/lib/designSystem', to: 'src/lib/designSystem' },
  { from: 'src/hooks', to: 'src/hooks' },
  { from: 'src/fonts', to: 'src/fonts' },
  { from: 'src/components/ui', to: 'src/components/ui' },
  { from: 'src/components/terminal', to: 'src/components/terminal' },
  { from: 'src/test', to: 'src/test' },
]

export const KIT_FILES = [
  // The technical-register status line (layout/ ships only this)
  { from: 'src/components/layout/SysStatus.tsx', to: 'src/components/layout/SysStatus.tsx' },
  { from: 'src/components/layout/SysStatus.module.css', to: 'src/components/layout/SysStatus.module.css' },
  { from: 'src/components/layout/SysStatus.test.tsx', to: 'src/components/layout/SysStatus.test.tsx' },
  // Core effects (reference implementations; WallpaperMatrix stays site-specific)
  { from: 'src/components/effects/DotGrid.tsx', to: 'src/components/effects/DotGrid.tsx' },
  // ScrollTrace — OPTIONAL expressive decoration (scroll-scrubbed circuit trace);
  // ship it so agents can adapt the pattern per surface, never as a mandate
  { from: 'src/components/effects/ScrollTrace.tsx', to: 'src/components/effects/ScrollTrace.tsx' },
  { from: 'src/components/effects/DotGrid.test.tsx', to: 'src/components/effects/DotGrid.test.tsx' },
  { from: 'src/components/effects/MatrixDisplay.tsx', to: 'src/components/effects/MatrixDisplay.tsx' },
  { from: 'src/components/effects/CustomCursor.tsx', to: 'src/components/effects/CustomCursor.tsx' },
  { from: 'src/components/effects/CustomCursor.module.css', to: 'src/components/effects/CustomCursor.module.css' },
  { from: 'src/components/effects/cursorEngine.ts', to: 'src/components/effects/cursorEngine.ts' },
  { from: 'src/components/effects/cursorEngine.test.ts', to: 'src/components/effects/cursorEngine.test.ts' },
  { from: 'src/components/effects/SmoothScroll.tsx', to: 'src/components/effects/SmoothScroll.tsx' },
  { from: 'src/components/effects/ScrollProgress.tsx', to: 'src/components/effects/ScrollProgress.tsx' },
  { from: 'src/components/effects/BootScreen.tsx', to: 'src/components/effects/BootScreen.tsx' },
  { from: 'src/components/effects/BootScreen.module.css', to: 'src/components/effects/BootScreen.module.css' },
  { from: 'src/components/effects/BootScreen.test.tsx', to: 'src/components/effects/BootScreen.test.tsx' },
  { from: 'src/components/effects/LoadSequence.tsx', to: 'src/components/effects/LoadSequence.tsx' },
  { from: 'src/components/effects/LoadSequence.test.tsx', to: 'src/components/effects/LoadSequence.test.tsx' },
  // The spec of record + the agent docs
  { from: 'DESIGN_SYSTEM.md', to: 'DESIGN_SYSTEM.md' },
  { from: 'BOOT_SCREEN.md', to: 'BOOT_SCREEN.md' },
  { from: 'kit/README.md', to: 'README.md' },
  { from: 'kit/SKILL.md', to: 'SKILL.md' },
  { from: 'kit/MOTION_GUIDE.md', to: 'MOTION_GUIDE.md' },
]

/** Dependencies a consuming project installs (versions filled from package.json). */
export const KIT_DEPENDENCIES = [
  'animejs',
  'framer-motion',
  'lenis',
  'clsx',
  'lucide-react',
  '@chenglou/pretext',
]

export const KIT_DEV_DEPENDENCIES = [
  'vitest',
  '@vitejs/plugin-react',
  'jsdom',
  '@testing-library/react',
  '@testing-library/jest-dom',
]
