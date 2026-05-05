import { IndustryPage } from "@/components/site/page/IndustryPage";
import { images } from "@/_design/images";

export const metadata = {
  title: "Automotive & Distribution, Birdseye",
  description:
    "Validated hauler handoffs and verified vehicle transfers. Birdseye monitors automotive yards and ports of entry across North America.",
};

export default function AutomotivePage() {
  return (
    <IndustryPage
      eyebrow="WHO WE SERVE · AUTOMOTIVE"
      hero={{
        preTitle: "Verified",
        italicTitle: "every",
        postTitle: "vehicle.",
        tagline: "Hauler handoffs documented. Transfers tracked. Damage claims defensible.",
        description:
          "Birdseye monitors automotive yards, ports of entry, and distribution centers. Every hauler arrival, every load-out, every transfer captured at audit grade.",
      }}
      heroImage={images.industryHero.automotive}
      namedOutcomeCustomers={["02", "01"]}
      intro={{
        heading: "When the asset is a vehicle, every chain-of-custody gap is expensive.",
        paragraphs: [
          "Automotive distribution is one of the highest-stakes yard environments in logistics. Each unit is a high-value asset with a damage claim attached the moment it leaves your control.",
          "Birdseye captures every hauler arrival, every VIN load-out, every yard move on time-stamped video, backed by live agents who verify exceptions in real time. When a damage claim shows up later, the record is already there.",
          "Used by OEM ports, multi-brand storage yards, and processing centers across North America.",
        ],
      }}
      capabilities={[
        {
          title: "VIN-by-VIN tracking",
          body: "Every unit logged on entry, location, and exit. Find any vehicle in your yard in seconds.",
        },
        {
          title: "Hauler verification",
          body: "Driver, truck, trailer verified against the manifest before any unit is released.",
        },
        {
          title: "Pre/post-load condition capture",
          body: "Multi-angle video on every load and unload. Damage disputes resolved with footage, not opinion.",
        },
        {
          title: "Compound security",
          body: "Perimeter monitoring, after-hours access control, and theft deterrence on high-value lots.",
        },
        {
          title: "Multi-tenant compounds",
          body: "Track which OEM's vehicles are where, even when multiple brands share a single yard.",
        },
        {
          title: "Real-time exception alerts",
          body: "Wrong driver, wrong unit, wrong destination, escalated the second it's detected.",
        },
      ]}
      metrics={[
        { value: "$100B+", label: "Asset value monitored across customer yards" },
        { value: "<3 min", label: "Average hauler gate dwell" },
        { value: "100%", label: "VIN coverage on entries and exits" },
        { value: "60%+", label: "Reduction in damage-claim resolution time" },
      ]}
      outcomes={[
        {
          title: "Damage disputes, settled fast",
          body: "When a claim hits, you have multi-angle video of the load and unload. Most disputes resolve within a day.",
        },
        {
          title: "Faster hauler turns",
          body: "Verified, automated gate processing keeps haulers moving. More turns per day, less detention.",
        },
        {
          title: "Tighter compound security",
          body: "After-hours intrusion attempts catch a Voice-Down™ before they reach the lot fence.",
        },
        {
          title: "Single source of truth",
          body: "OEMs, carriers, and yard ops all pull from the same Birdseye record. End of finger-pointing.",
        },
      ]}
    />
  );
}
