import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { FeatureGrid } from "@/components/site/page/FeatureGrid";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { MediaSpread } from "@/components/site/page/MediaSpread";
import { FAQAccordion } from "@/components/site/page/FAQAccordion";
import { PullQuote } from "@/components/site/PullQuote";
import { Container } from "@/components/ui/Container";
import { images } from "@/_design/images";

export const metadata = {
  title: "YardCore, Birdseye",
  description:
    "Live spot occupancy, trailer dwell tracking, compliance enforcement. Every move on the yard, sealed.",
};

export default function YardCorePage() {
  return (
    <PageShell bareFooter>
      {/* PageMasthead removed 2026-05-04 — see GateCore page for context. */}
      <PageHero
        eyebrow="YARD OS · CORE 03 · YARDCORE"
        preTitle="One view."
        italicTitle="Total"
        postTitle="command."
        tagline="Smarter, safer yard operations from a single live view."
        description="For those who need: live spot occupancy, trailer dwell tracking, spotter dispatch, multi-site visibility, compliance enforcement. YardCore turns the whole yard into managed infrastructure — every spot, every move, every inspection."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "See it in motion", href: "/video" }}
      />

      <FeatureGrid
        eyebrow="WHAT YARDCORE DOES"
        preTitle="From parking to"
        italicTitle="audit"
        postTitle=", in one platform."
        description="The capabilities that turn a chaotic yard into managed infrastructure."
        features={[
          {
            title: "Live spot occupancy",
            body: "Every parking spot in your yard, live, on one map. Instantly find any trailer or unit.",
          },
          {
            title: "Trailer tracking & dwell",
            body: "Know how long each trailer has been on the yard. Hot/cold status. Alerts on aging assets.",
          },
          {
            title: "Yard moves & spotter dispatch",
            body: "Verified spotter moves, with origin/destination on every shunt. No more lost trailers.",
          },
          {
            title: "Inspection & compliance",
            body: "Pre-trip and yard-check inspections captured digitally with video evidence. Audit-ready instantly.",
          },
          {
            title: "Driver behavior & safety",
            body: "Speed, route compliance, restricted-zone violations, flagged in real time, escalated as needed.",
          },
          {
            title: "Live operational dashboard",
            body: "One view your yard manager actually uses. KPIs, exceptions, and live activity in one screen.",
          },
        ]}
      />

      <MetricStrip
        eyebrow="THE NUMBERS"
        preTitle="What YardCore"
        italicTitle="actually"
        postTitle="moves."
        metrics={[
          { value: "100%", label: "Spot-by-spot yard visibility" },
          { value: "<5 min", label: "Average trailer-find time" },
          { value: "94K+", label: "Safety violations identified and enforced" },
          { value: "24/7", label: "Live operational coverage" },
        ]}
      />

      {/* Editorial pull-quote, section interlude. Customer voice on
          replacing four spreadsheets with one screen. */}
      <PullQuote
        eyebrow="FROM THE FIELD"
        filing="REGIONAL CARRIER · 2025"
        accent={"“We were running four spreadsheets and two dashboards"}
        quote={
          "to know which trailers were where. Now there’s one screen. The shift huddle takes nine minutes instead of forty.”"
        }
        attribution={{
          name: "VP, Yard Operations",
          role: "Regional carrier · US Midwest",
        }}
      />

      {/* Editorial spreads, sourced from the YardCore Figma frame.
          Three deep-dives showing safety, workflow, and risk in motion. */}
      <MediaSpread
        eyebrow="SAFETY"
        preTitle="Proactive safety"
        italicTitle="oversight"
        postTitle="."
        body="Spot unsafe behaviour before it becomes a problem. YardCore monitors pedestrian zones, forklift routes, loading areas, and blind spots with AI-powered alerts that protect people and equipment, and route to the right operator instantly."
        cta={{ label: "See how it works", href: "/book-a-demo" }}
        image={images.yardCore.safetyOversight}
        imageAlt="Pedestrian-zone safety enforcement on the yard"
        side="right"
        aspect="4/3"
      />

      <MediaSpread
        eyebrow="WORKFLOW"
        preTitle="Real-time workflow"
        italicTitle="compliance"
        postTitle="."
        body="Ensure SOPs are followed across shifts, teams, contractors, and equipment. YardCore automatically flags violations, tracks corrective actions, and keeps every workflow accountable, without anyone having to chase paperwork."
        cta={{ label: "Learn more", href: "/book-a-demo" }}
        image={images.yardCore.workflowCompliance}
        imageAlt="Live operator monitoring yard workflow on screen"
        side="left"
        aspect="4/3"
      />

      <MediaSpread
        eyebrow="RISK DETECTION"
        preTitle="AI-powered risk"
        italicTitle="detection"
        postTitle="."
        body="Identify near misses, unsafe operation, and out-of-bounds activity with precision. YardCore's computer vision understands movement patterns and highlights risk before anyone is in danger."
        cta={{ label: "Explore risk detection", href: "/platform/safecore" }}
        image={images.yardCore.riskDetection}
        imageAlt="Perimeter risk detection on the yard"
        side="right"
        aspect="4/3"
      />

      <FeatureGrid
        eyebrow="WHY YARD MANAGERS LOVE IT"
        preTitle="The yard"
        italicTitle="manages"
        postTitle="itself."
        description="What changes when YardCore is on."
        columns={2}
        features={[
          {
            title: "Faster turns, fewer detentions",
            body: "Trailers found in under five minutes on average. Detention claims drop with documented arrivals.",
          },
          {
            title: "Audit-ready compliance",
            body: "Every inspection, every move, every event time-stamped with video. The auditor leaves smiling.",
          },
          {
            title: "Lower spotter overhead",
            body: "Verified spotter moves prevent rework. One spotter does the work of two with YardCore.",
          },
          {
            title: "Network-wide visibility",
            body: "Multi-yard operators see every site on one dashboard. Standardize KPIs, reporting, and protocols.",
          },
        ]}
      />

      {/* YardCore FAQ — yard ops / multi-site specifics. */}
      <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
        <Container className="max-w-site">
          <FAQAccordion
            eyebrow="QUESTIONS · YARDCORE"
            preTitle="YardCore"
            italicTitle="answered"
            postTitle="."
            description="What yard managers ask about turning a chaotic yard into managed infrastructure."
            items={[
              {
                question: "What does YardCore monitor that GateCore + SafeCore don't?",
                answer:
                  "In-yard movement, parking spot occupancy, dwell time on dock doors, trailer hot/cold status, and multi-yard coordination. GateCore handles the gate; SafeCore handles the perimeter; YardCore handles everything in between.",
              },
              {
                question: "Can YardCore enforce safety protocols across the yard?",
                answer:
                  "Yes. PPE checks, fire-lane clearance, hazmat zone boundaries, restricted-area enforcement, speed limits for spotters, pedestrian zone violations. Voice-Down™ corrects in real time; the system files the record either way.",
              },
              {
                question: "How does YardCore work with our existing YMS?",
                answer:
                  "Two-way integration with the major YMS platforms, REST API for in-house systems. Spot occupancy, trailer dwell, and yard-move events flow into your YMS view; YMS state flows back to keep YardCore aligned.",
              },
              {
                question: "Can YardCore manage trailer pools across multiple sites?",
                answer:
                  "Yes. Single dashboard for multi-site visibility — every yard's spot occupancy, trailer dwell, and inspection status on one screen. Standardize KPIs and protocols across the network without rebuilding them per site.",
              },
              {
                question: "What happens at shift change?",
                answer:
                  "Live status board shows what's outstanding from the prior shift — trailers waiting on dispatch, inspections incomplete, spotter moves in flight. Shift huddle drops from forty minutes to under ten, per our customers.",
              },
              {
                question: "Can drivers self-service through YardCore?",
                answer:
                  "Yes. Yard map, gate status, and dock assignment visible to drivers via in-cab terminal or mobile. Drivers stop calling dispatch for updates; dispatch stops fielding the calls.",
              },
            ]}
          />
        </Container>
      </section>

      <CtaBanner
        preTitle="See YardCore"
        italicTitle="live"
        postTitle="."
        description="20 minutes. Real footage. We'll show you your yard the way YardCore would see it."
        secondaryCta={{ label: "See integrations", href: "/platform/integrations" }}
      />
    </PageShell>
  );
}
