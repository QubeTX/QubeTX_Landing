## 2024-03-24 - Custom Cursor Keyboard Navigation
**Learning:** When using custom cursors that hide the native cursor (e.g. `cursor: none` applied to `body *`), keyboard users face significant challenges tracking focus unless robust `:focus-visible` styles and skip links are present. In many modern Next.js implementations, focus styles can get inadvertently suppressed by the lack of a native indicator.
**Action:** When working on sites with custom cursors, always verify there are explicit global focus styles and skip-to-content links to ensure keyboard accessibility.
