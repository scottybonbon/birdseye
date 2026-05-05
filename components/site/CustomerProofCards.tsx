"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { customerProof } from "@/_design/content";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * CustomerProofCards — five named-customer + metric + year cards.
 *
 * COMP-2: Flock-pattern proof block surfaced by the 2026-05 competitor
 * audit ("Tulsa PD · 100% Homicide Clearance · 2024" template). The
 * Testimonials block downstream carries the human-quote credibility
 * axis; this block carries the metric-with-attribution axis.
 *
 * Sits in the PROOF arc between CargoTheft (the named threat — $35B
 * annual loss) and VersusGuards (the consideration arc), so the cards
 * read as "here are customers already beating the threat — that's why
 * they switched." Same dark register as its neighbors so the page
 * doesn't flicker between sections.
 *
 * Editorial integrity: anonymized cards render the customer line in
 * italic-serif as "we have the number, not the public permission
 * yet"; named cards render in sans bold. The page tells the visitor
 * what's named and what isn't, instead of pretending all the proof
 * is named-grade. Swap-in path is in /_placeholders.md.
 *
 * Reduce-motion: framer-motion's whileInView fades respect OS
 * preference automatically; no autoplay, no infinite loops.
 */
export function CustomerProofCards() {
  return (
    <section
      className="section-dark py-24 md:py-section"
      aria-labelledby="customer-proof-heading"
    >
      <Container className="max-w-site">
        {/* Filing strip top — electric eyebrow + mono filing note.
            Electric (not amber) because this is a brand-positive
            moment; CargoTheft directly above used amber for the
            stakes/warning context. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="flex items-center justify-between gap-6 mb-10 md:mb-14"
        >
          <span className="system-label text-birdseye-electric flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-1 w-1 rounded-full bg-birdseye-electric"
            />
            {customerProof.eyebrow}
          </span>
          <span className="hidden md:inline system-label text-birdseye-cream/35">
            {customerProof.filingNote}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="customer-proof-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream max-w-[760px]"
        >
          {customerProof.title.pre}{" "}
          <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
            {customerProof.title.italic}
          </span>
          {customerProof.title.post}
        </motion.h2>

        {/* Brief intro — the integrity line. Tells the visitor up
            front that some cards are named and some aren't, so the
            anonymized cards downstream read as a deliberate posture,
            not a credibility hole. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
          className="mt-6 md:mt-7 text-body text-birdseye-cream/65 max-w-copy"
        >
          {customerProof.intro}
        </motion.p>

        {/* 5-card grid. 3-col on md+, falls into a natural 3+2 with
            an empty third column on row 2 — the negative space pulls
            the eye to the last card and reads as deliberate, not
            broken. Cards stagger their entrance on viewport intersect. */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {customerProof.cards.map((card, i) => (
            <CustomerProofCard key={card.customer} {...card} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CustomerProofCard({
  customer,
  anonymized,
  metric,
  year,
  index,
}: {
  customer: string;
  anonymized: boolean;
  metric: { value: string; label: string };
  year: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: DUR.smooth,
        ease: EASE_OUT,
        // Slight stagger so the row of three reads as a sequence
        // rather than five identical fades firing at once.
        delay: index * 0.06,
      }}
      className="group rounded-2xl border border-birdseye-cream/10 bg-birdseye-cream/[0.02] p-7 md:p-8 hover:border-birdseye-cream/25 hover:bg-birdseye-cream/[0.04] transition-colors"
    >
      {/* Customer line. Sans bold for named, italic-serif dim for
          anonymized — the typography itself signals the
          permission-status to the reader. */}
      <p
        className={
          anonymized
            ? "font-serif italic text-birdseye-cream/65 text-[15px] leading-[1.4]"
            : "font-bold text-birdseye-cream text-[15px] leading-[1.3]"
        }
      >
        {customer}
      </p>

      {/* Big metric value — Inter Black, electric, tabular-nums so
          the digits sit on a uniform numeric grid. Same treatment as
          CargoTheft's $35B stat so the page reads as one type system. */}
      <p className="mt-7 md:mt-9 text-[clamp(3rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.035em] font-black text-birdseye-electric tabular-nums">
        {metric.value}
      </p>
      <p className="mt-3 text-[14px] leading-[1.45] text-birdseye-cream/70 max-w-[240px]">
        {metric.label}
      </p>

      {/* Year footer — subtle hairline rule then mono caps year so
          the card reads as a filed record (a la "ARCHIVE · 2024"
          register elsewhere on the site). */}
      <div className="mt-7 md:mt-8 pt-5 border-t border-birdseye-cream/10">
        <p className="system-label text-birdseye-cream/40">{year}</p>
      </div>
    </motion.article>
  );
}
