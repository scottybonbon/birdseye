import { PageShell } from "@/components/site/PageShell";
import { ResourceDetail } from "@/components/site/page/ResourceDetail";
import { getResource, stripHtml } from "@/lib/wp";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getResource("guide", slug);
  if (!post) return { title: "Guide, Birdseye" };
  return {
    title: `${stripHtml(post.title.rendered)}, Birdseye Guide`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  };
}

export default async function GuideItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PageShell bareFooter>
      <ResourceDetail
        type="guide"
        slug={slug}
        archiveHref="/guide"
        archiveLabel="All guides"
      />
    </PageShell>
  );
}
