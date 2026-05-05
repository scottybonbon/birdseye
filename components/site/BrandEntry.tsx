"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";

/**
 * BrandEntry, first-impression set piece.
 *
 * A short overlay that fires ONCE per browser session before the rest of the
 * site reveals itself. Reads as a system coming online: hairline structural
 * frame, mono boot caption top-left, status caption top-right, the BIRDSEYE
 * wordmark sharpening into focus letter-by-letter (developing-photograph
 * metaphor, fits Birdseye's surveillance/operations brand better than a
 * scattered fly-in), an electric hairline progress bar resolving underneath,
 * a green-dot OPERATIONAL caption, and frame-counter telemetry in the
 * corners.
 *
 * Restraint:
 *   • Session-gated. After the first paint of any session, sessionStorage
 *     suppresses the loader so navigation back to the site never replays it.
 *   • prefers-reduced-motion → instant logotype, no stagger, hold 200ms,
 *     fade out 200ms. Same set, no choreography.
 *   • Body scroll locked while the overlay is up so it can't compete with
 *     the Hero animation underneath.
 *   • z-[70] sits above the Nav (z-50) and the SystemConsole (z-40) but
 *     below modal layers if any future modal needs to fire mid-loader.
 *   • The wordmark element carries `data-cursor='magnify'` so the
 *     CustomCursor primes the magnify mode the instant it touches the
 *     overlay, operational continuity from frame zero.
 *
 * Total runtime: ~2.6s on full motion, ~0.6s on reduced motion.
 */

const STORAGE_KEY = "birdseye:entry-shown:v1";
const LETTERS = ["B", "I", "R", "D", "S", "E", "Y", "E"];

// Choreography (seconds), exposed as constants so the timing is auditable
// as a single block. Adjust the master tempo by scaling everything below.
const T = {
  /** Frame caption fade in, top-left + top-right system labels appear. */
  framesIn: 0.05,
  /** First letter of the wordmark begins resolving. */
  letterStart: 0.32,
  /** Stagger between letters, kept tight so the wordmark feels assembled
   *  by a single instrument, not a typewriter. */
  letterStep: 0.075,
  /** Per-letter resolve duration. */
  letterDur: 0.7,
  /** Hairline progress rail starts filling. */
  railStart: 0.32,
  /** Hairline progress rail fills over… */
  railDur: 1.5,
  /** Green-dot status caption pops in once the wordmark is mostly there. */
  statusIn: 1.5,
  /** Hold time after everything is on stage. */
  hold: 0.4,
  /** Overlay exit duration. */
  exit: 0.55,
} as const;

const FULL_DURATION_MS =
  (T.statusIn + 0.4 + T.hold + T.exit) * 1000; // ≈ 2.85s buffer
const REDUCED_DURATION_MS = 700;

export function BrandEntry() {
  // The hook is great for reactive updates after mount, but it returns
  // `false` on the very first render (before its own effect runs). For the
  // entry loader, we need the resolved value the first time we paint 
  // otherwise a reduced-motion user briefly gets the full choreography
  // before we swap to the static path. So we read media-query state
  // synchronously inside the mount effect and store it in our own state.
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [resolvedReduce, setResolvedReduce] = useState(false);
  // Keep the hook so the React tree reacts if the user toggles their OS
  // preference mid-session (rare but tidy).
  const liveReduce = usePrefersReducedMotion();

  // Mount → check session → activate (or no-op).
  useEffect(() => {
    setMounted(true);
    let shown: string | null = null;
    try {
      shown = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      // Some Safari private-mode contexts throw on sessionStorage. In that
      // case, silently skip the loader rather than crashing, the brand
      // entry is decoration, not function.
      return;
    }
    if (shown) return;

    // Resolve reduce-motion synchronously now that we're on the client.
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }
    setResolvedReduce(reduce);

    setActive(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }

    // Lock body scroll for the duration the overlay is up. Restoring on
    // both timeout completion AND unmount avoids the ghost-locked-body bug
    // when React StrictMode double-invokes the effect.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const total = reduce ? REDUCED_DURATION_MS : FULL_DURATION_MS;
    const timer = window.setTimeout(() => {
      setActive(false);
    }, total);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
    // Empty deps, the loader fires once on mount. liveReduce changes are
    // intentionally NOT a trigger; once the loader is running the timeline
    // is committed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the user toggled reduce-motion mid-loader (e.g. via OS settings),
  // honor it, collapse to the static path immediately. liveReduce wins
  // over the snapshot.
  const reduceMotion = resolvedReduce || liveReduce;

  // Restore body scroll when the exit animation completes, handled via
  // onAnimationComplete on the wrapper so we restore even if the timer
  // somehow lapsed before AnimatePresence finished.
  const onExitComplete = () => {
    document.body.style.overflow = "";
  };

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {active && (
        <BrandEntryStage
          key="brand-entry"
          reduceMotion={reduceMotion}
        />
      )}
    </AnimatePresence>
  );
}

function BrandEntryStage({ reduceMotion }: { reduceMotion: boolean }) {
  // Reduced-motion path, instant final state, single fade in/out.
  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DUR.base, ease: EASE_OUT }}
        className="fixed inset-0 z-[70] bg-black grid place-items-center"
        role="dialog"
        aria-modal="true"
        aria-label="Birdseye"
      >
        <span
          data-cursor="magnify"
          className="font-sans font-bold text-birdseye-cream text-[clamp(3rem,9vw,7rem)] tracking-[-0.04em] leading-none"
        >
          BIRDSEYE
        </span>
        <span className="absolute bottom-[28%] system-label text-birdseye-electric flex items-center gap-3">
          <span className="h-1 w-1 rounded-full bg-birdseye-success" />
          OPERATIONAL · MISSISSAUGA
        </span>
      </motion.div>
    );
  }

  // Full-motion path.
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: T.exit, ease: EASE_OUT }}
      className="fixed inset-0 z-[70] bg-black overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Birdseye, entering"
    >
      {/* Architectural rule lines, quiet plus-cross structuring the frame.
          Reads as a calibration grid, not a marketing intro. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: T.framesIn, ease: EASE_OUT }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-birdseye-cream/[0.05]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-birdseye-cream/[0.05]" />
      </motion.div>

      {/* Top-left boot caption, system status indicator */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: T.framesIn, ease: EASE_OUT }}
        className="absolute top-6 md:top-8 left-6 md:left-8 system-label text-birdseye-cream/55 flex items-center gap-2"
      >
        <span className="relative grid place-items-center h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-birdseye-success" />
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-birdseye-success/60"
            animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        </span>
        YOS · BOOT
      </motion.div>

      {/* Top-right system meta, version + coordinates */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: T.framesIn + 0.05, ease: EASE_OUT }}
        className="absolute top-6 md:top-8 right-6 md:right-8 system-label text-birdseye-cream/35 hidden sm:block"
      >
        v1.4 · 43.5890° N · 79.6441° W
      </motion.div>

      {/* Wordmark, letters resolve from heavy blur into sharpness, with a
          tiny vertical drift so the assembly reads as deliberate. The whole
          group sits dead-center; cross-hairline above passes through it. */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          data-cursor="magnify"
          className="flex items-baseline"
          aria-label="Birdseye"
        >
          {LETTERS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: T.letterDur,
                delay: T.letterStart + i * T.letterStep,
                ease: EASE_OUT,
              }}
              className="font-sans font-bold text-birdseye-cream text-[clamp(3rem,9vw,7rem)] tracking-[-0.04em] leading-none"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hairline progress rail, single thin line resolving across, sitting
          ~120px below the wordmark center. Electric blue fill on the rail. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-[clamp(80px,12vh,160px)] w-[min(280px,55vw)] h-px bg-birdseye-cream/[0.10] overflow-hidden"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: T.railDur,
            delay: T.railStart,
            ease: EASE_OUT,
          }}
          className="h-full w-full bg-birdseye-electric origin-left"
        />
      </div>

      {/* Status caption, green dot + OPERATIONAL when the rail finishes.
          Sits below the rail, mono, brand electric. */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.statusIn, ease: EASE_OUT }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-[clamp(105px,14vh,190px)] system-label text-birdseye-electric flex items-center gap-3 whitespace-nowrap"
      >
        <span className="relative grid place-items-center h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-birdseye-success" />
        </span>
        OPERATIONAL · MISSISSAUGA · LIVE
      </motion.div>

      {/* Bottom-left frame counter, instrumentation telemetry */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: T.framesIn, ease: EASE_OUT }}
        className="absolute bottom-6 md:bottom-8 left-6 md:left-8 system-label text-birdseye-cream/30"
      >
        FRAME 0001 · SESSION OPEN
      </motion.div>

      {/* Bottom-right entry counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: T.framesIn + 0.1, ease: EASE_OUT }}
        className="absolute bottom-6 md:bottom-8 right-6 md:right-8 system-label text-birdseye-cream/30 hidden sm:block"
      >
        ENTRY · 02 / 02
      </motion.div>
    </motion.div>
  );
}
