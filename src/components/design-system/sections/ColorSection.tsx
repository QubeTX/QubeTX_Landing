import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import { SwatchTable } from '../Swatch'

const SURFACES = [
  { token: '--color-void', value: '#05070f', use: 'Page / hero / header / cell background — the void everything sits on' },
  { token: '--color-background', value: '#0a0f1c', use: 'Alt background (legacy alias --dark-bg)' },
  { token: '--color-surface', value: '#0d1117', use: 'Cards, terminal chrome, panels (alias --card-bg)' },
  { token: '--color-surface-raised', value: '#111827', use: 'Hovered cells, dropdown panel' },
  { token: '--color-border', value: '#1a2236', use: '1px hairlines, grid-cell gaps, pills' },
  { token: '--color-border-bright', value: '#2c3a5c', use: 'Hovered borders, code chips, wordmark stroke' },
]

const ACCENTS = [
  { token: '--primary-blue', value: '#0066FF', use: 'THE accent: eyebrows, active nav, focus ring, status ACTIVE (alias --color-primary)' },
  {
    token: '--color-arrival',
    value: '#3385ff',
    use: 'Slot-roll arrival flash, accent terminal lines',
    note: '≈5.7:1 AA on void — exists because #0066FF is only ~4.3:1 as text',
  },
  {
    token: '--gradient-brand',
    value: '#2563eb → #7c3aed',
    use: 'Headline line 3, stat numerals, progress bar, hairline rules',
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
  },
  { token: '--glow-blue', value: 'rgba(37,99,235,.25)', use: 'Button hover glow shadows', background: 'rgba(37, 99, 235, 0.25)' },
]

const TEXT = [
  { token: '--text-primary', value: '#ffffff', use: 'Primary text' },
  { token: '--text-secondary', value: '#94a3b8', use: 'Body copy, descriptions' },
  {
    token: '--color-text-dim',
    value: '#76869f',
    use: 'Mono labels, metadata, corner text',
    note: 'tuned to ≥4.5:1 AA on void — never darken it',
  },
]

const STATUS = [
  { token: 'status green', value: '#22c55e', use: '[OK] flashes, STABLE chips (hardcoded at use sites)', background: '#22c55e' },
  { token: 'stripe alt', value: '#070a14', use: 'Alternating product-row background (hardcoded in row modules)', background: '#070a14' },
]

/** §04 — Color. The deep-void palette, annotated with its constraints. */
export default function ColorSection() {
  return (
    <DsSection
      id="color"
      lede="A deep-void navy field, one electric blue, and a blue-to-violet gradient. Hover any row — token names decode, because even a palette table gets the terminal treatment."
    >
      <DemoPanel caption="Surfaces & structure">
        <SwatchTable specs={SURFACES} />
      </DemoPanel>

      <DemoPanel caption="Accent & gradient">
        <SwatchTable specs={ACCENTS} />
      </DemoPanel>

      <DemoPanel caption="Text inks">
        <SwatchTable specs={TEXT} />
      </DemoPanel>

      <DemoPanel caption="Status & stripes">
        <SwatchTable specs={STATUS} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Tokens, never hex',
            body: 'Component CSS references custom properties exclusively. The only hex values in the codebase live in the token blocks of globals.css (and the two documented hardcoded exceptions above).',
          },
          {
            title: 'The dim ink is load-bearing',
            body: (
              <>
                <code>--color-text-dim</code> sits exactly at AA on the void. Darkening it for
                taste breaks the accessibility floor; brightening it breaks the hierarchy.
              </>
            ),
          },
          {
            title: 'Arrival is transient',
            body: (
              <>
                <code>--color-arrival</code> exists for moments — slot-roll flashes, accent
                terminal lines. It never persists as a resting text color; resting accents use{' '}
                <code>--primary-blue</code> on non-text or large text only.
              </>
            ),
          },
          {
            title: 'The gradient is earned',
            body: 'One gradient, used sparingly: the third headline line, stat numerals, the progress bar. A surface full of gradients is off-register.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — consuming the palette in a new project"
        lang="css"
        code={`/* Copy the :root token block from the kit's tokens/qubetx-tokens.css,
   then write component CSS against the tokens only: */
.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--text-secondary);
}
.panel:hover { border-color: var(--color-border-bright); }`}
      />

      <AgentNote
        checklist={[
          'Day one: paste the kit token block into app/globals.css before writing any component CSS',
          'Verify text contrast against --color-void, not black — the void is #05070f',
          'New status colors require a contrast check AND a row in this table — no drive-by hex',
          'Transient color (flashes, arrivals) settles to ink within ~300ms; nothing flashes and stays',
        ]}
      >
        The palette is intentionally small: six surfaces, one accent, one arrival tint, one
        gradient, three inks. When a design feels like it needs a new color, it almost always
        needs a different <strong>surface or ink from this table</strong>. Extend the palette only
        with a documented token + contrast annotation, and update DESIGN_SYSTEM.md in the same
        change.
      </AgentNote>
    </DsSection>
  )
}
