import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { KIT_DIRS, KIT_FILES } from '../../../kit/manifest.mjs'
import { DS_KIT_FILENAME } from '@/data/designSystem'

const root = path.resolve(__dirname, '../../..')

describe('kit manifest', () => {
  it('every manifest path exists (renames must update kit/manifest.mjs)', () => {
    for (const { from } of [...KIT_DIRS, ...KIT_FILES]) {
      expect(existsSync(path.join(root, from)), `missing kit source: ${from}`).toBe(true)
    }
  })

  it('the built kit zip the sidebar serves exists in public/', () => {
    expect(
      existsSync(path.join(root, 'public', DS_KIT_FILENAME)),
      `run \`npm run build:kit\` — public/${DS_KIT_FILENAME} is missing`
    ).toBe(true)
  })
})
