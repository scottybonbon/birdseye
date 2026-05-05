/**
 * Regenerate the LiveOpsMap data JSONs from world-atlas + d3-geo.
 *
 * Run when:
 *   • Adding / removing / moving customer cities
 *   • Adding / removing ops floors
 *   • Switching projection (e.g. Robinson vs. Natural Earth vs. Mercator)
 *   • Re-cropping the visible viewport
 *
 * Usage:
 *   node scripts/regen-world-map.js
 *
 * Outputs:
 *   _design/world-land.json    — pre-projected land path string + viewBox
 *   _design/world-coords.json  — projected coords for each pin
 *
 * Why pre-project at build time vs. at runtime: the projected SVG path
 * for the simplified land mask is ~78KB. Computing it on every page
 * load would mean shipping topojson-client + d3-geo + the 55KB
 * land-110m.json to the client (≈ 200KB+). Computing it once at build
 * time and embedding the resulting path string keeps the runtime light.
 */

const fs = require("fs");
const path = require("path");
const topojson = require("topojson-client");
const d3geo = require("d3-geo");
const world = require("world-atlas/land-110m.json");

// ─── Projection ──────────────────────────────────────────────────────
// Natural Earth — visually balanced, less polar distortion than
// equirectangular, more modern feel than classic Mercator.
const PROJECTION_NAME = "naturalEarth1";
const SCALE = 170;
const TRANSLATE = [500, 250];

const projection = d3geo
  .geoNaturalEarth1()
  .scale(SCALE)
  .translate(TRANSLATE);

const project = (lng, lat) => projection([lng, lat]).map((n) => +n.toFixed(2));

// ─── Land mask ───────────────────────────────────────────────────────
const land = topojson.feature(world, world.objects.land);
const pathBuilder = d3geo.geoPath(projection);
const landPath = pathBuilder(land);

fs.writeFileSync(
  path.join(__dirname, "..", "_design", "world-land.json"),
  JSON.stringify({
    d: landPath,
    viewBox: `0 0 1000 500`,
    projection: PROJECTION_NAME,
    scale: SCALE,
    translate: TRANSLATE,
  }),
);

// ─── Pin data ────────────────────────────────────────────────────────
//
// To add or move a city, edit one of the three arrays below and re-run.
// Format: [name, longitude, latitude]. Longitude is negative in the
// western hemisphere (the Americas).

const NA_OPS = [
  ["Mississauga, ON", -79.6441, 43.589],
  ["Dallas, TX", -96.797, 32.7767],
];

const INTL_OPS = [
  ["Belgrade", 20.4489, 44.7866, "EU OPS"],
  ["Bogotá", -74.0721, 4.711, "SA OPS"],
];

// ─── Customer cities ────────────────────────────────────────────────
//
// PRIMARY (`tier: 1`) — large pulsing dots with halo. The marquee
// metropolises where Birdseye has multi-site presence and named
// customers. ~14 entries.
//
// SECONDARY (`tier: 2`) — smaller dots, no halo. Cities where Birdseye
// has at least one site but isn't a hub. Used to suggest the "400+
// facilities monitored" claim is real geography, not abstraction.
// ~30 entries clustered around the same metros + secondary markets.
//
// All positions are real lat/lng. Adding to either array re-runs
// through the same Natural Earth projection at build time.

const CITIES = [
  // ─── Primary (tier 1) — pulsing dots with halo ─────────────
  ["Vancouver", -123.1207, 49.2827, 1],
  ["Calgary", -114.0719, 51.0447, 1],
  ["Seattle", -122.3321, 47.6062, 1],
  ["Long Beach", -118.1937, 33.7701, 1],
  ["Phoenix", -112.074, 33.4484, 1],
  ["Denver", -104.9903, 39.7392, 1],
  ["Minneapolis", -93.265, 44.9778, 1],
  ["Chicago", -87.6298, 41.8781, 1],
  ["Houston", -95.3698, 29.7604, 1],
  ["Memphis", -90.049, 35.1495, 1],
  ["Atlanta", -84.388, 33.749, 1],
  ["Miami", -80.1918, 25.7617, 1],
  ["Halifax", -63.5752, 44.6488, 1],
  ["Mexico City", -99.1332, 19.4326, 1],

  // ─── Secondary (tier 2) — smaller dots, density layer ──────
  // West coast cluster
  ["San Francisco", -122.4194, 37.7749, 2],
  ["Sacramento", -121.4944, 38.5816, 2],
  ["Los Angeles", -118.2437, 34.0522, 2],
  ["San Diego", -117.1611, 32.7157, 2],
  ["Las Vegas", -115.1398, 36.1699, 2],
  ["Salt Lake City", -111.891, 40.7608, 2],
  ["Portland", -122.6765, 45.5152, 2],
  ["Boise", -116.2023, 43.615, 2],

  // Mountain + plains
  ["Albuquerque", -106.6504, 35.0844, 2],
  ["El Paso", -106.4424, 31.7619, 2],
  ["San Antonio", -98.4936, 29.4241, 2],
  ["Austin", -97.7431, 30.2672, 2],
  ["Oklahoma City", -97.5164, 35.4676, 2],
  ["Kansas City", -94.5786, 39.0997, 2],
  ["Omaha", -95.9345, 41.2565, 2],

  // Midwest / Rust Belt
  ["Detroit", -83.0458, 42.3314, 2],
  ["Cleveland", -81.6944, 41.4993, 2],
  ["Indianapolis", -86.1581, 39.7684, 2],
  ["Cincinnati", -84.512, 39.103, 2],
  ["Louisville", -85.7585, 38.2527, 2],
  ["Columbus", -82.9988, 39.9612, 2],
  ["Milwaukee", -87.9065, 43.0389, 2],
  ["St. Louis", -90.1994, 38.627, 2],

  // Southeast
  ["Nashville", -86.7816, 36.1627, 2],
  ["Birmingham", -86.8025, 33.5186, 2],
  ["Charlotte", -80.8431, 35.2271, 2],
  ["Raleigh", -78.6382, 35.7796, 2],
  ["Jacksonville", -81.6557, 30.3322, 2],
  ["Tampa", -82.4572, 27.9506, 2],
  ["Orlando", -81.3792, 28.5383, 2],
  ["New Orleans", -90.0715, 29.9511, 2],

  // Northeast
  ["Boston", -71.0589, 42.3601, 2],
  ["Hartford", -72.6851, 41.7637, 2],
  ["New York", -74.006, 40.7128, 2],
  ["Newark", -74.1724, 40.7357, 2],
  ["Philadelphia", -75.1652, 39.9526, 2],
  ["Baltimore", -76.6122, 39.2904, 2],
  ["Washington, DC", -77.0369, 38.9072, 2],
  ["Pittsburgh", -79.9959, 40.4406, 2],
  ["Buffalo", -78.8784, 42.8864, 2],

  // Canada
  ["Toronto", -79.3832, 43.6532, 2],
  ["Hamilton", -79.8711, 43.2557, 2],
  ["Ottawa", -75.6972, 45.4215, 2],
  ["Montréal", -73.5673, 45.5017, 2],
  ["Québec City", -71.2082, 46.8139, 2],
  ["Winnipeg", -97.1384, 49.8951, 2],
  ["Edmonton", -113.4938, 53.5461, 2],
  ["Saskatoon", -106.6701, 52.1579, 2],
  ["Victoria", -123.3656, 48.4284, 2],
];

const out = {
  naOps: NA_OPS.map(([name, lng, lat]) => {
    const [x, y] = project(lng, lat);
    return { name, x, y };
  }),
  intlOps: INTL_OPS.map(([name, lng, lat, region]) => {
    const [x, y] = project(lng, lat);
    return { name, region, x, y };
  }),
  cities: CITIES.map(([name, lng, lat, tier]) => {
    const [x, y] = project(lng, lat);
    return { name, x, y, tier };
  }),
};

fs.writeFileSync(
  path.join(__dirname, "..", "_design", "world-coords.json"),
  JSON.stringify(out, null, 2),
);

// ─── Globe (orthographic) land path ─────────────────────────────────
// Used by TeamGlobe on /career to render real continent outlines on
// the dot-sphere (replacing the previous "abstract dots only" globe
// where reviewers couldn't tell which side of the planet they were
// looking at). Projection params match TeamGlobe's hand-written
// projection exactly so the path aligns with the dot-sphere already
// rendered there:
//
//   • scale       = 240          (TeamGlobe R)
//   • translate   = [500, 320]   (TeamGlobe CX, CY)
//   • rotate λ    = 45           (matches TeamGlobe ROTATION = -45)
//
// d3 clips to the visible hemisphere automatically, so the resulting
// path covers only the front-facing continents. TeamGlobe layers it
// between the dot-sphere and the city pins for a clean legible globe.

const globe = d3geo
  .geoOrthographic()
  .scale(240)
  .translate([500, 320])
  .rotate([45, 0, 0])
  .clipAngle(90);
const globePath = d3geo.geoPath(globe)(land);

fs.writeFileSync(
  path.join(__dirname, "..", "_design", "world-globe.json"),
  JSON.stringify({
    d: globePath,
    viewBox: "0 0 1000 640",
    cx: 500,
    cy: 320,
    r: 240,
    rotate: [45, 0, 0],
  }),
);

const tier1 = out.cities.filter((c) => c.tier === 1).length;
const tier2 = out.cities.filter((c) => c.tier === 2).length;
console.log("Regenerated:");
console.log("  _design/world-land.json   —", landPath.length, "char path (flat NA map)");
console.log("  _design/world-globe.json  —", globePath.length, "char path (orthographic globe)");
console.log(
  "  _design/world-coords.json —",
  `${tier1} primary + ${tier2} secondary cities,`,
  `${out.naOps.length} NA ops, ${out.intlOps.length} intl ops`,
);
