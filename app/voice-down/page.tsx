import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { MediaSpread } from "@/components/site/page/MediaSpread";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CapabilityPills } from "@/components/site/page/CapabilityPills";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { PullQuote } from "@/components/site/PullQuote";
import { Container } from "@/components/ui/Container";
import { maxTelepresence } from "@/_design/content";

export const metadata = {
  title: "Voice-Down™ Technology · Birdseye",
  description:
    "Live audio intervention from a trained operator. The deterrent your camera doesn't have. Most events resolve at the speaker, before they require dispatch.",
};

/**
 * /voice-down — dedicated explainer page for Voice-Down™ technology.
 *
 * LIVE-3 (2026-05-03): Voice-Down is one of Birdseye's two trademarked
 * mechanisms (alongside Maximum Telepresence™ and ID-Verify™) and is
 * mentioned across the site without ever being explained in depth. This
 * page anchors what it actually is, who's behind it, and what it
 * accomplishes vs the alternatives (silent alarms, dispatch, sirens).
 *
 * Architecture mirrors LIVE-2 (Maximum Telepresence) for sitewide
 * consistency: PageMasthead + PageHero → Premise → three layered
 * MediaSpreads → CapabilityPills (what operators can do via Voice-Down)
 * → MetricStrip → PullQuote → CtaBanner. Smaller scope than LIVE-2
 * because Voice-Down is a single mechanism, not a methodology.
 */
export default function VoiceDownPage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="TECHNOLOGY · VOICE-DOWN™"
        preTitle="Real voices stop"
        italicTitle="real"
        postTitle=" intrusions."
        tagline="Live audio intervention from a trained operator. The deterrent your camera doesn't have."
        description="Voice-Down™ is what turns a camera into a guard. The instant something triggers, a real Birdseye operator speaks through the on-site speaker — calm, specific, accountable. Most events resolve at this layer, before they escalate, before they require dispatch, before they become an incident report."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{
          label: "How the method works",
          href: "/maximum-telepresence",
        }}
      />

      <Premise />

      <MediaSpread
        eyebrow="REAL HUMAN, REAL TIME"
        preTitle="A trained voice, not a"
        italicTitle="synthesized"
        postTitle=" recording."
        body="The voice that comes through the speaker is a person. A trained Birdseye operator, sitting at a real ops console, watching the same feed as the AI, with the gate context and the protocol for that yard already loaded. People respond differently to a real human voice than to a recorded warning — the instant of recognition that someone is actually watching is the deterrent itself."
        bullets={[
          "Live operator speaks through mounted speakers",
          "No pre-recorded loops, no AI voice synthesis",
          "Operator sees the live feed, the gate, the subject",
          "Tier-graded staffing, every shift covered 24/7",
        ]}
        image={maxTelepresence.steps[1].poster}
        imageAlt="Operator speaking through the Voice-Down system"
        side="right"
        aspect="4/3"
        archive="ARCHIVE · VOICE-DOWN · OPS CONSOLE · 2025"
      />

      <MediaSpread
        eyebrow="CALM. SPECIFIC. ACCOUNTABLE."
        preTitle="The instruction lands"
        italicTitle="without"
        postTitle=" escalation."
        body="Operators don't shout. They name the situation, address the person directly, cite the protocol — &quot;The gate's closed for the night. Please pull around to the visitor lot.&quot; — and most subjects comply on the first ask. The voice carries the implication of accountability: this person sees you, this conversation is on the record, and the next call is to dispatch if the redirection doesn't take."
        bullets={[
          "Direct address to the person, not a generic broadcast",
          "Cites the specific gate, time, and protocol",
          "Every Voice-Down recorded with the triggering event",
          "Compliance language tuned per yard and per industry",
        ]}
        image={maxTelepresence.steps[2].poster}
        imageAlt="Verified gate event with operator voice transcript"
        side="left"
        aspect="4/3"
        archive="ARCHIVE · VOICE-DOWN · TRANSCRIPT · 2025"
      />

      <MediaSpread
        eyebrow="WHEN IT ESCALATES"
        preTitle="The path from voice to"
        italicTitle="dispatch"
        postTitle=" is one decision."
        body="Most events end at the speaker. The ones that don't get escalated by the same operator who just spoke — to local police, to your own dispatch, to your on-call manager. The escalation carries the full record: timestamps, video, voice transcripts, and the operator's notes on what didn't resolve. Responders arrive informed, not blind."
        bullets={[
          "Single-click escalation to local PD or on-call team",
          "Full event record handed off, no re-explaining",
          "Geo-tagged dispatch packets with gate access info",
          "Operator stays on the line through arrival",
        ]}
        image={maxTelepresence.steps[0].poster}
        imageAlt="Dispatch escalation flow from Voice-Down"
        side="right"
        aspect="4/3"
        archive="ARCHIVE · ESCALATION · DISPATCH HANDOFF · 2025"
      />

      <CapabilityPills
        eyebrow="WHAT VOICE-DOWN CAN DO"
        preTitle="Every intervention,"
        italicTitle="one"
        postTitle=" mechanism."
        description="The same Voice-Down channel handles everything from a polite redirect to a stop-work safety call. Operators choose the tool; the speaker delivers it."
        pills={[
          "Polite redirect",
          "Compliance reminder",
          "Stop-work safety call",
          "ID & paperwork request",
          "After-hours challenge",
          "PPE enforcement",
          "Driver wake-up at the gate",
          "Theft deterrence",
          "Fire-lane clearance",
          "Hazmat protocol prompt",
          "Warning before dispatch",
          "Multilingual instruction",
        ]}
      />

      <MetricStrip
        eyebrow="VOICE-DOWN · BY THE NUMBERS"
        preTitle="What real-time speaker intervention"
        italicTitle="actually"
        postTitle="does."
        metrics={[
          {
            value: "6–8s",
            label: "Avg time from trigger to Voice-Down",
            note:
              "Mean elapsed time from event detection to operator-initiated speaker intervention. Internal platform telemetry, Q1 2026.",
          },
          {
            value: "82%",
            label: "Resolved at first contact, no escalation",
            note:
              "Share of triggered events resolved at the Voice-Down layer without dispatch handoff. Internal platform telemetry, Q1 2026.",
          },
          {
            value: "100%",
            label: "Recorded with the triggering event",
            note:
              "Every Voice-Down is sealed into the event archive — operator audio, video frames, and outcome — as a single tamper-evident record.",
          },
          {
            value: "24/7",
            label: "Operator coverage on every monitored gate",
            note:
              "No shifts, no gaps. Operators rotate through 24-hour coverage from Mississauga, Dallas, Belgrade, and Bogotá ops floors.",
          },
        ]}
      />

      <PullQuote
        eyebrow="FROM THE FIELD"
        filing="REFRIGERATED 3PL · NIGHT YARD · 2025"
        accent={"“The first time my driver heard a voice come through the speaker at 2am he stopped dead."}
        quote={
          "He thought there was someone in the booth. The fact there wasn't — that's the whole point.”"
        }
        attribution={{
          name: "Yard Operations Director",
          role: "Refrigerated logistics · Ontario",
        }}
      />

      <CtaBanner
        preTitle="Want to hear a Voice-Down on"
        italicTitle="your"
        postTitle=" yard?"
        description="20-minute walkthrough on your own footage. We'll trigger a real event so you can hear how an operator handles it before your team would even notice."
        secondaryCta={{
          label: "See the method",
          href: "/maximum-telepresence",
        }}
      />
    </PageShell>
  );
}

/**
 * Premise — short editorial section that names the gap Voice-Down
 * fills. Cameras see, sirens scare, dispatch responds — none of those
 * is a person speaking calmly to the situation in real time. That's
 * the gap.
 */
function Premise() {
  return (
    <section className="section-dark py-24 md:py-section">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">
          <div>
            <span className="system-label text-birdseye-electric">
              THE PREMISE
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
              Cameras see. Sirens scare.{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                People
              </span>{" "}
              talk.
            </h2>
          </div>
          <div className="space-y-5 text-body text-birdseye-cream/65 max-w-copy">
            <p>
              The traditional after-hours toolkit is silent observation
              followed by escalation. A camera records what's happening; an
              alarm announces it loudly; a guard truck arrives twenty minutes
              later. None of those is a person, in real time, addressing
              the situation by name.
            </p>
            <p>
              Voice-Down is the missing link. The instant something triggers,
              a real operator is in the conversation — calm, specific, on the
              record. The deterrent isn't volume; it's the recognition that
              someone is actually watching, and is willing to say so.
            </p>
            <p className="text-birdseye-cream font-semibold">
              Most subjects comply at the first ask. The few who don't
              trigger dispatch — and the operator stays on the line through
              arrival.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
