import React from 'react'

const createMotionComponent = (tag: string) => {
  return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    const {
      initial, animate, exit, variants, transition,
      whileHover, whileTap, whileInView, whileFocus, whileDrag,
      layout, layoutId, onAnimationStart, onAnimationComplete,
      viewport,
      ...htmlProps
    } = props
    return React.createElement(tag, { ...htmlProps, ref })
  })
}

export const motion = new Proxy({} as Record<string, React.ComponentType>, {
  get: (_target, prop: string) => createMotionComponent(prop),
})

export const useInView = () => true

// Optional: dummy export for specific layout ID components
export const LayoutGroup = function LayoutGroup({ children }: any) { return React.createElement(React.Fragment, null, children); };
LayoutGroup.displayName = 'LayoutGroup';
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children
export type Variants = Record<string, unknown>
