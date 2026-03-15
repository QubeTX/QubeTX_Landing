## 2024-05-15 - [Added Global Focus-Visible Styles]
**Learning:** Found that custom cursors inherently hide native user interaction mechanisms, necessitating strong explicit `focus-visible` styles on interactive elements to ensure keyboard accessibility. Missing focus-visible states block screen-reader or keyboard navigation.
**Action:** Always verify a strong focus indicator (`:focus-visible` outline) globally across custom cursor implementations. Avoid letting decorative aesthetics block essential usability features.
