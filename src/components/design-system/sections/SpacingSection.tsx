import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import SpaceScale from '../SpaceScale'
import { CommandTable } from '@/components/terminal'

const LADDER = [
  { token: '--space-xs', px: 8 },
  { token: '--space-sm', px: 16 },
  { token: '--space-md', px: 24 },
  { token: '--space-lg', px: 32 },
  { token: '--space-xl', px: 48 },
  { token: '--space-2xl', px: 64 },
  { token: '--space-3xl', px: 96 },
]

const STRUCTURE = [
  { command: '--grid-unit', description: '8px — the base everything multiplies from' },
  { command: '--container-max', description: '1440px; widens to 1800px at ≥2560px (the TV tier — sections, the cqw headline, and the trace gutter all derive from it)' },
  { command: '--container-padding-x', description: 'clamp(16px, 4vw, 32px) — horizontal page padding' },
  { command: '--section-spacing', description: 'clamp(48px, 10vw, 96px) — vertical rhythm between sections' },
  { command: '--touch-target-min', description: '44px minimums — enforced ONLY under @media (pointer: coarse); fine pointers use padding-based hit areas' },
  { command: 'radius scale', description: '2px chips · 4px pills/bars · 6px panels/buttons · 999px tab pills — subtle, never rounded-friendly' },
]

/** §06 — Spacing & structure. The 8px ladder and the frames around it. */
export default function SpacingSection() {
  return (
    <DsSection
      id="spacing"
      lede="An 8px grid, clamp()-based rhythm, and one container token everything hangs from. The width of each bar below is the literal value."
    >
      <DemoPanel caption="The ladder — width is the value">
        <SpaceScale steps={LADDER} />
      </DemoPanel>

      <DemoPanel caption="Structural tokens">
        <CommandTable rows={STRUCTURE} headers={['Token', 'Value / law']} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Multiples of 8, clamps for rhythm',
            body: 'Fixed gaps come off the ladder; page-level rhythm (section spacing, paddings) uses clamp() so small screens compress and TVs breathe — no breakpoint soup.',
          },
          {
            title: 'One container token',
            body: (
              <>
                Every section caps at <code>--container-max</code>. The TV tier works because
                NOTHING hardcodes 1440 — change the token, the whole site re-fits.
              </>
            ),
          },
          {
            title: 'Touch targets are conditional',
            body: 'The 44px minimum applies under coarse pointers only. Desktop keeps tighter, padding-defined hit areas — density is a feature of the register.',
          },
          {
            title: 'Hairlines define structure',
            body: '1px borders in --color-border do the work shadows would do elsewhere. Elevation by surface color change, not blur.',
          },
        ]}
      />

      <AgentNote
        checklist={[
          'Copy the spacing + structure token block with the palette on day one',
          'New page sections: pad with --section-spacing, cap with --container-max',
          'Check any interactive element under @media (pointer: coarse) for the 44px floor',
          'No ResizeObserver for layout reactions — media queries and clamp() carry responsive structure',
        ]}
      >
        Spacing failures here are usually <strong>invented values</strong>: a 14px gap, a 1500px
        container. If a layout needs a value off the ladder, the layout is fighting the grid —
        restructure instead. The 8px discipline is what makes mixed surfaces (editorial cards
        beside terminal frames) read as one system.
      </AgentNote>
    </DsSection>
  )
}
