import { Container } from "@/components/ui/Container";
import worldGlobe from "@/_design/world-globe.json";

/**
 * TeamGlobe, server-rendered SVG dot-sphere with the Birdseye team's
 * four city pins (Mississauga, Dallas, Belgrade, Bogotá) and labels.
 *
 * Implementation notes:
 *   • Pure SVG with SMIL animations for the pin pulses, so no client
 *     bundle cost. Renders at request time on the server.
 *   • Sphere is built from ~480 dots arranged on a lat/lon grid then
 *     orthographically projected to 2D. Back-facing dots are culled,
 *     and the remaining dots are dimmed by their z (depth toward the
 *     viewer) so the sphere reads as a sphere instead of a flat disk.
 *   • The view rotation is fixed at -45° longitude, chosen so all
 *     four cities project to the visible hemisphere with reasonable
 *     spread (three Americas cities on the left, Belgrade on the right).
 *   • Each pin emits a soft electric-blue pulse (rings expanding +
 *     fading) using <animate>. Pulses are staggered so they feel
 *     coordinated, not noisy.
 *   • Labels are HTML positioned absolutely on top of the SVG via
 *     viewBox-percentage math, so the type stays crisp at any size.
 *     Hairline dashed connector lines run from each pin to its label
 *     anchor inside the SVG itself.
 *   • Below lg, labels are hidden and replaced by a 2×2 grid of city
 *     cards, keeps the visual on phones without crowding.
 */

// SVG viewport, wider than tall so labels have horizontal breathing room.
const VIEW_W = 1000;
const VIEW_H = 640;
const CX = 500;
const CY = 320;
const R = 240;

// Longitude rotation: negative shifts the visible hemisphere west,
// pulling the Atlantic toward center so the Americas + Europe both fit.
const ROTATION = -45;

type City = {
  name: string;
  region: string;
  role: string;
  lat: number;
  lon: number;
  // Where the label sits in SVG coords (top-left of the label box).
  labelX: number;
  labelY: number;
  // Text alignment for the HTML label.
  align: "left" | "right";
};

const cities: City[] = [
  {
    name: "Mississauga",
    region: "Ontario, Canada",
    role: "HQ · Operations",
    lat: 43.59,
    lon: -79.64,
    labelX: 40,
    labelY: 80,
    align: "left",
  },
  {
    name: "Dallas",
    region: "Texas, USA",
    role: "US Operations",
    lat: 32.78,
    lon: -96.8,
    labelX: 40,
    labelY: 250,
    align: "left",
  },
  {
    name: "Chicago",
    region: "Illinois, USA",
    role: "US Operations",
    lat: 41.88,
    lon: -87.63,
    // Stack the Chicago label below Dallas on the same left rail so the
    // two US cities read as a pair. Slight vertical gap from Dallas
    // keeps the two label blocks legible.
    labelX: 40,
    labelY: 360,
    align: "left",
  },
  {
    name: "Bogotá",
    region: "Colombia",
    role: "Control Center",
    lat: 4.71,
    lon: -74.07,
    // Pushed lower (was 480) so it doesn't crash into the Chicago
    // label that now lives at labelY 360 on the same left rail.
    labelX: 40,
    labelY: 540,
    align: "left",
  },
  {
    name: "Belgrade",
    region: "Serbia",
    role: "Engineering",
    lat: 44.79,
    lon: 20.45,
    labelX: 760,
    labelY: 80,
    align: "right",
  },
];

function project(lat: number, lon: number) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = ((lon - ROTATION) * Math.PI) / 180;
  const x = CX + R * Math.cos(latRad) * Math.sin(lonRad);
  const y = CY - R * Math.sin(latRad);
  // z > 0 means the point is on the visible (front) hemisphere.
  const z = Math.cos(latRad) * Math.cos(lonRad);
  return { x, y, z };
}

// Generate the sphere dot grid. Density per latitude band is scaled
// by cos(lat) so dots stay roughly evenly spaced on the sphere surface
// rather than bunching up near the poles.
function generateDots() {
  const dots: { x: number; y: number; z: number; key: string }[] = [];
  for (let lat = -84; lat <= 84; lat += 7) {
    const cosLat = Math.cos((lat * Math.PI) / 180);
    const numDots = Math.max(8, Math.round(48 * cosLat));
    for (let i = 0; i < numDots; i++) {
      const lon = (i * 360) / numDots - 180;
      const p = project(lat, lon);
      // Cull back-facing points + a tiny rim margin so silhouette is clean.
      if (p.z > 0.02) {
        dots.push({ ...p, key: `${lat}-${i}` });
      }
    }
  }
  return dots;
}

export function TeamGlobe() {
  const dots = generateDots();
  const projected = cities.map((c) => ({ ...c, ...project(c.lat, c.lon) }));

  return (
    <section className="section-dark relative py-24 md:py-section overflow-hidden">
      <Container className="max-w-site">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
          <span className="system-label text-birdseye-electric">WHERE WE ARE</span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
            A global, fully{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              remote
            </span>{" "}
            team.
          </h2>
          <p className="mt-5 text-body text-birdseye-cream/55">
            Four cities, one shift pattern. We follow the sun so the gate is
            never off.
          </p>
        </div>

        {/* Globe + labels */}
        <div className="relative mx-auto" style={{ maxWidth: VIEW_W }}>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="block w-full h-auto"
            aria-hidden
          >
            <defs>
              {/* Background glow under the globe */}
              <radialGradient id="globeHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(46, 75, 255, 0.20)" />
                <stop offset="55%" stopColor="rgba(46, 75, 255, 0.05)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
              {/* Subtle inner shading for sphere depth */}
              <radialGradient
                id="globeShade"
                cx="35%"
                cy="35%"
                r="65%"
                fx="30%"
                fy="30%"
              >
                <stop offset="0%" stopColor="rgba(244, 237, 228, 0.04)" />
                <stop offset="80%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>

            {/* Outer halo */}
            <circle cx={CX} cy={CY} r={R + 80} fill="url(#globeHalo)" />

            {/* Sphere outline + inner shading */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="url(#globeShade)"
              stroke="rgba(244, 237, 228, 0.10)"
              strokeWidth="1"
            />

            {/* Dots that compose the sphere — render FIRST so the
                continent outlines layer on top with proper contrast. */}
            <g>
              {dots.map((d) => (
                <circle
                  key={d.key}
                  cx={d.x}
                  cy={d.y}
                  r={1 + d.z * 0.7}
                  fill="#F4EDE4"
                  opacity={0.10 + d.z * 0.32}
                />
              ))}
            </g>

            {/* Real continent outlines, projected through d3-geo
                geoOrthographic at the same rotation as the dot-sphere.
                Path lives in _design/world-globe.json (built from
                world-atlas/land-110m via scripts/regen-world-map.js).
                Stroked-only with very faint cream fill — reads as
                "this is Earth, here are the continents" without
                fighting the dot-sphere's quiet register or the city
                pins on top. */}
            <path
              d={worldGlobe.d}
              fill="rgba(244, 237, 228, 0.05)"
              stroke="rgba(244, 237, 228, 0.55)"
              strokeWidth="0.7"
              strokeLinejoin="round"
            />

            {/* Connector lines from each visible city to its label anchor */}
            {projected.map((c) => {
              if (c.z <= 0) return null;
              // Line ends slightly inside the label box for a clean join.
              const endX = c.align === "left" ? c.labelX + 200 : c.labelX;
              const endY = c.labelY + 14;
              return (
                <line
                  key={`line-${c.name}`}
                  x1={c.x}
                  y1={c.y}
                  x2={endX}
                  y2={endY}
                  stroke="rgba(46, 75, 255, 0.50)"
                  strokeWidth="0.9"
                  strokeDasharray="2.5 3.5"
                />
              );
            })}

            {/* City pins, pulsing outer ring, solid inner dot */}
            {projected.map((c, i) => {
              if (c.z <= 0) return null;
              const begin = `${i * 0.55}s`;
              return (
                <g key={`pin-${c.name}`}>
                  {/* Pulse ring */}
                  <circle cx={c.x} cy={c.y} r="4" fill="#2E4BFF">
                    <animate
                      attributeName="r"
                      values="4;18;4"
                      dur="2.8s"
                      begin={begin}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.65;0;0.65"
                      dur="2.8s"
                      begin={begin}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Solid pin (cream halo + electric core) */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="4.2"
                    fill="#F4EDE4"
                  />
                  <circle cx={c.x} cy={c.y} r="2" fill="#2E4BFF" />
                </g>
              );
            })}
          </svg>

          {/* HTML labels overlaid on the SVG. Positioned via viewBox %. */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            {projected.map((c) => {
              if (c.z <= 0) return null;
              const left = (c.labelX / VIEW_W) * 100;
              const top = (c.labelY / VIEW_H) * 100;
              return (
                <div
                  key={`label-${c.name}`}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: "200px",
                    textAlign: c.align,
                  }}
                >
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream">
                    {c.name}
                  </div>
                  <div className="mt-0.5 text-[12px] leading-tight text-birdseye-cream/55">
                    {c.region}
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.16em] uppercase text-birdseye-electric">
                    {c.role}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile fallback, labels-as-cards grid below the globe */}
        <div className="lg:hidden mt-10 grid grid-cols-2 gap-x-6 gap-y-6 max-w-[480px] mx-auto">
          {cities.map((c) => (
            <div key={c.name}>
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-birdseye-cream">
                {c.name}
              </div>
              <div className="text-[12px] leading-tight text-birdseye-cream/55">
                {c.region}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.16em] uppercase text-birdseye-electric">
                {c.role}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote, small mono line under the globe block */}
        <div className="mt-12 md:mt-16 text-center font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/35">
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-birdseye-success animate-pulse" />
            All four sites currently online · 24/7 coverage
          </span>
        </div>
      </Container>
    </section>
  );
}
