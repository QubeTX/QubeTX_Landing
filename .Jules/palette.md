
## 2025-02-14 - Keyboard Navigation with In-Page Anchors
**Learning:** When using internal anchor links (e.g., `<a href="#services">`), the browser scrolls to the element with that ID, but it does not shift actual keyboard focus to that section unless the target element is intrinsically focusable or has `tabIndex={-1}`. This breaks the experience for keyboard and screen reader users, who will find their next "Tab" stroke starts from their previous location (like the footer).
**Action:** Always add `tabIndex={-1}` and an outline-suppressing class (e.g., `outline-none` or `:focus:not(:focus-visible) { outline: none; }`) to container `div`s that are targeted by in-page skip links or navigation anchors.
