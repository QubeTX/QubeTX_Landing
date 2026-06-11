'use client'

import { motion } from 'framer-motion'
import { NAV_ITEMS, CONTACT_CTA, HERO_CONTENT } from '@/data/content'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useAnchorNav } from '@/hooks/useAnchorNav'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import Magnetic from '@/components/ui/Magnetic'
import OutlineButton from '@/components/ui/OutlineButton'
import NavDropdown from './NavDropdown'
import MobileMenu from './MobileMenu'
import styles from './Header.module.css'

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1))

export default function Header() {
  const scrolled = useScrolled(24)
  const active = useActiveSection(SECTION_IDS)
  const navigate = useAnchorNav(-88)

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>

      <a
        className={styles.logo}
        data-load="header"
        href="#main-content"
        aria-label="QubeTX - Back to top"
        onClick={(e) => {
          e.preventDefault()
          navigate('#main-content')
        }}
      >
        <QubeTXLogo className={styles.logoMark} />
        <span className={styles.logoText}>QubeTX</span>
      </a>

      <nav className={styles.nav} aria-label="Primary" data-load="header">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <NavDropdown
              key={item.id}
              item={item}
              active={active === item.id}
              onNavigate={navigate}
            />
          ) : (
            <a
              key={item.id}
              href={item.href}
              className={styles.navLink}
              data-active={active === item.id || undefined}
              onClick={(e) => {
                e.preventDefault()
                navigate(item.href)
              }}
            >
              {item.label}
              {active === item.id && (
                <motion.span layoutId="nav-active" className={styles.activeIndicator} />
              )}
            </a>
          )
        )}
      </nav>

      <div className={styles.right} data-load="header">
        <Magnetic strength={5} className={styles.cta}>
          {/* Same CTA as the hero primary — same hover teaser */}
          <OutlineButton
            href={CONTACT_CTA.href}
            size="sm"
            hoverLabel={HERO_CONTENT.primaryCta.hoverLabel}
            magnetic
          >
            Get Started
          </OutlineButton>
        </Magnetic>
        <MobileMenu items={NAV_ITEMS} cta={CONTACT_CTA} onNavigate={navigate} />
      </div>
    </header>
  )
}
