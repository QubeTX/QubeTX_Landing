import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import { CommandTable } from '@/components/terminal'
import { DecodeDemo, RevealDemo, LetterRollDemo } from '../TextMotionDemos'

const ROUTING = [
  { command: 'Heading / sentence enters', description: 'RevealText — masked rise, words (40ms) or chars (18ms), once, IO-triggered' },
  { command: 'Label feels freshly verified', description: 'decode(el, 450) — glyph scramble resolving L→R (eyebrows, pills, stat labels)' },
  { command: 'Short text CHANGED in place', description: 'The slot roll — always (§17)' },
  { command: 'Link label under hover', description: 'RollingLabel — stacked-copy letter roll (footers, link lists)' },
  { command: 'Terminal output appears', description: 'TerminalFrame boot-print (§13) — line stream, never per-char typing of prose' },
  { command: 'Paragraph wraps/reflows', description: 'Not a motion job — PretextBlock reserves the space (§23); blocks animate as wholes' },
]

/** §18 — Text systems. Four ways text moves, and exactly when each applies. */
export default function TextMotionSection() {
  return (
    <DsSection
      id="text-motion"
      lede="Text is the site's primary material, so its motion is strictly routed: reveals for arrival, decode for verification, the slot roll for change, the letter roll for hover. Nothing else touches glyphs."
    >
      <DemoPanel caption="RevealText — masked word rise (server HTML is the visible sentence)">
        <RevealDemo />
      </DemoPanel>

      <DemoPanel caption="decode() — scramble-resolve verification">
        <DecodeDemo />
      </DemoPanel>

      <DemoPanel caption="RollingLabel — the hover letter roll">
        <LetterRollDemo />
      </DemoPanel>

      <DemoPanel caption="Routing — which text system when">
        <CommandTable rows={ROUTING} headers={['Situation', 'System']} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Server HTML is the sentence',
            body: 'RevealText splits server-side with the text visible; hiding happens client-side after mount. aria-label carries the unsplit text; split spans are presentation.',
          },
          {
            title: 'Whole blocks under Pretext',
            body: 'Pretext-wrapped paragraphs animate as single blocks (opacity/transform). Per-char/word splitting is reserved for headings the page owns directly.',
          },
          {
            title: 'decode never shares a node',
            body: 'decode() rewrites textContent — pointing it at a node the slot roll or RevealText owns destroys their DOM. One engine per node, period.',
          },
          {
            title: 'Reveals fire once',
            body: 'useInViewOnce semantics: a reveal that replays on every scroll pass is noise. (The replay buttons here remount — a documentation affordance, not a pattern.)',
          },
          {
            title: 'Under the 400ms ceiling',
            body: 'decode 450ms is the documented upper bound for label-scale text effects; reveals scale with STAGGER_MS but individual word rises stay at MS.base.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — the three calls"
        lang="tsx"
        code={`// Arrival (once, on view):
<RevealText text="Detail is the product." as="h2" mode="words" />

// Verification (imperative, repeatable):
import { decode } from '@/lib/motion/decode'
if (!reduced) decode(labelEl, 450)

// Hover roll (inside any link):
<a href="/work"><RollingLabel text="Selected work" /></a>`}
      />

      <AgentNote
        checklist={[
          'RevealText/splitText/decode/RollingLink all ship in the kit; decode needs the anime seam',
          'Never split text that Pretext measures — the two systems are mutually exclusive per node',
          'jsdom: reveals render final-state text with mocks active — test the words, not the masks',
          'Reduced motion: reveals render static, decode no-ops behind its caller’s check (always gate with useMotionPreference)',
        ]}
      >
        The routing table is the takeaway: text motion bugs are almost always{' '}
        <strong>system confusion</strong> — a heading slot-rolling, a label revealing, prose
        typing character-by-character. Pick from the table, and if the situation isn&apos;t in the
        table, the answer is probably <em>no motion</em>.
      </AgentNote>
    </DsSection>
  )
}
