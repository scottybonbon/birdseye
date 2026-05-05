"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * RoiInline, surfaces the existing /roi-calculator inline on the home
 * page so the buyer doesn't have to leave the funnel to see what the
 * numbers might look like for their operation.
 *
 * Borrows from Vercel's pricing-calculator pattern: a tight preview
 * block that LOOKS like a stripped-down version of the calculator
 * (sample inputs + sample outputs in mono) and links into the full
 * tool with the user already primed.
 *
 * Placement: between VersusGuards (the buyer just absorbed "less than
 * guards") and Testimonials (the social proof). The natural moment to
 * say "here's what your number would be" before showing them what
 * other operators got.
 *
 * The numbers shown here are illustrative averages from internal
 * deployments, they're meant to give the reader a first-pass shape
 * of the answer, not a quote. The calculator at /roi-calculator does
 * the per-yard math on user inputs.
 */

const SAMPLE = {
  yards: 8,
  trucksPerWeek: 1800,
  guardModelCost: 480_000,
  birdseyeCost: 192_000,
} as const;

const SAVINGS = SAMPLE.guardModelCost - SAMPLE.birdseyeCost;
const SAVINGS_PCT = Math.round((SAVINGS / SAMPLE.guardModelCost) * 100);

export function RoiInline() {
  return (
    <section
      aria-label="ROI calculator preview"
      className="section-light relative py-20 md:py-section"
    >
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1.1fr_1.1fr] gap-10 lg:gap-16 items-center">
          {/* Left, pitch + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-birdseye-electric">
              ROI · YOUR YARD · YOUR NUMBERS
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-ink text-balance">
              See what Birdseye would do for{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                your
              </span>{" "}
              numbers.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-birdseye-ink/70 max-w-[480px]">
              Drop in your gate volume, your current security model, and
              your yard count. The calculator returns first-year savings,
              gate-dwell impact, and a payback window in under thirty
              seconds.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/roi-calculator"
                className="inline-flex items-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-birdseye-cream transition-[transform,colors,box-shadow] duration-150"
              >
                Run the calculator
                <span aria-hidden>→</span>
              </Link>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-ink/45">
                ~30 seconds · no signup
              </span>
            </div>
          </motion.div>

          {/* Right, sample output card. Reframed (Scotty pivot) so the
              WIN is unmistakable: the big savings number is the hero,
              supporting facts read in a single sentence, and the cost
              comparison underneath proves it visually. The four-row
              "inputs" block from the prior version was treating context
              and outcome as equals, context is now compressed to one
              line so the eye lands on the savings without delay. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: DUR.smooth,
              ease: EASE_OUT,
              delay: 0.1,
            }}
            className="rounded-card border border-birdseye-ink/[0.10] bg-white shadow-[0_2px_24px_-12px_rgba(15,28,46,0.10)] overflow-hidden"
          >
            {/* Header strip, mono caps */}
            <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-birdseye-ink/[0.08] bg-birdseye-ink/[0.02] font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-ink/55">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-birdseye-electric" />
                Output preview
              </span>
              <span>Average mid-size 3PL</span>
            </div>

            {/* Compact profile, single line, the context the buyer needs
                to recognize the example as "like mine" without spending
                visual weight on it. */}
            <div className="px-6 pt-5 pb-4">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-ink/40 mb-2">
                For a yard like yours
              </div>
              <div className="font-mono text-[12.5px] text-birdseye-ink/85 tabular-nums">
                {SAMPLE.yards} yards · {SAMPLE.trucksPerWeek.toLocaleString()} trucks / wk · 3-shift guards
              </div>
            </div>

            {/* Hero result, the WIN. Tinted electric so the eye lands
                on the dollar number first, the qualifier sentence
                second, nothing else. */}
            <div className="px-6 pt-6 pb-7 border-t border-birdseye-ink/[0.06] bg-birdseye-electric/[0.04]">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-electric mb-3 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-birdseye-electric" />
                First-year savings
              </div>
              <div className="text-[clamp(2.75rem,5.2vw,3.75rem)] leading-[0.95] tracking-[-0.028em] font-bold text-birdseye-ink tabular-nums">
                ${SAVINGS.toLocaleString()}
              </div>
              <p className="mt-3.5 text-[14.5px] leading-[1.5] text-birdseye-ink/70 max-w-[420px]">
                <span className="text-birdseye-ink font-semibold">{SAVINGS_PCT}% less</span> than your current guard model.{" "}
                <span className="text-birdseye-ink font-semibold">Break-even in 6.2 months.</span>
              </p>
            </div>

            {/* Cost comparison, two stacked bars. The first runs full
                width (today's spend); the second runs short (Birdseye
                spend); the empty space on the second bar IS the
                savings, visualized. */}
            <div className="px-6 py-6 border-t border-birdseye-ink/[0.08] space-y-5">
              <CostBar
                label="Today · guard model"
                value={SAMPLE.guardModelCost}
                widthPct={100}
                tone="ink"
              />
              <CostBar
                label="With Birdseye"
                value={SAMPLE.birdseyeCost}
                widthPct={Math.round(
                  (SAMPLE.birdseyeCost / SAMPLE.guardModelCost) * 100,
                )}
                tone="electric"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * One row of the cost comparison. Label + dollar amount on a single
 * line; thin track underneath with a fill that's proportional to the
 * "Today" baseline. The "With Birdseye" row uses a much shorter fill
 * so the empty space on the right reads visually as the savings 
 * the buyer sees the win without parsing numbers.
 */
function CostBar({
  label,
  value,
  widthPct,
  tone,
}: {
  label: string;
  value: number;
  /** Fill width as a percentage 0–100. The "Today" bar is always 100;
   *  the "With Birdseye" bar is the proportional spend vs Today. */
  widthPct: number;
  tone: "ink" | "electric";
}) {
  const labelClass =
    tone === "electric" ? "text-birdseye-electric" : "text-birdseye-ink/45";
  const valueClass =
    tone === "electric"
      ? "text-birdseye-electric font-semibold"
      : "text-birdseye-ink/75";
  const fillClass =
    tone === "electric" ? "bg-birdseye-electric" : "bg-birdseye-ink/40";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span
          className={`font-mono text-[10px] tracking-[0.18em] uppercase ${labelClass}`}
        >
          {label}
        </span>
        <span
          className={`font-mono text-[13px] tabular-nums ${valueClass}`}
        >
          ${(value / 1000).toFixed(0)}k / yr
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-birdseye-ink/[0.08] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${widthPct}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
          className={`absolute inset-y-0 left-0 rounded-full ${fillClass}`}
        />
      </div>
    </div>
  );
}
