import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { ResourceGrid, type Resource } from "@/components/site/page/ResourceGrid";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { listCaseStudies } from "@/_design/caseStudies";

export const metadata = {
  title: "Case Studies, Birdseye",
  description:
    "Real outcomes from real yards. Customer case studies on cost reduction, security wins, and operational lift.",
};

/**
 * /case-studies — static archive listing.
 *
 * #7 (2026-05-03): the route was previously WP-backed but unfilled, so
 * the archive showed empty-state. Five placeholder case studies now
 * live in `_design/caseStudies.ts` as the source of truth. The archive
 * reads from the static file; individual story pages live at
 * /case-studies/[slug] and read from the same file.
 *
 * When real customer case studies land in WordPress, the route can flip
 * back to ResourceArchive (WP-backed). Until then, static is the path
 * that ships a complete-feeling archive.
 */
export default function CaseStudiesPage() {
  const resources: Resource[] = listCaseStudies().map((cs) => ({
    title: cs.title,
    description: cs.excerpt,
    meta: `Case Study · ${cs.industry} · ${cs.region}`,
    href: `/case-studies/${cs.slug}`,
    dateIso: cs.date,
  }));

  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="RESULTS · CASE STUDIES"
        preTitle="What customers count"
        italicTitle="after"
        postTitle=" they switch."
        tagline="How operators across North America ship more, spend less, and sleep better."
        description="Verified outcomes, named where we have permission and anonymized where we don't. Every story below is a real customer counting real numbers — not a marketing model, not a projection."
      />

      <ResourceGrid
        eyebrow="LATEST CASE STUDIES"
        preTitle="Browse"
        italicTitle="every"
        postTitle=" outcome."
        resources={resources}
      />

      <CtaBanner
        preTitle="See what"
        italicTitle="your"
        postTitle=" yard could become."
        description="Book a 20-minute walkthrough with the Birdseye team. We'll show you the same patterns from above on your own footage."
      />
    </PageShell>
  );
}
