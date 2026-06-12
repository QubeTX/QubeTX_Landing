/**
 * `prepare` script: point git at the checked-in .githooks directory so the
 * design-system kit guard runs for every clone. Silently a no-op where
 * there is no git checkout (CI tarballs, Vercel builds).
 */

import { execFileSync } from 'node:child_process'

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { stdio: 'ignore' })
} catch {
  // not a git checkout — fine
}
