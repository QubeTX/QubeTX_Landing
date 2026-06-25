import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import ScrollbarDemo from '../ScrollbarDemo'
import styles from '../ScrollbarDemo.module.css'

/** §22 — The brand scrollbar. Two layers: a themed native bar everywhere, an
 *  animated rail opt-in. The QubeTX re-theme of the Millis/Theia bar. */
export default function ScrollbarSection() {
  return (
    <DsSection
      id="scrollbar"
      lede="No surface ever shows the grey default. Layer one recolors the real browser bar to the deep-void palette on every overflow container (it can never derender — there is nothing to fall back to). Layer two is an opt-in animated rail — a slim brand-gradient rule with survey ticks and a mono SEC NN · NN% readout — for surfaces that want scroll storytelling. Restrained baseline, expressive when asked."
    >
      <DemoPanel caption="Overlay rail — always-visible preset · ticks + readout · drag the rule or scroll">
        <ScrollbarDemo />
      </DemoPanel>

      <DemoPanel caption="Native baseline — the themed browser bar, no overlay (this whole page uses it)">
        <div className={styles.native}>
          <p>
            This container has no overlay engine attached — it shows the native
            restyle from layer one. The thumb sits at the slate-blue rest token
            and brightens to electric blue on hover; the track is the void
            itself.
          </p>
          <p>
            Because it IS the native bar, it can never vanish on a DOM
            reconcile, a tab return, or a content swap — the failure mode the
            reference kits built a whole self-heal adapter to fight simply does
            not exist here. The overlay is the only layer that can be torn down,
            and it degrades to this.
          </p>
          <p>
            House radius is 3px (not the reference kits’ sharp 2px) and the
            visible rule is slimmed by a 3px transparent inset border with a
            padding-box clip — a rule with breathing room, not a fat block flush
            to the edge. Scroll to feel it.
          </p>
          <p>Keep scrolling — the bar is the only chrome that moves here.</p>
        </div>
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'No grey default, ever',
            body: 'The native restyle is universal and tokenized (--bs-*). It is the required baseline on every surface; the overlay is a progressive enhancement on top, never a replacement for it.',
          },
          {
            title: 'Two layers, one owner each',
            body: (
              <>
                CSS owns the native bar (<code>::-webkit-scrollbar</code> +{' '}
                <code>scrollbar-color</code>). The engine owns the overlay rail and adds{' '}
                <code>.bs-scroll</code> to hide the native bar only where it draws.
              </>
            ),
          },
          {
            title: 'Overlay is opt-in',
            body: 'Default surfaces get the calm native bar. Reach for useBrandScrollbar only when a surface earns scroll storytelling (showcase, long-form, dashboards) — working tools stay still.',
          },
          {
            title: 'anime via the seam only',
            body: 'The engine imports anime from src/lib/motion/anime.ts — never animejs directly. The plumb-bob is dropped: QubeTX’s motif is the cube/circuit, so the rail is a clean kinetic rule.',
          },
          {
            title: 'Re-measure through the coordinator',
            body: 'The hook calls refresh() via resizeCoordinator — never a ResizeObserver (Pretext law). A layout change without a window resize won’t re-measure; design within that.',
          },
          {
            title: 'Reduced motion = static',
            body: 'No entrance wipe, no tick growth, no hover-grow — the rail renders at its final state. Skip to the end; never a slower version.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — the native baseline (globals.css; tokens in the @kit-tokens block)"
        lang="css"
        code={`:root {
  --bs-thumb: var(--color-border-bright);   /* #2c3a5c rest */
  --bs-thumb-hover: var(--primary-blue);    /* #0066FF hover */
  --bs-size: 12px;
  --bs-radius: 3px;                         /* house radius, not 2px */
}

::-webkit-scrollbar { width: var(--bs-size); height: var(--bs-size); }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--bs-thumb);
  border: 3px solid transparent;           /* slim rule, breathing room */
  background-clip: padding-box;
  border-radius: var(--bs-radius);
}
::-webkit-scrollbar-thumb:hover { background: var(--bs-thumb-hover); }
html { scrollbar-width: thin; scrollbar-color: var(--bs-thumb) transparent; }`}
      />

      <CodeBlock
        title="Recipe — the opt-in overlay rail (useBrandScrollbar)"
        lang="tsx"
        code={`const ref = useRef<HTMLDivElement>(null)
// ticks read [data-bs-section]/[data-bs-num]; readout = SEC NN · NN%
useBrandScrollbar(ref, { ticks: true, readout: true, autoHide: false })

return (
  <div className="host">                 {/* positioned parent — the rail anchors here */}
    <div ref={ref} className="scroll">   {/* the engine adds .bs-scroll */}
      <section data-bs-section="Intro" data-bs-num="01">…</section>
      <section data-bs-section="Specs" data-bs-num="02">…</section>
    </div>
  </div>
)`}
      />

      <AgentNote
        checklist={[
          'Kit ships the native baseline (globals.css @kit-tokens) + brandScrollbar.ts + useBrandScrollbar — the native bar is automatic, the overlay is opt-in',
          'Never reintroduce a grey/default scrollbar; theme any new overflow surface through the --bs-* tokens',
          'Overlay only on surfaces that earn it — pass a positioned parent; mark sections with data-bs-section/data-bs-num for ticks',
          'Inner scroll containers under Lenis (sidebars, panels) also need data-lenis-prevent-wheel + overscroll-behavior: contain so the wheel scrolls THEM, not the page',
          'Reduced motion and resize are handled in the engine/hook — never add a ResizeObserver',
        ]}
      >
        The scrollbar is the most-seen piece of chrome on any page, so it carries the brand
        quietly by default and loudly only on request. The native restyle is the contract: every
        surface, no exceptions. The overlay rail is the same instinct as ScrollTrace and this
        page’s SectionRail — scroll made expressive — but scoped to a single scrollable element
        rather than the whole document. Reach for it the way you’d reach for the trace: when the
        surface is a showcase, not when it’s a tool.
      </AgentNote>
    </DsSection>
  )
}
