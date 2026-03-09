import React from 'react'

const motionPropKeys = new Set([
  'initial', 'animate', 'exit', 'variants', 'transition',
  'whileHover', 'whileTap', 'whileInView', 'whileFocus', 'whileDrag',
  'layout', 'layoutId', 'onAnimationStart', 'onAnimationComplete',
  'viewport',
])

const createMotionComponent = (tag: string) => {
  const Component = React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    const htmlProps: Record<string, unknown> = {}
    for (const key in props) {
      if (!motionPropKeys.has(key)) htmlProps[key] = props[key]
    }
    return React.createElement(tag, { ...htmlProps, ref })
  })
  Component.displayName = `motion.${tag}`
  return Component
}

export const motion = new Proxy({} as Record<string, React.ComponentType>, {
  get: (_target, prop: string) => createMotionComponent(prop),
})

export const useInView = () => true
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children
export type Variants = Record<string, unknown>
