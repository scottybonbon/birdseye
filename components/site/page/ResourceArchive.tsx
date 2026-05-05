import Link from "next/link";
import {
  listResources,
  formatMeta,
  stripHtml,
  getNewsExternal,
  getPostTopics,
  type ResourceType,
} from "@/lib/wp";
import { PageHero } from "@/components/site/page/PageHero";
import { ResourceGrid, type Resource } from "@/components/site/page/ResourceGrid";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Inbox } from "lucide-react";

/**
 * Server component archive shell. Fetches a resource type's items from
 * WordPress and renders them inside our hero + grid + CTA shell.
 */
export async function ResourceArchive({
  type,
  routePrefix,
  hero,
  cta,
  perPage = 60,
}: {
  type: ResourceType;
  routePrefix: string; // e.g. "/blog"
  hero: {
    eyebrow: string;
    preTitle: string;
    italicTitle?: string;
    postTitle?: string;
    description: string;
    tagline?: string;
  };
  cta?: {
    preTitle: string;
    italicTitle?: string;
    postTitle?: string;
    description?: string;
  };
  perPage?: number;
}) {
  const result = await listResources(type, { perPage });
  const { items, error } = result;

  const resources: Resource[] = items.map((p) => {
    // News posts (DEEP-2) can opt into external attribution by setting
    // the `external_url` + `publication` WP custom fields. When present,
    // the card routes to the publication in a new tab and the read-more
    // affordance reads "Read on {publication} ↗" — visually distinct
    // from in-house news posts which still link to /news/[slug].
    const external = type === "news" ? getNewsExternal(p) : null;
    // Topic chips (DEEP-5) — derived from the WP taxonomy terms
    // embedded with each post (`_embed=1` already in listResources).
    // When empty, the filter UI hides entirely.
    const topics = getPostTopics(p);
    return {
      title: stripHtml(p.title?.rendered ?? ""),
      description: stripHtml(p.excerpt?.rendered ?? "").slice(0, 180),
      meta: formatMeta(type, p.date),
      href: `${routePrefix}/${p.slug}`,
      // Raw ISO date is forwarded so the listing controls inside
      // ResourceGrid can sort by date and filter by year without
      // re-parsing the formatted meta string.
      dateIso: p.date,
      ...(topics.length > 0 ? { topics } : {}),
      ...(external
        ? { externalUrl: external.url, publication: external.publication }
        : {}),
    };
  });

  return (
    <>
      <PageHero {...hero} />
      {resources.length > 0 ? (
        <ResourceGrid
          eyebrow="LATEST"
          preTitle="Browse"
          italicTitle="every"
          postTitle="entry."
          resources={resources}
        />
      ) : error ? (
        /* WP fetch failure state */
        <section className="section-dark py-32">
          <Container>
            <div className="max-w-[460px] mx-auto text-center">
              <p className="system-label text-birdseye-cream/55 mb-4">
                SYSTEM · UNAVAILABLE
              </p>
              <h2 className="text-4xl font-black tracking-tight text-birdseye-cream mb-4">
                We can't reach the resource library right now.
              </h2>
              <p className="text-body text-birdseye-cream/70 mb-8">
                It's probably a hiccup on our end, try refreshing in a moment. In the meantime,
                you can{" "}
                <Link href="/book-a-demo" className="text-birdseye-electric hover:underline">
                  book a demo
                </Link>{" "}
                to see Birdseye live.
              </p>
              <a
                href={typeof window !== "undefined" ? window.location.pathname : routePrefix}
                className="inline-block text-birdseye-electric hover:text-birdseye-electric/80 transition-colors font-medium"
              >
                Refresh
              </a>
            </div>
          </Container>
        </section>
      ) : (
        /* Empty state (genuinely no items) */
        <section className="section-dark py-32">
          <Container>
            <div className="max-w-[460px] mx-auto text-center border border-birdseye-cream/10 rounded-lg p-12">
              <div className="flex justify-center mb-6">
                <Inbox className="w-8 h-8 text-birdseye-electric/60" />
              </div>
              <p className="system-label text-birdseye-cream/55 mb-4">
                EMPTY · NO ENTRIES
              </p>
              <h2 className="text-3xl font-black tracking-tight text-birdseye-cream mb-4">
                Nothing to show here yet.
              </h2>
              <p className="text-body text-birdseye-cream/70 mb-8">
                We're still warming up this archive. Check back soon, or{" "}
                <Link href="/contact" className="text-birdseye-electric hover:underline">
                  reach out
                </Link>{" "}
                if there's something specific you're looking for.
              </p>
              <Link
                href="/blog"
                className="inline-block text-sm text-birdseye-electric hover:text-birdseye-electric/80 transition-colors font-medium"
              >
                Back to all resources
              </Link>
            </div>
          </Container>
        </section>
      )}
      {cta && <CtaBanner {...cta} />}
    </>
  );
}
