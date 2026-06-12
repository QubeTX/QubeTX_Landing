import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import { CommandTable } from '@/components/terminal'
import styles from './Signature.module.css'

const MARKS = [
  { command: 'The cube', description: 'Stroke-only isometric SVG (viewBox 0 0 218 233), drawable paths — the mark un-draws and redraws for brand moments' },
  { command: 'The wordmark', description: 'QUBETX in Makira Black — solid in chrome, stroke-outlined (--color-border-bright) when oversized (the footer treatment)' },
  { command: 'Corner metadata', description: 'Mono micro-text pinned to surface corners: build ids, node ids, versions — the machine-report frame' },
  { command: 'The void stack', description: 'Solid #05070f → static 28px dot texture → corner glow → ScrollTrace → content. Deliberately static behind the live field' },
  { command: 'The gradient rule', description: 'A 1px blue→violet hairline under headings — drawn on entry, never animated again' },
]

/** §02 — The signature. The marks that say QubeTX without words. */
export default function Signature() {
  return (
    <DsSection
      id="signature"
      lede="A stroke-drawn cube, a heavyweight wordmark, mono metadata in the corners, and a deep-void field with exactly one gradient. The signature is geometric, wireframed, and quiet — drawn, never filled."
    >
      <DemoPanel caption="The cube + the wordmark" center>
        <div className={styles.lockup}>
          <QubeTXLogo className={styles.cube} />
          <span className={styles.wordmark}>QubeTX</span>
        </div>
        <span className={styles.outlined} aria-hidden="true">
          QUBETX
        </span>
      </DemoPanel>

      <DemoPanel caption="The marks">
        <CommandTable rows={MARKS} headers={['Mark', 'Treatment']} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Drawn, never filled',
            body: 'The cube is strokes (createDrawable-compatible). No fills, no solid variants, no drop shadows. Recolor through currentColor only.',
          },
          {
            title: 'The wordmark carries weight',
            body: 'Makira Black, uppercase via CSS, tight tracking. Oversized usage switches to the stroke outline so scale adds structure, not shouting.',
          },
          {
            title: 'Corners hold the metadata',
            body: 'Version strings, node ids, build info live in corner-pinned mono micro-text — the frame that makes any surface read as an instrument.',
          },
          {
            title: 'One signature moment per surface',
            body: 'The boot screen, the logo redraw, the dot field’s load beat — brand theater happens once per surface, at arrival. (Some sequences are not documented here; the old codes still work.)',
          },
        ]}
      />

      <AgentNote
        checklist={[
          'QubeTXLogo ships in the kit; size via CSS width/height at the 218:233 ratio',
          'Wordmark: text + CSS, never an image — Makira Black with text-transform',
          'Corner metadata: --text-mono-label spec at ~0.6rem, --color-text-dim, aria-hidden',
          'Brand moments (redraws, boots, pulses) are one-shot and gated by reduced motion',
        ]}
      >
        The signature survives being quiet — that&apos;s the test for any new branded surface. If
        removing a mark makes the page feel generic, the mark was working; if removing it changes
        nothing, it was clutter. Start new surfaces with the void stack + corner metadata and add
        marks only until the page signs itself.
      </AgentNote>
    </DsSection>
  )
}
