import type { ThreeElements } from '@react-three/fiber'

declare global {
  namespace JSX {
    // Expand JSX intrinsic elements with @react-three/fiber primitives.
    type IntrinsicElements = ThreeElements
  }
}
