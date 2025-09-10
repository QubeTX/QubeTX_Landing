# QubeTX Website - React + Vite

## Overview
QubeTX is a professional web development and digital infrastructure company landing page. Originally a static HTML/CSS website, it has been modernized to use React + Vite while preserving the sophisticated dark theme design, custom cursor effects, and responsive layout.

## Project Architecture
- **Framework**: React 18 with Vite
- **Styling**: CSS Modules for component-scoped styles
- **Languages**: JavaScript (JSX), CSS
- **Build Tool**: Vite
- **Port**: 5000 (frontend)
- **Deployment**: Configured for autoscale deployment with production build

## Key Features
- Modern neo-Bauhaus inspired design system
- Custom interactive cursor with magnetic effects (React component)
- Responsive grid layout with fluid typography
- Portfolio showcases with hover effects
- Professional typography using Unbounded, Space Grotesk, and Space Mono fonts
- Sophisticated color palette with gradients and transparency
- Component-based architecture for easy maintenance and expansion

## Component Structure
```
src/
├── components/
│   ├── effects/
│   │   └── CustomCursor.jsx      # Interactive cursor with magnetic effects
│   ├── layout/
│   │   ├── Header.jsx            # Site header with logo
│   │   └── Footer.jsx            # Site footer
│   ├── sections/
│   │   ├── Hero.jsx              # Main hero section
│   │   ├── Features.jsx          # Features grid section
│   │   ├── Projects.jsx          # Portfolio projects showcase
│   │   └── Contact.jsx           # Contact section
│   └── ui/
│       ├── FeatureCard.jsx       # Individual feature card component
│       ├── ProjectCard.jsx       # Individual project card component
│       └── ContactButton.jsx     # CTA button component
├── styles/
│   ├── global.css                # Global styles and CSS variables
│   └── App.module.css            # Main app styles
├── App.jsx                        # Main app component
└── main.jsx                       # React entry point
```

## Public Assets
```
public/
├── logoQUBETX_horizontal.png     # Main logo
├── logoQUBETX.png                 # Square logo
├── qubeTXFavicon.png             # Favicon
├── dorsey.png                     # Project image
├── gvalley.png                    # Project image
└── magz.png                       # Project image
```

## Development Setup
- **Workflow**: "QubeTX React App" - Vite dev server on port 5000
- **Command**: `npm run dev`
- **Output**: webview (for previewing the website)
- **Host Configuration**: Vite configured to accept all hosts for Replit proxy

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment Configuration
- **Target**: autoscale (suitable for static sites)
- **Build Command**: `npm run build`
- **Run Command**: `npm run preview`

## Recent Changes
- 2025-09-10: Modernized from static HTML/CSS to React + Vite
  - Converted all sections to modular React components
  - Migrated CSS to CSS Modules while preserving exact design
  - Implemented custom cursor as React component with proper event handling
  - Fixed production asset handling by moving images to public folder
  - Optimized package.json dependencies
  - Configured proper deployment settings

## Design System Preserved
- **Colors**: Primary blue (#0066FF), gradient colors, dark backgrounds
- **Typography**: Unbounded (headings), Space Grotesk (body), Space Mono (technical)
- **Grid System**: 8px base unit with consistent spacing
- **Animations**: All hover effects, transitions, and cursor animations maintained
- **Responsive**: Breakpoints at 480px, 768px, 992px, 1200px, 1400px

## User Preferences
- Keep the existing UI/UX design unchanged
- Focus on modularity and component-based architecture
- Improve maintainability for future updates

The website has been successfully modernized with improved developer experience while maintaining the exact same user experience.