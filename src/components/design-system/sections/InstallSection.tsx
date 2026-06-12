import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import CodeBlock from '../CodeBlock'
import AgentNote from '../AgentNote'
import { InstallBlock, DownloadCard } from '@/components/terminal'
import { DS_KIT_FILENAME, DS_KIT_URL, DS_VERSION } from '@/data/designSystem'

const TARGETS = [
  {
    id: 'macos',
    label: 'macOS',
    command: 'curl -LsSf https://reports.qubetx.com/install.sh | sh',
  },
  {
    id: 'linux',
    label: 'Linux',
    command: 'curl -LsSf https://reports.qubetx.com/install.sh | sh',
  },
  {
    id: 'windows',
    label: 'Windows',
    command: 'iwr https://reports.qubetx.com/install.ps1 | iex',
    note: 'PowerShell 7+ recommended; the script installs to the user profile.',
  },
]

/**
 * §14 — Install & download. The canonical layouts every product page will
 * reuse: OS-tabbed install commands with the slot-roll copy confirmation,
 * and the one-action download row.
 */
export default function InstallSection() {
  return (
    <DsSection
      id="install"
      lede="Every QubeTX product ends the same way: an initialize section and a download. These are the canonical layouts — the copy button is the slot roll's home game."
    >
      <DemoPanel caption="InstallBlock — OS tabs, prompt, copy → Copied (the canonical slot-roll flash)">
        <InstallBlock targets={TARGETS} />
      </DemoPanel>

      <DemoPanel caption="DownloadCard — one artifact, one action (this one is real)">
        <DownloadCard
          name="Design-system kit"
          meta={`v${DS_VERSION} · zip · tokens + fonts + source + agent docs`}
          href={DS_KIT_URL}
          downloadName={DS_KIT_FILENAME}
          description="The same artifact as the sidebar button: everything a new QubeTX project copies on day one."
        />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Copy is a slot roll',
            body: (
              <>
                The copy button&apos;s label flashes <code>Copy → Copied</code> via{' '}
                <code>useSlotRoll().flash()</code> and auto-reverts. This is the standard copy
                confirmation on every QubeTX surface — never a toast, never an alert.
              </>
            ),
          },
          {
            title: 'Commands are real',
            body: 'Whatever the install block shows must work verbatim in a fresh shell today. Test the command before shipping the page; nothing erodes a tool site faster than a broken curl line.',
          },
          {
            title: 'One action per card',
            body: 'A DownloadCard carries exactly one artifact and one button. Multiple downloads = multiple cards, stacked — never a dropdown of formats.',
          },
          {
            title: 'Tabs are tabs',
            body: 'OS pills use real tablist/tab/tabpanel semantics with an FM layoutId fill gliding between them. Keyboard users switch targets without a pointer.',
          },
          {
            title: 'Reserve the flash width',
            body: 'The copy label reserves its widest flash ("Copied") in CSS — the roll never resizes the button, so the revert (1.4s later, outside the CLS input window) shifts nothing.',
          },
          {
            title: 'Failure is honest',
            body: (
              <>
                If the clipboard is unavailable the label flashes <code>Failed</code> — never a
                silent no-op, never a fake success.
              </>
            ),
          },
        ]}
      />

      <CodeBlock
        title="Recipe — a product page's initialize section"
        lang="tsx"
        code={`import { InstallBlock, DownloadCard } from '@/components/terminal'

<InstallBlock
  title="Initialize"
  targets={[
    { id: 'macos', label: 'macOS', command: 'curl -LsSf https://…/install.sh | sh' },
    { id: 'windows', label: 'Windows', command: 'iwr https://…/install.ps1 | iex' },
  ]}
/>

<DownloadCard
  name="TR-300 binary"
  meta="v2.4 · zip · windows + macos + linux"
  href="/downloads/tr300.zip"
/>`}
      />

      <AgentNote
        checklist={[
          'InstallBlock + DownloadCard come with src/components/terminal/ in the kit',
          'Keep target ids stable (macos/linux/windows) — analytics and deep links may key on them',
          'The flash labels are sentence case ("Copied", "Failed") — CSS uppercases them',
          'navigator.clipboard needs a secure context; the Failed flash covers http/file fallbacks',
          'Put the install block ABOVE the download card — command-line first is the QubeTX posture',
        ]}
      >
        Future product sites (NB-300 and beyond) reuse this section verbatim: an{' '}
        <code>InstallBlock</code> with per-OS commands, then <code>DownloadCard</code>s for the
        artifacts. Both are in the kit. The layout intentionally matches reports.qubetx.com&apos;s
        INITIALIZE anatomy so migrating those pages to v3 is a re-skin, not a redesign.
      </AgentNote>
    </DsSection>
  )
}
