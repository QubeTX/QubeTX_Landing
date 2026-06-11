import type { FC, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './TextLink.module.css'

type TextLinkProps = {
  href: string
  children: ReactNode
  /** Trailing glyph, rendered aria-hidden (e.g. '⠿' for the services link) */
  glyph?: string
  className?: string
}

/** Mono uppercase text link with a trailing glyph ("Explore our services ⠿"). */
const TextLink: FC<TextLinkProps> = ({ href, children, glyph, className }) => {
  const isExternal = /^https?:\/\//.test(href)

  return (
    <a
      href={href}
      className={clsx(styles.link, className)}
      data-interactive="true"
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span className={styles.text}>{children}</span>
      {glyph && (
        <span className={styles.glyph} aria-hidden="true">
          {glyph}
        </span>
      )}
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}

export default TextLink
