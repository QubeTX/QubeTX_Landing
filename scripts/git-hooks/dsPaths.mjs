/**
 * What counts as "the design system changed" for the git hooks: everything
 * the kit zip is built from (derived live from kit/manifest.mjs so the two
 * can never drift) plus the /design-system page itself, the token source,
 * and the kit build machinery. Paths are repo-relative, forward-slash
 * (matching git's output).
 */

import { KIT_DIRS, KIT_FILES } from '../../kit/manifest.mjs'

const PREFIXES = [
  ...KIT_DIRS.map((d) => `${d.from}/`),
  'app/design-system/',
  'src/components/design-system/',
  'kit/',
]

const FILES = new Set([
  ...KIT_FILES.map((f) => f.from),
  'src/data/designSystem.ts',
  'app/globals.css', // the @kit-tokens block is sliced into the zip
  'scripts/build-kit.mjs',
])

export function isDsPath(file) {
  return FILES.has(file) || PREFIXES.some((p) => file.startsWith(p))
}
