"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { builtForReal } from "@/_design/content";
import { images } from "@/_design/images";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Light editorial spread, cream bg, navy ink. The page breathes here.
 * Asymmetric layout: oversized italic headline left, list of numbered
 * features right with hairline separators. UI snippet rail at the bottom.
 *
 * Inspired by Anthropic, Openai product pages, Vercel marketing.
 */
export function BuiltForReal() {
  return (
    <section className="section-light relative py-24 md:py-section">
      <Container className="max-w-site">
        {/* Header, editorial split */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="system-label text-birdseye-electric">
              {builtForReal.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-[#0A0A0B]">
              Built for{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                real
              </span>{" "}
              operations.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-[#0A0A0B]/60 max-w-copy lg:pb-3"
          >
            {builtForReal.subtitle}
          </motion.p>
        </div>

        {/* Numbered editorial list */}
        <div className="grid lg:grid-cols-2 gap-x-16 lg:gap-x-24">
          {builtForReal.cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.06 }}
              className="group py-8 md:py-10 border-t border-[#0A0A0B]/[0.10] flex gap-6 md:gap-8 first:lg:border-t [&:nth-child(2)]:lg:border-t"
            >
              {/* Number column */}
              <div className="shrink-0 w-14 md:w-16">
                <div className="font-mono text-[12px] tracking-[0.08em] text-birdseye-electric">
                  0{i + 1}
                </div>
              </div>

              {/* Content column */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[clamp(1.25rem,1.75vw,1.5rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-[#0A0A0B]">
                  {card.title}
                </h3>
                <p className="mt-3 text-body text-[#0A0A0B]/65 max-w-copy">
                  {card.body}
                </p>
                <div className="mt-2 system-label text-[#0A0A0B]/40">
                  ↳ {card.snippetTitle}
                </div>
              </div>

              {/* Snippet thumbnail column */}
              <div className="shrink-0 hidden md:block w-44">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#0A0A0B] border border-[#0A0A0B]/[0.08]">
                  {images.builtForReal[card.snippetTitle] ? (
                    <img
                      src={images.builtForReal[card.snippetTitle]}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
