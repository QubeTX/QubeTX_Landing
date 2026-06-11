/**
 * Single source of truth for all site copy and content.
 *
 * Display text is stored in normal sentence case — uppercase styling is a CSS
 * concern (text-transform), which keeps screen-reader output natural.
 */

export type IconKey = 'code' | 'wrench' | 'network' | 'cloud' | 'shield'

export type Service = {
  id: string
  icon: IconKey
  title: string
  description: string
}

export type Product = {
  id: string
  code: string
  name: string
  tagline: string
  description: string
  href: string
  status: 'STABLE' | 'ACTIVE'
  tags: string[]
}

export type Project = {
  id: string
  href: string
  image: string
  alt: string
  title: string
  tags: string[]
  description: string
}

export type TechItem = {
  id: string
  name: string
  icon: string
}

export type ProcessStep = {
  id: string
  number: string
  title: string
  description: string
}

export type NavChild = {
  label: string
  href: string
}

export type NavItem = {
  id: string
  label: string
  href: string
  children?: NavChild[]
}

export type Stat = {
  value: string
  label: string
}

export const CONTACT_CTA = {
  label: 'Start Your Project',
  href: 'https://app.youform.com/forms/3lbykv4l'
} as const

export const HERO_CONTENT = {
  eyebrow: 'Web Development & Digital Infrastructure',
  headline: ['Solid code.', 'Stronger systems.', 'Limitless possibilities.'],
  description:
    'High-performance web solutions and scalable infrastructure that power your business today—and expand your potential for tomorrow.',
  primaryCta: { label: 'Get Started', href: CONTACT_CTA.href },
  secondaryCta: { label: 'Explore Our Services', href: '#services' },
  company: 'A Department of ES Development LLC'
} as const

export const SERVICES: Service[] = [
  {
    id: 'web-development',
    icon: 'code',
    title: 'Web Development',
    description:
      'Modern, responsive website design and development with cutting-edge technologies. From static sites to complex web applications, we create tailored solutions that elevate your digital presence.'
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: 'Maintenance',
    description:
      'Comprehensive website maintenance including security updates, performance optimization, content updates, and technical support. Keep your digital platform running at peak efficiency.'
  },
  {
    id: 'api-infrastructure',
    icon: 'network',
    title: 'API Infrastructure',
    description:
      'Scalable and secure API development with modern architecture patterns. Build robust backend systems that power your applications with high performance and reliability.'
  },
  {
    id: 'cloud-solutions',
    icon: 'cloud',
    title: 'Cloud Solutions',
    description:
      'Expert cloud infrastructure deployment and management. Leverage the power of cloud computing with optimized hosting solutions, CDN implementation, and serverless architectures.'
  },
  {
    id: 'security-performance',
    icon: 'shield',
    title: 'Security & Performance',
    description:
      'Comprehensive security audits, SSL implementation, and performance optimization. Ensure your digital assets are protected while delivering lightning-fast experiences to your users.'
  }
]

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'services',
    label: 'Services',
    href: '#services',
    children: SERVICES.map((s) => ({ label: s.title, href: `#service-${s.id}` }))
  },
  { id: 'technologies', label: 'Technologies', href: '#technologies' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'contact', label: 'Contact', href: '#contact' }
]

/** The QubeTX product line — every entry lives under reports.qubetx.com. */
export const PRODUCTS: Product[] = [
  {
    id: 'tr-300',
    code: 'TR-300',
    name: 'Machine Report',
    tagline: 'Know your machine in seconds.',
    description:
      'Cross-platform system reports with beautiful Unicode tables. High-performance hardware and software diagnostics in a clean, terminal-native format.',
    href: 'https://reports.qubetx.com',
    status: 'STABLE',
    tags: ['CLI', 'Rust', 'Cross-platform']
  },
  {
    id: 'sd-300',
    code: 'SD-300',
    name: 'System Diagnostic',
    tagline: 'A live dashboard for your hardware.',
    description:
      'Interactive terminal dashboard for real-time system monitoring — CPU, memory, processes, and machine health at a glance.',
    href: 'https://reports.qubetx.com/sd300',
    status: 'STABLE',
    tags: ['TUI', 'Monitoring']
  },
  {
    id: 'nd-300',
    code: 'ND-300',
    name: 'Network Diagnostic',
    tagline: 'Find it. Fix it. Stay online.',
    description:
      'Network diagnostics and repair from the command line, with built-in speed testing via the speedqx command.',
    href: 'https://reports.qubetx.com/nd300',
    status: 'STABLE',
    tags: ['CLI', 'Network']
  },
  {
    id: 'wb-300',
    code: 'WB-300',
    name: 'Workbranch',
    tagline: 'A control tower for your branches.',
    description:
      'Live branch-hierarchy control tower for Git — branches, workbranches, and worktrees mapped in one view.',
    href: 'https://reports.qubetx.com/wb300',
    status: 'ACTIVE',
    tags: ['CLI', 'Git']
  },
  {
    id: 'shaughvos',
    code: 'SHAUGHVOS',
    name: 'shaughvOS',
    tagline: 'The diagnostic operating system.',
    description:
      'A custom Debian-based OS with the full QubeTX toolchain pre-installed — TR-300, SD-300, and ND-300 ready out of the box.',
    href: 'https://reports.qubetx.com/shaughvos',
    status: 'ACTIVE',
    tags: ['OS', 'Debian']
  }
]

export const ABOUT_CONTENT = {
  title: 'Detail is the product.',
  manifesto: [
    'QubeTX is the web division of ES Development LLC. We design, build, and run digital infrastructure — from marketing sites and web applications to APIs and the diagnostic tooling we ship as products.',
    'Everything on this page — the type, the motion, the dots reacting under your cursor — is the same attention to detail we bring to client work. If it ships under our name, it ships finished.'
  ],
  stats: [
    { value: '07', label: 'Client Projects' },
    { value: '05', label: 'Products Shipped' },
    { value: '06', label: 'Step Process' },
    { value: '100%', label: 'In-House' }
  ] satisfies Stat[]
} as const

export const TECH_STACK: TechItem[] = [
  { id: 'nextjs', name: 'Next.js 16', icon: '▲' },
  { id: 'react', name: 'React 19', icon: '⚛' },
  { id: 'typescript', name: 'TypeScript', icon: 'TS' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'tw' },
  { id: 'rust', name: 'Rust', icon: 'RS' },
  { id: 'animejs', name: 'Anime.js', icon: 'aj' },
  { id: 'framer', name: 'Framer Motion', icon: 'fm' }
]

export const PROCESS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business goals, target audience, and technical requirements to build a solid foundation.'
  },
  {
    id: 'strategy',
    number: '02',
    title: 'Strategy',
    description: 'Developing a comprehensive roadmap and architectural plan to ensure the project meets your long-term objectives.'
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    description: 'Creating intuitive, accessible, and visually stunning interfaces that reflect your brand identity.'
  },
  {
    id: 'development',
    number: '04',
    title: 'Development',
    description: 'Writing clean, efficient, and scalable code using modern frameworks and best practices.'
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    description: 'Thorough testing and seamless deployment to ensure a perfect start for your new digital platform.'
  },
  {
    id: 'growth',
    number: '06',
    title: 'Growth',
    description: 'Ongoing support, analysis, and optimization to help your digital presence evolve with your business.'
  }
]

export const PROJECTS: Project[] = [
  {
    id: 'leon-lee-dorsey',
    href: 'https://leonleedorsey.com',
    image: '/dorsey.png',
    alt: 'Leon Lee Dorsey Project',
    title: 'Leon Lee Dorsey',
    tags: ['Music', 'Portfolio', 'NYC'],
    description:
      "A dynamic digital presence for NYC's renowned jazz bassist and educator. The site showcases Leon's extensive musical journey, performances, and educational contributions to the jazz world."
  },
  {
    id: 'magz-sports',
    href: 'https://magzsports.com',
    image: '/magz.png',
    alt: 'MAGZ Sports Group Project',
    title: 'MAGZ Sports Group',
    tags: ['Sports', 'Marketing', 'Agency'],
    description:
      'A dynamic sports marketing platform connecting elite collegiate and professional athletes with leading global brands through strategic partnerships and data-driven campaigns.'
  },
  {
    id: 'green-valley',
    href: 'https://gvalleytx.com',
    image: '/gvalley.png',
    alt: 'Green Valley Lawn Services Project',
    title: 'Green Valley',
    tags: ['Business', 'Service', 'Houston'],
    description:
      "A professional website for Houston's premier commercial lawn care provider. The site reflects their commitment to excellence and showcases their comprehensive range of services."
  },
  {
    id: 'qorkme',
    href: 'https://qork.me',
    image: '/qorkme.png',
    alt: 'QorkMe URL Shortener',
    title: 'QorkMe',
    tags: ['URL Shortener', 'Tool', 'Bauhaus'],
    description:
      'A modern URL shortener with a Bauhaus-inspired dot matrix interface and live clock display. Thoughtful short links for modern teams, powered by Supabase and Vercel.'
  },
  {
    id: 'bauhaus-qr',
    href: 'https://qr.qork.me',
    image: '/qr-qork.png',
    alt: 'Bauhaus QR Generator',
    title: 'Bauhaus QR Generator',
    tags: ['QR Code', 'AI', 'Bauhaus'],
    description:
      'A beautifully designed QR code generator enhanced with AI customization. Supports text, URLs, WiFi, vCards, email, SMS, and phone number encoding with PNG and SVG export.'
  },
  {
    id: 'foundry-rmp',
    href: 'https://foundry.qubetx.com',
    image: '/foundry.png',
    alt: 'Foundry Raw Materials Processor',
    title: 'Foundry RMP',
    tags: ['Internal Tool', 'CivMC', 'Gaming'],
    description:
      'A raw materials processing tool built for a CivMC group. Accepts JSON input to process and manage in-game resource data with an industrial, utilitarian interface.'
  },
  {
    id: 'shaughv-timer',
    href: 'https://timer.emmetts.dev',
    image: '/timer.png',
    alt: 'SHAUGHV Timer',
    title: 'SHAUGHV Timer',
    tags: ['Timer', 'Utility', 'SHAUGHV'],
    description:
      'A precision countdown, stopwatch, and interval timer with SHAUGHV design sensibility. Features a circular progress ring, dark mode, and sound controls for focused productivity.'
  }
]

export type HeroContent = typeof HERO_CONTENT
export type ContactCta = typeof CONTACT_CTA
export type AboutContent = typeof ABOUT_CONTENT
