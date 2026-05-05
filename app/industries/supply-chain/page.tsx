import { IndustryPage } from "@/components/site/page/IndustryPage";
import { images } from "@/_design/images";

export const metadata = {
  title: "Supply Chain, Birdseye",
  description:
    "Vendor-to-dock visibility. Birdseye connects gates, access points, and yards across your network into one verified system of record.",
};

export default function SupplyChainPage() {
  return (
    <IndustryPage
      eyebrow="WHO WE SERVE · SUPPLY CHAIN"
      hero={{
        preTitle: "Vendor-to-dock",
        italicTitle: "visibility",
        postTitle: ".",
        tagline: "One verified system of record across every site, every gate, every shipment.",
        description:
          "Birdseye connects gates, access points, and yards across your network. One operational picture, real-time intervention, an audit-grade record on every event.",
      }}
      heroImage={images.industryHero["supply-chain"]}
      namedOutcomeCustomers={["02", "03"]}
      intro={{
        heading: "Supply chain risk is concentrated where freight changes hands.",
        paragraphs: [
          "Every gate, every yard, every dock is a control point — and a risk surface. The teams running the most sophisticated networks in North America stopped treating these as security problems. They're operational data problems.",
          "Birdseye gives you the same operational picture across every facility — same KPIs, same incident reporting, same audit trail. From shipper origin to final delivery yard, every event verified, timestamped, accountable.",
          "Tier-1 shippers and 3PLs use Birdseye as their connective tissue: a single platform that turns every gate into a control point and every yard into managed infrastructure.",
        ],
      }}
      capabilities={[
        {
          title: "Network-wide standardization",
          body: "Same protocols, same KPIs, same reporting across every facility, owned, leased, or partner.",
        },
        {
          title: "End-to-end chain of custody",
          body: "Every load tracked from origin gate to destination dock, with seal-and-trailer verification at each handoff.",
        },
        {
          title: "Multi-tenant facility coverage",
          body: "Drop yards, third-party crossdocks, partner DCs, Birdseye works regardless of who owns the building.",
        },
        {
          title: "Carrier & vendor compliance",
          body: "Verify carriers and vendors against your approved list at every touch point. Auto-escalate exceptions.",
        },
        {
          title: "Cross-border operations",
          body: "Compliance and verification protocols built for cross-border freight, Canadian, US, Mexican shipments alike.",
        },
        {
          title: "Real-time exception management",
          body: "When something deviates from plan, the right person knows in real time, not in tomorrow's report.",
        },
      ]}
      metrics={[
        { value: "12M+", label: "Gate transactions per month, network-wide" },
        { value: "$100B+", label: "Assets monitored across customer networks" },
        { value: "99.99%", label: "Network availability" },
        { value: "<3 min", label: "Average gate dwell across all yards" },
      ]}
      outcomes={[
        {
          title: "One operational picture",
          body: "Every yard, every gate, every dock, same KPIs, same dashboards. Network-wide visibility that VPs of supply chain actually use.",
        },
        {
          title: "Provable compliance",
          body: "Audit-grade records for FSMA, C-TPAT, PIP, and customer-specific compliance regimes. Pulled in seconds.",
        },
        {
          title: "Risk concentrated, then reduced",
          body: "Birdseye surfaces where the risk actually sits in your network so you can target investment precisely.",
        },
        {
          title: "Lower total network cost",
          body: "Replacing manned security at multiple sites typically saves more than the platform cost in the first year.",
        },
      ]}
    />
  );
}
