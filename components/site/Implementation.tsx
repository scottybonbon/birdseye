"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { implementation } from "@/_design/content";
import {
  DUR,
  EASE_OUT,
  useIsTouchDevice,
  usePrefersReducedMotion,
} from "@/_design/motion";


/**
 * Implementation timeline, DARK section. The big "14" lands as a billboard
 * against pure black, italic "days" in electric blue serif. Five-step
 * timeline with hairline spine + electric-blue node dots.
 *
 * Placed near the conversion arc so it answers "how fast can I deploy?"
 * right before the user is asked to act.
 */
export function Implementation() {
  // Cursor-following preview state.
  //   activeIdx    , which step image to show (null = nothing hovered)
  //   visible      , whether the floating preview is mounted
  //   enabled      , desktop pointer + reduced-motion gate (via the
  //                   shared hooks in _design/motion.ts)
  // Cursor coordinates flow through motion values + springs so the
  // image trails the pointer with a soft lag, like a portfolio site.
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const isTouch = useIsTouchDevice();
  const reduceMotion = usePrefersReducedMotion();
  const enabled = !isTouch && !reduceMotion;

  // Track timeline section visibility for smart preload
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { margin: "-300px" });

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  // Stiffness/damping tuned so the image has a perceptible trail
  // without feeling laggy. Lower mass than the cursor dot so a heavier
  // element still moves promptly.
  const sx = useSpring(x, { stiffness: 380, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 38, mass: 0.6 });

  // Single mousemove handler attached to the timeline wrapper. Updating
  // motion values here is cheaper than React state for every pixel.
  const handleMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  // On first enter, JUMP the spring to the current cursor so the card
  // doesn't fly in from a stale position. We set both the source motion
  // values AND the spring outputs to skip the inbound animation.
  const handleEnter = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
    sx.set(e.clientX);
    sy.set(e.clientY);
    setVisible(true);
  };

  return (
    <section className="section-dark relative py-24 md:py-section xl:py-40 overflow-hidden">
      {/* Preload step images when timeline enters viewport (~300px before).
          This ensures images are ready for instant swap on hover without
          premature loading at page load. */}
      {enabled && timelineInView && (
        <div aria-hidden className="hidden">
          {implementation.steps.map((step) => (
            <Image
              key={step.day}
              src={step.image}
              alt=""
              width={320}
              height={400}
              priority={false}
              loading="eager"
            />
          ))}
        </div>
      )}
      <Container className="max-w-site">
        {/* Header + oversized billboard */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="system-label text-birdseye-electric">
              {implementation.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.025em] font-bold text-birdseye-cream">
              {implementation.title.pre}{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                {implementation.title.italic}
              </span>
              {implementation.title.post}
            </h2>
            <p className="mt-6 text-body text-birdseye-cream/60 max-w-copy">
              {implementation.subtitle}
            </p>
          </motion.div>

          {/* Billboard "14", pure black panel with cream number, electric italic days */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[5/6] rounded-[1.5rem] bg-birdseye-surface border border-birdseye-cream/[0.10] overflow-hidden flex flex-col justify-between p-8 md:p-10">
              {/* Top corner mono */}
              <div className="flex items-start justify-between">
                <div className="system-label text-birdseye-cream/45">AVERAGE</div>
                <div className="system-label text-birdseye-electric">T+0 → T+14</div>
              </div>

              {/* Big number, cream number + electric italic serif unit */}
              <div className="flex items-baseline gap-4">
                <span className="text-[clamp(7rem,18vw,16rem)] leading-[0.85] tracking-[-0.05em] font-bold text-birdseye-cream">
                  {implementation.metric.value}
                </span>
                <span className="text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1] font-serif italic text-birdseye-electric">
                  {implementation.metric.unit}
                </span>
              </div>

              {/* Caption */}
              <div className="text-[14px] leading-[1.5] text-birdseye-cream/55 max-w-[320px]">
                {implementation.metric.caption}
              </div>

              {/* Background mesh */}
              <div className="absolute inset-0 -z-10 bg-mesh-grid opacity-50" />
              {/* Soft brand glow at top */}
              <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-birdseye-electric/[0.20] blur-3xl" />
            </div>
          </motion.div>
        </div>

        {/* Vertical timeline. On desktop the wrapper tracks pointer
            movement so the floating preview image (rendered below) can
            follow the cursor and swap as it enters each step row.
            Ref attached for visibility-based preload. */}
        <div
          ref={timelineRef}
          className="relative mt-12 md:mt-16"
          onMouseMove={enabled ? handleMove : undefined}
          onMouseEnter={enabled ? handleEnter : undefined}
          onMouseLeave={
            enabled
              ? () => {
                  setVisible(false);
                  setActiveIdx(null);
                }
              : undefined
          }
        >
          {/* Spine line */}
          <div className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px bg-birdseye-cream/[0.12] hidden sm:block" />

          {implementation.steps.map((step, i) => {
            const isActive = activeIdx === i;
            return (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.06 }}
                onMouseEnter={enabled ? () => setActiveIdx(i) : undefined}
                onFocus={() => setActiveIdx(i)}
                className="relative grid sm:[grid-template-columns:120px_1fr] md:[grid-template-columns:160px_1fr] gap-6 md:gap-8 py-8 md:py-10 border-t border-birdseye-cream/[0.10] first:border-t-0 cursor-default"
              >
                {/* Day label + node */}
                <div className="relative flex items-center sm:items-start gap-3 sm:gap-0 sm:flex-col sm:pt-1">
                  <div
                    className={
                      "font-mono text-[12px] tracking-[0.10em] transition-colors " +
                      (isActive ? "text-birdseye-electric" : "text-birdseye-electric/65")
                    }
                  >
                    {step.day}
                  </div>
                  {/* Node dot on the spine line, fills + glows when active */}
                  <span className="absolute left-[60px] md:left-[80px] top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border-2 border-birdseye-cream/30 hidden sm:block">
                    <span
                      className={
                        "absolute inset-0.5 rounded-full bg-birdseye-electric transition-all " +
                        (isActive
                          ? "scale-110 shadow-[0_0_18px_rgba(46,75,255,0.85)]"
                          : "opacity-70")
                      }
                    />
                  </span>
                </div>

                {/* Title + body */}
                <div className="sm:pl-6 md:pl-12">
                  <h3 className="text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.15] tracking-[-0.012em] font-semibold text-birdseye-cream">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-body text-birdseye-cream/60 max-w-copy">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* ─── Cursor-following preview ───
          Fixed-positioned, centered on the cursor via -translate-50%.
          Architecture (important for seamless swaps):
            • OUTER card stays mounted the whole time the pointer is in
              the timeline area. It only fades/scales on enter/leave.
            • INNER image + caption layers cross-fade between step
              indices via AnimatePresence keyed on activeIdx, opacity
              only, no scale, so the new image fades in at the exact
              same screen position the previous one was at, with no
              "snap back to center" pop.
            • Spring-smoothed motion values on the outer wrapper give
              the soft trailing lag.  */}
      {enabled && (
        <motion.div
          aria-hidden
          style={{ translateX: sx, translateY: sy }}
          className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <AnimatePresence>
              {visible && activeIdx !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: DUR.base, ease: EASE_OUT }}
                  className="relative w-[320px] aspect-[4/5] rounded-[1rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-birdseye-cream/15"
                >
                  {/* Image, swaps INSTANTLY when activeIdx changes.
                      No cross-fade; the next/image src just flips. */}
                  <Image
                    src={implementation.steps[activeIdx].image}
                    alt={`${implementation.steps[activeIdx].day}, ${implementation.steps[activeIdx].title}`}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />

                  {/* Bottom gradient, static */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Caption, text swaps instantly with the image */}
                  <div className="absolute inset-x-0 bottom-0 p-4" aria-live="polite" aria-atomic="true">
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/85">
                      {implementation.steps[activeIdx].day}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-birdseye-cream leading-tight">
                      {implementation.steps[activeIdx].title}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </section>
  );
}
