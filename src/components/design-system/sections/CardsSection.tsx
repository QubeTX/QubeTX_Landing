'use client'

import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import ServiceCard from '@/components/ui/ServiceCard'
import ProductCard from '@/components/ui/ProductCard'
import ProjectCard from '@/components/ui/ProjectCard'
import { SERVICES, PRODUCTS, PROJECTS } from '@/data/content'
import { useProximityGlow } from '@/lib/motion/useProximityGlow'
import styles from './CardsSection.module.css'

/** §11 — Cards. The three card species, live with their real data. */
export default function CardsSection() {
  const glowRef = useProximityGlow<HTMLDivElement>()

  return (
    <DsSection
      id="cards"
      lede="Three card species, each with its own pointer response: service cells glow before you reach them, product rows compound-hover as one link, project cards tilt under the cursor. All live below — these are the production components with the production data."
    >
      <DemoPanel caption="ServiceCard — proximity glow (move the pointer around the grid)">
        <div ref={glowRef} className={styles.serviceGrid}>
          {SERVICES.slice(0, 2).map((service, i) => (
            <ServiceCard key={service.id} index={i} {...service} />
          ))}
        </div>
      </DemoPanel>

      <DemoPanel caption="ProductCard — the striped product row (whole row is the link)">
        {/* ul: ProductCard renders <li> (the landing wraps them the same way) */}
        <ul className={styles.productList}>
          <ProductCard product={PRODUCTS[0]} />
          <ProductCard product={PRODUCTS[3]} striped />
        </ul>
      </DemoPanel>

      <DemoPanel caption="ProjectCard — pointer micro-tilt (≤3.5°, mouse only)">
        <div className={styles.projectGrid}>
          <ProjectCard {...PROJECTS[3]} />
        </div>
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'One pointer response per card',
            body: 'Service cells glow (proximity), product rows compound-hover (CSS), project cards tilt (rAF vars). A card never does two — the response IS the card’s identity.',
          },
          {
            title: 'Glow lives on the grid',
            body: (
              <>
                <code>useProximityGlow</code> attaches to the cards&apos; CONTAINER and writes{' '}
                <code>--mx/--my</code>; each card&apos;s <code>::before</code> gradient does the
                distance falloff in CSS. One listener, any number of cards.
              </>
            ),
          },
          {
            title: 'Tilt owns its own node',
            body: 'ProjectCard’s tilt writes CSS vars consumed by the inner article; the FM entrance variants live on the outer anchor — different nodes, no transform fights.',
          },
          {
            title: 'Whole row, one link',
            body: 'ProductCard is a single anchor — code chip, copy, tags, status, and the VISIT arrow all hover together via descendant selectors. No nested interactive elements.',
          },
          {
            title: 'Descriptions are Pretext blocks',
            body: 'Card body text wraps through PretextBlock (min-height reservation; shrinkwrap only when left-aligned) so async font swaps never shift card heights.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — a glowing card grid"
        lang="tsx"
        code={`const glowRef = useProximityGlow<HTMLDivElement>()

<div ref={glowRef} className={styles.grid}>
  {items.map((service, i) => (
    <ServiceCard key={service.id} index={i} {...service} />
  ))}
</div>
/* Card CSS reads the vars the hook writes:
   .card[data-glow]::before {
     background: radial-gradient(240px at var(--mx) var(--my), …);
   } */`}
      />

      <AgentNote
        checklist={[
          'Cards ship in the kit ui/ folder; the glow/tilt hooks come with lib/motion',
          'Card data comes from a typed content.ts — components never hold copy',
          'Grids use explicit breakpoint column counts (grid-column: auto / -1 does NOT mean "rest of row")',
          'Entrances are FM container variants on the grid + slideUpVariants per card — anime never animates FM nodes',
          'Check card hover states have :focus-visible twins (the tests look for them)',
        ]}
      >
        Choosing a species: information that <strong>describes capability</strong> → ServiceCard;
        a <strong>linkable artifact with state</strong> → ProductCard row; a{' '}
        <strong>visual portfolio item</strong> → ProjectCard. New card types start as one of these
        three with a different body — fork the CSS module, not the interaction model.
      </AgentNote>
    </DsSection>
  )
}
