"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EASE_OUT } from "@/_design/motion";
import { testimonials } from "@/_design/content";

const ROTATE_MS = 7000;

/**
 * Editorial pull-quote rotator. One large quote at a time, cross-faded
 * between named, attributed customer voices.
 *
 * Source of truth is `testimonials.cards` in `_design/content.ts` 
 * previously this component held a hard-coded array that drifted from
 * the canonical data and dropped real customer names. Now consumes the
 * shared block so attribution, metrics, and provenance stay in one
 * place across the home page, /results, and any future placement.
 *
 * We surface the top three cards in the rotator (a fourth+ would slow
 * the cycle past readable cadence). Order is curated in content.ts so
 * the strongest voice (Norm Sneyd at Bison) opens.
 */
const QUOTES = testimonials.cards.slice(0, 3);

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((s) => (s + 1) % QUOTES.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, []);

  const q = QUOTES[active];

  return (
    <section className="bg-birdseye-cream text-[#0A0A0F] relative py-24 md:py-section">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[180px_1fr] gap-10 lg:gap-16 items-start">
          {/* Left rail, meta */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`meta-${active}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="lg:pt-2"
            >
              <div className="font-mono text-[12px] tracking-[0.18em] text-birdseye-electric uppercase">
                Customer · {q.customerIndex}
              </div>
              <div className="font-mono text-[12px] tracking-[0.18em] text-[#0A0A0F]/45 uppercase mt-2">
                {q.company} · {q.year}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quote */}
          <div className="relative min-h-[280px] md:min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <blockquote className="text-[clamp(1.875rem,3.6vw,3.25rem)] leading-[1.18] tracking-[-0.018em] font-bold text-balance">
                  <span className="font-serif italic font-normal text-birdseye-electric">
                    “{q.quote.split(",")[0]}
                  </span>
                  <span>
                    ,{q.quote.split(",").slice(1).join(",")}”
                  </span>
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#0A0A0F]/[0.08] flex items-center justify-center font-mono text-[11px] tracking-[0.16em] text-[#0A0A0F]/55">
                      {q.name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-[#0A0A0F]">
                        {q.name}
                      </div>
                      <div className="text-[13px] text-[#0A0A0F]/55">
                        {q.role} · {q.company}
                      </div>
                    </div>
                  </div>

                  {/* Metric chip, the operational outcome lifted from the
                      quote, surfaced as its own credibility token. Mono
                      pill in the brand electric so the reader picks up
                      the proof point at a glance even if they skim past
                      the quote body. */}
                  {q.metric && (
                    <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-birdseye-electric/30 bg-birdseye-electric/[0.08] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-birdseye-electric">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-birdseye-electric"
                      />
                      {q.metric}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls, dash indicators with click-to-jump + arrows */}
        <div className="mt-16 flex items-center justify-between gap-6 max-w-[700px] mx-auto lg:mx-0 lg:ml-[244px]">
          <div className="flex items-center gap-2">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`group relative h-[3px] transition-all duration-500 ${
                  i === active ? "w-16 bg-birdseye-electric" : "w-8 bg-[#0A0A0F]/15 hover:bg-[#0A0A0F]/30"
                }`}
              >
                {/* Progress fill on the active dash */}
                {i === active && (
                  <motion.span
                    key={`fill-${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                    className="absolute inset-0 bg-birdseye-electric origin-left opacity-60"
                  />
                )}
              </button>
            ))}
            <span className="ml-4 font-mono text-[11px] tracking-[0.18em] text-[#0A0A0F]/45 uppercase">
              {String(active + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActive((s) => (s - 1 + QUOTES.length) % QUOTES.length)
              }
              aria-label="Previous"
              className="h-10 w-10 rounded-full border border-[#0A0A0F]/15 hover:border-[#0A0A0F]/45 transition-colors flex items-center justify-center text-[#0A0A0F]/65 hover:text-[#0A0A0F]"
            >
              ←
            </button>
            <button
              onClick={() => setActive((s) => (s + 1) % QUOTES.length)}
              aria-label="Next"
              className="h-10 w-10 rounded-full border border-[#0A0A0F]/15 hover:border-[#0A0A0F]/45 transition-colors flex items-center justify-center text-[#0A0A0F]/65 hover:text-[#0A0A0F]"
            >
              →
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
