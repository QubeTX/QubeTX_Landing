import DsSection from '../DsSection'
import DemoPanel from '../DemoPanel'
import RuleGrid from '../RuleGrid'
import AgentNote from '../AgentNote'
import CodeBlock from '../CodeBlock'
import TypeSpecimen from '../TypeSpecimen'

/** §05 — Typography. Makira for voice, Plex Mono for machinery. */
export default function TypographySection() {
  return (
    <DsSection
      id="typography"
      lede="Two families carry everything: Makira (sans + display, 400/500/700/900) and IBM Plex Mono (400/500/600). Both are local woff2 via next/font — never referenced by literal family name."
    >
      <DemoPanel caption="The display ramp — live at real tokens">
        <div>
          <TypeSpecimen
            meta="hero h1 · clamp(2.25rem, 8cqw, 5.75rem) · Makira 900 · container-query sized"
            sampleStyle={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            Solid code.
          </TypeSpecimen>
          <TypeSpecimen
            meta="--text-h2 · clamp(1.75rem, 1rem + 3vw, 3rem) · Makira 900 · uppercase · lh 1.05 · ls −0.02em"
            sampleStyle={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'var(--text-h2)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            What we build
          </TypeSpecimen>
          <TypeSpecimen
            meta="--text-h3 · clamp(1.125rem, 1rem + .75vw, 1.5rem) · Makira 700 · card titles"
            sampleStyle={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-h3)',
              lineHeight: 1.3,
            }}
          >
            API Infrastructure
          </TypeSpecimen>
          <TypeSpecimen
            meta="--text-body · clamp(.9375rem, .875rem + .35vw, 1.0625rem) · Makira 400 · lh 1.6–1.7"
            sampleStyle={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '60ch',
            }}
          >
            High-performance web solutions and scalable infrastructure that power your business
            today—and expand your potential for tomorrow.
          </TypeSpecimen>
          <TypeSpecimen
            meta="--text-mono-label · 0.7rem · Plex Mono 500 · ls 0.12em · uppercase · pills, nav, metadata"
            sampleStyle={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-mono-label)',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-dim)',
            }}
          >
            04 // About us · response time: &lt; 24h
          </TypeSpecimen>
        </div>
      </DemoPanel>

      <RuleGrid
        rules={[
          {
            title: 'Sentence case in storage',
            body: (
              <>
                Display text is stored as &quot;Get Started&quot;, never &quot;GET STARTED&quot; —
                UPPERCASE is always <code>text-transform</code>. Data stays readable; the brand
                stays a stylesheet decision.
              </>
            ),
          },
          {
            title: 'Never literal font names',
            body: (
              <>
                next/font rewrites family names (<code>__makira_a1b2c3</code>). Always reference{' '}
                <code>var(--font-sans)</code> / <code>var(--font-mono)</code> /{' '}
                <code>var(--font-display)</code>. This is also why Pretext resolves COMPUTED names.
              </>
            ),
          },
          {
            title: 'Container queries fit headlines',
            body: (
              <>
                The hero h1 is sized in <code>cqw</code> against its own column (the longest line
                is ~12.2em of Makira Black) — viewport units cannot know column width.{' '}
                <code>--text-display</code> stays as the no-CQ fallback.
              </>
            ),
          },
          {
            title: 'Mono is machinery',
            body: 'Plex Mono marks the terminal register: labels, nav, eyebrows, tags, commands, metadata. Prose never sets in mono; mono never exceeds a line or two.',
          },
          {
            title: 'Letter-spaced text is never measured',
            body: 'Canvas measurement ignores letter-spacing — tracked mono labels are banned from Pretext and from slot-roll width assumptions beyond what the sizer cells handle.',
          },
        ]}
      />

      <CodeBlock
        title="Recipe — wiring the fonts in a new project (next/font/local)"
        lang="ts"
        code={`// src/fonts/index.ts — copy from the kit (fonts/ ships the woff2 files)
import localFont from 'next/font/local'

export const makira = localFont({
  src: [
    { path: './Makira-Regular.woff2', weight: '400' },
    { path: './Makira-Medium.woff2', weight: '500' },
    { path: './Makira-Bold.woff2', weight: '700' },
    { path: './Makira-Black.woff2', weight: '900' },
  ],
  variable: '--font-makira',
  display: 'swap',
})
// layout.tsx: <body className={\`\${makira.variable} \${plexMono.variable}\`}>
// globals.css maps the stacks:
//   --font-stack-sans: var(--font-makira), ui-sans-serif, system-ui, sans-serif;`}
      />

      <AgentNote
        checklist={[
          'Copy src/fonts/ from the kit (woff2 + index.ts), attach both variables to <body>',
          'Map --font-stack-sans/--font-stack-mono in globals.css; alias --font-display to the sans stack',
          'Store all copy sentence-case in a content.ts; uppercase via CSS only',
          'Headline must fit a column exactly? container-type: inline-size + cqw — never vw',
          'Run a real-browser check at 375px and ≥2560px — the clamps are tuned for both ends',
        ]}
      >
        The voice/machinery split is the whole identity: <strong>Makira speaks, Plex Mono
        operates</strong>. If a piece of text is a value, a label, a path, a command, or a status —
        it&apos;s mono. If it persuades or explains — it&apos;s Makira. When unsure, count the
        words: more than six is probably voice.
      </AgentNote>
    </DsSection>
  )
}
