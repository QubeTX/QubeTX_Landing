'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useKeySequence, KONAMI, QUBETX } from './useKeySequence'
import { consoleSignature } from './consoleSignature'
import { attachLogoRedraw } from './logoRedraw'
import { firePulse } from '../DotGrid'

// The terminal only loads when summoned — code-split, never in the index bundle
const KonamiTerminal = dynamic(() => import('./KonamiTerminal'), { ssr: false })

/**
 * One mount point for every easter egg (see EASTER_EGGS.md for the key):
 * 1. dev-console signature + hints (once per session)
 * 2. type "qubetx" → dot-field shockwave
 * 3. Konami code → TR-300 web report terminal
 * 4. header logo × 5 clicks in 2.5s → wireframe de-render/redraw
 */
export default function EasterEggProvider() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    consoleSignature()
  }, [])

  useEffect(() => {
    const logo = document.querySelector<SVGSVGElement>('header a[aria-label*="Back to top"] svg')
    if (!logo) return
    return attachLogoRedraw(logo)
  }, [])

  useKeySequence(QUBETX, () => {
    firePulse({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      strength: 2.5,
    })
  })

  useKeySequence(KONAMI, () => setTerminalOpen(true))

  return (
    <AnimatePresence>
      {terminalOpen && <KonamiTerminal onClose={() => setTerminalOpen(false)} />}
    </AnimatePresence>
  )
}
