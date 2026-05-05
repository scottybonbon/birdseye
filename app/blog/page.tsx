import { PageShell } from "@/components/site/PageShell";
import { ResourceArchive } from "@/components/site/page/ResourceArchive";

export const metadata = {
  title: "Blog, Birdseye",
  description:
    "Field notes from the yard. Operator playbooks, security trends, and practical guides for modern gate and yard operations.",
};

export const revalidate = 3600;

export default function BlogPage() {
  return (
    <PageShell bareFooter>
      <ResourceArchive
        type="blog"
        routePrefix="/blog"
        hero={{
          eyebrow: "RESOURCES · BLOG",
          preTitle: "Field notes from the",
          italicTitle: "yard",
          postTitle: ".",
          tagline: "What we're learning, building, and seeing across North American operations.",
          description:
            "Operator-focused writing on security, automation, AI, and the changing economics of gate and yard management.",
        }}
        cta={{
          preTitle: "See it",
          italicTitle: "live",
          postTitle: "in your yard.",
          description: "Book a 20-minute walkthrough with the Birdseye team.",
        }}
      />
    </PageShell>
  );
}
