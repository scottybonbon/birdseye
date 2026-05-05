"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { impact } from "@/_design/content";
import { YardOverlay } from "@/components/site/YardOverlay";
import { PlaceholderLabel } from "@/components/site/PlaceholderLabel";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * Single source of truth, the same yard photo on both sides of the
 * slider. Drop it at /public/figma-exports/yard-before.jpg.
 */
const YARD_PHOTO = "/figma-exports/yard-before.jpg";
const YARD_PHOTO_FALLBACK = "/figma-exports/screensh56ot20259.png";


/**
 * Impact, single dramatic before/after frame with a draggable reveal handle.
 * The same yard, two states. Drag to reveal Birdseye's effect.
 *
 * Below: editorial six-row Before/After comparison (the substance).
 */
export function Impact() {
  return (
    <section className="section-dark relative py-24 md:py-section overflow-hidden">
      <Container className="max-w-site">
        {/* Header */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="system-label text-birdseye-electric">THE IMPACT</span>
            <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
              See what{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                changes
              </span>{" "}
              when Birdseye goes live.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3"
          >
            {impact.subtitle}
          </motion.p>
        </div>

        {/* Drag-to-reveal slider */}
        <BeforeAfterSlider />

        {/* Editorial comparison list. The column-header row uses a
            heavier top border + larger, semibold mono caps so the
            BEFORE / AFTER labels read as proper section headers
            instead of getting lost above the rows. Same Plex Mono
            family as `system-label`, just punched: ~14px (vs ~11),
            font-semibold (vs medium), tracking widened slightly. */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 border-t-2 border-birdseye-cream/[0.18]">
          {/* Column headers */}
          <div className="px-4 md:px-8 pt-6 pb-5 border-b border-birdseye-cream/[0.10]">
            <div className="font-mono text-[13px] md:text-[14px] tracking-[0.22em] uppercase font-semibold text-birdseye-cream/65">
              <span aria-hidden className="text-birdseye-cream/40 mr-2">
                ←
              </span>
              Before
            </div>
          </div>
          <div className="px-4 md:px-8 pt-6 pb-5 border-b border-birdseye-cream/[0.10]">
            <div className="font-mono text-[13px] md:text-[14px] tracking-[0.22em] uppercase font-semibold text-birdseye-electric">
              After
              <span aria-hidden className="text-birdseye-electric/80 ml-2">
                →
              </span>
            </div>
          </div>

          {impact.rows.map((row, i) => (
            <RowPair key={row.before} before={row.before} after={row.after} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function RowPair({ before, after, index }: { before: string; after: string; index: number }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: index * 0.04 }}
        className="px-4 md:px-8 py-6 md:py-7 border-b border-birdseye-cream/[0.08] text-body text-birdseye-cream/55"
      >
        <span className="font-mono text-[11px] tracking-[0.08em] text-birdseye-cream/30 mr-3">
          0{index + 1}
        </span>
        {before}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: index * 0.04 }}
        className="px-4 md:px-8 py-6 md:py-7 border-b border-birdseye-cream/[0.08] text-body text-birdseye-cream"
      >
        <span className="font-mono text-[11px] tracking-[0.08em] text-birdseye-electric mr-3">
          0{index + 1}
        </span>
        {after}
      </motion.div>
    </>
  );
}

/**
 * The actual draggable slider. Uses pointer events for cross-device support.
 * BEFORE image sits underneath; AFTER image clips by a CSS variable that
 * tracks pointer position.
 */
function BeforeAfterSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const updateFromClient = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updateFromClient(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromClient]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DUR.smooth, ease: EASE_OUT }}
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        updateFromClient(e.clientX);
      }}
      data-cursor="hover"
      className="relative aspect-[4/3] rounded-card overflow-hidden bg-birdseye-surface border border-birdseye-cream/[0.08] select-none cursor-ew-resize"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label="Drag to reveal Birdseye's effect"
    >
      {/* Placeholder label — the AFTER illustration / overlay vision is
          a working visualization, not the final treatment. Visible at
          the slider container level so it survives whichever side
          (BEFORE or AFTER) is currently revealed. */}
      <PlaceholderLabel
        position="bottom-right"
        note="Final composite coming soon"
      />

      {/* BEFORE, same yard, raw reality. Light desaturation only so it
          still reads as the same place, just "before". */}
      <div className="absolute inset-0">
        <img
          src={YARD_PHOTO}
          alt="Yard, before Birdseye"
          className="absolute inset-0 h-full w-full object-cover saturate-[55%]"
          draggable={false}
        />
        <div className="absolute left-6 top-6 system-label text-birdseye-cream z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="text-birdseye-cream/65">←</span> BEFORE · MANUAL
        </div>
      </div>

      {/* AFTER, full-color photo + Birdseye-vision SVG overlay on top.
          Clipped from the left by the slider position. */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
      >
        <img
          src={YARD_PHOTO}
          alt="Birdseye-managed yard, after"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* The vision overlay, gates, lanes, detection, labels */}
        <YardOverlay />
        <div className="absolute right-6 top-6 system-label text-birdseye-cream flex items-center gap-2 z-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          AFTER · BIRDSEYE <span className="text-birdseye-electric">→</span>
        </div>
      </div>

      {/* Drag handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 flex items-center justify-center"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-px bg-birdseye-cream" />
        <div className="absolute h-12 w-12 rounded-full bg-birdseye-cream border-2 border-birdseye-electric grid place-items-center active:scale-[1.08] transition-transform duration-150 shadow-[0_0_30px_rgba(46,75,255,0.45)]">
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#0F1C2E]" aria-hidden>
            <path
              d="M5 4l-3 4 3 4M11 4l3 4-3 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* System label / instruction */}
      <div className="absolute left-6 bottom-6 system-label text-birdseye-cream/45">
        DRAG TO COMPARE
      </div>
    </motion.div>
  );
}
