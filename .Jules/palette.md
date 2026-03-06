## 2025-03-06 - Testing with screen-reader text
**Learning:** When appending screen-reader text classes (like `.sr-only`) to interactive elements such as links or buttons, standard exact-string matching queries in tests (e.g. `getByRole('link', { name: 'Exact Text' })`) will fail because the screen-reader text becomes part of the element's accessible name.
**Action:** When adding `.sr-only` text to UI elements, ensure corresponding tests are updated to use regex matching (e.g. `/Exact Text/i`) rather than string literals.
