"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { threeCores } from "@/_design/content";
import { PlatformAnimation } from "@/components/site/PlatformAnimation";
import { PlaceholderLabel } from "@/components/site/PlaceholderLabel";
import { DUR, EASE_OUT } from "@/_design/motion";


const SCENE_MS = 5000; // duration each core is "live" before advancing

const hrefs: Record<string, string> = {
  GateCore: "/platform/gatecore",
  SafeCore: "/platform/safecore",
  YardCore: "/platform/yardcore",
};

/**
 * One platform. Three intelligent cores.
 *
 * Naming note: the brand calls these GateCore / SafeCore / YardCore,
 * so the section refers to them as "cores", never "modules", across
 * the headline, eyebrow, card chrome, and aria labels. (Sitewide
 * rename, Scotty call.)
 *
 * Layout pivot: the previous version stacked the cinematic three-scene
 * animation above the three core cards. Visually impressive but the
 * connection between "what's playing" and "what each card is" was
 * invisible, the viewer had to read → scroll → watch → scroll → read.
 *
 * The new layout sits the animation and the cards side-by-side on
 * desktop. The animation lives on the left (~60% width), three
 * stacked cards on the right (~40%), and the active card always
 * matches what's playing. Cards are now interactive: hover or click
 * to jump the animation to that core. Auto-cycle still drives the
 * default flow, but a manual click resets the timer from that scene
 * so the user's last action plays in full.
 *
 * On phones the animation still sits on top with the cards stacked
 * below it (the side-by-side layout doesn't have the room).
 */
export function ThreeCores() {
  const [active, setActive] = useState<0 | 1 | 2>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start (or restart) the auto-cycle. Pulled into a ref so a manual
  // click on a card can reset the cycle, the next auto-advance fires
  // SCENE_MS after the click, not whenever the original timer fell.
  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((s) => ((s + 1) % 3) as 0 | 1 | 2);
    }, SCENE_MS);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const select = (i: 0 | 1 | 2) => {
    setActive(i);
    startCycle();
  };

  return (
    <section id="cores" className="section-dark relative py-24 md:py-section">
      <Container className="max-w-site">
        {/* Header */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="system-label text-birdseye-electric">YARD OS · CORES</span>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
              One platform. Three{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                intelligent
              </span>{" "}
              cores.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3"
          >
            {threeCores.subtitle}
          </motion.p>
        </div>

        {/* Stacked stage (2026-05-04 pivot, Scotty call): animation
            sits full-width on top, cards run 3-up beneath. Previous
            side-by-side layout was forcing the PlatformAnimation into
            a portrait container which letterboxed the 16:9 SVG. Going
            full-width gives the cinematic the canvas it deserves, and
            the cards become a horizontal tab row that's still
            interactive (hover/click drives the animation, same
            functionality as before). On phones the cards stack
            vertically — same single-column behaviour. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="flex flex-col gap-5 md:gap-6"
        >
          {/* Animation, full-width — native 16:9 aspect, no portrait
              squeeze. PlaceholderLabel sits inside the relative
              container so it positions against the animation's edges,
              not the section's. */}
          <div className="relative w-full">
            <PlatformAnimation active={active} />
            <PlaceholderLabel
              position="top-left"
              note="Final cinematic in production"
            />
          </div>

          {/* Three cards, equal-width row beneath. Each card click
              drives the animation; the active card is keyed to the
              current scene index. items-stretch makes the three cards
              share an identical height regardless of description
              length so the active-state border + progress bar all
              line up. */}
          <div
            role="tablist"
            aria-label="Choose a core to preview"
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-stretch"
          >
            {threeCores.cores.map((core, i) => (
              <CoreCard
                key={core.name}
                name={core.name}
                description={core.description}
                href={hrefs[core.name] ?? "#"}
                active={active === i}
                onSelect={() => select(i as 0 | 1 | 2)}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * One core card in the side-by-side stack.
 *
 * Two interactive surfaces:
 *  • The whole card is a `button` (role="tab") that drives the active
 *    scene above. Click / hover / focus all set the active core.
 *  • A nested "Explore →" link routes to the core's deep-dive page.
 *    The nested link has `stopPropagation` so a click on the link
 *    doesn't ALSO trigger the parent button.
 *
 * Editorial restraint pass (Scotty call): the card carries name,
 * one-sentence pitch, explore link. The active state is conveyed by
 * border + glow + bottom progress bar, no mono "CORE · 0X" ticker,
 * no LIVE / STANDBY pill, no all-caps tagline. The schematic on the
 * left already labels the playing scene; the card stays clean.
 */
function CoreCard({
  name,
  description,
  href,
  active,
  onSelect,
}: {
  name: string;
  description: string;
  href: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="cores-stage"
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className={`group relative flex h-full flex-col justify-between text-left rounded-2xl border overflow-hidden bg-birdseye-surface p-5 md:p-6 transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        active
          ? "border-birdseye-electric/55 shadow-[0_0_0_1px_rgba(46,75,255,0.20),0_20px_60px_-30px_rgba(46,75,255,0.40)]"
          : "border-birdseye-cream/[0.08] hover:border-birdseye-cream/[0.20]"
      }`}
    >
      {/* Editorial restraint: the card carries the core name, a one-
          sentence operational pitch, and the explore link. Active
          state = border tint + electric shadow + bottom progress
          hairline. No mono "CORE · 0X" ticker, no LIVE / STANDBY
          pill, no all-caps tagline.

          Layout: cards now sit in a 3-up row BELOW the full-width
          animation (2026-05-04 pivot from side-by-side). `flex flex-
          col justify-between` + `h-full` keeps the explore link
          anchored at the bottom while the title + description top-
          align — three cards with different description lengths read
          as a clean horizontal set. `overflow-hidden` on the button
          clips the progress hairline to the rounded corners (was
          escaping the bounding box; Scotty bug fix in same pass). */}

      <div>
        {/* Core name. Brand register: product/core names render in the
            BIRDSEYE wordmark style — ALL CAPS, heavy weight, tight
            tracking. Reuses font-sans (Inter) at black/900 weight to
            approximate the Integral CF Demi Bold visual heft from the
            brand spec without introducing a new typeface. */}
        <h3
          className={`font-sans font-black uppercase tracking-[-0.035em] leading-[0.95] text-[clamp(1.25rem,1.7vw,1.625rem)] transition-colors duration-500 ${
            active ? "text-birdseye-cream" : "text-birdseye-cream/85"
          }`}
        >
          {name}
        </h3>

        {/* Description, single sentence, the operational pitch. Kept
            tight so three cards fit the animation height on desktop.
            line-clamp-3 truncates to 3 lines if a description ever runs
            long. */}
        <p className="mt-2.5 text-[13.5px] leading-[1.5] text-birdseye-cream/60 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Explore link, nested inside the button. stopPropagation so a
          click on the link doesn't double-fire the parent's onSelect.
          Sits at the bottom of the flex container, naturally aligned
          across all three cards. */}
      <div>
        <Link
          href={href}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-[13px] text-birdseye-cream/80 group-hover:text-birdseye-electric transition-colors focus-visible:outline-none focus-visible:underline"
        >
          Explore {name}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      {/* Bottom progress hairline, fills while this card is active.
          Keyed by name + active so the bar resets on every state
          change (including manual click → restart). */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-birdseye-cream/[0.06] overflow-hidden rounded-b-2xl">
        <motion.div
          key={`bar-${name}-${active}`}
          initial={{ width: "0%" }}
          animate={{ width: active ? "100%" : "0%" }}
          transition={{
            duration: active ? 5 : 0.3,
            ease: active ? "linear" : EASE_OUT,
          }}
          className="h-full bg-birdseye-electric"
        />
      </div>
    </button>
  );
}
