import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion vocabulary. Everything is short and eased the same way so the
 * whole site feels like one system rather than a pile of separate animations.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.tsx, which strips transforms and leaves only opacity.
 */

export const ease = [0.22, 1, 0.36, 1] as const;

export const transition: Transition = { duration: 0.55, ease };

export const fastTransition: Transition = { duration: 0.32, ease };

/** Default scroll-reveal viewport settings — fires once, slightly early. */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const staggerParent = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Word/line reveal used by the hero display type. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: '38%' },
  visible: { opacity: 1, y: '0%', transition: { duration: 0.72, ease } },
};
