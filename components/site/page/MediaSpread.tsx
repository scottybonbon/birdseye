"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * MediaSpread, copy + photo, full-width section.
 *
 * Used to break up wall-of-text on the platform module pages (and any
 * other secondary page that needs more visual rhythm). Each spread
 * pairs an editorial copy block (eyebrow + headline + body + optional
 * CTA + optional bullets) with a photo on the opposite side.
 *
 * Pass `side="left"` to place the IMAGE on the left, copy on the right 
 * alternate per spread to get the classic editorial zig-zag pattern.
 *
 * Mobile collapses to a single column with the image on top.
 */
export type MediaSpreadProps = {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  body: string | string[];
  bullets?: string[];
  cta?: { label: string; href: string };
  image: string;
  imageAlt?: string;
  // "right" (default) puts the image on the right, copy on the left.
  side?: "left" | "right";
  // Aspect ratio of the image frame. "4/3" is the default; use "1/1" or
  // "16/9" for variety across spreads.
  aspect?: "4/3" | "1/1" | "16/9" | "3/4";
  // Optional eyebrow color override, defaults to electric blue.
  eyebrowColor?: string;
  /**
   * Archive masthead caption. When set, a thin mono caption strip renders
   * below the image and the cursor's HUD caption fires when hovering it.
   * Format: "ARCHIVE · CAMERA INSTALL · 2024-06", short, mono-uppercase,
   * already styled for it. Reads as: every photo on the site is archived
   * footage from a real install.
   */
  archive?: string;
};

export function MediaSpread({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  body,
  bullets,
  cta,
  image,
  imageAlt = "",
  side = "right",
  aspect = "4/3",
  eyebrowColor = "text-birdseye-electric",
  archive,
}: MediaSpreadProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  // The order of the two columns swaps with the `side` prop. Using grid
  // column order so we don't duplicate JSX for each variant.
  const imageOrder = side === "left" ? "lg:order-1" : "lg:order-2";
  const copyOrder = side === "left" ? "lg:order-2" : "lg:order-1";

  return (
    <section className="section-dark py-20 md:py-28">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Image, wrapped in an optional cursor-caption wrapper so that
              hovering the photo summons the archive caption next to the
              cursor as well as showing it underneath. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className={`relative ${imageOrder}`}
          >
            <div
              className="relative w-full overflow-hidden rounded-card border border-birdseye-cream/[0.10] bg-[#0A0A0B]"
              style={{ aspectRatio: aspect }}
              {...(archive ? { "data-cursor-caption": archive } : {})}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle vignette for legibility against any image */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
            </div>
            {archive && (
              <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40">
                <span
                  aria-hidden
                  className="grid place-items-center h-3 w-3 rounded-full bg-birdseye-electric/15 text-birdseye-electric/80 text-[9px] leading-none font-medium"
                >
                  +
                </span>
                <span>{archive}</span>
              </div>
            )}
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className={`max-w-[520px] ${copyOrder} ${
              side === "left" ? "lg:ml-auto" : ""
            }`}
          >
            {eyebrow && (
              <span className={`system-label ${eyebrowColor}`}>{eyebrow}</span>
            )}
            <h2 className="mt-5 text-[clamp(1.875rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.018em] font-bold text-birdseye-cream">
              {preTitle}
              {italicTitle && (
                <>
                  {" "}
                  <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                    {italicTitle}
                  </span>
                </>
              )}
              {postTitle}
            </h2>
            <div className="mt-5 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-body text-birdseye-cream/65">
                  {p}
                </p>
              ))}
            </div>

            {bullets && bullets.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14.5px] text-birdseye-cream/85 leading-[1.45]"
                  >
                    <span
                      aria-hidden
                      className="mt-[8px] h-1 w-1 rounded-full bg-birdseye-electric shrink-0"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {cta && (
              <Link
                href={cta.href}
                className="group mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-birdseye-cream hover:text-birdseye-electric active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                {cta.label} <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
