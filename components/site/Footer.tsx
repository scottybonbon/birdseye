"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { company } from "@/_design/content";
import { NewsletterStrip } from "@/components/site/NewsletterStrip";

/**
 * The footer is a destination, not a dismissal.
 *
 * Layout, top → bottom:
 *   • generous top breathing room (extra when stacked under FooterCta so
 *     the layered card has room to overlap)
 *   • five-column link grid (Platform / Who We Serve / Resources / Results / Company)
 *   • address + phone + email LEFT, social icons RIGHT
 *   • legal row (copyright · privacy · terms · cookies · system status)
 *   • MASSIVE BIRDSEYE wordmark anchored at the bottom, Popcorn / Magic
 *     People energy. Slight bottom crop gives the cinematic edge.
 *
 * Easter egg: the wordmark has a cursor-tracked scan band that follows
 * vertical mouse position when hovered, brightening the letters under
 * the cursor. On-brand because it mirrors the Birdseye-vision scan beam
 * from PlatformAnimation.
 */
export function Footer({ pullUp = false }: { pullUp?: boolean }) {
  const topPadding = pullUp
    ? "pt-[14rem] md:pt-[18rem] -mt-[10rem] md:-mt-[12rem]"
    : "pt-24 md:pt-32";

  return (
    <footer className={`relative bg-black text-birdseye-cream overflow-hidden ${topPadding}`}>
      {/* Newsletter strip — sitewide newsletter signup, lands at the
          top of every footer (DEEP-4). Editorial register matches the
          rest of the site. Submit handler is placeholder client-state
          until a real backend is wired (see NewsletterStrip.tsx). */}
      <Container className="max-w-site relative mb-16 md:mb-24">
        <NewsletterStrip />
      </Container>

      <Container className="max-w-site relative">
        {/* Top row, link columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 lg:gap-x-12 mb-20 md:mb-28">
          <FooterCol
            title="Platform"
            links={[
              { label: "YARD OS", href: "/platform" },
              { label: "GateCore", href: "/platform/gatecore" },
              { label: "SafeCore", href: "/platform/safecore" },
              { label: "YardCore", href: "/platform/yardcore" },
              { label: "Integrations", href: "/platform/integrations" },
            ]}
          />
          <FooterCol
            title="Who We Serve"
            links={[
              { label: "3PL & Logistics", href: "/industries/logistics" },
              { label: "Warehousing", href: "/industries/warehousing" },
              { label: "Manufacturing", href: "/industries/manufacturing" },
              { label: "Supply Chain", href: "/industries/supply-chain" },
              { label: "Automotive", href: "/industries/automotive" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { label: "Blog", href: "/blog" },
              { label: "Guides", href: "/guide" },
              { label: "Videos", href: "/video" },
              { label: "Checklists", href: "/checklist" },
              { label: "News", href: "/news" },
              { label: "Events", href: "/event" },
              { label: "Press", href: "/press" },
              { label: "Security & compliance", href: "/security" },
            ]}
          />
          <FooterCol
            title="Results"
            links={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "By the Numbers", href: "/results" },
              { label: "ROI Calculator", href: "/roi-calculator" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About Us", href: "/about-us" },
              { label: "A note from Mike", href: "/letter" },
              { label: "Careers", href: "/career" },
              { label: "Contact", href: "/contact" },
              { label: "Book a demo", href: "/book-a-demo" },
            ]}
          />
        </div>

        {/* Address (left) + social icons (right) */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 pb-10 mb-10 border-b border-birdseye-cream/[0.10] items-center">
          <div className="text-[14px] leading-[1.7] text-birdseye-cream/55 max-w-[460px]">
            <p className="text-birdseye-cream font-semibold tracking-[-0.005em]">
              {company.name}
              <span className="text-birdseye-cream/40 font-normal">
                {" "} The Yard Operating System
              </span>
            </p>
            <p className="mt-2">{company.address}</p>
            <p className="mt-1">
              <Link
                href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
                className="hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric/60 focus-visible:rounded-sm transition-[colors,transform,box-shadow] duration-150"
              >
                {company.phone}
              </Link>
              <span className="mx-2 text-birdseye-cream/20">·</span>
              <Link
                href={`mailto:${company.email}`}
                className="hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric/60 focus-visible:rounded-sm transition-[colors,transform,box-shadow] duration-150"
              >
                {company.email}
              </Link>
            </p>
          </div>
          <SocialIcons />
        </div>

        {/* Legal row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 md:mb-20 font-mono text-[11px] tracking-[0.16em] text-birdseye-cream/35 uppercase">
          <span>{company.copyright}</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric/60 focus-visible:rounded-sm transition-[colors,transform,box-shadow] duration-150">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric/60 focus-visible:rounded-sm transition-[colors,transform,box-shadow] duration-150">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric/60 focus-visible:rounded-sm transition-[colors,transform,box-shadow] duration-150">
              Cookies
            </Link>
          </div>
          <span aria-hidden className="text-birdseye-cream/35">
            {/* Operational pill removed entirely. Linked to /status
                which is no longer customer-facing in nav. The brand
                version stamp wasn't earning its place in the legal
                row anyway. */}
          </span>
        </div>
      </Container>

      <BirdseyeWordmark />
    </footer>
  );
}

/* ─────────────── Massive wordmark ───────────────
   Easter egg: the entire wordmark is opted into the custom cursor's
   "magnify" mode (data-cursor="magnify"). The CustomCursor reads that
   attribute and balloons the dot up to ~280px while it's over the word.
   Combined with mix-blend-difference on the cursor, the cream letters
   underneath invert to dark, like a magnifier passing over the word. */

function BirdseyeWordmark() {
  return (
    <div
      aria-hidden
      data-cursor="magnify"
      className="relative w-full overflow-hidden -mb-[1.5vw] select-none cursor-default"
      style={{ paddingBottom: "0.5rem" }}
    >
      <div className="text-center font-sans font-black text-[clamp(7rem,21vw,22rem)] leading-[0.82] tracking-[-0.06em] text-birdseye-cream">
        BIRDSEYE
      </div>
    </div>
  );
}

/* ─────────────── Social icons row ─────────────── */

function SocialIcons() {
  const items = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/birdseye-security-solutions/", icon: <LinkedInIcon /> },
    { label: "X / Twitter", href: "https://x.com/birdseyesec", icon: <XIcon /> },
    { label: "Instagram", href: "https://www.instagram.com/birdseyesecurity/", icon: <InstagramIcon /> },
    { label: "Facebook", href: "https://www.facebook.com/birdseyesecurity", icon: <FacebookIcon /> },
    { label: "TikTok", href: "https://www.tiktok.com/@birdseyesecurity", icon: <TikTokIcon /> },
  ];
  return (
    <div className="flex items-center gap-1 lg:justify-end">
      <span className="font-mono text-[10px] tracking-[0.18em] text-birdseye-cream/35 uppercase mr-3">
        Follow
      </span>
      {items.map((s) => (
        <Link
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener"
          aria-label={s.label}
          className="grid place-items-center h-10 w-10 rounded-full border border-birdseye-cream/15 text-birdseye-cream/70 hover:text-birdseye-cream hover:border-birdseye-cream/45 hover:bg-birdseye-cream/[0.04] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[colors,transform,box-shadow] duration-150"
        >
          {s.icon}
        </Link>
      ))}
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.018 4.388 11.005 10.125 11.927V15.56H7.078v-3.488h3.047V9.413c0-3.017 1.792-4.683 4.532-4.683 1.313 0 2.686.235 2.686.235v2.969h-1.514c-1.491 0-1.956.93-1.956 1.886v2.252h3.328l-.532 3.488h-2.796v8.44C19.612 23.078 24 18.091 24 12.073z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.86a4.78 4.78 0 0 1-1.84-.17z" />
    </svg>
  );
}

/* ─────────────── Link column ─────────────── */

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/45 uppercase mb-5">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14.5px] text-birdseye-cream/80 hover:text-birdseye-cream active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric/60 focus-visible:rounded-sm transition-[colors,transform,box-shadow] duration-150 group inline-flex items-center gap-1.5"
            >
              <span className="border-b border-transparent group-hover:border-birdseye-cream/30 group-hover:translate-x-0.5 transition-[transform,colors,border-color] duration-150">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
