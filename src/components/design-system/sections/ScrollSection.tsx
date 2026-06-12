import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import { CommandTable } from '@/components/terminal'

const SYSTEMS = [
  { command: 'Lenis (SmoothScroll)', description: 'THE scroll driver — window-native smoothing (lerp 0.1, duration 1.5), so IO and FM useScroll just work. Overlays call stop()/start()' },
  { command: 'useAnchorNav(-88)', description: 'Every in-page jump: lenis.scrollTo with the header offset; links keep real hrefs for no-JS/a11y; CSS scroll-behavior is intentionally absent' },
  { command: 'useInViewOnce', description: 'Scroll TRIGGERS — IO, fires once, initial state false (SSR-safe)' },
  { command: 'ScrollTrace', description: 'The home page’s left-gutter circuit: paused timeline of svg.createDrawable segments seek()ed from Lenis progress (draws down, reverses up); hidden <1024px' },
  { command: 'ScrollProgress', description: '2px gradient bar — FM scaleX MotionValue, zero re-renders' },
  { command: 'SectionRail (this page)', description: 'The right-edge rail here: same drawable+seek model, a cube tick per section, a slot-rolled SEC/% readout — the documentation page’s own expressive layer' },
]

/** §20 — Scroll systems. One driver, two jobs, three surfaces. */
export default function ScrollSection() {
  return (
    <DsSection
      id="scroll"
      lede="One scroll driver (Lenis), one trigger mechanism (IO), one scrubbing pattern (paused timelines seeked from scroll progress). The rail gliding down this page's right edge is the pattern documenting itself."
    >
      <DemoPanel caption="The systems">
        <CommandTable rows={SYSTEMS} headers={['System', 'Role']} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Triggers ≠ scrubbing',
            body: 'Entering the viewport once = IO trigger. Position-linked drawing = Lenis callback seeking a paused timeline. The two never mix, and anime’s onScroll is banned outright.',
          },
          {
            title: 'Scroll storytelling is opt-in',
            body: 'Default surfaces stay calm — ScrollTrace and this page’s rail are deliberate expressive layers on showcase surfaces. Working tools don’t scroll-animate.',
          },
          {
            title: 'Bidirectional or broken',
            body: 'A scrubbed timeline must reverse cleanly when the user scrolls up — seek(progress × duration), never play()/pause() choreography.',
          },
          {
            title: 'Native fallback always',
            body: 'Every Lenis-dependent behavior has a native path (scrollIntoView, window scroll listener) — the page works if Lenis never loads.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — the scrub pattern (ScrollTrace's core)"
        lang="ts"
        code={`// 1 · A paused timeline; segments are svg.createDrawable strokes
const tl = createTimeline({ autoplay: false })
segments.forEach((seg, i) => tl.add(seg, { draw: '0 1', duration: 100 }, i * 80))

// 2 · Lenis scrubs it — no scroll math anywhere else
useLenis(({ progress }) => {
  tl.seek(progress * tl.duration)
})`}
      />

      <AgentNote
        checklist={[
          'Kit ships SmoothScroll + useAnchorNav + useInViewOnce + ScrollProgress; ScrollTrace/SectionRail are reference implementations',
          'Wrap the app in <SmoothScroll> once, at the root — never nest Lenis instances',
          'In-page links: onClick={(e) => { if (navigate(href)) e.preventDefault() }} — keep the href',
          'Modal/overlay opens → lenis.stop(); closes → lenis.start() (MobileMenu is the reference)',
          'scroll-mt on section anchors must match the nav offset (−88 under the fixed header; −16 here)',
        ]}
      >
        If a scroll feature seems to need a scroll-position state variable in React, stop — it
        wants either an IO trigger (no position math) or a Lenis-seeked timeline (no React
        re-renders). The zero-re-render rule is why scrolling stays smooth with this much
        choreography on screen.
      </AgentNote>
    </DsSection>
  )
}
