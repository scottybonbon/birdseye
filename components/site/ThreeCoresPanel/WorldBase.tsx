"use client";

import { COLORS } from "./constants";

/**
 * WorldBase, the always-visible base map of the yard.
 *
 * One continuous architectural drawing of the property, viewed from
 * above. Three vertically stacked zones:
 *
 *   • Top third      → Gate plaza (approach lane, boom, kiosk position)
 *   • Middle third   → Perimeter fence line with camera positions
 *   • Bottom third   → Trailer parking grid (rows B and C)
 *
 * Drawn in cream linework at low opacity, the whole base sits as
 * "context" under the active overlay. When GateCore is active, the
 * Gate region brightens via the GateScene overlay; when SafeCore is
 * active, the perimeter cameras brighten via SafeScene; same for
 * YardCore. The base never moves, never animates, and never demands
 * attention. It anchors the eye.
 *
 * Drawing notes:
 *   - viewBox is 600 × 1000 (3:5 portrait), the panel scales to fit.
 *   - Strokes use cream/30 so the base reads as a quiet draftsperson's
 *     plan, not a foreground figure.
 *   - Filing labels (B-01 … C-10) are tucked at the corners, in mono
 *     caps. They give the YardCore overlay something to point to.
 *
 * The animator can replace this whole file with their drawing later;
 * the contract is just the SVG viewBox + the position of the gate
 * plaza, fence line, and trailer grid (so the overlays still anchor
 * correctly).
 */
export function WorldBase() {
  const dim = COLORS.dim;
  return (
    <svg
      viewBox="0 0 600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* Outer property boundary, dashed hairline */}
      <rect
        x="40"
        y="40"
        width="520"
        height="920"
        fill="none"
        stroke={dim}
        strokeWidth="1"
        strokeDasharray="4 6"
      />

      {/* ─── TOP ZONE · GATE PLAZA ────────────────────────────── */}
      {/* Approach road from outside, entering top-left */}
      <path
        d="M 0 220 L 200 220 L 240 200 L 320 200 L 320 280 L 240 280 L 200 260 L 0 260 Z"
        fill="none"
        stroke={dim}
        strokeWidth="1"
      />
      {/* Boom gate position (a hairline across the lane) */}
      <line
        x1="320"
        y1="200"
        x2="320"
        y2="280"
        stroke={dim}
        strokeWidth="1"
      />
      {/* Kiosk pad (small rounded rect to the right of the boom) */}
      <rect
        x="335"
        y="225"
        width="32"
        height="30"
        rx="3"
        fill="none"
        stroke={dim}
        strokeWidth="1"
      />
      {/* Drive-through after gate, into the yard */}
      <path
        d="M 320 240 L 480 240"
        stroke={dim}
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* Mono filing labels for the gate zone */}
      <g
        fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
        fontSize="10"
        letterSpacing="2.2"
        fill={dim}
      >
        <text x="60" y="100">
          GATE PLAZA · ZONE A
        </text>
        <text x="60" y="120">
          PLAN · 1:200
        </text>
      </g>

      {/* ─── MIDDLE ZONE · PERIMETER FENCE ─────────────────────── */}
      {/* Inner fence line running horizontal at ~y=400 */}
      <line
        x1="40"
        y1="400"
        x2="560"
        y2="400"
        stroke={dim}
        strokeWidth="1"
      />
      {/* Posts along the fence */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 40 + ((560 - 40) / 17) * i;
        return (
          <line
            key={`post-${i}`}
            x1={x}
            y1="394"
            x2={x}
            y2="406"
            stroke={dim}
            strokeWidth="1"
          />
        );
      })}

      {/* Camera positions along the fence (small open triangles, the
          SafeScene overlay highlights the active one). */}
      {[
        { x: 110, y: 388, label: "CAM-01" },
        { x: 250, y: 388, label: "CAM-02" },
        { x: 390, y: 388, label: "CAM-03" },
        { x: 510, y: 388, label: "CAM-04" },
      ].map((c) => (
        <g key={c.label}>
          <polygon
            points={`${c.x - 5},${c.y} ${c.x + 5},${c.y} ${c.x},${c.y - 7}`}
            fill="none"
            stroke={dim}
            strokeWidth="1"
          />
          <text
            x={c.x + 9}
            y={c.y - 2}
            fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
            fontSize="9"
            letterSpacing="1.8"
            fill={dim}
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* Mono filing labels for the perimeter zone */}
      <g
        fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
        fontSize="10"
        letterSpacing="2.2"
        fill={dim}
      >
        <text x="60" y="450">
          PERIMETER · ZONE B
        </text>
        <text x="60" y="468">
          ELEV · 1:200
        </text>
      </g>

      {/* ─── BOTTOM ZONE · TRAILER YARD ───────────────────────── */}
      {/* Drive lane down the middle of the trailer grid */}
      <line
        x1="300"
        y1="540"
        x2="300"
        y2="940"
        stroke={dim}
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* Row B (left side) — 5 trailer slots */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = 560 + i * 75;
        return (
          <g key={`row-b-${i}`}>
            <rect
              x="60"
              y={y}
              width="220"
              height="55"
              fill="none"
              stroke={dim}
              strokeWidth="1"
            />
            <text
              x="70"
              y={y + 14}
              fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
              fontSize="9"
              letterSpacing="1.8"
              fill={dim}
            >
              B-0{i + 1}
            </text>
          </g>
        );
      })}

      {/* Row C (right side) — 5 trailer slots */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = 560 + i * 75;
        return (
          <g key={`row-c-${i}`}>
            <rect
              x="320"
              y={y}
              width="220"
              height="55"
              fill="none"
              stroke={dim}
              strokeWidth="1"
            />
            <text
              x="330"
              y={y + 14}
              fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
              fontSize="9"
              letterSpacing="1.8"
              fill={dim}
            >
              C-0{i + 1}
            </text>
          </g>
        );
      })}

      {/* Mono filing label for the yard zone */}
      <g
        fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
        fontSize="10"
        letterSpacing="2.2"
        fill={dim}
      >
        <text x="60" y="970">
          TRAILER YARD · ZONE C
        </text>
        <text x="60" y="988">
          PLAN · 1:200
        </text>
      </g>
    </svg>
  );
}
