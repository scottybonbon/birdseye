import { IndustryPage } from "@/components/site/page/IndustryPage";
import { images } from "@/_design/images";

export const metadata = {
  title: "Manufacturing, Birdseye",
  description:
    "Safer plants. Tighter access. Cleaner audits. Birdseye protects production lines and enforces site safety 24/7.",
};

export default function ManufacturingPage() {
  return (
    <IndustryPage
      eyebrow="WHO WE SERVE · MANUFACTURING"
      hero={{
        preTitle: "Safeguard the",
        italicTitle: "production",
        postTitle: "line.",
        tagline: "Tighter access. Safer shifts. Cleaner audits, across every plant.",
        description:
          "Birdseye enforces safety, locks down restricted zones, and verifies access on every shift. Audit-ready the day the auditor walks in.",
      }}
      heroImage={images.industryHero.manufacturing}
      namedOutcomeCustomers={["01", "05"]}
      intro={{
        heading: "On a plant floor, security and safety are the same job.",
        paragraphs: [
          "Manufacturing operations carry some of the highest-consequence safety risks in industry — and the tightest access requirements. A locked badge isn't enough when a contractor walks in behind a forklift.",
          "Birdseye combines AI vision with human verification across every entry, every restricted area, every dock. Every event sealed to the standard your safety committee, your insurer, and your auditor expect.",
          "We work alongside your existing security and EHS teams. Not a replacement — the eyes and ears that never blink.",
        ],
      }}
      capabilities={[
        {
          title: "Tailgate prevention",
          body: "AI catches piggyback entries the second they happen. Live agent intervention before they reach the floor.",
        },
        {
          title: "Restricted zone enforcement",
          body: "Hazmat, electrical, robotics cells, verified credentials enforced, not just badged.",
        },
        {
          title: "PPE & lockout verification",
          body: "Live confirmation that proper PPE is worn and lockout/tagout procedures are followed.",
        },
        {
          title: "Contractor & vendor management",
          body: "Track every third party on site. Auto-escalate when contractors deviate from approved scope.",
        },
        {
          title: "Incident documentation",
          body: "Every alert is video-verified, agent-verified, and timestamped, ready for OSHA, MSHA, or your insurer.",
        },
        {
          title: "Multi-site coverage",
          body: "Run every plant on one platform. Standardize protocols and reporting across the network.",
        },
      ]}
      metrics={[
        { value: "60%+", label: "Average security cost reduction" },
        { value: "24/7", label: "Monitored across every shift and weekend" },
        { value: "$100B+", label: "Assets monitored and protected" },
        { value: "99.99%", label: "Uptime on monitoring infrastructure" },
      ]}
      outcomes={[
        {
          title: "Fewer recordable incidents",
          body: "Real-time PPE and procedure enforcement measurably reduces OSHA-recordable incidents year-over-year.",
        },
        {
          title: "Tighter access, cleaner audits",
          body: "When the regulator arrives, every entry, every escort, every credential is in a single audit-ready record.",
        },
        {
          title: "Vendor accountability",
          body: "Contractors stay on scope because they know they're being verified, not just badged.",
        },
        {
          title: "Network-wide visibility",
          body: "Plant managers and corporate EHS see the same picture, in real time, across every site.",
        },
      ]}
    />
  );
}
