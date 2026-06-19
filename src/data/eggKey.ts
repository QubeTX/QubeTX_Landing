/**
 * The /eggsy cheatsheet — a single source of truth for both the on-page egg
 * table and the downloadable .txt dossier, so the two can never drift.
 *
 * This is the PUBLIC-facing key (no implementation/internal references). The
 * exhaustive engineering answer key lives in EASTER_EGGS.md.
 */

export type EggEntry = {
  /** Display index, zero-padded for the terminal register. */
  n: string
  name: string
  /** How to summon it. */
  trigger: string
  /** What you get. One line. */
  effect: string
}

export const EGGS: EggEntry[] = [
  {
    n: '01',
    name: 'Console signature',
    trigger: 'Open the browser dev console (F12)',
    effect: 'An ASCII cube and a SYSTEMS NOMINAL banner — with written hints toward the rest.',
  },
  {
    n: '02',
    name: 'Dot-field shockwave',
    trigger: 'Type "qubetx" anywhere (not in a text field)',
    effect: 'An elastic ripple detonates from center through the hero dot grid. Repeatable.',
  },
  {
    n: '03',
    name: 'TR-300 web report',
    trigger: 'Konami code — ↑ ↑ ↓ ↓ ← → ← → B A',
    effect: 'A full-screen CRT terminal boot-prints a live diagnostic of the site. Esc to exit.',
  },
  {
    n: '04',
    name: 'Cube de-render',
    trigger: 'Click the header cube logo 5× within 2.5s',
    effect: 'The wireframe logo un-draws, redraws with an elastic settle, and pulses the field.',
  },
]

export const EGG_KEY_FILENAME = 'qubetx-egg-key.txt'

const RULE = '='.repeat(60)

/**
 * Render the downloadable plaintext dossier from EGGS. Terminal-flavored,
 * monospace-friendly, public-safe.
 */
export function buildEggKeyText(): string {
  const lines: string[] = []
  lines.push(RULE)
  lines.push('  QUBETX  ::  EASTER EGG KEY')
  lines.push('  ' + EGGS.length + ' eggs are hidden in this build. This is the key.')
  lines.push(RULE)
  lines.push('')
  for (const egg of EGGS) {
    lines.push('[' + egg.n + ']  ' + egg.name.toUpperCase())
    lines.push('      TRIGGER   ' + egg.trigger)
    lines.push('      RESULT    ' + egg.effect)
    lines.push('')
  }
  lines.push(RULE)
  lines.push('  Every egg no-ops under prefers-reduced-motion (the console')
  lines.push('  signature and the Konami terminal still print, just unanimated).')
  lines.push('  Built by QubeTX — a department of ES Development LLC.')
  lines.push('  qubetx.com')
  lines.push(RULE)
  lines.push('')
  return lines.join('\n')
}
