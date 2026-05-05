"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DUR,
  EASE_OUT,
  useIsTouchDevice,
  usePrefersReducedMotion,
} from "@/_design/motion";

/**
 * Custom cursor, subtle dot follower that grows on interactive elements.
 * Hidden on touch devices and reduced-motion preference. Native cursor still
 * shown (no `cursor: none` on body) so accessibility isn't compromised 
 * this layers over the system cursor for atmosphere.
 *
 * MODES (mutually exclusive on the dot):
 *   - "idle"    , small dot, ambient
 *   - "hover"   , medium pill on any interactive element
 *   - "magnify" , giant disc on the BIRDSEYE wordmark (mix-blend-difference
 *                  inverts the cream letters underneath as it passes)
 *   - "target"  , medium dot wrapped in four corner brackets — set-piece
 *                  reticle. Used on the Gate Event Timeline scrub bar +
 *                  camera frames. Mark elements with `data-cursor='target'`.
 *   - "scan"    , medium dot with a thin horizontal hairline through it —
 *                  detection vocabulary. Used on perimeter / CV-related
 *                  elements. Mark with `data-cursor='scan'`.
 *
 * CAPTION (additive HUD readout):
 *   Any element tagged `data-cursor-caption="<some text>"` summons a small
 *   mono uppercase caption that floats next to the cursor while it's over
 *   that element. The caption renders the data attribute verbatim, short,
 *   already-uppercase strings like "ARCHIVE · CAMERA INSTALL · 2024-06".
 *   This is the "surveillance HUD" metaphor under expensive-restraint:
 *   no ambient scan trail, no bracket corners, no constant motion, only
 *   contextual labels on the things worth labeling.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reduceMotion = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [mode, setMode] = useState<
    "idle" | "hover" | "magnify" | "target" | "scan"
  >("idle");
  const [caption, setCaption] = useState<string | null>(null);

  const enabled = !isTouch && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;

      // Mode resolution priority: magnify > target > scan > hover > idle.
      // Set-piece modes (target / scan) win over hover so a target element
      // that's also a button still reads as a target. Magnify still wins
      // overall because the giant disc is a destination, not a tool.
      if (t.closest("[data-cursor='magnify']")) {
        setMode("magnify");
      } else if (t.closest("[data-cursor='target']")) {
        setMode("target");
      } else if (t.closest("[data-cursor='scan']")) {
        setMode("scan");
      } else if (
        t.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
        )
      ) {
        setMode("hover");
      } else {
        setMode("idle");
      }

      // Caption resolution, independent of mode. Walks up to the nearest
      // ancestor with the data attribute and reads its caption text.
      const captioned = t.closest<HTMLElement>("[data-cursor-caption]");
      const next = captioned?.dataset.cursorCaption ?? null;
      setCaption((prev) => (prev === next ? prev : next));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  // Dot dimensions per mode. Target + scan keep the dot itself near
  // hover-size so the reticle / scan-line accessory reads clearly.
  const sizes = { idle: 8, hover: 36, magnify: 280, target: 14, scan: 14 };
  const opacities = { idle: 0.7, hover: 0.9, magnify: 1, target: 0.95, scan: 0.95 };
  const duration = mode === "magnify" ? DUR.base : DUR.fast;

  return (
    <>
      {/* Cursor dot, mix-blend-difference inverts whatever's beneath. */}
      <motion.div
        aria-hidden
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      >
        <motion.div
          animate={{
            width: sizes[mode],
            height: sizes[mode],
            opacity: opacities[mode],
          }}
          transition={{ duration, ease: EASE_OUT }}
          className="rounded-full bg-birdseye-cream -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Target mode — four corner brackets framing the cursor. Sits
          on its own layer (no mix-blend) so the brackets render in
          their own electric color, distinct from the dot underneath.
          Same surveillance-HUD vocabulary as the data-cursor-caption
          pill: sparingly used, contextual, only on set-piece surfaces. */}
      <motion.div
        aria-hidden
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[101]"
      >
        <AnimatePresence>
          {mode === "target" && (
            <motion.svg
              viewBox="0 0 36 36"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: DUR.fast, ease: EASE_OUT }}
              width={36}
              height={36}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--birdseye-electric, #2E4BFF)" }}
            >
              {/* Top-left corner */}
              <path d="M3 9 V3 H9" />
              {/* Top-right corner */}
              <path d="M27 3 H33 V9" />
              {/* Bottom-right corner */}
              <path d="M33 27 V33 H27" />
              {/* Bottom-left corner */}
              <path d="M9 33 H3 V27" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scan mode — thin horizontal hairline through the cursor dot.
          The line is wider than the dot so it reads as the scan line
          passing through the watched object. Electric, low-opacity,
          one element only. */}
      <motion.div
        aria-hidden
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[101]"
      >
        <AnimatePresence>
          {mode === "scan" && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 0.7, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.6 }}
              transition={{ duration: DUR.fast, ease: EASE_OUT }}
              className="absolute -translate-x-1/2 -translate-y-1/2 origin-center"
              style={{
                width: 44,
                height: 1,
                background: "var(--birdseye-electric, #2E4BFF)",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Caption, separate layer so it doesn't inherit mix-blend. Sits
          18px right and 14px below the cursor center, well outside the
          dot's largest hover size. */}
      <motion.div
        aria-hidden
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[101]"
      >
        <AnimatePresence>
          {caption && mode !== "magnify" && (
            <motion.div
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: DUR.fast, ease: EASE_OUT }}
              className="absolute left-[18px] top-[14px] whitespace-nowrap rounded-full bg-black/85 backdrop-blur-md border border-birdseye-cream/[0.10] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/85 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              {caption}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
