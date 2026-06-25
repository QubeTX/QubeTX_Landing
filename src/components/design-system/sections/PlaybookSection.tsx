import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import { CapabilityRows, CommandTable } from '@/components/terminal'

const BOOTSTRAP = [
  {
    title: 'Scaffold + dependencies',
    body: 'create-next-app (TypeScript, App Router, no Tailwind unless wanted — the system is tokens + CSS Modules), then: npm install animejs framer-motion lenis clsx lucide-react @chenglou/pretext. Static export? Set output: "export".',
  },
  {
    title: 'Copy the kit layers',
    body: 'From the kit zip: src/lib/motion + src/lib/pretext + src/hooks + src/fonts + src/components/ui + src/components/terminal + src/test. Paste the tokens block from tokens/qubetx-tokens.css into app/globals.css.',
  },
  {
    title: 'Wire the providers',
    body: 'layout.tsx: font variables on <body> (makira + plexMono), then <PretextProvider><SmoothScroll><CustomCursor />{children}</SmoothScroll></PretextProvider>. Add suppressHydrationWarning to <html> if you use the FOUC guard.',
  },
  {
    title: 'Wire the test harness',
    body: 'Copy vitest.config.ts conventions + src/test/setup.ts (mocks for pretext, framer-motion, animejs, lenis; IO + matchMedia stubs). Components are tested as final-state DOM with all mocks active.',
  },
  {
    title: 'Pick the register, build the page',
    body: 'Persuading → landing register (§03). Operating → technical register (§13–14). Compose from the live components; copy from the cheatsheet (§27); route every motion decision through §17–19.',
  },
  {
    title: 'Run the gate. Every commit.',
    body: 'npm run lint; npm test; npm run build — all three, before every commit, no exceptions. Then verify motion in a real Chrome session: jsdom cannot exercise canvas, anime, or Lenis paths.',
  },
]

const ROUTING = [
  { command: 'A label that changes', description: '§18 — useSlotRoll / SlotRoll. Always.' },
  { command: 'A button or link', description: '§09 — OutlineButton / TextLink + the destination rule' },
  { command: 'A product/tool page', description: '§13–14 — TerminalFrame, CommandTable, InstallBlock, DownloadCard' },
  { command: 'A heading arriving', description: '§19 — RevealText (words). Pill labels decode' },
  { command: 'Body copy that wraps', description: '§25 — PretextBlock (min-height; shrinkwrap if left-aligned)' },
  { command: 'A card grid', description: '§11 — pick the species by job; glow lives on the grid' },
  { command: 'A canvas surface', description: '§20 — plain-object animation + pure math + dumb blitter' },
  { command: 'Scroll behavior', description: '§21 — IO for triggers, Lenis for scrubbing, useAnchorNav for jumps' },
  { command: 'A live status / KPI', description: '§12 — StatValue pattern; set() on real change only' },
  { command: 'First-load theater', description: '§24 — opt-in; copy the boot CONTRACT, not just the look' },
]

/** §26 — The agent playbook. From empty directory to QubeTX-grade. */
export default function PlaybookSection() {
  return (
    <DsSection
      id="playbook"
      lede="The page so far is the WHAT; this is the DO. A coding agent starting a new QubeTX project follows these six steps, routes every feature through the table, and ships nothing that fails the checklist. The kit's SKILL.md carries this same playbook offline."
    >
      <DemoPanel caption="Bootstrap — empty directory to running system">
        <CapabilityRows items={BOOTSTRAP} />
      </DemoPanel>

      <CodeBlock
        title="The whole setup, as commands"
        lang="bash"
        code={`$ npx create-next-app@latest my-qubetx-app --typescript --app --no-tailwind
$ cd my-qubetx-app
$ npm install animejs framer-motion lenis clsx lucide-react @chenglou/pretext
$ npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
# unzip the kit, then copy:
#   src/lib/motion src/lib/pretext src/hooks src/fonts
#   src/components/ui src/components/terminal src/test
#   tokens/qubetx-tokens.css → merge into app/globals.css
$ npm run lint; npm test; npm run build   # the gate — green before you build features`}
      />

      <DemoPanel caption="Task routing — building X? Go to §Y">
        <CommandTable rows={ROUTING} headers={['Building…', 'Section / system']} />
      </DemoPanel>

      <RuleGrid
        prefix="CHECK"
        rules={[
          {
            title: 'Final-state DOM test per surface',
            body: 'Every new component ships with a test asserting its server-rendered text/structure with all mocks active.',
          },
          {
            title: 'Reduced-motion path in the same commit',
            body: 'Any motion feature includes its skip-to-final-state path and (where applicable) a test for it.',
          },
          {
            title: 'Ownership named in review',
            body: 'PR descriptions for motion work name the owner of every animated property. Two writers = redesign.',
          },
          {
            title: 'Real-browser verification',
            body: 'Canvas/anime/Lenis features are verified in actual Chrome (probes, traces) before "done" — jsdom passing is necessary, never sufficient.',
          },
          {
            title: 'Lighthouse floors',
            body: '100 a11y / 100 best-practices / 100 SEO and real-navigation CLS 0.000 are floors, not targets. A regression blocks the merge.',
          },
          {
            title: 'Docs move with the code',
            body: 'New tokens, components, or laws update DESIGN_SYSTEM.md (and this page) in the same PR. The system of record never lags the system.',
          },
        ]}
      />

      <AgentNote
        checklist={[
          'The kit zip (sidebar button) contains this playbook as SKILL.md + MOTION_GUIDE.md + the full source layers',
          'DESIGN_SYSTEM.md in the landing repo is the spec of record; this page is its living render',
          'When the page and the kit disagree with the repo, the repo wins — then fix the page and kit in the same change',
          'Questions the table doesn’t answer get decided from the seven principles (§01)',
        ]}
      >
        This section exists so that &quot;make it QubeTX&quot; is an executable instruction. An
        agent with the kit and this page needs no other context to produce a surface that belongs
        to the family — and no permission to skip the gate.
      </AgentNote>
    </DsSection>
  )
}
