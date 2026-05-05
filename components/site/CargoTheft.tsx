"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cargoTheft } from "@/_design/content";
import { IconArrowRight } from "@/components/icons/SystemIcons";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * CargoTheft — narrative band that bridges the PROOF and CONSIDERATION
 * zones on the home page.
 *
 * Why it exists:
 *   • Cargo theft is the strongest news-cycle story Birdseye owns —
 *     Mike speaks to it publicly. The site needs to carry that story
 *     in the architecture, not just rely on his keynote circuit.
 *   • Reframes the platform comparison from "which approach is
 *     better" into "here's what's actually at stake," so the
 *     VersusGuards section that follows lands as the answer to a
 *     real, named threat instead of a generic preference debate.
 *
 * Editorial register:
 *   • DARK section — the stakes color. Sits between Impact (dark)
 *     and VersusGuards (light) so the band continues the dark
 *     gravitas before the page transitions to consideration mode.
 *   • Two-up grid: stat-block on the left (big tabular number +
 *     mono caption), headline + body + CTA on the right.
 *   • Filing strip top with amber eyebrow ("CARGO THEFT · 2024") +
 *     mono source attribution ("SOURCE · CARGONET · 2024 ANNUAL
 *     REPORT") so the number reads as cited proof, not marketing
 *     bombast.
 *   • Italic-serif accent on "front door" makes the brand-frame
 *     ("verified entry") visceral.
 *
 * Reduce-motion: cascade through the global motion system (no local
 * autoplay, no infinite loops). Reveal-on-scroll fades respect OS
 * preference automatically via framer-motion's defaults.
 */
export function CargoTheft() {
  return (
    <section
      className="section-dark relative py-24 md:py-section"
      aria-labelledby="cargo-theft-heading"
    >
      <Container className="max-w-site">
        {/* Top filing strip — amber eyebrow + source attribution.
            Amber because cargo theft is a stakes/warning context;
            using brand-electric here would over-claim the moment as
            a Birdseye-positive. The source line on the right reads as
            a footnote, the way a reputable industry report would. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="flex items-center justify-between gap-6 mb-10 md:mb-14"
        >
          <span className="system-label text-amber-400 flex items-center gap-2.5">
            <span aria-hidden className="h-1 w-1 rounded-full bg-amber-400" />
            {cargoTheft.filingEyebrow}
          </span>
          <span className="hidden md:inline system-label text-birdseye-cream/35">
            {cargoTheft.filingSource}
          </span>
        </motion.div>

        {/* Two-up grid: stat-block left, narrative right. The stat
            column is intentionally narrower than the narrative
            column so the body copy gets the breathing room it
            needs — the number is the punch, the words are the
            argument. */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-end">
          {/* LEFT — stat block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <div className="text-[clamp(4.5rem,9vw,8rem)] leading-[0.88] tracking-[-0.04em] font-bold text-birdseye-cream tabular-nums">
              {cargoTheft.stat.value}
            </div>
            <p className="mt-5 system-label text-birdseye-cream/55">
              {cargoTheft.stat.label}
            </p>
          </motion.div>

          {/* RIGHT — headline + body + CTA */}
          <div>
            <motion.h2
              id="cargo-theft-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT }}
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream"
            >
              {cargoTheft.title.pre}{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                {cargoTheft.title.italic}
              </span>{" "}
              {cargoTheft.title.post}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
              className="mt-6 md:mt-8 text-body text-birdseye-cream/70 max-w-copy"
            >
              {cargoTheft.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.2 }}
              className="mt-7"
            >
              <Link
                href={cargoTheft.cta.href}
                className="group inline-flex items-center gap-3 text-[14px] md:text-[15px] text-birdseye-cream hover:text-birdseye-electric transition-colors focus-visible:outline-none focus-visible:underline"
              >
                <span className="border-b border-birdseye-cream/35 group-hover:border-birdseye-electric transition-colors pb-0.5">
                  {cargoTheft.cta.label}
                </span>
                <IconArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
