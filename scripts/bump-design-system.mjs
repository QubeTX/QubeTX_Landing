/**
 * Bumps the design-system version and rebuilds the kit zip in one move:
 *
 *   npm run bump:ds              →  patch bump (3.2.0 → 3.2.1)
 *   npm run bump:ds -- --set 3.3.0  →  explicit version (minor/major releases)
 *
 * Updates package.json `version` + DS_VERSION/DS_DATE in
 * src/data/designSystem.ts (the lockstep the unit tests enforce), then runs
 * scripts/build-kit.mjs so public/qubetx-design-system.zip matches. The
 * pre-commit hook (.githooks/pre-commit) calls this automatically the first
 * time a branch commits a design-system change; run it manually only for a
 * deliberate minor/major bump.
 */

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkgPath = path.join(root, 'package.json')
const dsPath = path.join(root, 'src', 'data', 'designSystem.ts')

const setIdx = process.argv.indexOf('--set')
const explicit = setIdx !== -1 ? process.argv[setIdx + 1] : null
if (setIdx !== -1 && !/^\d+\.\d+\.\d+$/.test(explicit ?? '')) {
  console.error('[bump:ds] --set requires a semver argument, e.g. --set 3.3.0')
  process.exit(1)
}

const pkgRaw = readFileSync(pkgPath, 'utf8')
const current = JSON.parse(pkgRaw).version
const next =
  explicit ??
  current.replace(/^(\d+)\.(\d+)\.(\d+)$/, (_, ma, mi, pa) => `${ma}.${mi}.${Number(pa) + 1}`)
if (next === current) {
  console.log(`[bump:ds] already at v${current} — rebuilding the kit only`)
} else {
  writeFileSync(pkgPath, pkgRaw.replace(/("version":\s*")[^"]+(")/, `$1${next}$2`))

  const dsDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const dsRaw = readFileSync(dsPath, 'utf8')
  writeFileSync(
    dsPath,
    dsRaw
      .replace(/DS_VERSION = '[^']+'/, `DS_VERSION = '${next}'`)
      .replace(/DS_DATE = '[^']+'/, `DS_DATE = '${dsDate}'`)
  )
  console.log(`[bump:ds] v${current} → v${next} (package.json + DS_VERSION/DS_DATE)`)
}

execFileSync(process.execPath, [path.join(root, 'scripts', 'build-kit.mjs')], {
  stdio: 'inherit',
  cwd: root,
})
