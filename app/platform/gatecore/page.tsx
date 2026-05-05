import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { FeatureGrid } from "@/components/site/page/FeatureGrid";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";
import { RoiCalculator } from "@/components/site/RoiCalculator";
import { Pricing } from "@/components/site/page/Pricing";
import { MediaSpread } from "@/components/site/page/MediaSpread";
import { CapabilityPills } from "@/components/site/page/CapabilityPills";
import { FAQAccordion } from "@/components/site/page/FAQAccordion";
import { PullQuote } from "@/components/site/PullQuote";
import { images } from "@/_design/images";

export const metadata = {
  title: "GateCore, Birdseye",
  description:
    "Automate ID, seals, entries, exits, and all gate protocols. Your gate becomes your competitive advantage.",
};

export default function GateCorePage() {
  return (
    <PageShell bareFooter>
      {/* PageMasthead (ISSUE / CORE / VOL filing line) removed 2026-05-04
          per Scotty — read as editorial overkill at the top of core
          pages. Removed across all three core pages. */}
      <PageHero
        eyebrow="YARD OS · CORE 01 · GATECORE"
        preTitle="Your gate becomes your"
        italicTitle="competitive"
        postTitle="advantage."
        tagline="Zero-friction access. Full accountability."
        description="For those who need: real-time ID verification, automated seal + BOL capture, US DOT compliance, hazmat enforcement, audit-grade records on every entry. GateCore runs all of it — every truck, every shift, every gate."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "Run the ROI calculator", href: "/roi-calculator" }}
      />

      <FeatureGrid
        eyebrow="WHAT GATECORE DOES"
        preTitle="Every gate event,"
        italicTitle="verified"
        postTitle="."
        description="Capabilities that replace radio-and-clipboard with a system of record."
        features={[
          {
            title: "ID-Verify™",
            body: "Driver identity and credentials verified in real time. Stop fraudulent pickups before the gate opens.",
          },
          {
            title: "Trailer & seal verification",
            body: "Camera-verified seal numbers and trailer condition on every entry, exit, and intra-yard move.",
          },
          {
            title: "Bills of Lading",
            body: "BOLs digitally captured, scanned, and matched against your TMS at gate-arrival.",
          },
          {
            title: "Faster gate processing",
            body: "Average 75% reduction in dwell time. More turns per shift without sacrificing security.",
          },
          {
            title: "Voice-Down™ deterrence",
            body: "Live agent intervention through mounted speakers, corrects behavior in real time, no escalation needed.",
          },
          {
            title: "Compliance-ready records",
            body: "Time-stamped video, voice, and event log for every gate transaction. Pull on demand.",
          },
        ]}
      />

      <MetricStrip
        eyebrow="THE NUMBERS"
        preTitle="GateCore"
        italicTitle="at the gate"
        postTitle="."
        description="What the gate looks like when GateCore is running it."
        metrics={[
          { value: "75%", label: "Faster gate processing on average" },
          { value: "12M", label: "Gate transactions handled monthly" },
          { value: "99.99%", label: "Verification accuracy at the gate" },
          { value: "<3 min", label: "Average gate dwell across customers" },
        ]}
      />

      {/* Capability pills, sourced from the GateCore Figma frame.
          Discrete row of nine gate-side capabilities with their own
          visual identity, enumerating what GateCore actually checks
          on every truck. */}
      <CapabilityPills
        eyebrow="WHAT THE GATE CHECKS"
        preTitle="Every truck,"
        italicTitle="every"
        postTitle=" capability."
        description="GateCore runs the full inspection in seconds, credentials, cargo, condition, compliance, so your team can stop chasing checklists."
        pills={[
          "Licence Check",
          "BOL Capture",
          "Seal Verification",
          "US DOT Compliance",
          "Hazardous Load Protocol",
          "Condition Proof",
          "Tire Check",
          "Empty Verification",
          "Pre/Post Trip Inspection",
        ]}
      />

      {/* Editorial pull-quote, section interlude between the
          capabilities + metrics block and the deep-dive editorial
          spreads. Customer voice as architecture, not decoration. */}
      <PullQuote
        eyebrow="FROM THE FIELD"
        filing="REFRIGERATED 3PL · 2025"
        accent={"“We move 1,800 trucks a week through this gate."}
        quote={
          "Plates, seals, BOLs, Birdseye reads every one before my team does. The contract paid for itself in six months.”"
        }
        attribution={{
          name: "Yard Operations Director",
          role: "Refrigerated logistics · Ontario",
        }}
      />

      {/* Editorial spreads, sourced from the GateCore Figma frame.
          Three feature deep-dives with photo+copy zigzag. Each pulls its
          image from `images.gateCore.*` (see _design/images.ts). */}
      <MediaSpread
        eyebrow="DETECTION"
        preTitle="Smart recognition,"
        italicTitle="every"
        postTitle=" gate event."
        body="Birdseye automatically identifies vehicles, drivers, trailers, and containers as they enter and exit your yard. Every event is captured in real time and tied to a verified gate record, accurate, auditable, and never missed."
        bullets={[
          "License plate capture",
          "BOL & document imaging",
          "Seal verification",
          "US DOT compliance",
          "Hazardous load checks",
          "Pre/post-trip inspection",
        ]}
        image={images.gateCore.smartRecognition}
        imageAlt="GateCore identifying a truck and trailer at the gate"
        side="right"
        aspect="4/3"
        archive="ARCHIVE · GATECORE DETECTION · 2024"
      />

      <MediaSpread
        eyebrow="AUTOMATION"
        preTitle="A gate that"
        italicTitle="runs"
        postTitle=" itself."
        body="GateCore automates verification, identity checks, and document capture. Drivers move through faster, accuracy improves, and your team spends less time managing the gate, and more time running the business."
        cta={{ label: "See how it works", href: "/book-a-demo" }}
        image={images.gateCore.runsItself}
        imageAlt="Operator overseeing automated gate processing"
        side="left"
        aspect="4/3"
        archive="ARCHIVE · OPERATOR CONSOLE · 2025-Q1"
      />

      <MediaSpread
        eyebrow="THROUGHPUT"
        preTitle="More throughput."
        italicTitle="Less"
        postTitle=" overhead."
        body="Process more trucks per hour while reducing manual intervention. GateCore identifies drivers, captures seals, documents trailers, and resolves issues before they create delays, and surfaces it all on a live operations dashboard."
        cta={{ label: "Increase gate speed", href: "/book-a-demo" }}
        image={images.gateCore.throughput}
        imageAlt="Live gate operations dashboard"
        side="right"
        aspect="4/3"
        archive="ARCHIVE · OPERATIONS DASHBOARD · 2025"
      />

      {/* ROI Calculator */}
      <section className="section-dark py-24 md:py-section">
        <Container className="max-w-site">
          <div className="text-center max-w-[720px] mx-auto mb-16">
            <span className="system-label text-birdseye-electric">WHAT IT COSTS YOU NOT TO</span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
              Estimate your gate-automation{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                ROI
              </span>
              .
            </h2>
            <p className="mt-5 text-body text-birdseye-cream/55 max-w-[520px] mx-auto">
              Most yards see a 75% reduction in gate processing time. Use the
              calculator to see what that&apos;s worth on your operation.
            </p>
          </div>
          <RoiCalculator />
        </Container>
      </section>

      {/* Pricing tiers + Compare-all-plans table, sourced from Figma
          (Solutions > GateCore frame, "Pricing plans" + "Compare all plans"
          sections). The component bundles both sections so the order can't
          drift apart. */}
      <Pricing />

      {/* GateCore FAQ — procurement-grade questions specific to gate
          ops, sits before the closing CTA. Reuses the same FAQAccordion
          primitive HomeFaq uses; copy is GateCore-specific. */}
      <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
        <Container className="max-w-site">
          <FAQAccordion
            eyebrow="QUESTIONS · GATECORE"
            preTitle="GateCore"
            italicTitle="answered"
            postTitle="."
            description="Procurement-grade questions yard ops directors ask about gate automation."
            items={[
              {
                question: "Does GateCore work with our existing gate hardware?",
                answer:
                  "Most of the time, yes. We integrate with arm gates, slide gates, bollards, and turnstiles from the major manufacturers (Magnetic, Doorking, FAAC, HySecurity, etc.) and most ONVIF-compliant cameras. The day-1 discovery walk inventories what stays, what gets supplemented, and what gets replaced.",
              },
              {
                question: "How fast does the gate process trucks with GateCore?",
                answer:
                  "Average 75% reduction in dwell time vs. manual verification. Most trucks process in under 90 seconds — license plate, driver ID, BOL capture, seal verification, all in parallel.",
              },
              {
                question: "What documents does GateCore capture automatically?",
                answer:
                  "Driver license, BOL (Bill of Lading), US DOT compliance, seal numbers, hazmat placards, trailer condition photos, and pre/post-trip inspection state. All time-stamped, all matched against your TMS at gate-arrival.",
              },
              {
                question: "Can GateCore integrate with our TMS / YMS / WMS?",
                answer:
                  "Yes. Bidirectional REST API for major TMS/YMS/WMS platforms, with custom integrations for in-house systems. Gate events flow into your existing dispatch view; data flows back to keep the AI tuned to your operation.",
              },
              {
                question: "What happens if a driver isn't on our roster?",
                answer:
                  "GateCore Voice-Down™'s the driver, requests credentials, and routes to your dispatch if escalation is needed. The driver gets a clean experience; your team gets a logged event with full context, no phone tag.",
              },
              {
                question: "How long does GateCore take to install and go live?",
                answer:
                  "Two weeks from contract to operational, average. Day 1 discovery walk → Day 3 site survey → Day 7 install + AI calibration → Day 11 TMS integration → Day 14 live agents on the gate.",
              },
            ]}
          />
        </Container>
      </section>

      <CtaBanner
        preTitle="Ready to"
        italicTitle="modernize"
        postTitle="your gate?"
        description="20-minute walkthrough. We'll show GateCore live on your own footage."
        secondaryCta={{ label: "See SafeCore", href: "/platform/safecore" }}
      />
    </PageShell>
  );
}
