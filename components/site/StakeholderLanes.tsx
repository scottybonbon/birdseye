"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { stakeholderLanes } from "@/_design/content";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";

/**
 * StakeholderLanes, three-tab persona section.
 *
 * The same Birdseye platform, told three ways for the three buyers it
 * has to convince: Yard Manager (operations, throughput), Security
 * Director (perimeter, intervention), Compliance Officer (record, audit,
 * claims defense). The tab vocabulary is the v2 competitor audit's
 * #1 stealable move from Flock + LVT, it converts a generic platform
 * pitch into role-specific evidence the buyer recognizes as their own.
 *
 * Editorial discipline:
 *   • IBM Plex Mono for the role labels + kicker; Inter for headline +
 *     body. Italic-serif accent on a single word per headline (matches
 *     site-wide pattern).
 *   • One quantified outcome chip per lane, electric pill, mono caps 
 *     the only colored element apart from the active-tab indicator.
 *   • Lane content cross-fades between tabs (no slide / scale / blur);
 *     tab indicator slides under the active label as a hairline + dot.
 *   • Reduce-motion: no cross-fade, no indicator slide, values change
 *     in place.
 *   • Keyboard nav: arrow left/right cycles tabs, Home/End jump to
 *     first/last. role="tablist" + tabpanel semantics for screen
 *     readers.
 */
export function StakeholderLanes() {
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const lanes = stakeholderLanes.lanes;
  const lane = lanes[active];

  // Keyboard nav inside the tab strip, captured at the tablist level
  // so any focused tab participates.
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (active + 1) % lanes.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (active - 1 + lanes.length) % lanes.length;
      setActive(prev);
      tabRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = lanes.length - 1;
      setActive(last);
      tabRefs.current[last]?.focus();
    }
  };

  return (
    <section
      id="for-your-role"
      className="section-dark relative py-24 md:py-section overflow-hidden scroll-mt-24"
    >
      {/* Quiet architectural backdrop, same vocabulary as MaxTelepresence
          so the two sections feel like part of one editorial voice. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-grid opacity-30" />

      <Container className="max-w-site">
        {/* Section header, same shape as MaxTelepresence (eyebrow on
            the left, two-column header). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-16"
        >
          <div>
            <span className="system-label text-birdseye-electric">
              {stakeholderLanes.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.025em] font-bold text-birdseye-cream text-balance whitespace-pre-line">
              {stakeholderLanes.title}
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/60 max-w-copy lg:pb-3">
            {stakeholderLanes.subtitle}
          </p>
        </motion.div>

        {/* Tab strip, full-width row, mono caps. Active tab carries an
            electric hairline + dot. On md+ the three tabs sit on one
            row; on phones they wrap and the indicator collapses to an
            inline accent. */}
        <div
          role="tablist"
          aria-label="Choose your role"
          onKeyDown={onTabKey}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-birdseye-cream/[0.08] rounded-card overflow-hidden border border-birdseye-cream/[0.10]"
        >
          {lanes.map((l, i) => {
            const isActive = i === active;
            return (
              <button
                key={l.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`lane-tab-${l.key}`}
                aria-selected={isActive}
                aria-controls={`lane-panel-${l.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={[
                  "group relative text-left px-6 md:px-8 py-6 md:py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-inset",
                  isActive
                    ? "bg-birdseye-surface"
                    : "bg-birdseye-surface/40 hover:bg-birdseye-surface/70",
                ].join(" ")}
              >
                <div
                  className={[
                    "font-mono text-[10px] tracking-[0.22em] uppercase mb-2",
                    isActive
                      ? "text-birdseye-electric"
                      : "text-birdseye-cream/35 group-hover:text-birdseye-cream/55",
                  ].join(" ")}
                >
                  {l.kicker}
                </div>
                <div
                  className={[
                    "text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.2] tracking-[-0.01em] font-semibold",
                    isActive
                      ? "text-birdseye-cream"
                      : "text-birdseye-cream/65 group-hover:text-birdseye-cream/90",
                  ].join(" ")}
                >
                  {l.role}
                </div>

                {/* Active indicator, hairline + electric dot drop down
                    from the bottom edge of the active tab. Hidden under
                    reduce-motion so nothing slides. */}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-6 right-6 md:left-8 md:right-8 -bottom-px h-px bg-gradient-to-r from-transparent via-birdseye-electric/60 to-transparent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Lane body, cross-fade between tabs. The figcaption-style
            layout (headline + body left, bullets + chip right) reads
            like a briefing card, not a feature list. */}
        <div className="mt-10 md:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={lane.key}
              role="tabpanel"
              id={`lane-panel-${lane.key}`}
              aria-labelledby={`lane-tab-${lane.key}`}
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
              }
              transition={{
                duration: reduceMotion ? DUR.base : DUR.smooth,
                ease: EASE_OUT,
              }}
              className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 rounded-card border border-birdseye-cream/[0.08] bg-birdseye-surface/40 p-8 md:p-12"
            >
              {/* Left, headline + body */}
              <div>
                <h3 className="text-[clamp(1.75rem,3.5vw,2.875rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream text-balance">
                  {lane.headline}{" "}
                  <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.012em]">
                    {lane.headlineItalic}
                  </span>{" "}
                  {lane.headlineTail}
                </h3>
                <p className="mt-6 text-body text-birdseye-cream/65 max-w-[520px]">
                  {lane.body}
                </p>

                {/* Quantified outcome chip, same vocabulary as the
                    Testimonials metric chips (electric pill, mono caps). */}
                <div className="mt-7">
                  <span className="inline-flex items-center gap-2 rounded-full border border-birdseye-electric/30 bg-birdseye-electric/[0.08] px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-electric">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-birdseye-electric"
                    />
                    {lane.metric}
                  </span>
                </div>
              </div>

              {/* Right, bullets. Hairline rule between each row, mono
                  numerator on the left, body text on the right. Reads
                  as a briefing checklist, not a marketing list. */}
              <ul className="lg:pt-2 divide-y divide-birdseye-cream/[0.08]">
                {lane.bullets.map((b, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-[28px_1fr] gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="font-mono text-[11px] tracking-[0.16em] text-birdseye-electric/80 pt-[3px]"
                    >
                      0{idx + 1}
                    </span>
                    <span className="text-[15.5px] leading-[1.55] text-birdseye-cream/80">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
