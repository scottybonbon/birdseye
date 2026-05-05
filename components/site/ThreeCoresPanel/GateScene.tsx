"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { COLORS, GATE_HUD_ITEMS } from "./constants";

/**
 * GateScene, the GateCore overlay.
 *
 * The Full Rig Scan moment, per Scotty's brief. Side elevation of an
 * NA 18-wheeler (tractor + 53' trailer) approaching a Birdseye-blue
 * kiosk and boom gate. One calm scan sweep, callouts that anchor to
 * the right physical part of the rig, and a HUD that ticks each scan
 * item to confirmed.
 *
 * 5-second sequence (timed by `restartKey` so a manual click restarts
 * the cycle from frame 0):
 *
 *   0.0–1.0s  Truck approaches from left and stops.
 *   1.0–2.5s  Scan sweep travels over the entire rig.
 *   2.5–3.8s  Callouts fade in at their physical anchors,
 *             HUD lines tick to confirmed.
 *   3.8–5.0s  Boom gate raises, truck proceeds forward,
 *             "VERIFIED · LOG STORED" stamp appears.
 *
 * Truck art is illustrative geometry, not a render. The animator
 * commission will replace this SVG with a higher-fidelity rig once
 * the production asset lands. The HUD + callouts stay (they're DOM,
 * not baked-in), so the swap is one file.
 *
 * Reduce-motion: the scan sweep and the truck travel are gated by
 * `prefers-reduced-motion`, the scene snaps directly to the resting
 * "verified" state.
 */

type GateSceneProps = {
  /** Bumped when the parent wants the sequence to restart from 0. */
  restartKey: number;
};

export function GateScene({ restartKey }: GateSceneProps) {
  // Sub-step state, drives the reveal of HUD lines + callouts in order.
  // Started over on every restartKey change.
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers: number[] = [];
    // Step ticks: 0 (idle) → 1 (approaching done) → 2 (scan running) →
    // 3 (callouts) → 4 (gate up).
    timers.push(window.setTimeout(() => setStep(1), 1000));
    timers.push(window.setTimeout(() => setStep(2), 1100));
    timers.push(window.setTimeout(() => setStep(3), 2500));
    timers.push(window.setTimeout(() => setStep(4), 3800));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [restartKey]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Side-elevation rig SVG, anchored in the top region of the
          portrait panel (the GateCore zone). The viewBox is wide so we
          can lay the whole rig + kiosk + boom on one continuous baseline. */}
      <svg
        viewBox="0 0 600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Ground line under the gate plaza */}
        <line
          x1="20"
          y1="270"
          x2="580"
          y2="270"
          stroke={COLORS.cream}
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        {/* ─── Birdseye kiosk + boom gate ──────────────────────── */}
        {/* Kiosk pole */}
        <line
          x1="465"
          y1="270"
          x2="465"
          y2="155"
          stroke={COLORS.cream}
          strokeWidth="1.5"
          strokeOpacity="0.85"
        />
        {/* Kiosk enclosure (blue Birdseye unit) */}
        <rect
          x="445"
          y="125"
          width="40"
          height="50"
          rx="3"
          fill={COLORS.electric}
          fillOpacity="0.18"
          stroke={COLORS.electric}
          strokeWidth="1.25"
        />
        {/* Kiosk screen face */}
        <rect
          x="450"
          y="135"
          width="30"
          height="22"
          rx="1"
          fill={COLORS.navy}
          stroke={COLORS.electric}
          strokeWidth="1"
        />
        {/* Camera dome on top of kiosk */}
        <circle
          cx="465"
          cy="118"
          r="8"
          fill={COLORS.cream}
          fillOpacity="0.10"
          stroke={COLORS.cream}
          strokeOpacity="0.85"
          strokeWidth="1.25"
        />
        <circle
          cx="465"
          cy="118"
          r="3"
          fill={COLORS.electric}
        />

        {/* Boom gate post */}
        <rect
          x="500"
          y="195"
          width="10"
          height="75"
          fill="none"
          stroke={COLORS.cream}
          strokeOpacity="0.85"
          strokeWidth="1.25"
        />
        {/* Boom gate light */}
        <circle
          cx="505"
          cy="200"
          r="3"
          fill={step >= 4 ? COLORS.success : "#dc2626"}
          style={{ transition: "fill 400ms" }}
        />

        {/* Boom arm, rotates from horizontal (down) to vertical (up). */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: step >= 4 ? -78 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "510px 215px" }}
        >
          {/* Arm */}
          <rect
            x="510"
            y="212"
            width="60"
            height="6"
            fill="none"
            stroke={COLORS.cream}
            strokeOpacity="0.85"
            strokeWidth="1.25"
          />
          {/* Red/white candy stripes on the arm */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={510 + i * 12}
              y="212"
              width="6"
              height="6"
              fill={i % 2 === 0 ? COLORS.cream : "transparent"}
              fillOpacity={i % 2 === 0 ? 0.55 : 0}
            />
          ))}
        </motion.g>

        {/* ─── The rig ─────────────────────────────────────────────
            18-wheeler in side elevation, drawn in cream linework over
            navy. Translates from offscreen-left (x=-380) to its
            resting position (x=0) over the first 1s, then sits while
            the scan runs, then continues forward when the gate opens.
        */}
        <motion.g
          initial={{ x: -380 }}
          animate={{
            x: step >= 4 ? 60 : 0,
          }}
          transition={
            step >= 4
              ? { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
              : { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {/* Translate the rig group so its rightmost point sits at the
              boom (around x=455) when at rest. */}
          <g transform="translate(60 0)">
            {/* TRAILER (drawn first so the cab overlaps cleanly) */}
            <g>
              {/* Trailer box */}
              <rect
                x="125"
                y="155"
                width="260"
                height="100"
                fill={COLORS.navy}
                fillOpacity="0.50"
                stroke={COLORS.cream}
                strokeWidth="1.25"
              />
              {/* Trailer back doors split */}
              <line
                x1="385"
                y1="155"
                x2="385"
                y2="255"
                stroke={COLORS.cream}
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              {/* Door hinges */}
              <line x1="383" y1="170" x2="389" y2="170" stroke={COLORS.cream} strokeOpacity="0.55" strokeWidth="1" />
              <line x1="383" y1="240" x2="389" y2="240" stroke={COLORS.cream} strokeOpacity="0.55" strokeWidth="1" />
              {/* Trailer underbody bar */}
              <line
                x1="125"
                y1="255"
                x2="385"
                y2="255"
                stroke={COLORS.cream}
                strokeOpacity="0.85"
                strokeWidth="1.25"
              />
              {/* Trailer marker lights */}
              {[150, 200, 250, 300, 350].map((cx) => (
                <circle
                  key={`mlt-${cx}`}
                  cx={cx}
                  cy="158"
                  r="1.5"
                  fill={COLORS.cream}
                  fillOpacity="0.75"
                />
              ))}
              {/* Company name decal area on trailer side (anchor for callout) */}
              <rect
                x="180"
                y="185"
                width="160"
                height="40"
                fill="none"
                stroke={COLORS.cream}
                strokeOpacity="0.18"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <text
                x="260"
                y="212"
                textAnchor="middle"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fontSize="14"
                fontWeight="700"
                letterSpacing="0.5"
                fill={COLORS.cream}
                fillOpacity="0.45"
              >
                BIRDSEYE
              </text>
            </g>

            {/* TRACTOR (cab) */}
            <g>
              {/* Frame between cab and trailer */}
              <rect
                x="105"
                y="232"
                width="22"
                height="8"
                fill={COLORS.cream}
                fillOpacity="0.20"
                stroke={COLORS.cream}
                strokeWidth="1"
              />
              {/* Cab body, square-nose NA tractor (Peterbilt-ish) */}
              <path
                d="M 35 175 L 35 240 L 105 240 L 105 175 L 90 165 L 50 165 Z"
                fill={COLORS.navy}
                fillOpacity="0.55"
                stroke={COLORS.cream}
                strokeWidth="1.25"
              />
              {/* Sleeper bunk vertical seam */}
              <line
                x1="78"
                y1="165"
                x2="78"
                y2="240"
                stroke={COLORS.cream}
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              {/* Hood (engine compartment, square nose) */}
              <rect
                x="0"
                y="200"
                width="35"
                height="40"
                fill={COLORS.navy}
                fillOpacity="0.55"
                stroke={COLORS.cream}
                strokeWidth="1.25"
              />
              {/* Hood emblem strip */}
              <line x1="0" y1="218" x2="35" y2="218" stroke={COLORS.cream} strokeOpacity="0.55" strokeWidth="1" />
              {/* Windshield */}
              <path
                d="M 50 168 L 88 168 L 95 188 L 50 188 Z"
                fill={COLORS.electric}
                fillOpacity="0.10"
                stroke={COLORS.cream}
                strokeOpacity="0.75"
                strokeWidth="1"
              />
              {/* Side window */}
              <rect
                x="40"
                y="190"
                width="30"
                height="16"
                fill={COLORS.electric}
                fillOpacity="0.10"
                stroke={COLORS.cream}
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              {/* Cab door seam (anchor for DOT callout) */}
              <line
                x1="55"
                y1="206"
                x2="55"
                y2="240"
                stroke={COLORS.cream}
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              <line
                x1="70"
                y1="206"
                x2="70"
                y2="240"
                stroke={COLORS.cream}
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              {/* Front bumper */}
              <rect
                x="-3"
                y="235"
                width="40"
                height="6"
                fill={COLORS.cream}
                fillOpacity="0.85"
              />
              {/* License plate (anchor for LP callout) */}
              <rect
                x="6"
                y="225"
                width="24"
                height="9"
                fill={COLORS.cream}
                fillOpacity="0.70"
                stroke={COLORS.navy}
                strokeWidth="0.5"
              />
              {/* Headlight */}
              <circle cx="3" cy="208" r="3" fill={COLORS.cream} fillOpacity="0.85" />
              {/* Exhaust stack */}
              <rect
                x="100"
                y="148"
                width="6"
                height="22"
                fill="none"
                stroke={COLORS.cream}
                strokeOpacity="0.85"
                strokeWidth="1"
              />
            </g>

            {/* WHEELS (5 axles, 18 tires, drawn as 5 circles in profile) */}
            {[
              { cx: 18, label: "steer" },
              { cx: 78, label: "drive-1" },
              { cx: 100, label: "drive-2" },
              { cx: 320, label: "trailer-1" },
              { cx: 344, label: "trailer-2" },
            ].map((w) => (
              <g key={w.label}>
                <circle
                  cx={w.cx}
                  cy="258"
                  r="14"
                  fill={COLORS.navy}
                  stroke={COLORS.cream}
                  strokeWidth="1.5"
                />
                <circle
                  cx={w.cx}
                  cy="258"
                  r="6"
                  fill="none"
                  stroke={COLORS.cream}
                  strokeOpacity="0.55"
                  strokeWidth="1"
                />
                <circle cx={w.cx} cy="258" r="1.5" fill={COLORS.cream} />
              </g>
            ))}
          </g>
        </motion.g>

        {/* ─── Scan sweep ───────────────────────────────────────
            A vertical electric bar that travels left-to-right over the
            rig during the scan window. Soft glow. One pass only.
        */}
        {step >= 1 && step < 3 && (
          <motion.g
            key={`scan-${restartKey}`}
            initial={{ x: 30 }}
            animate={{ x: 460 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Soft glow trailing edge */}
            <rect
              x="-30"
              y="135"
              width="40"
              height="135"
              fill="url(#scanGlow)"
              opacity="0.55"
            />
            {/* Lead edge */}
            <rect
              x="0"
              y="135"
              width="2"
              height="135"
              fill={COLORS.electric}
            />
          </motion.g>
        )}

        {/* Scan glow gradient */}
        <defs>
          <linearGradient id="scanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.electric} stopOpacity="0" />
            <stop offset="100%" stopColor={COLORS.electric} stopOpacity="0.55" />
          </linearGradient>
        </defs>
      </svg>

      {/* ─── HTML callouts, anchored over the SVG ─────────────────
          Crisp DOM text instead of baked-in SVG labels so we can edit
          values without re-exporting. Each one fades in during the
          callouts step. Position is in % of the panel (the SVG above
          uses preserveAspectRatio xMidYMid slice, so coordinates line
          up reliably as long as the panel keeps its 3:5 portrait).
      */}
      <div className="absolute inset-0 pointer-events-none">
        {/* DOT · cab door */}
        <Callout x="32%" y="22.5%" label="DOT · 1234567" delay={0.0} step={step} />
        {/* TRUCK # · front fender / cab nose */}
        <Callout x="13%" y="20.5%" label="TRUCK # · 0421" delay={0.15} step={step} anchor="left" />
        {/* TRAILER # · top right of trailer */}
        <Callout x="69%" y="14.5%" label="TRAILER # · 53-1077" delay={0.3} step={step} anchor="right" />
        {/* LP · front plate */}
        <Callout x="9%" y="25%" label="LP · ABC-1234" delay={0.45} step={step} anchor="left" />
        {/* COMPANY · trailer side */}
        <Callout x="48%" y="20.5%" label="COMPANY · BIRDSEYE TRANSPORT" delay={0.6} step={step} />
      </div>

      {/* HUD panel (bottom-left of the gate region) */}
      <div className="absolute left-5 md:left-7 top-[27%] md:top-[28%] z-10">
        <div className="rounded border border-birdseye-cream/[0.10] bg-black/55 backdrop-blur-sm px-3 py-2.5">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-birdseye-cream/40 mb-1.5">
            Gate · scan
          </div>
          <ul className="space-y-1">
            {GATE_HUD_ITEMS.map((item, i) => {
              const confirmed = step >= 3 || (step >= 2 && i < (step === 2 ? 6 : 0));
              return (
                <li
                  key={item}
                  className={`font-mono text-[9.5px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                    confirmed
                      ? "text-birdseye-electric"
                      : "text-birdseye-cream/55"
                  }`}
                >
                  <span aria-hidden className="mr-1.5">
                    {confirmed ? "■" : "□"}
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* "VERIFIED · LOG STORED" stamp, appears once gate raises */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute right-5 md:right-7 top-[26%] z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-birdseye-success/40 bg-birdseye-success/[0.08] px-3 py-1.5 font-mono text-[9.5px] tracking-[0.22em] uppercase text-birdseye-success">
            <span aria-hidden className="h-1 w-1 rounded-full bg-birdseye-success" />
            Verified · log stored
          </div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * One spatially-anchored callout, anchored to a pixel-percentage
 * position over the SVG. Fades in during the callouts step (3) and
 * stays visible through the gate-raise step (4).
 */
function Callout({
  x,
  y,
  label,
  delay,
  step,
  anchor = "right",
}: {
  x: string;
  y: string;
  label: string;
  delay: number;
  step: number;
  anchor?: "left" | "right";
}) {
  const visible = step >= 3;
  return (
    <motion.div
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: visible ? delay : 0 }}
      className="absolute"
      style={{ left: x, top: y }}
    >
      <div className="flex items-center gap-2">
        {anchor === "left" && (
          <span
            aria-hidden
            className="h-px w-6 bg-birdseye-electric/55"
          />
        )}
        <span className="font-mono text-[9.5px] tracking-[0.20em] uppercase text-birdseye-electric whitespace-nowrap">
          {label}
        </span>
        {anchor === "right" && (
          <span
            aria-hidden
            className="h-px w-6 bg-birdseye-electric/55"
          />
        )}
      </div>
    </motion.div>
  );
}
