"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * NewsroomStrip, "Today on the yard" row.
 *
 * The smallest possible signal that the site is a live operation: three
 * recently-published items in mixed registers (release notes, news,
 * field note / blog) shown as mono datelines + headline + arrow. No
 * hero imagery, no preview thumbnails, the brand discipline is "this
 * is the news ticker on the wall in the command center," not "magazine
 * archive."
 *
 * Where it lives: between LogoMarquee (trust handshake) and the SYSTEM
 * interlude (start of the tour). Acts as a beat that says "we publish,
 * we ship, we're alive" before the buyer is asked to absorb the
 * platform tour.
 *
 * Honest scope:
 *   • The CHANGELOG entry is real, pulled from /changelog, current
 *     v1.4 release dated 2026-05-02.
 *   • The BLOG and NEWS entries reference real article topics from the
 *     live birdseyesecurity.com archives (audit-confirmed) but link to
 *     the archive landing page, not deep-link to specific posts that
 *     may not yet exist in our headless WordPress mirror.
 *   • TODO(scotty-confirm): once the WP fetch layer surfaces actual
 *     latest-3 headlines per archive type, swap the static `ITEMS`
 *     array for a server-side fetch and the rest of the chrome stays.
 */

type Item = {
  /** Display tag, mono caps, electric. The "type" of content. */
  tag: string;
  /** Mono dateline, uppercase, short. */
  dateline: string;
  /** Headline body, sentence case, balanced for line-length. */
  headline: string;
  /** Where the click lands. */
  href: string;
};

const ITEMS: Item[] = [
  {
    tag: "FIELD NOTE",
    dateline: "APR 28 · 2026",
    headline:
      "License plate readers in 2026: how AI is redefining gate control.",
    href: "/blog",
  },
  {
    tag: "NEWS",
    dateline: "APR 18 · 2026",
    headline:
      "How supply chain leaders are using AI to defeat digital cargo theft.",
    href: "/news",
  },
  {
    // 2026-05-04: replaced the internal "YOS v1.4 ships" release post
    // (Scotty call — internal product changelog isn't customer-facing
    // and didn't belong on the about-us strip). Sourced a second blog
    // entry to keep the strip at three items. When the WP fetch layer
    // surfaces actual latest-3 headlines per archive type (per the
    // TODO at the top of this file), the static array goes away.
    tag: "FIELD NOTE",
    dateline: "APR 09 · 2026",
    headline:
      "Why guard rotations cost more than they detect — and how Voice-Down™ closes the gap.",
    href: "/blog",
  },
];

export function NewsroomStrip() {
  return (
    <section
      aria-label="Today on the yard"
      className="section-dark relative py-12 md:py-14 border-y border-birdseye-cream/[0.06]"
    >
      <Container className="max-w-site">
        {/* Header row, single mono caps line, electric pulse + label
            on the left, "view archive" links on the right. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="flex items-center justify-between gap-4 mb-7 md:mb-8 font-mono text-[10px] tracking-[0.22em] uppercase"
        >
          <span className="flex items-center gap-2.5 text-birdseye-cream/55">
            <span className="relative grid place-items-center h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-birdseye-electric" />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-birdseye-electric animate-ping opacity-50 motion-reduce:animate-none"
              />
            </span>
            Today on the yard
          </span>
          <span className="hidden sm:flex items-center gap-5 text-birdseye-cream/30">
            <Link
              href="/changelog"
              className="hover:text-birdseye-cream/80 transition-colors"
            >
              Releases
            </Link>
            <span aria-hidden className="text-birdseye-cream/15">·</span>
            <Link
              href="/blog"
              className="hover:text-birdseye-cream/80 transition-colors"
            >
              Field notes
            </Link>
            <span aria-hidden className="text-birdseye-cream/15">·</span>
            <Link
              href="/news"
              className="hover:text-birdseye-cream/80 transition-colors"
            >
              News
            </Link>
          </span>
        </motion.div>

        {/* Three items, equal columns on md+, stacked on phones.
            Hairline divides between rows on mobile, hairline divides
            between columns on desktop. */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-birdseye-cream/[0.06] rounded-card overflow-hidden border border-birdseye-cream/[0.08]">
          {ITEMS.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: DUR.smooth,
                ease: EASE_OUT,
                delay: i * 0.08,
              }}
              className="bg-birdseye-surface/40"
            >
              <Link
                href={item.href}
                className="group block h-full px-5 md:px-6 py-5 md:py-6 hover:bg-birdseye-surface/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-inset"
              >
                <div className="flex items-center gap-3 mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                  <span className="text-birdseye-electric">{item.tag}</span>
                  <span aria-hidden className="text-birdseye-cream/15">
                    ·
                  </span>
                  <span className="text-birdseye-cream/40 tabular-nums">
                    {item.dateline}
                  </span>
                </div>
                <p className="text-[15.5px] md:text-[16px] leading-[1.4] tracking-[-0.005em] text-birdseye-cream/85 group-hover:text-birdseye-cream transition-colors text-balance">
                  {item.headline}{" "}
                  <span
                    aria-hidden
                    className="inline-block text-birdseye-cream/30 group-hover:text-birdseye-electric group-hover:translate-x-0.5 transition-[colors,transform]"
                  >
                    →
                  </span>
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
