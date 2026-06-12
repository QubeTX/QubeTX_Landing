import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import EaseCurve from '../EaseCurve'
import SpringDemo from '../SpringDemo'
import { CommandTable } from '@/components/terminal'
import styles from './MotionTokensSection.module.css'

const DURATIONS = [
  { command: 'DUR.micro / MS.micro', description: '0.18s / 180ms — hovers, presses, chip flips' },
  { command: 'DUR.fast / MS.fast', description: '0.3s / 300ms — reveals of small elements, sweeps' },
  { command: 'DUR.base / MS.base', description: '0.55s / 550ms — standard entrances (cards, text rises)' },
  { command: 'DUR.slow / MS.slow', description: '0.8s / 800ms — large surfaces, section-scale moves' },
  { command: 'DUR.hero / MS.hero', description: '1.1s / 1100ms — the entrance choreography ceiling' },
]

const STAGGERS = [
  { command: 'STAGGER_MS.chars', description: '18ms — per-character (wordmark rise, letter rolls)' },
  { command: 'STAGGER_MS.words', description: '40ms — per-word (RevealText default)' },
  { command: 'STAGGER_MS.lines', description: '90ms — per-line (hero headline)' },
  { command: 'STAGGER_MS.cards', description: '80ms — per-card (grids)' },
  { command: 'STAGGER_MS.nav', description: '60ms — per-nav-item (header entrance)' },
]

/** §07 — Motion tokens. The curves and clocks every animation shares. */
export default function MotionTokensSection() {
  return (
    <DsSection
      id="motion-tokens"
      lede="One house curve in three notations, one overshoot reserved for the slot roll, five durations, five staggers, three springs. Click any curve to replay it — the dot rides (time, eased value); the block below it is the same ease as pure feel."
    >
      <DemoPanel caption="The curves — live on the real anime engine">
        <div className={styles.curves}>
          <EaseCurve
            name="EASE — the house curve"
            notation="cubic-bezier(0.25, 1, 0.5, 1) · EASE / EASE_CSS / EASE_ANIME"
            curve={{ kind: 'bezier', params: [0.25, 1, 0.5, 1] }}
          />
          <EaseCurve
            name="EASE_SLOT_CSS — the slot overshoot"
            notation="cubic-bezier(0.34, 1.56, 0.64, 1) · slot roll only"
            curve={{ kind: 'bezier', params: [0.34, 1.56, 0.64, 1] }}
          />
          <EaseCurve
            name="out(3) — anime named ease"
            notation="'out(3)' · counters, decode resolves"
            curve={{ kind: 'pow', power: 3 }}
          />
        </div>
      </DemoPanel>

      <DemoPanel caption="Durations (Framer seconds / anime milliseconds)">
        <CommandTable rows={DURATIONS} headers={['Token', 'Value / use']} />
      </DemoPanel>

      <DemoPanel caption="Staggers">
        <CommandTable rows={STAGGERS} headers={['Token', 'Value / use']} />
      </DemoPanel>

      <DemoPanel caption="Springs — press the pads (Framer Motion presets)">
        <SpringDemo />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'One curve, three notations',
            body: (
              <>
                <code>EASE</code> (FM tuple), <code>EASE_CSS</code> (string), and{' '}
                <code>EASE_ANIME</code> (function) are the same curve. anime 4.4 REMOVED string
                cubic-beziers — always import the function form.
              </>
            ),
          },
          {
            title: 'The overshoot is reserved',
            body: (
              <>
                <code>EASE_SLOT_CSS</code> belongs to the slot roll&apos;s landing. Everything else
                stays on the no-overshoot house curve — restraint is what makes the roll&apos;s
                bounce read as an event.
              </>
            ),
          },
          {
            title: 'Tokens, not numbers',
            body: 'Durations and staggers come from tokens.ts. A 437ms animation is a review comment; MS.base is a decision already made.',
          },
          {
            title: 'Under 400ms for micro',
            body: 'Micro-interactions (hovers, flashes, rolls) land well under 400ms total. The slow end of the scale is for entrances the user watches once.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — the tokens in each engine"
        lang="ts"
        code={`import { EASE, EASE_ANIME, EASE_CSS, MS, DUR, STAGGER_MS, SPRING } from '@/lib/motion'

// anime.js (via the seam):
animate(targets, { y: ['110%', '0%'], duration: MS.base, ease: EASE_ANIME })

// Framer Motion:
<motion.div transition={{ duration: DUR.fast, ease: EASE }} />
<motion.button whileTap={{ scale: 0.96 }} transition={SPRING.press} />

/* CSS: */
transition: color 0.2s var(--ease-out); /* --ease-out === EASE_CSS */`}
      />

      <AgentNote
        checklist={[
          'Copy src/lib/motion/tokens.ts with the motion library — it is dependency-light by design',
          "anime v4: named eases ('out(3)', 'inOutSine', 'outElastic(1, .6)') still work as strings; cubic-beziers do NOT",
          'Map --ease-out in globals.css so CSS transitions share the house curve',
          'If a new preset is genuinely needed, add it to tokens.ts + this table in the same PR',
        ]}
      >
        Motion identity is mostly these numbers. An agent matching the QubeTX feel on a new
        project needs exactly three habits: <strong>import the tokens</strong>, keep micro under
        400ms, and save the overshoot for the slot roll. The curves above run on the production
        anime build through the seam — they are the spec executing itself.
      </AgentNote>
    </DsSection>
  )
}
