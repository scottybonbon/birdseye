"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { supplyChain } from "@/_design/content";
import { images } from "@/_design/images";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Light editorial section, feature card (first industry) + four secondary
 * cards in a refined grid. Mixed scale gives the section visual rhythm
 * instead of five-up-uniform-grid feel.
 */
export function SupplyChain() {
  const [feature, ...rest] = supplyChain.industries;

  return (
    <section id="solutions" className="section-light relative py-24 md:py-section">
      <Container className="max-w-site">
        {/* Header */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="system-label text-birdseye-electric">
              {supplyChain.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-[#0A0A0B]">
              Built for the{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                entire
              </span>{" "}
              supply chain.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-[#0A0A0B]/60 max-w-copy lg:pb-3"
          >
            {supplyChain.subtitle}
          </motion.p>
        </div>

        {/* Feature card, full-width hero industry */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="group rounded-[1.5rem] overflow-hidden bg-[#0A0A0B] grid lg:grid-cols-[1fr_1fr] mb-4"
        >
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
            <img
              src={images.supplyChain[0]}
              alt={feature.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="font-mono text-[12px] tracking-[0.08em] text-birdseye-electric mb-4">
              01 · INDUSTRY 01
            </div>
            <h3 className="text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.1] tracking-[-0.015em] font-semibold text-birdseye-cream">
              {feature.title}
            </h3>
            <p className="mt-4 text-body text-birdseye-cream/65 max-w-copy">
              {feature.body}
            </p>
            <div className="mt-8 system-label text-birdseye-cream/45 inline-flex items-center gap-2">
              EXPLORE INDUSTRY
              <span>→</span>
            </div>
          </div>
        </motion.article>

        {/* Secondary cards, 2×2 grid, lighter treatment */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((ind, i) => (
            <motion.article
              key={ind.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.05 }}
              className="group rounded-card overflow-hidden bg-[#F8FAFC] border border-[#0A0A0B]/[0.06] flex flex-col hover:shadow-[0_24px_60px_rgba(15,28,46,0.08)] transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-[#0A0A0B] overflow-hidden">
                <img
                  src={images.supplyChain[i + 1]}
                  alt={ind.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-mono text-[11px] tracking-[0.08em] text-birdseye-electric/80 mb-2">
                  0{i + 2}
                </div>
                <h3 className="text-[15px] leading-[20px] text-[#0A0A0B] font-semibold">
                  {ind.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[19px] text-[#0A0A0B]/65">
                  {ind.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
