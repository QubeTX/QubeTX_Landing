# Changelog

All notable changes to the QubeTX Landing Page project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-09-10

### Changed
- **BREAKING**: Migrated from static HTML/CSS to React 19 with Vite
- Restructured entire codebase to component-based architecture
- Moved all styling to CSS Modules for better encapsulation
- Enhanced responsive design with additional breakpoints (375px, 390px, 414px)
- Migrated all image assets to public/ directory
- Updated build system from static files to Vite bundler

### Added
- React 19 component architecture
- Vite 7 build tool and development server
- CSS Modules for scoped styling
- Custom magnetic cursor effect with React hooks
- Component organization (layout, sections, ui, effects)
- npm package management
- Hot Module Replacement for development
- Production build optimization
- Development server on port 5000, preview on port 4173

### Improved
- Mobile responsiveness with fluid typography using clamp()
- Touch target sizes (minimum 44px)
- Button heights (minimum 48px)
- Progressive enhancement for smaller devices
- Development workflow with HMR

## [1.3.0] - 2025-06-28

### Added
- MAGZ Sports Group project to portfolio section
- Contact section with email link

### Fixed
- Project card layout issues on mobile devices
- Full-height styling for project cards
- Grid layout improvements for better responsiveness

### Changed
- Updated project grid from 3-column to 2-column layout
- Enhanced project card hover states and transitions

## [1.2.0] - 2025-02-19

### Fixed
- Cursor behavior improvements
- Various layout and scaling issues
- Feature card spacing and alignment

### Changed
- Updated base CSS for better variable management
- Improved responsive design breakpoints
- Enhanced typography scaling

## [1.1.0] - 2024-12-09

### Added
- QubeTX Design System documentation (`QubeTX_Design_System.md`)
- Detailed design specifications including:
  - Neo-Bauhaus inspired aesthetic
  - Typography system (Unbounded, Space Grotesk, Space Mono)
  - Color palette and gradients
  - Grid system (8px base unit)
  - Component patterns
  - Animation guidelines

### Changed
- Updated favicon for better visibility at small scale
- Compressed all project preview images for faster loading
- Optimized image assets using ImgBot

## [1.0.0] - 2024-11-16

### Added
- Complete redesign for new QubeTX brand identity
- Project portfolio section featuring:
  - Dorsey Memorial Community Center
  - Golden Valley Golf & Country Club
- Modular CSS architecture with component separation
- Custom CSS properties for theme management
- Responsive design with mobile-first approach

### Changed
- Updated QubeTX logo to new brand design
- Restructured CSS into modular components:
  - `base.css` - CSS variables and resets
  - `components/` - Individual component styles
  - `utils/` - Typography and responsive utilities
- Enhanced hover states and animations

## [0.1.0] - 2024-11-14

### Added
- Initial project setup
- Basic HTML structure
- GitHub Pages deployment configuration
- Custom domain setup via CNAME (qubetx.com)
- Essential image assets:
  - QubeTX logo (horizontal and standard variants)
  - Favicon

### Project Information
- **Type**: React SPA with Vite
- **Deployment**: GitHub Pages
- **Domain**: qubetx.com
- **Purpose**: Official landing page for QubeTX, a department of ES Development LLC