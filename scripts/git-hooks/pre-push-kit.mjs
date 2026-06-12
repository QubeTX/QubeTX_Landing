/**
 * pre-push: the backstop behind the pre-commit hook (which a --no-verify
 * commit can skip). For every ref being pushed, if the outgoing range
 * touches design-system territory (dsPaths.mjs) it must ALSO carry a
 * version bump and a rebuilt kit zip — otherwise the push is blocked with
 * instructions. Never modifies anything; fail-open on unknowable states
 * (new branch with no origin/main, deleted refs).
 *
 * stdin (from git): "<local ref> <local sha> <remote ref> <remote sha>" per ref.
 */

import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDsPath } from './dsPaths.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', cwd: root }).trim()
const ZEROS = /^0+$/
const ZIP = 'public/qubetx-design-system.zip'

const lines = (await new Promise((resolve) => {
  let buf = ''
  process.stdin.on('data', (d) => (buf += d))
  process.stdin.on('end', () => resolve(buf))
  process.stdin.resume()
}))
  .split(/\r?\n/)
  .filter(Boolean)

for (const line of lines) {
  const [, localSha, , remoteSha] = line.trim().split(/\s+/)
  if (!localSha || ZEROS.test(localSha)) continue // ref delete — nothing outgoing

  // Base of the outgoing range: the remote's tip, or (new branch) the
  // merge-base with origin/main. If neither resolves, fail open.
  let base = null
  if (remoteSha && !ZEROS.test(remoteSha)) {
    base = remoteSha
  } else {
    try {
      base = git('merge-base', localSha, 'origin/main')
    } catch {
      continue
    }
  }

  let changed
  try {
    changed = git('diff', '--name-only', `${base}..${localSha}`).split('\n').filter(Boolean)
  } catch {
    continue // base not present locally (e.g. stale remote ref) — fail open
  }
  const dsChanges = changed.filter(isDsPath)
  if (dsChanges.length === 0) continue

  const versionAt = (sha) => JSON.parse(git('show', `${sha}:package.json`)).version
  const bumped = versionAt(base) !== versionAt(localSha)
  const zipRebuilt = changed.includes(ZIP)

  if (!bumped || !zipRebuilt) {
    console.error(
      `[kit-hook] PUSH BLOCKED — this range changes the design system (${dsChanges.length} file${dsChanges.length === 1 ? '' : 's'})` +
        `${bumped ? '' : ' without a version bump'}${!bumped && !zipRebuilt ? ' and' : ''}${zipRebuilt ? '' : ' without a rebuilt kit zip'}.\n` +
        `[kit-hook] Fix: npm run bump:ds   (or let the pre-commit hook do it — was it skipped with --no-verify?)\n` +
        `[kit-hook] then: git add package.json src/data/designSystem.ts ${ZIP} && git commit, and push again.`
    )
    process.exit(1)
  }
}

process.exit(0)
