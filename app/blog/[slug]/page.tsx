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
  const post = await getResource("blog", slug);
  if (!post) return { title: "Article, Birdseye" };
  const title = stripHtml(post.title?.rendered ?? "");
  const description = stripHtml(post.excerpt?.rendered ?? "").slice(0, 160);
  return {
    title: `${title}, Birdseye`,
    description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PageShell bareFooter>
      <ResourceDetail
        type="blog"
        slug={slug}
        archiveHref="/blog"
        archiveLabel="The blog"
      />
    </PageShell>
  );
}
