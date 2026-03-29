'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { prepare, layout } from '@chenglou/pretext'

type PretextContextValue = {
  isReady: boolean
  prepare: typeof prepare
  layout: typeof layout
}

const PretextContext = createContext<PretextContextValue>({
  isReady: false,
  prepare,
  layout,
})

const REQUIRED_FONTS = [
  '16px Unbounded',
  '16px "Space Grotesk"',
  '16px "Space Mono"',
]

export function PretextProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) return
      const allLoaded = REQUIRED_FONTS.every((f) => document.fonts.check(f))
      if (allLoaded) {
        setIsReady(true)
      } else {
        // Fonts may still be loading — poll briefly
        const interval = setInterval(() => {
          if (cancelled) {
            clearInterval(interval)
            return
          }
          if (REQUIRED_FONTS.every((f) => document.fonts.check(f))) {
            setIsReady(true)
            clearInterval(interval)
          }
        }, 100)
        // Give up after 3s — graceful degradation
        setTimeout(() => {
          clearInterval(interval)
          if (!cancelled) setIsReady(true)
        }, 3000)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <PretextContext value={{ isReady, prepare, layout }}>
      {children}
    </PretextContext>
  )
}

export function usePretextContext() {
  return useContext(PretextContext)
}
