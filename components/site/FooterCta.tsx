"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";
import { ArrowRight } from "@/components/site/icons/Icons";

/**
 * The CTA card that floats over the top of the footer (Skipmatrix-style
 * layered card). Designed to be used inside FooterStack, its bottom
 * half overlaps the dark footer canvas below, creating a soft layered
 * transition into the footer.
 *
 * Stand-alone shape: rounded card, electric blue, system meta line top,
 * mixed-typography headline, body line, prominent pill CTA on the right.
 */
export function FooterCta({
  preTitle = "Ready to",
  italicTitle = "modernize",
  postTitle = "your gate?",
  description = "20 minutes. We'll show you the platform live on your own footage.",
  primaryCta = { label: "Book a demo", href: "/book-a-demo" },
  secondaryCta,
  meta = "STATUS · READY",
}: {
  preTitle?: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  meta?: string;
}) {
  return (
    <Container className="max-w-site relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: DUR.slow, ease: EASE_OUT }}
        className="relative rounded-[1.75rem] overflow-hidden bg-birdseye-electric px-8 md:px-14 lg:px-20 py-14 md:py-20"
      >
        {/* Soft top wash for depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.18),transparent_60%)]" />
        {/* Right-side glow, gestures toward the system canvas */}
        <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10)_0%,transparent_55%)]" />
        {/* Bottom darken */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F2F7A]/35" />
        {/* Subtle dot grid */}
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20 mix-blend-overlay" />

        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left, meta + headline + description */}
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase font-medium text-birdseye-cream/75 mb-6 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-birdseye-cream animate-pulse" />
              {meta}
            </div>

            <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.022em] font-bold text-birdseye-cream text-balance">
              {preTitle}{" "}
              <span className="font-serif italic font-normal tracking-[-0.015em]">
                {italicTitle}
              </span>{" "}
              {postTitle}
            </h2>

            {description && (
              <p className="mt-5 text-body text-birdseye-cream/80 max-w-[460px]">
                {description}
              </p>
            )}
          </div>

          {/* Right, CTAs stacked, generous breathing room */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-birdseye-cream text-[#0F1C2E] pl-7 pr-1.5 h-14 font-medium text-[15px] hover:bg-[#F8FAFC] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 shadow-[0_24px_80px_rgba(15,28,46,0.35)]"
            >
              {primaryCta.label}
              <span className="grid place-items-center h-11 w-11 rounded-full bg-birdseye-electric text-birdseye-cream group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 text-[14px] text-birdseye-cream/85 hover:text-birdseye-cream transition-colors px-4"
              >
                {secondaryCta.label}
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
