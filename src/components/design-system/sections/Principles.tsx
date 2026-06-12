import DsSection from '../DsSection'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'

/** §01 — The seven principles. Everything else is commentary. */
export default function Principles() {
  return (
    <DsSection
      id="principles"
      lede="Seven sentences govern every QubeTX surface. Each one is enforceable — by a test, a lint rule, a review grep, or a Lighthouse score — because a principle that can't fail a build is just a mood."
    >
      <RuleGrid
        prefix="PRINCIPLE"
        rules={[
          {
            title: 'Detail is the product',
            body: 'The site is the portfolio piece: the type, the motion, the dots reacting under the cursor are the same attention we sell. If it ships under the name, it ships finished.',
          },
          {
            title: 'Server HTML is the final state',
            body: 'Every surface renders complete and readable before JavaScript exists. Animation is a curtain over real content — never the source of it.',
          },
          {
            title: 'One owner per property',
            body: 'Every animated property on every node has exactly one writer. Fighting animations are an ownership bug, not a tuning problem.',
          },
          {
            title: 'Reduced motion is the final state, instantly',
            body: 'prefers-reduced-motion never gets a slower version, a fade, or an opt-out — it gets the end state, immediately, everywhere.',
          },
          {
            title: 'The terminal is honest',
            body: 'Timestamps are real clocks. Progress parks at 99% and says why. Statuses reflect publish-time reality. The diagnostic flavor works because nothing in it is fake.',
          },
          {
            title: 'Motion earns its place',
            body: 'Things move when meaning changes — a value, a state, an arrival. Decoration moves once (entrances) or never. The budget is a frame: 60fps is a promise, not a goal.',
          },
          {
            title: 'The laws outlive the code',
            body: 'No ResizeObserver. anime through the seam. Triggers are IO, scrubbing is Lenis. Sentence case in storage. Every law here was paid for — breaking one re-runs the incident that created it.',
          },
        ]}
      />

      <AgentNote
        checklist={[
          'Before shipping any QubeTX surface, read these seven against your diff',
          'Principles 2–4 are mechanically testable: final-state DOM tests, ownership review, reduced-motion pass',
          'When two principles seem to conflict, honesty (5) and accessibility (4) win',
        ]}
      >
        These aren&apos;t aspirations — they&apos;re the review checklist. The rest of this page
        is the seven principles applied to specific materials: color, type, terminals, motion. If
        a future decision isn&apos;t covered anywhere else, decide it from here.
      </AgentNote>
    </DsSection>
  )
}
