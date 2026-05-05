"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/_design/motion";

/**
 * HeroCvOverlay — quiet evidence that the AI is watching.
 *
 * COMP-8 / AWARD-2 (2026-05-03): Three detection frames that find
 * things in the hero video, hold for ~1.5s, then fade. No labels, no
 * text, no bounding-box arrays — just corner brackets in the
 * surveillance-HUD vocabulary, electric blue at low opacity.
 *
 * The point is not to convince the visitor that real CV is running on
 * the hero video. The point is to make the "AI is watching" claim
 * self-evident before any text reads. Two seconds of brackets resolving
 * over a slow-pan yard says more than any feature card.
 *
 * Positions are picked thematically (lower-mid for vehicles, mid-right
 * for a person-sized object, upper-left for context). The video is a
 * slow upward pan, so the framing reads as the AI "tracking" things in
 * the camera's field — exactly the brand promise.
 *
 * Restraint:
 *   - Three detections per 14s loop. NEVER more than one bracket on
 *     screen at a time. The eye finds it when it's there, doesn't
 *     resent it when it's not.
 *   - Stroke 1.5px, opacity 0.55 max — sits behind the hero H1's
 *     legibility shadow, never competes for attention.
 *   - The brackets are pure geometry. No labels saying "PERSON" or
 *     "VEHICLE" — that would feel like LARPing the AI claim. The
 *     emptiness of the brackets is the discipline.
 *   - Reduce-motion: rendered at zero opacity (no animation, no
 *     visibility). The hero video already pauses under reduce-motion;
 *     the CV layer follows the same posture.
 *   - z-[5] sits BELOW the hero H1 (z-10+) and ABOVE the video
 *     gradient overlay so the brackets look like they're on the glass
 *     between the camera and the viewer, not painted over the type.
 */

type Detection = {
  /** Position as a percentage of the parent's width / height. The
   *  detection is centered on (x, y) with the given (w, h). */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Stagger position in the 14s loop, in seconds. */
  delay: number;
};

const DETECTIONS: Detection[] = [
  // Lower-left, vehicle-sized framing — feels like a parked truck on the lot
  { x: 28, y: 68, w: 13, h: 10, delay: 0 },
  // Center-right, smaller — person-sized
  { x: 72, y: 56, w: 7, h: 9, delay: 4.5 },
  // Lower-mid-right, vehicle-sized — second truck
  { x: 56, y: 73, w: 15, h: 10, delay: 9 },
];

const LOOP_DURATION = 14; // total cycle in seconds
const SHOW_DURATION = 2.3; // visible portion per detection

export function HeroCvOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] motion-reduce:hidden"
    >
      {DETECTIONS.map((d, i) => (
        <DetectionFrame key={i} detection={d} />
      ))}
    </div>
  );
}

function DetectionFrame({ detection }: { detection: Detection }) {
  const { x, y, w, h, delay } = detection;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.55, 0.55, 0],
        scale: [1.06, 1, 1, 1.03],
      }}
      transition={{
        duration: SHOW_DURATION,
        times: [0, 0.18, 0.82, 1],
        delay,
        repeat: Infinity,
        repeatDelay: LOOP_DURATION - SHOW_DURATION,
        ease: EASE_OUT,
      }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
        transform: "translate(-50%, -50%)",
        color: "var(--birdseye-electric, #2E4BFF)",
      }}
    >
      {/* Four corner brackets, each a small L-shape made of borders.
          Bracket size scales with the frame — ~22% of the smaller
          dimension so the corners read at any frame size. */}
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />
    </motion.div>
  );
}

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  // Each corner is 14px × 14px with two borders forming an L.
  const base =
    "absolute h-[14px] w-[14px] border-current pointer-events-none";
  const positionClass = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  }[position];
  return (
    <span
      aria-hidden
      className={`${base} ${positionClass}`}
      style={{ borderWidth: "1.5px" }}
    />
  );
}
