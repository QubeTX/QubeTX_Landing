import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import SysStatus from '@/components/layout/SysStatus'
import { CommandTable } from '@/components/terminal'

const HEADER_ANATOMY = [
  { command: 'useScrolled(24)', description: 'Past 24px → data-scrolled: backdrop blur, hairline, height compresses to 60px' },
  { command: 'useActiveSection(ids)', description: 'IO scroll-spy (40% focal band) feeding the FM layoutId="nav-active" underline' },
  { command: '[ bracket ] hovers', description: 'Pseudo-element brackets fade/slide in 150ms — CSS only, with :focus-visible twins' },
  { command: 'NavDropdown', description: 'Disclosure (not ARIA menu): Enter/ArrowDown open, Escape closes + refocuses, outside-click closes, FM clip-path + stagger' },
  { command: 'MobileMenu (<1024px)', description: 'Full-screen overlay PORTALED to document.body (a transformed/filtered ancestor would shrink inset:0 — gotcha #14), focus trap, Lenis stop/start' },
  { command: 'data-load="header"', description: 'Entrance belongs to LoadSequence (anime timeline) — never FM on those nodes' },
]

/** §15 — Site chrome. Header, dropdown, mobile overlay, footer, status. */
export default function ChromeSection() {
  return (
    <DsSection
      id="chrome"
      lede="The frame around every page: a fixed three-zone header with scroll-spy, a disclosure dropdown, a portaled mobile overlay, and a footer that ends with a heartbeat. The header and menu are live one click away — the home page is their specimen."
    >
      <DemoPanel caption="Header anatomy — live on the home page (open qubetx.com and scroll)">
        <CommandTable rows={HEADER_ANATOMY} headers={['Mechanism', 'Behavior']} />
      </DemoPanel>

      <DemoPanel caption="SysStatus — the footer heartbeat, live (cycles every 7s while visible)" center>
        <SysStatus />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Fixed chrome is the only blur',
            body: 'The scrolled header’s backdrop-filter is the single allowed backdrop-filter on the site (the cursor never blurs, panels never blur). Budget: one.',
          },
          {
            title: 'Overlays portal to body',
            body: 'Any fullscreen position:fixed overlay must createPortal to document.body — LoadSequence leaves identity transforms on [data-load] ancestors, and a transformed ancestor becomes the containing block (this silently collapsed the mobile menu once; never again).',
          },
          {
            title: 'Anchor nav goes through Lenis',
            body: (
              <>
                Every in-page link calls <code>useAnchorNav()</code> (lenis.scrollTo, −88px
                offset). CSS <code>scroll-behavior: smooth</code> is intentionally absent —
                one scroll driver.
              </>
            ),
          },
          {
            title: 'The footer ends with state',
            body: 'Nav columns (letter-roll labels) → stroked wordmark (per-char rise) → bottom bar: copyright · SYS_STATUS heartbeat · the Konami hint. Decorative status is aria-hidden and pauses offscreen/hidden-tab/reduced.',
          },
          {
            title: 'Skip link first',
            body: 'The first focusable element on every page is the “Skip to content” link targeting #main-content.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — scroll-spy nav underline"
        lang="tsx"
        code={`const active = useActiveSection(SECTION_IDS)

{NAV_ITEMS.map((item) => (
  <a key={item.href} href={item.href} data-active={active === item.id || undefined}>
    {item.label}
    {active === item.id && (
      <motion.span layoutId="nav-active" className={styles.underline} />
    )}
  </a>
))}`}
      />

      <AgentNote
        checklist={[
          'Header/NavDropdown/MobileMenu/Footer are reference implementations — copy and re-skin, keep the mechanisms',
          'Keyboard contract is non-negotiable: dropdown (Enter/ArrowDown/Escape+refocus), overlay (trap + restore), all hovers have :focus-visible twins',
          'The sidebar on THIS page is the chrome pattern for documentation surfaces — grouped nav + useActiveSection',
          'SysStatus is the template for any ambient status line: in-view + tab-visible gating, sizer-stack width, aria-hidden',
        ]}
      >
        Chrome is where a11y is won or lost. The patterns here all passed Lighthouse 100 with
        keyboard-only walkthroughs — when building new chrome, start from these files rather than
        from scratch, and keep the <strong>portal rule</strong> taped to the monitor: fixed
        overlay → <code>document.body</code>, always.
      </AgentNote>
    </DsSection>
  )
}
