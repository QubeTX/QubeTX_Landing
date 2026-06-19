import type { Metadata } from 'next'
import EggsyPanel from '@/components/eggsy/EggsyPanel'

export const metadata: Metadata = {
  title: 'EGG-300 // Egg Key — QubeTX',
  description: 'The QubeTX easter-egg key, decrypted. Download the cheatsheet.',
}

export default function EggsyPage() {
  return <EggsyPanel />
}
