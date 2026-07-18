import type { Variants } from "framer-motion";

export function staggerContainerVariants(
  shouldReduceMotion: boolean | null,
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
    },
  };
}

export function staggerItemVariants(shouldReduceMotion: boolean | null): Variants {
  return {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
}
