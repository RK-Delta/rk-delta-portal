"use client";

import { motion } from "framer-motion";

export function BorderSweep({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-x-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
    );
  }

  return (
    <div className="absolute inset-x-0 top-0 h-[1px] w-full overflow-hidden">
      <motion.div
        className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-100 blur-[2px]"
        animate={{ left: ["-50%", "100%"] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
      />
      <motion.div
        className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
        animate={{ left: ["-50%", "100%"] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
      />
    </div>
  );
}
