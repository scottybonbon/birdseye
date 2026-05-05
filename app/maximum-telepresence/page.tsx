import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { MediaSpread } from "@/components/site/page/MediaSpread";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { PullQuote } from "@/components/site/PullQuote";
import { Container } from "@/components/ui/Container";
import { maxTelepresence } from "@/_design/content";

export const metadata = {
  title: "Maximum Telepresence™ · Birdseye",
  description:
    "The method Birdseye is built around — three layers of presence on every gate event: AI detection, live operator verification, and audit-grade records.",
};

/**
 * /maximum-telepresence — dedicated explainer page for the brand's
 * crown methodology.
 *
 * LIVE-2 (2026-05-03): the home page carries Maximum Telepresence as
 * a 3-pane triptych — that's a hub, not a destination. The 2026-05
 * competitor audit identified Maximum Telepresence as Birdseye's most
 * distinctive idea ("give it real estate in the storytelling, not just
 * keynotes"). This page IS that real estate.
 *
 * Architecture:
 *  1. PageMasthead + PageHero, the editorial set-up
 *  2. Premise, the origin / why it exists, the false binary it refuses
 *  3. Three layered MediaSpreads (DETECT / VERIFY / DOCUMENT) — each
 *     gets a full editorial spread with bullets and an archive caption,
 *     so the methodology reads as deep, not just a card row
 *  4. WhatItIsnt, three-up differentiator section
 *  5. MetricStrip, the SLAs behind the method
 *  6. PullQuote, operator testimony
 *  7. CtaBanner
 *
 * Image continuity: each layer's MediaSpread reuses the poster from
 * the corresponding home-page triptych pane (DETECT / VERIFY /
 * DOCUMENT), so a visitor coming from the home page sees the
 * thumbnails they remember, just at scale, with the deep story.
 */
export default function MaximumTelepresencePage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="THE METHOD · MAXIMUM TELEPRESENCE™"
        preTitle="Three layers of presence."
        italicTitle="One"
        postTitle="verified record."
        tagline="AI catches it. A live agent decides. The system writes it down. Every time."
        description="Maximum Telepresence is the practice Birdseye is built around — the deliberate pairing of computer vision, trained remote operators, and audit-grade record-keeping. It's not a feature. It's how every gate event is handled, from the moment something happens to the moment the file is sealed."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "See the home triptych", href: "/#how" }}
      />

      <Premise />

      <MediaSpread
        eyebrow="LAYER 01 · DETECT"
        preTitle="AI sees the event before"
        italicTitle="anyone"
        postTitle=" else does."
        body="Computer vision watches every camera, every second. Patterns that don't fit the yard's normal — an unfamiliar truck, a missing seal, a driver without proper PPE, a gate left propped open — surface the instant they happen. There are no shifts to start, no breaks to take, no blind spots between rounds. Detection compounds: every event the system sees gets folded into the model, so next quarter's accuracy is sharper than this quarter's."
        bullets={[
          "Always-on CV across every camera, every second",
          "Edge processing keeps detection live on degraded uplinks",
          "Per-yard model training, familiarity is local not generic",
          "Sub-2-second handoff to a live operator on triggered events",
        ]}
        image={maxTelepresence.steps[0].poster}
        imageAlt="Computer vision detecting a truck at the gate"
        side="right"
        aspect="4/3"
        archive="ARCHIVE · DETECT · 03:14:22"
      />

      <MediaSpread
        eyebrow="LAYER 02 · VERIFY"
        preTitle="An operator decides what to"
        italicTitle="actually"
        postTitle=" do about it."
        body="Detection on its own is alerts without action. The instant something triggers, a trained Birdseye operator picks up the feed — already seeing what the AI saw, with the camera positions, the gate context, and the protocol for that yard. Most events resolve at this layer: a Voice-Down™ through the speaker, a polite check-in, a redirected vehicle. Without a single dispatch call. Without waking your team. Without a guard truck rolling."
        bullets={[
          "Trained operators with eyes on every triggered event",
          "Voice-Down™ intervention, typically within 6–8 seconds",
          "Yard-specific protocols loaded per facility",
          "Background-checked, tier-graded operator staffing 24/7",
        ]}
        image={maxTelepresence.steps[1].poster}
        imageAlt="Operator verifying a triggered event in the ops console"
        side="left"
        aspect="4/3"
        archive="ARCHIVE · VERIFY · 03:14:31"
      />

      <MediaSpread
        eyebrow="LAYER 03 · DOCUMENT"
        preTitle="The system seals the"
        italicTitle="record"
        postTitle="."
        body="What gets resolved gets sealed. Every event becomes a tamper-evident record at the moment it happens — video frames, voice transcripts, operator decisions, gate states, outcome. Pull on demand for the audit, the lawsuit, the insurance claim, the customer call. The system holds the receipts so your team doesn't have to."
        bullets={[
          "Tamper-evident chain of custody on every captured asset",
          "Searchable by yard, time, plate, seal, BOL, or driver",
          "Built for SOC 2, ISO 27001, FSMA documentation",
          "Default 30-day retention, configurable to seven years",
        ]}
        image={maxTelepresence.steps[2].poster}
        imageAlt="Sealed audit record of a verified gate event"
        side="right"
        aspect="4/3"
        archive="ARCHIVE · DOCUMENT · 03:14:46"
      />

      <WhatItIsnt />

      <MetricStrip
        eyebrow="THE NUMBERS"
        preTitle="What"
        italicTitle="this"
        postTitle="actually means."
        description="The method's operating shape, in measured units."
        metrics={[
          { value: "<2s", label: "Handoff from CV detection to live operator" },
          { value: "6–8s", label: "Avg time from trigger to Voice-Down™" },
          { value: "100%", label: "Triggered events sealed as records" },
          { value: "24/7", label: "Coverage on every monitored gate" },
        ]}
      />

      <PullQuote
        eyebrow="FROM THE FIELD"
        filing="C.R. ENGLAND · REGIONAL FACILITY · 2025"
        accent={"“Birdseye gives us more than security."}
        quote={
          "Our 50-acre yard operates more efficiently, and our damage claims have gone down.”"
        }
        attribution={{
          name: "Stephen Merrion",
          role: "Regional Facilities Manager · C.R. England",
        }}
      />

      <CtaBanner
        preTitle="Want to see the method run on"
        italicTitle="your"
        postTitle="yard?"
        description="20-minute walkthrough on your own footage. We'll trigger a real event end-to-end so you can see DETECT, VERIFY, and DOCUMENT with your gates in frame."
        secondaryCta={{ label: "See GateCore", href: "/platform/gatecore" }}
      />
    </PageShell>
  );
}

/**
 * Premise — origin section. Articulates the false binary that
 * Birdseye refuses (cameras vs guards) and names Maximum Telepresence
 * as the alternative. Reads as editorial setup before the three
 * MediaSpread layers below.
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
              The industry asked the{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                wrong
              </span>{" "}
              question.
            </h2>
          </div>
          <div className="space-y-5 text-body text-birdseye-cream/65 max-w-copy">
            <p>
              For years, security ran on a forced binary: cameras or guards.
              Cameras give you coverage but no judgment. Guards give you
              judgment but no coverage. The math has never worked, cameras-only
              misses the moment that matters; guards-only misses everything
              else.
            </p>
            <p>
              Birdseye was founded to refuse the trade-off. Maximum Telepresence
              is the practice that refuses it: every camera watched by AI,
              every triggered event verified by a trained operator, every
              outcome filed as evidence. Not three features stitched together,
              one method, applied uniformly to every gate event.
            </p>
            <p className="text-birdseye-cream font-semibold">
              Presence isn&apos;t pixels. It&apos;s the discipline of being
              there — at the gate, at the moment, on the record.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * WhatItIsnt — three-up differentiator section. Names the three things
 * Maximum Telepresence is NOT, each with the false-equivalent pitch
 * that competitors actually make and the missing layer that makes the
 * difference. Italic-serif accent on each "isn't" land the contrast.
 */
function WhatItIsnt() {
  const columns = [
    {
      headline: "It isn't just AI cameras.",
      isnt: "AI detection without human judgment is alerts without action.",
      is: "The verification layer is what turns detection into intervention — every triggered event lands in a trained operator's lap before it lands in yours.",
    },
    {
      headline: "It isn't just remote guards.",
      isnt: "Remote viewing without AI has the same coverage problem as on-site guards: limited eyeballs, bounded attention, fatigue.",
      is: "The detection layer is what extends the operator's reach across every camera, every second, simultaneously.",
    },
    {
      headline: "It isn't just video surveillance.",
      isnt: "Footage you review after-the-fact isn't evidence — it's storage.",
      is: "The documentation layer is what stitches the moment-of-event into a sealed record that holds in court, in audit, in claims defense.",
    },
  ];

  return (
    <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <span className="system-label text-birdseye-electric">
            WHAT IT ISN&apos;T
          </span>
          <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
            Don&apos;t mistake it for{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              cameras
            </span>
            ,{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              guards
            </span>
            , or{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              tape
            </span>
            .
          </h2>
          <p className="mt-6 text-body text-birdseye-cream/65 max-w-copy">
            Most security pitches you&apos;ll hear are one of these three. Each
            of them is a partial answer that competitors charge full price for.
            The whole method is what makes the math work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {columns.map((c, i) => (
            <article
              key={c.headline}
              className="rounded-2xl border border-birdseye-cream/10 bg-birdseye-cream/[0.02] p-7 md:p-8"
            >
              <span className="system-label text-birdseye-cream/40">
                {String(i + 1).padStart(2, "0")} · NOT THIS
              </span>
              <h3 className="mt-4 text-[clamp(1.25rem,1.75vw,1.5rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream">
                {c.headline}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.55] text-birdseye-cream/65">
                {c.isnt}
              </p>
              <div className="mt-5 pt-5 border-t border-birdseye-cream/10">
                <p className="text-[14.5px] leading-[1.55] text-birdseye-cream/85">
                  <span className="font-serif italic text-birdseye-electric">
                    The Birdseye difference:
                  </span>{" "}
                  {c.is}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
