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
  const post = await getResource("news", slug);
  if (!post) return { title: "News, Birdseye" };
  return {
    title: `${stripHtml(post.title?.rendered ?? "")}, Birdseye News`,
    description: stripHtml(post.excerpt?.rendered ?? "").slice(0, 160),
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PageShell bareFooter>
      <ResourceDetail
        type="news"
        slug={slug}
        archiveHref="/news"
        archiveLabel="All news"
      />
    </PageShell>
  );
}
