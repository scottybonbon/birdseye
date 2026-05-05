"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { LeadCaptureModal } from "@/components/site/LeadCaptureModal";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * GatedResourceBand — section-level CTA band that promotes a specific
 * gated resource (whitepaper, playbook, checklist) and opens the
 * lead-capture modal on click.
 *
 * DEEP-1 (2026-05-03): drops onto archive pages (/guide, /checklist)
 * as a marketing band that says "Get the [resource]." Click triggers
 * the LeadCaptureModal; on submit, the actual download URL is
 * surfaced.
 *
 * Mike action: replace `downloadUrl` with the real PDF asset URL once
 * available. Until then, the URL is a placeholder.
 */
export function GatedResourceBand({
  eyebrow,
  resourceTitle,
  resourceType = "playbook",
  description,
  downloadUrl = "#",
  ctaLabel,
  pdfReady = false,
}: {
  eyebrow: string;
  resourceTitle: string;
  resourceType?: string;
  description: string;
  downloadUrl?: string;
  ctaLabel?: string;
  /**
   * Whether the PDF asset at downloadUrl is actually published. Defaults
   * to false — when false, the lead-capture success state captures the
   * email and reads "we'll send it when it's ready" rather than serving
   * a 404 download. Flip to true on each mount once Mike has uploaded
   * the matching PDF to /public/playbooks/.
   */
  pdfReady?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="section-dark py-16 md:py-24 border-t border-b border-birdseye-cream/[0.08]">
        <Container className="max-w-site">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-center"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-electric mb-4">
                {eyebrow}
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] font-bold text-birdseye-cream">
                {resourceTitle}
              </h2>
              <p className="mt-4 text-body text-birdseye-cream/65 max-w-copy">
                {description}
              </p>
            </div>
            <div className="lg:flex lg:justify-end">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-7 h-13 py-3 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                {ctaLabel ?? `Get the ${resourceType}`}
                <span aria-hidden>↓</span>
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      <LeadCaptureModal
        open={open}
        onClose={() => setOpen(false)}
        resourceTitle={resourceTitle}
        resourceType={resourceType}
        downloadUrl={downloadUrl}
        pdfReady={pdfReady}
      />
    </>
  );
}
