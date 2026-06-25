import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import { CommandTable } from '@/components/terminal'
import { FlashDemo, PeriodDemo, CounterDemo, InterruptDemo } from '../SlotRollDemos'

const OPTIONS = [
  { command: "direction: 'down'", description: "Default. 'up' for forward/advance travel (counters up, next period); 'down' for reverts" },
  { command: 'stagger: 40', description: 'ms between adjacent character cells' },
  { command: 'duration: 240', description: 'ms per glyph roll' },
  { command: 'exitOffset: 50', description: 'ms head start for the outgoing glyph' },
  { command: 'easing: EASE_SLOT_CSS', description: 'cubic-bezier(0.34, 1.56, 0.64, 1) — the reserved overshoot' },
  { command: 'bounce: 0.3', description: 'Per-glyph speed/stagger jitter + settle tilt (0 = mechanical odometer)' },
  { command: "color: 'var(--color-arrival)'", description: 'Arrival tint: string, (i, total) => string, or null for the quiet ink-only roll' },
  { command: 'colorFade: 280', description: 'ms for arrival → ink settle' },
  { command: 'skipUnchanged: true', description: 'Unchanged characters hold still — a 7-digit value changing one digit rolls one cell' },
  { command: 'interrupt: true', description: 'A new roll fast-forwards a running one; false queues + coalesces the latest (flash uses this)' },
]

/** §18 — The slot roll. THE house micro-interaction for changing labels. */
export default function SlotRollSection() {
  return (
    <DsSection
      id="slot-roll"
      lede="How a tiny label changes. Any short text that changes in place — a button caught mid-action, a counter, a status word, a period picker — rolls per character: the new glyph slides in as the old slides out, arriving in blue and settling to ink. It is the system standard, not optional."
    >
      <DemoPanel caption="Button label — flash & revert (spam them)">
        <FlashDemo />
      </DemoPanel>

      <DemoPanel caption="Period picker — direction follows travel">
        <PeriodDemo />
      </DemoPanel>

      <DemoPanel caption="Applied to a live value — only changed digits move">
        <CounterDemo />
      </DemoPanel>

      <DemoPanel caption="Interrupt vs queue — a label never shows two values at once">
        <InterruptDemo />
      </DemoPanel>

      <DemoPanel caption="The options (SlotTextOptions)">
        <CommandTable rows={OPTIONS} headers={['Option · default', 'Meaning']} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Labels only',
            body: 'A word or two — buttons, counters, status words, pickers. Sentences and headings belong to RevealText; scrambles to decode.',
          },
          {
            title: 'The destination rule',
            body: (
              <>
                External links roll on <strong>hover</strong> to a teaser (<code>hoverLabel</code>);
                internal links roll on <strong>interaction</strong> (<code>flashLabel</code>).
                Mouse only — coarse pointers never hover-roll. (QubeTX original — supersedes the
                upstream &quot;never on hover&quot;.)
              </>
            ),
          },
          {
            title: 'Blue on arrival, ink at rest',
            body: (
              <>
                The arrival color never persists past ~280ms. Pass <code>color: null</code> for
                quiet rolls — mandatory on gradient faces where the blue vanishes.
              </>
            ),
          },
          {
            title: 'Direction follows travel',
            body: 'Counting up / advancing = up; reverting / going back = down. The hover teaser enters up and leaves down.',
          },
          {
            title: 'Reduced motion snaps',
            body: 'The engine consults the house store at animate time and rebuilds the final state instantly. No opt-out, no slower version.',
          },
          {
            title: 'Meaningful change only',
            body: 'Roll when the VALUE changes — state, count, period. Never on hover-as-decoration, never on page load for static text. (The footer status cycle is the one sanctioned showcase, and it pays its way by pausing offscreen.)',
          },
          {
            title: 'The engine owns the cells',
            body: 'Never hand-author cell markup, never let React reconcile a rolled container’s children, never point decode/Pretext/anime/FM at the same node.',
          },
          {
            title: 'Reserve the width',
            body: 'Every rolled label sits in an invisible sizer stack (grid-area 1/1 siblings) holding the widest value — rolls and reverts shift nothing, ever.',
          },
        ]}
      />

      <CodeBlock
        title="The API — engine + React layer"
        lang="tsx"
        code={`// Imperative (event-driven labels): tuple hook
const [labelRef, label] = useSlotRoll('Copy')
<span ref={labelRef}>Copy</span>
label.flash('Copied')                       // rolls there and back
label.set('May 2026', { direction: 'up' }) // permanent change

// Declarative (state-driven labels): rolls on prop change
<SlotRoll text={status} options={{ direction: 'up' }} />

// Raw engine (non-React surfaces / controllers):
const ctl = attachSlotText(el, '0%', { direction: 'up', color: null })
ctl.set('47%'); ctl.destroy()`}
      />

      <AgentNote
        checklist={[
          'Ships in the kit: src/lib/motion/slotText.ts + SlotRoll.tsx (+ tests). Zero dependencies beyond tokens + the motion-preference store',
          'The React layer is SlotRoll.tsx, NOT SlotText.tsx — slotText.ts would collide case-insensitively on Windows/macOS',
          'A11y: a [data-slot-sr] span carries the accessible name and updates immediately; cells are aria-hidden',
          'jsdom tests: transitionend never fires — assert final state after vi.runAllTimers() via [data-slot-sr]',
          'Gradient-clipped text needs the per-face background-inherit chain (see StatValue.module.css) or digits go invisible',
          'Provenance: adapted from slot-text v0.2.2 (MIT, textmotion.dev) via the Millis kit — vendored because the npm wrapper SSR-renders an empty span',
        ]}
      >
        When ANY short label changes anywhere on a QubeTX surface, it rolls — that is the
        standard. The decision tree is short: changing label → <code>useSlotRoll</code> /{' '}
        <code>SlotRoll</code>; transient confirmation → <code>flash()</code>; permanent state →{' '}
        <code>set()</code> with direction following travel. If you are animating text any other
        way, check §19 first — you are probably reaching for the wrong system.
      </AgentNote>
    </DsSection>
  )
}
