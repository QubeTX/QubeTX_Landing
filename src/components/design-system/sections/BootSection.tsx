import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import { TerminalFrame, CommandTable } from '@/components/terminal'

const LIFECYCLE_LINES = [
  { text: 'PRE-PAINT  html[data-boot] armed by the layout inline script' },
  { text: '           home route only · first session visit only · never under reduced motion' },
  { text: 'PAINT      overlay is server HTML — cursor blink, dot pulse, first log line are pure CSS' },
  { text: 'HYDRATION  log stream + slot-roll odometer begin; the 5s minimum clock starts HERE' },
  { text: 'READY      max(5s, fonts.ready, window load) → double-rAF painted-frame confirmation' },
  { text: '           progress parks at 99% + AWAITING RENDERER SYNC if readiness outlasts the hold' },
  { text: 'HANDOFF    sessionStorage flag set · data-boot lifted · qubetx:boot-complete fires', accent: true },
  { text: '           LoadSequence plays the hero entrance BEHIND the 700ms fade' },
  { text: 'FAILSAFES  no-JS never arms · inline script force-lifts after 10s', accent: true },
]

const SEQUENCE = [
  { command: '1 · header', description: 'y/opacity rise, stagger 60ms (data-load="header")' },
  { command: '2 · eyebrow', description: 'Pill rises + label scramble-decodes' },
  { command: '3 · headline', description: 'Masked line rises, stagger 90ms' },
  { command: '4 · gradient', description: 'Line-3 background-position sweep' },
  { command: '5 · description → CTAs → company', description: 'Staggered rises (data-load groups)' },
  { command: '6 · the beat', description: 'qubetx:pulse fired bottom-right — the dot field answers' },
]

/** §22 — Boot & load. The first-load choreography and its contracts. */
export default function BootSection() {
  return (
    <DsSection
      id="boot"
      lede="First visits boot. The SYSTEM_INITIALIZER overlay covers hydration and font-load jank behind a terminal sequence whose completion is real readiness, not a timer — then hands off to the entrance mid-fade. The frame below documents the lifecycle in its own language."
    >
      <DemoPanel caption="The lifecycle — boot-printed (this frame uses the boot screen's own render language)">
        <TerminalFrame title="BOOT // Lifecycle contract" meta="BOOT_SCREEN.md" lines={LIFECYCLE_LINES} />
      </DemoPanel>

      <DemoPanel caption="LoadSequence — the entrance order (one anime timeline owns it all)">
        <CommandTable rows={SEQUENCE} headers={['Step', 'What plays']} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Completion is readiness',
            body: 'The boot ends at max(minimum hold, fonts loaded, window load) plus a double-rAF painted-frame check. Slow networks extend it automatically; the progress bar parks at 99% and says why.',
          },
          {
            title: 'Armed pre-paint, or not at all',
            body: 'The inline script sets html[data-boot] BEFORE first paint (home route, first session visit, motion allowed). CSS hides the overlay without the attribute — there is no JS race, and no-JS visitors are never trapped.',
          },
          {
            title: 'The overlay is server HTML',
            body: 'The jank it masks happens before hydration, so the overlay must paint before hydration: server-rendered, with its idle motion (blink, pulse, sweep) in pure CSS.',
          },
          {
            title: 'Entrance plays behind the fade',
            body: 'qubetx:boot-complete fires BEFORE the 700ms fade so LoadSequence runs while the overlay dissolves — a handoff, not a hard cut.',
          },
          {
            title: 'FOUC guard is separate',
            body: 'html[data-loading] hides [data-load] entrance targets on every route (3s failsafe); the boot arming is its own attribute with its own 10s failsafe. Two guards, two jobs.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — the pre-paint guards (layout inline script)"
        lang="ts"
        code={`// app/layout.tsx — inline <script>, before anything paints:
// 1 · FOUC guard (every route): hide entrance targets, 3s failsafe
d.setAttribute('data-loading', '')
// 2 · Boot arming (HOME ONLY, first session visit, motion allowed):
if (location.pathname === '/' &&
    !sessionStorage.getItem('qubetx:booted') &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  d.setAttribute('data-boot', '')
}
// failsafes: data-loading −3s · data-boot −10s`}
      />

      <AgentNote
        checklist={[
          'Read BOOT_SCREEN.md before touching BootScreen/LoadSequence/the inline script — they are one coupled system',
          'New projects: a boot moment is OPT-IN brand theater for first visits — default to none for tools',
          'If a project gets a boot: keep the four-part completion (min hold + fonts + load + painted frame) and both failsafes',
          'The percent readout is a slot-roll odometer (up / 120ms / quiet) — controller destroyed in the effect cleanup',
          'Boot replay for QA: sessionStorage.clear() + reload; verify with an in-page sampling probe, not screenshots',
        ]}
      >
        The boot is QubeTX&apos;s door — deliberate, honest, and impossible to get stuck behind.
        When a future product wants its own boot moment, copy the CONTRACT (pre-paint arming,
        readiness-based completion, failsafes, handoff event), not just the visuals. The
        TerminalFrame above gives you the render language for free.
      </AgentNote>
    </DsSection>
  )
}
