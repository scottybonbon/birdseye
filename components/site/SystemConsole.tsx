"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";

/**
 * SystemConsole, the always-on operational signal.
 *
 * A thin mono pill anchored to the bottom-left corner of the viewport on
 * desktop. Format:
 *
 *   [● Live]  /  Yard 04 · Driver ID verified
 *
 * Combines the brand status indicator (#62) with the rotating yard-event
 * caption (#69 folded in). Cycles every 4.5s through a fixed feed of
 * realistic gate-event captions. Reads as: "this site is a control
 * surface, not a brochure", the same way Linear / Vercel show subtle
 * system-status indicators in their UIs.
 *
 * Restraint:
 *   - Hidden under lg breakpoint (mobile would crowd)
 *   - Pauses on hover so the user can finish reading
 *   - Under prefers-reduced-motion, the rotation is killed and only the
 *     most recent event is shown, the dot still pulses-substitute via a
 *     static color (no ambient ping animation)
 *   - Tucks behind modals (z-40, modals own z-50+)
 */

const events = [
  "Yard 04 · Driver ID verified",
  "Yard 12 · Seal check passed",
  "Yard 09 · BOL match confirmed",
  "Yard 07 · Compliance clear",
  "Yard 03 · Gate clear · driver routed",
  "Yard 11 · Trailer recognized",
  "Yard 04 · Voice-Down™ resolved",
  "Yard 14 · Empty verified",
  "Yard 06 · Pre-trip inspection clear",
  "Yard 02 · License plate matched",
  "Yard 08 · Hazardous load protocol cleared",
  "Yard 05 · Tire check passed",
];

export function SystemConsole() {
  const reduceMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Hydration-safe, only mount + cycle client-side. SSR renders nothing,
  // so there's no flash of the wrong event during hydration.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduceMotion || paused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % events.length);
    }, 4500);
    return () => clearInterval(id);
  }, [mounted, reduceMotion, paused]);

  if (!mounted) return null;

  // Open the command palette via a custom event the CommandPalette listens
  // for. Keeps SystemConsole free of any direct dependency on the palette
  // module, they communicate through the window event bus.
  const openPalette = () => {
    window.dispatchEvent(new Event("birdseye:cmdk-open"));
  };

  // Detect the right modifier glyph for the affordance, ⌘ on macOS,
  // ⌃ everywhere else. Falls back to ⌘ during SSR/first paint.
  const modGlyph =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "")
      ? "⌘"
      : "⌃";

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center gap-2">
      {/* Status pill, live indicator + rotating event caption */}
      <div
        role="status"
        aria-label="Live system status"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex items-center gap-3 px-3.5 h-9 rounded-pill bg-black/65 backdrop-blur-md border border-birdseye-cream/[0.10] font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/55 transition-colors hover:text-birdseye-cream/85 hover:border-birdseye-cream/20 select-none"
      >
        <span className="flex items-center gap-2 shrink-0">
          <span className="relative grid place-items-center h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-birdseye-success" />
            {!reduceMotion && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-birdseye-success animate-ping opacity-60"
              />
            )}
          </span>
          <span className="text-birdseye-success">Live</span>
        </span>

        <span aria-hidden className="text-birdseye-cream/15">
          /
        </span>

        <div className="relative h-[14px] w-[260px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: DUR.base, ease: EASE_OUT }}
              className="absolute inset-0 whitespace-nowrap"
            >
              {events[idx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* ⌘K affordance, quiet sister pill that opens the CommandPalette.
          Visually paired with the status pill but semantically distinct
          (button, not status). Reads as: "this site is keyboard-driven." */}
      <button
        type="button"
        onClick={openPalette}
        aria-label="Open command palette (⌘K)"
        className="flex items-center gap-1.5 px-3 h-9 rounded-pill bg-black/65 backdrop-blur-md border border-birdseye-cream/[0.10] font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/55 transition-colors hover:text-birdseye-cream/85 hover:border-birdseye-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black select-none"
      >
        <span className="text-birdseye-electric">{modGlyph}K</span>
        <span aria-hidden>·</span>
        <span>Command</span>
      </button>
    </div>
  );
}
