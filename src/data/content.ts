export type Feature = {
  id: string
  icon: string
  title: string
  description: string
  lineBreak?: string
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

export const HERO_CONTENT = {
  title: 'Web Development',
  conjunction: 'and',
  highlight: 'Digital Infrastructure',
  subheadline:
    'Professional website development, maintenance services, and backend API infrastructure for modern digital businesses',
  company: 'A Department of ES Development LLC'
} as const

export const FEATURES: Feature[] = [
  {
    id: 'web-development',
    icon: '🎨',
    title: 'Web Development',
    description:
      'Modern, responsive website design and development with cutting-edge technologies. From static sites to complex web applications, we create tailored solutions that elevate your digital presence.'
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'Maintenance',
    description:
      'Comprehensive website maintenance including security updates, performance optimization, content updates, and technical support. Keep your digital platform running at peak efficiency.'
  },
  {
    id: 'api-infrastructure',
    icon: '⚡',
    title: 'API Infrastructure',
    description:
      'Scalable and secure API development with modern architecture patterns. Build robust backend systems that power your applications with high performance and reliability.'
  },
  {
    id: 'cloud-solutions',
    icon: '☁️',
    title: 'Cloud Solutions',
    description:
      'Expert cloud infrastructure deployment and management. Leverage the power of cloud computing with optimized hosting solutions, CDN implementation, and serverless architectures.'
  },
  {
    id: 'security-performance',
    icon: '🛡️',
    title: 'Security &',
    lineBreak: 'Performance',
    description:
      'Comprehensive security audits, SSL implementation, and performance optimization. Ensure your digital assets are protected while delivering lightning-fast experiences to your users.'
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
    id: 'magz-sports',
    href: 'https://magzsports.com',
    image: '/magz.png',
    alt: 'MAGZ Sports Group Project',
    title: 'MAGZ Sports Group',
    tags: ['Sports', 'Marketing', 'Agency'],
    description:
      'A dynamic sports marketing platform connecting elite collegiate and professional athletes with leading global brands through strategic partnerships and data-driven campaigns.'
  }
]

export const CONTACT_CTA = {
  label: 'Start Your Project',
  href: 'https://app.youform.com/forms/3lbykv4l'
} as const

export type HeroContent = typeof HERO_CONTENT
export type ContactCta = typeof CONTACT_CTA
