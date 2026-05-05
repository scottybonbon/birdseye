"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline scroll progress indicator pinned to the top of the viewport.
 * Hidden behind the nav backdrop, so it appears as a subtle thread
 * tracking page progress.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-px bg-birdseye-electric origin-left z-[60]"
    />
  );
}
