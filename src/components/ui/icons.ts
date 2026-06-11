import {
  Code2,
  Wrench,
  Network,
  Cloud,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import type { IconKey } from '@/data/content'

/**
 * String-keyed icon registry so content.ts stays serializable.
 * Render at 20px with strokeWidth 1.5 and aria-hidden — the stroke style
 * matches the outlined QubeTXLogo cube.
 */
export const SERVICE_ICONS: Record<IconKey, LucideIcon> = {
  code: Code2,
  wrench: Wrench,
  network: Network,
  cloud: Cloud,
  shield: ShieldCheck,
}

export { ChevronDown, Menu, X, ArrowRight, ArrowUpRight }
export type { LucideIcon }
