import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import LabelPill from '@/components/ui/LabelPill'
import styles from './PillsSection.module.css'

/** §10 — Pills & labels. The mono chips that label everything. */
export default function PillsSection() {
  return (
    <DsSection
      id="pills"
      lede="Every region of a QubeTX surface is named by a small mono label: pills, bars, eyebrows, status chips. The heading above this paragraph is the SectionHeading composite — pill decode, word-rise title, gradient rule — documenting itself."
    >
      <DemoPanel caption="LabelPill — pill and bar variants" center>
        <LabelPill>04 // About us</LabelPill>
        <LabelPill variant="bar">Web Development &amp; Digital Infrastructure</LabelPill>
      </DemoPanel>

      <DemoPanel caption="Status chips — the product-row states (source of truth: ProductCard.module.css)" center>
        <span className={styles.statusStable}>STABLE</span>
        <span className={styles.statusActive}>ACTIVE</span>
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'One label spec',
            body: (
              <>
                <code>--text-mono-label</code>: 0.7rem Plex Mono, 0.12em tracking, uppercase via
                CSS, <code>--color-text-dim</code> ink. Pills add a 1px border; bars add a 2px
                blue left rule and blue ink.
              </>
            ),
          },
          {
            title: 'Never Pretext-measured',
            body: 'Letter-spaced labels are banned from Pretext (canvas measurement ignores tracking). Pills size themselves with padding; they never shrinkwrap.',
          },
          {
            title: 'Status is binary and earned',
            body: 'STABLE (green) and ACTIVE (blue) are the only product states. A status chip reflects reality at publish time — it is data, not decoration.',
          },
          {
            title: 'SectionHeading is the one heading system',
            body: 'label + title + optional subtitle/aside. The pill decodes on first view, the title rises word-by-word, the rule draws — one IO trigger for the composite; reduced motion renders it static.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — labels and headings"
        lang="tsx"
        code={`<LabelPill>02 // Product line</LabelPill>
<LabelPill variant="bar">Web Development & Digital Infrastructure</LabelPill>

<SectionHeading
  label="01 // Services"
  title="What we build"
  subtitle="Web development, infrastructure, and everything that keeps both running."
/>`}
      />

      <AgentNote
        checklist={[
          'LabelPill + SectionHeading ship in the kit ui/ folder',
          'Label text pattern: "NN // Name" for sections, plain phrases for eyebrows',
          'Status chips: copy the two-state pattern; new states need a palette row first (§04)',
          'The decode on pill text targets a span INSIDE the pill — decode never runs on a node another engine owns',
        ]}
      >
        Labels are the system&apos;s wayfinding: a surface without a mono label floats; a surface
        with three competing ones shouts. The rhythm that works: <strong>one pill or bar per
        region</strong>, one eyebrow per heading, statuses only where state genuinely exists.
      </AgentNote>
    </DsSection>
  )
}
