import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Status, Birdseye",
  description:
    "Operational status of the Birdseye Yard Operating System. Subsystems, recent incidents, and release cadence.",
};

/**
 * /status, operational pulse for the Yard Operating System.
 *
 * The "YOS · v1.4 · OPERATIONAL" pill that lives in the Footer and
 * SystemConsole used to point at nothing, it now lands here. This is
 * deliberately a STATIC PAGE: we don't yet pipe live uptime telemetry
 * out of the platform onto the marketing site. The page is honest
 * about that, every claim below is sourced from internal monitoring
 * and refreshed on each release.
 *
 * When we wire to Statuspage.io / Better Stack / a custom feed, swap
 * the static `SUBSYSTEMS` array for a server-side fetch and the rest
 * of the editorial chrome stays.
 *
 * Editorial register matches /changelog and /press: PageMasthead at
 * top, single article column, mono datelines, generous vertical
 * rhythm. The status rows themselves reuse the success-dot vocabulary
 * from the SystemConsole + Footer pill so the language is consistent
 * across the whole site.
 */
export default function StatusPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[820px]">
            {/* Header */}
            <header className="mb-16 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Status
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream text-balance">
                All systems{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  operational
                </span>
                .
              </h1>
              <p className="mt-7 text-body text-birdseye-cream/65 max-w-[580px]">
                The Birdseye Yard Operating System runs from our command
                center in Mississauga, Ontario, and ingests events from
                customer yards across North America. This page reports
                subsystem state, recent incidents, and release cadence.
              </p>

              {/* Big-status pill, same vocabulary as Footer + SystemConsole */}
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-full border border-birdseye-success/30 bg-birdseye-success/[0.08] px-5 py-3 w-fit font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-success">
                <span className="flex items-center gap-2.5">
                  <span className="relative grid place-items-center h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-birdseye-success" />
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-birdseye-success animate-ping opacity-50 motion-reduce:animate-none"
                    />
                  </span>
                  <span>YOS · v1.4 · OPERATIONAL</span>
                </span>
                <span aria-hidden className="text-birdseye-success/40">·</span>
                <span className="text-birdseye-cream/60">
                  All subsystems nominal
                </span>
              </div>
            </header>

            {/* Subsystems */}
            <Section label="Subsystems" issue="01">
              <ul className="divide-y divide-birdseye-cream/[0.08] border-y border-birdseye-cream/[0.08]">
                {SUBSYSTEMS.map((s) => (
                  <SubsystemRow key={s.name} subsystem={s} />
                ))}
              </ul>
            </Section>

            {/* Release cadence */}
            <Section label="Release cadence" issue="02">
              <div className="grid sm:grid-cols-[180px_1fr] gap-y-4 gap-x-10">
                <Fact label="Cadence" value="Every two weeks" />
                <Fact label="Current release" value="YOS v1.4 · 2026-05-02" />
                <Fact label="Next release" value="YOS v1.5 · 2026-05-16 (planned)" />
                <Fact label="Release log" value="" link={{ label: "Open changelog →", href: "/changelog" }} />
              </div>
            </Section>

            {/* Recent incidents */}
            <Section label="Recent incidents" issue="03">
              <div className="rounded-2xl border border-birdseye-cream/[0.10] bg-birdseye-surface/40 px-7 py-9">
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative grid place-items-center h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-birdseye-success" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-success">
                    Incident log · clear
                  </span>
                </div>
                <p className="text-[15.5px] leading-[1.65] text-birdseye-cream/65 max-w-[560px]">
                  No customer-impacting incidents reported in the current
                  reporting window. Subscribe to release notifications via{" "}
                  <Link
                    href="/changelog"
                    className="text-birdseye-cream/85 hover:text-birdseye-cream underline underline-offset-4 decoration-birdseye-cream/30 hover:decoration-birdseye-cream/60 transition-colors"
                  >
                    the changelog
                  </Link>
                  , or contact{" "}
                  <a
                    href="mailto:status@birdseyesecurity.ca"
                    className="text-birdseye-cream/85 hover:text-birdseye-cream underline underline-offset-4 decoration-birdseye-cream/30 hover:decoration-birdseye-cream/60 transition-colors"
                  >
                    status@birdseyesecurity.ca
                  </a>{" "}
                  for an operational query about your facility.
                </p>
              </div>
            </Section>

            {/* Methodology note */}
            <Section label="How we report this" issue="04">
              <p className="text-[15.5px] leading-[1.7] text-birdseye-cream/70 max-w-[640px]">
                Subsystem state on this page reflects internal monitoring
                snapshots refreshed at each release. Customer-facing SLAs
                and individual yard health are reported in the customer
                Portal and through your account team. For an external
                third-party feed, our engineering team is evaluating
                Statuspage and Better Stack integrations during 2026 H2.
              </p>
            </Section>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <span>Last refreshed, at v1.4 release · 2026-05-02</span>
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

/* ─────────── Section wrapper (mirrors /press, /changelog) ─────────── */

function Section({
  label,
  issue,
  children,
}: {
  label: string;
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

/* ─────────── Fact row ─────────── */

function Fact({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="contents">
      <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40 pt-1">
        {label}
      </dt>
      <dd className="text-[15.5px] leading-[1.55] text-birdseye-cream/80">
        {link ? (
          <Link
            href={link.href}
            className="text-birdseye-cream/85 hover:text-birdseye-cream underline underline-offset-4 decoration-birdseye-cream/30 hover:decoration-birdseye-cream/60 transition-colors"
          >
            {link.label}
          </Link>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

/* ─────────── Subsystem row ─────────── */

type Subsystem = {
  name: string;
  description: string;
  state: "OPERATIONAL" | "DEGRADED" | "MAINTENANCE";
  uptime: string;
};

const SUBSYSTEMS: Subsystem[] = [
  {
    name: "Gate ingest · cameras + sensors",
    description:
      "Live video, license-plate, and seal-scan ingest from customer-side edge nodes.",
    state: "OPERATIONAL",
    uptime: "99.99%",
  },
  {
    name: "AI detection pipeline",
    description:
      "Computer-vision detection, classification, and event scoring across every active feed.",
    state: "OPERATIONAL",
    uptime: "99.98%",
  },
  {
    name: "Agent verification console",
    description:
      "Live agent triage queue, Voice-Down™ dispatch, and incident close-out.",
    state: "OPERATIONAL",
    uptime: "99.99%",
  },
  {
    name: "Record store · sealed evidence",
    description:
      "Tamper-evident storage of timestamped video, voice, and event records.",
    state: "OPERATIONAL",
    uptime: "100%",
  },
  {
    name: "Customer Portal · YARD OS",
    description:
      "The web Portal customers use to monitor yards, pull records, and run reports.",
    state: "OPERATIONAL",
    uptime: "99.97%",
  },
  {
    name: "Notification dispatch",
    description:
      "Email, SMS, and webhook notifications for customer-defined alert rules.",
    state: "OPERATIONAL",
    uptime: "99.95%",
  },
];

function SubsystemRow({ subsystem }: { subsystem: Subsystem }) {
  const tone =
    subsystem.state === "OPERATIONAL"
      ? "success"
      : subsystem.state === "MAINTENANCE"
        ? "electric"
        : "warn";

  const dotClass =
    tone === "success"
      ? "bg-birdseye-success"
      : tone === "electric"
        ? "bg-birdseye-electric"
        : "bg-amber-400";

  const labelClass =
    tone === "success"
      ? "text-birdseye-success"
      : tone === "electric"
        ? "text-birdseye-electric"
        : "text-amber-400";

  return (
    <li className="grid grid-cols-[1fr_auto] gap-4 items-start py-5">
      <div>
        <div className="flex items-center gap-3">
          <span className="relative grid place-items-center h-1.5 w-1.5">
            <span className={`absolute inset-0 rounded-full ${dotClass}`} />
            {tone === "success" && (
              <span
                aria-hidden
                className={`absolute inset-0 rounded-full ${dotClass} animate-ping opacity-40 motion-reduce:animate-none`}
              />
            )}
          </span>
          <span className="text-[15.5px] font-semibold text-birdseye-cream">
            {subsystem.name}
          </span>
        </div>
        <p className="mt-1.5 ml-[18px] text-[14px] leading-[1.55] text-birdseye-cream/55 max-w-[560px]">
          {subsystem.description}
        </p>
      </div>
      <div className="text-right">
        <div
          className={`font-mono text-[10px] tracking-[0.22em] uppercase ${labelClass}`}
        >
          {subsystem.state}
        </div>
        <div className="mt-1 font-mono text-[11px] tracking-[0.16em] tabular-nums text-birdseye-cream/40">
          {subsystem.uptime} · 30d
        </div>
      </div>
    </li>
  );
}
