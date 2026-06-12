import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import OutlineButton from '@/components/ui/OutlineButton'
import TextLink from '@/components/ui/TextLink'
import Magnetic from '@/components/ui/Magnetic'
import RollingLabel from '@/components/ui/RollingLink'

/** §09 — Buttons & links. Every interactive label and its motion contract. */
export default function ButtonsSection() {
  return (
    <DsSection
      id="buttons"
      lede="Three interactive text primitives: the outlined CTA, the mono text link, and the letter-roll label. All three obey the destination rule — external links announce themselves on hover, internal links confirm on click."
    >
      <DemoPanel
        caption="OutlineButton — md + magnetic + hoverLabel (external: hover-rolls the teaser, mouse only)"
        center
      >
        <Magnetic strength={6}>
          <OutlineButton
            href="https://reports.qubetx.com"
            hoverLabel="See the tools"
            magnetic
          >
            Visit Reports
          </OutlineButton>
        </Magnetic>
        <OutlineButton href="#buttons" flashLabel="Right here" size="sm">
          Internal CTA
        </OutlineButton>
      </DemoPanel>

      <DemoPanel caption="TextLink — glyph + flashLabel (internal: click-flash + Lenis smooth scroll)" center>
        <TextLink href="#cards" glyph="⠿" flashLabel="Navigating…">
          Jump to cards
        </TextLink>
      </DemoPanel>

      <DemoPanel caption="RollingLabel — the hover letter roll for link lists (hover it)" center>
        <a href="#buttons" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
          <RollingLabel text="Hover this label" />
        </a>
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'The destination rule',
            body: (
              <>
                Leaving the site? The label slot-rolls a teaser on <strong>hover</strong>{' '}
                (<code>hoverLabel</code>). Staying on the site? It flashes on{' '}
                <strong>interaction</strong> (<code>flashLabel</code>). Mouse pointers only —
                coarse pointers never hover-roll.
              </>
            ),
          },
          {
            title: 'Quiet rolls on gradient faces',
            body: (
              <>
                OutlineButton&apos;s hovered face is the brand gradient, so its rolls are ink-only
                (<code>color: null</code>) — the arrival blue would vanish. TextLink rolls keep
                the arrival blue (it sits on the void).
              </>
            ),
          },
          {
            title: 'Width is reserved',
            body: 'Both components render invisible sizer stacks so the widest label defines the box — a roll never resizes the button (hover shifts are NOT CLS-exempt).',
          },
          {
            title: 'Press is a spring',
            body: (
              <>
                FM <code>whileTap</code> squash (scaleX 1.04 / scaleY 0.92, SPRING.press) on the
                anchor; the slot cells live two levels down — one owner per property holds.
              </>
            ),
          },
          {
            title: 'External means external',
            body: (
              <>
                <code>https?://</code> hrefs auto-get <code>target=&quot;_blank&quot;
                rel=&quot;noopener noreferrer&quot;</code> + an sr-only &quot;(opens in a new
                tab)&quot; — enforced by tests.
              </>
            ),
          },
          {
            title: 'Magnetic is a wrapper',
            body: (
              <>
                <code>&lt;Magnetic strength={'{6}'}&gt;</code> owns its node&apos;s transform;{' '}
                <code>magnetic</code> on the button only sets <code>data-magnetic</code> so the
                cursor ring docks. Never stack other transforms on the wrapper.
              </>
            ),
          },
        ]}
      />

      <CodeBlock
        title="Recipe — CTAs under the destination rule"
        lang="tsx"
        code={`// External destination → hover teaser
<OutlineButton href="https://app.youform.com/…" hoverLabel="Open the form" magnetic>
  Get Started
</OutlineButton>

// Internal destination → click flash (+ Lenis smooth scroll on TextLink)
<TextLink href="#services" glyph="⠿" flashLabel="Navigating…">
  Explore Our Services
</TextLink>`}
      />

      <AgentNote
        checklist={[
          'OutlineButton/TextLink/Magnetic/RollingLink ship in the kit ui/ folder with their tests',
          'Labels must be plain strings for the roll machinery (typeof children === "string")',
          'Pick hover teasers close in length to the resting label — slack inside the sizer stack is dead width',
          'Keep flash copy sentence case with a real ellipsis character (…), one cell',
          'New button variants extend OutlineButton.module.css — never fork the component',
        ]}
      >
        These three cover every interactive-text need QubeTX has had: <strong>OutlineButton</strong>{' '}
        for actions, <strong>TextLink</strong> for in-page wayfinding, <strong>RollingLabel</strong>{' '}
        for dense link lists (footers, indexes). If a new surface seems to need a fourth, check
        whether it&apos;s actually a <em>DownloadCard</em> (§14) or a nav pattern (§15) first.
      </AgentNote>
    </DsSection>
  )
}
