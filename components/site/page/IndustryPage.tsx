import Image from "next/image";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { FeatureGrid } from "@/components/site/page/FeatureGrid";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/_design/content";

/**
 * Shared shell for industry pages. Each industry plugs in its own
 * copy and stat block; the layout stays consistent across all five.
 *
 * The optional `heroImage` prop renders a full-bleed photographic
 * break between the PageHero and the intro narrative, turns the
 * page from text-only into a vertical-anchored editorial spread, in
 * line with the v2 audit's #1 Birdseye-vs-Birdseye gap (industry
 * pages were the most undertreated surfaces on the site).
 *
 * The optional `namedOutcomeCustomers` prop renders a quiet two-card
 * proof row between the intro narrative and the FeatureGrid. Pass
 * `customerIndex` strings (e.g. ["01", "06"]) and the row looks up
 * the matching entries from `testimonials.cards`. Same vocabulary as
 * the /results named-outcomes block, but lighter (two cards, calmer
 * register), so the proof primes the feature read without crowding
 * the section.
 */
export function IndustryPage({
  eyebrow,
  hero,
  heroImage,
  intro,
  namedOutcomeCustomers,
  capabilities,
  metrics,
  outcomes,
}: {
  eyebrow: string;
  hero: {
    preTitle: string;
    italicTitle: string;
    postTitle: string;
    tagline: string;
    description: string;
  };
  heroImage?: { src: string; alt: string; caption: string };
  intro: { heading: string; paragraphs: string[] };
  namedOutcomeCustomers?: string[];
  capabilities: { title: string; body: string }[];
  metrics: { value: string; label: string }[];
  outcomes: { title: string; body: string }[];
}) {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow={eyebrow}
        preTitle={hero.preTitle}
        italicTitle={hero.italicTitle}
        postTitle={hero.postTitle}
        tagline={hero.tagline}
        description={hero.description}
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "See case studies", href: "/case-studies" }}
      />

      {heroImage && <IndustryHeroPhoto image={heroImage} />}

      {/* Intro narrative */}
      <section className="section-dark py-24 md:py-section">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="system-label text-birdseye-electric">THE CONTEXT</span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
                {intro.heading}
              </h2>
            </div>
            <div className="space-y-5 text-body text-birdseye-cream/65 max-w-[560px]">
              {intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {namedOutcomeCustomers && namedOutcomeCustomers.length > 0 && (
        <NamedOutcomesRow customerIndexes={namedOutcomeCustomers} />
      )}

      <FeatureGrid
        eyebrow="WHAT BIRDSEYE COVERS"
        preTitle="Built for"
        italicTitle="this"
        postTitle="industry."
        description="The exact capabilities operators in this segment depend on, every shift."
        features={capabilities}
      />

      <MetricStrip
        eyebrow="THE NUMBERS"
        preTitle="The proof,"
        italicTitle="counted"
        postTitle="."
        description="Operator-reported outcomes from active deployments in this segment."
        metrics={metrics}
      />

      <FeatureGrid
        eyebrow="THE OUTCOMES"
        preTitle="What"
        italicTitle="changes"
        postTitle="when Birdseye is on."
        description="The operational lift our customers in this segment consistently report."
        features={outcomes}
        columns={2}
      />

      <CtaBanner
        preTitle="Show us"
        italicTitle="your"
        postTitle="yard."
        description="20-minute walkthrough. No deck. We'll work with what you have."
        secondaryCta={{ label: "Read the case studies", href: "/case-studies" }}
      />
    </PageShell>
  );
}

/**
 * Named outcomes row, the per-industry proof beat.
 *
 * Looks up customer entries from `testimonials.cards` by their
 * `customerIndex` strings (passed by the calling page) and renders
 * each as a quiet two-up card row: company + role + the operational
 * outcome chip (electric pill, mono caps) + a short quote excerpt.
 *
 * Same vocabulary as the /results named-outcomes block, lighter:
 * fewer cards, calmer register, more breathing room. Reads as
 * "operators in this space already trust Birdseye, here's the proof,"
 * sitting between the intro narrative ("here's the context") and the
 * FeatureGrid ("here's what we do about it").
 *
 * If a passed customerIndex doesn't resolve, it's silently dropped
 * so the page still renders. Designed to be quiet and concrete.
 */
function NamedOutcomesRow({
  customerIndexes,
}: {
  customerIndexes: string[];
}) {
  const cards = customerIndexes
    .map((idx) => testimonials.cards.find((c) => c.customerIndex === idx))
    .filter((c): c is (typeof testimonials.cards)[number] => Boolean(c));

  if (cards.length === 0) return null;

  return (
    <section className="section-dark py-20 md:py-24 border-t border-birdseye-cream/[0.08]">
      <Container className="max-w-site">
        <div className="mb-10 md:mb-12">
          <span className="system-label text-birdseye-electric">
            OPERATORS IN THIS SPACE
          </span>
          <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.018em] font-bold text-birdseye-cream text-balance max-w-[640px]">
            Trusted on the{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              real
            </span>{" "}
            yards in this industry.
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-birdseye-cream/[0.08] rounded-card overflow-hidden border border-birdseye-cream/[0.08]">
          {cards.map((c) => (
            <li
              key={c.customerIndex}
              className="bg-birdseye-surface/60 px-7 py-7 md:px-8 md:py-9 flex flex-col"
            >
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/35">
                Customer · {c.customerIndex}
              </div>

              <div className="mt-3 text-[16.5px] font-semibold text-birdseye-cream leading-[1.25]">
                {c.company}
              </div>
              <div className="mt-1 text-[13px] text-birdseye-cream/45">
                {c.role}
              </div>

              {c.metric && (
                <span className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-birdseye-electric/30 bg-birdseye-electric/[0.08] px-3 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-birdseye-electric">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-birdseye-electric"
                  />
                  {c.metric}
                </span>
              )}

              <p className="mt-5 text-[14px] leading-[1.55] text-birdseye-cream/60 max-w-[440px] flex-1">
                &ldquo;
                {c.quote.length > 140
                  ? c.quote.slice(0, 138).trimEnd() + "…"
                  : c.quote}
                &rdquo;
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * Full-bleed industry photograph. Sits as a section break between
 * the PageHero and the intro narrative, the photograph carries the
 * vertical specificity that text alone never quite delivers.
 *
 * Visual treatment:
 *  - 21:9 cinematic aspect on desktop, slightly squarer on mobile so
 *    subjects don't get sliced.
 *  - A subtle bottom gradient mask preserves cream caption legibility.
 *  - Mono-caps "ARCHIVE · {INDUSTRY} · {YEAR}" anchored bottom-left
 *    with a small electric eye-pulse, same vocabulary as the about
 *    page ArchiveFrame and the SystemConsole event log.
 *  - `priority` on the image since it sits above the fold on mobile.
 */
function IndustryHeroPhoto({
  image,
}: {
  image: { src: string; alt: string; caption: string };
}) {
  return (
    <section className="relative section-dark">
      <div className="relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9] w-full overflow-hidden border-y border-birdseye-cream/[0.08]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

        {/* Bottom gradient mask, protects caption legibility without
            flattening the photograph. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />

        {/* Top mask, softens the photo's transition out of the
            PageHero so the caesura reads as a continuation, not a cut. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent"
        />

        {/* Caption, bottom-left, mono caps with an electric pulse
            dot. Reads as a forensic file label, not a marketing tag. */}
        <div className="absolute left-6 md:left-10 bottom-6 md:bottom-8 flex items-center gap-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-birdseye-cream/85">
          <span className="relative grid place-items-center h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-birdseye-electric" />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-birdseye-electric animate-ping opacity-50 motion-reduce:animate-none"
            />
          </span>
          {image.caption}
        </div>
      </div>
    </section>
  );
}
