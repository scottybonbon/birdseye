import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export const metadata = {
  title: "Partner Program · Birdseye",
  description:
    "Join the network bringing Maximum Telepresence to North American yards. Three partner tracks: Channel, Technology, and Service.",
};

/**
 * /partner-program — three-tier ecosystem partner program landing.
 *
 * LIVE-1 (2026-05-03): the live birdseyesecurity.com has a partner
 * program; the new site didn't. The program is one of the most
 * important growth surfaces — without channel + integration + service
 * partners, Birdseye is competing only on its own sales bandwidth.
 *
 * Architecture:
 *  1. PageMasthead + PageHero — editorial set-up
 *  2. Premise — why we partner, the work that lives outside our walls
 *  3. ThreeTracks — Channel, Technology, Service tracks side-by-side
 *  4. WhatYouGet / WhatWeAskFor — two-column commitment ledger
 *  5. FeaturedPartners — three placeholder partner cards (real names
 *     swap in via /_placeholders.md when partnerships sign)
 *  6. MetricStrip — partner-program-level numbers
 *  7. ApplyCTA — entry point to the partner inbox
 *  8. CtaBanner
 *
 * Placeholder content: Featured Partners are anonymized for now
 * (e.g. "A leading TMS platform"); REPLACE WITH real names when
 * Mike confirms partnerships and permissions to attribute.
 */
export default function PartnerProgramPage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="PARTNER PROGRAM · BIRDSEYE NETWORK"
        preTitle="Build with us. Sell with us."
        italicTitle="Show up"
        postTitle=" with us."
        tagline="Three partner tracks. One operating system for North American yards."
        description="The work of modernizing yards is bigger than one company. We partner with the integrators who deploy Birdseye, the platforms that connect to it, and the service teams that keep it running — and we share the deal economics, the customer success, and the credit."
        primaryCta={{ label: "Apply to partner", href: "#apply" }}
        secondaryCta={{
          label: "Talk to partnerships",
          href: "mailto:partners@birdseyesecurity.ca",
        }}
      />

      <Premise />

      <ThreeTracks />

      <CommitmentLedger />

      <FeaturedPartners />

      <MetricStrip
        eyebrow="THE PROGRAM"
        preTitle="Partner program"
        italicTitle="at a glance"
        postTitle="."
        description="What's already in motion across the partner network."
        metrics={[
          {
            value: "30+",
            label: "Active partners across the network",
          },
          {
            value: "60%",
            label: "Avg deal margin shared with channel partners",
          },
          {
            value: "14 days",
            label: "Avg time from intro to first joint customer call",
          },
          {
            value: "24/7",
            label: "Partner technical support escalation",
          },
        ]}
      />

      <ApplyForm />

      <CtaBanner
        preTitle="Already have a deal in"
        italicTitle="motion"
        postTitle="?"
        description="If you're a partner with an active opportunity, register the deal directly with our partner desk."
        secondaryCta={{
          label: "partners@birdseyesecurity.ca",
          href: "mailto:partners@birdseyesecurity.ca",
        }}
      />
    </PageShell>
  );
}

/**
 * Premise — short editorial section that names why partnership exists.
 * Birdseye is deliberately scoped to the operating system + the trained
 * operators; everything that lives at the seams (camera install, TMS
 * integration, custom reporting) is partner work.
 */
function Premise() {
  return (
    <section className="section-dark py-24 md:py-section">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">
          <div>
            <span className="system-label text-birdseye-electric">
              THE PREMISE
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
              We don&apos;t do{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                everything
              </span>
              . On purpose.
            </h2>
          </div>
          <div className="space-y-5 text-body text-birdseye-cream/65 max-w-copy">
            <p>
              Birdseye builds two things: the AI-and-operator system that
              runs gate events end-to-end, and the trained agents who watch
              your yard. Everything that lives at the seams — camera
              installs, TMS integration, vertical-specific reporting, local
              service — is partner work. We&apos;re deliberately narrow on
              what we own so the network can be deep on everything else.
            </p>
            <p>
              The program is set up to share the value of that scope. Channel
              partners earn deal economics on the contracts they bring in.
              Technology partners earn integration distribution across our
              customer base. Service partners earn the work of keeping
              installations running well.
            </p>
            <p className="text-birdseye-cream font-semibold">
              Modernizing North American yards is bigger than one company.
              We&apos;re building the network that does it.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * ThreeTracks — the program's spine. Three side-by-side cards, each
 * naming one partner track with its purpose, fit profile, and headline
 * economic / value mechanic. Reads as a directory of who-fits-where.
 */
function ThreeTracks() {
  const tracks = [
    {
      n: "01",
      track: "Channel",
      headline: "Sell + install Birdseye to your customers.",
      fit: "Security integrators, AV/IT installers, regional ops-tech consultancies. Anyone with an existing book of yard or facility customers and the install bench to deploy cameras + edge gear.",
      get: "Margin on first-year ACV, deal registration protection, sales enablement, co-marketing, and a partner success manager for active deals.",
      cta: { label: "Apply as Channel", href: "#apply" },
    },
    {
      n: "02",
      track: "Technology",
      headline: "Integrate your platform with Birdseye.",
      fit: "TMS, YMS, WMS, VMS, ERP, insurance / claims, dispatch, hardware (cameras, sensors, gates). Anyone whose product the operator already touches alongside Birdseye.",
      get: "Co-engineered integration, distribution across our customer base, joint go-to-market, marketplace listing, and engineering enablement.",
      cta: { label: "Apply as Technology", href: "#apply" },
    },
    {
      n: "03",
      track: "Service",
      headline: "Deploy, train, and support Birdseye installs.",
      fit: "Implementation consultancies, managed-service providers, training & change-management firms. Anyone whose work picks up where Birdseye's account team hands off.",
      get: "Certified implementation track, customer-warm referrals, joint scoping, recurring service economics, and direct line to the customer success team.",
      cta: { label: "Apply as Service", href: "#apply" },
    },
  ];

  return (
    <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <span className="system-label text-birdseye-electric">
            THREE TRACKS · ONE NETWORK
          </span>
          <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
            Pick the track that fits how you{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              already
            </span>{" "}
            work.
          </h2>
          <p className="mt-6 text-body text-birdseye-cream/65 max-w-copy">
            Most partners join one track and stay there. Some operate across
            two — a regional integrator with a service practice, or a TMS
            with a reseller motion. We&apos;ll help you scope what fits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {tracks.map((t) => (
            <article
              key={t.track}
              className="rounded-2xl border border-birdseye-cream/10 bg-birdseye-cream/[0.02] p-7 md:p-8 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-5">
                <span className="system-label text-birdseye-electric">
                  TRACK {t.n}
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40">
                  {t.track}
                </span>
              </div>
              <h3 className="text-[clamp(1.375rem,1.9vw,1.625rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream">
                {t.headline}
              </h3>

              <div className="mt-6 pt-5 border-t border-birdseye-cream/10">
                <p className="system-label text-birdseye-cream/40 mb-2">
                  WHO IT FITS
                </p>
                <p className="text-[14.5px] leading-[1.55] text-birdseye-cream/70">
                  {t.fit}
                </p>
              </div>

              <div className="mt-5 pt-5 border-t border-birdseye-cream/10">
                <p className="system-label text-birdseye-cream/40 mb-2">
                  WHAT YOU GET
                </p>
                <p className="text-[14.5px] leading-[1.55] text-birdseye-cream/70">
                  {t.get}
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-birdseye-cream/10">
                <Link
                  href={t.cta.href}
                  className="group inline-flex items-center gap-2 text-[14px] font-medium text-birdseye-cream hover:text-birdseye-electric transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <span className="border-b border-birdseye-cream/35 group-hover:border-birdseye-electric transition-colors pb-0.5">
                    {t.cta.label}
                  </span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * CommitmentLedger — two-column block showing what partners get and
 * what we ask in return. Editorial register: this is a relationship
 * document, not a marketing pitch.
 */
function CommitmentLedger() {
  return (
    <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <span className="system-label text-birdseye-electric">
            THE COMMITMENT
          </span>
          <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
            What you get.{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              What we ask
            </span>
            .
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* What you get */}
          <div>
            <p className="system-label text-birdseye-cream/40 mb-6">
              WHAT YOU GET
            </p>
            <ul className="space-y-4">
              {[
                {
                  k: "Deal economics",
                  v: "Tier-graded margins on Channel deals, integration distribution for Technology partners, recurring service economics for Service partners.",
                },
                {
                  k: "Deal registration",
                  v: "Protection for opportunities you bring in. Once registered, the deal is yours through close.",
                },
                {
                  k: "Sales + technical enablement",
                  v: "Onboarding, certification, demo environments, partner-only collateral, and a dedicated Slack channel.",
                },
                {
                  k: "Co-marketing",
                  v: "Joint case studies, event presence, content collaboration, and listing on the Birdseye partner directory.",
                },
                {
                  k: "Customer success line",
                  v: "Direct escalation path to our CS team for active deals and post-sale issues.",
                },
              ].map((row) => (
                <li
                  key={row.k}
                  className="border-l border-birdseye-electric/40 pl-5"
                >
                  <p className="font-bold text-birdseye-cream text-[15px] leading-[1.4]">
                    {row.k}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-birdseye-cream/65">
                    {row.v}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* What we ask */}
          <div>
            <p className="system-label text-birdseye-cream/40 mb-6">
              WHAT WE ASK
            </p>
            <ul className="space-y-4">
              {[
                {
                  k: "Capability bar",
                  v: "You can deliver — install, integrate, or service — at a level our customers expect. We certify before activation.",
                },
                {
                  k: "Customer-first behavior",
                  v: "If a customer is better served by a different partner, you tell them. Network integrity beats individual deal economics.",
                },
                {
                  k: "Honest pipeline",
                  v: "Register the deals you're working. Don't register the ones you're not. We size investment in you against real motion.",
                },
                {
                  k: "Continuous training",
                  v: "Keep your team certified as the platform evolves. We provide the materials; you provide the time.",
                },
                {
                  k: "Two-way feedback",
                  v: "Tell us where the platform falls short for your customers. Roadmap input from partners is taken seriously.",
                },
              ].map((row) => (
                <li
                  key={row.k}
                  className="border-l border-birdseye-cream/30 pl-5"
                >
                  <p className="font-bold text-birdseye-cream text-[15px] leading-[1.4]">
                    {row.k}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-birdseye-cream/65">
                    {row.v}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * FeaturedPartners — three placeholder partner cards. Anonymized
 * format for now ("A leading TMS platform · TMS integration · 2024")
 * — REPLACE WITH real partner names + logos when partnerships sign
 * and permissions are confirmed (see /_placeholders.md).
 */
function FeaturedPartners() {
  const partners = [
    {
      track: "TECHNOLOGY",
      name: "A leading North American TMS platform",
      anonymized: true,
      role: "Real-time gate-event sync into the TMS dispatch view",
      since: "2024",
    },
    {
      track: "CHANNEL",
      name: "A regional security integrator network",
      anonymized: true,
      role: "Deployed Birdseye across 40+ logistics yards in 2024",
      since: "2023",
    },
    {
      track: "SERVICE",
      name: "An implementation consultancy",
      anonymized: true,
      role: "Certified GateCore + SafeCore deployment specialists",
      since: "2024",
    },
  ];

  return (
    <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <span className="system-label text-birdseye-electric">
            FEATURED PARTNERS
          </span>
          <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
            A few of the teams{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              already
            </span>{" "}
            in the network.
          </h2>
          <p className="mt-6 text-body text-birdseye-cream/65 max-w-copy">
            Names anonymized where we don&apos;t yet have permission to
            attribute publicly. Real attribution lands as partnerships
            confirm — same posture as the customer outcomes on the home page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {partners.map((p) => (
            <article
              key={p.name}
              className="rounded-2xl border border-birdseye-cream/10 bg-birdseye-cream/[0.02] p-7 md:p-8"
            >
              <span className="system-label text-birdseye-electric">
                {p.track}
              </span>
              <p
                className={
                  p.anonymized
                    ? "mt-4 font-serif italic text-birdseye-cream/85 text-[18px] leading-[1.35]"
                    : "mt-4 font-bold text-birdseye-cream text-[18px] leading-[1.3]"
                }
              >
                {p.name}
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.55] text-birdseye-cream/65">
                {p.role}
              </p>
              <div className="mt-6 pt-5 border-t border-birdseye-cream/10">
                <p className="system-label text-birdseye-cream/40">
                  PARTNER SINCE {p.since}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * ApplyForm — the primary entry point. Simple mailto-driven form for
 * the first cut; a real backend can replace the action attribute
 * later. Keeps the page shippable today without a form-handler dep.
 */
function ApplyForm() {
  return (
    <section
      id="apply"
      className="section-dark py-24 md:py-section scroll-mt-24"
    >
      <Container className="max-w-site">
        <div className="max-w-[760px]">
          <span className="system-label text-birdseye-electric">
            APPLY · PARTNER PROGRAM
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
            Start the{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              conversation
            </span>
            .
          </h2>
          <p className="mt-6 text-body text-birdseye-cream/65 max-w-copy">
            Tell us about your team, the track that fits, and what you&apos;re
            already working on. Partnerships responds within two business
            days. If there&apos;s an active customer opportunity, say so —
            that gets routed to a partner ops specialist directly.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <Link
              href="mailto:partners@birdseyesecurity.ca?subject=Partner%20Program%20Application"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
            >
              Email partnerships
              <span>→</span>
            </Link>
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-birdseye-cream/15 text-birdseye-cream/85 px-6 h-12 font-medium text-[14px] hover:bg-birdseye-cream/[0.04] hover:border-birdseye-cream/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
            >
              Book partner intro call
              <span>→</span>
            </Link>
          </div>

          <p className="mt-8 system-label text-birdseye-cream/40">
            partners@birdseyesecurity.ca · 844-626-7233
          </p>
        </div>
      </Container>
    </section>
  );
}
