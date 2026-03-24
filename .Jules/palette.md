## 2024-05-24 - Parent aria-label overrides nested content
**Learning:** When a parent element (like a card link) has an `aria-label` to provide a concise summary, it completely overrides and silences all nested text content for screen readers, including `.sr-only` spans intended to announce things like "(opens in a new tab)".
**Action:** Include all necessary context (like new tab warnings) directly within the parent's `aria-label` string instead of relying on nested visually hidden text elements.
