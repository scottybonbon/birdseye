"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { hero } from "@/_design/content";
import { IconArrowRight } from "@/components/icons/SystemIcons";
import { DUR, EASE_OUT } from "@/_design/motion";
import { VideoLightbox } from "@/components/site/VideoLightbox";

/** YouTube video ID + start offset for the Hero "Watch how it works"
 *  lightbox. Pulled from
 *  https://www.youtube.com/watch?v=9UwKgeEWsOI&t=2s */
const HOW_IT_WORKS_VIDEO = { id: "9UwKgeEWsOI", start: 2 };


/**
 * Hero, Editorial manifesto over the parking-lot ambient video.
 * Three lines stacked: sans / serif-italic / ghost.
 *
 * The ambient asset is `/hero-reverse.mp4`, the slow upward pan over
 * the yard at dusk, played back at 0.5× so the camera move reads as
 * intentional, ambient, and reserved (not jittery or distracting).
 *
 * Reserved register (Scotty pivot, 2026-05-02): the previous version
 * carried two operational chrome strips, a top "MONITORING ACTIVE"
 * telemetry row plus a brand-version pill, and a sitewide command
 * palette + bottom-left event console. All removed in favor of a
 * cleaner, quieter hero that lets the H1 and the camera carry the
 * moment. The CameraEye + CommandPalette + SystemConsole component
 * files are preserved as design archeology but no longer mounted.
 *
 * Overlay stack is tuned for the slowed video: heavier top + bottom
 * gradient masks plus a tighter radial vignette so the H1 reads
 * crisply on every frame. Ambient phase-tint glaze remains so the
 * hero participates in the dawn / day / dusk / night register.
 */
export function Hero() {
  // Local state for the "Watch how it works" lightbox. Kept inline
  // rather than a global store — only the Hero opens this video.
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="section-dark relative isolate overflow-hidden min-h-[100vh] flex flex-col">
      <HeroLensBackdrop />

      {/* CV detection overlay (HeroCvOverlay) was removed 2026-05-04
          per Scotty — the corner-bracket framing on the hero video read
          as gimmicky tracking-UI rather than ambient AI presence. The
          component file is preserved in components/site/HeroCvOverlay
          .tsx as design archeology in case a quieter treatment is
          revisited later. */}

      {/* Architectural rule lines, quiet visible structure over the lens */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-rule-vertical opacity-15" />

      {/* Note: the headline radial plate that previously sat here was
          removed 2026-05-02 — its center-darker shape, layered on top
          of the linear vertical dim and the radial vignette in
          HeroLensBackdrop, produced visible contour bands where the
          three composite gradients intersected. The H1 now relies on
          a single smooth backdrop dim (HeroLensBackdrop) plus per-
          letter text-shadow on each Line for local legibility. */}

      <Container className="relative flex-1 grid place-items-center max-w-site py-24 md:py-32">
        <div className="text-center max-w-[940px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="system-label text-birdseye-cream/60 mb-8 md:mb-10"
          >
            {hero.eyebrow}
          </motion.div>

          {/* Three-line manifesto, type scale dialed in for composition */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            className="leading-[0.98] tracking-[-0.025em]"
          >
            {hero.lines.map((line, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: DUR.slow, ease: EASE_OUT },
                  },
                }}
                className="block"
              >
                <Line text={line.text} style={line.style} />
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.85 }}
            className="text-body text-birdseye-cream/60 max-w-[520px] mx-auto mt-8 md:mt-10 text-balance"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.95 }}
            className="mt-9 flex items-center justify-center gap-3"
          >
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 shadow-[0_0_40px_rgba(46,75,255,0.3)] animate-idle-pulse hover:[animation:none]"
            >
              {hero.primaryCta.label}
              <IconArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            {/* Secondary CTA — opens the "Watch how it works"
                YouTube lightbox in-page rather than navigating away.
                Same chrome / sizing / focus ring as before; the
                transition from <Link> to <button> is invisible to the
                visitor. The href on hero.secondaryCta is preserved as
                the source of truth for the label only. */}
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-birdseye-cream/15 text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-cream/[0.04] hover:border-birdseye-cream/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 cursor-pointer"
            >
              <span className="text-[10px] opacity-70" aria-hidden="true">▶</span>
              {hero.secondaryCta.label}
            </button>
          </motion.div>

        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: EASE_OUT }}
        className="relative z-10 pb-8 md:pb-10 flex flex-col items-center gap-3 text-birdseye-cream/40"
      >
        <span className="system-label">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, ease: EASE_OUT, repeat: Infinity }}
          className="block h-8 w-px bg-birdseye-cream/30"
        />
      </motion.div>

      {/* "Watch how it works" lightbox. Mounted at the bottom of the
          Hero so it sits in this section's stacking context, but uses
          fixed positioning + z-[80] internally so it covers the entire
          viewport above all sitewide chrome (Nav, SystemConsole,
          CommandPalette). */}
      <VideoLightbox
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={HOW_IT_WORKS_VIDEO.id}
        startSeconds={HOW_IT_WORKS_VIDEO.start}
        caption="BIRDSEYE · WATCH HOW IT WORKS"
      />
    </section>
  );
}

/**
 * The parking-lot video backdrop.
 *
 * Source: `/hero-reverse.mp4`, the canonical hero ambient. A slow
 * upward pan over a yard at dusk; the camera does the work, the H1
 * sits centered over it.
 *
 * Overlay stack (top → bottom):
 *
 *   1. The video itself, autoplaying, muted, looped, playsInline.
 *   2. A vertical gradient that's heavier than the lens version was 
 *      the parking-lot footage isn't already mostly-black like the
 *      iris was, so we need a deeper dim above + below to keep the H1
 *      readable on every frame. Center band stays lighter so the
 *      camera's subject still reads through.
 *   3. A radial vignette to anchor the H1 to the centre.
 *   4. The AmbientShift phase-tint glaze (mix-blend-soft-light) so the
 *      hero participates in dawn / day / dusk / night.
 *
 * Reduce-motion: pauses the video on mount via the synchronous
 * matchMedia read, so a vestibular user never sees the pan run. The
 * first frame still serves as a static photograph backdrop.
 *
 * Asset reuse note: this same /hero-reverse.mp4 is also referenced by
 * the MaxTelepresence triptych (DOCUMENT pane). Browsers cache the
 * single asset across both placements, so there's no duplicate load.
 * The other hero-era MP4s (/hero.mp4, /homepage-header-ambient.mp4)
 * remain on disk for the other two MaxTelepresence panes. Safely
 * deletable: hero.mov (7.7MB, no callers), hero-reversed.mp4 (0B
 * placeholder), homepage-header-ambient-reversed.mp4 (0B placeholder).
 */
function HeroLensBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // playbackRate stays at the asset's native 1×. A brief experiment
    // with 0.5× playback (2026-05-02) read as choppy because the source
    // is encoded at a frame rate that doesn't subdivide cleanly, the
    // slowed pan lost its fluid motion. Reverted.
    //
    // Synchronous reduce-motion check on mount, same pattern as
    // BrandEntry / CameraEye. If the user prefers reduced motion, we
    // pause after the first frame so the still composition serves as
    // the backdrop.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      v.pause();
    }
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-20">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-reverse.mp4" type="video/mp4" />
      </video>

      {/* Single smooth top→bottom dim. Two stops, perfectly linear
          interpolation so no contour bands are mathematically possible.
          Tuning history (2026-05-04): 0.92 → 0.78 (too dark, video
          near-black) → 0.55 → 0.30 (too light) → 0.70 → 0.45 → 0.75 →
          0.50 → 0.80 → 0.55 → 0.85 → 0.60, the locked setting. Per-
          letter text-shadow on each Line carries local emphasis.
          Phase-tinted glaze below adds dawn / dusk warmth without
          introducing any new opacity contours. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 100%)",
        }}
      />
      {/* Phase-tinted glaze, at dawn/dusk a subtle warm cast washes
          the hero, at night a cool deep cast. Day reads as neutral.
          The tint color comes from --ambient-tint as an `rgb()`
          triplet. Soft-light blend so the footage reads through. */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundColor: "rgb(var(--ambient-tint, 12 14 22) / 0.20)",
        }}
      />
    </div>
  );
}

/**
 * Renders one headline line in the right typographic style.
 * Dialed-in clamps: ~48–96px on desktop, breathes on mobile.
 */
function Line({
  text,
  style,
}: {
  text: string;
  style: "sans" | "serif-italic" | "ghost";
}) {
  if (style === "serif-italic") {
    return (
      <span
        className="font-serif italic font-normal text-birdseye-electric"
        style={{
          fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
          letterSpacing: "-0.025em",
          lineHeight: "0.95",
          // Targeted text-shadow on the serif italic only. Instrument
          // Serif ships in weight 400 only, there is no thicker cut 
          // so the thin strokes need a soft dark halo to land on top
          // of the textured parking-lot footage. Two shadows: a tight
          // 1px shadow that hugs the letterforms (the "outline") +
          // a wider 18px soft fill that pushes the surrounding pixels
          // darker without darkening the letterform itself.
          textShadow:
            "0 1px 2px rgba(0,0,0,0.85), 0 0 18px rgba(0,0,0,0.55)",
        }}
      >
        {text}
      </span>
    );
  }
  if (style === "ghost") {
    // Slightly lifted from /15 → /28 so ZERO GUESSWORK reads clearly
    // without shouting. Still subordinate to the first two lines. A
    // soft shadow keeps the dim cream readable against the uniform-
    // dim backdrop without thickening the letterforms.
    return (
      <span
        className="font-sans font-bold text-birdseye-cream/30"
        style={{
          fontSize: "clamp(2.75rem, 6vw, 6rem)",
          letterSpacing: "-0.04em",
          lineHeight: "1",
          textShadow: "0 1px 3px rgba(0,0,0,0.55)",
        }}
      >
        {text}
      </span>
    );
  }
  return (
    <span
      className="font-sans font-bold text-birdseye-cream"
      style={{
        fontSize: "clamp(2.75rem, 6vw, 6rem)",
        letterSpacing: "-0.04em",
        lineHeight: "1",
        // Generous text-shadow now that the backdrop is a single uniform
        // dim instead of a layered headline plate. A tight 1px shadow
        // hugs the letterforms (the "outline") plus a wider 22px soft
        // halo darkens the surrounding pixels. Keeps Inter Bold cream
        // crisp on every frame of the parking-lot pan.
        textShadow:
          "0 1px 3px rgba(0,0,0,0.85), 0 0 22px rgba(0,0,0,0.55)",
      }}
    >
      {text}
    </span>
  );
}

/* Removed (Scotty pivot, 2026-05-02):
 *   • SystemConsoleTop, the top-row YOS · v1.4 · OPERATIONAL pill +
 *     phase / city / local-time stamp. Read as too "control room."
 *   • PhaseTimeStamp, only consumer was SystemConsoleTop; deleted.
 *   • HeroTelemetryStrip, the second-row "Monitoring active · 47
 *     zones · 12 agents on · 0 incidents · Last update HH:MM UTC"
 *     telemetry overlay. Same call.
 *
 * The reserved-register hero now carries only the H1, the subhead,
 * the CTA pair, and the SCROLL stamp. The parking-lot pan does the
 * atmospheric work; the operational chrome lives elsewhere on the
 * site (e.g. /status) where it serves a real purpose.
 */
