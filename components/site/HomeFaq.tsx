"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/site/page/FAQAccordion";
import { homeFaq } from "@/_design/content";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * HomeFaq — pre-demo objection handler at the bottom of the home page.
 *
 * COMP-5: Flock pattern surfaced by the 2026-05 competitor audit. Eight
 * procurement-grade questions a yard ops director actually asks before
 * hitting "Book a demo," answered straight without the marketing varnish.
 *
 * Placement: between Explore (sitemap) and Certainty (manifesto pull-
 * quote) so the closing arc reads as a deliberate three-beat — rational
 * close (FAQ) → emotional close (manifesto) → action (FooterStack). The
 * FAQ does the procurement-cycle sales work; the manifesto reclaims the
 * emotional register before the CTA.
 *
 * Reuses the existing FAQAccordion primitive in
 * components/site/page/FAQAccordion. That component uses native
 * <details>/<summary> elements for accessibility and keyboard control,
 * no custom JS — chevron rotation is a CSS group-open transform. Same
 * primitive will be used by FIGMA-3 (per-platform FAQ on /platform/*
 * pages), so the Q&A treatment stays consistent sitewide.
 *
 * Reduce-motion: section-level fade-in respects framer-motion's OS
 * preference; the accordion itself uses pure CSS transitions so it's
 * inherently reduce-motion friendly.
 */
export function HomeFaq() {
  return (
    <section
      className="section-dark py-24 md:py-section"
      aria-labelledby="home-faq-heading"
    >
      <Container className="max-w-site">
        <motion.div
          id="home-faq-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
        >
          <FAQAccordion
            eyebrow={homeFaq.eyebrow}
            preTitle={homeFaq.title.pre}
            italicTitle={homeFaq.title.italic}
            postTitle={homeFaq.title.post}
            description={homeFaq.description}
            items={[...homeFaq.items]}
          />
        </motion.div>
      </Container>
    </section>
  );
}
