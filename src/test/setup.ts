import '@testing-library/jest-dom/vitest'

// Auto-mock @/lib/pretext for all component tests (uses Canvas which jsdom doesn't support)
vi.mock('@/lib/pretext', async () => {
  const mocks = await import('@/test/mocks/pretext')
  return mocks
})
