"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";

/**
 * GateEventTimeline, the S-tier signature moment.
 *
 * One verified gate event, end to end, that the visitor scrubs through.
 * Seven steps from a truck pulling up to the event being filed into the
 * audit-ready record. Each step is a real Birdseye behavior — ID, seal,
 * BOL, voice-down, clearance, record. The interaction *is* the proof:
 * the system isn't just claimed in copy, the visitor walks through it
 * with their cursor.
 *
 * Why this exists:
 *   • Brand thesis: every event is verified, time-stamped, and filed.
 *   • Most marketing sites describe this. We let the visitor scrub it.
 *   • Pairs the linear narrative (timeline) with the operational proof
 *     (the seven concrete checks) without requiring a video asset.
 *
 * Interaction model:
 *   • A horizontal track at the bottom with seven evenly-spaced ticks.
 *   • A draggable playhead snaps to the nearest tick on release.
 *   • Click any tick to jump to it. Arrow-left / arrow-right step
 *     when the track has keyboard focus.
 *   • Auto-advance plays through the seven steps once on first scroll
 *     into view, then idles. The user takes over from there.
 *   • The detail panel above the track updates with each step:
 *     timestamp, label, italic-serif voice line, mono key-value rows,
 *     status badge.
 *
 * Reduce-motion:
 *   • No auto-advance.
 *   • Snap transitions (no soft easing on the playhead) so the panel
 *     change reads as deliberate, not animated.
 *
 * Accessibility:
 *   • The scrubber has role="slider" with aria-valuemin/max/now.
 *   • Each tick is its own focusable button so keyboard users can land
 *     on a step without dragging.
 *   • Reduce-motion is honored; no flashing or rapid color changes.
 */

type Status = "DETECT" | "PASS" | "OPTIONAL" | "RECORD";

type Event = {
  /** Two-digit step number, used in mono filing labels. */
  n: string;
  /** Absolute HH:MM:SS — the wall-clock time of the step. Shown as a
   *  small "AT … LOCAL" anchor under the big elapsed number, so the
   *  visitor can place the event in real time without having to do
   *  the arithmetic. */
  ts: string;
  /** Elapsed mm:ss FROM ARRIVAL. This is the BIG number on the stage
   *  — it climbs from 00:00 at step 1 to 00:22 at step 7, so the
   *  hero typography moves meaningfully across every scrub instead
   *  of just changing the last two digits. */
  elapsed: string;
  /** Sentence-case event name (Capitalize the system action). */
  label: string;
  /** What the system did at this step, italic-serif voice line. */
  voice: string;
  /** Status pill color band. PASS / RECORD = success; DETECT /
   *  OPTIONAL = electric. Used both on the badge and the timeline tick. */
  status: Status;
  /** Mono key-value rows shown beneath the voice line. Three or four
   *  is the sweet spot — enough to feel real, not so many that the
   *  panel scrolls. */
  rows: { k: string; v: string }[];
};

const EVENTS: Event[] = [
  {
    n: "01",
    ts: "03:14:18",
    elapsed: "00:00",
    label: "Arrival",
    voice: "Inbound rig at Gate 01.",
    status: "DETECT",
    rows: [
      { k: "LANE", v: "01 · NORTH" },
      { k: "DIRECTION", v: "NW" },
      { k: "VEHICLE", v: "VOLVO VNL + REEFER" },
      { k: "APPROACH SPEED", v: "6 MPH" },
    ],
  },
  {
    n: "02",
    ts: "03:14:22",
    elapsed: "00:04",
    label: "ID verified",
    voice: "Driver biometric matched with carrier roster.",
    status: "PASS",
    rows: [
      { k: "DRIVER", v: "M. JOHANSEN" },
      { k: "DOT", v: "3412998" },
      { k: "CARRIER", v: "0421" },
      { k: "LICENSE", v: "ON FILE · EXP 2026-Q3" },
    ],
  },
  {
    n: "03",
    ts: "03:14:25",
    elapsed: "00:07",
    label: "Seal check",
    voice: "Trailer seal scanned and matched.",
    status: "PASS",
    rows: [
      { k: "SEAL #", v: "S-001482-V" },
      { k: "MATCH", v: "BOL · BL-7782-04" },
      { k: "REEFER TEMP", v: "−10°F · NOMINAL" },
      { k: "INTACT", v: "YES" },
    ],
  },
  {
    n: "04",
    ts: "03:14:28",
    elapsed: "00:10",
    label: "BOL match",
    voice: "Bill of Lading cross-referenced to shipment.",
    status: "PASS",
    rows: [
      { k: "BOL #", v: "BL-7782-04" },
      { k: "ORIGIN", v: "SCRANTON, PA" },
      { k: "DEST", v: "MISSISSAUGA, ON" },
      { k: "WEIGHT", v: "44,200 LBS" },
    ],
  },
  {
    n: "05",
    ts: "03:14:32",
    elapsed: "00:14",
    label: "Voice-down",
    voice: "Hi-vis vest required in the yard.",
    status: "OPTIONAL",
    rows: [
      { k: "PROMPT", v: "HI-VIS VEST · REQUIRED" },
      { k: "DRIVER", v: "ACKNOWLEDGED" },
      { k: "COMPLIANCE", v: "VEST DONNED" },
      { k: "DURATION", v: "00:08" },
    ],
  },
  {
    n: "06",
    ts: "03:14:36",
    elapsed: "00:18",
    label: "Cleared",
    voice: "Barrier arm raises. Truck proceeds.",
    status: "PASS",
    rows: [
      { k: "BARRIER ARM", v: "RAISED · 75°" },
      { k: "DWELL", v: "00:18 TOTAL" },
      { k: "NEXT", v: "DOCK B-04 · 320 M" },
    ],
  },
  {
    n: "07",
    ts: "03:14:40",
    elapsed: "00:22",
    label: "Logged",
    voice: "Event logged into the audit-ready record.",
    status: "RECORD",
    rows: [
      { k: "RECORD ID", v: "EV-20260503-0001" },
      { k: "VIDEO", v: "STORED · 24S" },
      { k: "VOICE", v: "STORED · 08S" },
      { k: "RETENTION", v: "7 YRS" },
    ],
  },
];

/**
 * Status → brand color map. PASS / RECORD use brand-success (the
 * verified green); DETECT / OPTIONAL use brand-electric. Returned as
 * concrete colors (not Tailwind classes) so they can flow into both
 * className and inline style.
 */
const STATUS_COLOR: Record<Status, { name: string; hex: string }> = {
  DETECT: { name: "electric", hex: "#2E4BFF" },
  PASS: { name: "success", hex: "#4ADE80" },
  OPTIONAL: { name: "electric", hex: "#2E4BFF" },
  RECORD: { name: "success", hex: "#4ADE80" },
};

export function GateEventTimeline() {
  const reduceMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);

  // `progress` is a real number in [0, EVENTS.length - 1]. While the
  // user is dragging, it can be fractional so the playhead glides
  // between ticks. On release it snaps to the nearest integer step.
  const [progress, setProgress] = useState<number>(0);
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const lastIndex = EVENTS.length - 1;
  const activeStep = Math.round(progress);
  const activeEvent = EVENTS[activeStep] ?? EVENTS[0];

  /* ─── Auto-advance on first scroll-into-view ────────────────────
     One pass through all seven steps, ~1.1s per step, then stop and
     hand control to the visitor. The user grabbing the playhead at
     any time pauses the auto-advance permanently. */
  useEffect(() => {
    if (reduceMotion) return;
    if (hasInteracted) return;
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    let startTime = 0;
    const STEP_MS = 1100;
    const TOTAL_MS = STEP_MS * lastIndex;

    const tick = (now: number) => {
      if (hasInteracted) return; // user took over
      const t = (now - startTime) / TOTAL_MS;
      if (t >= 1) {
        setProgress(lastIndex);
        return;
      }
      setProgress(t * lastIndex);
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            startTime = performance.now();
            raf = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, hasInteracted, lastIndex]);

  /* ─── Drag handling ─────────────────────────────────────────────
     We listen at the document level once the user pointers-down on
     the track, so dragging off the track edge keeps the playhead
     gliding. The progress is computed from the pointer X position
     relative to the track's bounding box, clamped to [0, lastIndex]. */
  const setProgressFromPointerX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const t = (clientX - rect.left) / rect.width;
      const clamped = Math.max(0, Math.min(1, t));
      setProgress(clamped * lastIndex);
    },
    [lastIndex],
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      setProgressFromPointerX(e.clientX);
    };
    const onUp = () => {
      setDragging(false);
      // Snap to nearest integer on release.
      setProgress((p) => Math.round(p));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, setProgressFromPointerX]);

  /* ─── Keyboard handling ─────────────────────────────────────────
     Arrow-left / arrow-right steps the playhead. Home / End jump to
     either edge. Mirrors native <input type="range"> behavior. */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next = activeStep;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(lastIndex, activeStep + 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(0, activeStep - 1);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = lastIndex;
      else return;
      e.preventDefault();
      setProgress(next);
      setHasInteracted(true);
    },
    [activeStep, lastIndex],
  );

  /* ─── Tick positions, in % of track width ───────────────────────
     Pre-computed once because seven evenly-spaced positions never
     change. */
  const tickPositions = useMemo(
    () => EVENTS.map((_, i) => (i / lastIndex) * 100),
    [lastIndex],
  );

  const playheadPercent = (progress / lastIndex) * 100;
  const activeColor = STATUS_COLOR[activeEvent.status];

  return (
    <section
      ref={sectionRef}
      className="section-dark relative py-24 md:py-section overflow-hidden"
      aria-labelledby="gate-event-timeline-heading"
    >
      <Container className="max-w-site">
        {/* Top filing strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="flex items-center justify-between gap-6 mb-8 md:mb-10"
        >
          <span className="system-label text-birdseye-electric flex items-center gap-2.5">
            <span className="relative grid place-items-center h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-birdseye-success" />
              {!reduceMotion && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-birdseye-success/50"
                  animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </span>
            GATECORE · LIVE EVENT
          </span>
          <span className="hidden md:inline system-label text-birdseye-cream/35 tabular-nums">
            FRAME {activeEvent.n} / 0{lastIndex + 1}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-end mb-14 md:mb-16"
        >
          <div>
            <h2
              id="gate-event-timeline-heading"
              className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.025em] font-bold text-birdseye-cream"
            >
              Drag the timeline.{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                Watch
              </span>{" "}
              the system work.
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3">
            Every truck Birdseye verifies clears seven checks in twenty-two
            seconds. Scrub the playhead — every step is a real check, every
            check is filed.
          </p>
        </motion.div>

        {/* Stage: detail panel for the current event */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="relative rounded-2xl border border-birdseye-cream/[0.10] bg-birdseye-surface/50 overflow-hidden"
        >
          {/* Inner stage. Two-column on lg+: timestamp + label on the
              left, key-value rows on the right. */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] min-h-[300px] md:min-h-[340px]">
            {/* LEFT — timestamp + label */}
            <div className="relative p-6 md:p-10 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-birdseye-cream/[0.08]">
              <div>
                <span
                  className="font-mono text-[10px] md:text-[11px] tracking-[0.28em] uppercase"
                  style={{ color: activeColor.hex }}
                >
                  STEP {activeEvent.n} · {activeEvent.status} · ELAPSED
                </span>
                {/* BIG number — elapsed mm:ss from arrival, NOT the
                    absolute wall-clock time. The earlier version showed
                    03:14:18 → 03:14:40 in this slot, which only changed
                    the last two digits across steps and wasted the
                    biggest type. With elapsed, the hero number actually
                    moves: 00:00 → 00:22. The wall-clock time still
                    appears small underneath as the AT … LOCAL anchor
                    so the visitor can see when, in real time, the step
                    happened. */}
                <div className="mt-3 font-mono text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] font-bold text-birdseye-cream tabular-nums">
                  {activeEvent.elapsed}
                </div>
                <div className="mt-1.5 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-birdseye-cream/35 tabular-nums">
                  AT {activeEvent.ts} LOCAL
                </div>
                <h3 className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
                  {activeEvent.label}.
                </h3>
                <p className="mt-3 text-[clamp(1.0625rem,1.4vw,1.375rem)] leading-[1.35] text-birdseye-cream/75">
                  <span className="font-serif italic font-normal text-birdseye-electric">
                    {activeEvent.voice.split(" ")[0]}
                  </span>{" "}
                  {activeEvent.voice.split(" ").slice(1).join(" ")}
                </p>
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: activeColor.hex }}
                />
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: activeColor.hex }}
                >
                  {activeEvent.status === "PASS"
                    ? "VERIFIED · STORED"
                    : activeEvent.status === "RECORD"
                      ? "LOGGED · 7-YR RETENTION"
                      : activeEvent.status === "OPTIONAL"
                        ? "DRIVER NOTIFIED · COMPLIED"
                        : "SYSTEM ARMED"}
                </span>
              </div>
            </div>

            {/* RIGHT — key-value rows */}
            <div className="p-6 md:p-10 flex flex-col justify-center gap-3 md:gap-4">
              {activeEvent.rows.map((row) => (
                <div
                  key={row.k}
                  className="flex items-baseline justify-between gap-6 border-b border-birdseye-cream/[0.06] pb-3 md:pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-birdseye-cream/45">
                    {row.k}
                  </span>
                  <span className="font-mono text-[12px] md:text-[14px] tracking-[0.05em] text-birdseye-cream tabular-nums text-right">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scrubbable timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
          className="mt-10 md:mt-12"
        >
          {/* Filing strip above the track */}
          <div className="flex items-end justify-between gap-6 mb-4 md:mb-5">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-birdseye-cream/45">
              03:14:18 → 03:14:40 · ELAPSED 22 SEC
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/35 hidden sm:inline">
              DRAG · CLICK · ←/→
            </span>
          </div>

          {/* Track + ticks. The role/aria attributes give it slider
              semantics; the tab-able dots beneath let keyboard users
              jump to a specific step without dragging. */}
          <div
            ref={trackRef}
            role="slider"
            aria-label="Gate event timeline scrubber"
            aria-valuemin={0}
            aria-valuemax={lastIndex}
            aria-valuenow={activeStep}
            aria-valuetext={`Step ${activeStep + 1} of ${lastIndex + 1}: ${activeEvent.label}`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => {
              e.preventDefault();
              setHasInteracted(true);
              setDragging(true);
              setProgressFromPointerX(e.clientX);
            }}
            // CustomCursor reticle on the scrubber — the cursor reads
            // as something you're aiming at, not just dragging.
            data-cursor="target"
            className="relative h-12 cursor-ew-resize select-none touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-full"
          >
            {/* Background track hairline */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-birdseye-cream/[0.12]" />

            {/* Filled portion (from start to playhead), brand-success
                so completed steps read as verified. Width animates
                smoothly while dragging, snaps on release. */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-birdseye-success"
              animate={{ width: `${playheadPercent}%` }}
              transition={
                dragging || reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: EASE_OUT }
              }
            />

            {/* Ticks */}
            {tickPositions.map((p, i) => {
              const completed = i < activeStep;
              const current = i === activeStep;
              const ev = EVENTS[i];
              return (
                <button
                  key={ev.n}
                  type="button"
                  aria-label={`Step ${i + 1}: ${ev.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHasInteracted(true);
                    setProgress(i);
                  }}
                  onPointerDown={(e) => {
                    // Stop the parent's pointer-down so a tick click
                    // doesn't immediately start a drag from the tick's
                    // exact x.
                    e.stopPropagation();
                    setHasInteracted(true);
                    setProgress(i);
                  }}
                  className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-9 grid place-items-center focus-visible:outline-none"
                  style={{ left: `${p}%` }}
                >
                  <span
                    aria-hidden
                    className={`block rounded-full transition-all duration-300 ${
                      current
                        ? "h-3 w-3 ring-2 ring-offset-2 ring-offset-birdseye-navy"
                        : completed
                          ? "h-2 w-2"
                          : "h-1.5 w-1.5"
                    }`}
                    style={{
                      background: current
                        ? activeColor.hex
                        : completed
                          ? "#4ADE80"
                          : "rgba(244,237,228,0.30)",
                      // ts cast: ringColor isn't a standard CSS var name
                      // but Tailwind's ring uses --tw-ring-color when
                      // present; we set boxShadow inline instead.
                      boxShadow: current
                        ? `0 0 0 4px rgba(46,75,255,0.18), 0 0 16px ${activeColor.hex}`
                        : "none",
                    }}
                  />
                </button>
              );
            })}

            {/* Playhead — a vertical bar that glides with progress. */}
            <motion.div
              aria-hidden
              className="absolute top-0 bottom-0 w-px"
              style={{ background: activeColor.hex }}
              animate={{ left: `${playheadPercent}%` }}
              transition={
                dragging || reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: EASE_OUT }
              }
            />
          </div>

          {/* Tick labels under the track */}
          <div className="relative h-8 mt-3">
            {tickPositions.map((p, i) => {
              const ev = EVENTS[i];
              const current = i === activeStep;
              return (
                <div
                  key={`label-${ev.n}`}
                  className="absolute top-0 -translate-x-1/2 transition-opacity duration-300"
                  style={{
                    left: `${p}%`,
                    opacity: current ? 1 : 0.45,
                  }}
                >
                  <span
                    className={`font-mono text-[9.5px] tracking-[0.22em] uppercase whitespace-nowrap ${
                      current
                        ? "text-birdseye-cream"
                        : "text-birdseye-cream/65"
                    }`}
                  >
                    {ev.n}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
