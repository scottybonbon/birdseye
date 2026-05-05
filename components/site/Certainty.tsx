"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { certainty } from "@/_design/content";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Certainty, closing typographic manifesto. Mirrors the hero structure
 * (three lines, mixed typography) so the page reads as a complete arc:
 * the same composition opens and closes, but with the closing argument
 * resolved.
 *
 * Pure type, no portrait, no stat, they live elsewhere on the page now.
 */
export function Certainty() {
  return (
    <section className="section-dark relative py-32 md:py-40 overflow-hidden">
      {/* Architectural rule lines for quiet structure */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-rule-vertical opacity-25" />
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,75,255,0.08)_0%,transparent_60%)]"
      />

      <Container className="relative max-w-site">
        <div className="text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="system-label text-birdseye-cream/55 mb-10 md:mb-14"
          >
            {certainty.eyebrow}
          </motion.div>

          {/* Three-line manifesto, mixed type, hero rhythm */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
            }}
            className="leading-[0.98] tracking-[-0.025em]"
          >
            {certainty.lines.map((line, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: DUR.slow, ease: EASE_OUT },
                  },
                }}
                className="block"
              >
                <ManifestoLine text={line.text} style={line.style} />
              </motion.span>
            ))}
          </motion.div>

          {/* Closer */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.7 }}
            className="mt-10 md:mt-14 text-body text-birdseye-cream/55 max-w-[440px] mx-auto text-balance"
          >
            {certainty.closer}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

function ManifestoLine({
  text,
  style,
}: {
  text: string;
  style: "sans" | "serif-italic";
}) {
  if (style === "serif-italic") {
    return (
      <span
        className="font-serif italic font-normal text-birdseye-electric"
        style={{
          fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
          letterSpacing: "-0.025em",
          lineHeight: "0.98",
        }}
      >
        {text}
      </span>
    );
  }
  return (
    <span
      className="font-sans font-bold text-birdseye-cream"
      style={{
        fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
        letterSpacing: "-0.04em",
        lineHeight: "1",
      }}
    >
      {text}
    </span>
  );
}
