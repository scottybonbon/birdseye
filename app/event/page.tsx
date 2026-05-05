import { PageShell } from "@/components/site/PageShell";
import { ResourceArchive } from "@/components/site/page/ResourceArchive";

export const metadata = {
  title: "Events, Birdseye",
  description: "Where to meet the Birdseye team, trade shows, summits, and customer events.",
};

export const revalidate = 3600;

export default function EventPage() {
  return (
    <PageShell bareFooter>
      <ResourceArchive
        type="event"
        routePrefix="/event"
        hero={{
          eyebrow: "COMPANY · EVENTS",
          preTitle: "Where to meet the",
          italicTitle: "team",
          postTitle: ".",
          tagline: "Trade shows, summits, customer days, and live demonstrations across North America.",
          description:
            "Catch us in person, see the platform live, talk to the engineers, and hear from operators already running on Birdseye.",
        }}
        cta={{
          preTitle: "Can't make it",
          italicTitle: "in person",
          postTitle: "?",
          description: "Book a virtual walkthrough on your own time.",
        }}
      />
    </PageShell>
  );
}
