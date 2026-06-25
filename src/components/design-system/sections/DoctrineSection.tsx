import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import { CommandTable } from '@/components/terminal'

const OWNERS = [
  { command: 'anime.js v4', description: 'Dot-field values (breathe/entrance), ScrollTrace timeline, text reveals/decode/typewriter/letter rolls, logo redraw — imported ONLY via src/lib/motion/anime.ts (the test-mock seam)' },
  { command: 'Framer Motion', description: 'AnimatePresence exits, layoutId indicators, whileInView card entrances, whileTap squash, useScroll MotionValues' },
  { command: 'raw rAF', description: 'Cursor engine, useMagnetic, ProjectCard tilt — transform-only writes, settle-cancelled loops' },
  { command: 'slotText engine', description: 'Per-character label changes — owns its cells’ inline transitions entirely (zero deps)' },
  { command: 'wave objects', description: 'Dot-field ripples (makeRippleWave/applyRippleWaves) — pure math evaluated per frame by the blitter' },
  { command: 'CSS', description: 'Every simple hover: brackets, underlines, gradient sweeps, blinks, scanlines' },
]

const ROUTING = [
  { command: 'Hover / press spring', description: 'Framer Motion (whileTap/whileHover + SPRING presets)' },
  { command: 'Element enters viewport once', description: 'useInViewOnce (IO) + FM variants or anime — never scroll math' },
  { command: 'Scroll-scrubbed scene', description: 'Paused anime timeline seek()ed from a Lenis callback (anime onScroll is BANNED)' },
  { command: 'Multi-step choreography / SVG drawing / staggers', description: 'anime.js via the seam' },
  { command: 'Cursor-distance response', description: 'useProximityGlow / cursorEngine — already built, don’t rebuild' },
  { command: 'Short text that changed', description: 'Neither — the slot roll. Always. (§18)' },
  { command: 'Paragraph reveal / heading rise', description: 'RevealText (§19)' },
  { command: 'Layout/size reaction to resize', description: 'resizeCoordinator subscription — ResizeObserver is banned codebase-wide' },
]

/** §17 — The motion doctrine. The laws that keep 60fps honest. */
export default function DoctrineSection() {
  return (
    <DsSection
      id="doctrine"
      lede="Five animation owners, one law: one owner per element property. Everything else in this group is built on that sentence plus a short list of bans that were each earned the hard way."
    >
      <DemoPanel caption="Ownership — who animates what">
        <CommandTable rows={OWNERS} headers={['Owner', 'Territory']} />
      </DemoPanel>

      <DemoPanel caption="Routing — reaching for the right tool">
        <CommandTable rows={ROUTING} headers={['Need', 'Reach for']} />
      </DemoPanel>

      <RuleGrid
        prefix="LAW"
        rules={[
          {
            title: 'One owner per property',
            body: 'An element with FM variants is never also an anime target — anime targets live one level down (split spans, SVG paths). Two writers on one property = fighting animations.',
          },
          {
            title: 'No ResizeObserver. Anywhere.',
            body: (
              <>
                It oscillates with Pretext shrinkwrap. All resize reactions subscribe to{' '}
                <code>src/lib/pretext/resizeCoordinator</code> (one rAF-coalesced window listener).
              </>
            ),
          },
          {
            title: 'Triggers are IO, scrubbing is Lenis',
            body: (
              <>
                Scroll <strong>triggers</strong> = IntersectionObserver (<code>useInViewOnce</code>);
                scroll <strong>scrubbing</strong> = Lenis callbacks seeking paused timelines.
                anime&apos;s <code>onScroll</code> is banned.
              </>
            ),
          },
          {
            title: 'Server HTML shows final state',
            body: 'Visible text first, always. Hidden/initial states are applied client-side after mount, guarded against FOUC by the html[data-loading] inline script (3s failsafe).',
          },
          {
            title: 'Reduced motion = skip to final',
            body: (
              <>
                Every primitive consults <code>useMotionPreference()</code> /{' '}
                <code>prefersReducedMotion()</code> and renders the end state. Never a slower
                version, never an opt-out.
              </>
            ),
          },
          {
            title: 'anime through the seam',
            body: (
              <>
                animejs is imported ONLY via <code>src/lib/motion/anime.ts</code> — the single
                mock point that makes the whole motion system testable. v4.4 removed string
                cubic-beziers; use <code>EASE_ANIME</code>.
              </>
            ),
          },
          {
            title: 'No per-event tween bursts',
            body: 'Creating hundreds of anime tweens inside a pointer handler costs 8–36ms a hit (measured). High-frequency interactions get wave objects / pure math evaluated per frame (§20).',
          },
          {
            title: 'CSS beats inline; inline display beats media queries',
            body: 'Never animate a property an engine writes inline on the same node; wrappers set display via class so media queries can override.',
          },
        ]}
      />

      <AgentNote
        checklist={[
          'Copy src/lib/motion + src/lib/pretext/resizeCoordinator.ts together — the doctrine assumes both',
          'Before animating anything, name its owner out loud; if a node already has one, go one level down',
          'Code review greps: "new ResizeObserver" (ban), "from \'animejs\'" outside the seam (ban), "onScroll" in anime options (ban)',
          'Every new motion feature ships with its reduced-motion path in the same commit',
        ]}
      >
        This table is the difference between a site that feels engineered and one that feels
        decorated. When two animations fight, the bug is ALWAYS an ownership violation — find the
        property with two writers. The bans aren&apos;t style preferences; each one has a
        post-mortem behind it (shrinkwrap oscillation, hydration divergence, 50ms pointer
        handlers).
      </AgentNote>
    </DsSection>
  )
}
