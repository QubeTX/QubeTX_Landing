import type { FC } from 'react'
import { tint, type TintLang } from '@/lib/designSystem/tinyTint'
import styles from './CodeBlock.module.css'

type CodeBlockProps = {
  code: string
  lang?: TintLang
  /** Optional mono title bar (e.g. a file path). */
  title?: string
}

/**
 * Static, server-renderable code block tinted by tinyTint (no highlighter
 * dependency, no client JS). Recipes on the design-system page are meant
 * to be copied — keep snippets short and runnable.
 */
const CodeBlock: FC<CodeBlockProps> = ({ code, lang = 'ts', title }) => (
  <figure className={styles.block}>
    {title && <figcaption className={styles.title}>{title}</figcaption>}
    <pre className={styles.pre}>
      <code>
        {tint(code.trimEnd(), lang).map((t, i) => (
          <span key={i} className={styles[t.kind]}>
            {t.text}
          </span>
        ))}
      </code>
    </pre>
  </figure>
)

export default CodeBlock
