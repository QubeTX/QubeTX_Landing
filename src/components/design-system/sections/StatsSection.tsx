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
      lede="A QubeTX stat doesn't fade in — it lands. The numeral slot-machines through scrambled values and settles in arrival blue; hovering re-verifies it (terminal flavor: numbers you can interrogate). Scroll these into view, then hover them."
    >
      <DemoPanel caption="StatValue — slot-machine entrance + hover re-verify (the About-section band)">
        <div className={styles.kpiBand}>
          <StatValue value="07" label="Client Projects" />
          <StatValue value="05" label="Products Shipped" />
          <StatValue value="100%" label="In-House" />
        </div>
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'The entrance is a roll, not a count',
            body: 'First view: three scrambled quiet rolls (~300ms apart) land on the real value with the arrival-blue flash. The scrambles keep digit count and prefix/suffix — "100%" scrambles as three digits + %.',
          },
          {
            title: 'Re-verify on hover',
            body: 'Mouse hover re-rolls through two scrambles back to the SAME value while the label scramble-decodes. Re-verification is repeatable and never changes the number — that’s the point.',
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
