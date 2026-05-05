import { PageShell } from "@/components/site/PageShell";
import { ResourceArchive } from "@/components/site/page/ResourceArchive";

export const metadata = {
  title: "Videos, Birdseye",
  description:
    "See Birdseye in action. Customer stories, product walkthroughs, and live yard footage.",
};

export const revalidate = 3600;

export default function VideoPage() {
  return (
    <PageShell bareFooter>
      <ResourceArchive
        type="video"
        routePrefix="/video"
        hero={{
          eyebrow: "RESOURCES · VIDEO",
          preTitle: "See it in",
          italicTitle: "motion",
          postTitle: ".",
          tagline: "Walkthroughs, customer stories, and live yard footage.",
          description:
            "From product demos to real intervention footage, watch how Birdseye runs every gate, yard, and perimeter.",
        }}
        cta={{
          preTitle: "Want a",
          italicTitle: "live",
          postTitle: "demo?",
          description: "Book a 20-minute walkthrough on your own yard.",
        }}
      />
    </PageShell>
  );
}
