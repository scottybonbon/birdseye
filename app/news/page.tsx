import { PageShell } from "@/components/site/PageShell";
import { ResourceArchive } from "@/components/site/page/ResourceArchive";

export const metadata = {
  title: "News, Birdseye",
  description: "Company updates, product launches, and announcements from Birdseye Security.",
};

export const revalidate = 3600;

export default function NewsPage() {
  return (
    <PageShell bareFooter>
      <ResourceArchive
        type="news"
        routePrefix="/news"
        hero={{
          eyebrow: "RESOURCES · NEWS",
          preTitle: "What we're",
          italicTitle: "shipping",
          postTitle: ".",
          tagline: "Product launches, partnerships, and milestones from Birdseye.",
          description:
            "Stay current on what Birdseye is building, releasing, and announcing across North America.",
        }}
        cta={{
          preTitle: "Talk to the",
          italicTitle: "team",
          postTitle: ".",
          description: "Press, partnerships, or general inquiries — we're listening.",
        }}
      />
    </PageShell>
  );
}
