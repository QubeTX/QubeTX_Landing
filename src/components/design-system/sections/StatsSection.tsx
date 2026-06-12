import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import StatValue from '@/components/ui/StatValue'
import styles from './StatsSection.module.css'

/** §12 — Stats & KPIs. Numerals that verify themselves. */
export default function StatsSection() {
  return (
    <DsSection
      id="stats"
      lede="A QubeTX stat doesn't fade in — it counts. The numeral climbs from zero in decelerating slot-roll steps and lands in arrival blue; hovering re-verifies it (terminal flavor: drain to zero, climb back, same number). Scroll these into view, then hover them — and try leaving mid-count."
    >
      <DemoPanel caption="StatValue — count-up entrance + hover re-verify (the About-section band)">
        <div className={styles.kpiBand}>
          <StatValue value="07" label="Client Projects" />
          <StatValue value="05" label="Products Shipped" />
          <StatValue value="100%" label="In-House" />
        </div>
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'The entrance is a count made of rolls',
            body: 'First view: the numeral climbs 0 → value in exponential-approach steps — big jumps when far, single ticks at the end — quiet intermediates, arrival-blue landing. Digit count and prefix/suffix hold: "100%" counts as three zero-padded digits + %.',
          },
          {
            title: 'Re-verify on hover',
            body: 'Mouse hover drains the number briskly to zero, then climbs back to the SAME value while the label scramble-decodes. Repeatable, and it never changes the number — that’s the point.',
          },
          {
            title: 'The count always converges',
            body: 'The displayed number chases a single goal (zero or the value), so a pointer leaving mid-countdown just turns the count around from wherever it is. No stuck states, no snapping — spam-hover all you like.',
          },
          {
            title: 'Gradient numerals need the clip chain',
            body: (
              <>
                The numeral is gradient text (<code>background-clip: text</code>). Chrome
                won&apos;t clip to absolutely-positioned roll faces — the per-face{' '}
                <code>background: inherit</code> + clip chain in StatValue.module.css is
                load-bearing. Without it the digits are invisible.
              </>
            ),
          },
          {
            title: 'Tabular numerals',
            body: (
              <>
                <code>font-variant-numeric: tabular-nums</code> keeps digit cells equal-width so
                rolls almost never trigger width easing — the band stays rock-still.
              </>
            ),
          },
          {
            title: 'Reduced motion = the value, immediately',
            body: 'Under prefers-reduced-motion no cells are ever built — the server-rendered numeral is simply there.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — a KPI band"
        lang="tsx"
        code={`<div className={styles.kpiBand}>
  <StatValue value="07" label="Client Projects" />
  <StatValue value="100%" label="In-House" />
</div>
/* Band CSS: a bordered grid of cells; each cell hover-raises
   (background-color transition) and shows the corner + mark. */`}
      />

      <AgentNote
        checklist={[
          'StatValue ships in the kit ui/ folder (depends on lib/motion: slotText, decode, useInViewOnce)',
          'value is a string — prefix/digits/suffix parse via /^(\\D*)(\\d+)(\\D*)$/; keep it one number',
          'The slot direction mirrors the numeric direction: counting up rolls up, draining rolls down; only the landing gets the arrival blue',
          'Real numbers only — update content data when reality changes; a stat is a claim',
          'Dashboards with LIVE values: drive animateSlotText/set() on data change (direction "up"), skipUnchanged keeps stable digits still',
        ]}
      >
        For dashboard-style products, this exact pattern scales to live data: attach a slot-roll
        controller to the numeral and <code>set()</code> on every update — only the digits that
        change will move (the Millis KPI tiles run the same engine). The entrance theater stays
        reserved for marketing surfaces; operational surfaces roll on real change only.
      </AgentNote>
    </DsSection>
  )
}
