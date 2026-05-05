/**
 * Birdseye motion system, single source of truth for easing, duration,
 * and the standard scroll-reveal pattern.
 *
 * Why this file exists:
 *   • Every component used to declare its own `const ease = [0.22, 1, 0.36, 1]`
 *     at the top. Same value, fifteen-plus copies. Drift-prone.
 *   • Durations were inconsistent, 0.18s / 0.22s / 0.3s / 0.35s / 0.4s /
 *     0.6s / 0.7s / 0.8s / 0.9s used without a system.
 *   • Reduce-motion handling was ad-hoc, present in some components,
 *     missing in others.
 *
 * How to use:
 *   • Import EASE_OUT (the default outro curve) instead of redefining it.
 *   • Import DUR.{fast|base|smooth|slow} for any duration. If you need a
 *     value not in the scale, multiply or add (e.g. `DUR.slow * 2` for a
 *     long counter sweep) so the relationship to the system is visible.
 *   • For the standard scroll fade-up, use `revealVariants` and call
 *     `useRevealMotion()` to get reduce-motion-aware props.
 *   • For one-off animations, gate them with `usePrefersReducedMotion()`.
 *
 * Tweaking the system:
 *   • Want everything 10% snappier? Halve DUR.base.
 *   • Want a more dramatic outro? Change EASE_OUT here.
 *   • Both flow through the entire site automatically.
 */

import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

// ─── Easing curves ─────────────────────────────────────────────────

/** The standard outro, fast start, settled finish. Used for nearly
 *  everything that animates on enter or scroll. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Symmetric in/out, for transitions that move both directions
 *  (modals, panels, scrubbed-back animations). */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Sharp acceleration into a fast finish, for taps, presses, snaps. */
export const EASE_SNAP = [0.4, 0, 0.2, 1] as const;

// ─── Duration scale ────────────────────────────────────────────────

/** Single canonical duration scale (in seconds). Use these instead of
 *  raw numbers so a sitewide tempo change is one edit.
 *
 *  Tempo philosophy: Birdseye is a system that "doesn't blink" 
 *  everything should feel decisive, never dragging. These values are
 *  tuned ~20% snappier than the typical SaaS default so the site
 *  reads as confident and operational, not contemplative. */
export const DUR = {
  /** 140ms, micro-interactions: hover state changes, dot pulses,
   *  cursor mode swaps. Anything that should feel instant but smooth. */
  fast: 0.14,
  /** 240ms, the workhorse. Default for component reveals, dropdowns,
   *  small layout shifts. */
  base: 0.24,
  /** 400ms, confident reveals, hero copy fade-ups, heavy panels. */
  smooth: 0.4,
  /** 650ms, counter sweeps, large image cross-fades, billboard reveals. */
  slow: 0.65,
} as const;

// ─── Standard scroll-reveal variant ────────────────────────────────

/** The fade-up-on-scroll variant used across the site. Pair with
 *  `whileInView` + `viewport={{ once: true, margin: "-80px" }}`. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/** Slightly heavier reveal, taller travel + a touch of scale.
 *  For hero-tier cards and billboard moments. */
export const revealHeroVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/** Standard transition props paired with `revealVariants`. */
export const revealTransition = {
  duration: DUR.smooth,
  ease: EASE_OUT,
} as const;

/** Stagger config for a list of children all using `revealVariants`. */
export const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ─── Reduce-motion hook ────────────────────────────────────────────

/** Returns true if the user has `prefers-reduced-motion: reduce` set.
 *  SSR-safe: returns false on the server, then updates after mount. */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}

/** Convenience: returns the standard reveal props, but with motion
 *  collapsed when reduce-motion is on. Use this on every `motion.div`
 *  that uses the standard fade-up pattern.
 *
 *  Usage:
 *    const reveal = useRevealMotion();
 *    return <motion.div {...reveal}>...</motion.div>;
 */
export function useRevealMotion() {
  const reduce = usePrefersReducedMotion();
  if (reduce) {
    // Collapse to instant, no movement, no fade. Element appears.
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    variants: revealVariants,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
    transition: revealTransition,
  };
}

/** Touch-device detection, separate from reduce-motion but related.
 *  Used to disable hover-only effects on touch screens. SSR-safe. */
export function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(
      "ontouchstart" in window || navigator.maxTouchPoints > 0,
    );
  }, []);

  return touch;
}
