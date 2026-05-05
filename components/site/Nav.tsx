"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { company, nav, type NavGroup, type NavFeatured } from "@/_design/content";
import { cn } from "@/lib/cn";
import { NavIconGlyph } from "@/components/site/icons/NavIcons";
import { BrandGradient } from "@/components/site/BrandGradient";
import { DUR, EASE_OUT } from "@/_design/motion";
import { ArrowRight, ChevronDown, MenuIcon } from "@/components/site/icons/Icons";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open (iOS-safe pattern)
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileOpen]);

  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenLabel(label);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenLabel(null), 130);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled
            ? "backdrop-blur-md bg-black/75 border-b border-birdseye-cream/[0.08]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <Container className={cn("flex items-center justify-between gap-6 transition-[height] duration-300", scrolled ? "h-[60px]" : "h-[72px]")}>
          {/* Wordmark, Birdseye brand sans, slightly heavier and tighter
              than nav links so it reads as a logotype. The terminal-
              cursor blink that used to live here was removed on the
              reserved-register pivot (2026-05-02), it read as too
              terminal / control-room for the polished editorial brand.
              The wordmark now stands on its own. */}
          <Link
            href="/"
            className={cn(
              "font-sans text-[21px] md:text-[23px] font-bold tracking-[-0.01em] text-birdseye-cream shrink-0 transition-transform duration-300",
              scrolled ? "scale-[0.92]" : "scale-100",
            )}
            aria-label={`${company.name} home`}
          >
            {company.name}
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
            onMouseLeave={closeSoon}
          >
            {nav.groups.map((group) => (
              <NavTrigger
                key={group.label}
                group={group}
                isOpen={openLabel === group.label}
                onOpen={() => openNow(group.label)}
                onClose={closeSoon}
              />
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={nav.cta.href}
              className="hidden md:inline-flex group items-center gap-2.5 rounded-pill bg-birdseye-electric text-birdseye-cream pl-5 pr-1.5 h-10 font-medium text-[14px] shadow-glow hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 animate-idle-pulse hover:[animation:none]"
            >
              {nav.cta.label}
              <span className="grid place-items-center h-7 w-7 rounded-full bg-birdseye-cream text-birdseye-electric group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              className="lg:hidden h-10 w-10 grid place-items-center text-white/85 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
            >
              <MenuIcon open={mobileOpen} className="h-5 w-5" />
            </button>
          </div>
        </Container>

        {/* Mega-menu panel container, anchored below the bar.
            Wide groups fill the container; compact groups (Company) get a
            narrower right-aligned card that visually anchors to the right
            side of the nav, matching its trigger position. */}
        <AnimatePresence>
          {openLabel && (() => {
            const group = nav.groups.find((g) => g.label === openLabel)!;
            const isCompact = group.layout === "compact";
            return (
              <motion.div
                key={openLabel}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: DUR.fast, ease: EASE_OUT }}
                onMouseEnter={() => openNow(openLabel)}
                onMouseLeave={closeSoon}
                className="hidden lg:block absolute inset-x-0 top-full"
              >
                <div className="mx-auto max-w-container px-6 md:px-8 pb-6">
                  <div
                    className={cn(
                      "rounded-2xl border border-birdseye-cream/[0.08] bg-black/95 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden",
                      isCompact ? "ml-auto w-[380px]" : "w-full",
                    )}
                  >
                    <MegaPanel
                      group={group}
                      onSelect={() => setOpenLabel(null)}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </header>

      {/* Mobile slide-in */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.fast }}
            className="lg:hidden fixed inset-0 top-[72px] z-40 bg-birdseye-navy/98 backdrop-blur-md overflow-y-auto"
          >
            <Container className="py-8">
              {nav.groups.map((group) => (
                <div key={group.label} className="mb-6 pb-6 border-b border-birdseye-border last:border-0">
                  <div className="system-label text-birdseye-electric mb-3">
                    {group.label}
                  </div>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-[18px] text-birdseye-cream hover:text-birdseye-electric transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href={nav.cta.href}
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-pill bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[15px] w-full active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                {nav.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavTrigger({
  group,
  isOpen,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onMouseLeave={onClose}
      onBlur={onClose}
      className={cn(
        "px-4 h-9 inline-flex items-center text-[13.5px] transition-colors relative",
        isOpen ? "text-birdseye-cream" : "text-birdseye-cream/65 hover:text-birdseye-cream",
      )}
    >
      {group.label}
      {/* Hairline underline indicator on hover/open, no chevron */}
      <span
        className={cn(
          "pointer-events-none absolute left-4 right-4 -bottom-px h-px bg-birdseye-cream origin-left transition-transform duration-300",
          isOpen ? "scale-x-100" : "scale-x-0",
        )}
      />
    </button>
  );
}

/* ─────────────── Mega panel ───────────────
   Two layouts:
   • wide    → items in a 2-col icon grid on the left (8/12), featured
               callout panel on the right rail (4/12). Used for Platform,
               Who We Serve, Resources, Results.
   • compact → narrow single-column list with no featured rail. Used for
               Company. The container above sets a 380px width and right-
               aligns it under the trigger.

   Wide layout uses COLUMN-FLOW grid: items fill the left column top-to-
   bottom, then the right column. The data order in `_design/content.ts`
   determines reading order. ceil(N/2) sets the rows per column, so a
   group of 5 becomes [3 left, 2 right], a group of 6 becomes [3, 3].
*/
function MegaPanel({
  group,
  onSelect,
}: {
  group: NavGroup;
  onSelect: () => void;
}) {
  const isCompact = group.layout === "compact";

  if (isCompact) {
    return (
      <div className="p-4">
        <div className="mb-3 px-2 font-mono text-[10.5px] tracking-[0.2em] text-birdseye-cream/35 uppercase">
          {group.label}
        </div>
        <div className="space-y-0.5">
          {group.items.map((item) => (
            <MegaItem key={item.label} item={item} onSelect={onSelect} />
          ))}
        </div>
      </div>
    );
  }

  // Tailwind needs to see these class strings literally for purging.
  const rows = Math.ceil(group.items.length / 2);
  const rowClasses: Record<number, string> = {
    1: "md:[grid-template-rows:repeat(1,auto)]",
    2: "md:[grid-template-rows:repeat(2,auto)]",
    3: "md:[grid-template-rows:repeat(3,auto)]",
    4: "md:[grid-template-rows:repeat(4,auto)]",
  };
  const rowsClass = rowClasses[rows] ?? rowClasses[3];

  return (
    <div className="grid grid-cols-12 gap-0">
      {/* Left, items grid */}
      <div className="col-span-8 p-5 lg:p-6">
        {/* Eyebrow above the items, system label, mirrors brand tone */}
        <div className="mb-4 px-3 font-mono text-[10.5px] tracking-[0.2em] text-birdseye-cream/40 uppercase">
          {group.label}
        </div>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-flow-col gap-x-3 gap-y-1",
            rowsClass,
          )}
        >
          {group.items.map((item) => (
            <MegaItem key={item.label} item={item} onSelect={onSelect} />
          ))}
        </div>
      </div>

      {/* Right, featured callout rail. Border line is brighter against
          the new gradient surface so it reads as a true divider. */}
      {group.featured && (
        <div className="col-span-4 p-3 lg:p-4 border-l border-birdseye-cream/[0.10]">
          <FeaturedCallout featured={group.featured} onSelect={onSelect} />
        </div>
      )}
    </div>
  );
}

/* ─────────────── Single nav item ─────────────── */
function MegaItem({
  item,
  onSelect,
}: {
  item: NavGroup["items"][number];
  onSelect: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className="group/item relative flex items-start gap-3.5 rounded-xl px-3 py-3 hover:bg-birdseye-cream/[0.04] transition-colors"
    >
      {/* Icon tile, small, tinted square. Becomes electric blue on hover. */}
      <span className="relative grid place-items-center h-9 w-9 shrink-0 rounded-lg border border-birdseye-cream/10 bg-birdseye-cream/[0.025] text-birdseye-cream/70 group-hover/item:border-birdseye-electric/45 group-hover/item:bg-birdseye-electric/[0.12] group-hover/item:text-birdseye-cream transition-colors">
        <NavIconGlyph name={item.icon} className="h-[18px] w-[18px]" />
      </span>
      <span className="flex-1 min-w-0 pt-0.5">
        <span className="flex items-center gap-1.5">
          <span className="text-[14px] text-birdseye-cream font-medium leading-[20px] tracking-[-0.005em]">
            {item.label}
          </span>
          <ArrowRight className="h-3 w-3 text-birdseye-cream/0 group-hover/item:text-birdseye-cream/55 group-hover/item:translate-x-0.5 transition-all" />
        </span>
        {item.description && (
          <span className="mt-0.5 block text-[12.5px] text-birdseye-cream/50 leading-[18px]">
            {item.description}
          </span>
        )}
      </span>
    </Link>
  );
}

/* ─────────────── Featured rail callout ───────────────
   Three tones, electric (brand blue panel), cream (inverted, subtle),
   default (dark elevated). All share the same anatomy: eyebrow → title
   → description → CTA pill at bottom. */
function FeaturedCallout({
  featured,
  onSelect,
}: {
  featured: NavFeatured;
  onSelect: () => void;
}) {
  const tone = featured.tone ?? "default";

  const toneClasses = {
    electric: "bg-birdseye-electric text-birdseye-cream",
    cream: "bg-birdseye-cream text-black",
    default: "bg-birdseye-cream/[0.04] text-birdseye-cream border border-birdseye-cream/[0.07]",
  }[tone];

  const eyebrowClasses = {
    electric: "text-birdseye-cream/70",
    cream: "text-black/55",
    default: "text-birdseye-cream/45",
  }[tone];

  const descClasses = {
    electric: "text-birdseye-cream/85",
    cream: "text-black/70",
    default: "text-birdseye-cream/65",
  }[tone];

  const ctaClasses = {
    electric: "bg-birdseye-cream text-birdseye-electric hover:bg-birdseye-cream/90",
    cream: "bg-black text-birdseye-cream hover:bg-black/85",
    default: "bg-birdseye-cream text-black hover:bg-birdseye-cream/90",
  }[tone];

  return (
    <Link
      href={featured.href}
      onClick={onSelect}
      className={cn(
        "group/feat relative flex flex-col h-full min-h-[240px] rounded-xl p-5 overflow-hidden transition-transform",
        // Electric tone uses BrandGradient as its surface, so we don't
        // apply a flat background class for it, content sits above the
        // gradient layer below.
        tone === "electric" ? "text-birdseye-cream" : toneClasses,
      )}
    >
      {/* Electric tone, atmospheric brand-blue surface with grain */}
      {tone === "electric" && <BrandGradient variant="card" />}

      <div className="relative flex flex-col h-full">
        {featured.eyebrow && (
          <div className={cn("font-mono text-[10px] tracking-[0.2em] uppercase mb-3", eyebrowClasses)}>
            {featured.eyebrow}
          </div>
        )}

        <div className="text-[18px] leading-[1.25] font-semibold tracking-[-0.01em]">
          {featured.title}
        </div>

        <div className={cn("mt-2 text-[13px] leading-[1.5]", descClasses)}>
          {featured.description}
        </div>

        <div className="mt-auto pt-5">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-pill h-8 px-3.5 text-[12.5px] font-medium transition-colors",
              ctaClasses,
            )}
          >
            {featured.cta ?? "Learn more"}
            <ArrowRight className="h-3.5 w-3.5 group-hover/feat:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
