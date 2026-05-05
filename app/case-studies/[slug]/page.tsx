import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { PullQuote } from "@/components/site/PullQuote";
import { Container } from "@/components/ui/Container";
import {
  caseStudies,
  getCaseStudy,
  listCaseStudies,
  type CaseStudy,
} from "@/_design/caseStudies";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case Study, Birdseye" };
  return {
    title: `${cs.title.replace(/\.$/, "")} · Birdseye Case Study`,
    description: cs.excerpt,
  };
}

/**
 * /case-studies/[slug] — static case-study detail page.
 *
 * #7 (2026-05-03): reads from `_design/caseStudies.ts` instead of
 * WordPress so the page renders complete with placeholder narratives.
 *
 * Layout follows the standard PageMasthead → PageHero → body → metrics
 * → quote → CTA pattern used elsewhere on the site, with a custom body
 * section that renders the case study's `sections` array as editorial
 * prose. Hero image lives between PageHero and body for visual anchor.
 */
export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const issueNumber = `CS.${String(
    listCaseStudies().findIndex((c) => c.slug === slug) + 1,
  ).padStart(2, "0")}`;

  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow={`CASE STUDY · ${cs.industry.toUpperCase()}`}
        preTitle={cs.title.replace(/\.$/, "")}
        postTitle="."
        tagline={
          cs.customerAnonymized
            ? `${cs.customer} · ${new Date(cs.date).getFullYear()}`
            : `${cs.customer} · ${new Date(cs.date).getFullYear()}`
        }
        description={cs.excerpt}
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{
          label: "All case studies",
          href: "/case-studies",
        }}
      />

      {/* Hero image */}
      <section className="section-dark pt-4 pb-16 md:pb-24">
        <Container className="max-w-site">
          <div
            className="relative w-full rounded-3xl overflow-hidden border border-birdseye-cream/[0.10] bg-birdseye-surface"
            style={{ aspectRatio: "16/9" }}
            data-cursor-caption={`ARCHIVE · ${cs.customer.toUpperCase()} · ${new Date(cs.date).getFullYear()}`}
          >
            <Image
              src={cs.heroImage}
              alt={`${cs.customer} operations`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40">
            <span
              aria-hidden
              className="grid place-items-center h-3 w-3 rounded-full bg-birdseye-electric/15 text-birdseye-electric/80 text-[9px] leading-none font-medium"
            >
              +
            </span>
            <span>
              ARCHIVE ·{" "}
              {cs.customerAnonymized
                ? cs.customer.toUpperCase()
                : cs.customer.toUpperCase()}{" "}
              · {new Date(cs.date).getFullYear()}
            </span>
          </div>
        </Container>
      </section>

      {/* Body sections */}
      <section className="section-dark py-16 md:py-24">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
            {/* Sticky meta rail */}
            <div className="hidden lg:block lg:sticky lg:top-28 self-start space-y-6">
              <div>
                <p className="system-label text-birdseye-cream/40 mb-2">
                  CUSTOMER
                </p>
                <p
                  className={
                    cs.customerAnonymized
                      ? "font-serif italic text-birdseye-cream/85 text-[15px] leading-[1.4]"
                      : "font-bold text-birdseye-cream text-[15px] leading-[1.3]"
                  }
                >
                  {cs.customer}
                </p>
              </div>
              <div>
                <p className="system-label text-birdseye-cream/40 mb-2">
                  INDUSTRY
                </p>
                <p className="text-[14px] text-birdseye-cream/85 leading-[1.4]">
                  {cs.industry}
                </p>
              </div>
              <div>
                <p className="system-label text-birdseye-cream/40 mb-2">
                  REGION
                </p>
                <p className="text-[14px] text-birdseye-cream/85 leading-[1.4]">
                  {cs.region}
                </p>
              </div>
              <div>
                <p className="system-label text-birdseye-cream/40 mb-2">
                  HEADLINE METRIC
                </p>
                <p className="font-black text-birdseye-electric text-[clamp(2rem,2.4vw,2.5rem)] leading-none tracking-[-0.025em] tabular-nums">
                  {cs.metric.value}
                </p>
                <p className="mt-2 text-[13px] text-birdseye-cream/65 leading-[1.4]">
                  {cs.metric.label}
                </p>
              </div>
            </div>

            {/* Article body */}
            <article className="max-w-[680px] space-y-10">
              {cs.sections.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h2 className="text-[clamp(1.25rem,1.75vw,1.5rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream mb-4">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-body text-birdseye-cream/75 leading-[1.7]">
                    {section.body}
                  </p>
                </section>
              ))}
            </article>
          </div>
        </Container>
      </section>

      {/* KPI strip */}
      <MetricStrip
        eyebrow="THE NUMBERS"
        preTitle="What"
        italicTitle="changed"
        postTitle="."
        description="The operational lift the customer reported, in their own units."
        metrics={cs.kpis.map((k) => ({ value: k.value, label: k.label }))}
      />

      {/* Pull quote */}
      {cs.pullQuote && (
        <PullQuote
          eyebrow="FROM THE FIELD"
          filing={`${cs.customer.toUpperCase()} · ${new Date(cs.date).getFullYear()}`}
          accent={`"${cs.pullQuote.quote.split(".")[0]}.`}
          quote={`${cs.pullQuote.quote.substring(cs.pullQuote.quote.indexOf(".") + 1).trim()}"`}
          attribution={{
            name: cs.pullQuote.anonymized
              ? cs.pullQuote.name
              : cs.pullQuote.name,
            role: cs.pullQuote.role,
          }}
        />
      )}

      {/* Related cases */}
      <RelatedCases currentSlug={cs.slug} />

      <CtaBanner
        preTitle="Want this kind of"
        italicTitle="result"
        postTitle=" on your yard?"
        description="20-minute walkthrough on your own footage. We'll show you the same patterns from this story applied to your operation."
        secondaryCta={{
          label: "All case studies",
          href: "/case-studies",
        }}
      />
    </PageShell>
  );
}

/**
 * RelatedCases — three other case studies at the bottom, excluding the
 * current one. Picks the most recent three after filtering.
 */
function RelatedCases({ currentSlug }: { currentSlug: string }) {
  const others = listCaseStudies()
    .filter((c) => c.slug !== currentSlug)
    .slice(0, 3);

  if (others.length === 0) return null;

  return (
    <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <div className="mb-10 md:mb-14">
          <span className="system-label text-birdseye-electric">
            MORE CASES
          </span>
          <h2 className="mt-5 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream">
            Three more from the field.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {others.map((c) => (
            <RelatedCard key={c.slug} cs={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function RelatedCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group rounded-2xl border border-birdseye-cream/10 bg-birdseye-cream/[0.02] p-6 md:p-7 hover:border-birdseye-cream/25 hover:bg-birdseye-cream/[0.04] transition-colors flex flex-col"
    >
      <p className="system-label text-birdseye-electric/85">
        {cs.industry.toUpperCase()}
      </p>
      <h3 className="mt-4 text-[clamp(1.125rem,1.5vw,1.25rem)] leading-[1.25] tracking-[-0.012em] font-bold text-birdseye-cream group-hover:text-birdseye-electric transition-colors">
        {cs.title}
      </h3>
      <p className="mt-4 text-[14px] leading-[1.55] text-birdseye-cream/65 flex-1">
        {cs.excerpt}
      </p>
      <div className="mt-5 pt-4 border-t border-birdseye-cream/10 flex items-baseline justify-between">
        <span className="font-black text-birdseye-electric text-[20px] tabular-nums leading-none tracking-[-0.025em]">
          {cs.metric.value}
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/40">
          {new Date(cs.date).getFullYear()}
        </span>
      </div>
    </Link>
  );
}
