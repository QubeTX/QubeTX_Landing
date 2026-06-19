# QubeTX Easter Egg Key 🥚

The landing page ships with themed easter eggs — all diagnostics/terminal/cube
flavored, all implemented in `src/components/effects/easter-eggs/`. This file
is the answer key.

| # | Egg | Trigger / key binding | What happens |
|---|-----|----------------------|--------------|
| 1 | **Console signature** | Open the browser dev console (F12) | ASCII cube, `QUBETX // SYSTEMS NOMINAL`, a recruiting line, and written hints for eggs 2–4. Prints once per session. |
| 2 | **Dot-field shockwave** | Type `qubetx` anywhere on the page (not in an input) | A strength-2.5 elastic ripple detonates from the viewport center through the hero dot grid (`qubetx:pulse` event bus). Repeatable. |
| 3 | **TR-300 WEB REPORT** | Konami code: `↑ ↑ ↓ ↓ ← → ← → B A` | Full-screen CRT terminal boot-prints a machine-report-style diagnostic of the site itself (framework, render mode, your cores/viewport/pointer, uptime), ends `ALL SYSTEMS NOMINAL` and links to reports.qubetx.com. **Exit:** `Esc` or the `[esc] exit` button (CRT power-off collapse). Scroll locks while open. |
| 4 | **Cube de-render** | Click the header cube logo **5× within 2.5 s** | The wireframe logo un-draws its strokes, then redraws itself with an elastic settle and fires a dot-field pulse at its own position. |

## The key page (`/eggsy`)

A hidden, unlinked route — `/eggsy` — serves a public-facing version of this
key: a no-scroll terminal "dossier" with a Quiver-generated cube-egg
centerpiece and a one-click download of `qubetx-egg-key.txt`. The page table
and the downloadable file are both generated from `src/data/eggKey.ts` (the
public cheatsheet; this file remains the exhaustive engineering answer key).

## Discoverability breadcrumbs (intentional)

- The **footer bottom-right glyph** `↑↑↓↓←→←→BA` sits at 40% opacity and
  brightens on hover — the only on-page hint for the Konami code.
- The **console signature** spells out hints for eggs 2–4.

## Behavior notes

- All eggs no-op under `prefers-reduced-motion` except the console signature
  (and the Konami terminal still opens — it prints instantly, unanimated).
- Key sequences ignore keystrokes inside inputs/textareas/contentEditable.
- The Konami terminal is code-split (`next/dynamic`) — it costs nothing until
  summoned.
- Egg #2 and #4 reuse the `qubetx:pulse` CustomEvent bus that the load
  sequence also uses (`firePulse` in `src/components/effects/DotGrid.tsx`).
