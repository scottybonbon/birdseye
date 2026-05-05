"use client";

import { motion } from "framer-motion";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Birdseye-vision SVG overlay for the Impact slider's "AFTER" state.
 *
 * Modeled after a real Birdseye site-survey diagram (P = Pole, C = Camera,
 * AP = Access Point) overlaid on an aerial photo. The viewer should read
 * this as the proposed Birdseye build-out for this yard, not just generic
 * AR labels.
 *
 * Coordinates tuned to /public/figma-exports/yard-before.jpg (1600×1200).
 *
 * Photo reference (in SVG coords):
 *   Sky .................... y 0   – 250
 *   Horizon / tree line .... y 250 – 360
 *   Yard surface starts .... y 360
 *   Vehicle row ............ y 430 – 620
 *   Open dirt .............. y 620 – 880
 *   Foreground gravel/road . y 880 – 1200
 *
 * Palette
 *   #2E4BFF, system intent (fence, lanes, parking, kiosks)
 *   #67E8F9, camera FOV cones, scan sweep
 *   #4ADE80, verified detections + live status
 *   #F4EDE4, labels and frame elements
 */
export function YardOverlay() {
  return (
    <svg
      viewBox="0 0 1600 1200"
      className="absolute inset-0 h-full w-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <marker
          id="yard-arrow"
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0,0 L12,6 L0,12 z" fill="#2E4BFF" />
        </marker>
        <marker
          id="lane-tick"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L8,5 L0,10 z" fill="#2E4BFF" opacity="0.7" />
        </marker>

        {/* Soft halo around pole base (light pool) */}
        <radialGradient id="poleLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#67E8F9" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
        </radialGradient>

        {/* Camera FOV cone fill, soft cyan, fades to nothing at the tip */}
        <radialGradient id="fovCone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#67E8F9" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
        </radialGradient>

        {/* Cinematic scan sweep, narrow gradient strip */}
        <linearGradient id="scanSweep" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0" />
          <stop offset="48%" stopColor="#67E8F9" stopOpacity="0" />
          <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.55" />
          <stop offset="52%" stopColor="#67E8F9" stopOpacity="0" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
        </linearGradient>

        {/* Subtle dark plate behind labels for legibility */}
        <filter id="labelPlate" x="-6%" y="-12%" width="112%" height="124%">
          <feFlood floodColor="#000" floodOpacity="0.55" />
          <feComposite in2="SourceGraphic" operator="in" />
          <feMorphology operator="dilate" radius="2" />
          <feGaussianBlur stdDeviation="0.3" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </defs>

      {/* ── 0. Cinematic horizon scan sweep ──────────────────────────── */}
      <motion.rect
        x={-200}
        y={360}
        width={1800}
        height={780}
        fill="url(#scanSweep)"
        initial={{ x: -1800 }}
        animate={{ x: 1800 }}
        transition={{
          duration: 5.5,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 2.5,
          delay: 1.2,
        }}
      />

      {/* ── 1. Camera FOV coverage cones (Birdseye site-survey style) ─ */}
      {/* Drawn FIRST so subsequent layers (fence, parking, detections) sit
          on top. Each pole has 1–2 wedges projected over the yard. */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.05 }}
      >
        {/* P01 (TL corner) → covers back-left */}
        <FovCone x={195} y={415} angle={35} spread={70} reach={520} />
        {/* P02 (TC) → covers center vehicles */}
        <FovCone x={830} y={385} angle={95} spread={60} reach={500} />
        <FovCone x={830} y={385} angle={75} spread={55} reach={460} />
        {/* P03 (TR corner) → covers back-right work-truck cluster */}
        <FovCone x={1495} y={395} angle={150} spread={70} reach={520} />
        {/* P04 (BR corner) → covers right side + exit lane */}
        <FovCone x={1525} y={1110} angle={210} spread={70} reach={580} />
        {/* P05 (BC) → covers existing chain-link gate + foreground */}
        <FovCone x={830} y={1140} angle={270} spread={70} reach={520} />
        <FovCone x={830} y={1140} angle={285} spread={55} reach={420} />
        {/* P06 (BL corner) → covers left side + entry lane */}
        <FovCone x={95} y={1130} angle={330} spread={70} reach={580} />
      </motion.g>

      {/* ── 2. Outer perimeter fence (with openings cut at each gate) ── */}
      {/* Top + sides as one polyline */}
      <motion.polyline
        points="60,1140 180,400 1530,375 1580,1130"
        fill="none"
        stroke="#2E4BFF"
        strokeWidth="2.2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.25 }}
      />
      {/* Bottom segments, three pieces with gaps for ENTRY (left) and
          EXIT (right) gates */}
      <motion.path
        d="M 60 1140 L 320 1135"
        stroke="#2E4BFF"
        strokeWidth="2.2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.6 }}
      />
      <motion.path
        d="M 470 1135 L 1290 1130"
        stroke="#2E4BFF"
        strokeWidth="2.2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.7 }}
      />
      <motion.path
        d="M 1440 1130 L 1580 1130"
        stroke="#2E4BFF"
        strokeWidth="2.2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.8 }}
      />
      {/* Hash ticks along the back fence */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.45 }}
      >
        {Array.from({ length: 22 }).map((_, i) => {
          const t = i / 21;
          const x = 180 + (1530 - 180) * t;
          const y = 400 + (375 - 400) * t;
          return (
            <line
              key={`bf-${i}`}
              x1={x}
              y1={y}
              x2={x}
              y2={y - 8}
              stroke="#2E4BFF"
              strokeWidth="1.2"
            />
          );
        })}
      </motion.g>

      {/* ── 3. Three parking zones with spot numbers ─────────────────── */}
      {/* Zone A, back row */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.55 }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const x1 = 200 + i * 110;
          const x2 = 200 + (i + 1) * 110;
          const yTop = 440 + i * 0.4;
          const yBot = yTop + 175;
          const cx = (x1 + x2) / 2 + 1;
          return (
            <g key={`a-${i}`}>
              <polygon
                points={`${x1},${yTop} ${x2},${yTop} ${x2 + 5},${yBot} ${x1 + 5},${yBot}`}
                fill="none"
                stroke="#2E4BFF"
                strokeWidth="1.2"
                opacity="0.7"
              />
              <text
                x={cx}
                y={yBot - 8}
                textAnchor="middle"
                fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
                fontSize="10"
                letterSpacing="0.8"
                fill="#2E4BFF"
                opacity="0.65"
              >
                A-{String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
        <text
          x={210}
          y={427}
          fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
          fontSize="13"
          letterSpacing="1.6"
          fill="#2E4BFF"
        >
          ZONE A · 12 SPOTS · STANDARD
        </text>
      </motion.g>

      {/* Zone B, mid row */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.7 }}
      >
        {Array.from({ length: 11 }).map((_, i) => {
          const x1 = 180 + i * 125;
          const x2 = 180 + (i + 1) * 125;
          const yTop = 645;
          const yBot = 800;
          const cx = (x1 + x2) / 2 + 2;
          return (
            <g key={`b-${i}`}>
              <polygon
                points={`${x1 - 3},${yTop} ${x2 - 3},${yTop} ${x2 + 7},${yBot} ${x1 + 7},${yBot}`}
                fill="none"
                stroke="#2E4BFF"
                strokeWidth="1.2"
                opacity="0.65"
              />
              <text
                x={cx}
                y={yBot - 10}
                textAnchor="middle"
                fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
                fontSize="10"
                letterSpacing="0.8"
                fill="#2E4BFF"
                opacity="0.6"
              >
                B-{String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
        <text
          x={185}
          y={632}
          fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
          fontSize="13"
          letterSpacing="1.6"
          fill="#2E4BFF"
        >
          ZONE B · 11 SPOTS · STANDARD
        </text>
      </motion.g>

      {/* Zone C, foreground truck staging */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.85 }}
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const x1 = 160 + i * 175;
          const x2 = 160 + (i + 1) * 175;
          const yTop = 825;
          const yBot = 1000;
          const cx = (x1 + x2) / 2 + 3;
          return (
            <g key={`c-${i}`}>
              <polygon
                points={`${x1 - 5},${yTop} ${x2 - 5},${yTop} ${x2 + 11},${yBot} ${x1 + 11},${yBot}`}
                fill="none"
                stroke="#2E4BFF"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <text
                x={cx}
                y={yBot - 10}
                textAnchor="middle"
                fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
                fontSize="11"
                letterSpacing="0.8"
                fill="#2E4BFF"
                opacity="0.55"
              >
                C-{String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
        <text
          x={165}
          y={815}
          fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
          fontSize="13"
          letterSpacing="1.6"
          fill="#2E4BFF"
        >
          ZONE C · 8 SPOTS · TRUCK STAGING
        </text>
      </motion.g>

      {/* ── 4. Driving lanes ─────────────────────────────────────────── */}
      <motion.path
        d="M 220 1140
           C 220 1080, 180 1010, 165 920
           C 150 800, 145 700, 145 620
           C 145 540, 165 470, 200 430"
        fill="none"
        stroke="#2E4BFF"
        strokeWidth="2.2"
        strokeDasharray="14 10"
        markerEnd="url(#yard-arrow)"
        markerMid="url(#lane-tick)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.5, ease: EASE_OUT, delay: 1.0 }}
      />
      <motion.path
        d="M 1480 430
           C 1500 530, 1510 700, 1510 880
           C 1510 980, 1490 1060, 1440 1140"
        fill="none"
        stroke="#2E4BFF"
        strokeWidth="2.2"
        strokeDasharray="14 10"
        markerEnd="url(#yard-arrow)"
        markerMid="url(#lane-tick)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.5, ease: EASE_OUT, delay: 1.2 }}
      />
      <motion.line
        x1={185}
        y1={628}
        x2={1455}
        y2={628}
        stroke="#2E4BFF"
        strokeWidth="1.5"
        strokeDasharray="6 8"
        opacity="0.55"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 1.3 }}
      />
      <motion.line
        x1={170}
        y1={812}
        x2={1465}
        y2={812}
        stroke="#2E4BFF"
        strokeWidth="1.5"
        strokeDasharray="6 8"
        opacity="0.55"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 1.35 }}
      />

      {/* ── 5. Pole / camera nodes ───────────────────────────────────── */}
      <PoleCamera x={195} y={415} id="P01 · CAM" delay={1.45} />
      <PoleCamera x={830} y={385} id="P02 · CAM" delay={1.52} labelBelow />
      <PoleCamera x={1495} y={395} id="P03 · CAM" delay={1.59} labelLeft />
      <PoleCamera x={1525} y={1110} id="P04 · CAM" delay={1.66} labelLeft labelAbove />
      <PoleCamera x={830} y={1140} id="P05 · CAM" delay={1.73} labelAbove />
      <PoleCamera x={95} y={1130} id="P06 · CAM" delay={1.8} labelAbove />

      {/* ── 6. Vehicle detections (with label plates for legibility) ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 1.9 }}
      >
        <DetectBox x={195} y={580} w={120} h={70} id="PICKUP · 01" conf="0.99" />
        <DetectBox x={355} y={555} w={150} h={85} id="BOX TRUCK · 02" conf="0.98" />
        <DetectBox x={465} y={542} w={150} h={85} id="BOX TRUCK · 03" conf="0.97" yLabel="below" />
        <DetectBox x={560} y={510} w={185} h={100} id="BOX TRUCK · 04" conf="0.98" yLabel="below" />
        <DetectBox x={755} y={485} w={185} h={95} id="MOTORHOME · 01" conf="0.96" />
        <DetectBox x={935} y={460} w={170} h={85} id="TRAILER · 01" conf="0.95" />
        <DetectBox x={1095} y={445} w={130} h={75} id="TRAILER · 02" conf="0.94" yLabel="below" />
        <DetectBox x={1240} y={425} w={170} h={95} id="HEAVY · GROUP" conf="0.97" />
      </motion.g>

      {/* ── 7. LIVE detection, animated pulse, recurring ──────────── */}
      <LiveDetect x={395} y={935} w={180} h={62} id="NEW · ARRIVAL · INBOUND" />

      {/* ── 8. ENTRY kiosk + barrier arm, bottom-left ──────────────── */}
      <KioskBarrier
        x={325}
        y={1075}
        label="GATE 01 · ENTRY"
        sub="KIOSK 01 · ID + BOL"
        status="OPEN · VERIFIED"
        delay={2.0}
      />

      {/* ── 9. EXIT kiosk + barrier arm, bottom-right ──────────────── */}
      <KioskBarrier
        x={1295}
        y={1075}
        label="GATE 02 · EXIT"
        sub="KIOSK 02 · SEAL + BOL"
        status="ARMED · WAITING"
        delay={2.15}
        flipArm
      />

      {/* ── 10. Top-left system console label ───────────────────────── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 2.3 }}
      >
        <rect x="40" y="40" width="360" height="112" fill="black" opacity="0.6" rx="6" />
        <text x="58" y="70" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="14" letterSpacing="1.6" fill="#F4EDE4">
          YARD · TX-DEPOT-04
        </text>
        <text x="58" y="94" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="13" letterSpacing="1.2" fill="#F4EDE4" opacity="0.6">
          8 ASSETS · 6 CAMERAS · 31 SPOTS
        </text>
        <text x="58" y="116" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="13" letterSpacing="1.2" fill="#F4EDE4" opacity="0.6">
          2 GATES · 2 KIOSKS · ARMED
        </text>
        <circle cx="56" cy="135" r="4" fill="#4ADE80">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="68" y="139" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="12" letterSpacing="1.2" fill="#4ADE80">
          ALL SYSTEMS · ONLINE
        </text>
      </motion.g>

      {/* ── 11. Top-right uptime + agent ────────────────────────────── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 2.4 }}
      >
        <text x="1560" y="70" textAnchor="end" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="14" letterSpacing="1.6" fill="#F4EDE4" opacity="0.7">
          UPTIME · 99.99%
        </text>
        <text x="1560" y="94" textAnchor="end" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="13" letterSpacing="1.2" fill="#F4EDE4" opacity="0.55">
          AGENT · M.JOHANSEN
        </text>
        <text x="1560" y="116" textAnchor="end" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="13" letterSpacing="1.2" fill="#F4EDE4" opacity="0.55">
          17:42 · LOCAL
        </text>
        <text x="1560" y="138" textAnchor="end" fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace" fontSize="11" letterSpacing="1.4" fill="#67E8F9" opacity="0.85">
          PROPOSED · BIRDSEYE BUILD-OUT
        </text>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────── components ─────────────────────────── */

/**
 * Camera FOV cone, pie wedge from a pole, projected onto the yard.
 * `angle` is the bearing in degrees (0 = right, 90 = down, SVG convention).
 * `spread` is total wedge width in degrees, `reach` is how far it extends.
 *
 * Renders as: filled wedge with the radial gradient, plus a hairline outline
 * so the wedge edges are visible against the photo.
 */
function FovCone({
  x,
  y,
  angle,
  spread,
  reach,
}: {
  x: number;
  y: number;
  angle: number;
  spread: number;
  reach: number;
}) {
  const a1 = ((angle - spread / 2) * Math.PI) / 180;
  const a2 = ((angle + spread / 2) * Math.PI) / 180;
  const p1x = x + Math.cos(a1) * reach;
  const p1y = y + Math.sin(a1) * reach;
  const p2x = x + Math.cos(a2) * reach;
  const p2y = y + Math.sin(a2) * reach;
  const largeArc = spread > 180 ? 1 : 0;
  const d = `M ${x} ${y} L ${p1x} ${p1y} A ${reach} ${reach} 0 ${largeArc} 1 ${p2x} ${p2y} Z`;
  return (
    <g>
      <path d={d} fill="url(#fovCone)" />
      <path d={d} fill="none" stroke="#67E8F9" strokeWidth="0.7" opacity="0.4" />
    </g>
  );
}

/**
 * Vehicle detection, corner brackets + label with a translucent dark plate
 * behind the text so it stays legible over parking grid lines.
 */
function DetectBox({
  x,
  y,
  w,
  h,
  id,
  conf,
  yLabel = "above",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  conf: string;
  yLabel?: "above" | "below";
}) {
  const labelY = yLabel === "above" ? y - 10 : y + h + 22;
  const text = `${id} · ${conf}`;
  const textW = text.length * 7.4 + 12;
  return (
    <g>
      <Corner x={x} y={y} corner="tl" />
      <Corner x={x + w} y={y} corner="tr" />
      <Corner x={x} y={y + h} corner="bl" />
      <Corner x={x + w} y={y + h} corner="br" />
      <rect
        x={x - 4}
        y={labelY - 12}
        width={textW}
        height={16}
        rx={2}
        fill="black"
        opacity="0.55"
      />
      <text
        x={x + 2}
        y={labelY}
        fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
        fontSize="13"
        letterSpacing="1.2"
        fill="#4ADE80"
      >
        {text}
      </text>
    </g>
  );
}

function Corner({
  x,
  y,
  corner,
}: {
  x: number;
  y: number;
  corner: "tl" | "tr" | "bl" | "br";
}) {
  const len = 16;
  let d = "";
  if (corner === "tl") d = `M ${x} ${y + len} L ${x} ${y} L ${x + len} ${y}`;
  if (corner === "tr") d = `M ${x - len} ${y} L ${x} ${y} L ${x} ${y + len}`;
  if (corner === "bl") d = `M ${x} ${y - len} L ${x} ${y} L ${x + len} ${y}`;
  if (corner === "br") d = `M ${x - len} ${y} L ${x} ${y} L ${x} ${y - len}`;
  return (
    <path
      d={d}
      fill="none"
      stroke="#4ADE80"
      strokeWidth="2"
      strokeLinecap="round"
    />
  );
}

/**
 * LiveDetect, a recurring "the system just spotted something" pulse.
 * Corner brackets snap in, label fades in, holds, fades out, repeats.
 * Uses pure SMIL animations so it loops independently of React state.
 */
function LiveDetect({
  x,
  y,
  w,
  h,
  id,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
}) {
  // 8s cycle: 0.4s in, 3s hold, 0.6s out, 4s gap
  const dur = "8s";
  const keyTimes = "0; 0.05; 0.45; 0.55; 1";
  const opacityValues = "0; 1; 1; 0; 0";
  const scaleValues = "0.85; 1; 1; 1; 1";

  const text = `${id}`;
  const textW = text.length * 7.4 + 12;

  return (
    <g transform={`translate(${x} ${y})`}>
      <g>
        <animate
          attributeName="opacity"
          values={opacityValues}
          keyTimes={keyTimes}
          dur={dur}
          repeatCount="indefinite"
          begin="3s"
        />
        <animateTransform
          attributeName="transform"
          type="scale"
          values={scaleValues}
          keyTimes={keyTimes}
          dur={dur}
          additive="sum"
          repeatCount="indefinite"
          begin="3s"
        />
        {/* Corner brackets */}
        <Corner x={0} y={0} corner="tl" />
        <Corner x={w} y={0} corner="tr" />
        <Corner x={0} y={h} corner="bl" />
        <Corner x={w} y={h} corner="br" />
        {/* Pulsing crosshair center */}
        <circle cx={w / 2} cy={h / 2} r={3} fill="#4ADE80">
          <animate
            attributeName="r"
            values="2;9;2"
            dur="1.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Label with backdrop */}
        <rect x={-4} y={-22} width={textW} height={16} rx={2} fill="black" opacity="0.6" />
        <text
          x={2}
          y={-10}
          fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
          fontSize="13"
          letterSpacing="1.2"
          fill="#4ADE80"
        >
          {text}
        </text>
      </g>
    </g>
  );
}

/**
 * Pole + camera + label, references the legend on a real Birdseye plan
 * (P = Pole, C = Camera).
 */
function PoleCamera({
  x,
  y,
  id,
  delay,
  labelLeft,
  labelAbove,
  labelBelow,
}: {
  x: number;
  y: number;
  id: string;
  delay: number;
  labelLeft?: boolean;
  labelAbove?: boolean;
  labelBelow?: boolean;
}) {
  const labelX = labelLeft ? x - 24 : x + 26;
  const labelAnchor = labelLeft ? "end" : "start";
  const labelY = labelAbove ? y - 22 : labelBelow ? y + 32 : y + 5;
  const text = id;
  const textW = text.length * 7.5 + 10;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.smooth, ease: EASE_OUT, delay }}
    >
      {/* Light pool on yard surface */}
      <ellipse cx={x} cy={y + 18} rx={130} ry={48} fill="url(#poleLight)" />
      {/* Detection radius */}
      <circle
        cx={x}
        cy={y}
        r="80"
        fill="none"
        stroke="#2E4BFF"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        opacity="0.45"
      />
      {/* Pole base mark */}
      <path d={`M ${x - 9} ${y + 14} L ${x + 9} ${y + 14}`} stroke="#F4EDE4" strokeWidth="1.6" />
      {/* Pole shaft */}
      <line x1={x} y1={y + 14} x2={x} y2={y - 14} stroke="#F4EDE4" strokeWidth="1.4" opacity="0.85" />
      {/* Camera dome */}
      <circle cx={x} cy={y - 16} r="6" fill="#F4EDE4" opacity="0.95" />
      <circle cx={x} cy={y - 16} r="2.4" fill="#0F0F12" />
      {/* Active dot */}
      <circle cx={x} cy={y} r="3.5" fill="#4ADE80">
        <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {/* Label backdrop + text */}
      <rect
        x={labelLeft ? labelX - textW + 4 : labelX - 4}
        y={labelY - 11}
        width={textW}
        height={14}
        rx={2}
        fill="black"
        opacity="0.5"
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor={labelAnchor}
        fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
        fontSize="12"
        letterSpacing="1.4"
        fill="#F4EDE4"
        opacity="0.95"
      >
        {text}
      </text>
    </motion.g>
  );
}

/**
 * Kiosk + barrier arm at a gate, modeled after the Birdseye booth photo:
 * a blue cabinet with an ID screen, dome camera below, and card reader.
 */
function KioskBarrier({
  x,
  y,
  label,
  sub,
  status,
  delay,
  flipArm,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  status: string;
  delay: number;
  flipArm?: boolean;
}) {
  const armDx = flipArm ? -150 : 150;
  const labelTextW = label.length * 8.4 + 12;
  const subTextW = sub.length * 6.6 + 12;
  const statusTextW = status.length * 7.0 + 24;
  const labelAnchorX = x + (flipArm ? -10 : 52);

  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.smooth, ease: EASE_OUT, delay }}
    >
      {/* Kiosk body */}
      <rect x={x} y={y} width="42" height="60" rx="3" fill="#0F1C2E" stroke="#2E4BFF" strokeWidth="1.6" opacity="0.95" />
      {/* Screen */}
      <rect x={x + 6} y={y + 8} width="30" height="20" rx="1.5" fill="#67E8F9" opacity="0.55" />
      {/* Dome camera */}
      <circle cx={x + 21} cy={y + 38} r="4.5" fill="#F4EDE4" opacity="0.9" />
      <circle cx={x + 21} cy={y + 38} r="1.8" fill="#0F0F12" />
      {/* Card reader */}
      <rect x={x + 8} y={y + 47} width="26" height="6" rx="1" fill="#F4EDE4" opacity="0.55" />

      {/* Barrier arm */}
      <circle cx={x + (flipArm ? 0 : 42)} cy={y + 18} r="3.5" fill="#F4EDE4" />
      <line
        x1={x + (flipArm ? 0 : 42)}
        y1={y + 18}
        x2={x + (flipArm ? 0 : 42) + armDx}
        y2={y + 18}
        stroke="#F4EDE4"
        strokeWidth="2.2"
      />
      {[0.25, 0.5, 0.75].map((t, i) => {
        const ax = x + (flipArm ? 0 : 42) + armDx * t;
        return (
          <line key={`tick-${i}`} x1={ax} y1={y + 12} x2={ax} y2={y + 24} stroke="#F4EDE4" strokeWidth="1.2" opacity="0.7" />
        );
      })}

      {/* Label backdrops + text */}
      <rect
        x={flipArm ? labelAnchorX - labelTextW + 6 : labelAnchorX - 4}
        y={y + 2}
        width={labelTextW}
        height={16}
        rx={2}
        fill="black"
        opacity="0.6"
      />
      <text
        x={labelAnchorX}
        y={y + 14}
        textAnchor={flipArm ? "end" : "start"}
        fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
        fontSize="14"
        letterSpacing="1.6"
        fill="#F4EDE4"
      >
        {label}
      </text>
      <rect
        x={flipArm ? labelAnchorX - subTextW + 6 : labelAnchorX - 4}
        y={y + 22}
        width={subTextW}
        height={13}
        rx={2}
        fill="black"
        opacity="0.5"
      />
      <text
        x={labelAnchorX}
        y={y + 32}
        textAnchor={flipArm ? "end" : "start"}
        fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
        fontSize="11"
        letterSpacing="1.3"
        fill="#F4EDE4"
        opacity="0.7"
      >
        {sub}
      </text>
      <rect
        x={flipArm ? labelAnchorX - statusTextW + 6 : labelAnchorX - 4}
        y={y + 42}
        width={statusTextW}
        height={14}
        rx={2}
        fill="black"
        opacity="0.6"
      />
      <circle
        cx={labelAnchorX + (flipArm ? -2 : 4)}
        cy={y + 50}
        r="4"
        fill={status.startsWith("OPEN") ? "#4ADE80" : "#67E8F9"}
      >
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text
        x={labelAnchorX + (flipArm ? -12 : 14)}
        y={y + 54}
        textAnchor={flipArm ? "end" : "start"}
        fontFamily="var(--font-plex-mono), 'IBM Plex Mono', monospace"
        fontSize="12"
        letterSpacing="1.3"
        fill={status.startsWith("OPEN") ? "#4ADE80" : "#67E8F9"}
      >
        {status}
      </text>
    </motion.g>
  );
}
