"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Pricing tiers + comparison table.
 *
 * Built to mirror the GateCore Figma frame:
 *   1. "Pricing plans", three side-by-side cards (Basic / Full / Enterprise),
 *      each with a description, an "includes everything in X plus" line, a
 *      bulleted feature list, and a pill CTA at the bottom.
 *   2. "Compare all plans", a feature-by-feature table with header row of
 *      Basic / Full / Enterprise (Full's CTA filled with electric blue to
 *      mark it as the recommended tier), and rows that show either a string
 *      value per cell or an X badge for "not included".
 *
 * Data lives in this file because it's GateCore-specific. If we ever do
 * tiered pricing for SafeCore or YardCore, lift the data to /_design/content.ts
 * and parameterise the component.
 */

type TierKey = "basic" | "full" | "enterprise";

type Tier = {
  key: TierKey;
  name: string;
  description: string;
  inheritsFrom?: string;
  features: string[];
  cta: { label: string; href: string };
  recommended?: boolean;
};

const tiers: Tier[] = [
  {
    key: "basic",
    name: "Basic",
    description: "For simple yards that need clean entry control.",
    features: [
      "Driver verification",
      "License plate capture",
      "Seal verification",
      "Document imaging",
      "Event archives",
      "Real-time dashboard",
      "Remote assistance",
      "Basic alerts",
    ],
    cta: { label: "Get Basic", href: "/book-a-demo?tier=basic" },
  },
  {
    key: "full",
    name: "Full",
    description:
      "For yards that want full automation and optimized throughput.",
    inheritsFrom: "Basic",
    features: [
      "Automated protocol checks",
      "Parking optimization",
      "Incident alerts",
      "Enhanced reporting",
      "Multi-site visibility",
      "Priority support",
    ],
    cta: { label: "Get Full", href: "/book-a-demo?tier=full" },
    recommended: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description: "For complex networks and high-volume operations.",
    inheritsFrom: "Full",
    features: [
      "Enterprise integrations",
      "Advanced analytics",
      "Multi-location orchestration",
      "Customized SOP enforcement",
      "Dedicated success manager",
    ],
    cta: { label: "Request Enterprise Plan", href: "/contact?tier=enterprise" },
  },
];

// `false` = not included → renders an X badge.
type CellValue = string | false;

const compareRows: { feature: string; values: [CellValue, CellValue, CellValue] }[] = [
  {
    feature: "CDL & Driver Verification",
    values: ["Real-time checks", "Real-time + agent validation", "Full w/ network rules"],
  },
  {
    feature: "Vehicle & Trailer Logging",
    values: ["Basic capture", "Extended data", "Network-wide reporting"],
  },
  {
    feature: "System Integration",
    values: ["Standard (YMS/TMS/WMS)", "Advanced + custom", "Enterprise API, SSO, SCIM"],
  },
  {
    feature: "Tailgating Detection",
    values: ["Alerts only", "Alerts + agent response", "Centralized escalation"],
  },
  {
    feature: "Seal & BOL Capture",
    values: [false, "Automated verification + BOL logging", "Enterprise compliance package"],
  },
  {
    feature: "Remote Agent Oversight",
    values: [false, "24/7 monitoring + escalation", "Multi-site command center"],
  },
  {
    feature: "Voice-Down™ Deterrence",
    values: [false, "Custom greetings + deterrence", "Site-wide SOP automation"],
  },
  {
    feature: "Daily Reports",
    values: ["Basic portal", "Advanced compliance logs", "Custom reporting + audit exports"],
  },
  {
    feature: "Video Retention",
    values: [false, "30 days", "90 days + enterprise retention options"],
  },
  {
    feature: "Support",
    values: ["Standard", "Priority", "Dedicated CSM + rollout"],
  },
];

export function Pricing() {
  return (
    <>
      {/* ───────────── SECTION 1, Pricing plans ───────────── */}
      <section className="section-dark py-24 md:py-section xl:py-40">
        <Container className="max-w-site">
          <div className="text-center max-w-[760px] mx-auto mb-14 md:mb-20">
            <span className="system-label text-birdseye-electric">PLANS</span>
            <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.025em] font-bold text-birdseye-cream">
              Pricing plans
            </h2>
            <p className="mt-5 text-body text-birdseye-cream/55">
              Choose the level that fits your operation today, with
              flexibility to scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.06 }}
              >
                <TierCard tier={tier} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────── SECTION 2, Compare all plans ───────────── */}
      <section className="section-dark py-24 md:py-section xl:py-40 border-t border-birdseye-cream/[0.08]">
        <Container className="max-w-site">
          <div className="text-center max-w-[820px] mx-auto mb-12 md:mb-16">
            <span className="system-label text-birdseye-electric">COMPARE</span>
            <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.025em] font-bold text-birdseye-cream">
              Compare all plans
            </h2>
            <p className="mt-5 text-body text-birdseye-cream/55">
              A clear breakdown so you know exactly what your operation gets 
              no complexity, no hidden steps, no surprises.
            </p>
          </div>

          <CompareTable />
        </Container>
      </section>
    </>
  );
}

/* ─────────────── Single tier card ─────────────── */
function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={
        "relative h-full flex flex-col rounded-[1.5rem] bg-birdseye-surface border p-7 md:p-8 " +
        (tier.recommended
          ? "border-birdseye-cream/[0.18]"
          : "border-birdseye-cream/[0.08]")
      }
    >
      {tier.recommended && (
        <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded-full bg-birdseye-electric/15 text-birdseye-electric border border-birdseye-electric/30 animate-badge-shimmer shadow-[0_0_20px_rgba(46,75,255,0.4)]">
          Most popular
        </div>
      )}

      <h3 className="text-[clamp(1.375rem,2vw,1.625rem)] leading-[1.15] tracking-[-0.012em] font-semibold text-birdseye-cream">
        {tier.name}
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.55] text-birdseye-cream/60 max-w-[280px] text-pretty">
        {tier.description}
      </p>

      {tier.inheritsFrom && (
        <p className="mt-6 text-[13.5px] font-serif italic text-birdseye-cream/65">
          Includes everything in {tier.inheritsFrom}, plus:
        </p>
      )}

      <ul className="mt-6 space-y-3 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <CheckBadge />
            <span className="text-[14.5px] leading-[1.45] text-birdseye-cream/90">
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={tier.cta.href}
        className={
          "mt-10 inline-flex items-center justify-center rounded-pill h-12 px-7 text-[14.5px] font-medium active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 w-full md:w-auto md:self-start " +
          (tier.recommended
            ? "bg-birdseye-electric text-birdseye-cream hover:bg-birdseye-electric/90"
            : "border border-birdseye-cream/30 text-birdseye-cream hover:bg-birdseye-cream/5 hover:border-birdseye-cream/55")
        }
      >
        {tier.cta.label}
      </Link>
    </div>
  );
}

/* ─────────────── Compare table ─────────────── */
function CompareTable() {
  return (
    <div className="relative">
      {/* Horizontal scroll wrapper for narrow viewports.
          On lg+, the table fills the container width. */}
      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-birdseye-cream/[0.10]">
              <th className="text-left pb-8 align-bottom w-[28%]">
                <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-birdseye-cream/45">
                  Feature
                </div>
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier.key}
                  className="text-center pb-8 px-3 align-top w-[24%]"
                >
                  <div className="text-[1.375rem] leading-[1.15] font-semibold text-birdseye-cream mb-5">
                    {tier.name}
                  </div>
                  <Link
                    href={tier.cta.href}
                    className={
                      "inline-flex items-center justify-center rounded-pill h-11 px-7 text-[14px] font-medium active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 " +
                      (tier.recommended
                        ? "bg-birdseye-electric text-birdseye-cream hover:bg-birdseye-electric/90"
                        : "border border-birdseye-cream/30 text-birdseye-cream hover:bg-birdseye-cream/5 hover:border-birdseye-cream/55")
                    }
                  >
                    Get started
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {compareRows.map((row, i) => (
              <tr
                key={row.feature}
                className={
                  i > 0 ? "border-t border-birdseye-cream/[0.06]" : undefined
                }
              >
                <th
                  scope="row"
                  className="text-left py-6 pr-6 align-middle text-[14.5px] font-medium text-birdseye-cream"
                >
                  {row.feature}
                </th>
                {row.values.map((value, j) => (
                  <td
                    key={j}
                    className="text-center py-6 px-3 align-middle text-[13.5px] leading-[1.5] text-birdseye-cream/75"
                  >
                    {value === false ? (
                      <div className="inline-flex justify-center">
                        <XBadge />
                      </div>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Scroll affordance, fade on right edge, mobile only */}
      <div
        aria-hidden
        className="md:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent"
      />
    </div>
  );
}

/* ─────────────── Icons ─────────────── */

// White circle with cream check inside, the included-feature bullet.
function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="mt-[2px] grid place-items-center h-5 w-5 shrink-0 rounded-full bg-birdseye-cream"
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
        <path
          d="M2.5 6.2l2.4 2.3L9.5 3.7"
          stroke="#0A0A0B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// Coral 12-petal seal with white X inside, used in the comparison
// table for "not included" cells. Approximates the Figma sticker look.
function XBadge() {
  // Generate 12 petals around the center as a single rounded path.
  const petals = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 360) / 12;
    return (
      <rect
        key={i}
        x="11"
        y="2"
        width="2"
        height="6"
        rx="1"
        fill="#F87171"
        transform={`rotate(${angle} 12 12)`}
      />
    );
  });
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      {petals}
      <circle cx="12" cy="12" r="7" fill="#F87171" />
      <path
        d="M9 9l6 6M15 9l-6 6"
        stroke="#F4EDE4"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
