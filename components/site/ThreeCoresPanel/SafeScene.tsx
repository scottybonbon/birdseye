"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { COLORS } from "./constants";

/**
 * SafeScene, the SafeCore overlay.
 *
 * Sits over the middle "perimeter" zone of the WorldBase. Cameras
 * along the fence brighten + project soft cones. A figure crosses
 * into a cone; the system flags MOTION; a Voice-Down arc projects
 * from a speaker; the figure retreats; the alert resolves.
 *
 * 5-second sequence:
 *   0.0–1.5s   Cameras brighten, cones project softly.
 *   1.5–3.0s   Figure enters cone, MOTION callout pulses.
 *   3.0–4.0s   Voice-Down arc projects, figure retreats.
 *   4.0–5.0s   RESOLVED stamp fades in, cones quiet down.
 *
 * Calm, not threat-dramatic. A perimeter event handled cleanly.
 */
export function SafeScene({ restartKey }: { restartKey: number }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setStep(1), 1500));
    timers.push(window.setTimeout(() => setStep(2), 3000));
    timers.push(window.setTimeout(() => setStep(3), 4000));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [restartKey]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* The fence line (already in WorldBase) gets brightened here
            via an electric overlay across its length. */}
        <line
          x1="40"
          y1="400"
          x2="560"
          y2="400"
          stroke={COLORS.cream}
          strokeWidth="1.5"
          strokeOpacity="0.85"
        />

        {/* Camera cones, projected forward from each camera position.
            Cone = thin triangle. Brightens electric. */}
        {[110, 250, 390, 510].map((cx, i) => {
          const isActive = i === 1; // CAM-02 is the one that catches the event
          return (
            <g key={`cone-${cx}`}>
              {/* Camera body (matches WorldBase) brightened */}
              <polygon
                points={`${cx - 5},388 ${cx + 5},388 ${cx},381`}
                fill={isActive ? COLORS.electric : COLORS.cream}
                fillOpacity={isActive ? 0.85 : 0.35}
                stroke={isActive ? COLORS.electric : COLORS.cream}
                strokeWidth="1.25"
              />
              {/* Cone projecting south into the property */}
              <motion.polygon
                points={`${cx},395 ${cx - 80},560 ${cx + 80},560`}
                fill={isActive ? COLORS.electric : COLORS.cream}
                fillOpacity={
                  step >= 1 && isActive
                    ? 0.18
                    : isActive
                      ? 0.10
                      : 0.04
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              />
            </g>
          );
        })}

        {/* The figure that enters the cone (a small geometric person
            silhouette). Crosses through CAM-02's cone. */}
        {step >= 1 && (
          <motion.g
            key={`figure-${restartKey}`}
            initial={{ x: -40 }}
            animate={{ x: step >= 2 ? -40 : 0 }}
            transition={{
              duration: step >= 2 ? 1.0 : 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <g transform="translate(250 470)">
              {/* Head */}
              <circle cx="0" cy="-12" r="6" fill={COLORS.cream} fillOpacity="0.85" />
              {/* Body */}
              <rect
                x="-5"
                y="-5"
                width="10"
                height="22"
                fill={COLORS.cream}
                fillOpacity="0.85"
              />
            </g>
          </motion.g>
        )}

        {/* Voice-down arc from speaker (CAM-02 doubles as speaker
            position). Projects toward the figure's location. */}
        {step >= 2 && step < 3 && (
          <motion.g
            key={`vd-${restartKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Three concentric arcs radiating from CAM-02 */}
            {[20, 40, 60].map((r, i) => (
              <motion.circle
                key={`arc-${r}`}
                cx="250"
                cy="395"
                r={r}
                fill="none"
                stroke={COLORS.electric}
                strokeWidth="1"
                strokeOpacity={0.7 - i * 0.18}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </motion.g>
        )}
      </svg>

      {/* MOTION callout, anchored above CAM-02 */}
      {step >= 1 && step < 3 && (
        <motion.div
          key={`motion-${restartKey}`}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute pointer-events-none"
          style={{ left: "44%", top: "36%" }}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.5px] tracking-[0.20em] uppercase text-birdseye-electric whitespace-nowrap">
              Motion · Zone 04
            </span>
            <span aria-hidden className="h-px w-6 bg-birdseye-electric/55" />
          </div>
        </motion.div>
      )}

      {/* Voice-Down callout */}
      {step >= 2 && step < 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute pointer-events-none"
          style={{ left: "9%", top: "39.5%" }}
        >
          <span className="font-mono text-[9.5px] tracking-[0.20em] uppercase text-birdseye-electric whitespace-nowrap">
            Voice-Down™ · live
          </span>
        </motion.div>
      )}

      {/* RESOLVED stamp */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute pointer-events-none"
          style={{ left: "9%", top: "47%" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-birdseye-success/40 bg-birdseye-success/[0.08] px-3 py-1.5 font-mono text-[9.5px] tracking-[0.22em] uppercase text-birdseye-success">
            <span aria-hidden className="h-1 w-1 rounded-full bg-birdseye-success" />
            Resolved · 03:14:31
          </div>
        </motion.div>
      )}
    </div>
  );
}
