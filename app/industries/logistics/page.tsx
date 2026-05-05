import { IndustryPage } from "@/components/site/page/IndustryPage";
import { images } from "@/_design/images";

export const metadata = {
  title: "3PL & Logistics, Birdseye",
  description:
    "Keep freight moving. Birdseye automates gate control, verifies drivers and trailers, and prevents cargo theft for 3PLs and carriers.",
};

export default function LogisticsPage() {
  return (
    <IndustryPage
      eyebrow="WHO WE SERVE · 3PL & LOGISTICS"
      hero={{
        preTitle: "Keep freight",
        italicTitle: "moving",
        postTitle: ".",
        tagline: "Eliminate yard guesswork. Verify every load. Recover every claim.",
        description:
          "From OTR fleets to 3PL crossdocks, Birdseye automates gate control, verifies drivers and trailers, and stops cargo theft at the gate.",
      }}
      heroImage={images.industryHero.logistics}
      namedOutcomeCustomers={["01", "06"]}
      intro={{
        heading: "When the gate is the bottleneck, every shipment is at risk.",
        paragraphs: [
          "Logistics operators are managing more volume, higher cargo values, and more sophisticated fraud than at any point in the past decade. Manual gate processes don't scale. And they don't hold up at audit.",
          "Birdseye replaces radio-and-clipboard with a verified system of record on every truck that crosses your gate. Driver, trailer, BOL, seal — all captured, timestamped, routed to your TMS in real time.",
          "Average customer cuts gate dwell 75% and saves thousands of dispatch hours per yard, per year.",
        ],
      }}
      capabilities={[
        {
          title: "Driver ID & credentials",
          body: "Match driver to manifest in seconds. Stop fraudulent pickups before the gate opens.",
        },
        {
          title: "Trailer & seal verification",
          body: "Camera-verified seal numbers and trailer condition on every entry, exit, and intra-yard move.",
        },
        {
          title: "BOL capture & matching",
          body: "Bills of Lading scanned, digitized, and matched against your TMS in real time.",
        },
        {
          title: "Yard occupancy & dwell",
          body: "Live spot-by-spot occupancy. Know which trailer is where, for how long, hot or cold.",
        },
        {
          title: "Cargo-theft deterrence",
          body: "Voice-Down™ live agent intervention the moment something looks off, before assets walk.",
        },
        {
          title: "TMS & YMS integration",
          body: "Plugs into your existing systems. No rip and replace. Data flows match your SOPs.",
        },
      ]}
      metrics={[
        { value: "75%", label: "Average gate processing improvement" },
        { value: "60%+", label: "Reduction in security spend vs. guards" },
        { value: "12M", label: "Gate transactions handled monthly" },
        { value: "99.99%", label: "Verification accuracy at the gate" },
      ]}
      outcomes={[
        {
          title: "Faster turns, fewer detentions",
          body: "Trucks in and out in under three minutes on average. Detention claims drop with documented gate timestamps.",
        },
        {
          title: "Audit-ready, every event",
          body: "Video, voice, gate event, and outcome stitched into one record your insurer and customer can trust.",
        },
        {
          title: "Lower headcount, higher coverage",
          body: "One Birdseye agent covers what a guard rotation can't, across every yard you operate.",
        },
        {
          title: "Cargo theft & fraud, prevented",
          body: "We catch it at the gate, not after the trailer leaves. Voice-Down™ stops most attempts at first contact.",
        },
      ]}
    />
  );
}
