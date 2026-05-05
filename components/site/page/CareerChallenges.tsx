"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * CareerChallenges — "Why build at Birdseye" five-point editorial set.
 *
 * 2026-05-04 redesign (Scotty call): the previous version was a 5-card
 * grid with tinted electric icon tiles in rounded boxes. It read as a
 * generic SaaS template — the rest of the site uses an editorial,
 * hairline-divided register and this section was the odd one out. The
 * new layout matches the home page's differentiator grid (the "Six
 * lines that don't appear" component): numbered indices, clean titles,
 * tight bodies, hairline dividers, no card chrome.
 *
 * Layout:
 *  - md+: 3-column grid, 5 entries fill 2 rows (3 + 2). Hairline
 *    dividers between entries on both axes.
 *  - sm: single column with horizontal hairlines between entries.
 *
 * Restraint:
 *  - Numbered eyebrow (01–05) carries the only visual ornament.
 *  - No icon tiles, no rounded card backgrounds, no shadow.
 *  - Type scale matches the differentiator grid for sitewide
 *    consistency.
 */
export function CareerChallenges() {
  const entries = [
    {
      title: "Cutting-edge challenges",
      body:
        "Real-world AI problems at scale. Computer vision against trucks, gates, and weather. The kind of work where the model has to be right because someone's trailer doesn't open if it isn't.",
    },
    {
      title: "Work that's seen",
      body:
        "A tight-knit team where what you ship lands in production at thousands of facilities, not in a backlog of someone else's roadmap.",
    },
    {
      title: "Benefits + competitive pay",
      body:
        "Strong benefits, equity for early hires, and a comp band that reflects what your work moves on a customer's P&L.",
    },
    {
      title: "Diverse, by intent",
      body:
        "Hiring across four cities and three continents brings perspectives and operating contexts most companies never get. We protect that.",
    },
    {
      title: "Remote-first, async by default",
      body:
        "Mississauga, Dallas, Belgrade, Bogotá. Trust over surveillance. Output over hours. The work happens where it works.",
    },
  ];

  return (
    <section className="section-dark relative py-24 md:py-section">
      <Container className="max-w-site">
        {/* Section header — same two-column "headline + lede" pattern
            used across the home page. Replaces the previous centered
            block so the careers page reads as part of the same
            editorial system. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-16"
        >
          <div>
            <span className="system-label text-birdseye-electric">
              WHY BUILD HERE
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
              The challenge you&apos;ve been{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                looking
              </span>{" "}
              for.
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3">
            We&apos;re building the operating system for North American yards.
            Yard automation is a $30B problem most companies still try to
            solve with guards and clipboards. The work is real, the customers
            are named, and the scope is global.
          </p>
        </motion.div>

        {/* Hairline-divided 5-up grid. md+ goes 3 columns × 2 rows
            (entries 01–03 on top row, 04–05 on bottom). The empty
            sixth cell is intentionally blank — visual breathing room
            and a deliberate "this list doesn't run forever" cue. */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-birdseye-cream/[0.10]">
          {entries.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: DUR.smooth,
                ease: EASE_OUT,
                delay: Math.min(i, 5) * 0.05,
              }}
              className="px-5 md:px-7 py-8 md:py-10 border-b border-birdseye-cream/[0.10] [&:not(:last-child)]:md:border-r md:border-r-birdseye-cream/[0.10]"
            >
              <div className="font-mono text-[10.5px] tracking-[0.18em] text-birdseye-electric mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-birdseye-cream">
                {e.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-birdseye-cream/60">
                {e.body}
              </p>
            </motion.article>
          ))}
          {/* Sixth cell — visually-quiet "deliberate blank" so the
              5-entry grid doesn't read as 5/6 incomplete. Empty
              hairline-divided cell keeps the rhythm without filling
              it with copy. md+ only; sm view stacks naturally. */}
          <div
            aria-hidden
            className="hidden md:block px-5 md:px-7 py-8 md:py-10 border-b border-birdseye-cream/[0.10]"
          />
        </div>
      </Container>
    </section>
  );
}
