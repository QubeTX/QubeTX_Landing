# Palette's Journal

## 2024-03-24 - Initial Review
**Learning:** Evaluated the QubeTX landing page codebase for accessibility and UX micro-interactions.
**Action:** Starting to implement a daily UX enhancement based on observations.

## 2024-03-24 - Custom Cursors and Keyboard Accessibility
**Learning:** Found that the app uses custom cursors and disables the native cursor using CSS (`cursor: none`). While visually appealing for mouse users, this pattern inadvertently neglects keyboard accessibility unless `:focus-visible` styles are explicitly maintained globally. Additionally, a skip-to-content link is crucial for keyboard users to bypass long navigation headers.
**Action:** Added global `:focus-visible` styles in `globals.css` and a `sr-only` skip-to-content link in `app/page.tsx` that becomes visible on focus.
