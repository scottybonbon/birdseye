"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Standard hero block for secondary pages. Mirrors the homepage's
 * editorial typography system: mono eyebrow, mixed-typography headline
 * (sans + optional italic serif accent), serif italic tagline, body
 * subhead, optional CTAs.
 */
export function PageHero({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  tagline,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  tagline?: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="section-dark relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-rule-vertical opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,75,255,0.10)_0%,transparent_60%)]"
      />

      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            {eyebrow && (
              <span className="system-label text-birdseye-electric">{eyebrow}</span>
            )}
            <h1 className="mt-5 text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream text-balance">
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
            </h1>
            {tagline && (
              <p className="mt-6 font-serif italic text-[18px] md:text-[20px] text-birdseye-cream/65 max-w-[520px]">
                {tagline}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.15 }}
            className="lg:pb-3"
          >
            <p className="text-body text-birdseye-cream/65 max-w-copy">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-birdseye-electric px-6 py-3 text-[14px] font-medium text-birdseye-cream hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
                  >
                    {primaryCta.label}
                    <span>→</span>
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-birdseye-cream/15 px-6 py-3 text-[14px] font-medium text-birdseye-cream/85 hover:border-birdseye-cream/35 hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
                  >
                    {secondaryCta.label}
                    <span>→</span>
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
