import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/_design/content";

export const metadata = {
  title: "By The Numbers, Birdseye",
  description: "Every Birdseye stat, in one place. The verified outcomes our customers count on.",
};

export default function ResultsPage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="RESULTS · BY THE NUMBERS"
        preTitle="The"
        italicTitle="proof"
        postTitle="is in the operations."
        tagline="Every Birdseye number, in one place. Verified, audited, pulled from live customer deployments."
        description="Gate dwell, claim defense, security spend reduction — these are what customers count after the switch."
        primaryCta={{ label: "Read case studies", href: "/case-studies" }}
        secondaryCta={{ label: "Run the ROI calculator", href: "/roi-calculator" }}
      />

      {/* Macro stats */}
      <section className="section-dark py-20 md:py-24 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <div className="mb-12">
            <span className="system-label text-birdseye-electric">PLATFORM SCALE</span>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.018em] font-bold text-birdseye-cream">
              At scale, every shift, every yard.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-birdseye-cream/[0.08]">
            {[
              { value: "12M", label: "Gate transactions handled monthly" },
              { value: "$100B+", label: "Assets monitored and protected" },
              { value: "94K+", label: "Safety violations identified and enforced" },
              { value: "9K+", label: "Critical interventions each month" },
              { value: "99.99%", label: "Accuracy and uptime at the gate" },
              { value: "24/7", label: "Live human verification on every alert" },
            ].map((m, i) => (
              <div
                key={m.label}
                className="bg-birdseye-surface px-6 py-8 md:px-8 md:py-10"
              >
                <div className="font-mono text-[11px] tracking-[0.08em] text-birdseye-electric mb-3">
                  0{i + 1}
                </div>
                <div className="text-[clamp(2rem,3.5vw,3.25rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
                  {m.value}
                </div>
                <div className="mt-3 text-[13px] leading-[1.5] text-birdseye-cream/55 max-w-[200px]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Named outcomes, concrete proof tied to real customers, pulled
          straight from the attributed testimonials block in content.ts.
          Sits between the macro platform stats above and the average
          customer outcomes below, so the page reads: scale → people →
          averages. The customer card is the bridge that turns the grid
          of numbers into a page about real operations. */}
      <section className="section-dark py-20 md:py-24 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <div className="mb-10 md:mb-12 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <span className="system-label text-birdseye-electric">
                NAMED OUTCOMES
              </span>
              <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.018em] font-bold text-birdseye-cream">
                Customers,{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  named
                </span>
                . Numbers, counted.
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/55 hover:text-birdseye-cream transition-colors"
            >
              All case studies
              <span
                aria-hidden
                className="text-birdseye-cream/30 group-hover:text-birdseye-electric group-hover:translate-x-0.5 transition-[colors,transform]"
              >
                →
              </span>
            </Link>
          </div>

          {/* Four-card row of named outcomes, curated from the attributed
              testimonials. Each card: customer + role, the metric chip
              (electric pill), and a one-line context. Same metric-chip
              vocabulary as the Testimonials rotator + StakeholderLanes. */}
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-birdseye-cream/[0.08] rounded-card overflow-hidden border border-birdseye-cream/[0.08]">
            {testimonials.cards
              .filter((c) => c.metric)
              .slice(0, 4)
              .map((c) => (
                <li
                  key={c.customerIndex}
                  className="bg-birdseye-surface/60 px-6 py-7 md:px-7 md:py-8 flex flex-col"
                >
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/35">
                    Customer · {c.customerIndex}
                  </div>
                  <div className="mt-3 text-[15.5px] font-semibold text-birdseye-cream leading-[1.25]">
                    {c.company}
                  </div>
                  <div className="mt-1 text-[12.5px] text-birdseye-cream/45">
                    {c.role}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-birdseye-electric/30 bg-birdseye-electric/[0.08] px-3 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-birdseye-electric">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-birdseye-electric"
                    />
                    {c.metric}
                  </span>

                  <p className="mt-5 text-[13.5px] leading-[1.5] text-birdseye-cream/55 max-w-[260px] flex-1">
                    {/* Lifted from the live testimonial, short context
                        so the reader has a phrase to attach to the
                        outcome chip. */}
                    &ldquo;{c.quote.length > 110 ? c.quote.slice(0, 108).trimEnd() + "…" : c.quote}&rdquo;
                  </p>
                </li>
              ))}
          </ul>
        </Container>
      </section>

      {/* Customer outcomes */}
      <section className="section-dark py-20 md:py-24 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <div className="mb-12">
            <span className="system-label text-birdseye-electric">AVERAGE CUSTOMER OUTCOMES</span>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.018em] font-bold text-birdseye-cream">
              What changes after Birdseye goes live.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-birdseye-cream/[0.08]">
            {[
              { value: "75%", label: "Faster gate processing" },
              { value: "60%+", label: "Reduction in security spend vs. guards" },
              { value: "25–50%", label: "Reduction in shrinkage at warehouses" },
              { value: "95%", label: "Of customers scale Birdseye to a second yard" },
            ].map((m, i) => (
              <div
                key={m.label}
                className="bg-birdseye-surface px-6 py-8 md:px-8 md:py-10"
              >
                <div className="font-mono text-[11px] tracking-[0.08em] text-birdseye-electric mb-3">
                  0{i + 1}
                </div>
                <div className="text-[clamp(2rem,3.5vw,3.25rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
                  {m.value}
                </div>
                <div className="mt-3 text-[13px] leading-[1.5] text-birdseye-cream/55 max-w-[200px]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* "Cross-link to case studies" CTA section removed 2026-05-04
          (Scotty call) — Results page already drove visitors to either
          the ROI calculator or a demo via the CtaBanner below. The
          case-studies cross-link was a third CTA in close succession;
          the closing banner is the one we want to lead with. */}

      <CtaBanner
        preTitle="See what"
        italicTitle="your"
        postTitle="numbers could be."
        description="Run the ROI calculator on your own gate volume."
        primaryCta={{ label: "ROI calculator", href: "/roi-calculator" }}
        secondaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
      />
    </PageShell>
  );
}
