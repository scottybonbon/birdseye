"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";
import worldLand from "@/_design/world-land.json";
import worldCoords from "@/_design/world-coords.json";

/**
 * LiveOpsMap — the network at scale, as a single editorial set piece.
 *
 * 2026-05-04 rebuild (Scotty call): the previous version used an
 * abstract NA polygon with hand-placed dots that didn't read as a real
 * map. This rebuild swaps in proper geography:
 *
 *   • World land mask sourced from world-atlas/land-110m (Natural Earth
 *     simplified). Pre-projected to viewBox coordinates at build time
 *     via d3-geo's geoNaturalEarth1 — see scripts/__inline node block
 *     in commit notes. The result is shipped as a static path string
 *     in _design/world-land.json so the runtime stays light (no
 *     d3-geo or topojson on the client).
 *
 *   • Every city + ops floor is positioned by REAL lat/lng, projected
 *     through the SAME projection so dots snap exactly to coastlines.
 *     The data lives in _design/world-coords.json — Mississauga sits
 *     where Mississauga is, Belgrade sits in Serbia, Bogotá in
 *     Colombia. No artistic license.
 *
 * Visual register stays the same: deep navy bg, electric customer
 * dots (small, pulsing), persistent operator-pool dots (larger,
 * double-ring, no pulse), thin coastline stroke. The Voice-Down /
 * filing-line / HUD chrome continues unchanged.
 *
 * The viewBox crops the global projection to the data bounds plus
 * generous padding — Pacific to mid-Africa horizontally, northern
 * Canada to northern South America vertically — so all four ops floors
 * and all customer cities are visible with proper geographic context.
 *
 * Restraint discipline retained:
 *   • One pulse pattern across customer dots, staggered.
 *   • Reduce-motion: pulses off, layout intact.
 *   • No per-dot interactions — this is a piece to look at, not
 *     operate.
 */

// Map data, projected through d3-geo geoNaturalEarth1 at build time.
// See scripts/regen-world-map.js for regeneration; the JSON is the
// canonical source for runtime.
type MapPoint = { name: string; x: number; y: number };
type IntlPoint = MapPoint & { region: string };
type CustomerPoint = MapPoint & { tier: 1 | 2 };
const NA_OPS_FLOORS: MapPoint[] = worldCoords.naOps;
const INTL_OPS_FLOORS: IntlPoint[] = worldCoords.intlOps;
const CUSTOMER_CITIES: CustomerPoint[] = worldCoords.cities as CustomerPoint[];

// Density layers (2026-05-04, Scotty call): the map needs to feel
// like 400+ active facilities, not 14. We split the customer dots
// into TWO TIERS — primary (the marquee metros, larger pulsing dot)
// and secondary (~50 satellite cities, smaller static dot at lower
// opacity). Real lat/lng on every entry; the secondary tier suggests
// network density without the main metros getting visually drowned.
const PRIMARY_CITIES = CUSTOMER_CITIES.filter((c) => c.tier === 1);
const SECONDARY_CITIES = CUSTOMER_CITIES.filter((c) => c.tier === 2);

// Crop viewBox: data spans roughly x:211–548, y:97–236 in the 1000×500
// projection. With generous padding around it, this region shows all
// four ops floors + all 14 customer cities + relevant geographic
// context (most of NA, the Atlantic, western Europe, northern South
// America). Aspect ≈ 2:1, set the container to match.
const VIEW_X = 130;
const VIEW_Y = 65;
const VIEW_W = 470;
const VIEW_H = 220;

// Mississauga as the NA centroid for the international-ops connector
// hairlines (suggesting "the global mesh radiates from the network").
// Falls back to the first NA ops floor (Dallas) if Mississauga isn't
// in the list, and to a sensible viewBox-center if no NA ops at all —
// the component should never crash because of data shape.
const NA_CENTROID =
  NA_OPS_FLOORS.find((f) => f.name.startsWith("Mississauga")) ??
  NA_OPS_FLOORS[0] ??
  { name: "fallback", x: VIEW_X + VIEW_W / 2, y: VIEW_Y + VIEW_H / 2 };

export function LiveOpsMap() {
  const reduceMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="section-dark py-24 md:py-section relative overflow-hidden"
      aria-labelledby="live-ops-heading"
    >
      <Container className="max-w-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-16"
        >
          <div>
            <span className="system-label text-birdseye-electric flex items-center gap-2.5">
              <span
                aria-hidden
                className="relative grid place-items-center h-1.5 w-1.5"
              >
                <span className="absolute inset-0 rounded-full bg-birdseye-success" />
                {!reduceMotion && mounted && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-birdseye-success/60"
                    animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </span>
              THE NETWORK · LIVE
            </span>
            <h2
              id="live-ops-heading"
              className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream"
            >
              Live across the{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                continent
              </span>
              , supported on three.
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/65 max-w-copy lg:pb-3">
            Two operations floors in North America for the work that has to
            be in the same time zone as the yard. Two more in Belgrade and
            Bogotá so the network never sleeps. One platform, four ops
            floors, one verified record on every gate event.
          </p>
        </motion.div>

        {/* Map surface */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
          className="relative w-full rounded-3xl border border-birdseye-cream/[0.10] bg-[#0A0A0B] overflow-hidden"
          style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
          data-cursor="scan"
          data-cursor-caption="LIVE NETWORK · 4 OPS FLOORS · 3 CONTINENTS"
        >
          {/* Background dot grid for system register */}
          <DotGrid />

          {/* Real world map — land outlines projected via Natural Earth */}
          <svg
            viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            {/* Land mask — filled at very low opacity, stroked at hairline.
                The fill defines the continent silhouette; the stroke gives
                it a recognizable map register. */}
            <path
              d={worldLand.d}
              fill="rgba(244, 237, 228, 0.025)"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="text-birdseye-cream/20"
            />

            {/* Secondary cities — small static dots at lower opacity,
                drawn FIRST so primary dots and ops floors stack on top
                in the visual layering. Suggests network density without
                stealing focus from the metros. */}
            {SECONDARY_CITIES.map((c) => (
              <SecondaryDot key={c.name} x={c.x} y={c.y} />
            ))}

            {/* Primary cities — pulsing electric dots at the marquee
                metros. Each sits exactly on its actual lat/lng. */}
            {PRIMARY_CITIES.map((c, i) => (
              <CustomerDot
                key={c.name}
                x={c.x}
                y={c.y}
                index={i}
                reduceMotion={reduceMotion}
                mounted={mounted}
              />
            ))}

            {/* NA ops floors — larger double-ring dots, persistent.
                Each non-centroid NA floor gets a hairline connector
                back to the centroid (Mississauga) — same treatment as
                the international floors, so the four ops floors all
                read as one connected mesh radiating from the network's
                anchor. (2026-05-04 Scotty addition: the Dallas link
                matters because operators rotate across all four floors
                regardless of which continent they're on.) */}
            {NA_OPS_FLOORS.map((f) => (
              <g key={f.name}>
                {f.name !== NA_CENTROID.name && (
                  <line
                    x1={NA_CENTROID.x}
                    y1={NA_CENTROID.y}
                    x2={f.x}
                    y2={f.y}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="2 3"
                    vectorEffect="non-scaling-stroke"
                    className="text-birdseye-cream/12"
                  />
                )}
                <OpsFloorDot
                  x={f.x}
                  y={f.y}
                  reduceMotion={reduceMotion}
                  mounted={mounted}
                />
                <OpsFloorLabel
                  x={f.x}
                  y={f.y}
                  name={f.name.split(",")[0].toUpperCase()}
                  region={f.name.split(",")[1]?.trim()}
                  anchor="middle"
                  belowDot
                />
              </g>
            ))}

            {/* International ops floors — same dot treatment, plus a
                hairline connector from the NA centroid (Mississauga)
                suggesting the global mesh, plus an explicit region tag
                so EU and SA ops are unambiguously named. */}
            {INTL_OPS_FLOORS.map((f) => (
              <g key={f.name}>
                <line
                  x1={NA_CENTROID.x}
                  y1={NA_CENTROID.y}
                  x2={f.x}
                  y2={f.y}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                  vectorEffect="non-scaling-stroke"
                  className="text-birdseye-cream/12"
                />
                <OpsFloorDot
                  x={f.x}
                  y={f.y}
                  reduceMotion={reduceMotion}
                  mounted={mounted}
                />
                <OpsFloorLabel
                  x={f.x}
                  y={f.y}
                  name={f.name.toUpperCase()}
                  region={f.region}
                  anchor={f.x > VIEW_X + VIEW_W * 0.7 ? "end" : "middle"}
                  belowDot={f.y < VIEW_Y + VIEW_H * 0.5}
                />
              </g>
            ))}
          </svg>

          {/* Top-right HUD — events count */}
          <div className="absolute top-5 right-5 md:top-7 md:right-7 text-right">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/55 mb-1.5">
              GATE EVENTS · LAST HOUR
            </p>
            <p className="font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.025em] text-birdseye-cream tabular-nums">
              12,047
            </p>
            <div className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/45">
              <span className="relative grid place-items-center h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-birdseye-success" />
                {!reduceMotion && mounted && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-birdseye-success/60"
                    animate={{ scale: [1, 2.6, 1], opacity: [0.55, 0, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </span>
              LIVE
            </div>
          </div>

          {/* Top-left HUD — facility count */}
          <div className="absolute top-5 left-5 md:top-7 md:left-7">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/55 mb-1.5">
              ACTIVE FACILITIES
            </p>
            <p className="font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.025em] text-birdseye-cream tabular-nums">
              400+
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/45">
              {CUSTOMER_CITIES.length}+ CITIES · 4 OPS FLOORS
            </p>
            {/* CUSTOMER_CITIES.length is the SUM of primary + secondary
                tiers (≈ 14 + 49 = 63), so this filing line scales with
                the dataset. Pre-tier this read "14+ cities" which
                undersold the footprint. */}
          </div>

          {/* Bottom filing strip */}
          <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/45">
              OPS FLOORS · MISSISSAUGA · DALLAS · BELGRADE · BOGOTÁ
            </p>
            <p className="hidden md:block font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/35 tabular-nums">
              NATURAL EARTH · 1:110M
            </p>
          </div>
        </motion.div>

        {/* Caption strip below the map */}
        <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40">
          <span
            aria-hidden
            className="grid place-items-center h-3 w-3 rounded-full bg-birdseye-electric/15 text-birdseye-electric/80 text-[9px] leading-none font-medium"
          >
            +
          </span>
          NETWORK · 4 OPS FLOORS · 3 CONTINENTS · 2026
        </p>
      </Container>
    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

/**
 * Customer dot — small electric pulsing circle at the city's real
 * lat/lng. Halos staggered by index so the network breathes
 * asynchronously rather than flashing in unison.
 */
function CustomerDot({
  x,
  y,
  index,
  reduceMotion,
  mounted,
}: {
  x: number;
  y: number;
  index: number;
  reduceMotion: boolean;
  mounted: boolean;
}) {
  const animate = !reduceMotion && mounted;
  const delay = (index * 0.31) % 4.2;
  return (
    <g>
      {animate && (
        <motion.circle
          cx={x}
          cy={y}
          r="1.6"
          fill="rgba(46, 75, 255, 0.45)"
          animate={{ r: [1.6, 5.2, 1.6], opacity: [0.6, 0, 0.6] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            delay,
            ease: "easeOut",
          }}
        />
      )}
      <circle cx={x} cy={y} r="1.4" fill="#2E4BFF" />
    </g>
  );
}

/**
 * Secondary city dot — half the size of a primary, no halo, lower
 * opacity. Used to suggest the wider customer footprint behind the
 * marquee metros. ~50 of these blanket NA without stealing focus.
 */
function SecondaryDot({ x, y }: { x: number; y: number }) {
  return (
    <circle cx={x} cy={y} r="0.7" fill="#2E4BFF" opacity="0.42" />
  );
}

/**
 * Ops floor dot — larger, double-ring, persistent. The operator-pool
 * locations don't blink, they hold.
 */
function OpsFloorDot({
  x,
  y,
  reduceMotion,
  mounted,
}: {
  x: number;
  y: number;
  reduceMotion: boolean;
  mounted: boolean;
}) {
  const animate = !reduceMotion && mounted;
  return (
    <g>
      {animate ? (
        <motion.circle
          cx={x}
          cy={y}
          r="3.6"
          fill="none"
          stroke="#F4EDE4"
          strokeWidth="0.6"
          opacity="0.45"
          animate={{ r: [3.6, 5.0, 3.6], opacity: [0.45, 0.15, 0.45] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ) : (
        <circle
          cx={x}
          cy={y}
          r="3.6"
          fill="none"
          stroke="#F4EDE4"
          strokeWidth="0.6"
          opacity="0.45"
        />
      )}
      <circle
        cx={x}
        cy={y}
        r="2.4"
        fill="none"
        stroke="#F4EDE4"
        strokeWidth="0.7"
        opacity="0.65"
      />
      <circle cx={x} cy={y} r="1.4" fill="#F4EDE4" />
    </g>
  );
}

/**
 * Ops floor label — mono-caps name + smaller region tag (in electric).
 * Anchor + above/below positioning so labels at map edges stay on-canvas.
 */
function OpsFloorLabel({
  x,
  y,
  name,
  region,
  anchor,
  belowDot,
}: {
  x: number;
  y: number;
  name: string;
  region?: string;
  anchor: "start" | "middle" | "end";
  belowDot: boolean;
}) {
  const nameY = belowDot ? y + 9 : y - 5;
  const regionY = belowDot ? y + 13.5 : y - 9.5;
  return (
    <g>
      <text
        x={x}
        y={nameY}
        textAnchor={anchor}
        fontSize="4.2"
        fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
        fontWeight="600"
        letterSpacing="0.5"
        fill="currentColor"
        className="text-birdseye-cream/65"
      >
        {name}
      </text>
      {region && (
        <text
          x={x}
          y={regionY}
          textAnchor={anchor}
          fontSize="3"
          fontFamily="ui-monospace, 'IBM Plex Mono', monospace"
          letterSpacing="0.5"
          fill="currentColor"
          className="text-birdseye-electric/65"
        >
          · {region} ·
        </text>
      )}
    </g>
  );
}

/**
 * DotGrid — faint regular dot pattern as the map's ground texture.
 * Reads as a calibration surface, not a marketing decoration.
 */
function DotGrid() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="ops-dot-grid"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="0.6" fill="#F4EDE4" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ops-dot-grid)" />
    </svg>
  );
}
