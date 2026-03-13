# Palette's Journal

## 2026-03-13 - Focus Styles with Custom Cursors
**Learning:** The project's custom cursor implementation hides the native browser cursor (`cursor: none`), which obscures standard focus tracking unless explicit visual indicators are maintained.
**Action:** Always verify and enforce global `:focus-visible` styles with a high-contrast outline (e.g., `outline: 2px solid var(--primary-blue)`) so keyboard users can navigate the UI reliably.
