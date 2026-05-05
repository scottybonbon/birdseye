import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getResource, formatMeta, stripHtml, type ResourceType } from "@/lib/wp";
import { WpArticleBody } from "@/components/site/page/WpArticleBody";
import { CtaBanner } from "@/components/site/page/CtaBanner";

/**
 * Server component for a single resource detail page. Fetches one item
 * by slug from WordPress and renders the full HTML in our shell.
 */
export async function ResourceDetail({
  type,
  slug,
  archiveHref,
  archiveLabel,
}: {
  type: ResourceType;
  slug: string;
  archiveHref: string;
  archiveLabel: string;
}) {
  const post = await getResource(type, slug);
  if (!post) notFound();

  const title = stripHtml(post.title?.rendered ?? "");
  const meta = formatMeta(type, post.date);
  const featured = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <>
      <article className="section-dark relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-rule-vertical opacity-20" />
        <Container className="max-w-site">
          {/* Breadcrumb back to archive */}
          <Link
            href={archiveHref}
            className="inline-flex items-center gap-2 system-label text-birdseye-cream/55 hover:text-birdseye-cream transition-colors mb-8"
          >
            <span>←</span> {archiveLabel}
          </Link>

          {/* Header */}
          <header className="max-w-[760px]">
            <div className="font-mono text-[12px] tracking-[0.08em] text-birdseye-electric uppercase mb-5">
              {meta}
            </div>
            <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
              {title}
            </h1>
          </header>

          {/* Featured image */}
          {featured?.source_url && (
            <div className="mt-10 md:mt-12 max-w-[920px]">
              <img
                src={featured.source_url}
                alt={featured.alt_text ?? title}
                className="w-full rounded-2xl border border-birdseye-cream/[0.08]"
              />
            </div>
          )}

          {/* Body */}
          <div className="mt-12 md:mt-16">
            <WpArticleBody html={post.content?.rendered ?? ""} />
          </div>

          {/* Footer link back */}
          <div className="mt-16 pt-10 border-t border-birdseye-cream/[0.08] max-w-[700px]">
            <Link
              href={archiveHref}
              className="inline-flex items-center gap-2 text-[14px] text-birdseye-cream/85 hover:text-birdseye-electric transition-colors"
            >
              <span>←</span> Back to {archiveLabel.toLowerCase()}
            </Link>
          </div>
        </Container>
      </article>

      <CtaBanner
        preTitle="Ready to"
        italicTitle="modernize"
        postTitle="your gate?"
        description="See Birdseye in action on a 20-minute live walkthrough."
      />
    </>
  );
}
