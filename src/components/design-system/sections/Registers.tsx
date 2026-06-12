import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import AgentNote from '../AgentNote'
import { CommandTable } from '@/components/terminal'

const ROUTING = [
  { command: 'Marketing / landing surface', description: 'Landing register: hero + dot field, editorial sections, cards, the full entrance choreography' },
  { command: 'Product / tool page', description: 'Technical register: TerminalFrame hero, CapabilityRows, CommandTable, InstallBlock + DownloadCard (§13–14)' },
  { command: 'Documentation surface', description: 'This page’s chrome: grouped sidebar + numbered sections + live specimens + the rail' },
  { command: 'Dashboard / live data', description: 'Technical register + live slot rolls on changing values (§12, §17) — no entrance theater' },
]

/** §03 — The two registers. One system, two voices. */
export default function Registers() {
  return (
    <DsSection
      id="registers"
      lede="One token set, two voices. The landing register persuades — editorial sections, choreographed entrances, the dot field. The technical register operates — terminals, tables, install blocks. Both are v3; the difference is posture, not palette."
    >
      <DemoPanel caption="Choosing a register">
        <CommandTable rows={ROUTING} headers={['Surface', 'Register & sections']} />
      </DemoPanel>

      <AgentNote
        checklist={[
          'Both registers share ALL tokens (§04–08) and the motion doctrine (§16) — never fork the palette per register',
          'reports.qubetx.com predates v3 — its layouts are canonized in §13–14; its colors are NOT part of this system and will migrate',
          'Mixing registers on one page is normal (the landing’s Products section is technical-register rows inside an editorial page) — mixing within one component is not',
        ]}
      >
        The register decision comes first on any new project: it picks the hero pattern, the
        section anatomy, and how much motion theater is appropriate. When in doubt, ask what the
        page DOES — pages that persuade get the landing register; pages that operate get the
        technical one. Everything else on this page works in both.
      </AgentNote>
    </DsSection>
  )
}
