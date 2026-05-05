"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";

/**
 * PortalDemo — operator dashboard product peek (FIGMA-4).
 *
 * What this is: a real-feeling mock of the Birdseye operator console
 * rendered entirely in HTML/CSS/SVG. No screenshots, no product
 * fiction — this is the surface a Birdseye operator works on,
 * approximated faithfully to the actual product so prospects can see
 * "what does the dashboard look like" without booking a demo.
 *
 * Layout: a single browser-chrome-framed surface with three columns:
 *
 *   1. LIVE EVENT FEED (left ~22%) — vertical scrolling list of recent
 *      gate events. Each row has timestamp · plate · status. The feed
 *      auto-scrolls slowly so the page reads as alive.
 *
 *   2. ACTIVE VISIT (center ~46%) — the current visit being worked.
 *      Plate, DOT, carrier, scan checklist, BOL preview, big VERIFY /
 *      HOLD / DENY action set.
 *
 *   3. CAMERA WALL + KPIs (right ~32%) — 4-up camera grid with live
 *      indicators, plus a small KPI strip beneath (today's events,
 *      avg gate time, deterrent actions).
 *
 * Visual register: same dark surface + electric accent + filing-line
 * register as the rest of the site. The mock uses the SAME color
 * tokens, the SAME mono-caps system labels, the SAME rounded
 * containers — so it reads as "this product was designed by the same
 * people who designed this website," not as a stylistic departure.
 *
 * Restraint: one slow auto-scroll on the feed, one pulse on the LIVE
 * indicators. No flashing alerts, no fake counter increments. The
 * surface should feel calm — that's the brand promise.
 */
export function PortalDemo() {
  return (
    <section
      id="what-operators-see"
      className="section-dark relative py-20 md:py-section overflow-hidden"
    >
      <Container className="max-w-site">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-10 md:mb-14"
        >
          <div>
            <span className="system-label text-birdseye-electric">
              PRODUCT · OPERATOR CONSOLE
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
              What your operators{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                see
              </span>{" "}
              every shift.
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3">
            One surface for every gate event, every camera, every trailer in
            the yard. The console below is the actual product — not a
            screenshot, not a sketch.
          </p>
        </motion.div>

        {/* Browser chrome wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
          className="relative rounded-2xl border border-birdseye-cream/[0.10] bg-[#0A0A0B] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          data-cursor="scan"
          data-cursor-caption="OPERATOR CONSOLE · LIVE PRODUCT VIEW"
        >
          <BrowserChrome />
          <ConsoleSurface />
        </motion.div>

        {/* Filing line below */}
        <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40">
          <span
            aria-hidden
            className="grid place-items-center h-3 w-3 rounded-full bg-birdseye-electric/15 text-birdseye-electric/80 text-[9px] leading-none font-medium"
          >
            +
          </span>
          OPERATOR SURFACE · BUILD 2026.05 · MOCK DATA
        </p>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   BrowserChrome — minimal Mac-style traffic-light bar + URL pill so the
   surface reads as "an actual app in an actual browser" rather than
   "a panel."
   ──────────────────────────────────────────────────────────────────── */
function BrowserChrome() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-birdseye-cream/[0.08] bg-[#0E0E10]">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-birdseye-cream/45 px-3 py-1 rounded-md bg-birdseye-cream/[0.04] border border-birdseye-cream/[0.06]">
          portal.birdseyesecurity.com / console
        </div>
      </div>
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35">
        OP-247
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ConsoleSurface — the actual product mock. 3-column grid.
   ──────────────────────────────────────────────────────────────────── */
function ConsoleSurface() {
  return (
    <div className="grid lg:grid-cols-[22%_46%_32%] min-h-[640px] md:min-h-[720px]">
      <LiveFeed />
      <ActiveVisit />
      <CameraWall />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   LIVE FEED — vertical scrolling event list
   ──────────────────────────────────────────────────────────────────── */
const FEED_EVENTS: Array<{
  time: string;
  plate: string;
  status: "verified" | "hold" | "exit";
  carrier: string;
}> = [
  { time: "14:38:22", plate: "ABC-2841", status: "verified", carrier: "Bison" },
  { time: "14:36:11", plate: "TX-9174", status: "exit", carrier: "Werner" },
  { time: "14:34:47", plate: "ON-7728", status: "verified", carrier: "Brimich" },
  { time: "14:32:09", plate: "CR-1041", status: "hold", carrier: "C.R. England" },
  { time: "14:30:55", plate: "AWC-336", status: "verified", carrier: "AWC" },
  { time: "14:28:14", plate: "TX-2218", status: "exit", carrier: "Schneider" },
  { time: "14:26:38", plate: "ON-4490", status: "verified", carrier: "Bison" },
  { time: "14:24:02", plate: "MX-558", status: "verified", carrier: "Remco" },
  { time: "14:21:51", plate: "ABC-1107", status: "exit", carrier: "Werner" },
  { time: "14:19:33", plate: "TX-3382", status: "verified", carrier: "C.R. England" },
];

function LiveFeed() {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <div className="border-r border-birdseye-cream/[0.06] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-birdseye-cream/[0.06] flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/65 flex items-center gap-2">
          <LivePulse /> LIVE FEED
        </span>
        <span className="font-mono text-[10px] tracking-[0.10em] text-birdseye-cream/35">
          GATE-01
        </span>
      </div>

      {/* Scrolling list */}
      <div className="relative flex-1 overflow-hidden">
        <motion.ul
          animate={
            reduceMotion ? undefined : { y: ["0%", "-50%"] }
          }
          transition={
            reduceMotion
              ? undefined
              : { ease: "linear", duration: 32, repeat: Infinity }
          }
          className="absolute inset-x-0 top-0"
        >
          {/* Render twice so the loop is seamless */}
          {[...FEED_EVENTS, ...FEED_EVENTS].map((e, i) => (
            <li
              key={`${e.plate}-${i}`}
              className="px-4 py-3 border-b border-birdseye-cream/[0.05]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] tracking-[0.06em] text-birdseye-cream/45 tabular-nums">
                  {e.time}
                </span>
                <StatusChip status={e.status} />
              </div>
              <p className="font-mono text-[12px] tracking-[0.04em] text-birdseye-cream font-semibold tabular-nums">
                {e.plate}
              </p>
              <p className="font-mono text-[10px] tracking-[0.04em] text-birdseye-cream/45 mt-0.5">
                {e.carrier}
              </p>
            </li>
          ))}
        </motion.ul>
        {/* Top + bottom mask gradients so the scroll loop reads as continuous */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0A0A0B] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: "verified" | "hold" | "exit" }) {
  const map = {
    verified: { color: "#34D399", bg: "rgba(52, 211, 153, 0.12)", text: "VERIFIED" },
    hold: { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.14)", text: "HOLD" },
    exit: { color: "#94A3B8", bg: "rgba(148, 163, 184, 0.12)", text: "EXIT" },
  } as const;
  const c = map[status];
  return (
    <span
      className="font-mono text-[8.5px] tracking-[0.14em] uppercase rounded-sm px-1.5 py-0.5"
      style={{ color: c.color, background: c.bg }}
    >
      {c.text}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ACTIVE VISIT — the truck currently being worked
   ──────────────────────────────────────────────────────────────────── */
function ActiveVisit() {
  const checks = [
    { label: "License plate", value: "ABC-2841", ok: true },
    { label: "DOT number", value: "USDOT 9714328", ok: true },
    { label: "Carrier", value: "Bison Transport", ok: true },
    { label: "Trailer #", value: "BISN-T2218", ok: true },
    { label: "Booking ID", value: "BK-44102", ok: true },
    { label: "Driver ID", value: "Pending review", ok: false },
  ];
  return (
    <div className="border-r border-birdseye-cream/[0.06] flex flex-col">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-birdseye-cream/[0.06] flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/65">
          ACTIVE VISIT · GATE-01
        </span>
        <span className="font-mono text-[10px] tracking-[0.10em] text-birdseye-cream/35 tabular-nums">
          14:38:22 · ELAPSED 0:21
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-5 md:px-6 md:py-6 flex-1 flex flex-col">
        {/* Truck preview — abstract SVG, not a real photo */}
        <TruckPreview />

        {/* Checklist */}
        <div className="mt-5">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/55 mb-3">
            VERIFICATION
          </p>
          <ul className="space-y-1.5">
            {checks.map((c) => (
              <li
                key={c.label}
                className="flex items-center justify-between py-1.5 px-2.5 rounded bg-birdseye-cream/[0.025] border border-birdseye-cream/[0.04]"
              >
                <span className="font-mono text-[10.5px] tracking-[0.06em] text-birdseye-cream/55">
                  {c.label}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10.5px] tracking-[0.04em] ${
                      c.ok ? "text-birdseye-cream/85" : "text-birdseye-cream/45"
                    }`}
                  >
                    {c.value}
                  </span>
                  {c.ok ? (
                    <span className="text-[#34D399] text-[12px] leading-none">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[#F59E0B] text-[12px] leading-none">
                      ●
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action set */}
        <div className="mt-5 pt-5 border-t border-birdseye-cream/[0.06] flex items-center gap-2.5">
          <button
            type="button"
            disabled
            className="flex-1 font-mono text-[11px] tracking-[0.22em] uppercase font-semibold rounded px-4 py-3 bg-[#34D399] text-birdseye-deep cursor-default"
          >
            Verify · Open gate
          </button>
          <button
            type="button"
            disabled
            className="font-mono text-[11px] tracking-[0.22em] uppercase rounded px-4 py-3 border border-[#F59E0B]/40 text-[#F59E0B] cursor-default"
          >
            Hold
          </button>
          <button
            type="button"
            disabled
            className="font-mono text-[11px] tracking-[0.22em] uppercase rounded px-4 py-3 border border-birdseye-cream/15 text-birdseye-cream/55 cursor-default"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

function TruckPreview() {
  // Abstract iso-ish silhouette of a truck at the gate, sketched in SVG.
  // Reads as "the visual the camera has captured for review" without
  // pretending to be a real photograph.
  return (
    <div className="relative w-full rounded-lg border border-birdseye-cream/[0.06] overflow-hidden bg-[#0E0E10] aspect-[16/8]">
      <svg
        viewBox="0 0 320 160"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {/* Ground line */}
        <line
          x1="0"
          y1="138"
          x2="320"
          y2="138"
          stroke="rgba(232,237,240,0.10)"
          strokeWidth="0.5"
        />
        {/* Gate post left + right + arm raised */}
        <line x1="50" y1="130" x2="50" y2="80" stroke="rgba(232,237,240,0.45)" strokeWidth="1.5" />
        <line x1="50" y1="80" x2="80" y2="58" stroke="rgba(232,237,240,0.55)" strokeWidth="1.5" />
        {/* Trailer + tractor silhouette */}
        <rect x="100" y="78" width="120" height="50" rx="2" fill="rgba(232,237,240,0.08)" stroke="rgba(232,237,240,0.45)" strokeWidth="1" />
        <rect x="220" y="86" width="40" height="42" rx="2" fill="rgba(232,237,240,0.10)" stroke="rgba(232,237,240,0.55)" strokeWidth="1" />
        <rect x="260" y="100" width="14" height="28" rx="1" fill="rgba(232,237,240,0.08)" stroke="rgba(232,237,240,0.45)" strokeWidth="1" />
        <circle cx="120" cy="135" r="6" fill="rgba(15,28,46,0.95)" stroke="rgba(232,237,240,0.45)" strokeWidth="0.6" />
        <circle cx="200" cy="135" r="6" fill="rgba(15,28,46,0.95)" stroke="rgba(232,237,240,0.45)" strokeWidth="0.6" />
        <circle cx="245" cy="135" r="6" fill="rgba(15,28,46,0.95)" stroke="rgba(232,237,240,0.45)" strokeWidth="0.6" />
        {/* Plate-detection box around front bumper */}
        <rect
          x="262"
          y="108"
          width="14"
          height="6"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="0.8"
        />
        <text x="262" y="105" fontFamily="ui-monospace, monospace" fontSize="4.5" fill="#5EEAD4" letterSpacing="0.3">
          ABC-2841
        </text>
        {/* Scan beam ambience */}
        <line x1="80" y1="60" x2="265" y2="115" stroke="#5EEAD4" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.55" />
      </svg>
      <div className="absolute top-2 left-2 font-mono text-[9px] tracking-[0.18em] uppercase text-birdseye-cream/55 flex items-center gap-1.5">
        <LivePulse small /> CAM-01 · GATE
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[9px] tracking-[0.10em] text-birdseye-cream/45 tabular-nums">
        720p · 30fps · live
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CAMERA WALL — 4-up grid + KPI strip beneath
   ──────────────────────────────────────────────────────────────────── */
const CAMS = [
  { id: "CAM-02", label: "GATE-02", state: "calm" },
  { id: "CAM-03", label: "ZONE-A", state: "calm" },
  { id: "CAM-04", label: "PERIMETER-W", state: "alert" },
  { id: "CAM-05", label: "DOCK-01", state: "calm" },
] as const;

function CameraWall() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-birdseye-cream/[0.06] flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/65 flex items-center gap-2">
          <LivePulse /> WALL · 4 / 32
        </span>
        <span className="font-mono text-[10px] tracking-[0.10em] text-birdseye-cream/35">
          AUTO ROTATE
        </span>
      </div>

      {/* Camera grid */}
      <div className="grid grid-cols-2 gap-px bg-birdseye-cream/[0.05]">
        {CAMS.map((cam) => (
          <CameraTile key={cam.id} {...cam} />
        ))}
      </div>

      {/* KPI strip */}
      <div className="border-t border-birdseye-cream/[0.06] mt-auto">
        <div className="grid grid-cols-3 divide-x divide-birdseye-cream/[0.06]">
          <KPI label="EVENTS · TODAY" value="412" />
          <KPI label="AVG GATE TIME" value="2.4m" />
          <KPI label="DETERRENT ACTS" value="3" tone="electric" />
        </div>
        <div className="px-4 py-3 border-t border-birdseye-cream/[0.06]">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/45 mb-2">
            VOICE-DOWN LOG · LAST 4
          </p>
          <ul className="space-y-1">
            {[
              { t: "14:31", note: "Loiterer cleared, NW corner" },
              { t: "13:08", note: "Unfamiliar vehicle, dock-3" },
              { t: "11:42", note: "After-hours intrusion, lot-B" },
              { t: "09:17", note: "Driver assist, gate-01" },
            ].map((row) => (
              <li
                key={row.t}
                className="flex items-baseline gap-2 font-mono text-[10.5px] tracking-[0.04em]"
              >
                <span className="text-birdseye-cream/35 tabular-nums">{row.t}</span>
                <span className="text-birdseye-cream/65 truncate">{row.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CameraTile({
  id,
  label,
  state,
}: {
  id: string;
  label: string;
  state: "calm" | "alert";
}) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <div className="relative bg-[#0E0E10] aspect-[4/3] overflow-hidden">
      {/* Faint dot grid as the "video noise" */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`cam-${id}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="0.4" fill="#5EEAD4" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cam-${id})`} />
      </svg>
      {/* Centerpiece — abstract subject silhouette */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {state === "alert" ? (
          <g>
            <rect x="40" y="55" width="20" height="22" rx="1" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" strokeWidth="0.6" />
            <text x="50" y="48" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="4.5" fill="#F59E0B" letterSpacing="0.3">
              SUBJECT
            </text>
          </g>
        ) : (
          <g>
            <rect x="20" y="60" width="60" height="22" rx="1" fill="rgba(232,237,240,0.05)" stroke="rgba(232,237,240,0.18)" strokeWidth="0.4" />
            <line x1="20" y1="82" x2="80" y2="82" stroke="rgba(232,237,240,0.10)" strokeWidth="0.4" />
          </g>
        )}
      </svg>
      {/* Top-left ID + live */}
      <div className="absolute top-1.5 left-1.5 font-mono text-[8.5px] tracking-[0.14em] uppercase text-birdseye-cream/65 flex items-center gap-1">
        <LivePulse small reduceMotion={reduceMotion} />
        {id}
      </div>
      {/* Bottom label */}
      <div className="absolute bottom-1.5 left-1.5 font-mono text-[8.5px] tracking-[0.10em] uppercase text-birdseye-cream/55">
        {label}
      </div>
      {/* Alert flag */}
      {state === "alert" && (
        <div className="absolute top-1.5 right-1.5 font-mono text-[8px] tracking-[0.18em] uppercase text-[#F59E0B]">
          ALERT
        </div>
      )}
    </div>
  );
}

function KPI({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "electric";
}) {
  return (
    <div className="px-3 py-3.5">
      <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-birdseye-cream/45 mb-1.5">
        {label}
      </p>
      <p
        className={`font-bold text-[20px] leading-none tracking-[-0.015em] tabular-nums ${
          tone === "electric" ? "text-birdseye-electric" : "text-birdseye-cream"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   LivePulse — small pulsing dot used in feed + camera + visit headers.
   ──────────────────────────────────────────────────────────────────── */
function LivePulse({
  small = false,
  reduceMotion: rmOverride,
}: {
  small?: boolean;
  reduceMotion?: boolean;
}) {
  const rm = usePrefersReducedMotion();
  const reduceMotion = rmOverride ?? rm;
  const size = small ? "h-1 w-1" : "h-1.5 w-1.5";
  return (
    <span aria-hidden className={`relative grid place-items-center ${size}`}>
      <span className="absolute inset-0 rounded-full bg-[#34D399]" />
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#34D399]/60"
          animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
    </span>
  );
}
