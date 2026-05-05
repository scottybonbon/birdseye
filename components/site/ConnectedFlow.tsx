"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { connectedFlow } from "@/_design/content";
import { images } from "@/_design/images";
import { cn } from "@/lib/cn";
import { DUR, EASE_OUT } from "@/_design/motion";


// Slug order MUST match content.ts `connectedFlow.features` order.
// Each slug resolves to a .webm in images.ts → connectedFlow map.
const SLUGS = [
  "monitoring",
  "gatecore",
  "id-verify",
  "bills-of-lading",
  "seal-verification",
  "faster-gate",
  "voice-down",
  "compliance-reporting",
];

/**
 * Sticky-scroll feature reveal, Apple / Linear / Stripe pattern.
 *
 * Left column scrolls 8 feature blocks (each padded with vertical breathing
 * room so they hit the active zone one at a time). Right column is a sticky
 * media canvas with ALL 8 videos pre-mounted; IntersectionObserver swaps
 * which one is at opacity-100. No re-mount, no re-download, no blank
 * frame.
 *
 * Two prior bugs that this rewrite fixes:
 *
 *   1) The section used to have `overflow-hidden`. That attribute silently
 *      changes the nearest scroll container for `position: sticky` and
 *      causes the sticky pane to never stick against the viewport. Removed.
 *
 *   2) The previous version remounted a single <video> with `key={slug}`
 *      so each feature switch triggered a fresh download from the proxy.
 *      All 8 videos now stay mounted; the swap is just an opacity toggle.
 */
export function ConnectedFlow() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // "Closest to activation point" strategy. On every scroll, find the
    // feature block whose vertical center is nearest the activation point
    // (40% down the viewport) and activate it. This guarantees there's
    // always exactly one active feature, no IntersectionObserver gap
    // between features, no stale active state.
    //
    // Cheap: 8 getBoundingClientRect calls per scroll frame is nothing,
    // and we early-out when the section isn't in view.
    let raf = 0;
    const update = () => {
      raf = 0;
      const sec = stickyContainerRef.current?.parentElement?.parentElement; // section
      if (sec) {
        const r = sec.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return; // off-screen
      }
      const targetY = window.innerHeight * 0.4;
      let bestIdx = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // NB: NO `overflow-hidden` on this section, it kills `position: sticky`
    // for descendants. If we need to clip a decorative background, do it on
    // an inner absolutely-positioned wrapper instead.
    <section
      id="how"
      className="section-dark relative py-24 md:py-section"
    >
      <Container className="max-w-site">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="system-label text-birdseye-electric">THE PROBLEM</span>
            <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
              Outdated security is{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                slowing
              </span>{" "}
              you down.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3"
          >
            {connectedFlow.subtitle}
          </motion.p>
        </div>

        {/* Mobile: stacked cards with inline media (sticky-scroll doesn't
            work well on phones). Hidden on lg+. */}
        <div className="space-y-12 lg:hidden">
          {connectedFlow.features.map((f, i) => (
            <article key={f.name}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-birdseye-surface border border-birdseye-cream/[0.08] mb-5">
                <video
                  src={
                    images.connectedFlow[SLUGS[i]] ?? images.connectedFlowDefault
                  }
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute left-4 bottom-4 system-label text-birdseye-cream flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-birdseye-success" />
                  {f.name.toUpperCase()}
                </div>
              </div>
              <div className="font-mono text-[12px] tracking-[0.08em] text-birdseye-electric mb-2">
                0{i + 1}
              </div>
              <h3 className="text-[1.5rem] leading-[1.15] tracking-[-0.012em] font-bold text-birdseye-cream">
                {f.name}
              </h3>
              <p className="mt-3 text-body text-birdseye-cream/60">{f.description}</p>
            </article>
          ))}
        </div>

        {/* Desktop: sticky-scroll feature reveal. Hidden below lg. */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
          {/* Left, scrolling feature list. Each block has responsive vertical
              breathing room (clamped 50vh–100vh) so spacing feels proportional
              across 1080px monitors (756px) to 2400px (1680px was excessive).
              The active block is signalled by opacity alone (cream at full,
              inactive at 30%), a previous version pulsed the active block
              between scale(1) and scale(1.15) on an infinite 1.5s loop, which
              read as random/superfluous. Removed on Scotty's call (2026-05-02);
              reserved-register pivot says the cue should be a single quiet
              opacity step, not a heartbeat. */}
          <div className="[&>*+*]:[margin-top:clamp(50vh,70vh,100vh)] py-[20vh]">
            {connectedFlow.features.map((f, i) => (
              <div
                key={f.name}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                className={cn(
                  "transition-opacity duration-500",
                  active === i ? "opacity-100" : "opacity-30",
                )}
              >
                <div className="font-mono text-[12px] tracking-[0.08em] text-birdseye-electric mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.012em] font-bold text-birdseye-cream">
                  {f.name}
                </h3>
                <p className="mt-4 text-body text-birdseye-cream/65 max-w-[460px]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right, sticky video canvas. The wrapper is `h-full` so the
              grid item explicitly stretches to fill the row, giving the
              sticky element its full scroll runway. */}
          <div ref={stickyContainerRef} className="relative h-full">
            <div className="sticky top-32">
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-birdseye-surface border border-birdseye-cream/[0.08]">
                {/* All 8 videos stacked. Active one at opacity-100, others
                    at opacity-0. Each is autoplay-loop-muted from mount. */}
                {SLUGS.map((s, i) => (
                  <video
                    key={s}
                    src={
                      images.connectedFlow[s] ?? images.connectedFlowDefault
                    }
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden={active !== i}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}

                {/* Bottom darken for system label */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                {/* Always-visible system label */}
                <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between">
                  <div className="system-label text-birdseye-cream flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-birdseye-success animate-pulse" />
                    {connectedFlow.features[active]?.name.toUpperCase()}
                  </div>
                  <div className="system-label text-birdseye-cream/45">
                    0{active + 1} / 0{connectedFlow.features.length}
                  </div>
                </div>

                {/* Progress rail down the right side */}
                <div className="absolute right-3 top-5 bottom-16 w-px bg-birdseye-cream/[0.10] hidden md:block">
                  <motion.div
                    animate={{
                      scaleY: (active + 1) / connectedFlow.features.length,
                    }}
                    transition={{ duration: DUR.smooth, ease: EASE_OUT }}
                    className="absolute inset-x-0 top-0 bg-birdseye-electric origin-top"
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
