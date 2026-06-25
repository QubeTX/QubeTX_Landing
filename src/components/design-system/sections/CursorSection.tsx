import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import CursorSandbox from '../CursorSandbox'

/** §23 — Cursor & pointer. The dot/ring/bloom identity and its engine. */
export default function CursorSection() {
  return (
    <DsSection
      id="cursor"
      lede="On fine pointers the native cursor disappears and a three-layer instrument takes over: a dot that leads, a ring that trails with physics, a bloom that breathes. The sandbox below uses the page's own cursor — it's already running."
    >
      <DemoPanel caption="The modes — move through the zones (fine pointers; touch sees static panels)">
        <CursorSandbox />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'One rAF, transform-only',
            body: 'cursorEngine runs a single rAF writing transforms exclusively — no filters, no layout properties, will-change on exactly its three layers (the site-wide budget).',
          },
          {
            title: 'dt-normalized lerp',
            body: 'Smoothing uses 1−(1−k)^(dt·60) so the feel is identical at 60, 120, and 144Hz. Raw lerp-per-frame reads slower on faster monitors — always normalize.',
          },
          {
            title: 'Settle-cancelled loop',
            body: 'When every layer is within epsilon of its target the loop CANCELS — idle cost is zero. Any pointer movement restarts it.',
          },
          {
            title: 'Modes are data attributes',
            body: (
              <>
                <code>data-interactive</code> scales the ring; <code>data-magnetic</code> docks it
                to the element&apos;s center (pairing with the Magnetic wrapper&apos;s ≤6px pull).
                CSS owns each mode&apos;s look via <code>data-mode</code>.
              </>
            ),
          },
          {
            title: 'Native cursor on coarse pointers',
            body: 'The custom cursor exists only under @media (pointer: fine) without reduced motion. Touch users never see (or pay for) it.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — opting elements into cursor modes"
        lang="tsx"
        code={`// Any interactive element:
<button data-interactive="true">…</button>

// CTA that the ring should dock to (pair with the Magnetic wrapper):
<Magnetic strength={6}>
  <OutlineButton href="…" magnetic>Get Started</OutlineButton>
</Magnetic>

// The engine is pure + unit-tested: tick(dt) → assert transform strings.`}
      />

      <AgentNote
        checklist={[
          'Kit ships CustomCursor + cursorEngine (+ its unit tests) — mount once in the root layout',
          'globals.css hides the native cursor under (pointer: fine) only; never hide it unconditionally',
          'New interactive elements: add data-interactive; reserve data-magnetic for primary CTAs (one or two per view)',
          'The engine is testable without a browser: call tick(dt) and assert the transform output',
        ]}
      >
        The cursor is the highest-frequency animation on any page, which is why its engine is the
        strictest code in the system: pure, settle-cancelled, transform-only. Treat it as the
        reference implementation for ANY rAF-driven follower (tooltips, lens effects, drag
        ghosts).
      </AgentNote>
    </DsSection>
  )
}
