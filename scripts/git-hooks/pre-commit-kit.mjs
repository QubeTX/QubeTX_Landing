/**
 * pre-commit: when a commit touches design-system territory (see
 * dsPaths.mjs), force the kit to ride along —
 *
 *   1. If this branch hasn't bumped the version yet (vs the merge-base with
 *      origin/main), patch-bump it (scripts/bump-design-system.mjs). One
 *      bump per branch: later commits only refresh the zip. Deliberate
 *      minor/major bumps (`npm run bump:ds -- --set x.y.0`) are detected as
 *      "already bumped" and left alone.
 *   2. Rebuild public/qubetx-design-system.zip from the working tree.
 *   3. Stage package.json + designSystem.ts + the zip into THIS commit.
 *
 * The build failing fails the commit — that is the point. Note the zip is
 * built from the WORKING TREE, so partial staging of design-system files
 * will bake unstaged content into the zip; commit whole changes.
 * Override knob: KIT_HOOK_BASE_REF (default origin/main) for testing.
 */

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDsPath } from './dsPaths.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', cwd: root }).trim()

const staged = git('diff', '--cached', '--name-only').split('\n').filter(Boolean)
const dsChanges = staged.filter(isDsPath)
if (dsChanges.length === 0) process.exit(0)

console.log(`[kit-hook] design-system change detected (${dsChanges.length} file${dsChanges.length === 1 ? '' : 's'})`)

// Bump once per branch: compare the working version against the merge-base.
const baseRef = process.env.KIT_HOOK_BASE_REF || 'origin/main'
let baseVersion = null
try {
  const base = git('merge-base', 'HEAD', baseRef)
  baseVersion = JSON.parse(git('show', `${base}:package.json`)).version
} catch {
  // No origin/main (fresh clone/initial commit) — skip the bump, still rebuild.
}
const current = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')).version

const run = (script) =>
  execFileSync(process.execPath, [path.join(root, 'scripts', script)], { stdio: 'inherit', cwd: root })

if (baseVersion && baseVersion === current) {
  run('bump-design-system.mjs') // bumps AND rebuilds
} else {
  if (baseVersion) console.log(`[kit-hook] version already bumped on this branch (${baseVersion} → ${current}) — rebuilding the kit only`)
  run('build-kit.mjs')
}

git('add', 'package.json', 'src/data/designSystem.ts', 'public/qubetx-design-system.zip')
console.log('[kit-hook] staged: package.json · designSystem.ts · qubetx-design-system.zip')
