"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * Hairline-grid stat row. Same DNA as the homepage Stats block but
 * standalone for use on subpages.
 *
 * 2026-05-04 (Scotty call): the component now bakes its own header
 * (eyebrow + headline) so every place it's used reads as a complete,
 * self-contained piece — not a stat grid that requires the caller to
 * remember to wrap it with a heading. The header is required on every
 * mount; if a caller really doesn't want one, pass `header={false}`.
 *
 * Same revision: cut the per-metric source footnotes (the [01]
 * superscript markers and the "Sources" section beneath the grid).
 * The numbers should stand on their own; if a number is questionable
 * enough to need a citation it shouldn't be on the marketing page in
 * the first place. Source/methodology notes belong in /security and
 * /case-studies, not as visual noise on a stat strip.
 */

export type Metric = {
  value: string;
  label: string;
  /**
   * Optional source / methodology line. Retained on the type so
   * authors can document intent in the data, but no longer rendered.
   * If we ever want a "data sourcing" page it'll come from this field.
   */
  note?: string;
};

type HeaderProps =
  | {
      header?: true;
      eyebrow: string;
      preTitle: string;
      italicTitle?: string;
      postTitle?: string;
      description?: string;
    }
  | { header: false };

export function MetricStrip(
  props: { metrics: Metric[] } & HeaderProps,
) {
  const { metrics } = props;
  return (
    <section className="section-dark relative py-20 md:py-24 border-t border-b border-birdseye-cream/[0.10]">
      <Container className="max-w-site">
        {props.header !== false && (
          <Header
            eyebrow={props.eyebrow}
            preTitle={props.preTitle}
            italicTitle={props.italicTitle}
            postTitle={props.postTitle}
            description={props.description}
          />
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-birdseye-cream/[0.08]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.06 }}
              className="bg-birdseye-surface px-6 py-8 md:px-8 md:py-10"
            >
              <div className="font-mono text-[11px] tracking-[0.08em] text-birdseye-electric mb-3">
                0{i + 1}
              </div>
              <div className="text-[clamp(2rem,3.5vw,3.25rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
                {m.value}
              </div>
              <div className="mt-3 text-[13px] leading-[1.5] text-birdseye-cream/55 max-w-[200px]">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Header({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  description,
}: {
  eyebrow: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
}) {
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: DUR.smooth, ease: EASE_OUT }}
      >
        <span className="system-label text-birdseye-electric">{eyebrow}</span>
        <h2 className="mt-5 text-[clamp(1.875rem,3.4vw,2.875rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
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
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
          className="text-body text-birdseye-cream/55 max-w-copy lg:pb-2"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
