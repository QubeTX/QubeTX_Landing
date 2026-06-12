import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import { CommandTable } from '@/components/terminal'
import { FieldDemo, MatrixDemo } from '../DotFieldDemo'

const ARCHITECTURE = [
  { command: 'anime.js', description: 'Owns the breathe idle loop and the entrance (scale/alpha) — plain JS dot objects, distance-function delays' },
  { command: 'wave objects', description: 'Own pulse/mix: one makeRippleWave per pointer event (~0.2ms O(dots) scan), applyRippleWaves evaluates per frame (pure, unit-tested, LUT-sampled envelopes)' },
  { command: 'canvas 2D', description: 'The blitter only — paints radius = baseR × breathe × pulse, color from the LUT ramp. Never computes' },
  { command: 'geometry', description: 'TL→BR size/alpha/color ramp; feathered left edge + bottom band; invisible dots CULLED; ≤1400 dots via pitch widening' },
  { command: 'qubetx:pulse bus', description: 'CustomEvent {x, y, strength} → field-wide ripple (radius ∞). The load beat, easter eggs, and this page’s demo button all broadcast on it' },
  { command: 'lifecycle', description: 'IO pauses offscreen; rebuilds via resizeCoordinator (waves cleared — index-aligned); reduced motion = static ramp' },
]

/** §19 — The dot field. The signature surface and its optimization model. */
export default function DotFieldSection() {
  return (
    <DsSection
      id="dot-field"
      lede="The hero's reactive dot matrix — anime.js breathing, pure-math ripples, canvas blitting. This one is live: move your pointer across it."
    >
      <DemoPanel caption="DotGrid — the production component, container-sized (pointer = local swell, button = field-wide pulse)">
        <FieldDemo />
      </DemoPanel>

      <DemoPanel caption="Architecture — one owner per channel">
        <CommandTable rows={ARCHITECTURE} headers={['Layer', 'Responsibility']} />
      </DemoPanel>

      <DemoPanel caption="MatrixDisplay — the LED word board (5×7 bitmap font, column-staggered sweeps)">
        <MatrixDemo />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Never per-event tween bursts',
            body: 'Ripples were once ~600 anime tweens per pointer event: 8ms moves, 36ms taps, dropped frames. The wave-object model cut that to 0.2ms with identical visuals. Measured, documented, never going back.',
          },
          {
            title: 'Channels never fight',
            body: 'breathe (anime) multiplies with pulse (waves) at paint time — the channels compose in the blitter, so the idle loop and ripples coexist without ownership conflicts.',
          },
          {
            title: 'Delays are distance functions',
            body: 'All choreography delays derive from distance to an origin — radially correct, and safe under culling (no reliance on a complete lattice).',
          },
          {
            title: 'The bus, not the internals',
            body: (
              <>
                External features trigger ripples via <code>firePulse()</code> /{' '}
                <code>qubetx:pulse</code> — never by importing DotGrid&apos;s internals.
              </>
            ),
          },
          {
            title: 'Budget: ≤2.3ms rippling',
            body: 'Frame budget at ship: ~1ms idle, ≤2.3ms while rippling, 0 offscreen; sweep p95 17.5ms at 2× ripple density. New work on the field must re-verify these numbers.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — mounting a field + firing the bus"
        lang="tsx"
        code={`// Container-sized field (position the wrapper; the grid fills it):
<div className={styles.stage}>
  <DotGrid className={styles.field} entrance={false} />
</div>

// Anything can ripple the field through the bus:
import { firePulse } from '@/components/effects/DotGrid'
firePulse({ x: innerWidth / 2, y: innerHeight / 2, strength: 1.6 })`}
      />

      <AgentNote
        checklist={[
          'Kit ships DotGrid + dotGridGeometry (pure, tested) + colorRamp + MatrixDisplay + dotFont',
          'New boards follow the model: anime/pure-math animates plain objects, canvas only blits',
          'High-frequency interaction → wave objects / scratch math, NEVER anime instance creation in the handler',
          'Canvas boards rebuild only via resizeCoordinator — CSS-only HMR keeps stale dimensions (hard-reload before judging visual bugs in dev)',
          'Verify field changes with timed getImageData probes in a real browser — jsdom cannot exercise canvas',
        ]}
      >
        The field is the system&apos;s signature and its performance conscience. Its model
        (plain-object animation + pure-math high-frequency channels + dumb blitter) is the
        template for ANY canvas surface a future project needs — dashboards, visualizers, boards.
        Start from <code>dotGridGeometry.ts</code> and keep the math pure and unit-tested.
      </AgentNote>
    </DsSection>
  )
}
