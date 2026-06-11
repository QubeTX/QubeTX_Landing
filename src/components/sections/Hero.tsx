'use client';

import type { FC } from 'react'
import type { HeroContent } from '@/data/content'
import { PretextBlock } from '@/lib/pretext'
import LabelPill from '@/components/ui/LabelPill'
import OutlineButton from '@/components/ui/OutlineButton'
import TextLink from '@/components/ui/TextLink'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import DotGrid from '@/components/effects/DotGrid'
import { useScrolled } from '@/hooks/useScrolled'
import styles from './Hero.module.css'

type HeroProps = {
  content: HeroContent
}

/**
 * Mockup hero. Entrance is owned by LoadSequence (anime.js) via the
 * data-load attributes — no Framer Motion here (one owner per element).
 */
const Hero: FC<HeroProps> = ({ content }) => {
  const { eyebrow, headline, description, primaryCta, secondaryCta, company } = content
  const scrolledPast = useScrolled(120)
  const lastLine = headline.length - 1

  return (
    <section className={styles.hero} aria-label="Introduction" data-dot-pointer-surface>
      <div className={styles.content}>
        <div data-load="eyebrow">
          <LabelPill variant="bar">
            <span data-load-decode>{eyebrow}</span>
          </LabelPill>
        </div>

        <h1 className={styles.headline}>
          {headline.map((line, i) => (
            <span key={line} className={styles.lineMask}>
              <span
                data-load="hl"
                data-load-gradient={i === lastLine || undefined}
                className={i === lastLine ? `${styles.line} ${styles.gradientLine}` : styles.line}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div data-load="desc">
          <PretextBlock
            text={description}
            lineHeight={1.65}
            shrinkwrap
            className={styles.description}
          >
            <p>{description}</p>
          </PretextBlock>
        </div>

        <div className={styles.ctaRow}>
          <span data-load="cta" className={styles.ctaItem}>
            <OutlineButton href={primaryCta.href} magnetic>
              {primaryCta.label}
            </OutlineButton>
          </span>
          <span data-load="cta" className={styles.ctaItem}>
            <TextLink href={secondaryCta.href} glyph="⠿">
              {secondaryCta.label}
            </TextLink>
          </span>
        </div>

        <div className={styles.company} data-load="company">
          <QubeTXLogo className={styles.companyMark} />
          <span>{company}</span>
        </div>
      </div>

      {/* Anime.js-driven interactive dot field — full-bleed, feathered left,
          dissolves past the hero bottom into the next section */}
      <DotGrid className={styles.visual} />

      <div className={styles.scrollCue} data-hidden={scrolledPast || undefined} aria-hidden="true">
        Scroll ▾
      </div>
    </section>
  )
}

export default Hero
