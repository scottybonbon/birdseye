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
  const post = await getResource("checklist", slug);
  if (!post) return { title: "Checklist, Birdseye" };
  return {
    title: `${stripHtml(post.title?.rendered ?? "")}, Birdseye Checklist`,
    description: stripHtml(post.excerpt?.rendered ?? "").slice(0, 160),
  };
}

export default async function ChecklistItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PageShell bareFooter>
      <ResourceDetail
        type="checklist"
        slug={slug}
        archiveHref="/checklist"
        archiveLabel="All checklists"
      />
    </PageShell>
  );
}
