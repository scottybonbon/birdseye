import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Changelog, Birdseye",
  description:
    "Release notes for the Birdseye Yard Operating System. Shipped, improved, fixed, every release, in order.",
};

/**
 * /changelog, release notes for the YOS.
 *
 * Reinforces the "v1.4 · OPERATIONAL" pill that lives in SystemConsole
 * and Footer: this is a living system that ships, not a brochure. Every
 * release is filed by date, in mono dateline, with three tagged buckets
 * (Shipped / Improved / Fixed) per entry.
 *
 * Visual register matches /colophon and /manifesto, single article
 * column, generous vertical rhythm, mono mastheads and date stamps.
 *
 * Editorial discipline:
 *   - Each entry leads with a bold "headline" that names the most
 *     significant thing in that release. The bucket items are short
 *     and operational, "what changed," not "why we changed it."
 *   - Buckets are optional; an entry can ship with just one of them.
 *   - We list the most recent release first. Same convention as Linear
 *     and Vercel changelogs.
 *
 * Source of truth: the entries below are hand-curated from the dispatch
 * + cowork session log. When a release ships, prepend a new entry.
 */
export default function ChangelogPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[820px]">
            {/* Header */}
            <header className="mb-16 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Changelog
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream text-balance">
                What we&rsquo;ve{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  shipped
                </span>
                .
              </h1>
              <p className="mt-7 text-body text-birdseye-cream/60 max-w-[560px]">
                Release notes for the Yard Operating System. New every
                two weeks. We tag each line as{" "}
                <span className="text-birdseye-cream/85">Shipped</span>,{" "}
                <span className="text-birdseye-cream/85">Improved</span>,
                or <span className="text-birdseye-cream/85">Fixed</span>{" "}
                so customers can read the impact without reading the diff.
              </p>

              {/* Cadence + version row */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/40">
                <span className="flex items-center gap-2">
                  <span className="relative grid place-items-center h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-birdseye-success" />
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-birdseye-success animate-ping opacity-60"
                    />
                  </span>
                  <span className="text-birdseye-success">
                    YOS · v1.4 · OPERATIONAL
                  </span>
                </span>
                <span aria-hidden className="text-birdseye-cream/15">
                  ·
                </span>
                <span>Cadence, every two weeks</span>
                <span aria-hidden className="text-birdseye-cream/15">
                  ·
                </span>
                <Link
                  href="/status"
                  className="text-birdseye-cream/55 hover:text-birdseye-cream transition-colors"
                >
                  System status →
                </Link>
              </div>
            </header>

            {/* Entries */}
            <ol className="space-y-20 md:space-y-24">
              {RELEASES.map((r) => (
                <Entry key={r.version} release={r} />
              ))}
            </ol>

            {/* Sign-off */}
            <footer className="mt-24 md:mt-28 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <span>End of log · scrolling stops here</span>
                <Link
                  href="/colophon"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Colophon, &gt;
                </Link>
              </div>
            </footer>
          </div>
        </Container>
      </article>
    </PageShell>
  );
}

/* ─────────── Entry ─────────── */

type Release = {
  version: string;
  date: string;
  /** Display dateline, already formatted in the editorial mono style. */
  dateline: string;
  headline: string;
  shipped?: string[];
  improved?: string[];
  fixed?: string[];
};

function Entry({ release }: { release: Release }) {
  return (
    <li className="grid md:grid-cols-[180px_1fr] gap-5 md:gap-12 items-start">
      {/* Left rail, version + dateline. Sticks low under the entry on
          mobile, runs as a margin note on desktop. */}
      <div className="md:pt-1">
        <div className="font-mono text-[11px] tracking-[0.22em] text-birdseye-electric uppercase">
          v{release.version}
        </div>
        <div className="mt-1.5 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/40 uppercase">
          {release.dateline}
        </div>
      </div>

      {/* Right column, headline + buckets */}
      <div>
        <h2 className="text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em] font-semibold text-birdseye-cream text-balance">
          {release.headline}
        </h2>
        <div className="mt-7 space-y-7">
          {release.shipped && (
            <Bucket label="Shipped" tone="electric" items={release.shipped} />
          )}
          {release.improved && (
            <Bucket label="Improved" tone="cream" items={release.improved} />
          )}
          {release.fixed && (
            <Bucket label="Fixed" tone="muted" items={release.fixed} />
          )}
        </div>
      </div>
    </li>
  );
}

function Bucket({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "electric" | "cream" | "muted";
}) {
  const labelClass =
    tone === "electric"
      ? "text-birdseye-electric"
      : tone === "cream"
        ? "text-birdseye-cream/75"
        : "text-birdseye-cream/45";
  return (
    <div>
      <div
        className={`font-mono text-[10px] tracking-[0.22em] uppercase ${labelClass} mb-3`}
      >
        {label}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="grid grid-cols-[14px_1fr] gap-3 text-[15.5px] leading-[1.55] text-birdseye-cream/75"
          >
            <span
              aria-hidden
              className="mt-2 h-px w-2.5 bg-birdseye-cream/25"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────── Release log ─────────── */

const RELEASES: Release[] = [
  {
    version: "1.4",
    date: "2026-05-02",
    dateline: "MAY 02 · 2026",
    headline: "Maximum Telepresence triptych replaces the vertical zigzag.",
    shipped: [
      "MaxTelepresence reborn as a horizontal triptych, three real-footage loops playing one event with synchronized 120ms reveal stagger.",
      "BrandEntry loader, once-per-session calibration frame on first paint, with reduce-motion fallback.",
      "CommandPalette, Cmd+K / Ctrl+K / `/` to jump anywhere, with persistent recents and full keyboard nav.",
      "AmbientShift, site temperature shifts subtly across dawn / day / dusk / night, driven by local hour.",
      "SectionInterlude signature mode, scroll-triggered hairline + electric dot + mono caption between major beats on the home page.",
    ],
    improved: [
      "CameraEye lens promoted into the live Hero in place of the previous ambient yard plate.",
      "system-label contrast bumped to 5.49:1 on dark surfaces (AA), original on light surfaces preserved.",
      "Footer column-link transitions cleared a class collision, the slide-in finally runs as designed.",
      "Hero overlay stack re-tuned around the lens so the iris reads through cleanly.",
    ],
    fixed: [
      "13 instances of `&apos;` / `&amp;` rendering as literal entities inside JSX prop strings, swept across industries, platform, contact, and ROI pages.",
      "`text-system-label` typo (a class that doesn't exist in Tailwind) replaced with the real `system-label` helper across 4 files.",
      "404 page picked up the missing Footer + restored the cream/electric CTA direction.",
      "CameraEye reduce-motion users no longer see a brief wake-animation flash before snap-to-resting.",
    ],
  },
  {
    version: "1.3",
    date: "2026-04-18",
    dateline: "APR 18 · 2026",
    headline: "Site-wide brand discipline lock, color, type, motion.",
    shipped: [
      "Locked palette to navy / cream / electric / success, with electric reserved as the power-on accent only.",
      "Typography pared to Inter + Instrument Serif italic + IBM Plex Mono. No decorative faces; size + spacing carry the hierarchy.",
      "Motion vocabulary reduced to a four-step duration scale and a single primary easing, declared in `_design/motion.ts`.",
    ],
    improved: [
      "Section rhythm consolidated to a 7.5rem cadence with alternating dark / cream surfaces.",
      "Container max-width set to 1200px with 24px gutter; copy width capped at 560px for body text.",
    ],
  },
  {
    version: "1.2",
    date: "2026-04-04",
    dateline: "APR 04 · 2026",
    headline: "GateCore, SafeCore, YardCore, three core pages live.",
    shipped: [
      "Platform overview at /platform plus dedicated core routes for GateCore, SafeCore, and YardCore.",
      "Interactive ROI calculator on the GateCore page, adjusts to yard count, gate volume, and average dwell.",
      "Industry pages for Logistics, Warehousing, Manufacturing, Supply Chain, and Automotive.",
    ],
    improved: [
      "Nav restructured into five mega-menus with persistent demo CTA.",
      "Resource archives (blog / news / video / guide / checklist / event / case-studies / career) wired to the headless WordPress source.",
    ],
  },
  {
    version: "1.1",
    date: "2026-03-21",
    dateline: "MAR 21 · 2026",
    headline: "Editorial chrome, masthead, manifesto, colophon.",
    shipped: [
      "PageMasthead component, small magazine issue plate sits between Nav and hero on every secondary page.",
      "/manifesto and /colophon, the brand thesis and the build credits, set in the same editorial register.",
      "Footer wordmark with cursor-tracked magnify mode (cream invert under the lens).",
    ],
    fixed: [
      "Form errors no longer flash on page load, gated to `:user-invalid` so they only appear after first interaction.",
    ],
  },
  {
    version: "1.0",
    date: "2026-03-07",
    dateline: "MAR 07 · 2026",
    headline: "Birdseye.com goes operational.",
    shipped: [
      "Public launch, Home, Platform overview, About, Careers, Contact, Book a demo, Blog, News, Privacy, Terms.",
      "Custom cursor with magnify mode on the brand wordmark.",
      "SystemConsole overlay reading live phase + coordinates.",
    ],
  },
];
