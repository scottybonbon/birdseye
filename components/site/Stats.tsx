"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/_design/content";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Stats, full-bleed band of editorial metrics. Borderless, oversized.
 * The numbers ARE the design (Anthropic / Stripe Sigma reference).
 */
export function Stats() {
  return (
    <section className="section-dark relative py-24 md:py-section xl:py-40 overflow-hidden">
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
              {stats.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
              Proven{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                at scale
              </span>
              .
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3"
          >
            Six years of yard automation. Billions of dollars protected. A
            track record that compounds with every event.
          </motion.p>
        </div>

        {/* Stats grid, borderless, hairline-separated. Reads like a financial report. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 border-t border-birdseye-cream/[0.10]">
          {stats.items.map((s, i) => (
            <CountStat
              key={s.value}
              value={s.value}
              label={s.label}
              delay={i * 0.06}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CountStat({
  value,
  label,
  delay,
  index,
}: {
  value: string;
  label: string;
  delay: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const match = value.match(/^([^\d.]*)([\d.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numeric = parseFloat(match?.[2] ?? "0");
  const suffix = match?.[3] ?? "";
  const decimals = (match?.[2] ?? "").includes(".")
    ? (match?.[2] ?? "").split(".")[1].length
    : 0;

  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    // Long counter sweep, DUR.slow * 2 = 1.6s. Tied to the system so a
    // sitewide tempo change carries through here too.
    const controls = animate(mv, numeric, {
      duration: DUR.slow * 2,
      delay,
      ease: EASE_OUT as unknown as [number, number, number, number],
    });
    return () => controls.stop();
  }, [inView, mv, numeric, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DUR.smooth, ease: EASE_OUT, delay }}
      className="relative px-4 md:px-8 py-10 md:py-14 border-b border-birdseye-cream/[0.10] [&:nth-child(odd)]:lg:border-r [&:nth-child(2n)]:border-r [&:nth-child(2n)]:lg:border-r [&:nth-child(3n)]:lg:!border-r-0"
    >
      {/* Stat number index */}
      <div className="font-mono text-[11px] tracking-[0.08em] text-birdseye-cream/35 mb-4">
        0{index + 1}
      </div>
      {/* Number, large, oriented to baseline */}
      <div className="text-[clamp(2.75rem,5.5vw,5rem)] leading-[1] text-birdseye-cream font-bold tracking-[-0.03em] tabular-nums">
        {prefix}
        <motion.span>{display}</motion.span>
        {suffix}
      </div>
      {/* Label, mono caption */}
      <div className="mt-4 system-label text-birdseye-cream/55 max-w-[260px]">
        {label}
      </div>
    </motion.div>
  );
}
