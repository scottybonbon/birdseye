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
  const post = await getResource("event", slug);
  if (!post) return { title: "Event, Birdseye" };
  return {
    title: `${stripHtml(post.title?.rendered ?? "")}, Birdseye Event`,
    description: stripHtml(post.excerpt?.rendered ?? "").slice(0, 160),
  };
}

export default async function EventItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PageShell bareFooter>
      <ResourceDetail
        type="event"
        slug={slug}
        archiveHref="/event"
        archiveLabel="All events"
      />
    </PageShell>
  );
}
