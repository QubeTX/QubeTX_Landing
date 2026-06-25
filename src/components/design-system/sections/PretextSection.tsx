import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import PretextDemo from '../PretextDemo'

/** §25 — Pretext. DOM-free text measurement and the laws around it. */
export default function PretextSection() {
  return (
    <DsSection
      id="pretext"
      lede="Text that knows its shape before the DOM does: canvas measureText as ground truth, then pure arithmetic. Heights are reserved so async copy never shifts layout; left-aligned paragraphs shrinkwrap so no orphan word wraps alone."
    >
      <DemoPanel caption="Live — drag the width; measured, then shrinkwrapped">
        <PretextDemo />
      </DemoPanel>

      <RuleGrid
        prefix="LAW"
        rules={[
          {
            title: 'No ResizeObserver. Ever.',
            body: (
              <>
                It oscillates with shrinkwrap (measure → narrow → re-measure → loop). All reflows
                go through <code>resizeCoordinator</code> — sync clientWidth reads coalesced into
                one rAF per window resize.
              </>
            ),
          },
          {
            title: 'Shrinkwrap left-aligned only',
            body: 'Narrowing a centered block’s max-width pulls it off-center. Centered text gets min-height reservation only.',
          },
          {
            title: 'Never measure letter-spaced text',
            body: 'Canvas measurement ignores letter-spacing — mono pills, eyebrows, and nav labels are banned from Pretext.',
          },
          {
            title: 'Computed font names',
            body: (
              <>
                next/font rewrites family names; <code>PretextProvider</code> resolves COMPUTED
                names for its readiness check (literal names silently never match — that bug once
                forced a permanent 3s degradation).
              </>
            ),
          },
          {
            title: 'Whole blocks animate',
            body: 'Pretext-wrapped text moves as a single block (opacity/transform). Per-char splitting belongs to RevealText on headings the page owns.',
          },
          {
            title: 'Degrade to plain text',
            body: 'Fonts not ready (3s timeout), <1024px for RoutedText, or no JS → the plain paragraph renders. Pretext is enhancement, never a dependency.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — body text that never shifts"
        lang="tsx"
        code={`import { PretextBlock } from '@/lib/pretext'

<PretextBlock text={copy} lineHeight={1.65} shrinkwrap as="p" className={styles.body}>
  {copy}
</PretextBlock>
// shrinkwrap ONLY because this paragraph is left-aligned.
// The advanced API (RoutedText): prepareWithSegments + layoutNextLine
// flows the About lead around the logo cube — see the home page live.`}
      />

      <AgentNote
        checklist={[
          'Kit ships src/lib/pretext (provider, block, resizeCoordinator, useContainerWidth); npm install @chenglou/pretext',
          'Wrap the app in <PretextProvider> once; it needs the kit’s transpilePackages + allowImportingTsExtensions config notes',
          'Every wrapping body paragraph goes through PretextBlock with min-height; add shrinkwrap only when left-aligned',
          'Tests: setup.ts auto-mocks @/lib/pretext — components must render correct final text with mocks active',
        ]}
      >
        Pretext is why the site scores CLS 0.000 with two custom fonts: heights exist before
        paint. The laws above are absolute — especially the ResizeObserver ban, which protects
        every OTHER system on the page (the canvas boards rebuild through the same coordinator).
      </AgentNote>
    </DsSection>
  )
}
