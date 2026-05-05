"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { security } from "@/_design/content";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Security & Compliance, built for the IT/security buyer who reviews the
 * platform after the operations buyer. Dark "system-vault" tone with a
 * compliance-cert grid and four trust pillars.
 *
 * Pattern reference: Stripe's compliance pages, Vercel's security overview,
 * Linear's enterprise page.
 */
export function Security() {
  return (
    <section className="section-dark relative py-24 md:py-section xl:py-40 overflow-hidden">
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
              {security.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.025em] font-bold text-birdseye-cream">
              {security.title.pre}{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                {security.title.italic}
              </span>
              {security.title.post}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3"
          >
            {security.subtitle}
          </motion.p>
        </div>

        {/* Compliance certifications row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="border-y border-birdseye-cream/[0.10] py-6 md:py-8 mb-16 md:mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
            {security.certifications.map((cert, i) => (
              <div key={cert.label} className="flex items-center gap-3">
                <CertGlyph index={i} />
                <div>
                  <div className="system-label text-birdseye-cream/45 mb-0.5">
                    CERTIFIED
                  </div>
                  <div className="text-[15px] leading-tight font-semibold text-birdseye-cream">
                    {cert.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Four trust pillars */}
        <div className="grid md:grid-cols-2 gap-px bg-birdseye-cream/[0.08] rounded-card overflow-hidden">
          {security.pillars.map((pillar, i) => (
            <motion.article
              key={pillar.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.05 }}
              className="bg-birdseye-surface p-8 md:p-10 relative"
            >
              <div className="flex items-baseline justify-between mb-5">
                <div className="font-mono text-[12px] tracking-[0.10em] text-birdseye-electric">
                  0{i + 1} · {pillar.label}
                </div>
                <PillarGlyph kind={pillar.label} />
              </div>
              <h3 className="text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-birdseye-cream">
                {pillar.title}
              </h3>
              <p className="mt-3 text-body text-birdseye-cream/60 max-w-copy">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Read the security overview link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href={security.link.href}
            className="group inline-flex items-center gap-2 text-[14px] text-birdseye-cream/75 hover:text-birdseye-cream transition-colors"
          >
            <span className="underline underline-offset-4 decoration-birdseye-cream/30 group-hover:decoration-birdseye-electric">
              {security.link.label}
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * Certification glyph, minimal hexagonal seal that varies by index.
 * Hand-built so we don't depend on real cert vendor logos at this stage.
 */
function CertGlyph({ index }: { index: number }) {
  return (
    <div className="relative h-12 w-12 shrink-0 grid place-items-center">
      <svg viewBox="0 0 48 48" className="absolute inset-0 text-birdseye-cream/15" aria-hidden="true">
        <path
          d="M24 4 42 14 42 34 24 44 6 34 6 14 24 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span className="font-mono text-[11px] tracking-[0.06em] text-birdseye-cream/85 font-medium">
        {`0${index + 1}`}
      </span>
    </div>
  );
}

/**
 * Pillar glyph, a small monoline icon corresponding to the pillar's
 * focus (data / retention / personnel / sovereignty).
 */
function PillarGlyph({ kind }: { kind: string }) {
  const className = "h-5 w-5 text-birdseye-cream/45";
  switch (kind) {
    case "DATA":
      return (
        <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
          <rect
            x="3"
            y="6"
            width="14"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M7 6V4.5a3 3 0 016 0V6"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="10" cy="11" r="1" fill="currentColor" />
          <path
            d="M10 12v2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "RETENTION":
      return (
        <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M10 6v4l2.5 2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "PERSONNEL":
      return (
        <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M4 17c1-3 3.5-4.5 6-4.5s5 1.5 6 4.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "SOVEREIGNTY":
      return (
        <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
          <ellipse
            cx="10"
            cy="10"
            rx="3"
            ry="7"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M3 10h14" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    default:
      return null;
  }
}
