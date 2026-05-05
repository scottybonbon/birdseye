import { IndustryPage } from "@/components/site/page/IndustryPage";
import { images } from "@/_design/images";

export const metadata = {
  title: "Warehousing & Distribution, Birdseye",
  description:
    "Protect inventory and people. Birdseye monitors dock doors, enforces safety protocols, and reduces shrinkage 24/7.",
};

export default function WarehousingPage() {
  return (
    <IndustryPage
      eyebrow="WHO WE SERVE · WAREHOUSING"
      hero={{
        preTitle: "Protect inventory.",
        italicTitle: "Protect",
        postTitle: "people.",
        tagline: "24/7 monitoring that enforces safety protocols and reduces shrinkage.",
        description:
          "Birdseye watches every dock door, every back lot, and every restricted zone, with AI detection and live human verification on every alert.",
      }}
      heroImage={images.industryHero.warehousing}
      namedOutcomeCustomers={["03", "04"]}
      intro={{
        heading: "Modern DCs run faster than guards can patrol.",
        paragraphs: [
          "Warehouse and distribution operations have become some of the most complex security environments in commerce — high turnover, tight throughput, valuable freight, zero tolerance for downtime.",
          "Birdseye gives DC operators a single platform that watches every camera, enforces every protocol, and seals every event. Without adding headcount.",
          "Customers consistently report 25–50% reductions in shrinkage and lower OSHA-recordable incident rates inside the first year.",
        ],
      }}
      capabilities={[
        {
          title: "Dock door monitoring",
          body: "Verify every trailer that backs up to a door. Catch unauthorized loading and dock-related theft.",
        },
        {
          title: "Restricted zone enforcement",
          body: "Mezzanines, hazmat areas, secure cages, instant escalation if access protocols are broken.",
        },
        {
          title: "PPE & safety compliance",
          body: "AI flags missing high-vis vests, blocked aisles, forklift speed violations. Live agents verify and notify.",
        },
        {
          title: "Inventory shrinkage prevention",
          body: "Pattern detection on dwell-and-loiter, lift truck misuse, and unauthorized after-hours access.",
        },
        {
          title: "Trailer yard oversight",
          body: "Spot-by-spot tracking for trailers in your yard. Cuts trailer-search time to near zero.",
        },
        {
          title: "Insurance-grade records",
          body: "Time-stamped, agent-verified video for every incident, built for claims and audits.",
        },
      ]}
      metrics={[
        { value: "25–50%", label: "Average reduction in shrinkage" },
        { value: "24/7", label: "Monitoring with live human verification" },
        { value: "94K+", label: "Safety violations identified and enforced" },
        { value: "9K+", label: "Critical interventions per month" },
      ]}
      outcomes={[
        {
          title: "Fewer claims, smaller premiums",
          body: "Insurers reward documented incident management. Most customers see premium reductions at renewal.",
        },
        {
          title: "Safer shifts, fewer injuries",
          body: "Real-time PPE and aisle-blocking enforcement drives measurable drops in OSHA-recordable incidents.",
        },
        {
          title: "Cleaner audit trail",
          body: "Every event has video, voice, timestamp, and outcome. The auditor leaves smiling.",
        },
        {
          title: "Lower security spend",
          body: "One Birdseye platform replaces multiple guard shifts at most facilities, with better outcomes.",
        },
      ]}
    />
  );
}
