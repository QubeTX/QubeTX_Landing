/**
 * Compatibility shim — the motion system now lives in src/lib/motion/.
 * Import from '@/lib/motion' in new code.
 */
export {
  createContainerVariants,
  slideUpVariants,
  slideLeftVariants,
  heroItemVariants,
  sectionTitleAnimation,
} from '@/lib/motion/variants'
