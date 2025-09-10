# QubeTX Website - Replit Project

## Overview
QubeTX is a professional web development and digital infrastructure company landing page. This is a static website featuring sophisticated dark theme design, custom cursor effects, and responsive layout showcasing the company's services and portfolio.

## Project Architecture
- **Type**: Static HTML/CSS website
- **Languages**: HTML, CSS, JavaScript (vanilla)
- **Server**: Python HTTP server (built-in)
- **Port**: 5000 (frontend)
- **Deployment**: Configured for autoscale deployment

## Key Features
- Modern neo-Bauhaus inspired design system
- Custom interactive cursor with magnetic effects
- Responsive grid layout
- Portfolio showcases with hover effects
- Professional typography using Unbounded, Space Grotesk, and Space Mono fonts
- Sophisticated color palette with gradients and transparency

## File Structure
```
├── index.html                 # Main landing page
├── styles/
│   ├── base.css              # Core styles and variables
│   ├── main.css              # Style imports
│   ├── components/           # Component-specific styles
│   └── utils/                # Utility styles (typography, responsive)
├── *.png                     # Brand assets and project images
└── CNAME                     # Domain configuration (qubetx.com)
```

## Development Setup
- **Workflow**: "QubeTX Website" - Python HTTP server on port 5000
- **Command**: `python -m http.server 5000 --bind 0.0.0.0`
- **Output**: webview (for previewing the website)

## Deployment Configuration
- **Target**: autoscale (suitable for static websites)
- **Command**: Python HTTP server serving static files

## Recent Changes
- 2025-09-10: Successfully imported and configured for Replit environment
- Set up Python HTTP server workflow
- Configured deployment settings
- Verified all assets load correctly and website functionality works

## User Preferences
- No specific user preferences documented yet

The website is fully functional and ready for use in the Replit environment.