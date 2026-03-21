## 2025-02-13 - [Global Keyboard Accessibility with Custom Cursors]
**Learning:** In applications using custom cursors that hide the native cursor (via `cursor: none`), keyboard navigation can become confusing or unusable unless strong visual focus indicators are provided globally.
**Action:** Always maintain explicit global focus states (e.g., `:where(*):focus-visible`) when implementing custom cursors, ensuring low specificity is used to not break existing component-specific focus styles.
