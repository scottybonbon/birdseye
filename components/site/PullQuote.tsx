"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * PullQuote, the editorial section interlude.
 *
 * Real customer voice as architecture, not decoration. Reads like a
 * pull-quote in a printed magazine: mono masthead label in the left
 * rail (FROM THE FIELD · <COMPANY/SECTOR> · <YEAR>), large italic-serif
 * accent that opens the quote, body type continuation, attribution
 * row below.
 *
 * TWO TONES:
 *   - "dark"  → black bg, cream type. Default. Drops into any
 *               surrounding dark page section without a seam.
 *   - "light" → cream bg, ink type. Used when the section is intended
 *               as a deliberate cream interlude inside a dark page.
 *
 * Notes:
 *   - The `accent` fragment becomes italic Instrument Serif in the
 *     brand electric. Use it for the opening clause that should punch.
 *     Leave it off and the whole quote runs in body weight.
 *   - `portrait` is optional, when the speaker is a real, named,
 *     pictured customer (Stephen Merrion / C.R. England), pass it.
 *     Representative voices skip it; a portrait that doesn't match
 *     a name reads as fake.
 *   - Use straight or curly quote glyphs in the strings, the component
 *     prints them verbatim. Curly is preferred for body text typography.
 */

export type PullQuoteAttribution = {
  name: string;
  role: string;
  /** Optional small portrait. Only set when there's a real, named,
   *  pictured speaker, leave undefined for representative voices. */
  portrait?: string;
};

export type PullQuoteProps = {
  /** The body of the quote, set in the section's body type. */
  quote: string;
  /** Leading clause that should punch in italic-serif electric. The
   *  component renders `accent` first, then a single space, then `quote`. */
  accent?: string;
  /** Mono masthead label above the filing line. Defaults to "FROM THE FIELD". */
  eyebrow?: string;
  /** Mono filing line, usually "<COMPANY OR SECTOR> · <YEAR>". */
  filing?: string;
  /** Attribution row below the quote. */
  attribution: PullQuoteAttribution;
  /** Visual tone. Default "dark" matches the surrounding sections; pass
   *  "light" for the cream-paper treatment used on the legacy home-page
   *  Stephen Merrion break. */
  tone?: "dark" | "light";
};

export function PullQuote({
  quote,
  accent,
  eyebrow = "FROM THE FIELD",
  filing,
  attribution,
  tone = "dark",
}: PullQuoteProps) {
  const isLight = tone === "light";

  // Tone tokens. Dark tone has no horizontal rules, the surrounding
  // sections (MetricStrip, CapabilityPills) already carry their own
  // hairlines, and stacking them produced doubled lines. Generous py
  // padding + the typography contrast in the sidebar/blockquote do
  // the section-break work without chrome. Light tone needs no rules
  // either, the cream bg against surrounding dark IS the boundary.
  const sectionClass = isLight ? "section-light" : "section-dark";
  const eyebrowClass = "system-label text-birdseye-electric";
  const filingClass = isLight
    ? "system-label text-[#0A0A0B]/45"
    : "system-label text-birdseye-cream/40";
  const quoteColor = isLight ? "text-[#0A0A0B]" : "text-birdseye-cream";
  const nameColor = isLight ? "text-[#0A0A0B]" : "text-birdseye-cream";
  const roleColor = isLight ? "text-[#0A0A0B]/55" : "text-birdseye-cream/55";
  const portraitBorder = isLight
    ? "border-[#0A0A0B]/10"
    : "border-birdseye-cream/15";

  return (
    <section className={`${sectionClass} relative py-24 md:py-section`}>
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">
          {/* Sidebar caption, mono masthead + filing line. Reads as a
              magazine column header. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="lg:w-[180px] shrink-0"
          >
            <div className={`${eyebrowClass} mb-3`}>{eyebrow}</div>
            {filing && <div className={filingClass}>{filing}</div>}
          </motion.div>

          {/* The quote itself. Italic-serif accent opens; body type closes;
              attribution sits below in a footer row. */}
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.1 }}
            className="max-w-[920px]"
          >
            <p
              className={`text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[1.15] tracking-[-0.012em] text-balance ${quoteColor}`}
            >
              {accent && (
                <>
                  <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                    {accent}
                  </span>{" "}
                </>
              )}
              {quote}
            </p>

            <footer className="mt-10 flex items-center gap-4">
              {attribution.portrait && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={attribution.portrait}
                  alt={attribution.name}
                  className={`h-12 w-12 rounded-full object-cover border ${portraitBorder}`}
                />
              )}
              <div>
                <div className={`text-[15px] font-semibold ${nameColor}`}>
                  {attribution.name}
                </div>
                <div className={`text-[13px] ${roleColor}`}>
                  {attribution.role}
                </div>
              </div>
            </footer>
          </motion.blockquote>
        </div>
      </Container>
    </section>
  );
}
