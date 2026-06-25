import DsSection from '../DsSection'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import styles from './CheatsheetSection.module.css'

/** §27 — Cheatsheet. The recipes, ready to paste. */
export default function CheatsheetSection() {
  return (
    <DsSection
      id="cheatsheet"
      lede="Every recurring pattern as a paste-ready snippet. Each one assumes the kit layers are in place (§26)."
    >
      <div className={styles.grid}>
        <CodeBlock
          title="Slot roll — flash / set"
          lang="tsx"
          code={`const [ref, label] = useSlotRoll('Copy')
<span ref={ref}>Copy</span>
label.flash('Copied')
label.set('May 2026', { direction: 'up' })`}
        />
        <CodeBlock
          title="Slot roll — declarative"
          lang="tsx"
          code={`<SlotRoll text={status}
  options={{ direction: 'up' }} />
// rolls whenever \`status\` changes`}
        />
        <CodeBlock
          title="Decode a label"
          lang="ts"
          code={`import { decode } from '@/lib/motion/decode'
if (!reduced) decode(el, 450)`}
        />
        <CodeBlock
          title="Reveal a heading"
          lang="tsx"
          code={`<RevealText text="Detail is the product."
  as="h2" mode="words" />`}
        />
        <CodeBlock
          title="Pulse the dot field"
          lang="ts"
          code={`import { firePulse } from '@/components/effects/DotGrid'
firePulse({ x, y, strength: 1.6 })`}
        />
        <CodeBlock
          title="Magnetic CTA"
          lang="tsx"
          code={`<Magnetic strength={6}>
  <OutlineButton href={href} magnetic>
    Get Started
  </OutlineButton>
</Magnetic>`}
        />
        <CodeBlock
          title="Smooth anchor jump"
          lang="tsx"
          code={`const navigate = useAnchorNav(-88)
<a href="#services"
  onClick={(e) => { if (navigate('#services')) e.preventDefault() }}>`}
        />
        <CodeBlock
          title="In-view trigger (once)"
          lang="tsx"
          code={`const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.4 })
useEffect(() => { if (inView && !reduced) play() }, [inView, reduced])`}
        />
        <CodeBlock
          title="Terminal output"
          lang="tsx"
          code={`<TerminalFrame title="TR-300 // Output" timestamps
  lines={[{ text: 'tr300 --json', prompt: true },
          { text: 'REPORT COMPLETE', accent: true }]} />`}
        />
        <CodeBlock
          title="Install + copy"
          lang="tsx"
          code={`<InstallBlock targets={[{ id: 'macos', label: 'macOS',
  command: 'curl -LsSf https://…/install.sh | sh' }]} />`}
        />
        <CodeBlock
          title="Body copy (Pretext)"
          lang="tsx"
          code={`<PretextBlock text={copy} lineHeight={1.65}
  shrinkwrap as="p" className={styles.body}>
  {copy}
</PretextBlock>`}
        />
        <CodeBlock
          title="The gate"
          lang="bash"
          code={`$ npm run lint; npm test; npm run build
# all three green before EVERY commit`}
        />
      </div>

      <AgentNote
        checklist={[
          'Snippets assume the kit imports (@/lib/motion, @/components/terminal, @/lib/pretext)',
          'Every snippet has a fuller treatment in its section — the sidebar numbers match',
          'If a pattern you need is missing here, it goes through §17’s routing table first, then gets added here',
        ]}
      >
        Print this section. Everything above it explains <em>why</em>; this is the muscle memory.
      </AgentNote>
    </DsSection>
  )
}
