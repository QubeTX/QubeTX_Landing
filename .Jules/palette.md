## 2026-03-26 - Semantic Timelines
**Learning:** Generic wrappers (`div`s) for visual processes/timelines hide the structural relationship of the steps from screen readers, preventing them from understanding context, order, and total item count.
**Action:** When implementing visual processes or timelines, replace `<div className="timeline">`/ `<div className="step">` structures with `<ol>` and `<li>` tags. Ensure to add `aria-label` to the list for context, and `aria-hidden="true"` on any visual number indicators to prevent redundant announcements.
