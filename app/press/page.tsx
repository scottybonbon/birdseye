import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";
import { company } from "@/_design/content";

export const metadata = {
  title: "Press, Birdseye",
  description:
    "Newsroom kit for the Birdseye Yard Operating System: quick facts, leadership bios, brand assets, and press contact.",
};

const PRESS_EMAIL = "press@birdseyesecurity.ca";

/**
 * /press, newsroom kit.
 *
 * Pages a working journalist actually needs to file a story without
 * pinging us first:
 *   1. A 4-line "what is Birdseye" so the lede writes itself.
 *   2. Quick facts, founded, HQ, stage, footprint, ops cadence.
 *   3. Leadership bios, short and on-the-record.
 *   4. Brand assets pointer, logo, wordmark, photography, palette.
 *   5. Recent coverage, third-party validation, two-line summaries.
 *   6. Press contact, direct email + business-day SLA.
 *
 * Visual register matches /colophon and /changelog: PageMasthead at
 * the top, single article column, mono datelines, generous vertical
 * rhythm, italic-serif accent on a single word in the H1.
 *
 * Notes:
 *   - Brand-assets ZIP is referenced as `/brand/birdseye-press-kit.zip`.
 *     If the file doesn't ship in /public, the link 404s, this page
 *     deliberately does NOT fabricate a download URL elsewhere.
 *   - Coverage list below is hand-curated. When new coverage lands,
 *     prepend (newest first).
 */
export default function PressPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[820px]">
            {/* Header */}
            <header className="mb-16 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Press
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream text-balance">
                For the{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  record
                </span>
                .
              </h1>
              <p className="mt-7 text-body text-birdseye-cream/65 max-w-[580px]">
                Everything a journalist needs to file a story without
                writing us first. Quick facts below, leadership bios
                further down, brand assets to download, and a press
                contact who actually answers.
              </p>

              {/* Direct contact strip */}
              <div className="mt-10 inline-flex flex-wrap items-center gap-x-5 gap-y-3 rounded-full border border-birdseye-cream/[0.10] bg-birdseye-surface/50 px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/55">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-birdseye-success" />
                  <span className="text-birdseye-success">Press desk · open</span>
                </span>
                <span aria-hidden className="text-birdseye-cream/15">·</span>
                <a
                  href={`mailto:${PRESS_EMAIL}`}
                  className="text-birdseye-cream/85 hover:text-birdseye-cream transition-colors"
                >
                  {PRESS_EMAIL}
                </a>
                <span aria-hidden className="text-birdseye-cream/15">·</span>
                <span>Reply within 1 business day</span>
              </div>
            </header>

            {/* Boilerplate, the one paragraph every story needs */}
            <Section label="Boilerplate" issue="01">
              <p className="text-body text-birdseye-cream/85 leading-[1.7]">
                <strong className="text-birdseye-cream font-semibold">
                  Birdseye
                </strong>{" "}
                is the Yard Operating System (YOS), a single platform
                for gate access, perimeter security, and yard
                operations. AI catches every event, a live agent
                verifies it, and the system seals a forensic record. We
                replace inconsistent manual oversight with one
                predictable system, plug into the YMS, TMS, and WMS our
                customers already run, and operate every yard 24/7
                from our command center in Mississauga, Ontario.
              </p>
            </Section>

            {/* Quick facts, only entries verifiable from the codebase
                or company contact card. Founding year, funding stage,
                exact customer count, etc. are intentionally omitted
                until Scotty signs off, we'll fill them in then. */}
            <Section label="Quick facts" issue="02">
              <FactList
                facts={[
                  ["Headquarters", "Mississauga, Ontario, Canada"],
                  ["Product", "Yard Operating System (YOS)"],
                  [
                    "Cores",
                    "GateCore · SafeCore · YardCore · Portal · Integrations",
                  ],
                  [
                    "Industries served",
                    "3PLs, warehousing, manufacturing, supply chain, automotive",
                  ],
                  [
                    "Operating model",
                    "AI detection · live agent verification · sealed forensic record",
                  ],
                  [
                    "Release cadence",
                    "Every two weeks · YOS v1.4 OPERATIONAL",
                  ],
                  ["Postal address", company.address],
                  ["Switchboard", company.phone],
                  ["General email", company.email],
                ]}
              />
            </Section>

            {/* Leadership */}
            <Section label="Leadership" issue="03">
              <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
                {LEADERSHIP.map((p) => (
                  <Bio key={p.name} person={p} />
                ))}
              </div>
            </Section>

            {/* Brand assets */}
            <Section label="Brand assets" issue="04">
              <p className="text-[16px] leading-[1.7] text-birdseye-cream/75">
                Logo, wordmark, product photography, and the brand
                palette in a single archive. Use the cream lockup on
                dark backgrounds, the navy lockup on cream. Keep the
                electric accent (#2E4BFF) for accents only, it&rsquo;s
                a signal, not a fill.
              </p>

              <div className="mt-7 grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center rounded-2xl border border-birdseye-cream/[0.10] bg-birdseye-surface/40 px-7 py-7">
                <a
                  href="/brand/birdseye-press-kit.zip"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 h-11 text-[14px] font-medium rounded-full bg-birdseye-electric text-birdseye-cream hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 shrink-0"
                >
                  Download press kit
                  <span aria-hidden>↓</span>
                </a>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/45 leading-[1.7]">
                  ZIP · ~14 MB · Logos (SVG, PNG) · Wordmark · 12 product
                  photos · Color tokens · Type specimen
                </div>
              </div>

              {/* Quick reference for outlets that just need a single asset */}
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-2.5 font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/45">
                <AssetRef label="Logo · cream on dark" href="/brand/birdseye-logo-cream.svg" />
                <AssetRef label="Logo · navy on cream" href="/brand/birdseye-logo-navy.svg" />
                <AssetRef label="Wordmark · SVG" href="/brand/birdseye-wordmark.svg" />
                <AssetRef label="Color tokens · JSON" href="/brand/birdseye-tokens.json" />
              </ul>
            </Section>

            {/* Recent coverage */}
            <Section label="Recent coverage" issue="05">
              {COVERAGE.length === 0 ? (
                <div className="rounded-2xl border border-birdseye-cream/[0.10] bg-birdseye-surface/40 px-7 py-9">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40 mb-3">
                    Coverage feed · empty
                  </div>
                  <p className="text-[15.5px] leading-[1.65] text-birdseye-cream/65 max-w-[560px]">
                    No published placements logged on this page yet. If
                    you&rsquo;re researching for a story and want to be
                    routed to past coverage, customer references, or
                    leadership commentary, email the press desk at{" "}
                    <a
                      href={`mailto:${PRESS_EMAIL}`}
                      className="text-birdseye-cream/85 hover:text-birdseye-cream underline underline-offset-4 decoration-birdseye-cream/30 hover:decoration-birdseye-cream/60 transition-colors"
                    >
                      {PRESS_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <ul className="space-y-7">
                  {COVERAGE.map((c) => (
                    <CoverageItem key={c.url} item={c} />
                  ))}
                </ul>
              )}
            </Section>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <span>
                  Reach press desk {" "}
                  <a
                    href={`mailto:${PRESS_EMAIL}`}
                    className="text-birdseye-cream/65 hover:text-birdseye-cream transition-colors"
                  >
                    {PRESS_EMAIL}
                  </a>
                </span>
                <Link
                  href="/changelog"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Changelog, &gt;
                </Link>
              </div>
            </footer>
          </div>
        </Container>
      </article>
    </PageShell>
  );
}

/* ─────────── Section wrapper ─────────── */

function Section({
  label,
  issue,
  children,
}: {
  label: string;
  /** Two-digit filing number that runs in the right rail. Editorial
   *  device only, corresponds to the order on the page. */
  issue: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 md:mt-24 first:mt-0">
      <div className="flex items-baseline justify-between mb-7 md:mb-9 pb-4 border-b border-birdseye-cream/[0.08]">
        <h2 className="font-mono text-[12px] tracking-[0.22em] uppercase text-birdseye-cream/55">
          {label}
        </h2>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/25">
          § {issue}
        </span>
      </div>
      {children}
    </section>
  );
}

/* ─────────── Quick-facts list ─────────── */

function FactList({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="grid sm:grid-cols-[180px_1fr] gap-y-4 gap-x-10">
      {facts.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40 pt-1">
            {k}
          </dt>
          <dd className="text-[15.5px] leading-[1.55] text-birdseye-cream/80">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ─────────── Leadership bio ─────────── */

type Person = {
  name: string;
  title: string;
  bio: string;
};

/**
 * 2026-05-04: leadership names + roles + bios now mirror the
 * /about-us LeadershipGrid so the two pages stay in sync. About-us is
 * the single source of truth for who the leadership is; the press
 * page uses the same four senior-most entries (CEO, CTO, Head of
 * Account Management, CFO). When new leaders are added to the
 * about-us grid, mirror them here.
 */
const LEADERSHIP: Person[] = [
  {
    name: "Mike Grabovica",
    title: "Chief Executive Officer",
    bio: "Founder of Birdseye and an experienced tech entrepreneur focused on scaling operational businesses. Available for interviews on yard automation, the future of perimeter security, and the operator-pool model. Press requests via the desk above.",
  },
  {
    name: "Milan Luketic",
    title: "Chief Technology Officer",
    bio: "15+ years in product development and former CTO at multiple mid-sized tech firms. Owns platform engineering, computer vision, edge ingest, the API surface, and YMS / TMS / WMS integrations.",
  },
  {
    name: "Roe Sharma",
    title: "Head of Account Management",
    bio: "Over 15 years in trucking and facility management, including eight years leading customer success at Birdseye. Runs the live command center: 24/7 monitoring, agent training, customer SLAs.",
  },
  {
    name: "Maruf Mahmood",
    title: "Chief Financial Officer",
    bio: "Global finance leader with extensive experience supporting fast-growing technology companies. Available for analyst briefings and partner-press conversations on growth, unit economics, and the partner ecosystem.",
  },
];

function Bio({ person }: { person: Person }) {
  return (
    <article>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40">
        {person.title}
      </div>
      <h3 className="mt-2 text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-birdseye-cream">
        {person.name}
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.65] text-birdseye-cream/65">
        {person.bio}
      </p>
    </article>
  );
}

/* ─────────── Brand asset ref ─────────── */

function AssetRef({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        className="group inline-flex items-center gap-2 text-birdseye-cream/55 hover:text-birdseye-cream transition-colors"
      >
        <span
          aria-hidden
          className="h-1 w-1 rounded-full bg-birdseye-cream/25 group-hover:bg-birdseye-electric transition-colors"
        />
        {label}
        <span aria-hidden className="text-birdseye-cream/25">→</span>
      </a>
    </li>
  );
}

/* ─────────── Coverage list ─────────── */

type CoverageRecord = {
  outlet: string;
  date: string; // editorial dateline, already formatted
  headline: string;
  summary: string;
  url: string;
};

/**
 * NOTE, coverage list is intentionally empty until real placements
 * land. Adding fabricated outlet names + headlines + URLs would be a
 * factual claim. Prepend a real record (newest first) when coverage
 * publishes. The empty-state UI in CoverageItem renders if the list
 * is empty.
 */
const COVERAGE: CoverageRecord[] = [];

function CoverageItem({ item }: { item: CoverageRecord }) {
  return (
    <li className="grid md:grid-cols-[160px_1fr] gap-3 md:gap-10 items-start">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40 pt-1.5">
        <div className="text-birdseye-cream/60">{item.outlet}</div>
        <div className="mt-1 text-birdseye-cream/30">{item.date}</div>
      </div>
      <div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener"
          className="group inline-block"
        >
          <h3 className="text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.3] tracking-[-0.01em] font-semibold text-birdseye-cream group-hover:text-birdseye-electric transition-colors text-balance">
            {item.headline}{" "}
            <span aria-hidden className="text-birdseye-cream/35 group-hover:text-birdseye-electric transition-colors">
              →
            </span>
          </h3>
        </a>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-birdseye-cream/60 max-w-[640px]">
          {item.summary}
        </p>
      </div>
    </li>
  );
}
