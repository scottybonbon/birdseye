"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * UseCaseGrid — six operational outcomes the platform delivers.
 *
 * COMP-6 (2026-05-03 · revised 2026-05-03 v2 per Scotty's density
 * critique): Flock pattern surfaced by the competitor audit, but the
 * first cut shipped six dense body paragraphs that nobody was going to
 * read in a scannable grid. Revised cards are now icon → eyebrow →
 * headline → one sentence → CTA. The icon is the scan anchor; the
 * sentence is for the engaged reader; the CTA is for the buyer who's
 * already decided.
 *
 * Icons are inline mono-line SVGs in the brand register — geometric,
 * single line weight, electric color. NOT decorative illustration. The
 * vocabulary is "system glyph," same family as the surveillance HUD
 * brackets and corner reticles used elsewhere on the site.
 *
 * UseCaseGrid is OUTCOMES — operational job-to-be-done. Sits in the
 * home flow as the bridge from SYSTEM block (here's the method) to
 * PROOF block (here's the proof at scale).
 */
export function UseCaseGrid() {
  const cases: UseCase[] = [
    {
      kicker: "STRATEGIC CARGO THEFT",
      headline: "Stop fictitious pickups at the gate.",
      body: "Strategic theft tripled from 2022. Birdseye verifies driver, vehicle, and BOL against your roster before the gate opens.",
      cta: { label: "How GateCore prevents it", href: "/platform/gatecore" },
      icon: "shield",
    },
    {
      kicker: "AFTER-HOURS INTRUSION",
      headline: "Catch trespass before it becomes incident.",
      body: "AI catches the event; an operator handles it on the speaker — most cases end before dispatch is needed.",
      cta: { label: "See SafeCore", href: "/platform/safecore" },
      icon: "eye",
    },
    {
      kicker: "DRIVER COMPLIANCE",
      headline: "Enforce protocol without standing at the gate.",
      body: "PPE, hazmat, fire-lane clearance. Voice-Down™ corrects in the moment — every shift, every yard.",
      cta: { label: "How Voice-Down works", href: "/voice-down" },
      icon: "checklist",
    },
    {
      kicker: "MULTI-SITE COORDINATION",
      headline: "Same SOPs across every yard you run.",
      body: "One operator pool, your protocols loaded per site. Coverage scales without scaling headcount.",
      cta: { label: "See YardCore", href: "/platform/yardcore" },
      icon: "network",
    },
    {
      kicker: "AUDIT, CLAIMS, DISPUTES",
      headline: "Pull the receipts in minutes, not days.",
      body: "Every event sealed as a tamper-evident record. Search by plate, seal, or driver. SOC 2, ISO 27001, FSMA.",
      cta: { label: "Read the method", href: "/maximum-telepresence" },
      icon: "archive",
    },
    {
      kicker: "GATE THROUGHPUT",
      headline: "More turns per shift, same security posture.",
      body: "Automated ID, seal, and BOL capture cuts gate dwell up to 75%. The team stops standing in the booth.",
      cta: { label: "Run the ROI", href: "/roi-calculator" },
      icon: "throughput",
    },
  ];

  return (
    <section
      className="section-dark py-24 md:py-section"
      aria-labelledby="use-case-heading"
    >
      <Container className="max-w-site">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-16"
        >
          <div>
            <span className="system-label text-birdseye-electric">
              SIX JOBS · ONE SYSTEM
            </span>
            <h2
              id="use-case-heading"
              className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream"
            >
              The work yard operators{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                actually
              </span>{" "}
              run on us for.
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/65 max-w-copy lg:pb-3">
            Six operational jobs, named in the language yard ops directors
            use. Whichever one brought you here, the method handles it the
            same way: detect, verify, document.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {cases.map((c, i) => (
            <UseCaseCard key={c.kicker} useCase={c} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type IconKey =
  | "shield"
  | "eye"
  | "checklist"
  | "network"
  | "archive"
  | "throughput";

type UseCase = {
  kicker: string;
  headline: string;
  body: string;
  cta: { label: string; href: string };
  icon: IconKey;
};

function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  const { kicker, headline, body, cta, icon } = useCase;
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: index * 0.05 }}
      className="group rounded-2xl border border-birdseye-cream/10 bg-birdseye-cream/[0.02] p-7 md:p-8 hover:border-birdseye-cream/25 hover:bg-birdseye-cream/[0.04] transition-colors flex flex-col"
    >
      {/* Icon — system glyph in electric, mono-line. The visual anchor
          for fast scanning. Background tile gives it card-corner weight
          so it reads as part of the system, not a floating illustration. */}
      <div className="grid place-items-center h-11 w-11 rounded-xl bg-birdseye-electric/10 border border-birdseye-electric/20 text-birdseye-electric mb-6 group-hover:bg-birdseye-electric/15 group-hover:border-birdseye-electric/35 transition-colors">
        <CardIcon name={icon} />
      </div>

      <span className="system-label text-birdseye-electric/85">{kicker}</span>
      <h3 className="mt-3 text-[clamp(1.25rem,1.75vw,1.5rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream">
        {headline}
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.55] text-birdseye-cream/60 flex-1">
        {body}
      </p>
      <div className="mt-6 pt-5 border-t border-birdseye-cream/10">
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 text-[13.5px] font-medium text-birdseye-cream group-hover:text-birdseye-electric transition-colors focus-visible:outline-none focus-visible:underline"
        >
          <span className="border-b border-birdseye-cream/30 group-hover:border-birdseye-electric transition-colors pb-0.5">
            {cta.label}
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

/**
 * CardIcon — inline mono-line SVG glyphs.
 *
 * Editorial discipline: 20×20 viewBox, stroke 1.5, currentColor, no
 * fill. Geometric not illustrative — these read as system glyphs in the
 * surveillance-HUD vocabulary, not decorative icons. Stroke linecap +
 * linejoin = "round" for consistency with the rest of the site's
 * iconography.
 */
function CardIcon({ name }: { name: IconKey }) {
  const props = {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...props}>
          <path d="M10 2 L4 4.5 v5 c0 3.5 2.5 6.5 6 8 3.5-1.5 6-4.5 6-8 V4.5 z" />
          <path d="M7.5 10 l1.75 1.75 L13 8" />
        </svg>
      );
    case "eye":
      return (
        <svg {...props}>
          <path d="M2 10 c2.5-4.5 13.5-4.5 16 0 -2.5 4.5-13.5 4.5-16 0z" />
          <circle cx="10" cy="10" r="2.25" />
        </svg>
      );
    case "checklist":
      return (
        <svg {...props}>
          <rect x="3.75" y="3" width="12.5" height="14" rx="1.5" />
          <path d="M6.75 8.5 l1.25 1.25 L10.75 7" />
          <path d="M6.75 13.5 l1.25 1.25 L10.75 12" />
          <line x1="13" y1="8.5" x2="14.25" y2="8.5" />
          <line x1="13" y1="13.5" x2="14.25" y2="13.5" />
        </svg>
      );
    case "network":
      return (
        <svg {...props}>
          <circle cx="5" cy="5" r="1.5" />
          <circle cx="15" cy="5" r="1.5" />
          <circle cx="5" cy="15" r="1.5" />
          <circle cx="15" cy="15" r="1.5" />
          <line x1="5" y1="5" x2="15" y2="5" />
          <line x1="5" y1="15" x2="15" y2="15" />
          <line x1="5" y1="5" x2="5" y2="15" />
          <line x1="15" y1="5" x2="15" y2="15" />
          <line x1="5" y1="5" x2="15" y2="15" />
        </svg>
      );
    case "archive":
      return (
        <svg {...props}>
          <path d="M5 2.75 v14.5 h10 V7.5 L10.25 2.75 z" />
          <path d="M10.25 2.75 v4.75 H15" />
          <line x1="7.5" y1="11" x2="12.5" y2="11" />
          <line x1="7.5" y1="14" x2="12.5" y2="14" />
        </svg>
      );
    case "throughput":
      return (
        <svg {...props}>
          <path d="M2 10 H13" />
          <path d="M9.5 6.5 L13 10 L9.5 13.5" />
          <line x1="15.5" y1="7.5" x2="15.5" y2="12.5" opacity="0.55" />
          <line x1="17.5" y1="8.5" x2="17.5" y2="11.5" opacity="0.3" />
        </svg>
      );
  }
}
