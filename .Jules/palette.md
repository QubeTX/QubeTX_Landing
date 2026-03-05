## 2026-03-05 - External Link Announcements
**Learning:** Screen readers need explicit text indicating when links open in a new tab to prevent user disorientation, especially for components like ProjectCards that wrap entire articles in target="_blank" anchors.
**Action:** Always append `<span className="sr-only"> (opens in a new tab)</span>` to any link or wrapped interactive element using `target="_blank"`.
