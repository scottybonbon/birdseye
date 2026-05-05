/**
 * ThreeCoresPanel, hard-coded design tokens + timing.
 *
 * Pulled out so the panel itself stays declarative. If we ever swap to
 * Lottie or external assets, the timing constants below stay relevant.
 *
 * Color values mirror tailwind.config birdseye.* tokens. We use the raw
 * hex inline (vs Tailwind classes) inside SVGs because Tailwind's JIT
 * cannot inline-style SVG attributes; the values have to be literal.
 */

export const COLORS = {
  navy: "#0F1C2E",
  cream: "#F4EDE4",
  electric: "#2E4BFF",
  success: "#4ADE80",
  /** Inactive overlay alpha for the cream linework. */
  dim: "rgba(244,237,228,0.30)",
} as const;

/**
 * Timing in milliseconds. Premium = slow + deliberate. Don't decrease.
 */
export const TIMING = {
  /** How long each core stays "live" in the auto-cycle. */
  cycleMs: 5200,
  /** Crossfade between active overlays. */
  transitionMs: 400,
  /** After a manual click, how long before we resume the auto-cycle. */
  resumeIdleMs: 14_000,
} as const;

/**
 * GateCore Full Rig Scan, per-step timing relative to the scene's
 * 5-second window. These ratios drive the framer-motion delays for
 * the scan sweep, the per-callout reveal, and the gate raise.
 */
export const GATE_SCAN = {
  /** Truck approaches and stops at the gate. */
  truckApproach: { start: 0, end: 1.0 },
  /** Single calm scan sweep over tractor + trailer. */
  scanSweep: { start: 1.0, end: 2.5 },
  /** Callouts appear, anchored to the rig, status lines tick to confirmed. */
  callouts: { start: 2.5, end: 3.8 },
  /** Gate raises, truck proceeds, "verified entry" stamp. */
  gateRaise: { start: 3.8, end: 5.0 },
} as const;

/**
 * Spatial anchor positions for the GateCore callouts (% of the panel
 * width / height). The animator can fine-tune these once the
 * production truck art lands; until then they're tuned to the SVG
 * placeholder truck. NON-NEGOTIABLE per brief: each callout MUST
 * anchor to the right physical location on the rig.
 *
 *   DOT Number      → cab door
 *   Truck Number    → front right fender
 *   Trailer Number  → top right corner of trailer
 *   License Plate   → visible plate zone (front of cab)
 *   Company Name    → trailer side branding zone
 */
export const GATE_CALLOUT_ANCHORS = {
  dot: { x: "32%", y: "62%", label: "DOT · 1234567" },
  truckNumber: { x: "20%", y: "55%", label: "TRUCK # · 0421" },
  trailerNumber: { x: "78%", y: "32%", label: "TRAILER # · 53-1077" },
  licensePlate: { x: "13%", y: "70%", label: "LP · ABC-1234" },
  company: { x: "60%", y: "48%", label: "COMPANY · BIRDSEYE TRANSPORT" },
} as const;

/**
 * GateCore HUD, the tick-list of scan items shown in a small mono
 * panel anchored bottom-left of the GateCore region. Each line goes
 * from neutral cream to confirmed electric in sequence as the scan
 * sweep clears it.
 */
export const GATE_HUD_ITEMS = [
  "SCAN · DAMAGES",
  "READ · LP",
  "READ · DOT",
  "READ · TRUCK #",
  "READ · TRAILER #",
  "READ · COMPANY",
] as const;
