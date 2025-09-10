# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QubeTX Landing Page - A static website serving as the official landing page for QubeTX, a department of ES Development LLC. The site is deployed via GitHub Pages.

## Architecture

### Technology Stack
- Pure HTML/CSS (no JavaScript framework)
- Static site hosted on GitHub Pages
- Custom domain configured via CNAME

### File Structure
```
/
├── index.html              # Main HTML file
├── styles/                 # CSS organization
│   ├── base.css           # CSS variables and resets
│   ├── main.css           # Entry point (imports only)
│   ├── components/        # Component-specific styles
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── features.css
│   │   ├── projects.css
│   │   ├── contact.css
│   │   └── footer.css
│   └── utils/             # Utility styles
│       ├── typography.css
│       └── responsive.css
├── *.png                  # Image assets (logos, project images)
└── QubeTX_Design_System.md # Design specifications
```

### CSS Architecture
- Modular CSS with separate files for each component
- CSS custom properties defined in base.css
- BEM-like naming conventions
- Mobile-first responsive design with breakpoints at 768px and 1200px

## Development Commands

### Local Development
```bash
# Open the site locally (macOS)
open index.html

# Start a local server with Python
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Deployment
The site auto-deploys to GitHub Pages when changes are pushed to the main branch.

```bash
# Deploy changes
git add .
git commit -m "Your commit message"
git push origin main
```

## Key Design Constraints

### Typography System
- **Unbounded**: Headlines and titles (weights 200-900)
- **Space Grotesk**: Body text (weights 400-700)
- **Space Mono**: Technical text and tags

### Color System
- Primary Blue: `#0066FF`
- Dark Background: `#0a0f1c`
- Card Background: `#0d1117`
- Text: `#ffffff` (primary), `#94a3b8` (secondary)

### Grid System
- 8px base unit
- 1400px max container width
- Consistent spacing multiples (8px, 32px, 64px, 96px)

### Component Patterns
- Cards use `var(--card-bg)` background with subtle borders
- Hover states include translation, scale, and opacity transitions
- Border radius: 16px for feature cards, 24px for project cards

## Important Considerations

- This is a static site - no build process or bundling required
- Images are stored in the root directory alongside HTML
- The CNAME file must be preserved for custom domain functionality
- All styling follows the QubeTX Design System specifications
- Responsive breakpoints: Mobile (<768px), Tablet (768px-1199px), Desktop (1200px+)