import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import ModalDemo from '../ModalDemo'

/** §16 — Modal & dialog. The house overlay primitive: portal, focus trap,
 *  scrim, Lenis pause. The QubeTX answer to the reference kits' modal. */
export default function ModalSection() {
  return (
    <DsSection
      id="modal"
      lede="One controlled primitive for every dialog: a deep-void panel on a dimmed scrim, centered on desktop and a bottom sheet under 600px. It reuses the proven MobileMenu mechanics — body-portal past transformed ancestors, Framer Motion presence, focus trap, Esc and scrim dismiss, focus return, scroll lock with Lenis paused. Drive `open` from the parent; everything else is handled."
    >
      <DemoPanel caption="The dialog — open one and try Esc, the scrim, Tab, and the X">
        <ModalDemo />
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Portal past transforms',
            body: (
              <>
                The panel renders through <code>createPortal</code> to{' '}
                <code>document.body</code> (gotcha #14) — a transformed or backdrop-filtered
                ancestor would otherwise re-base <code>position:fixed</code> to its own box.
              </>
            ),
          },
          {
            title: 'Presence is Framer Motion',
            body: (
              <>
                Enter/exit ride <code>AnimatePresence</code> (presence is FM’s job, never anime).
                The portal is an AnimatePresence child so exit still plays — PresenceContext
                crosses portals.
              </>
            ),
          },
          {
            title: 'Trap, Esc, return',
            body: 'Focus moves into the panel on open, Tab cycles within it, Escape and a scrim click close, and focus returns to the trigger on close. role="dialog" + aria-modal + aria-labelledby.',
          },
          {
            title: 'Lock the scroll, pause Lenis',
            body: (
              <>
                While open: <code>body overflow:hidden</code> + <code>lenis.stop()</code>; on close,
                both reverse. The same pattern MobileMenu uses — overlays must pause the single
                scroll driver, not fight it.
              </>
            ),
          },
          {
            title: 'Reduced motion = instant',
            body: 'Under prefers-reduced-motion the scrim and panel skip the rise/scale and appear at their final state — open is open, never a slower open.',
          },
          {
            title: 'Sheet on small screens',
            body: 'Under 600px the centered card becomes a bottom sheet (full width, rounded top) — the reference behavior, the thumb-reachable shape on phones.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — a confirm dialog"
        lang="tsx"
        code={`const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>Delete…</button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  eyebrow="Destructive"
  title="Delete this deployment?"
  actions={
    <>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={confirmDelete}>Delete</button>
    </>
  }
>
  This cannot be undone.
</Modal>`}
      />

      <AgentNote
        checklist={[
          'Kit ships Modal (src/components/ui) — controlled: drive `open`, handle `onClose`',
          'Always pass a real `title` (it becomes the accessible name via aria-labelledby)',
          'Put primary/destructive buttons in `actions`; keep the body to one idea',
          'Never hand-roll a fixed overlay — it will break under a transformed ancestor; use Modal (or MobileMenu for nav) so it portals to body',
          'Destructive actions: gate the confirm button on a typed token (the type-to-confirm demo) — honest friction, never a silent delete',
        ]}
      >
        Modal and MobileMenu are the same overlay instinct: portal to body, pause Lenis, trap
        focus, restore on close. MobileMenu is the navigation specialization; Modal is the general
        primitive. If you find yourself adding a third fixed overlay, extract the shared
        focus-trap/scroll-lock into a hook rather than copying the effect a third time — but never
        regress the body-portal rule, which is the one that silently breaks.
      </AgentNote>
    </DsSection>
  )
}
