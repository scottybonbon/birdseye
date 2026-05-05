import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Glossary · Birdseye",
  description:
    "The terms operators encounter on Birdseye and across the yard-ops space. Birdseye-specific marks (Maximum Telepresence™, Voice-Down™, ID-Verify™), industry shorthand (BOL, DOT, 3PL), and technology (CV, ONVIF, LPR).",
};

/**
 * /glossary — alphabetized terms reference.
 *
 * #4 (2026-05-03): A glossary route was missing on the new site. It
 * exists primarily for SEO (long-tail term searches), procurement
 * sanity ("what's a Voice-Down?"), and as the canonical place to anchor
 * cross-page links — every other page can link "[Voice-Down™](/glossary#voice-down)"
 * if it wants the inline definition.
 *
 * Architecture: simple alphabetical list. Each entry has an anchor ID
 * matching its slug so other pages can deep-link. No search/filter on
 * the first cut; the list is short enough to scan and Cmd-F works.
 */

type GlossaryEntry = {
  term: string;
  /** Anchor slug. Lowercase, hyphenated. */
  slug: string;
  /** "Birdseye" for our trademarks, "Industry" for shared shorthand,
   *  "Technology" for tech terms. Used to render a tiny mono tag. */
  kind: "Birdseye" | "Industry" | "Technology";
  definition: string;
};

const ENTRIES: GlossaryEntry[] = [
  {
    term: "3PL",
    slug: "3pl",
    kind: "Industry",
    definition:
      "Third-party logistics. A company that provides outsourced warehousing, transportation, or fulfillment for other businesses. Most Birdseye customers are 3PLs running yards on behalf of brands.",
  },
  {
    term: "Audit-grade record",
    slug: "audit-grade-record",
    kind: "Birdseye",
    definition:
      "A sealed event archive that satisfies SOC 2, ISO 27001, FSMA, and most insurance-claim requirements. Every Birdseye gate event is captured as an audit-grade record — video, voice, gate state, operator notes, outcome — at the moment it happens.",
  },
  {
    term: "BOL",
    slug: "bol",
    kind: "Industry",
    definition:
      "Bill of Lading. The legal document that travels with freight, listing the contents, origin, destination, carrier, and consignee. GateCore captures and matches BOLs against the TMS at gate-arrival.",
  },
  {
    term: "Chain of custody",
    slug: "chain-of-custody",
    kind: "Industry",
    definition:
      "The unbroken record of who handled a piece of evidence (or a piece of cargo) from origin to current state. Birdseye preserves chain of custody on every captured asset — important for claims defense and prosecution.",
  },
  {
    term: "CV (Computer Vision)",
    slug: "cv",
    kind: "Technology",
    definition:
      "Machine-learning systems trained to interpret images and video. Birdseye's CV layer watches every camera every second, surfacing patterns that don't fit the yard's normal — unfamiliar vehicles, missing seals, PPE violations.",
  },
  {
    term: "DOT",
    slug: "dot",
    kind: "Industry",
    definition:
      "United States Department of Transportation. The DOT number identifies a commercial carrier. GateCore captures and verifies DOT numbers on every entry as part of the carrier roster check.",
  },
  {
    term: "Edge processing",
    slug: "edge-processing",
    kind: "Technology",
    definition:
      "Running compute on hardware physically close to the cameras (the \"edge\") rather than only in the cloud. Birdseye uses edge processing so detection stays live even on degraded internet uplinks.",
  },
  {
    term: "Fictitious pickup",
    slug: "fictitious-pickup",
    kind: "Industry",
    definition:
      "A cargo theft technique where a person presents fake credentials at the gate, picks up legitimate freight, and disappears. Strategic / fictitious theft tripled across 2022–2024 per CargoNet. GateCore's verification layer is built specifically to stop them.",
  },
  {
    term: "GateCore",
    slug: "gatecore",
    kind: "Birdseye",
    definition:
      "The Birdseye core that automates gate operations: ID-Verify, BOL capture, seal verification, US DOT compliance, and every protocol that runs on entry/exit. See /platform/gatecore.",
  },
  {
    term: "Gate dwell",
    slug: "gate-dwell",
    kind: "Industry",
    definition:
      "The total time a truck spends at the gate, from arrival to clear. GateCore reduces gate dwell up to 75% on average vs. manual verification.",
  },
  {
    term: "Hazmat",
    slug: "hazmat",
    kind: "Industry",
    definition:
      "Hazardous materials. GateCore enforces hazmat protocol on entry, including placard verification, driver credentialing, and route restrictions per regulation.",
  },
  {
    term: "ID-Verify™",
    slug: "id-verify",
    kind: "Birdseye",
    definition:
      "Birdseye's driver-identity-verification mechanism. Cross-references driver credentials against the carrier roster in real time at the gate. Stops fraudulent pickups before the gate opens.",
  },
  {
    term: "LPR",
    slug: "lpr",
    kind: "Technology",
    definition:
      "License Plate Recognition. CV-based plate capture. Birdseye uses LPR as one of several signals at the gate, alongside driver ID, BOL, and seal verification.",
  },
  {
    term: "Maximum Telepresence Approach™",
    slug: "maximum-telepresence",
    kind: "Birdseye",
    definition:
      "Birdseye's methodology — the deliberate pairing of computer vision, trained remote operators, and audit-grade record-keeping on every gate event. Three layers: detect, verify, document. See /maximum-telepresence.",
  },
  {
    term: "ONVIF",
    slug: "onvif",
    kind: "Technology",
    definition:
      "Open Network Video Interface Forum. A standard for IP camera interoperability. Most modern IP cameras are ONVIF-compliant, which is why Birdseye usually works with the cameras a yard already has.",
  },
  {
    term: "PPE",
    slug: "ppe",
    kind: "Industry",
    definition:
      "Personal Protective Equipment — hi-vis vests, hard hats, safety glasses. YardCore and Voice-Down™ enforce PPE protocols across the yard in real time.",
  },
  {
    term: "SafeCore",
    slug: "safecore",
    kind: "Birdseye",
    definition:
      "The Birdseye core that runs perimeter security: AI-powered anomaly detection, Voice-Down™ intervention, smart escalation, after-hours coverage. See /platform/safecore.",
  },
  {
    term: "Spotter",
    slug: "spotter",
    kind: "Industry",
    definition:
      "A driver employed to move trailers around within a yard (a.k.a. shunter, hostler, jockey). YardCore tracks verified spotter moves with origin/destination on every shunt.",
  },
  {
    term: "Strategic theft",
    slug: "strategic-theft",
    kind: "Industry",
    definition:
      "Cargo theft executed via fraud rather than force — fictitious pickups, identity theft, paperwork manipulation. Has tripled since 2022 per CargoNet. The fastest-growing vector in cargo theft and the one verified-entry stops.",
  },
  {
    term: "Telepresence",
    slug: "telepresence",
    kind: "Birdseye",
    definition:
      "The discipline of being effectively present at a remote location through technology. Birdseye's Maximum Telepresence Approach™ takes telepresence as far as the yard ops director's expectations require — AI on every camera, operator on every triggered event, record on every outcome.",
  },
  {
    term: "TMS / YMS / WMS / VMS",
    slug: "tms-yms-wms-vms",
    kind: "Industry",
    definition:
      "Transportation Management System / Yard Management System / Warehouse Management System / Vendor Management System. The four major operational software layers Birdseye integrates with. Most installs use REST APIs into the major platforms; custom integrations are available.",
  },
  {
    term: "Voice-Down™",
    slug: "voice-down",
    kind: "Birdseye",
    definition:
      "Birdseye's live audio intervention mechanism. The instant something triggers, a trained operator speaks through the on-site speaker — calm, specific, accountable. Most events resolve at the speaker. See /voice-down.",
  },
  {
    term: "YARD OS",
    slug: "yard-os",
    kind: "Birdseye",
    definition:
      "The unified operating system for the yard. The platform layer that ties GateCore, SafeCore, and YardCore together with shared operator pool, integrations, and audit archive. See /platform.",
  },
  {
    term: "Yard dwell",
    slug: "yard-dwell",
    kind: "Industry",
    definition:
      "How long a trailer sits in the yard before being moved or dispatched. Long yard dwell ties up assets and triggers detention claims; YardCore tracks dwell on every trailer and surfaces aging assets in real time.",
  },
  {
    term: "YardCore",
    slug: "yardcore",
    kind: "Birdseye",
    definition:
      "The Birdseye core that runs the yard itself: spot occupancy, trailer tracking, spotter dispatch, inspection compliance, multi-site coordination. See /platform/yardcore.",
  },
];

/**
 * Group entries by their first letter for the alphabetical index. The
 * sort order matches the natural alphabetical order so readers can scan.
 */
function groupAlphabetical(entries: GlossaryEntry[]) {
  const groups = new Map<string, GlossaryEntry[]>();
  for (const e of entries) {
    const letter = e.term[0]!.toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(e);
  }
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export default function GlossaryPage() {
  const grouped = groupAlphabetical(ENTRIES);
  const letters = grouped.map(([l]) => l);

  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="REFERENCE · GLOSSARY"
        preTitle="The terms"
        italicTitle="behind"
        postTitle=" the platform."
        tagline="Birdseye marks, industry shorthand, the tech behind both."
        description="The terms operators use on the yard, in the dispatch room, and on the contract. Each entry deep-links so other pages can drop the definition inline — `[Voice-Down™](/glossary#voice-down)` and the reader gets the short version without leaving the page."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{
          label: "Read the method",
          href: "/maximum-telepresence",
        }}
      />

      {/* Alphabet rail — quick-jump anchors at the top of the list. */}
      <section className="section-dark py-12 border-t border-birdseye-cream/[0.06]">
        <Container className="max-w-site">
          <nav
            aria-label="Glossary alphabet index"
            className="flex flex-wrap gap-2"
          >
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="grid place-items-center h-9 w-9 rounded-full border border-birdseye-cream/15 bg-birdseye-cream/[0.02] text-birdseye-cream/70 font-mono text-[12px] hover:border-birdseye-electric/60 hover:text-birdseye-electric transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {l}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* The list */}
      <section className="section-dark py-16 md:py-24">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
            <div className="hidden lg:block lg:sticky lg:top-28 self-start">
              <p className="system-label text-birdseye-cream/40">
                {ENTRIES.length} TERMS
              </p>
            </div>

            <div className="space-y-12 md:space-y-16">
              {grouped.map(([letter, items]) => (
                <section
                  key={letter}
                  id={`letter-${letter}`}
                  className="scroll-mt-24"
                  aria-labelledby={`letter-${letter}-heading`}
                >
                  <h2
                    id={`letter-${letter}-heading`}
                    className="text-[clamp(2rem,3.5vw,3rem)] leading-none tracking-[-0.025em] font-bold text-birdseye-electric/85 mb-6 md:mb-8"
                  >
                    {letter}
                  </h2>
                  <dl className="divide-y divide-birdseye-cream/[0.06]">
                    {items.map((entry) => (
                      <div
                        key={entry.slug}
                        id={entry.slug}
                        className="grid md:grid-cols-[1fr_2.4fr] gap-3 md:gap-10 py-6 md:py-7 scroll-mt-24"
                      >
                        <dt>
                          <p className="font-bold text-birdseye-cream text-[18px] leading-[1.25]">
                            {entry.term}
                          </p>
                          <p className="mt-2 system-label text-birdseye-cream/40">
                            {entry.kind === "Birdseye"
                              ? "BIRDSEYE™"
                              : entry.kind.toUpperCase()}
                          </p>
                        </dt>
                        <dd className="text-body text-birdseye-cream/70 leading-[1.6]">
                          {entry.definition}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        preTitle="Have a term we"
        italicTitle="missed"
        postTitle="?"
        description="Email us — we keep this list living, and we read every suggestion."
        secondaryCta={{
          label: "info@birdseyesecurity.ca",
          href: "mailto:info@birdseyesecurity.ca?subject=Glossary%20suggestion",
        }}
      />
    </PageShell>
  );
}
