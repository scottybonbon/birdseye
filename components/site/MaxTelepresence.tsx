"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { maxTelepresence } from "@/_design/content";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";

/**
 * Maximum Telepresence Approach™, the brand's crown concept.
 *
 * Three synchronized panes of a single event playing out across the
 * system: AI detects → agent verifies → record seals. Each pane is a
 * real-footage video loop with a forensic timestamp + live status line.
 * Editorial caption underneath. Reads as ONE event running through the
 * platform, not three separate features.
 *
 * Was: a vertical zigzag of three full-screen panels with figma-export
 * placeholder posters. Big footprint, low payoff, read as three
 * features in a row, not a system.
 *
 * Is: a horizontal triptych that fits in one viewport, plays three
 * distinct real-footage loops at the same time, and uses tight mono
 * captions to make the system feel operational. The sequential reveal
 * (left-to-right, 120ms stagger) is the only "system" gesture, no
 * connecting hairlines, no scan beams, no decoration.
 *
 * Restraint:
 *  - Videos respect prefers-reduced-motion (poster shown, no autoplay)
 *  - preload="metadata" so we don't pull full clips on initial paint
 *  - Each pane is `data-cursor-caption`-tagged so the surveillance HUD
 *    cursor reads "DETECT · 03:14:22" etc on hover, reinforcing that
 *    the system labels its own footage
 *  - One italic-serif accent word in the headline; everything else is
 *    body type. The set-piece is the video, not the type.
 */
export function MaxTelepresence() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="how"
      className="section-dark relative py-24 md:py-section overflow-hidden scroll-mt-24"
    >
      {/* Faint mesh, same architectural backdrop as the rest of the
          dark sections. Lower opacity so the triptych reads as the figure
          and the bg as ground. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-grid opacity-40" />

      <Container className="max-w-site">
        {/* Section header, single editorial spread, deliberately tighter
            than a feature header so the triptych below is the moment. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-14 md:mb-20"
        >
          <div>
            <span className="system-label text-birdseye-electric">
              {maxTelepresence.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.025em] font-bold text-birdseye-cream text-balance">
              How the system{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                actually
              </span>{" "}
              works.
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/60 max-w-copy lg:pb-3">
            {maxTelepresence.subtitle}
          </p>
        </motion.div>

        {/* The triptych, three synchronized loops telling one event.
            Hairline connectors bridge the gaps between panes (md+ only)
            so the three columns read as one event flow rather than
            three independent features. */}
        <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-3">
          {maxTelepresence.steps.map((step, i) => (
            <Pane
              key={step.slug}
              step={step}
              index={i}
              isLast={i === maxTelepresence.steps.length - 1}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Hub → destination link. The triptych is the surface story;
            /maximum-telepresence is where the methodology lives in
            depth. Visitors who want the full method follow this. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.4 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <Link
            href="/maximum-telepresence"
            className="group inline-flex items-center gap-3 text-[14px] md:text-[15px] text-birdseye-cream hover:text-birdseye-electric transition-colors focus-visible:outline-none focus-visible:underline"
          >
            <span className="border-b border-birdseye-cream/35 group-hover:border-birdseye-electric transition-colors pb-0.5">
              Read the full method
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function Pane({
  step,
  index,
  isLast,
  reduceMotion,
}: {
  step: typeof maxTelepresence.steps[number];
  index: number;
  isLast: boolean;
  reduceMotion: boolean;
}) {
  const cursorCaption = `${step.label} · ${step.timestamp}`;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: DUR.smooth,
        ease: EASE_OUT,
        // Left-to-right system sweep, the stagger pairs with the hairline
        // connector below to make the three panes read as one event flow.
        delay: reduceMotion ? 0 : index * 0.12,
      }}
      className="flex flex-col"
    >
      {/* Wrapper so the connector can break out of the video pane's
          overflow-hidden into the grid gap without being clipped. */}
      <div className="relative">
        {/* Video pane, real product loop with corner mono captions.
            DETECT pane (index 0) carries data-cursor="scan" so the
            cursor reads as active perception when hovering the
            detection layer — VERIFY and DOCUMENT remain on the
            standard cursor (different vocabulary: human action,
            archival record). Subtle, single placement. */}
        <div
          className="relative aspect-[4/5] rounded-card overflow-hidden border border-birdseye-cream/[0.10] bg-birdseye-surface"
          data-cursor-caption={cursorCaption}
          {...(step.slug === "detect" ? { "data-cursor": "scan" } : {})}
        >
        {/* Video layer. Under prefers-reduced-motion we drop autoplay so
            the loop doesn't run; the poster underneath stays visible. */}
        <video
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster={step.poster}
          aria-label={`${step.label} loop`}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={step.video} type="video/mp4" />
        </video>

        {/* Always-visible poster underneath, survives video errors and
            the preload window before the video kicks in. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={step.poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />

        {/* Corner gradient masks, top + bottom, just enough to keep
            the mono captions legible against any frame of footage. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 via-black/25 to-transparent"
        />

        {/* Top corners, step label left, "01 / 03" filing right. */}
        <div className="absolute left-4 top-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/85">
          <span>{step.label}</span>
          <span className="text-birdseye-cream/50">{step.n} / 03</span>
        </div>

        {/* Bottom corners, live status (success dot + label) left,
            timestamp right. Reads as a forensic record, not a marketing
            tag. */}
        <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/85">
          <span className="flex items-center gap-2">
            <span className="relative grid place-items-center h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-birdseye-success" />
              {!reduceMotion && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-birdseye-success animate-ping opacity-60"
                />
              )}
            </span>
            <span className="text-birdseye-success">{step.status}</span>
          </span>
          <span className="tabular-nums">{step.timestamp}</span>
        </div>
      </div>

      {/* Hairline connector, bridges this pane to the next, breaking
          out of the video pane's overflow-hidden into the grid gap.
          A short cream→electric→cream gradient line with a small
          dot at each terminus, so the panes read as one continuous
          event flow. md+ only, on phones the panes stack and the
          gestural sweep would only collide with the layout. */}
        {!isLast && (
          <div
            aria-hidden
            className="pointer-events-none hidden md:block absolute top-1/2 left-full -translate-y-1/2 w-4 md:w-5 h-px"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-birdseye-cream/15 via-birdseye-electric/45 to-birdseye-cream/15" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-birdseye-cream/45" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-birdseye-cream/45" />
          </div>
        )}
      </div>

      {/* Body copy under the pane, short, single sentence per pane. */}
      <figcaption className="mt-5 max-w-[420px]">
        <h3 className="text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.25] tracking-[-0.012em] font-semibold text-birdseye-cream">
          {step.title}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-[1.55] text-birdseye-cream/55">
          {step.body}
        </p>
      </figcaption>
    </motion.figure>
  );
}
