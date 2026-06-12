import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import TraceDemo from '../TraceDemo'
import { CommandTable } from '@/components/terminal'

const SYSTEMS = [
  { command: 'Lenis (SmoothScroll)', description: 'THE scroll driver — window-native smoothing (lerp 0.1, duration 1.5), so IO and FM useScroll just work. Overlays call stop()/start()' },
  { command: 'useAnchorNav(-88)', description: 'Every in-page jump: lenis.scrollTo with the header offset; links keep real hrefs for no-JS/a11y; CSS scroll-behavior is intentionally absent' },
  { command: 'useInViewOnce', description: 'Scroll TRIGGERS — IO, fires once, initial state false (SSR-safe)' },
  { command: 'ScrollTrace', description: 'The home page’s left-gutter circuit: paused timeline of svg.createDrawable segments seek()ed from Lenis progress (draws down, reverses up); hidden <1024px. Ships in the kit as an OPTIONAL expressive decoration' },
  { command: 'ScrollProgress', description: '2px gradient bar — FM scaleX MotionValue, zero re-renders' },
  { command: 'SectionRail (this page)', description: 'The right-edge rail here: same drawable+seek model, a cube tick per section, a slot-rolled SEC/% readout — the documentation page’s own expressive layer' },
]

const ENGINES = [
  { command: 'Lenis', description: 'The single source of scroll truth. Its callback delivers smoothed progress every frame — both other engines read from it, neither listens to raw scroll' },
  { command: 'anime.js v4', description: 'Drawable strokes + paused timelines (createTimeline → svg.createDrawable → seek). Owns everything that DRAWS with scroll: the trace’s segments, the rail, the junction cubes' },
  { command: 'Framer Motion', description: 'useScroll MotionValues piped straight into style — ScrollProgress’s scaleX, the footer ring’s pathLength. Owns simple continuous bindings, never drawables' },
  { command: 'IntersectionObserver', description: 'Entry TRIGGERS only (useInViewOnce) — fire-once choreography starts. Never used for position math' },
]

const TRACE_KNOBS = [
  { command: 'junctions: number[]', description: 'Document-Y offsets where isometric cube wireframes (the logo motif) sit — ScrollTrace derives them from section tops via its sectionIds prop' },
  { command: 'startY / endY', description: 'The trace’s vertical span. The site starts at 75% of the first viewport and stops 160px above the document end' },
  { command: 'gutterX', description: 'The lane’s horizontal center. Wide viewports: the true outer margin ((vw − --container-max)/2 − 40). Tight viewports: a hairline lane at x≈11' },
  { command: 'amplitude', description: '45° jog distance each side of the lane — 14px in the wide gutter, 5px in the hairline lane' },
  { command: 'cubeR', description: 'Junction cube circumradius (9px wide / 5px tight). cubePaths() returns the hexagon outline + three internal edges as plain d-strings' },
]

/** §20 — Scroll systems. One driver, two jobs, three engines — and the trace. */
export default function ScrollSection() {
  return (
    <DsSection
      id="scroll"
      lede="One scroll driver (Lenis), one trigger mechanism (IO), one scrubbing pattern (paused timelines seeked from scroll progress). The rail gliding down this page's right edge and the circuit trace descending qubetx.com's left gutter are the same pattern wearing different clothes — scroll storytelling as an optional, per-surface expressive layer."
    >
      <DemoPanel caption="The systems">
        <CommandTable rows={SYSTEMS} headers={['System', 'Role']} />
      </DemoPanel>

      <DemoPanel caption="Engine roles — who owns what when the page scrolls">
        <CommandTable rows={ENGINES} headers={['Engine', 'Owns']} />
      </DemoPanel>

      <DemoPanel caption="The trace, live — a miniature ScrollTrace scrubbed by its own transit through your viewport (scroll up to watch it reverse)">
        <TraceDemo />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Triggers ≠ scrubbing',
            body: 'Entering the viewport once = IO trigger. Position-linked drawing = Lenis callback seeking a paused timeline. The two never mix, and anime’s onScroll is banned outright.',
          },
          {
            title: 'Optional expressive decoration',
            body: 'The trace is never a mandatory layer. Default surfaces stay calm — ScrollTrace and this page’s rail are deliberate expressive choices on showcase surfaces. Working tools don’t scroll-animate.',
          },
          {
            title: 'Bidirectional or broken',
            body: 'A scrubbed timeline must reverse cleanly when the user scrolls up — seek(progress × duration), never play()/pause() choreography.',
          },
          {
            title: 'Native fallback always',
            body: 'Every Lenis-dependent behavior has a native path (scrollIntoView, window scroll listener) — the page works if Lenis never loads.',
          },
          {
            title: 'One owner per stroke',
            body: 'An anime drawable is never also an FM target. FM gets the simple continuous bindings (scaleX, pathLength); anime gets anything that draws a path. Lenis feeds both; neither touches raw scroll events.',
          },
          {
            title: 'Re-measure through the coordinator',
            body: 'The trace measures section offsets on mount, on resizeCoordinator resize, and after fonts settle — never with a ResizeObserver. Layout shifts without a resize won’t re-route it; design within that.',
          },
        ]}
      />

      <DemoPanel caption="buildTrace() — the pure geometry (scrollTracePath.ts, unit-tested)">
        <CommandTable rows={TRACE_KNOBS} headers={['Option', 'Meaning']} />
      </DemoPanel>

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

      <CodeBlock
        title="Recipe — wiring the trace on a new surface"
        lang="tsx"
        code={`// Geometry is pure — design your own path, keep the motif
const geo = buildTrace({
  junctions: offsets,       // your section tops (or any beats you choose)
  startY: vh * 0.75,        // begin below the hero
  endY: docHeight - 160,    // stop short of the footer
  gutterX,                  // your lane — left gutter, right edge, anywhere
  amplitude: 14,            // jog personality
  cubeR: 9,                 // junction cube size
})

// Or take the component wholesale and just point it at your sections
<ScrollTrace sectionIds={['intro', 'specs', 'pricing']} />

// Strokes: brand gradient (#0066FF → #7c3aed), glow = a second wider
// stroke at 0.06 opacity — never an SVG filter`}
      />

      <AgentNote
        checklist={[
          'Kit ships SmoothScroll + useAnchorNav + useInViewOnce + ScrollProgress + ScrollTrace (with scrollTracePath geometry); SectionRail stays this page’s own reference implementation',
          'ScrollTrace is an OPTIONAL expressive decoration — showcase surfaces only, never a checklist item for every page',
          'Wrap the app in <SmoothScroll> once, at the root — never nest Lenis instances',
          'In-page links: onClick={(e) => { if (navigate(href)) e.preventDefault() }} — keep the href',
          'Modal/overlay opens → lenis.stop(); closes → lenis.start() (MobileMenu is the reference)',
          'scroll-mt on section anchors must match the nav offset (−88 under the fixed header; −16 here)',
          'Invariants if you do build one: Lenis-seeked paused timeline (bidirectional), brand gradient strokes, glow as a second stroke (no SVG filters), hide it where the gutter is too thin, reduced motion = the complete trace rendered statically',
        ]}
      >
        On the trace itself: be as creative as you want, based on the context of the product
        you’re building. The home page draws a PCB circuit with isometric cube junctions down the
        LEFT gutter; this page’s rail rides the RIGHT edge — the side is a per-surface choice too,
        whichever gutter the layout and the page’s context leave free. Your surface might trace a
        waveform, a dependency graph, a survey line — whatever the product’s own diagnostic flavor
        suggests. Keep the general branding and expressiveness in the QubeTX style (the gradient,
        the mono flavor, motion that earns its place) and let the specific design vary per surface. If a scroll feature seems to need a scroll-position state variable
        in React, stop — it wants either an IO trigger (no position math) or a Lenis-seeked
        timeline (no React re-renders). The zero-re-render rule is why scrolling stays smooth with
        this much choreography on screen.
      </AgentNote>
    </DsSection>
  )
}
