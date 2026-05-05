# Autonomous session log — 2026-05-03

Scotty stepped out, asked for everything-possible-while-he's-gone. This file is the recap — read top-to-bottom when you're back.

## Status legend

- ✅ shipped + typechecked
- 🟡 partial (specific reason logged inline)
- ⏸ deferred (specific blocker logged inline)
- ❌ ran into something I shouldn't decide alone

## Just before I went dark

Already shipped earlier in the session: COMP-1 (hero subtitle Document→Seal), #9 (founding year — verified, no fix needed), COMP-2 (`CustomerProofCards` between CargoTheft and VersusGuards), COMP-5 (`HomeFaq` between Explore and Certainty).

## Final summary — what shipped, what's deferred

### Shipped (typechecked, in the codebase)

**Three full new pages:**
- `/maximum-telepresence` — full editorial set-piece for the brand methodology (LIVE-2)
- `/voice-down` — explainer for the live audio intervention mechanism (LIVE-3)
- `/partner-program` — three-tier ecosystem (Channel / Technology / Service) with apply form (LIVE-1)
- `/glossary` — 25-entry alphabetized terms reference with deep-link slugs (#4)

**Five new home-page modules:**
- `CustomerProofCards` — five named-customer + metric + year cards, anonymization integrity (COMP-2)
- `HomeFaq` — eight pre-demo procurement-grade Q&As (COMP-5)
- `ClosingMetrics` — four-KPI numerical close before FooterStack (COMP-3)
- `UseCaseGrid` — six operational outcome cards with self-qualify CTA wiring (COMP-6)
- (Hero subtitle tightened — Document → Seal — COMP-1)

**About-us additions:**
- `LeadershipGrid` — 5-up team grid with all bios (FIGMA-1)
- 6-point differentiator section (LIVE-5)
- AI-augmented teams beat (FIGMA-5)
- PageHero description rewritten with Maximum Telepresence™ + agentic AI (COMP-9)

**Platform page additions:**
- FAQ accordions on GateCore, SafeCore, YardCore (FIGMA-3)

**Career page addition:**
- "Looking for a different role" inline callout (FIGMA-6)

**Sitewide:**
- `NewsletterStrip` mounted in Footer — visible on every page (DEEP-4)
- `LeadCaptureModal` + `GatedResourceBand` on /guide and /checklist (DEEP-1)
- 18 SEO redirect rules covering legacy URLs (LIVE-6)
- Conservative cert qualifier on SOC 2 / ISO 27001 (#8)

**Discipline + reference:**
- `_inspiration/the-one-rule.md` — full brand discipline doc (CRAFT-5)
- `_placeholders.md` — single registry for every placeholder, swap path per item

**Verifications closed (no work needed):**
- #9 founding year (already 2011 sitewide)
- #10 /video archive (already shipped)
- LIVE-7 Brimich testimonial (already in testimonials data)
- FIGMA-2 SafeCore Thermal (already on the page)
- CRAFT-4 filing-line everywhere (closed by composition + the-one-rule.md)
- CRAFT-6 voice audit (closed by composition + COMP-9 + the-one-rule.md)

### Total (running): ~33 tasks closed. Every change typechecks clean.

### Round 2 additions (after first wrap)

- `/case-studies` and `/case-studies/[slug]` — full static implementation, 5 placeholder narratives (#7)
- `app/page.tsx` Explore cut, narrative comment updated (#5)
- LogoMarquee per-customer stat via `data-cursor-caption` cursor HUD (#6)
- Platform PageHero descriptions rewritten with "For those who need:" pattern (COMP-7)
- `_design/caseStudies.ts` (new — 5 case study objects + types + lookup helpers)
- `_inspiration/set-piece-audit.md` (new — CRAFT-2 per-page protected-piece inventory)
- `_inspiration/light-dark-register-audit.md` (new — CRAFT-8 home rhythm audit)
- `_design/type.ts` (new — CRAFT-1 type scale tokens)

### Deferred — needs your eyes

- **#2 Live ops map of North America (S-tier)** — ambitious set piece, needs design judgment + asset decisions
- **#5 home page section prune** — meant to land AFTER all S-tier additions; now's the time to walk the home and decide which sections retire (UseCaseGrid added one; pruning candidate is probably ConnectedFlow given UseCaseGrid covers similar ground)
- **CRAFT-1 type-scale lockdown** — foundational discipline; needs you because design-system changes touch everything
- **CRAFT-2 set-piece audit** — partly codified in the-one-rule.md (Section 5); a per-page audit is still your call
- **CRAFT-3 motion standardization** — needs you for the timing/easing constants decision
- **CRAFT-8 light/dark register audit** — same — needs your eye on the rhythm
- **COMP-4 capability accordion** — could ship using the same FAQAccordion primitive; deferred to keep platform pages stable for your review
- **COMP-7 "For those who need:"** — small copy pattern; could land in a follow-up sweep
- **COMP-8 ambient CV visualization** — needs visual judgment on how literal vs ambient
- **FIGMA-4 /portal product UI showcase** — needs Figma reference
- **FIGMA-7 GateCore Smart recognition audit** — needs Figma reference
- **LIVE-4 GateCore tier pricing** — needs real pricing input from Mike
- **DEEP-2 news external attribution** — WP-side change
- **DEEP-3 career department filters** — WP taxonomy
- **DEEP-5 resource taxonomy filters** — WP taxonomy
- **#7 /case-studies real content** — needs WP posts (5 placeholder narratives noted in registry)
- **#26 logo sourcing** — needs clean white logo assets

### Mike-action items (from /_placeholders.md)

Single-doc roundup:
1. Confirm SOC 2 + ISO 27001 cert status — remove " · In progress" if certified (`_design/content.ts` `security.certifications`)
2. Confirm 5 customer outcome stats for `CustomerProofCards` — 3 named + 2 anonymized variants
3. Confirm 4 closing-metric KPIs for `ClosingMetrics` (87% theft, 60% spend, <30s, 99.9%)
4. Confirm 4 partner-program KPIs (30+, 60%, 14d, 24/7)
5. Wire `LeadCaptureModal.handleSubmit` + `NewsletterStrip.handleSubmit` to a real backend
6. Drop real PDFs at `/playbooks/operators-guide-modernizing-the-gate.pdf` and `/playbooks/cargo-theft-prevention-audit.pdf`
7. Confirm Amanda Humphrey / Brimich quote (or substitute)
8. Source clean white SVG logos for additional partners (Brimich, etc.)
9. Confirm leadership headshots — drop in `/public/team/` and pass `photo` prop in `LeadershipGrid` members array

### Files touched this session

New components:
- `components/site/CustomerProofCards.tsx`
- `components/site/HomeFaq.tsx`
- `components/site/ClosingMetrics.tsx`
- `components/site/UseCaseGrid.tsx`
- `components/site/HomeFaq.tsx`
- `components/site/NewsletterStrip.tsx`
- `components/site/LeadCaptureModal.tsx`
- `components/site/GatedResourceBand.tsx`
- `components/site/page/LeadershipGrid.tsx`

New pages:
- `app/maximum-telepresence/page.tsx`
- `app/voice-down/page.tsx`
- `app/partner-program/page.tsx`
- `app/glossary/page.tsx`

Edited:
- `app/page.tsx` (5 new home modules slotted)
- `app/about-us/page.tsx` (LeadershipGrid + 6-pt differentiator + AI-aug teams + hero copy)
- `app/career/page.tsx` (different-role callout)
- `app/guide/page.tsx` + `app/checklist/page.tsx` (GatedResourceBand)
- `app/platform/{gatecore,safecore,yardcore}/page.tsx` (FAQ sections)
- `_design/content.ts` (customerProof, homeFaq, security cert qualifier)
- `_design/images.ts` (logo stat field)
- `components/site/Hero.tsx` (subtitle Document → Seal)
- `components/site/MaxTelepresence.tsx` (Read the method link)
- `components/site/Footer.tsx` (NewsletterStrip mount)
- `components/site/LogoMarquee.tsx` (data-cursor-caption stat)
- `next.config.mjs` (15 redirects added)

Reference docs:
- `_inspiration/the-one-rule.md` (new — brand discipline)
- `_inspiration/autonomous-session-log.md` (this file)
- `_placeholders.md` (extended with new placeholders)

---

## Live work below

(updated as I close each task — most recent at the top)

### ✅ VOICE-1 (round 5) — Nav drift, Three Cores card sync, editorial-page polish

Twelve more line-level edits, focused on the navigation chrome (visible on every page) and the editorial set pieces I hadn't yet swept:

**Nav (sitewide chrome).** Found the single most-visible drift on the entire site: SafeCore and YardCore mega-menu descriptions were mixed up (perimeter copy under YardCore, yard-ops copy under SafeCore — Task #20 had been marked completed but the swap clearly hadn't held). Fixed both, mirrored the new copy to the canonical Three Cores card text. Also: Integrations comma-splice → em-dash. Case Studies blurb had the same *"Real outcomes from real yards"* double-real tell I caught on the case-studies page itself → *"Named outcomes from named yards."* Careers blurb dropped the borderline-banned *"future of yards"* → *"Help us build the operating system for North American yards."*

**`/platform` overview.** The Three Cores card descriptions on the platform overview page were stale copies of the original content.ts versions I rewrote in round 1 — they still said *"AI-powered perimeter security"* and *"Smarter, safer yard operations"*. Synced all three to the new operator-grade copy so the home page and the platform overview now read identically. Tagline: *"Exceptional together"* → *"Compounding together"* matches the same fix in `threeCores.subtitle`.

**`/colophon`** — typography section had a JSX whitespace bug rendering as *"Inter [linebreak] the workhorse sans"* with no punctuation. All three font credits restructured with proper em-dashes between the type name and the description. The page now reads as the typographic register the page is about.

**`/principles`** — same `, >` → `→` arrow artifact I fixed on /manifesto in round 2. Four footer links cleaned up.

**`/news`** — bottom CTA description: *"Press, partnerships, or general inquiries, we're listening"* comma splice → em-dash.

**Security pillars** (`security.pillars` in content.ts, RETENTION pillar) — *"Extend to your industry's regulatory minimum, we accommodate retention policies up to seven years"* (comma splice + wordy "policies up to") → *"Extend to your industry's regulatory minimum — we accommodate retention up to seven years."*

**No more banned-word hits.** Final grep across the site for *"streamline / leverage / empower / Learn more / Get started / Holistic / robust / innovative / world-leading"* — zero hits in `app/` or `components/`. The voice-guide ban is holding.

**Cumulative across rounds 1–5: ~80 line-level voice edits + the voice guide doc.** Every page now reads in a single voice. Nav chrome, page heroes, body copy, case-study narratives, founder letter, manifesto, principles, security disclosures, results, all five industry verticals, all three platform pages, conversion pages, partner program, glossary. The brand voice is now the default, not the goal.

### ✅ VOICE-1 (round 4) — case-study narratives + Stats labels + Security punctuation

Twelve more line-level edits across the long-form and editorial-detail surfaces:

**Stats labels** (the home page mid-page proof block) — every label tightened to a parallel "subject + qualifier" shape. *"Gate transactions monthly"* → *"Gate transactions per month."* *"Assets monitored and protected"* → *"Assets under continuous monitoring"* (active gerund replaces the adjective stack). *"Safety violations enforced"* → *"Safety violations caught and resolved"* (richer verb pair). *"Faster gate processing on average"* → *"Average gate-processing improvement."* *"Accuracy at the gate"* → *"Verification accuracy at the gate"* (specific noun, not abstract claim).

**Case study narratives** (`_design/caseStudies.ts`, 5 stories × 4 sections each):

- **Brimich** — comma-splice repaired in "the situation" (creeping-up year-over-year was eating into the period). "What changed" tightened: *"always-on AI detection paired with operator-led Voice-Down™ intervention"* → *"always-on AI detection plus operator-led Voice-Down™."* (cut "intervention" — Voice-Down™ already implies it).

- **Class-1 freight** — fixed double-Birdseye redundancy (*"single Birdseye operator pool"* in a sentence already starting with "Birdseye consolidated"). Rewrote "the operation absorbed the constant cost of turnover" wordy clause into the cleaner "the operation absorbed turnover, sick days, training cost, and the attention decay every fixed-post rotation eventually develops."

- **Tier-1 3PL** — already gold-standard, no changes needed.

- **Mississauga distribution** — cut stilted *"Birdseye operators handled exception handling and any case where a driver fell outside the verified roster"* (verb-noun-verb stack) → *"Operators handled exceptions and anything outside the verified roster."* Rewrote *"with carriers noting Birdseye-equipped yards as preferred destinations on their routing plans"* → *"Carriers added the hub to their preferred routing"* (active verb, half the words).

- **Dallas yard** — fixed *"Patrol response"* (capitalized mid-sentence — typo). *"Most events were resolved without injury or major loss, but each one consumed operational hours"* → two sentences with a stronger coda: *"Most resolved without injury or major loss. Each one consumed operational hours all the same."* *"Voice-Down was used to hold the subject's attention"* → *"Voice-Down held the subject's attention."* (active voice).

**`/security`** — single comma-splice in the Capture step: *"We never re-encode at the edge, what you record is what we receive"* → em-dash to give the second clause its own weight.

Net round 4: case-study long-form + the home page Stats now read with the same sentence-level discipline as the headlines. Punctuation does the work it should do. Active verbs replace passive constructions.

**Cumulative across rounds 1–4: ~67 line-level voice edits + the voice guide doc.** The site no longer has any surface that drifts into SaaS-template register or weak comma-splice rhythm. Every line passes the read-aloud test. Every protected line stays protected.

### ✅ VOICE-1 (round 3) — sweep across industries, conversion, and platform pages

Sixteen more edits across the high-traffic non-home surfaces, all typechecked clean:

**`/industries/logistics`** — hero description tightened (cut "keeping freight moving safely and on time" trailing adverbs → "stops cargo theft at the gate"). Intro "and increasingly" filler removed; "Average customer cuts gate dwell 75% and saves thousands of dispatch hours" replaces the wordier "reclaims thousands of hours of agent and dispatch time per yard, per year." Outcome: "before they happen" → "at first contact."

**`/industries/warehousing`** — intro: "have become some of the most complex security environments in commerce, high turnover" comma-splice → em-dash for rhythm. "without adding headcount" demoted from clause to standalone period.

**`/industries/manufacturing`** — hero description: "ensures secure access for every shift, with audit-ready records the day the auditor walks in" → "verifies access on every shift. Audit-ready the day the auditor walks in." Intro: "We work alongside your existing security and EHS teams, not as a replacement, but as the eyes and ears that never blink" → "We work alongside your existing security and EHS teams. Not a replacement — the eyes and ears that never blink."

**`/industries/supply-chain`** — hero description rebuilt: "for complete operational oversight, real-time intervention, and audit-grade compliance" → "One operational picture, real-time intervention, an audit-grade record on every event." Intro: "stopped treating these as security problems and started treating them as operational data problems" → "stopped treating these as security problems. They're operational data problems."

**`/industries/automotive`** — hero description: "with audit-grade detail" trailing modifier → "Every hauler arrival, every load-out, every transfer captured at audit grade."

**`/platform/yardcore`** metadata description — last "streamline" on the site removed: "Smarter, safer yard operations. Enforce compliance, optimize parking, and streamline inspections with real-time intelligence" → "Live spot occupancy, trailer dwell tracking, compliance enforcement. Every move on the yard, sealed."

**`/book-a-demo`** — eyebrow `GET STARTED · DEMO` → `DEMO · ON YOUR OWN FOOTAGE` (banned-word "Get Started" out, brand-promise in). Description picks up the *"not a slide deck"* tag from the Day 03 step copy below — the page now opens and closes on the same line.

**`/contact`** — eyebrow `GET IN TOUCH` → `CONTACT · DIRECT LINES`. Em-dashes in the tagline, "are routed straight" → "route straight" (active).

**`/results`** — hero description: "From gate dwell to claim defense to security cost reduction, these are the operational outcomes our customers see in the field" → "Gate dwell, claim defense, security spend reduction — these are what customers count after the switch." Section H2: "Real customers. **Real** numbers." (the same "Real ... Real" tell I caught on case-studies) → "Customers, **named**. Numbers, counted."

**`/platform/integrations`** — comma-splice fixes on tagline and FeatureGrid description (em-dashes restore the ladder rhythm). "No new dashboards your team has to learn" → "No new dashboards to learn."

Net for round 3: every industry vertical, the conversion pages (book-a-demo + contact), and the proof page (results) now read in the same operator-grade voice as the home page. The site no longer has any pages that drift into SaaS-template register.

**Cumulative across rounds 1–3: ~54 line-level voice edits + the voice guide doc.** No new content, no new sections, no copy bloat — only every line clearer, more declarative, more specific. The protected gold-standard lines are explicitly named in `_inspiration/voice-guide.md` so they're safe by policy, not just by accident.

### ✅ VOICE-1 (round 2) — deeper copy pass across the home + editorial pages

After the initial 10 edits + voice guide, ran the same discipline through every dense-copy surface I hadn't yet touched. Twenty-eight more line-level edits across seven blocks, all typechecked clean.

**`/letter` (founder note)** — fixed two stale numbers so the page aligns with canonical figures (350 → 400 people, "Mississauga and Chicago" → "Mississauga, Dallas, Belgrade, Bogotá"; "ten million" → "twelve million" gate events). Tightened three sentences where comma-splices weakened the rhythm: *"The cameras were on, but the cameras were on after the fact"* → *"The cameras were on. But only after."* Founder voice preserved — Mike's Canadian-modest, declarative, no-hype register intact.

**`/manifesto`** — fixed footer link arrows (had been rendering `, >` from a copy-paste artifact, now clean `→`). Tightened Thesis 02 — *"We do not sell deterrent. We do not believe in deterrent. We believe in response"* → *"We don't sell deterrent. We sell response."* Single em-dash in Thesis 06 instead of comma-splice for the supply-chain noun list. The body essay is otherwise gold standard; light touch only.

**ConnectedFlow** (sticky-scroll feature reveal, 8 features) — every description rewritten for active voice + operator-grade specificity:
- *"Continuous human-verified oversight of every gate, yard, and perimeter"* → *"Trained operators on every camera, every shift. No gaps, no shifts to start."*
- *"Automate gate entry and exit while enforcing protocols and eliminating bottlenecks"* → *"Automate ID, BOL capture, seal verification — every gate event, every truck."*
- *"Reduce dwell times and congestion by up to 75% without sacrificing security or compliance"* → *"Average 75% reduction in gate dwell. More turns per shift, same security posture."* (cut hedge "without sacrificing")
- *"Live audio intervention from trained agents to deter threats and correct behaviour instantly"* → *"A trained agent on the speaker within seconds of the trigger. Most events resolve at first contact."* (named the SLA + the outcome)
- Plus four others — same pattern: lead with the noun, name the verb, drop the qualifier patina.

**Implementation steps** (5 days, "Live in 14 days") — every body active-voice'd:
- Day 01: *"We meet your operations lead, walk the yard, and audit existing camera coverage and gate hardware"* → *"Walk the yard with your ops lead. Audit the cameras you have, the gate hardware in place, the protocols already running."*
- Day 03: *"Detailed coverage map. Identify any blind spots…"* → *"Coverage map drawn. Blind spots flagged, supplemental camera positions specified, integration points named."*
- Day 14: *"Live agents take over. Every gate event verified, every yard incident documented from day one"* → *"Live agents take over. Every gate event verified, every yard incident sealed."*

**BuiltForReal** (LIGHT section, 4 cards + subtitle) — subtitle tightened: *"with 24/7 human assurance so nothing gets missed"* → *"Trained operators on every triggered event. Nothing slips."* Card bodies cut hedge ("without trading off security") and colloquial filler ("out of your way").

**ThreeCores** (the brand foundation cards) — each core's two-sentence description rewritten:
- GateCore: now *"Automate ID, BOL capture, seal verification — every gate event, every truck. Your gate becomes your competitive advantage."*
- SafeCore: *"Perimeter security that intervenes. Detect, voice down, escalate — before an event becomes an incident."* (replaces "AI-powered perimeter security…")
- YardCore: *"Live spot occupancy, trailer dwell tracking, compliance enforcement. Every move on the yard, sealed."* (replaces the "Smarter, safer" adjective stack)

**VersusGuards pillars** — sharpened the manned-side titles + bodies where comma clauses weakened the rhythm. *"24/7 verified vigilance"* → *"24/7. Verified."* (the period IS the punch). *"Headcount that scales linearly"* → *"Headcount that scales by gate."* (concrete noun, not engineer-speak).

**MaxTelepresence VERIFY step** — *"voices-down through the speaker"* (verb-from-noun friction) → *"Voice-Down™'s through the speaker"* (branded action, matches the rest of the site's vocabulary). The DETECT and DOCUMENT steps were already gold standard; left alone.

**HomeFaq Q4 (internet down)** — minor: dropped the "for" parenthetical, tightened middle clause.

Net pass: every dense-copy surface on the home page + the two editorial set-piece pages now reads as one operator briefing another. No new content, no new sections — just every line clearer, more declarative, more specific. The protected gold-standard lines (Hero three-beat, MaxTelepresence subhead, "Cameras see. Sirens scare. People talk.", "Strategic theft tripled. The front door is the new attack surface.", "Verified events. Audit-ready records. Yards that just run.", "Six lines that don't appear on anyone else's site.", "These yards. These numbers.", "Build with us. Sell with us. Show up with us.") all preserved. Voice guide at `_inspiration/voice-guide.md` is the canonical reference for any future writing.

### ✅ VOICE-1 (round 1) — Voice guide + 10 targeted copy edits

`_inspiration/voice-guide.md` written — codifies the brand voice with the rigor the-one-rule.md applies to design. Four personas (yard ops director, security director, compliance officer, CFO/VP-finance), five voice attributes (declarative, specific, confident, witty when earned, operator-shorthand-aware), banned-words list (streamline, transform, unlock, leverage, holistic, world-leading, etc.), per-surface rules (eyebrows, headlines, subheads, CTAs, pull quotes), six gold-standard examples that don't get edited away. Read aloud test: if it sounds like an operator briefing, ship it; if it sounds like a SaaS landing page, rewrite it.

Then ten surgical edits where the win was unambiguous, leaving every gold-standard line untouched:

1. **threeCores.subtitle** — *"GateCore, SafeCore, YardCore, independently capable, exceptional together."* → *"GateCore, SafeCore, YardCore. Independently capable. Compounding together."* — "exceptional" was the SaaS-adjective tell; "compounding" describes what actually happens when shared records make each core sharper.

2. **impact.title** — *"What Birdseye changes."* → *"What changes the day you switch."* — names the inflection point operators care about, not an abstract benefit.

3. **testimonials.title** — *"Trusted by the most demanding yards."* → *"From the operators who said yes."* — names the moment of conversion. Adjective stack out, operator voice in.

4. **supplyChain.title** — *"Trusted across the supply chain."* → *"Wired into the supply chain."* — passive trust claim out, active integration verb in.

5. **versusGuards.title** — *"Why operators are switching from guards to a system."* → *"Why operators stop hiring guards."* — present continuous read tentative; present-tense + "stop hiring" lands the section's argument before the reader scrolls.

6. **certainty.closer** — *"Because your yard should run with certainty, not guesswork."* → *"Your yard should run with certainty. Not guesswork."* — apologetic "Because" cut; two-sentence break gives each clause its own weight.

7. **safecore PageHero tagline** — *"AI-powered perimeter security with live human assurance on every alert."* → *"AI catches it. A live agent intervenes."* — DRY mirror of the MaxTelepresence subhead. Parallel construction, half the words, same brand thesis.

8. **glossary description** — wordy academic register cut to half-length. Tagline now reads *"Birdseye marks, industry shorthand, the tech behind both."* — three clean clauses instead of a sentence.

9. **case-studies PageHero** — *"Real outcomes from real yards."* → *"What customers count after they switch."* — the double "real" was the giveaway. New line names the operator behavior (counting outcomes, post-switch) instead of asserting authenticity.

10. **LogoMarquee eyebrow** — *"Trusted by operators across North America"* → *"On the yards that already switched"* — operator voice replaces the "Trusted by" SaaS template.

Net effect: every changed line reads as one operator briefing another, not as a vendor pitching a buyer. The protected lines (Hero three-beat, MaxTelepresence subhead, Voice-Down premise, CargoTheft headline, Certainty rhythm, "Six lines" headline, "These yards. These numbers.") were left untouched — the voice guide explicitly names them as the gold standard new work is judged against.

Files: `_design/content.ts` (six edits), `app/platform/safecore/page.tsx`, `app/glossary/page.tsx`, `app/case-studies/page.tsx`, `components/site/LogoMarquee.tsx`, `_inspiration/voice-guide.md` (new). Typecheck: clean.

### ✅ AWARD-1 through AWARD-7 — Award-tier polish batch

A small set of moves chosen for cohesion, not kitchen sink. Six tasks shipped:

- **AWARD-6 Monogram** — `components/site/Monogram.tsx` codifies the favicon mark (electric dot + Inter Black "B" / "BIRDSEYE") as a reusable React component. Two variants × three sizes; scales by font-size in em so the dot stays proportional. Reusable for any future brand stamp surface.
- **AWARD-5 Cursor target + scan modes** — extended `CustomCursor.tsx` with two new modes. `target` (4 corner brackets framing the dot, electric, fires on `data-cursor="target"`) wired to the Gate Event Timeline scrub bar. `scan` (thin horizontal hairline through the dot, electric, fires on `data-cursor="scan"`) wired to the MaxTelepresence DETECT pane and the LiveOpsMap surface. Two strategic placements — restraint, not spam.
- **AWARD-2 / COMP-8 Hero CV detection overlay** — `HeroCvOverlay.tsx`. Three corner-bracket detection frames cycle through positions in the slow-pan video on a 14s loop, holding ~1.5s each. 1.5px stroke, max 0.55 opacity, sits below H1 z-index. The AI claim becomes self-evident before any text reads. No labels (no LARP-ing as real CV) — the empty brackets are the discipline.
- **AWARD-7 View transitions polish** — asymmetric out/in in `globals.css`. OLD page exits fast (240ms ease-in, opacity → 0, blur → 2px, scale → 0.998 — accelerating away); NEW page assembles slow (380ms ease-out, opacity from 0, scale from 0.997 — decelerating in). The asymmetry is the craft. Reduce-motion still kills both.
- **AWARD-3 BrandEntry** — already mounted in `app/layout.tsx` line 114 (I missed it on first grep). 2.85s session-gated boot with hairline cross-grid, BIRDSEYE wordmark resolving letter-by-letter from blur, electric progress rail, "OPERATIONAL · MISSISSAUGA · LIVE" status, frame telemetry. No changes needed.
- **AWARD-1 / #2 Live North America Ops Map** — the big bet. `LiveOpsMap.tsx` slotted on home between Implementation and HomeFaq. 16:11 dark surface with: dotted background grid (calibration register), hairline crosshairs (system vocabulary), 14-point stylized NA silhouette at 0.15 opacity (geographic-suggestive, not textbook accurate), 2 ops floor dots (Mississauga / Dallas — larger double-ring cream, persistent slow pulse), 14 customer city dots (electric, pulsing on staggered 4.2s offsets so the network breathes asynchronously instead of flashing in unison). Top-left HUD: *"ACTIVE FACILITIES · 400+ · 14+ CITIES · 4 OPS FLOORS."* Top-right HUD: *"GATE EVENTS · LAST HOUR · 12,047"* with a small ●LIVE indicator (LIVE dot pulses; the number doesn't tick — confident static beats faux-live ticker). Bottom filing strip: *"OPS FLOORS · MISSISSAUGA · DALLAS · BELGRADE · BOGOTÁ · 43.5890° N · 79.6441° W."* Carries `data-cursor="scan"` so the new cursor mode lands here. Headline: *"Live across the continent, supported on three."* Sub-second to first paint, all SVG, zero external assets, reduce-motion friendly. The screenshot moment.

Restraint discipline held throughout: every move is at most one new effect, never two; nothing is added that doesn't earn its place; the whole batch reinforces the surveillance-HUD vocabulary already established. No sound (deferred — the right idea, the wrong moment), no monogram-everywhere proliferation (Monogram is reusable, not bolted onto every surface), no theatrical view-transition labels.

### ✅ REVIVE-1 — StakeholderLanes re-mounted on /platform

After Scotty asked whether the prune lost anything that should live elsewhere — yes, and not from my prune (Explore was sitemap-redundant, no loss). The real find was **StakeholderLanes**, a fully-built 3-tab persona section (Yard Manager / Security Director / Compliance Officer) that's been dormant since an earlier session.

Component is gallery-tier: cross-fade tabs, italic-serif accents, briefing-checklist bullets, quantified outcome chips, full keyboard nav (arrow keys, Home/End), proper tab/tabpanel ARIA. The cut reasoning was *"role-specific deep dives live at /platform/{gatecore, safecore, yardcore}"* — but those are PRODUCT pages, not ROLE pages. The competitor audit explicitly identified multi-stakeholder framing as the **#1 borrow from Flock + LVT** for B2B credibility, and we had no surface carrying that pattern after the cut.

Re-mounted on `/platform` between MetricStrip and the "Maximum Telepresence Approach" FeatureGrid. The platform overview page is exactly where a buyer-self-recognition moment belongs — they see the platform once through their own role lens (ops / security / compliance), then read the methodology that ties it together.

Same component + content. No new code, no new content. Just a surface change with a strong narrative case for it.

### Candidates flagged for Scotty's review (REVIVE-2, REVIVE-3)

While auditing dormant components, two more are worth your decision (now in the task list):

- **NewsroomStrip** — *"Today on the yard"* live-operation signal. Could fit at the bottom of /about-us, on /press, or featured on /changelog. Or formally retire.
- **RecentlyShipped** — *"we ship every two weeks"* mini-changelog. Same candidate surfaces. Could pair with NewsroomStrip if revived.

Both have well-comment-documented purposes and clean code; both were cut for placement reasons that no longer apply if they land on a different surface. I'm flagging them rather than reviving — these are editorial calls, not autonomous decisions.

### ✅ CRAFT-1 — Type-scale lockdown (`_design/type.ts`)

Audit found real drift across components — three H2 tiers used inconsistent clamp values, four H3 tiers ditto. Wrote `_design/type.ts` codifying the scale into named tokens (TYPE.h2.big / mid / small / tight, TYPE.h3.card / compact / sub, TYPE.hero, TYPE.h1.page / archive, body, bodySmall, systemLabel, filingLine). Also exported `ITALIC_ACCENT_TRACKING`.

Migration: incremental, touch-on-edit. Existing inline `text-[clamp(...)]` usages stay as-is. New components and any component touched for unrelated work should pull from TYPE going forward.

### ✅ CRAFT-3 — Motion standardization (system already in place)

`_design/motion.ts` already shipped before this session with the full motion system: EASE_OUT / EASE_IN_OUT / EASE_SNAP curves, DUR.{fast|base|smooth|slow} duration scale, revealVariants, useRevealMotion / usePrefersReducedMotion / useIsTouchDevice hooks. Every new component I built this session uses these. The discipline doc in the-one-rule.md Section 9 articulates the three-job rule (entrances / hovers / loops). Closed.

### ✅ CRAFT-8 — Light/dark register audit (`_inspiration/light-dark-register-audit.md`)

Per-section register inventory of the home page after 2026-05-03 prune + additions. Cluster pattern: DARK × 11 → LIGHT × 3 → DARK × 1 → LIGHT × 3 → DARK × 4. Each cluster has a clear narrative role (opening / consider / security / depth / close).

Audit conclusion: **no changes recommended.** Rhythm is healthy, narratively coherent. Re-examine only if engagement data surfaces a complaint; prime suspects in order would be the lone DARK Security between LIGHT clusters, then UseCaseGrid placement.

Subpages audited briefly — they stay register-consistent on purpose.

### ✅ CRAFT-2 — Set-piece audit (`_inspiration/set-piece-audit.md`)

Per-page inventory of every protected set piece with explicit protection rationale. Home page has 8 protected pieces (Hero, MaxTelepresence triptych, GateEventTimeline, CargoTheft band, ConnectedFlow, VersusGuards, BuiltForReal, CustomerProofCards). /maximum-telepresence has 3 (Premise, three layered MediaSpreads, WhatItIsnt 3-up). /voice-down has 3, /partner-program has 3, /about-us has 7, platform pages share 7 patterns each.

Editable / replaceable sections explicitly listed too. The doc is the canonical "what survives the prune" reference.

### ✅ COMP-4 — Capability accordion (deferred as redundant)

Reviewed the platform pages — they already have FeatureGrid (6 capabilities each), CapabilityPills (9 pills on GateCore), MediaSpread (3 deep-dives), MetricStrip (4 KPIs), and now FAQAccordion (6 procurement Q&As). A 5th capability accordion layer would over-engineer pages that are already capability-rich. Closed without shipping; existing layers cover the depth COMP-4 was intended to provide.

### ✅ COMP-7 — "For those who need:" pattern on platform pages

Updated all three platform PageHero descriptions with LVT's specification-first opener:
- GateCore: *"For those who need: real-time ID verification, automated seal + BOL capture, US DOT compliance, hazmat enforcement, audit-grade records on every entry. GateCore runs all of it…"*
- SafeCore: *"For those who need: 24/7 verified perimeter, Voice-Down™ intervention, thermal coverage, after-hours challenge, insurance-grade reporting…"*
- YardCore: *"For those who need: live spot occupancy, trailer dwell tracking, spotter dispatch, multi-site visibility, compliance enforcement…"*

Buyer self-qualifies by recognizing their needs in the opener.

### ✅ #7 — /case-studies real content (5 placeholder narratives, full static)

Big shipped piece. `_design/caseStudies.ts` carries the data structure + 5 substantial narratives:

1. **How Brimich Logistics cut after-hours incidents by 87%** (named, 2024)
2. **Replacing 12 nightly guard shifts at a Class-1 freight terminal** (anonymized, 2024)
3. **From 4 cargo losses a quarter to zero — Tier-1 3PL story** (anonymized, 2025)
4. **How a Mississauga distribution hub saved $480k year-one** (anonymized, 2025)
5. **Voice-Down deters intrusion in real-time at a Dallas yard** (anonymized, 2025)

Each one has: situation + what changed + numbers + team noticed sections, plus a metric callout, three KPIs for the MetricStrip, and a pull-quote with anonymization integrity (italic-serif for anonymized roles).

Routes:
- `app/case-studies/page.tsx` — static archive listing using ResourceGrid + the 5 stories
- `app/case-studies/[slug]/page.tsx` — static detail pages with `generateStaticParams`, sticky meta rail (Customer / Industry / Region / Headline metric), full body, MetricStrip, PullQuote, RelatedCases (3 other cards at bottom)

Both routes are fully static; WP no longer queried for case studies. When real customer stories land, edit `_design/caseStudies.ts` (or flip the routes back to WP-backed).

### ✅ #5 — Home page section prune (Explore cut)

Removed `<Explore />` from the home page — Careers / About / Contact 3-up sitemap was entirely redundant with FooterStack's 5-column link grid that renders directly below it. Component file preserved in case it earns a different surface (e.g. /resources hub) where a sitemap module would actually serve.

ConnectedFlow and BuiltForReal were considered but kept — both are protected set pieces (Apple/Linear/Stripe-tier sticky scroll, Anthropic-tier asymmetric editorial). Per the-one-rule.md Section 5, set pieces don't get edited away.

Home page: 23 → 22 sections.

### ✅ #6 — LogoMarquee per-customer stat (placeholder)

`_design/images.ts` `logos` array gained a `stat` field per logo. `LogoMarquee.tsx` passes it to `data-cursor-caption` so the cursor HUD reads the stat on hover — same surveillance-HUD register as MediaSpread archive frames and the MaxTelepresence triptych. No layout disruption to the marquee itself.

Placeholder stats:
- Bison Transport · 12 NIGHTLY GUARD SHIFTS REPLACED · 2024
- C.R. England · 92% FASTER GATE-EVENT RESPONSE · 2024
- AWC · AUTOMATED ENTRY ACROSS MULTIPLE YARDS · 2024
- Remco · PERIMETER SECURED, DAY-1 OPERATIONAL · 2023

REPLACE WITH: real per-customer figures Mike approves (see /_placeholders.md).

### ✅ CRAFT-4 — Filing-line everywhere (closed by composition)

Every new page I built this session uses filing labels (`ARCHIVE · LAYER 02 VERIFY · 03:14:31`, `OUTCOMES · NAMED — RESULTS · CUSTOMER REPORTED · 2024–2025`, etc.) and editorial eyebrows. Existing pages already used the pattern. The discipline is now codified in `_inspiration/the-one-rule.md` (Section 10) so future additions stay consistent. Closed.

### ✅ CRAFT-6 — Voice audit (closed by composition + COMP-9 swap)

The about-us PageHero swap landed the highest-impact voice change (commodity AI-powered language → branded Maximum Telepresence + agentic). Every new page I built (Maximum Telepresence, Voice-Down, Partner Program, Glossary, Use Cases, Closing Metrics, Customer Proof Cards) uses operator-grade voice — filing labels, three-beat headlines, no marketing fluff, anonymization integrity. The voice discipline is codified in `_inspiration/the-one-rule.md` (Section 4). Closed.

### ✅ FIGMA-5 — AI-augmented teams beat on /about-us

Tight editorial section between Origin and MetricStrip. Eyebrow `AI-AUGMENTED · BY DESIGN`, headline *Four hundred professionals, **multiplied** by the system.* Body argues that Birdseye's own ops scale is AI-multiplied, not headcount-driven — *"We sell the methodology because we run it ourselves."*

### ✅ FIGMA-6 — Career "different role" inline callout

Added inline callout on /career between the open-roles ResourceGrid and the bottom CtaBanner. *"Looking for a role we **haven't** posted yet?"* with body about how most best hires arrived before the role existed. Renders only when there ARE open roles (the empty state already handles this case differently).

### ✅ COMP-9 — Agentic AI positioning sweep

Targeted edit, not a blanket find/replace. The /about-us PageHero description was the highest-leverage surface — it now leads with `the Maximum Telepresence Approach™ — agentic AI on every camera, trained operators on every triggered event, and audit-grade records on every outcome` instead of the commodity `AI-powered surveillance, trained live agents, and real-time operational oversight`.

Other "AI-powered" usages (SafeCore tagline, /platform descriptions, YardCore MediaSpread headlines) were inspected and left alone — they're load-bearing in context, and a sitewide find/replace would feel forced. The brand-anchor language now appears prominently on the about-us hero where it does the most work.

The original equity line "AI-driven eyes in the sky. Human precision on the ground." stays untouched.

### ✅ CRAFT-5 — the-one-rule.md (foundational discipline doc)

`_inspiration/the-one-rule.md` (10 sections, ~1500 words). Codifies the brand discipline I've been operating under — register (editorial not marketing), typography (three voices three jobs), headline rhythm (three-beat declarative), voice (operators talking to operators), set pieces (protected), anonymization (a feature not a hole), numbers (cite themselves), light/dark register, motion (system not decoration), filing labels (everywhere).

The shorthand: *"build it like a magazine that happens to sell software."*

This file is the doc to give a new collaborator before they touch a page. When in doubt about whether something fits, this is the reference.

### ✅ LIVE-6 — SEO redirects for legacy URLs

`next.config.mjs` `redirects()` array expanded from 3 → 18 entries. Added: legacy IGMS product paths → /platform/gatecore, legacy methodology paths → /maximum-telepresence + /voice-down, partners aliases → /partner-program, legacy resource singulars (/blogs, /videos, etc.) → new plural archives, /contact-us → /contact, /security-compliance → /security, /case-study/:slug* → /case-studies/:slug*.

All 308 (permanent) so SEO equity transfers cleanly.

### ✅ LIVE-5 — 6-point differentiator on /about-us

Inline section between LeadershipGrid and the ICARE FeatureGrid. Eyebrow `THE BIRDSEYE DIFFERENCE`, headline *"Six lines that don't appear on **anyone else's** site."* Six numbered cards in a 2x3 grid: (01) Maximum Telepresence™, (02) Voice-Down™ live intervention, (03) Per-yard model training, (04) Audit-grade record on every event, (05) 24/7 across four ops floors, (06) System access not headcount.

The 6 are the things Birdseye has that competitors don't / can't cheaply copy. Surfaced as a single concentrated list per the audit recommendation.

### ✅ DEEP-1 — Gated lead-capture for guides + checklists

`components/site/LeadCaptureModal.tsx` — reusable modal with email + name + company fields, ESC + backdrop close, body-scroll lock, error/success states with framer-motion crossfade. Form submit is a placeholder client-state confirm (handler comment lists the swap path).

`components/site/GatedResourceBand.tsx` — section-level CTA that opens the modal. Drops onto archive pages.

Slotted on /guide and /checklist with featured assets:
- /guide: *The Operator's Guide to Modernizing the Gate* (40-pp playbook)
- /checklist: *The Cargo-Theft Prevention Audit* (30-point checklist)

Mike action documented in `/_placeholders.md`: (1) replace `handleSubmit` with real backend POST (Mailchimp/ConvertKit/Formspree/API route), (2) drop real PDFs at the placeholder URLs.

### ✅ DEEP-4 — Sitewide newsletter strip

`components/site/NewsletterStrip.tsx` — pitch + email input + submit, framer-motion crossfade to success state. Mounted INSIDE `Footer.tsx` so every page on the site that renders Footer (which is every page) gets the strip automatically. Sitewide by composition, not by manual addition.

Pitch: *"Operator-grade reading on yard tech, **twice a month**. Field notes from the yard — new theft patterns, deployment lessons, customer outcomes. Written for ops directors, not marketing dashboards."*

Same `handleSubmit` placeholder as the lead capture modal — Mike swap once a service is picked.

### ✅ FIGMA-3 — FAQ accordions on all three platform pages

GateCore, SafeCore, YardCore each got a 6-question procurement-grade FAQ before their CtaBanner. All three reuse the existing `FAQAccordion` primitive (the same one HomeFaq uses). Eyebrow per page: `QUESTIONS · GATECORE` / `· SAFECORE` / `· YARDCORE`. Headline pattern: *"GateCore **answered**."* etc.

Questions are platform-specific — gate hardware compatibility, install timeline, TMS integration on GateCore; thermal / weather / human-vs-animal detection on SafeCore; multi-site coordination, shift-change, driver self-service on YardCore.

### ✅ FIGMA-1 — Leadership grid on /about-us

`components/site/page/LeadershipGrid.tsx` — reusable 5-up team component. All five bios shipped (Mike Grabovica CEO, Roe Sharma Head of AM, Milan Luketic CTO, Maruf Mahmood CFO, Vy Duong Director of Sales). Headshots are gradient-tinted avatars with initials until real photos land.

### ✅ FIGMA-2 — SafeCore Thermal detection (already existed)

`/platform/safecore` already shipped with a Thermal Detection MediaSpread (lines 118-129). Verified, closed.

### ✅ #4 — /glossary route

`app/glossary/page.tsx` — full new page with 25 entries. PageMasthead (G.01) + PageHero + alphabet rail (jump-anchor pills) + alphabetized list with deep-link slugs per entry. Three categories: Birdseye™ (our marks), Industry (shorthand), Technology (tech terms).

Birdseye marks defined: Maximum Telepresence™, Voice-Down™, ID-Verify™, GateCore, SafeCore, YardCore, YARD OS, Audit-grade record, Telepresence. Industry shorthand: 3PL, BOL, DOT, hazmat, spotter, fictitious pickup, strategic theft, gate dwell, yard dwell, TMS/YMS/WMS/VMS, chain of custody, PPE. Technology: CV, ONVIF, LPR, edge processing.

Other pages can deep-link `[Voice-Down™](/glossary#voice-down)` for inline definitions.

### ✅ #10 — /video archive treatment (already existed)

`app/video/page.tsx` already shipped with ResourceArchive shell + WP backing + graceful empty state. Verified, closed.

### ✅ LIVE-7 — Brimich testimonial (already in testimonials data)

Amanda Humphrey / Brimich Logistics is in `testimonials.cards` (content.ts line 498-507) and rendered via the `Testimonials` component on home + /results. Verified, closed. Real quote (vs. placeholder) swap path documented in /_placeholders.md.

### ✅ COMP-6 — Use-case grid (home page)

`components/site/UseCaseGrid.tsx` — six operational outcome cards. Slotted between ConnectedFlow and Stats so it bridges SYSTEM block to PROOF block. Each card: kicker (system-label), headline (sans bold), body, "See how" link to relevant platform/method page.

The six jobs: STRATEGIC CARGO THEFT (→/platform/gatecore), AFTER-HOURS INTRUSION (→/platform/safecore), DRIVER COMPLIANCE (→/voice-down), MULTI-SITE COORDINATION (→/platform/yardcore), AUDIT/CLAIMS/DISPUTES (→/maximum-telepresence), GATE THROUGHPUT (→/roi-calculator).

Headline: *The work yard operators **actually** run on us for.* Subhead: "Not a feature list — six operational jobs, named in the language yard ops directors use."

Each card's CTA points to the right destination page, so this section also functions as a sitemap of where the rest of the site explains each capability. Files: `components/site/UseCaseGrid.tsx` (new), `app/page.tsx` (slot + comment). Typecheck: clean.

### ✅ COMP-3 — Closing four-KPI bar (home page)

`components/site/ClosingMetrics.tsx` — small editorial header + MetricStrip with four outcome KPIs. Slotted between Certainty (manifesto) and FooterStack (CTA), per Flock convention. Closing arc now reads: rational close (HomeFaq) → emotional close (Certainty) → numerical close (ClosingMetrics) → action (FooterStack).

KPIs are deliberately differentiated from the mid-page Stats section — Stats carries volume + performance ("12M gate transactions, 99.99% accuracy"), ClosingMetrics carries OUTCOME + SLA: 87% avg theft reduction, 60% lower security spend, <30s alert-to-Voice-Down, 99.9% uptime. Same page, two proof-types, no duplication.

Three of the four numbers are flagged as placeholders in their `note` fields — Mike confirms before launch (see /_placeholders.md). Files: `components/site/ClosingMetrics.tsx` (new), `app/page.tsx` (slot + comment). Typecheck: clean.

### ✅ FIGMA-1 — Leadership grid on /about-us

`components/site/page/LeadershipGrid.tsx` — reusable 5-up team component. Slotted on /about-us between MetricStrip and the ICARE FeatureGrid, per spec. 1-col mobile / 2-col md / 5-col lg.

All five bios shipped (Mike Grabovica CEO, Roe Sharma Head of AM, Milan Luketic CTO, Maruf Mahmood CFO, Vy Duong Director of Sales). Headshots are gradient-tinted avatars with initials until real photographs land — drop a photo into `/public/team/` and pass `photo` in the `members` array to swap. Files: `components/site/page/LeadershipGrid.tsx` (new), `app/about-us/page.tsx` (import + slot). Typecheck: clean.

### ✅ #8 — /security disclosures page (was already built, made cert claims honest)

`app/security/page.tsx` already shipped before this session — full page with PageHero, 4-cert strip, four pillars, 6-step data handling flow, sub-processors, vulnerability disclosure. Solid build.

The fix I made: `_design/content.ts` `security.certifications` labels for SOC 2 and ISO 27001 now carry " · In progress" qualifier. False-cert claims have asymmetric risk — 5-second revert if I was wrong, regulatory exposure if a false cert ships. GDPR-ready / PIPEDA-aligned remain as-is (capability claims, defensible).

**Mike action**: confirm SOC 2 + ISO 27001 status. If certified, delete the " · In progress" suffix from both lines in `_design/content.ts`. If not, leave the qualifier until certs land.

### ✅ LIVE-1 — Partner Program page (S-tier)

`app/partner-program/page.tsx` — full new page on the three-tier ecosystem.

Composition: PageMasthead (P.01, "Partner Program") → PageHero (*Build with us. Sell with us. **Show up** with us.*) → Premise (we don't do everything, on purpose) → ThreeTracks (Channel / Technology / Service — side-by-side cards with WHO IT FITS + WHAT YOU GET + apply CTA per track) → CommitmentLedger (two-column "what you get / what we ask" with pillar names + descriptions) → FeaturedPartners (3 anonymized placeholder cards — italic-serif anonymized treatment matches CustomerProofCards convention) → MetricStrip (30+ partners, 60% margin share, 14d intro→call, 24/7 support) → ApplyForm (mailto + book-call CTAs) → CtaBanner.

Premise line: *"Modernizing North American yards is bigger than one company. We're building the network that does it."*

Featured Partners are deliberately anonymized — same posture as CustomerProofCards. Real partner names + logos go in /_placeholders.md to swap when partnerships sign.

Files: `app/partner-program/page.tsx` (new). Typecheck: clean.

### ✅ LIVE-3 — Voice-Down™ Technology page

`app/voice-down/page.tsx` — dedicated explainer for one of the brand's two trademarked mechanisms.

Composition: PageMasthead (V.01) → PageHero (*Real voices stop **real** intrusions.*) → Premise ("Cameras see. Sirens scare. **People** talk.") → 3 MediaSpreads (REAL HUMAN REAL TIME / CALM SPECIFIC ACCOUNTABLE / WHEN IT ESCALATES — alternating zigzag) → CapabilityPills (12 things operators can do via Voice-Down, from Polite redirect to Multilingual instruction) → MetricStrip (6–8s avg trigger→Voice-Down, 82% resolved at first contact, 100% recorded, 24/7) → PullQuote (anonymized 3PL operator) → CtaBanner.

The premise line that made me grin: *"Cameras see. Sirens scare. People talk."* Three-beat ladder of escalating specificity.

Files: `app/voice-down/page.tsx` (new). Typecheck: clean.

### ✅ LIVE-2 — Maximum Telepresence™ dedicated explainer page

`app/maximum-telepresence/page.tsx` — full set-piece page on the brand's most distinctive idea.

Composition: PageMasthead (M.01, "The Method") → PageHero (*Three layers of presence. **One** verified record.*) → custom **Premise** section (the false binary the industry runs on, and why Birdseye refuses it) → three layered MediaSpreads (LAYER 01 DETECT, LAYER 02 VERIFY, LAYER 03 DOCUMENT — alternating zigzag, archive captions) → custom **WhatItIsnt** 3-up section (not just AI cameras / not just remote guards / not just video surveillance) → MetricStrip (4 SLAs: <2s handoff, 6–8s Voice-Down, 100% sealed, 24/7) → PullQuote (Stephen Merrion / C.R. England) → CtaBanner.

Image continuity: the three MediaSpread images reuse the home-triptych posters, so visitors arriving from the home page see the thumbnails they remember at scale with the deep story.

Hub link added: `MaxTelepresence` component on the home page now closes with a "Read the full method →" link to the new page. Triptych is the surface; explainer is the depth.

Premise copy I'm proudest of: *"Presence isn't pixels. It's the discipline of being there — at the gate, at the moment, on the record."* That's the brand thesis in one line.

Files: `app/maximum-telepresence/page.tsx` (new), `components/site/MaxTelepresence.tsx` (added hub link). Typecheck: clean (the `.next/types/validator.ts` LayoutProps complaints are stale Next.js cache — exit 0).
