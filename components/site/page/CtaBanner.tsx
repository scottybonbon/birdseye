"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Bottom-of-page conversion banner. Mirrors the homepage CtaCard's
 * brand-blue typography moment, simplified for secondary pages so it
 * doesn't compete with the homepage hero.
 */
export function CtaBanner({
  preTitle,
  italicTitle,
  postTitle,
  description,
  primaryCta = { label: "Book a demo", href: "/book-a-demo" },
  secondaryCta,
}: {
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="section-dark relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(46,75,255,0.10)_0%,transparent_60%)]"
      />
      <Container className="max-w-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="text-center"
        >
          <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
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
          {description && (
            <p className="mt-6 text-body text-birdseye-cream/55 max-w-[480px] mx-auto text-balance">
              {description}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-birdseye-electric px-7 py-3.5 text-[14px] font-medium text-birdseye-cream hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
            >
              {primaryCta.label}
              <span>→</span>
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-birdseye-cream/15 px-7 py-3.5 text-[14px] font-medium text-birdseye-cream/85 hover:border-birdseye-cream/35 hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                {secondaryCta.label}
                <span>→</span>
              </Link>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
