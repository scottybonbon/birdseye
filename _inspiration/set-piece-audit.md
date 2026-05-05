# Set-piece audit

CRAFT-2: per-page inventory of set pieces, with protection status. The-one-rule.md Section 5 says **set pieces don't get edited away** — this file is the canonical list of what counts as a set piece, page by page.

A **set piece** is a moment that earns the page's existence. If you removed it, the page would lose what makes it different from the rest of the category. Set pieces survive the prune; sections around them are candidates for cuts.

If a section isn't on this list, it can be edited freely. If it IS on this list, the bar to edit is high — and removal requires a deliberate replacement that's clearly better.

---

## `/` (Home)

### Protected set pieces

1. **Hero** — `components/site/Hero.tsx`
   - The slow upward camera pan over the yard at dusk, three-line manifesto, per-letter text-shadow on each line
   - Asset: `/hero-reverse.mp4`
   - Protection: this is the brand's first impression. Don't touch the video, the per-letter shadow, or the staggered manifesto entrance without a clear better alternative.

2. **MaxTelepresence triptych** — `components/site/MaxTelepresence.tsx`
   - Three synchronized real-footage video panes (DETECT / VERIFY / DOCUMENT) playing one event end-to-end with hairline connectors
   - Now also serves as the hub linking to `/maximum-telepresence` for the deep story
   - Protection: the synchronized triptych IS the brand's most distinctive set piece. Don't reduce it to static cards.

3. **GateEventTimeline** — `components/site/GateEventTimeline.tsx`
   - Scrubbable 7-step gate event with elapsed clock, drag handle, keyboard step
   - Genuinely unique in the category — none of Terminal, LVT, Outpost, or Flock has anything like it
   - Protection: this is gallery-night craft. Replacing it would lose what's most distinctive.

4. **CargoTheft narrative band** — `components/site/CargoTheft.tsx`
   - Big tabular `$35B` stat with CargoNet citation, italic-serif accent on "front door"
   - Protection: the strongest news-cycle story Birdseye owns. The architecture carries Mike's keynote argument.

5. **ConnectedFlow** — `components/site/ConnectedFlow.tsx`
   - Apple/Linear/Stripe-pattern sticky-scroll feature reveal with 8 pre-mounted video media swaps
   - Protection: real Apple-tier craft (overflow-hidden trap fix, single video element, IntersectionObserver swap). Don't unship.

6. **VersusGuards** — `components/site/VersusGuards.tsx`
   - LIGHT-section pivot. Three pillars (Coverage / Cost / Record) with paired proof stats
   - Protection: this is the core competitive argument. Replacing it would lose the brand's position vs. manned security.

7. **BuiltForReal** — `components/site/BuiltForReal.tsx`
   - LIGHT-section editorial spread, Anthropic/OpenAI-tier asymmetric layout, oversized italic headline + numbered feature list
   - Protection: the page's main breathing moment in the LIGHT cluster. Don't compress to cards.

8. **CustomerProofCards** — `components/site/CustomerProofCards.tsx` (new 2026-05-03)
   - Five named-customer + metric + year cards, anonymization-integrity treatment (italic-serif for anonymized)
   - Protection: the credibility punch. Don't dilute by making all cards anonymous OR all named — the integrity is in the mix.

### Editable / replaceable

LogoMarquee, ThreeCores, Stats, Impact, RoiInline, Testimonials, Security, SupplyChain, Implementation, UseCaseGrid, HomeFaq, Certainty, ClosingMetrics. These all carry weight but aren't load-bearing for the brand identity.

---

## `/maximum-telepresence`

### Protected set pieces

1. **Premise section** — *"The industry asked the **wrong** question."* Editorial argument that names the false binary (cameras vs guards) and refuses it. Brand-thesis paragraph: *"Presence isn't pixels. It's the discipline of being there."*
2. **Three layered MediaSpreads** — DETECT / VERIFY / DOCUMENT, alternating zigzag, each with an archive caption that mirrors the home triptych poster
3. **WhatItIsnt 3-up** — Three columns (not just AI cameras / not just remote guards / not just video surveillance), each with the false-equivalent pitch + the missing layer

This page IS the methodology's home. Every protected element above is load-bearing. Edits should preserve the three-layer structure and the *"isn't"* framing.

---

## `/voice-down`

### Protected set pieces

1. **Premise** — *"Cameras see. Sirens scare. **People** talk."* Three-beat ladder of escalating specificity. Don't lose the rhythm.
2. **Three MediaSpreads** — REAL HUMAN REAL TIME / CALM SPECIFIC ACCOUNTABLE / WHEN IT ESCALATES — alternating zigzag
3. **CapabilityPills** — 12 things operators can do via Voice-Down (Polite redirect through Multilingual instruction). The list shows the tool's range; reducing it loses the breadth claim.

---

## `/partner-program`

### Protected set pieces

1. **Premise** — *"We don't do **everything**. On purpose."* The deliberately-narrow scope argument that justifies the network model. Don't soften.
2. **ThreeTracks** — Channel / Technology / Service side-by-side cards with WHO IT FITS + WHAT YOU GET. Reads as a directory; cutting any track collapses the program.
3. **CommitmentLedger** — Two-column "what you get / what we ask" with pillar-name + description. Editorial register: this is a relationship document, not a marketing pitch. Don't reduce to bullet list.

---

## `/about-us`

### Protected set pieces

1. **Origin story** — *"Built to fix what guards **couldn't**."* Two-column with three-paragraph editorial body. The 60%+ savings line is brand-anchor copy.
2. **MetricStrip** — 400 / 4 / 2011 / 150% with cited notes. The 2011 founding year is locked.
3. **LeadershipGrid** — 5-up team grid with bios. Headshots are placeholders; the structure is the set piece.
4. **6-point differentiator** — *"Six lines that don't appear on **anyone else's** site."* The single most concentrated articulation of the brand argument.
5. **ICARE values FeatureGrid** — five values (Integrity / Commitment / Adaptation / Respect / Excellence). Internal culture set piece; don't reduce.
6. **Image trio** — three archive frames with captions (Camera Install / Mississauga Ops / Night-Shift Console). The "real captured footage" register.
7. **Team photo** — Mississauga group shot with archive caption.

---

## Platform pages (`/platform/gatecore`, `/safecore`, `/yardcore`)

### Protected per page

1. **PageHero with "For those who need:" copy pattern** (LVT-spec language)
2. **FeatureGrid** — 6 capabilities per platform. Cutting one loses spec coverage.
3. **CapabilityPills** (GateCore only) — 9 specific gate-side checks. Sets GateCore apart from the others.
4. **MediaSpread triptych** — three editorial deep-dives per platform with archive captions
5. **PullQuote** — customer voice as architecture
6. **FAQAccordion** — 6 procurement-grade Q&As per page (added 2026-05-03)
7. **MetricStrip** — 4 cited numbers per page

GateCore additionally has **Pricing** as a set piece (until LIVE-4 lands real pricing). YardCore's **6-feature spread** is the most editorial; don't compress to grid.

---

## `/glossary`

### Protected set pieces

1. **Alphabet rail** — quick-jump anchor pills at the top. The interaction makes the page feel like a real reference, not a marketing page.
2. **Sticky meta rail** — `25 TERMS` count + alphabetized big-letter section headers. Editorial register.
3. **Birdseye™ entry treatment** — entries marked `BIRDSEYE™` carry the brand-anchor terms (Maximum Telepresence™, Voice-Down™, ID-Verify™, the three Cores).

---

## `/case-studies` and `/case-studies/[slug]`

### Protected set pieces

1. **Static placeholder content** in `_design/caseStudies.ts` — five real-feeling narratives with anonymization integrity. Don't replace with WP empty-state until real posts land.
2. **Detail page sticky meta rail** — Customer / Industry / Region / Headline metric in left rail
3. **Hero image with archive caption** — 16:9 with `data-cursor-caption` HUD
4. **MetricStrip** — 3 KPIs per case
5. **PullQuote** — customer voice with anonymization integrity
6. **RelatedCases** — three other cases in a card grid at the bottom

---

## Footer (sitewide)

### Protected set pieces

1. **NewsletterStrip** — top of footer, editorial pitch + form (added 2026-05-03)
2. **5-column link grid**
3. **Address + social row**
4. **Massive BIRDSEYE wordmark** with the cursor-magnify easter egg

---

## How to use this list

- Before cutting a section, check if it's protected. If yes, you need a deliberate replacement that's clearly better.
- Before editing a set piece, ask: am I improving the load-bearing element, or am I changing its job? If changing the job, write a separate replacement and keep the original alive in `components/_archeology/` until the new one proves out.
- New set pieces get added to this list when they ship. New protected = visible in this audit.
- Sections **not** on this list can be freely edited or removed — they're page-level surfaces, not brand-level.
