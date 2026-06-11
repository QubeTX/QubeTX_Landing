'use client';

import { useRef, type FC } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/content'
import { slideUpVariants } from '@/utils/animations'
import { prefersReducedMotion } from '@/lib/motion/useMotionPreference'
import { PretextBlock } from '@/lib/pretext'
import styles from './ProjectCard.module.css'

type ProjectCardProps = Project

const MAX_TILT = 3.5

const ProjectCard: FC<ProjectCardProps> = ({ id, href, image, alt, title, tags, description }) => {
  // Pointer micro-tilt: rect cached on enter, writes rAF-gated, CSS vars
  // consumed by the inner article's transform (the motion.a keeps FM's
  // entrance variants — different node, no shared transform).
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)
  const pointRef = useRef({ x: 0, y: 0 })

  const applyTilt = (el: HTMLElement) => {
    rafRef.current = null
    const rect = rectRef.current
    if (!rect) return
    const px = (pointRef.current.x - rect.left) / rect.width - 0.5
    const py = (pointRef.current.y - rect.top) / rect.height - 0.5
    el.style.setProperty('--ry', `${(px * MAX_TILT * 2).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-py * MAX_TILT * 2).toFixed(2)}deg`)
  }

  const onPointerEnter = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    rectRef.current = e.currentTarget.getBoundingClientRect()
  }

  const onPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!rectRef.current) return
    pointRef.current.x = e.clientX
    pointRef.current.y = e.clientY
    const el = e.currentTarget
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => applyTilt(el))
    }
  }

  const onPointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    rectRef.current = null
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.projectLink}
      variants={slideUpVariants}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <article className={styles.projectCard}>
        <div className={styles.projectImageWrapper}>
          <img src={image} alt={alt} className={styles.projectImage} loading="lazy" />
          <div className={styles.projectOverlay} aria-hidden="true">
            <span className={styles.visitSite}>Visit Site →</span>
          </div>
        </div>
        <div className={styles.projectContent}>
          <PretextBlock text={title} lineHeight={1.3} as="h3" className={styles.projectTitle}>
            {title}
            <span className="sr-only"> (opens in a new tab)</span>
          </PretextBlock>
          <ul className={styles.projectTags} aria-label="Project tags">
            {tags.map((tag) => (
              <li key={`${id}-${tag}`} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
          <PretextBlock text={description} lineHeight={1.7} shrinkwrap as="p" className={styles.projectDescription}>
            {description}
          </PretextBlock>
        </div>
      </article>
    </motion.a>
  )
}

export default ProjectCard
