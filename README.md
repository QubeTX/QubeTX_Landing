# QubeTX Landing Page

The official landing page for QubeTX, a department of ES Development LLC under the E. SHAUGHNESSY group. This modern React-based website serves as an informational gateway to our digital infrastructure and API services.

## Technology Stack

- **React 19** - Modern component-based UI framework
- **Vite 7** - Fast build tool and development server
- **CSS Modules** - Scoped component styling for maintainability
- **JavaScript (JSX)** - Component development
- **GitHub Pages** - Static site deployment

## Project Structure

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
│   ├── styles/           # Global styles and CSS Modules
│   └── components/       # React components
│       ├── layout/       # Header, Footer
│       ├── sections/     # Hero, Features, Projects, Contact
│       ├── ui/           # Reusable UI components
│       └── effects/      # Custom cursor effect
└── QubeTX_Design_System.md # Design specifications
```

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/username/QubeTX_Landing.git
cd QubeTX_Landing

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
# Visit http://localhost:5000
```

### Building for Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
# Visit http://localhost:4173
```

## Features

- **Modern React Architecture**: Component-based structure for easy maintenance
- **Responsive Design**: Mobile-first approach with fluid typography
- **Interactive Elements**: Custom magnetic cursor effect with React hooks
- **Design System**: Neo-Bauhaus inspired aesthetic with systematic color and typography
- **Performance Optimized**: Vite-powered development and build process
- **CSS Modules**: Scoped styling preventing style conflicts

## Design System

The project follows the QubeTX Design System featuring:
- **Typography**: Unbounded (headings), Space Grotesk (body), Space Mono (technical)
- **Colors**: Primary blue (#0066FF), dark backgrounds with gradient accents
- **Grid System**: 8px base unit with consistent spacing
- **Component Patterns**: Cards with hover effects, smooth animations

## Deployment

The site is configured for automatic deployment to GitHub Pages. Changes pushed to the main branch will automatically trigger a new deployment.

```bash
# Deploy changes
git add .
git commit -m "Your commit message"
git push origin main
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build on port 4173 |

## Browser Support

- Modern browsers supporting ES6+ and CSS Grid
- Mobile browsers with touch support
- Progressive enhancement for older browsers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is proprietary software of ES Development LLC.
