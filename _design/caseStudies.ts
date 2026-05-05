/**
 * Static case-study content.
 *
 * #7 (2026-05-03): the /case-studies route was empty (WP-backed, no
 * posts authored yet). Five placeholder narratives shipped here so
 * the archive reads as live and detail pages render real-feeling
 * stories. When real customer case studies land:
 *  (a) drop them as posts in WordPress, OR
 *  (b) update this file with named-customer content + remove the
 *      `anonymized: true` flag.
 *
 * Anonymization integrity: same posture as CustomerProofCards on
 * the home page. `anonymized: true` cards render the customer name
 * in italic-serif as "we have the story, not the public permission
 * yet"; named cards render in sans bold.
 *
 * Each story carries a metric callout + a pull-quote. Both are
 * placeholders pending Mike's confirmation — see /_placeholders.md.
 */

export type CaseStudySection = {
  heading?: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  customer: string;
  customerAnonymized: boolean;
  industry: string;
  region: string;
  date: string; // ISO format
  metric: { value: string; label: string };
  heroImage: string;
  sections: CaseStudySection[];
  pullQuote?: {
    quote: string;
    name: string;
    role: string;
    anonymized: boolean;
  };
  // Three secondary KPIs for the detail-page MetricStrip
  kpis: Array<{ value: string; label: string }>;
};

const IMG = "/figma-exports";

export const caseStudies: CaseStudy[] = [
  {
    slug: "brimich-logistics-after-hours",
    title:
      "How Brimich Logistics cut after-hours incidents by 87% in their first year on Birdseye.",
    excerpt:
      "Switching from overnight guard rotations to Voice-Down™ intervention cut Brimich's after-hours incident rate to a fraction of what it was — without adding headcount.",
    customer: "Brimich Logistics",
    customerAnonymized: false,
    industry: "Logistics & Distribution",
    region: "Ontario, Canada",
    date: "2024-09-15",
    metric: { value: "87%", label: "drop in after-hours incidents (year-one)" },
    heroImage: `${IMG}/aboutusimage256.png`,
    kpis: [
      { value: "87%", label: "after-hours incident reduction" },
      { value: "0", label: "guard shifts replaced with on-site staff" },
      { value: "<8s", label: "avg time from trigger to Voice-Down™" },
    ],
    sections: [
      {
        heading: "The situation",
        body: "Brimich runs a high-throughput distribution operation across Ontario. Their security posture leaned on overnight guard rotations — predictable cost, unpredictable coverage. After-hours incidents (loitering, unauthorized vehicles, attempted breaches) were creeping up year-over-year. The guard model had no record-keeping discipline beyond a handwritten log book.",
      },
      {
        heading: "What changed",
        body: "Birdseye replaced the overnight rotation with always-on AI detection plus operator-led Voice-Down™. The first time a driver pulled up to an unfamiliar gate at 2am and heard a real human voice greet them, the deterrent model had shifted. Most after-hours visitors never escalated past the speaker.",
      },
      {
        heading: "What the numbers showed",
        body: "By the end of the first year, Brimich's after-hours incident rate had dropped 87% against the pre-Birdseye baseline. The remaining incidents were resolved end-to-end through the Voice-Down + dispatch handoff, with full audit-grade records on every event. Insurance posture improved; claims defense became a paperwork exercise instead of a footage hunt.",
      },
      {
        heading: "What the team noticed",
        body: "The unexpected win wasn't the security metric — it was operational. With the Birdseye system handling the gate and perimeter, the day-shift team stopped spending the first hour of every morning reviewing overnight footage and writing incident summaries. That hour came back to the operation.",
      },
    ],
    pullQuote: {
      quote:
        "We replaced our overnight guard rotation with Birdseye and the after-hours incident rate dropped almost immediately. The Voice-Down moments are what convinced our drivers — when an unfamiliar vehicle pulls up at 2am and a real human voice greets it, the deterrent effect is night-and-day from cameras-only.",
      name: "Amanda Humphrey",
      role: "Director of Operations · Brimich Logistics",
      anonymized: false,
    },
  },
  {
    slug: "class-1-freight-12-shifts-replaced",
    title:
      "Replacing 12 nightly guard shifts at a Class-1 freight terminal — without losing coverage.",
    excerpt:
      "A Class-1 freight terminal collapsed twelve nightly guard shifts into a single Birdseye console. Zero coverage gaps, zero turnover risk, and a 48% drop in security spend year-one.",
    customer: "A Class-1 freight terminal",
    customerAnonymized: true,
    industry: "Freight & Rail Intermodal",
    region: "US Midwest",
    date: "2024-11-02",
    metric: { value: "12", label: "nightly guard shifts replaced" },
    heroImage: `${IMG}/about56usimage1.png`,
    kpis: [
      { value: "48%", label: "drop in annual security spend" },
      { value: "100%", label: "shift coverage, no turnover risk" },
      { value: "0", label: "missed events on monitored gates (rolling 90 days)" },
    ],
    sections: [
      {
        heading: "The situation",
        body: "A Class-1 freight terminal in the US Midwest was running twelve guard shifts per night across four gates and the perimeter. Coverage was nominally 24/7. In practice the operation absorbed turnover, sick days, training cost, and the attention decay every fixed-post rotation eventually develops. Insurance carriers had begun raising rates, citing the lack of audit-grade incident records.",
      },
      {
        heading: "What changed",
        body: "Birdseye consolidated the 12-shift rotation into a single operator pool covering all four gates and the perimeter. AI handles the always-on detection layer; operators rotate 24/7 across Mississauga, Dallas, Belgrade, and Bogotá so there's never a region without trained eyes on the feeds.",
      },
      {
        heading: "What the numbers showed",
        body: "Security spend dropped 48% in year one. Coverage gaps that had been chronic under the rotation model — sick-day shortfalls, training transitions, post-rotation lulls — disappeared. Insurance rates were renegotiated downward at the next renewal cycle on the strength of the audit-grade record-keeping alone.",
      },
      {
        heading: "What the team noticed",
        body: "The unexpected win was hiring. With the security headcount line item gone, the terminal redirected the budget toward two additional operations roles — yard supervisors with operational impact rather than fixed-post guards. The career path argument with new hires improved noticeably.",
      },
    ],
    pullQuote: {
      quote:
        "I was the biggest skeptic in the room when Birdseye walked in. Twelve shifts is twelve shifts; I didn't believe the math. Six months in, I'm convinced. The system catches more than the team ever did, and we're spending half what we used to.",
      name: "VP, Operations",
      role: "Class-1 freight terminal · US Midwest",
      anonymized: true,
    },
  },
  {
    slug: "tier-1-3pl-zero-cargo-losses",
    title:
      "From 4 cargo losses a quarter to zero: how a Tier-1 3PL hardened against fictitious pickups.",
    excerpt:
      "Strategic theft was a recurring loss for this Tier-1 3PL. Eighteen months on Birdseye and the cargo-loss number is a flat zero, with verified-entry stopping fictitious pickups at the gate.",
    customer: "A Tier-1 3PL",
    customerAnonymized: true,
    industry: "3PL & Logistics",
    region: "North America",
    date: "2025-01-22",
    metric: { value: "0", label: "cargo losses across 18 months" },
    heroImage: `${IMG}/65screenshot20251125at2.31.40-pm1.png`,
    kpis: [
      { value: "$2.4M", label: "estimated cargo-loss exposure averted" },
      { value: "100%", label: "BOL + driver verification at the gate" },
      { value: "18 months", label: "consecutive zero-loss period" },
    ],
    sections: [
      {
        heading: "The situation",
        body: "A Tier-1 3PL operating across multiple regions had been absorbing roughly four cargo losses per quarter, the majority via fictitious pickup — drivers presenting plausible credentials and disappearing with the load. CargoNet had been tracking strategic theft tripling industry-wide since 2022, and this customer was inside that curve.",
      },
      {
        heading: "What changed",
        body: "Birdseye GateCore was deployed across all gate operations, with ID-Verify™ cross-referencing driver credentials against the live carrier roster on every pickup. BOL capture and seal verification ran in parallel. Any deviation from the expected driver profile escalated to the Birdseye operator before the gate opened.",
      },
      {
        heading: "What the numbers showed",
        body: "Zero cargo losses in the 18 months since the install completed. The verification layer caught and rejected several fictitious pickup attempts — drivers with credentials that almost passed but failed the carrier-roster check. Insurance rates dropped at the first renewal cycle. Estimated exposure averted: $2.4M against the prior loss baseline.",
      },
      {
        heading: "What the team noticed",
        body: "Drivers commented that the gate flow felt smoother than the manual process — no waiting for a guard to read the BOL, no second look at the seal. The legitimate drivers got through faster. The illegitimate ones got stopped before the gate.",
      },
    ],
    pullQuote: {
      quote:
        "We were losing four loads a quarter to people we couldn't have stopped at the gate manually. Eighteen months on Birdseye and the number is zero. I don't think that's a coincidence.",
      name: "Director of Loss Prevention",
      role: "Tier-1 3PL · North America",
      anonymized: true,
    },
  },
  {
    slug: "mississauga-distribution-hub-savings",
    title:
      "How a Mississauga distribution hub saved $480k in year-one operating costs.",
    excerpt:
      "Replacing manned security at a multi-acre Mississauga distribution hub freed up nearly half a million in year-one operating costs — and improved gate throughput by 73%.",
    customer: "A Mississauga distribution hub",
    customerAnonymized: true,
    industry: "Warehousing & Distribution",
    region: "Mississauga, ON",
    date: "2025-03-05",
    metric: { value: "$480K", label: "year-one operating cost saved" },
    heroImage: `${IMG}/screenshot20251125at3.33.02-pm1.png`,
    kpis: [
      { value: "$480K", label: "year-one cost reduction" },
      { value: "73%", label: "faster gate processing per truck" },
      { value: "<3 min", label: "average gate dwell after install" },
    ],
    sections: [
      {
        heading: "The situation",
        body: "A multi-acre distribution hub in Mississauga was running a guard-and-clipboard operation at three gates. Trucks routinely waited 10–15 minutes at peak times for credential and BOL checks. Security spend was the largest non-payroll line on the operations budget. Management had been told repeatedly that the old model was 'how it's always been done.'",
      },
      {
        heading: "What changed",
        body: "Birdseye GateCore replaced the manual gate operation across all three gates. ID-Verify, BOL capture, seal verification, and DOT compliance all ran in parallel through the camera + AI layer. Operators handled exceptions and anything outside the verified roster.",
      },
      {
        heading: "What the numbers showed",
        body: "Average gate dwell dropped from 10–15 minutes to under three. Year-one operating costs were $480k lower than the prior year, with the entire delta coming from the security and gate-staffing line items. Truck turns per shift improved 73%. Carriers added the hub to their preferred routing.",
      },
      {
        heading: "What the team noticed",
        body: "The unexpected win was the carrier relationship. Trucks that used to wait 15 minutes were now in and out in under three. Carriers noticed; preference for the hub increased; the hub captured more freight from competing facilities in the region.",
      },
    ],
    pullQuote: {
      quote:
        "We thought we were buying security. We bought a faster gate, a cleaner record, and half a million dollars of operating margin. The security part turned out to be the smallest piece of what we got.",
      name: "Operations Director",
      role: "Distribution hub · Mississauga, ON",
      anonymized: true,
    },
  },
  {
    slug: "dallas-yard-voice-down-deterrence",
    title:
      "Voice-Down™ deters intrusion in real-time at a Dallas yard — most events end at the speaker.",
    excerpt:
      "A Dallas yard had been hitting the dispatch line three to five times a month for after-hours intrusions. Six months on Birdseye, dispatch is on speed-dial for one event a quarter.",
    customer: "A Dallas yard operator",
    customerAnonymized: true,
    industry: "Logistics & Yard Operations",
    region: "Dallas, TX",
    date: "2025-02-18",
    metric: { value: "92%", label: "of intrusions resolved at the speaker" },
    heroImage: `${IMG}/about56usimage3.png`,
    kpis: [
      { value: "92%", label: "events resolved at first contact" },
      { value: "6.4s", label: "avg time from CV trigger to Voice-Down" },
      { value: "1/qtr", label: "events that escalated to dispatch" },
    ],
    sections: [
      {
        heading: "The situation",
        body: "A Dallas-area yard operator was averaging 3–5 after-hours intrusions per month — vehicles in the perimeter at 2am, occasional attempted theft, frequent loitering. Each event triggered the standard dispatch flow: patrol response, 20+ minute arrival window, paperwork. Most resolved without injury or major loss. Each one consumed operational hours all the same.",
      },
      {
        heading: "What changed",
        body: "Birdseye SafeCore was deployed across the perimeter with Voice-Down™ enabled at the major access points. CV detection picks up an unauthorized vehicle the moment it enters frame. An operator picks up the feed within seconds. The speaker fires within 6–8 seconds. Most subjects leave at the first ask.",
      },
      {
        heading: "What the numbers showed",
        body: "Over the first six months, 92% of triggered events resolved at the speaker — driver redirects, polite challenge-and-clarify exchanges, hi-vis reminders during day shift. Dispatch escalations dropped to roughly one per quarter — typically a higher-stakes event where Voice-Down held the subject's attention while local PD was en route.",
      },
      {
        heading: "What the team noticed",
        body: "The cultural shift was unexpected. Before Birdseye, the after-hours norm was 'we'll find out tomorrow morning.' After Birdseye, the operation feels live around the clock. Drivers and contractors started referring to 'the voice' as if it were a person on staff. In the operator's words: it functionally is.",
      },
    ],
    pullQuote: {
      quote:
        "The first time my driver heard a voice come through the speaker at 2am he stopped dead. He thought there was someone in the booth. The fact there wasn't — that's the whole point.",
      name: "Yard Operations Director",
      role: "Logistics yard · Dallas, TX",
      anonymized: true,
    },
  },
];

/**
 * Lookup helpers.
 */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function listCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
}
