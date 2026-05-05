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
  title: "SafeCore, Birdseye",
  description:
    "AI-powered perimeter security. Detect, deter, and escalate threats instantly, before they become incidents.",
};

export default function SafeCorePage() {
  return (
    <PageShell bareFooter>
      {/* PageMasthead removed 2026-05-04 — see GateCore page for context. */}
      <PageHero
        eyebrow="YARD OS · CORE 02 · SAFECORE"
        preTitle="Security that"
        italicTitle="acts"
        postTitle=", not watches."
        tagline="AI catches it. A live agent intervenes."
        description="For those who need: 24/7 verified perimeter, Voice-Down™ intervention, thermal coverage, after-hours challenge, insurance-grade reporting. SafeCore handles every alert — verified by a trained operator before it reaches your team."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "See it in motion", href: "/video" }}
      />

      <FeatureGrid
        eyebrow="WHAT SAFECORE DOES"
        preTitle="Detect, deter,"
        italicTitle="document"
        postTitle="."
        description="The capabilities that turn passive cameras into an active security perimeter."
        features={[
          {
            title: "Computer-vision detection",
            body: "AI watches every camera every second. Catches loiter, intrusion, and pattern anomalies the moment they happen.",
          },
          {
            title: "Voice-Down™ intervention",
            body: "Live agents speak directly to anyone on site through mounted speakers, most situations resolved without escalation.",
          },
          {
            title: "Smart escalation",
            body: "Verified threats route to your security lead, local PD, or central station, based on your protocol.",
          },
          {
            title: "After-hours coverage",
            body: "When the lights go off, Birdseye doesn't. 24/7/365 human verification on every alert.",
          },
          {
            title: "Vendor & contractor monitoring",
            body: "Auto-flag third parties who deviate from approved access scope or scheduled windows.",
          },
          {
            title: "Insurance-grade reporting",
            body: "Every incident time-stamped with video, voice, and outcome, built for claims and audits.",
          },
        ]}
      />

      <MetricStrip
        eyebrow="THE NUMBERS"
        preTitle="SafeCore"
        italicTitle="in the field"
        postTitle="."
        description="What an active perimeter looks like, in measured units."
        metrics={[
          { value: "9K+", label: "Critical interventions per month" },
          { value: "94K+", label: "Safety violations identified and enforced" },
          { value: "60%+", label: "Average reduction in security spend" },
          { value: "24/7", label: "Live human verification on every alert" },
        ]}
      />

      {/* Editorial pull-quote, section interlude. Customer voice on the
          Voice-Down™ thesis: a live agent on a speaker beats a patrol car. */}
      <PullQuote
        eyebrow="FROM THE FIELD"
        filing="AUTOMOTIVE MANUFACTURING · 2024"
        accent={"“A live agent voicing down through a speaker"}
        quote={
          "gets a trespasser to leave faster than a patrol car ever did. We didn’t believe it until the third time it happened in a week.”"
        }
        attribution={{
          name: "Director of Security",
          role: "Tier-1 automotive manufacturer",
        }}
      />

      {/* Editorial spreads, sourced from the SafeCore Figma frame.
          Three feature deep-dives under the metrics strip. */}
      <MediaSpread
        eyebrow="INTERVENTION"
        preTitle="Proactive trespasser"
        italicTitle="intervention"
        postTitle="."
        body="SafeCore detects movement the moment it enters your perimeter. Trained specialists respond through live audio to stop activity before it escalates, keeping your site secure without guard posts or manual patrols."
        cta={{ label: "See how it works", href: "/book-a-demo" }}
        image={images.safeCore.intervention}
        imageAlt="Perimeter detection alert overlay"
        side="right"
        aspect="4/3"
      />

      <MediaSpread
        eyebrow="ANOMALY DETECTION"
        preTitle="AI-powered anomaly"
        italicTitle="detection"
        postTitle="."
        body="Computer vision reviews every camera feed for unusual activity, unsafe behaviour, or equipment risks. SafeCore alerts your team only when it matters, reducing noise and improving response time."
        cta={{ label: "View the technology", href: "/platform" }}
        image={images.safeCore.anomalyDetection}
        imageAlt="Computer vision identifying a person on camera"
        side="left"
        aspect="4/3"
      />

      <MediaSpread
        eyebrow="THERMAL DETECTION"
        preTitle="Thermal detection in any"
        italicTitle="condition"
        postTitle="."
        body="Thermal imaging reads heat signatures through darkness, fog, glare, and weather. SafeCore identifies intruders earlier and more reliably than traditional surveillance systems, especially when conventional cameras can't see."
        cta={{ label: "Learn more", href: "/book-a-demo" }}
        image={images.safeCore.thermalDetection}
        imageAlt="Thermal-imaging detection of an intruder"
        side="right"
        aspect="4/3"
      />

      <FeatureGrid
        eyebrow="WHY OPERATORS SWITCH"
        preTitle="Versus traditional"
        italicTitle="manned"
        postTitle="security."
        description="What changes when you replace guard shifts with always-on AI plus a verified human."
        columns={2}
        features={[
          {
            title: "Coverage that scales without headcount",
            body: "Add cameras, add yards, Birdseye scales with you. A guard rotation can't.",
          },
          {
            title: "Predictable platform fee",
            body: "One contract covers every camera and every event. Most customers cut 25–50% in security spend.",
          },
          {
            title: "Auditable record on every event",
            body: "When something happens, you have video, voice, timestamps, and outcome, not radio logs and memory.",
          },
          {
            title: "Faster, fairer interventions",
            body: "Voice-Down™ corrects most issues without escalation. The few that escalate are routed instantly.",
          },
        ]}
      />

      {/* SafeCore FAQ — perimeter / intrusion / intervention specifics. */}
      <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
        <Container className="max-w-site">
          <FAQAccordion
            eyebrow="QUESTIONS · SAFECORE"
            preTitle="SafeCore"
            italicTitle="answered"
            postTitle="."
            description="What security directors ask about replacing guard rotations with AI plus a live operator."
            items={[
              {
                question: "How does SafeCore detection differ from a motion sensor?",
                answer:
                  "Computer vision distinguishes between people, animals, vehicles, and weather. False alerts drop dramatically — a deer or a windblown tarp doesn't fire a Voice-Down. Real intrusions do, and they get a trained operator on the speaker within seconds.",
              },
              {
                question: "Does SafeCore work in low-light or weather conditions?",
                answer:
                  "Yes. Standard CV runs on existing cameras 24/7; for sites with heavy fog, glare, or full darkness we deploy thermal imaging that reads heat signatures regardless of conditions. Coverage is matched to your specific risk profile on the discovery walk.",
              },
              {
                question: "What happens when an alert fires after hours?",
                answer:
                  "A live Birdseye operator picks up the feed, verifies the event, and Voice-Down™'s through the on-site speaker — typically within 6–8 seconds of the trigger. Most events resolve at the speaker. Dispatch only fires on the events that don't.",
              },
              {
                question: "Does SafeCore replace our security team or augment it?",
                answer:
                  "Most customers cut 25–50% of guard headcount and keep on-site staff for daytime operations and physical-asset checks. The exact mix depends on your yard size, asset value, and existing posture — we scope it on the discovery walk.",
              },
              {
                question: "How are real threats escalated to police?",
                answer:
                  "One-click handoff with a full event packet — geo-tagged, recorded video, voice transcript, and operator notes on what didn't resolve. Local PD arrives informed, not blind. The Birdseye operator stays on the line through arrival.",
              },
              {
                question: "What perimeter coverage works best with SafeCore?",
                answer:
                  "Strategic placement at entry points, blind corners, dock zones, and high-value asset areas. We audit existing coverage on day 1 and recommend additions only where the math justifies them — not a full rip-and-replace.",
              },
            ]}
          />
        </Container>
      </section>

      <CtaBanner
        preTitle="See SafeCore"
        italicTitle="live"
        postTitle="."
        description="Walk through real intervention footage with a Birdseye agent."
        secondaryCta={{ label: "See YardCore", href: "/platform/yardcore" }}
      />
    </PageShell>
  );
}
