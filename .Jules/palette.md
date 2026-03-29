
## 2025-03-29 - Semantic Process Timelines
**Learning:** Visual timelines created with generic nested `<div>` wrappers often result in redundant screen reader announcements (e.g., repeatedly hearing decorative step numbers alongside the step title).
**Action:** Always convert step-by-step generic wrappers into semantic `<ol>` and `<li>` elements to communicate the sequence structurally. Additionally, apply `aria-hidden="true"` to any purely visual number indicators inside list items to prevent the redundant announcements while maintaining the visual design.
