## 2025-03-11 - External Links A11y
**Learning:** Adding screen-reader explicit warnings like `<span className="sr-only"> (opens in a new tab)</span>` is an easy win for accessibility on `target="_blank"` links like those in `ContactButton.tsx` and `ProjectCard.tsx`.
**Action:** Always verify if a link opens in a new tab and provide a visually hidden cue for screen readers if it does.
