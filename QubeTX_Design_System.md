# QubeTX Design System

## Brand Identity

QubeTX's design system embodies a neo-Bauhaus and Teenage Engineering-inspired aesthetic, characterized by minimalist geometry, strong typography, and a sophisticated dark color palette with vibrant accent colors.

## Color Palette

### Primary Colors
- Primary Blue: `#0066FF`
- Dark Background: `#0a0f1c`
- Card Background: `#0d1117`

### Gradient Colors
- Gradient Blue: `#2563eb`
- Gradient Purple: `#7c3aed`

### Text Colors
- Primary Text: `#ffffff`
- Secondary Text: `#94a3b8`

## Typography

### Font Families
1. **Unbounded**
   - Used for titles and headings
   - Weights: 200-900
   - Style: Bold, geometric, modern
   - Usage: Main headlines, section titles

2. **Space Grotesk**
   - Used for body text
   - Weights: 400, 500, 600, 700
   - Style: Clean, contemporary monospace-inspired
   - Usage: Primary body text

3. **Space Mono**
   - Used for technical and secondary text
   - Style: Monospace
   - Usage: Subtitles, descriptions, tags

### Text Hierarchy
- H1 Headlines: 64px (8 grid units)
- Section Titles: 40px (5 grid units)
- Card Headings: 24px (3 grid units)
- Body Text: 12-14px (1.5-1.75 grid units)

## Grid System

- Base Unit: 8px
- Container Max Width: 1400px
- Standard Spacing:
  - Small: 8px (1 unit)
  - Medium: 32px (4 units)
  - Large: 64px (8 units)
  - Extra Large: 96px (12 units)

## Components

### Cards

#### Feature Cards
- Background: `var(--card-bg)`
- Border: 1px solid rgba(255, 255, 255, 0.03)
- Border Radius: 16px (2 grid units)
- Hover Animation:
  - Slight upward translation
  - 1-degree rotation
  - Border color enhancement

#### Project Cards
- Background: `var(--card-bg)`
- Border Radius: 24px (3 grid units)
- Image Height: 300px
- Hover Effects:
  - Scale transform on image
  - Overlay fade-in
  - Upward translation
  - Shadow enhancement

### Tags
- Font: Space Mono
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border Radius: 4px (0.5 grid units)
- Padding: 8px 16px

## Animations & Transitions

### Hover States
- Duration: 0.3-0.6s
- Timing Function: ease
- Effects:
  - Translation
  - Scale
  - Opacity
  - Border color
  - Text color

## Layout Principles

### Grid Layout
- Main Container: Single column
- Features Section: 3-column grid
- Projects Section: 2-column grid
- Responsive breakpoints:
  - Desktop: 1200px+
  - Tablet: 768px-1199px
  - Mobile: <768px

### Spacing
- Consistent use of grid-based spacing
- Progressive indentation for visual hierarchy
- Generous whitespace between sections
- Border elements for visual separation

## Design Principles

1. **Geometric Minimalism**
   - Clean lines and shapes
   - Strong grid adherence
   - Purposeful negative space

2. **Dynamic Typography**
   - Bold, geometric headlines
   - Technical, monospace accents
   - Clear hierarchical contrast

3. **Subtle Depth**
   - Gradient overlays
   - Soft shadows
   - Semi-transparent borders

4. **Interactive Enhancement**
   - Smooth transitions
   - Meaningful hover states
   - Progressive animations

5. **Responsive Adaptation**
   - Fluid typography scaling
   - Reorganized layouts at breakpoints
   - Maintained visual hierarchy

## Accessibility

- High contrast text colors
- Clear visual hierarchy
- Adequate text sizing
- Meaningful hover states
- Semantic HTML structure
