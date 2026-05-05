import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { FeatureGrid } from "@/components/site/page/FeatureGrid";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";
import { images } from "@/_design/images";
import { StakeholderLanes } from "@/components/site/StakeholderLanes";
import { BirdseyeDifference } from "@/components/site/BirdseyeDifference";

export const metadata = {
  title: "YARD OS, Birdseye Platform",
  description:
    "YARD OS is the unified operating system for the yard. GateCore, SafeCore, and YardCore, three cores, one platform, one verified record of every event.",
};

export default function PlatformPage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="THE PLATFORM"
        preTitle="The operating system for the"
        italicTitle="yard"
        postTitle="."
        tagline="One platform. Three cores. Independently capable. Compounding together."
        description="YARD OS unifies AI, video, voice, and human assurance into a single record of every event at every gate, yard, and perimeter you operate."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "See it in motion", href: "/video" }}
      />

      {/* Core trio, clickable */}
      <section className="section-dark py-24 md:py-section">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16">
            <div>
              <span className="system-label text-birdseye-electric">YARD OS · CORES</span>
              <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream">
                Three{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  intelligent
                </span>{" "}
                cores.
              </h2>
            </div>
            <p className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3">
              Run one. Run all three. Each core is independently deployable
              and the whole becomes more than the sum.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px border-t border-birdseye-cream/[0.10] bg-birdseye-cream/[0.08]">
            <CoreCard
              index="01"
              name="GateCore"
              tagline="Zero-friction access · Full accountability"
              description="Automate ID, BOL capture, seal verification — every gate event, every truck. Your gate becomes your competitive advantage."
              href="/platform/gatecore"
              image={images.cores.GateCore}
              imageAlt="GateCore, truck arriving at automated gate with driver-ID verification overlay"
            />
            <CoreCard
              index="02"
              name="SafeCore"
              tagline="Security that acts, not watches"
              description="Perimeter security that intervenes. Detect, voice down, escalate — before an event becomes an incident."
              href="/platform/safecore"
              image={images.cores.SafeCore}
              imageAlt="SafeCore, face-detection close-up from a SafeCore perimeter feed"
            />
            <CoreCard
              index="03"
              name="YardCore"
              tagline="One view · Total command"
              description="Live spot occupancy, trailer dwell tracking, compliance enforcement. Every move on the yard, sealed."
              href="/platform/yardcore"
              image={images.cores.YardCore}
              imageAlt="YardCore, aerial yard view with overlaid trailer-zone tracking"
            />
          </div>
        </Container>
      </section>

      <MetricStrip
        eyebrow="THE PLATFORM"
        preTitle="At"
        italicTitle="scale"
        postTitle="."
        description="Run-rate volume + performance, across every active deployment."
        metrics={[
          { value: "12M", label: "Gate transactions handled monthly" },
          { value: "$100B+", label: "Assets monitored and protected" },
          { value: "75%", label: "Faster gate processing on average" },
          { value: "99.99%", label: "Accuracy and uptime at the gate" },
        ]}
      />

      {/* StakeholderLanes — the three-buyer framing (Yard Manager /
          Security Director / Compliance Officer). Revived 2026-05-03 to
          /platform after being cut from home. Was cut with the reasoning
          "role-specific deep dives live at /platform/{gatecore, safecore,
          yardcore}" — but those are PRODUCT pages, not ROLE pages. The
          competitor audit (Flock + LVT) flagged multi-stakeholder framing
          as the single biggest borrowable move for B2B credibility, and
          the platform overview page is where the buyer's-eye-view belongs.
          Same platform, three buyer-recognized briefings. */}
      <StakeholderLanes />

      <FeatureGrid
        eyebrow="HOW IT WORKS"
        preTitle="The Maximum Telepresence"
        italicTitle="Approach"
        postTitle="™"
        description="AI catches it. People decide what happens next. The system writes it down. Every time."
        columns={3}
        features={[
          {
            title: "Detect",
            body: "Computer vision watches every gate, yard, and perimeter, flagging anomalies the moment they happen.",
          },
          {
            title: "Verify",
            body: "Trained Birdseye specialists review the alert in real time, intervene, and route the right escalation.",
          },
          {
            title: "Document",
            body: "Every event time-stamped, tagged, and audit-ready. Gate logs, video, voice, outcome, one record.",
          },
        ]}
      />

      {/* Birdseye Difference — six-point competitive differentiation
          grid, relocated 2026-05-04 from /about-us where the framing
          ("the things that don't appear on anyone else's pitch deck")
          read as a product argument on a company-about page. /platform
          is where the buyer is actively evaluating Birdseye against
          Verkada / LVT / Outpost / Flock; this is the section that
          earns its place there. Sits BEFORE the closing CtaBanner so
          the differentiation is the last argument the buyer reads. */}
      <BirdseyeDifference />

      <CtaBanner
        preTitle="Ready to see it"
        italicTitle="live"
        postTitle="?"
        description="Book a 20-minute walkthrough on your own yard."
        secondaryCta={{ label: "See integrations", href: "/platform/integrations" }}
      />
    </PageShell>
  );
}

function CoreCard({
  index,
  name,
  tagline,
  description,
  href,
  image,
  imageAlt,
}: {
  index: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-birdseye-surface border-b border-birdseye-cream/[0.10] hover:bg-[#15151A] transition-colors flex flex-col"
    >
      {/* Core preview image, pulled from images.cores. Subtle zoom
          on hover, electric corner caption that picks up the brand
          vocabulary used elsewhere on archive frames. The image is
          the buyer's first visceral cue for what each core *is*
          before they read a word. */}
      {image && imageAlt && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-birdseye-cream/[0.10]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/85">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-birdseye-electric"
            />
            Core · {index}
          </div>
        </div>
      )}

      <div className="p-7 md:p-9 flex-1 flex flex-col">
        <h3 className="text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] tracking-[-0.015em] font-bold text-birdseye-cream">
          {name}
        </h3>
        <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-birdseye-cream/55 uppercase">
          {tagline}
        </p>
        <p className="mt-5 text-[14.5px] leading-[1.6] text-birdseye-cream/65 flex-1">
          {description}
        </p>
        <div className="mt-7 inline-flex items-center gap-2 text-[13px] text-birdseye-cream/85 group-hover:text-birdseye-electric transition-colors">
          Explore {name}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
