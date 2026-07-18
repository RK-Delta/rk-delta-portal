"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

const SHOW_AFTER_PX = 500;

export function ScrollToTop() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > SHOW_AFTER_PX);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Scroll to top"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed right-[calc(1.5rem+env(safe-area-inset-right))] bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--surface)] text-[var(--accent)] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/60 hover:shadow-[0_0_0_1px_var(--accent)]"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
