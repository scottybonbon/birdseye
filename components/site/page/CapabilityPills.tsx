"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * CapabilityPills, a discrete row of small "pill" tags listing the
 * capabilities of a module. Built for the GateCore page (per Figma) but
 * intentionally generic so SafeCore / YardCore / any platform page can
 * use it with their own pill list.
 *
 * Visual: dark surface, optional eyebrow + headline + subhead, then a
 * wrapping flex of capability pills. Each pill is dark with a thin
 * cream border, a tiny "+" prefix, and the capability label.
 *
 * Reveal: pills stagger in on scroll (50ms apart) so the row feels like
 * a system enumerating its own capabilities.
 */
export function CapabilityPills({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  description,
  pills,
}: {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  pills: string[];
}) {
  return (
    <section className="section-dark relative py-24 md:py-section">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            {eyebrow && (
              <span className="system-label text-birdseye-electric">
                {eyebrow}
              </span>
            )}
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
              {preTitle}
              {italicTitle && (
                <>
                  {" "}
                  <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                    {italicTitle}
                  </span>
                </>
              )}
              {postTitle && <> {postTitle}</>}
            </h2>
          </motion.div>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
              className="text-body text-birdseye-cream/65 max-w-copy lg:pb-3"
            >
              {description}
            </motion.p>
          )}
        </div>

        <ul className="flex flex-wrap gap-3">
          {pills.map((pill, i) => (
            <motion.li
              key={pill}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: DUR.base,
                ease: EASE_OUT,
                delay: i * 0.05,
              }}
              className="inline-flex items-center gap-2 rounded-pill bg-birdseye-surface border border-birdseye-cream/[0.10] px-4 py-2.5 text-[13.5px] text-birdseye-cream"
            >
              <span
                aria-hidden
                className="grid place-items-center h-4 w-4 rounded-full bg-birdseye-electric/20 text-birdseye-electric text-[11px] font-mono leading-none"
              >
                +
              </span>
              {pill}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
