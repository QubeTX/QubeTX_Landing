/**
 * Design-system page registry — the single source of truth for the
 * `/design-system` route's structure. The sidebar, the section rail, the
 * page assembly, and the structural tests all derive from DS_SECTIONS;
 * adding a section here is the ONLY place structure changes.
 */

/** Kept in lockstep with package.json — asserted by a unit test. */
export const DS_VERSION = '3.3.0'
export const DS_DATE = 'June 2026'

export type DsGroup =
  | 'Showcase'
  | 'Editorial'
  | 'Tokens'
  | 'Components'
  | 'Motion'
  | 'Patterns'

export type DsSectionMeta = {
  /** Anchor id (section element id / sidebar href / rail tick). */
  id: string
  /** Two-digit ordinal shown in the sidebar and section eyebrows. */
  num: string
  group: DsGroup
  /** Short sidebar label. */
  label: string
  /** Section display title. */
  title: string
}

export const DS_SECTIONS: DsSectionMeta[] = [
  { id: 'top', num: '00', group: 'Showcase', label: 'Cover', title: 'QubeTX Design System' },

  { id: 'principles', num: '01', group: 'Editorial', label: 'Principles', title: 'The seven principles' },
  { id: 'signature', num: '02', group: 'Editorial', label: 'Signature', title: 'The signature' },
  { id: 'registers', num: '03', group: 'Editorial', label: 'Registers', title: 'The two registers' },

  { id: 'color', num: '04', group: 'Tokens', label: 'Color', title: 'Color' },
  { id: 'typography', num: '05', group: 'Tokens', label: 'Typography', title: 'Typography' },
  { id: 'spacing', num: '06', group: 'Tokens', label: 'Spacing', title: 'Spacing & structure' },
  { id: 'motion-tokens', num: '07', group: 'Tokens', label: 'Motion tokens', title: 'Motion tokens' },
  { id: 'icons', num: '08', group: 'Tokens', label: 'Iconography', title: 'Iconography & glyphs' },

  { id: 'buttons', num: '09', group: 'Components', label: 'Buttons & links', title: 'Buttons & links' },
  { id: 'pills', num: '10', group: 'Components', label: 'Pills & labels', title: 'Pills & labels' },
  { id: 'cards', num: '11', group: 'Components', label: 'Cards', title: 'Cards' },
  { id: 'stats', num: '12', group: 'Components', label: 'Stats & KPIs', title: 'Stats & KPIs' },
  { id: 'terminal', num: '13', group: 'Components', label: 'Terminal surfaces', title: 'Terminal surfaces' },
  { id: 'install', num: '14', group: 'Components', label: 'Install & download', title: 'Install & download' },
  { id: 'chrome', num: '15', group: 'Components', label: 'Site chrome', title: 'Site chrome' },
  { id: 'modal', num: '16', group: 'Components', label: 'Modal & dialog', title: 'Modal & dialog' },

  { id: 'doctrine', num: '17', group: 'Motion', label: 'The doctrine', title: 'The motion doctrine' },
  { id: 'slot-roll', num: '18', group: 'Motion', label: 'Slot roll', title: 'The slot roll' },
  { id: 'text-motion', num: '19', group: 'Motion', label: 'Text systems', title: 'Text systems' },
  { id: 'dot-field', num: '20', group: 'Motion', label: 'Dot field', title: 'The dot field' },
  { id: 'scroll', num: '21', group: 'Motion', label: 'Scroll systems', title: 'Scroll systems' },
  { id: 'scrollbar', num: '22', group: 'Motion', label: 'Scrollbar', title: 'The brand scrollbar' },
  { id: 'cursor', num: '23', group: 'Motion', label: 'Cursor & pointer', title: 'Cursor & pointer' },
  { id: 'boot', num: '24', group: 'Motion', label: 'Boot & load', title: 'Boot & load' },

  { id: 'pretext', num: '25', group: 'Patterns', label: 'Pretext', title: 'Text that knows its shape' },
  { id: 'playbook', num: '26', group: 'Patterns', label: 'Agent playbook', title: 'The agent playbook' },
  { id: 'cheatsheet', num: '27', group: 'Patterns', label: 'Cheatsheet', title: 'Cheatsheet' },
]

/** Sidebar/rail group order (derived once — registry order is canonical). */
export const DS_GROUPS: DsGroup[] = ['Showcase', 'Editorial', 'Tokens', 'Components', 'Motion', 'Patterns']

/**
 * The kit download. The URL is version-STABLE so it can be copied and
 * referenced externally (docs, skills, other agents) and always serve the
 * current build; the versioned filename is applied at save time via the
 * link's `download` attribute.
 */
export const DS_KIT_URL = '/qubetx-design-system.zip'
export const DS_KIT_FILENAME = `qubetx-design-system-v${DS_VERSION}.zip`
