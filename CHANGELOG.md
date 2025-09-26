# Changelog

All notable changes to the QubeTX Landing Page project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.3] - 2025-09-26

### Changed
- Rebuilt the custom cursor for precise tracking with intensified blue/purple bloom layers
- Energized global background with animated lighting gradients that respect the original brand palette
- Tidied UI accessibility by hiding decorative feature icons and pruning unused animations

## [2.1.2] - 2025-09-26

### Changed
- Updated CI pipeline to run TypeScript checks and Vitest suite after dependency install
- Streamlined secondary code-quality job to reuse the production build for bundle metrics

## [2.1.1] - 2025-09-26

### Changed
- Rebuilt the custom cursor with layered bloom, ring, and core elements for a modern glow and subtle trailing motion
- Smoothed cursor interpolation and throttled interactive listener updates to prevent aggressive snapping
- Updated cursor styling to centralize opacity control while retaining reduced-motion and touch safeguards

## [2.1.0] - 2025-09-26

### Added
- TypeScript toolchain (`typescript`, React DOM types) with strict configuration and global CSS module declarations
- `CODEX_PROJECT.md` with current project overview and workspace tree
- Centralized content source in `src/data/content.ts` powering sections for reuse and future expansion

### Changed
- Migrated all React components to `.tsx` with explicit props and accessibility improvements
- Updated custom cursor to respect reduced-motion preferences and pointer availability
- Refined section semantics, project tag markup, and global cursor styles for better accessibility

## [2.0.2] - 2025-09-26

### Added
- Vitest test harness with Hero component coverage and shared Testing Library setup

### Changed
- `AGENTS.md` instructions now document run-mode testing commands and updated dev server ports

## [2.0.1] - 2025-09-26

### Added
- `AGENTS.md` contributor guidelines with project structure, workflow, and review expectations

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
- Development server on port 8080, preview on port 8081
- `CLAUDE.md` file for Claude Code guidance and project context
- `OG_TREE.txt` file with complete project structure snapshot
- `CHANGELOG.md` file to track project history

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
