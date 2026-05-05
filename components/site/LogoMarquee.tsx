"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { images } from "@/_design/images";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Customer logo marquee, slowly auto-scrolling infinite loop. Pure-black
 * band that sits directly under the hero. The trust handshake before any
 * reading. Edge fades to mask the loop seam.
 */

// Stand-in customer roster, when more logos arrive, drop them in.
// White-on-dark transparent PNGs work best.
const logos = [
  ...images.logos,
  // Repeat the logos a few times so the loop appears continuous even with
  // a small set. Replace duplicates with real logos as they come in.
  ...images.logos,
  ...images.logos,
  ...images.logos,
];

export function LogoMarquee() {
  return (
    <section className="section-dark relative py-14 md:py-16 border-y border-birdseye-cream/[0.06] overflow-hidden">
      <Container className="max-w-site">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="text-center system-label text-birdseye-cream/45 mb-10"
        >
          <span>On the yards that already switched</span>
        </motion.div>
      </Container>

      {/* Marquee, full bleed, loops infinitely */}
      <div className="relative">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-48 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-48 z-10 bg-gradient-to-l from-black to-transparent" />

        <div className="flex">
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}

function Track() {
  return (
    <motion.div
      animate={{ x: ["0%", "-100%"] }}
      transition={{
        ease: "linear",
        duration: 36,
        repeat: Infinity,
      }}
      className="flex shrink-0 items-center gap-16 md:gap-24 pr-16 md:pr-24"
    >
      {logos.map((logo, i) => (
        <img
          key={`${logo.name}-${i}`}
          src={logo.src}
          alt={logo.name}
          // Per-customer stat surfaces in the cursor HUD on hover (#6).
          // Same data-cursor-caption pattern used on MediaSpread archive
          // frames and the MaxTelepresence triptych panes — keeps the
          // surveillance-HUD register consistent across the site.
          data-cursor-caption={logo.stat}
          // Per-logo height override — monograms (Honda, GE, Mercedes
          // round) want slightly more vertical height than wordmarks
          // to feel visually equivalent. Falls back to the wordmark
          // default (h-7 md:h-8) when omitted.
          //
          // CSS filter (2026-05-04, revised): `brightness(0) invert(1)`
          // flattens any-color logo to a white silhouette so already-
          // white logos (Bison, CR England, AWC, Remco, Mercedes, Honda)
          // render consistently regardless of source.
          //
          // The filter is OPT-OUT for logos where the brand mark IS the
          // color (Ford blue oval with white cursive inside, GE blue
          // circle with white "GE" inside). On those, the filter would
          // collapse the colored background and inner white text into a
          // single white blob — losing the inner letterform. Logos with
          // `keepColor: true` skip the filter and render in their
          // native brand colors, which actually reads stronger on a
          // dark band anyway.
          className={`${
            logo.heightClass ?? "h-7 md:h-8"
          } w-auto opacity-55 hover:opacity-100 transition-opacity`}
          style={
            logo.keepColor
              ? undefined
              : { filter: "brightness(0) invert(1)" }
          }
          draggable={false}
        />
      ))}
    </motion.div>
  );
}
