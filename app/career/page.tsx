import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import {
  CareerListings,
  type CareerCard,
} from "@/components/site/page/CareerListings";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { TeamGlobe } from "@/components/site/page/TeamGlobe";
import { CareerChallenges } from "@/components/site/page/CareerChallenges";
import { CareerCulture } from "@/components/site/page/CareerCulture";
import { listResources, stripHtml, getCareerMeta } from "@/lib/wp";

export const metadata = {
  title: "Careers, Birdseye",
  description:
    "Help build the operating system for North American yards. Open roles across engineering, operations, and security in Mississauga, Dallas, Belgrade, and Bogotá.",
};

export const revalidate = 3600;

/**
 * Careers page, composed inline (rather than via ResourceArchive) so the
 * TeamGlobe, CareerChallenges, and CareerCulture can sit between the hero
 * and the open-roles grid. Same data pipeline as the other resource archives,
 * just unrolled.
 */
export default async function CareerPage() {
  const { items } = await listResources("career", { perPage: 60 });

  // Career listings are split out from the generic ResourceGrid (DEEP-3)
  // so we can render department filter chips + per-card metadata
  // (location, employment type, level). When WP hasn't surfaced any of
  // these meta fields yet, the cards still render — the meta block just
  // collapses, and the filter chips hide entirely (showFilters=false in
  // CareerListings) so the UI doesn't read as broken.
  const roles: CareerCard[] = items.map((p) => {
    const m = getCareerMeta(p);
    return {
      title: stripHtml(p.title.rendered),
      description: stripHtml(p.excerpt.rendered).slice(0, 200),
      href: `/career/${p.slug}`,
      dateIso: p.date,
      department: m.department,
      location: m.location,
      employment_type: m.employment_type,
      experience_level: m.experience_level,
      apply_url: m.apply_url,
    };
  });

  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="COMPANY · CAREERS"
        preTitle="Help us build the"
        italicTitle="future"
        postTitle="of yards."
        tagline="Engineering, operations, security, and growth, across Canada and the US."
        description="Birdseye is hiring across every team. If you care about modernizing how the physical world runs, we want to hear from you."
      />

      {/* Where we are, dot-globe with the four city pins */}
      <TeamGlobe />

      <CareerChallenges />

      <CareerCulture />

      {roles.length > 0 ? (
        <>
          <CareerListings roles={roles} />

          {/* "Looking for a different role?" inline callout (FIGMA-6).
              Sits between the open-roles grid and the bottom CtaBanner so
              candidates whose role isn't posted see it without scrolling
              past everything. Same intent as the closing banner, in a
              more conversational register. */}
          <section className="section-dark py-16 md:py-20 border-t border-birdseye-cream/[0.06]">
            <div className="max-w-site mx-auto px-6 md:px-8">
              <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
                <div>
                  <span className="system-label text-birdseye-electric mb-3 block">
                    DIFFERENT ROLE
                  </span>
                  <h2 className="text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream">
                    Looking for a role we{" "}
                    <span className="font-serif italic font-normal text-birdseye-electric">
                      haven&apos;t
                    </span>{" "}
                    posted yet?
                  </h2>
                  <p className="mt-4 text-body text-birdseye-cream/65 max-w-[480px]">
                    Most of our best hires arrived before the role existed.
                    If you&apos;re great at something we should be hiring for,
                    tell us — we&apos;ll figure out where you fit.
                  </p>
                </div>
                <div className="lg:flex lg:justify-end">
                  <a
                    href="mailto:hello@birdseyesecurity.ca?subject=Future%20role%20at%20Birdseye"
                    className="inline-flex items-center gap-2 rounded-full border border-birdseye-cream/15 text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-cream/[0.04] hover:border-birdseye-cream/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
                  >
                    Send a note
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="section-dark py-24 md:py-32" id="open-roles">
          <div className="max-w-site mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-[180px_1fr] gap-10 lg:gap-16 items-start">
              {/* Left rail, masthead */}
              <div className="lg:pt-2">
                <div className="system-label text-birdseye-electric mb-2">
                  OPEN ROLES · 0 LISTED
                </div>
                <div className="system-label text-birdseye-cream/45">
                  CAREERS · {new Date().getFullYear()}
                </div>
              </div>

              {/* Right column, editorial body */}
              <div className="max-w-[640px]">
                <h2 className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em] font-bold text-birdseye-cream text-balance">
                  Nothing posted today, but the door&apos;s{" "}
                  <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                    open
                  </span>
                  .
                </h2>
                <p className="mt-6 text-body text-birdseye-cream/65 max-w-copy">
                  We hire ahead of the work. If what you read above sounds
                  like a fit, send a note, most of our best hires came in
                  before the role existed.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <a
                    href="mailto:hello@birdseyesecurity.ca?subject=Future%20role%20at%20Birdseye"
                    className="inline-flex items-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
                  >
                    Send a note
                  </a>
                  <span className="system-label text-birdseye-cream/40">
                    HELLO@BIRDSEYESECURITY.CA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        preTitle="Don't see your"
        italicTitle="fit"
        postTitle="?"
        description="Send us a note anyway, we're always meeting people we'll want to hire later."
      />
    </PageShell>
  );
}
