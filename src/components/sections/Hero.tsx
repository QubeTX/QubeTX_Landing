'use client';

import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { HeroContent } from '@/data/content'
import { createContainerVariants, heroItemVariants } from '@/utils/animations'
import { PretextBlock } from '@/lib/pretext'
import LabelPill from '@/components/ui/LabelPill'
import OutlineButton from '@/components/ui/OutlineButton'
import TextLink from '@/components/ui/TextLink'
import QubeTXLogo from '@/components/ui/QubeTXLogo'
import styles from './Hero.module.css'

type HeroProps = {
  content: HeroContent
}

const container = createContainerVariants(0.1, 0.3)

const Hero: FC<HeroProps> = ({ content }) => {
  const { eyebrow, headline, description, primaryCta, secondaryCta, company } = content

  return (
    <motion.section
      className={styles.hero}
      aria-label="Introduction"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className={styles.content}>
        <motion.div variants={heroItemVariants}>
          <LabelPill variant="bar">{eyebrow}</LabelPill>
        </motion.div>

        <motion.h1 className={styles.headline} variants={heroItemVariants}>
          {headline.map((line, i) => (
            <span
              key={line}
              className={i === headline.length - 1 ? styles.gradientLine : undefined}
            >
              {line}
            </span>
          ))}
        </motion.h1>

        <PretextBlock
          text={description}
          lineHeight={1.65}
          shrinkwrap
          className={styles.description}
        >
          <motion.p variants={heroItemVariants}>{description}</motion.p>
        </PretextBlock>

        <motion.div className={styles.ctaRow} variants={heroItemVariants}>
          <OutlineButton href={primaryCta.href} magnetic>
            {primaryCta.label}
          </OutlineButton>
          <TextLink href={secondaryCta.href} glyph="⠿">
            {secondaryCta.label}
          </TextLink>
        </motion.div>

        <motion.div className={styles.company} variants={heroItemVariants}>
          <QubeTXLogo className={styles.companyMark} />
          <span>{company}</span>
        </motion.div>
      </div>

      {/* Right-side dot field — DotGrid mounts here (phase 6) */}
      <div className={styles.visual} data-hero-visual aria-hidden="true" />
    </motion.section>
  )
}

export default Hero
