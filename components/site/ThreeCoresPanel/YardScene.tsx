"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { COLORS } from "./constants";

/**
 * YardScene, the YardCore overlay.
 *
 * Sits over the bottom "trailer yard" zone of the WorldBase. The
 * trailer slots populate with trailers, a spotter truck moves a
 * trailer between rows, the dwell heatmap pulses (green clear,
 * amber aging), one trailer ages out and gets a DWELL callout, an
 * inspection route highlight briefly traces a row.
 *
 * 5-second sequence:
 *   0.0–1.0s  Trailers populate the slots (subtle stagger).
 *   1.0–2.5s  Spotter moves a trailer from B-04 → C-09.
 *   2.5–4.0s  Heatmap pulses; one trailer (B-02) turns amber and
 *             gets a DWELL · 04:12:00 callout.
 *   4.0–5.0s  Inspection route highlights row B briefly.
 */
export function YardScene({ restartKey }: { restartKey: number }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setStep(1), 1000));
    timers.push(window.setTimeout(() => setStep(2), 2500));
    timers.push(window.setTimeout(() => setStep(3), 4000));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [restartKey]);

  // Trailer slot positions (mirrors WorldBase grid)
  const rowB = Array.from({ length: 5 }, (_, i) => ({
    x: 60,
    y: 560 + i * 75,
    label: `B-0${i + 1}`,
  }));
  const rowC = Array.from({ length: 5 }, (_, i) => ({
    x: 320,
    y: 560 + i * 75,
    label: `C-0${i + 1}`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Trailers populating the grid (each is a simple top-down
            rectangle inside the slot from WorldBase). Some slots
            stay empty (which is normal yard reality). */}
        {[
          { ...rowB[0], filled: true, status: "ok" },
          { ...rowB[1], filled: true, status: "warn" }, // B-02 ages out
          { ...rowB[2], filled: true, status: "ok" },
          { ...rowB[3], filled: false, status: "ok" }, // B-04 will be moved IN
          { ...rowB[4], filled: true, status: "ok" },
          { ...rowC[0], filled: true, status: "ok" },
          { ...rowC[1], filled: true, status: "ok" },
          { ...rowC[2], filled: false, status: "ok" }, // C-03 empty
          { ...rowC[3], filled: true, status: "ok" },
          { ...rowC[4], filled: true, status: "ok" },
        ].map((slot, i) => {
          const isAmber = slot.status === "warn" && step >= 2;
          return (
            <motion.g
              key={slot.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: slot.filled ? 1 : 0 }}
              transition={{
                duration: 0.4,
                delay: 0.05 * i,
                ease: "easeOut",
              }}
            >
              {/* Trailer body inside the slot */}
              <rect
                x={slot.x + 6}
                y={slot.y + 8}
                width="208"
                height="40"
                fill={
                  isAmber ? "rgba(245,158,11,0.18)" : "rgba(74,222,128,0.10)"
                }
                stroke={isAmber ? "#f59e0b" : COLORS.success}
                strokeOpacity={isAmber ? 0.85 : 0.55}
                strokeWidth="1"
              />
              {/* Trailer back doors hint */}
              <line
                x1={slot.x + 210}
                y1={slot.y + 8}
                x2={slot.x + 210}
                y2={slot.y + 48}
                stroke={isAmber ? "#f59e0b" : COLORS.success}
                strokeOpacity={isAmber ? 0.85 : 0.45}
                strokeWidth="1"
              />
            </motion.g>
          );
        })}

        {/* Spotter movement: a trailer slides from off-screen left into
            slot B-04 between t=1.0s and t=2.5s. Visualized as a
            trailer rectangle that translates into the empty B-04 slot. */}
        {step >= 1 && (
          <motion.g
            key={`spotter-${restartKey}`}
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Trailer body sliding into B-04 (rowB[3]) */}
            <rect
              x={rowB[3].x + 6}
              y={rowB[3].y + 8}
              width="208"
              height="40"
              fill={COLORS.electric}
              fillOpacity="0.18"
              stroke={COLORS.electric}
              strokeWidth="1.25"
            />
            {/* Tractor pulling the trailer (small rectangle in front) */}
            <rect
              x={rowB[3].x - 18}
              y={rowB[3].y + 14}
              width="22"
              height="28"
              fill={COLORS.electric}
              fillOpacity="0.28"
              stroke={COLORS.electric}
              strokeWidth="1.25"
            />
          </motion.g>
        )}

        {/* Inspection route highlight, traces along row B briefly */}
        {step >= 3 && (
          <motion.line
            key={`insp-${restartKey}`}
            x1="60"
            y1="935"
            x2="280"
            y2="935"
            stroke={COLORS.electric}
            strokeWidth="2"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          />
        )}
      </svg>

      {/* DWELL callout on the amber trailer (B-02) */}
      {step >= 2 && (
        <motion.div
          key={`dwell-${restartKey}`}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="absolute pointer-events-none"
          style={{ left: "55%", top: "63.5%" }}
        >
          <div className="flex items-center gap-2">
            <span aria-hidden className="h-px w-6 bg-amber-400/55" />
            <span className="font-mono text-[9.5px] tracking-[0.20em] uppercase text-amber-400 whitespace-nowrap">
              Dwell · 04:12:00
            </span>
          </div>
        </motion.div>
      )}

      {/* Inspection callout */}
      {step >= 3 && (
        <motion.div
          key={`insp-text-${restartKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="absolute pointer-events-none"
          style={{ left: "9%", top: "92%" }}
        >
          <span className="font-mono text-[9.5px] tracking-[0.20em] uppercase text-birdseye-electric whitespace-nowrap">
            Inspection · row B
          </span>
        </motion.div>
      )}
    </div>
  );
}
