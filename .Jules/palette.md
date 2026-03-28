## 2026-03-28 - Semantic HTML Lists for Processes
**Learning:** When rendering sequential steps (like a 'Process' section), using semantic `<ol>` and `<li>` tags instead of generic `<div>` elements significantly improves screen reader accessibility by providing context about the list size and current position.
**Action:** Use `<ol>` and `<li>` for sequential items. Add `aria-hidden="true"` to any purely visual step numbers to avoid redundant screen reader announcements (since the list item itself implies the sequence).
