"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { versusGuards } from "@/_design/content";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Why operators switch from manned security, the brand's strongest
 * competitive frame. Three pillars (Coverage / Cost / Record) each shown
 * as a paired manned-vs-Birdseye contrast.
 *
 * Light section so it visually anchors as a "consideration moment", the
 * page changes register here from showing-the-product to making-the-case.
 */
export function VersusGuards() {
  return (
    <section className="section-light relative py-24 md:py-section">
      <Container className="max-w-site">
        {/* Header */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="system-label text-birdseye-electric">
              {versusGuards.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.025em] font-bold text-[#0A0A0B]">
              {versusGuards.title.pre}{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                {versusGuards.title.italic}
              </span>{" "}
              {versusGuards.title.post}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-[#0A0A0B]/65 max-w-copy lg:pb-3"
          >
            {versusGuards.subtitle}
          </motion.p>
        </div>

        {/* Three pillars */}
        <div className="space-y-6">
          {versusGuards.pillars.map((pillar, i) => (
            <Pillar key={pillar.label} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Paired proof stats under the pillars. Two-up grid mirrors
            the pillar grid above so the row reads as part of the
            section's rhythm, not a single stat floating in empty
            space. The hairline at the top echoes the pillar dividers,
            the vertical hairline between the stats lands on the same
            grid axis that splits the pillar's manned vs Birdseye
            columns. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 pt-10 border-t border-[#0A0A0B]/[0.10]"
        >
          {versusGuards.proofStats.map((stat, i) => (
            <div
              key={stat.value}
              className={`flex flex-col md:flex-row md:items-end gap-4 md:gap-8 ${
                i === 1 ? "md:pl-10 lg:pl-16 md:border-l md:border-[#0A0A0B]/[0.10]" : "md:pr-10 lg:pr-16"
              }`}
            >
              <div className="text-[clamp(3.5rem,6.5vw,5.5rem)] leading-[0.9] tracking-[-0.04em] font-bold text-[#0A0A0B] tabular-nums shrink-0">
                {stat.value}
              </div>
              <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.35] text-[#0A0A0B]/70 max-w-[360px] md:pb-3">
                <span className="font-serif italic font-normal text-birdseye-electric">
                  {stat.lead}
                </span>{" "}
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function Pillar({
  pillar,
  index,
}: {
  pillar: (typeof versusGuards.pillars)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: index * 0.06 }}
      className="grid md:grid-cols-[140px_1fr_1fr] gap-px bg-[#0A0A0B]/[0.10] rounded-card overflow-hidden"
    >
      {/* Pillar label column */}
      <div className="bg-birdseye-cream p-6 md:p-8 flex md:flex-col justify-between md:justify-end">
        <div className="font-mono text-[12px] tracking-[0.08em] text-birdseye-electric mb-0 md:mb-3">
          0{index + 1}
        </div>
        <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#0A0A0B]">
          {pillar.label}
        </div>
      </div>

      {/* Manned column */}
      <div className="bg-birdseye-cream p-6 md:p-8 relative">
        <div className="system-label text-[#0A0A0B]/40 mb-3">
          MANNED SECURITY
        </div>
        <h3 className="text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-[#0A0A0B]">
          {pillar.mannedTitle}
        </h3>
        <p className="mt-3 text-body text-[#0A0A0B]/60">{pillar.mannedBody}</p>
      </div>

      {/* Birdseye column, slightly different bg + electric-blue accent */}
      <div className="bg-[#F8FAFC] p-6 md:p-8 relative">
        <div className="system-label text-birdseye-electric mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-birdseye-electric" />
          BIRDSEYE
        </div>
        <h3 className="text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-[#0A0A0B]">
          {pillar.birdseyeTitle}
        </h3>
        <p className="mt-3 text-body text-[#0A0A0B]/65">{pillar.birdseyeBody}</p>
      </div>
    </motion.article>
  );
}
