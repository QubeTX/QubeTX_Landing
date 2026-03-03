import React from 'react'

const createMotionComponent = (tag: string) => {
  const Component = React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      initial, animate, exit, variants, transition,
      whileHover, whileTap, whileInView, whileFocus, whileDrag,
      layout, layoutId, onAnimationStart, onAnimationComplete,
      viewport,
      ...htmlProps
    } = props
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return React.createElement(tag, { ...htmlProps, ref })
  })
  Component.displayName = `Motion${tag}`
  return Component
}

export const motion = new Proxy({} as Record<string, React.ComponentType>, {
  get: (_target, prop: string) => createMotionComponent(prop),
})

export const useInView = () => true

// Optional: dummy export for specific layout ID components
export const LayoutGroup = function LayoutGroup({ children }: { children: React.ReactNode }) { return React.createElement(React.Fragment, null, children); };
LayoutGroup.displayName = 'LayoutGroup';
const AnimatePresenceComponent = ({ children }: { children: React.ReactNode }) => children;
AnimatePresenceComponent.displayName = 'AnimatePresence';
export const AnimatePresence = AnimatePresenceComponent;
export type Variants = Record<string, unknown>
