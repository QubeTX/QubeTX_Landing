# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QubeTX Landing Page - A modern React-based website serving as the official landing page for QubeTX, a department of ES Development LLC. Built with React 19 and Vite for optimal performance and developer experience.

## Architecture

### Technology Stack
- **React 19** - Component-based UI framework
- **Vite 7** - Fast build tool and dev server
- **CSS Modules** - Scoped component styling
- **Custom Cursor** - Interactive magnetic cursor effect
- **GitHub Pages** - Static site deployment

### File Structure
```
/
├── index.html              # Root HTML file (Vite entry point)
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
├── public/                # Static assets
│   ├── *.png             # Image assets (logos, project images)
│   └── qubeTXFavicon.png # Site favicon
├── src/                   # Source code
│   ├── main.jsx          # React app entry point
│   ├── App.jsx           # Root component
│   ├── styles/           # Global styles
│   │   ├── global.css    # Global CSS and variables
│   │   └── App.module.css
│   └── components/       # React components
│       ├── layout/       # Layout components
│       │   ├── Header.jsx
│       │   └── Footer.jsx
│       ├── sections/     # Page sections
│       │   ├── Hero.jsx
│       │   ├── Features.jsx
│       │   ├── Projects.jsx
│       │   └── Contact.jsx
│       ├── ui/           # Reusable UI components
│       │   ├── FeatureCard.jsx
│       │   ├── ProjectCard.jsx
│       │   └── ContactButton.jsx
│       └── effects/      # Visual effects
│           └── CustomCursor.jsx
└── QubeTX_Design_System.md # Design specifications
```

### Component Architecture
- **CSS Modules**: Each component has a corresponding `.module.css` file
- **Component Organization**: Separated by function (layout, sections, ui, effects)
- **Props Pattern**: UI components receive data via props from section components
- **Custom Hooks**: Custom cursor uses React hooks for DOM interaction

## Development Commands

### Installation
```bash
# Install dependencies
npm install
```

### Development
```bash
# Start development server on port 5000
npm run dev
# Access at http://localhost:5000
```

### Building
```bash
# Build for production
npm run build
# Output goes to dist/ directory

# Preview production build locally
npm run preview
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
- Gradient Blue: `#2563eb`
- Gradient Purple: `#7c3aed`
- Text: `#ffffff` (primary), `#94a3b8` (secondary)

### Grid System
- 8px base unit (CSS variable: `--grid-unit`)
- Responsive spacing with clamp() functions
- Container padding: `clamp(16px, 4vw, 32px)`
- Section spacing: `clamp(48px, 10vw, 96px)`

### Responsive Design
- Mobile-first approach with CSS Modules
- Breakpoints:
  - 375px - Small mobile
  - 390px - iPhone 12/13 mini
  - 414px - Standard mobile
  - 768px - Tablet
  - 1200px - Desktop
- Touch target minimum: 44px
- Button height minimum: 48px

### Component Patterns
- Cards use CSS Module classes with hover transitions
- Magnetic cursor effect on interactive elements
- Smooth animations (0.3-0.6s ease)
- Progressive enhancement for mobile devices

## Vite Configuration

### Path Aliases
```javascript
'@': '/src'
'@assets': '/attached_assets'
```

### Dev Server
- Host: `0.0.0.0` (allows external connections)
- Port: `5000`
- HMR configured for port 443

## Important Considerations

- React 19 with Vite for modern development experience
- All styling uses CSS Modules for component scoping
- Images served from `public/` directory (referenced as `/image.png`)
- Custom cursor implemented with React hooks and refs
- The CNAME file must be in `public/` for custom domain functionality
- All components follow the QubeTX Design System specifications
- No external UI libraries - all components are custom built
- Responsive design uses clamp() for fluid typography and spacing