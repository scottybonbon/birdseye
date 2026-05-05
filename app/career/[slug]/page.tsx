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
  const post = await getResource("career", slug);
  if (!post) return { title: "Career, Birdseye" };
  return {
    title: `${stripHtml(post.title.rendered)}, Birdseye Careers`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  };
}

export default async function CareerItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PageShell bareFooter>
      <ResourceDetail
        type="career"
        slug={slug}
        archiveHref="/career"
        archiveLabel="All open roles"
      />
    </PageShell>
  );
}
