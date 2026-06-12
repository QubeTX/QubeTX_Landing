import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import CodeBlock from '../CodeBlock'
import AgentNote from '../AgentNote'
import { TerminalFrame, CommandTable, CapabilityRows } from '@/components/terminal'

const SAMPLE_LINES = [
  { text: 'tr300 --title "MACHINE REPORT"', prompt: true },
  { text: 'MOUNTING /SYSTEM/PROBES :: CPU, MEM, DISK, NET' },
  { text: 'COLLECTING 14 DIAGNOSTIC CHANNELS...' },
  { text: 'OS      | WINDOWS 11 24H2' },
  { text: 'CPU     | RYZEN 9 7950X · 32 THREADS @ 4.5 GHZ' },
  { text: 'MEMORY  | 47.8 GIB / 62.7 GIB (76%)' },
  { text: 'REPORT COMPLETE — 0 WARNINGS', accent: true },
]

const COMMANDS = [
  { command: 'tr300', description: 'Run the full machine report' },
  { command: 'tr300 --json', description: 'Structured output for monitoring pipelines' },
  { command: 'tr300 --fast', description: 'Skip the slow collectors' },
  { command: 'tr300 --update', description: 'Self-update to the latest version' },
]

const CAPABILITIES = [
  {
    title: 'Server HTML is the report',
    body: 'Every line is in the static HTML before any JavaScript runs — crawlers, no-JS readers, and reduced-motion users see the complete output instantly.',
  },
  {
    title: 'The print is theater, not data',
    body: 'The boot-print reveal is a client-side curtain over content that already exists. It can never change what the terminal says — only when each line becomes visible.',
  },
  {
    title: 'Real clocks only',
    body: 'Timestamps are stamped at reveal time from the actual system clock, the same honesty contract as the boot screen. Never hard-code fake times.',
  },
]

/**
 * §13 — Terminal surfaces. The technical register's core family,
 * generalized from reports.qubetx.com and retooled onto the v3 system.
 */
export default function TerminalSection() {
  return (
    <DsSection
      id="terminal"
      lede="Product pages speak terminal. These are the canonical surfaces — output frames that boot-print like the loading screen, command references, and capability rows — generalized from reports.qubetx.com and rendered in v3 tokens."
    >
      <DemoPanel caption="TerminalFrame — boot-print render with live timestamps (scroll it into view)">
        <TerminalFrame
          title="TR-300 // Sample output"
          meta="NODE_ID: QBTX-01"
          lines={SAMPLE_LINES}
          timestamps
        />
      </DemoPanel>

      <DemoPanel caption="CommandTable — the command reference">
        <CommandTable rows={COMMANDS} footnote="Run tr300 --help for the full reference." />
      </DemoPanel>

      <DemoPanel caption="CapabilityRows — numbered feature rows">
        <CapabilityRows items={CAPABILITIES} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Final state first',
            body: 'TerminalFrame server-renders every line. The boot-print hides and streams them client-side after first scroll-into-view; reduced motion shows everything immediately. Never feed it content that only exists client-side.',
          },
          {
            title: 'Mono, uppercase, honest',
            body: (
              <>
                Terminal content is IBM Plex Mono. Display text is stored sentence-case and
                uppercased by CSS. Timestamps come from <code>new Date()</code> at reveal — the
                terminal never lies about time.
              </>
            ),
          },
          {
            title: 'Accent lines are landmarks',
            body: (
              <>
                <code>accent: true</code> paints a line in the arrival blue. Use it for completions
                and verdicts — one or two per frame, never decoration.
              </>
            ),
          },
          {
            title: 'Tables are tables',
            body: 'CommandTable renders real table semantics — header cells, scoped columns. Screen readers get a navigable grid, not styled divs.',
          },
          {
            title: 'One owner per line',
            body: 'TerminalFrame owns its lines’ visibility (inline styles + timers). Never point anime, Framer Motion, decode, or the slot roll at nodes inside a printing frame.',
          },
          {
            title: 'Print once',
            body: 'The boot-print fires on the FIRST in-view only (useInViewOnce). Re-printing on every scroll pass reads as a glitch — the report already happened.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — a product page's sample output"
        lang="tsx"
        code={`import { TerminalFrame } from '@/components/terminal'

<TerminalFrame
  title="TR-300 // Sample output"
  meta="NODE_ID: QBTX-01"
  timestamps
  lines={[
    { text: 'tr300 --json', prompt: true },
    { text: 'COLLECTING 14 DIAGNOSTIC CHANNELS...' },
    { text: 'REPORT COMPLETE — 0 WARNINGS', accent: true },
  ]}
/>`}
      />

      <AgentNote
        checklist={[
          'Copy src/components/terminal/ from the kit — it depends only on src/lib/motion + the icons registry',
          'lines[] is the single content source; server HTML must show it all (write tests asserting the text renders)',
          'Use timestamps only for log-flavored output; static reports (tables of values) read better without',
          'Set bootPrint={false} inside modals or tabs that re-mount — the print is for first-scroll reveals',
          'Never nest a TerminalFrame inside PretextBlock; mono lines never wrap-measure',
        ]}
      >
        Building a QubeTX product page (a TR-300-style tool site): the hero terminal is a{' '}
        <code>TerminalFrame</code> with <code>timestamps</code>, the command reference is a{' '}
        <code>CommandTable</code>, the feature list is <code>CapabilityRows</code>. All three are
        server-renderable; only TerminalFrame carries client behavior. Keep sample output REAL —
        run the actual tool and paste its output. The register&apos;s credibility is the
        product&apos;s credibility.
      </AgentNote>
    </DsSection>
  )
}
