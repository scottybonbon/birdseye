"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  DUR,
  EASE_OUT,
  EASE_IN_OUT,
  usePrefersReducedMotion,
} from "@/_design/motion";

/**
 * SectionInterlude, the quiet pause between sections of contrasting tone.
 *
 * Two modes:
 *
 *   • DEFAULT (Apple-tier understated):
 *       Generous vertical breathing room + a single hairline rule, low
 *       opacity, fading at the edges. The seam isn't a divider, it's
 *       the closing breath of the section it belongs to.
 *
 *   • SIGNATURE (`signature` prop):
 *       Scroll-triggered. As the interlude crosses the viewport, a
 *       hairline sweeps out from center, an electric dot pulses on the
 *       midline, and a small mono caption fades in beneath. Reads as
 *       the next module surfacing, Locomotive / Studio Lin vocabulary
 *       applied to a marketing seam without crossing into theatre.
 *
 * Usage:
 *   // Default breath:
 *   <SectionInterlude tone="dark" />
 *
 *   // Signature break with custom caption:
 *   <SectionInterlude
 *     tone="dark"
 *     signature
 *     caption="MODULE 02 · OPEN"
 *   />
 *
 * Pair `tone` with the BG of the section that PRECEDES this interlude.
 * The next section's color cuts in cleanly after.
 */
export function SectionInterlude({
  tone = "dark",
  signature = false,
  caption,
}: {
  tone?: "dark" | "light";
  /** Render the cinematic version with scroll-triggered hairline sweep
   *  and a mono caption. Default is the quiet breath rule. */
  signature?: boolean;
  /** Mono caption that fades in under the rule. Only honored in
   *  signature mode. Defaults to a neutral system label. */
  caption?: string;
}) {
  const isDark = tone === "dark";
  const bgClass = isDark ? "bg-black" : "bg-birdseye-cream";
  const lineGradient = isDark
    ? "linear-gradient(to right, transparent, rgba(244, 237, 228, 0.10), transparent)"
    : "linear-gradient(to right, transparent, rgba(0, 0, 0, 0.08), transparent)";

  if (!signature) {
    return (
      <div aria-hidden className={`relative ${bgClass} py-14 md:py-20`}>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[min(60%,560px)]"
          style={{ background: lineGradient }}
        />
      </div>
    );
  }

  return <SignatureInterlude tone={tone} caption={caption} />;
}

function SignatureInterlude({
  tone,
  caption = "MODULE · NEXT",
}: {
  tone: "dark" | "light";
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Triggers when the interlude crosses ~30% into the viewport, keeps the
  // sweep tied to scroll timing without needing a full scroll listener.
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px", once: true });
  // When reduce-motion is on, the choreography collapses: every element
  // renders at its final state immediately and the only animated property
  // is a soft opacity fade-in (so it doesn't pop). Same composition, no
  // sweep/punch/rise.
  const reduce = usePrefersReducedMotion();

  const isDark = tone === "dark";
  const bgClass = isDark ? "bg-black" : "bg-birdseye-cream";
  const captionTone = isDark ? "text-birdseye-cream/55" : "text-[#0A0A0B]/55";
  const dotColor = isDark
    ? "bg-birdseye-electric"
    : "bg-birdseye-electric"; // electric reads on both
  const lineColor = isDark
    ? "rgba(244, 237, 228, 0.16)"
    : "rgba(0, 0, 0, 0.12)";

  // ── Reduce-motion path: static composition with a single quiet fade. ──
  if (reduce) {
    return (
      <motion.div
        ref={ref}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: DUR.base, ease: EASE_OUT }}
        className={`relative ${bgClass} py-20 md:py-28 overflow-hidden`}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[min(72%,640px)]"
          style={{ background: lineColor }}
        />
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full ${dotColor}`}
        />
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 mt-8 font-mono text-[10.5px] tracking-[0.22em] uppercase ${captionTone} whitespace-nowrap`}
        >
          {caption}
        </div>
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72%,640px)] flex justify-between"
        >
          <span className="h-2 w-px" style={{ background: lineColor }} />
          <span className="h-2 w-px" style={{ background: lineColor }} />
        </div>
      </motion.div>
    );
  }

  // ── Full-motion path: original sweep + punch + rise choreography. ──
  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative ${bgClass} py-20 md:py-28 overflow-hidden`}
    >
      {/* The sweep, single hairline that grows outward from center on
          scroll cross. origin-center + scaleX 0→1 keeps the growth
          symmetrical regardless of viewport width. */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[min(72%,640px)] origin-center"
        style={{ background: lineColor }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          inView
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 1.2, ease: EASE_IN_OUT }}
      />

      {/* Electric midline dot, punches at the same beat the line completes,
          then settles. Reads as a calibration marker. */}
      <motion.div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full ${dotColor}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          inView
            ? { scale: [0, 1.6, 1], opacity: [0, 1, 0.85] }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT }}
      />

      {/* Mono caption, fades in beneath the line after the sweep has
          resolved. Stays subtle: 12px mono in cream/55, tracking
          0.18em (looser than system-label so it reads as a footnote
          rather than a heading). */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 6 }
        }
        transition={{ duration: DUR.smooth, delay: 0.95, ease: EASE_OUT }}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 mt-8 font-mono text-[10.5px] tracking-[0.22em] uppercase ${captionTone} whitespace-nowrap`}
      >
        {caption}
      </motion.div>

      {/* Tick marks at the line ends, small instrumentation feel, fade
          in last. Subtle but reads as "the rule was placed by an
          instrument, not drawn arbitrarily." */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: DUR.smooth, delay: 1.1, ease: EASE_OUT }}
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72%,640px)] flex justify-between"
      >
        <span
          className="h-2 w-px"
          style={{ background: lineColor }}
        />
        <span
          className="h-2 w-px"
          style={{ background: lineColor }}
        />
      </motion.div>
    </div>
  );
}
