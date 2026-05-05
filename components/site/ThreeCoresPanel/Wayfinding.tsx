"use client";

import { CORE_ORDER, type CoreKey } from "./types";

/**
 * Wayfinding, the always-visible top-right suite labels.
 *
 * Reads as architectural drawing wayfinding (think: "GATE / FENCE /
 * YARD" filed to the corner of a site plan), not as tabs. The active
 * core lights electric, the others sit in dim cream. Subtle fade on
 * state change, no other motion.
 */
export function Wayfinding({ active }: { active: CoreKey }) {
  return (
    <div
      aria-hidden
      className="absolute top-5 right-5 md:top-6 md:right-7 z-20 flex items-center gap-3 md:gap-4 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase"
    >
      {CORE_ORDER.map((core, i) => (
        <div key={core} className="flex items-center gap-3 md:gap-4">
          {i > 0 && (
            <span aria-hidden className="text-birdseye-cream/15">
              ·
            </span>
          )}
          <span
            className={
              core === active
                ? "text-birdseye-electric transition-colors duration-500"
                : "text-birdseye-cream/35 transition-colors duration-500"
            }
          >
            {core === "gate" && "GateCore"}
            {core === "safe" && "SafeCore"}
            {core === "yard" && "YardCore"}
          </span>
        </div>
      ))}
    </div>
  );
}
