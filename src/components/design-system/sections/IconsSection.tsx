import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import {
  SERVICE_ICONS,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Copy,
  Download,
  Menu,
  X,
} from '@/components/ui/icons'
import { CommandTable } from '@/components/terminal'
import styles from './IconsSection.module.css'

const GLYPHS = [
  { command: '⠿', description: 'Braille block — the services TextLink glyph (texture, not language)' },
  { command: '▮', description: 'Block cursor — terminal prompts (CSS blink, aria-hidden)' },
  { command: '↗ / ↑', description: 'External visit chips / back-to-top arrow' },
  { command: '[ ]', description: 'Bracket hovers on header nav — pseudo-elements, never typed' },
  { command: '// ·', description: 'Mono separators: "04 // About us", "v3.1.0 · June 2026"' },
]

const CHROME_ICONS = [
  { icon: ArrowRight, name: 'ArrowRight' },
  { icon: ArrowUpRight, name: 'ArrowUpRight' },
  { icon: ChevronDown, name: 'ChevronDown' },
  { icon: Menu, name: 'Menu' },
  { icon: X, name: 'X' },
  { icon: Download, name: 'Download' },
  { icon: Copy, name: 'Copy' },
]

/** §08 — Iconography & glyphs. Stroked Lucide + the cube + mono glyphs. */
export default function IconsSection() {
  return (
    <DsSection
      id="icons"
      lede="One icon library (Lucide), one rendering rule (20px, strokeWidth 1.5, aria-hidden), one logo (the stroke cube), and a small set of mono glyphs that carry the terminal flavor."
    >
      <DemoPanel caption="The registry — SERVICE_ICONS + chrome icons (20px / 1.5 stroke)">
        <div className={styles.iconGrid}>
          {Object.entries(SERVICE_ICONS).map(([key, Icon]) => (
            <div key={key} className={styles.iconCell}>
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>{key}</span>
            </div>
          ))}
          {CHROME_ICONS.map(({ icon: Icon, name }) => (
            <div key={name} className={styles.iconCell}>
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </DemoPanel>

      <DemoPanel caption="The cube — stroke-only, drawable paths" center>
        <div className={styles.logoRow}>
          <QubeTXLogo className={styles.logoSm} />
          <QubeTXLogo className={styles.logoMd} />
          <QubeTXLogo className={styles.logoLg} />
        </div>
      </DemoPanel>

      <DemoPanel caption="Mono glyph set">
        <CommandTable rows={GLYPHS} headers={['Glyph', 'Where it lives']} />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: '20px, 1.5 stroke, aria-hidden',
            body: 'Every Lucide icon renders at 20px with strokeWidth 1.5 and aria-hidden — the stroke weight matches the cube. Icons never carry meaning alone; the adjacent text does.',
          },
          {
            title: 'String-keyed registry',
            body: (
              <>
                Content data stores icon KEYS (<code>icon: &apos;cloud&apos;</code>);{' '}
                <code>SERVICE_ICONS[key]</code> resolves the component. content.ts stays
                serializable.
              </>
            ),
          },
          {
            title: 'The cube is stroke, never fill',
            body: (
              <>
                QubeTXLogo paths are <code>svg.createDrawable</code>-friendly (the redraw moment
                depends on it). Recolor via <code>currentColor</code>/props — never add fills.
              </>
            ),
          },
          {
            title: 'Glyphs are texture',
            body: 'The mono glyphs (⠿ ▮ //) are decoration in the terminal register — always aria-hidden, never load-bearing for meaning.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — icons in a new project"
        lang="tsx"
        code={`import { SERVICE_ICONS, ArrowRight } from '@/components/ui/icons'

const Icon = SERVICE_ICONS[service.icon]   // key from content.ts
<Icon size={20} strokeWidth={1.5} aria-hidden="true" />

// New icon? Add it to the registry file — never import lucide-react
// directly in components (one seam keeps the inventory auditable).`}
      />

      <AgentNote
        checklist={[
          'Copy src/components/ui/icons.ts + QubeTXLogo.tsx from the kit; npm install lucide-react',
          'All lucide imports flow through icons.ts — direct imports in components are a review flag',
          'The cube needs its aspect ratio (viewBox 0 0 218 233) — size via width/height in CSS, never stretch',
          'Decorative glyphs get aria-hidden plus a sr-only twin when adjacent meaning is needed',
        ]}
      >
        Iconography is deliberately quiet: stroked, small, and always subordinate to mono text.
        If a new surface wants a big illustrative icon, that&apos;s the dot field&apos;s or the
        cube&apos;s job instead — QubeTX illustrates with <strong>geometry and motion</strong>,
        not pictograms.
      </AgentNote>
    </DsSection>
  )
}
