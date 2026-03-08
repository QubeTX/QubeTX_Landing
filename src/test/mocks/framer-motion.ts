import React from 'react'

const createMotionComponent = (tag: string) => {
  const Component = React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    const {
      initial: _initial, animate: _animate, exit: _exit, variants: _variants, transition: _transition,
      whileHover: _whileHover, whileTap: _whileTap, whileInView: _whileInView, whileFocus: _whileFocus, whileDrag: _whileDrag,
      layout: _layout, layoutId: _layoutId, onAnimationStart: _onAnimationStart, onAnimationComplete: _onAnimationComplete,
      viewport: _viewport,
      ...htmlProps
    } = props
    return React.createElement(tag, { ...htmlProps, ref })
  })
  Component.displayName = `MotionComponent(${tag})`
  return Component
}

export const motion = new Proxy({} as Record<string, React.ComponentType>, {
  get: (_target, prop: string) => createMotionComponent(prop),
})

export const useInView = () => true
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children
export type Variants = Record<string, unknown>
