# Birdseye, Deep Work Lock-in Plan
**Authored 2026-05-02 · For tonight's Cowork session**
**Revised 2026-05-02 · Two corrections from Scotty + Figma audit**

---

## v2, what changed since the first draft

### LOCKED by Scotty
- **Tagline is "Smarter yards are safer yards."**, single line, three-token typography (sans / serif-italic "are safer" / sans). **Shipped:** rewrote `hero` block in `_design/content.ts`. The italic-serif "are safer" carries the editorial accent.
- **Trademarks confirmed kept**, ID-Verify™, Voice-Down™, iGMS / Seal-Verify™, Compliance-Verify™. **Already in `content.ts`** at lines 278 + 298. The first audit was wrong about us having dropped them; only three strays existed and are now fixed (SystemConsole event log, two manifesto thesis lines).

### Corrected since first draft
- **Competitor audit re-run** against the right URLs: `outpost.us`, `terminal-industries.com`, `lvt.com`, `flocksafety.com`. Findings file is `_design/COMPETITOR_AUDIT_V2.md`. The first run hit wrong domains (outpost.cc is event production). **The new findings shift priorities:** LVT's 181-piece custom-illustration library + Flock's multi-stakeholder narrative are the two biggest "they're doing this and we aren't" gaps. Terminal Industries' YOS™ branding + scrollytelling on solutions pages is the cousin we should respect. Outpost's "70% cost reduction" hero stat is the operational-credibility move we lack.
- **Figma audit done** (via Claude in Chrome on Scotty's logged-in session). The file `birdseye design` (fileKey `o8Ok7QBXGzeslj2cm5gP9f`) holds 7 main page mockups: Home, three Solutions (Gate/Safe/Yard), About, Careers, Book a Demo. Page architecture **matches** the rebuild. Stat values **confirmed match** our `/results` page (12M / $100B+ / 84K+ / 9K+ / 75% / 99.99%) and our `/about-us` page (400 / 4 / 2011 / 150%).
- **Figma surprise, brand collateral kit.** Bottom-right of the canvas holds a poster series (BIRDSEYE / GATECORE / SAFECORE / YARDCORE one-pagers) plus three "module data sheets" with bullet lists + image + stat strips per module. **None of this is on the website.** This is asset-grade material, should land in `/press` brand-assets (#D4 lead magnets) and as downloadables.

### Just shipped, credibility sweep A1–A5
Status as of this revision:
- ✅ **A1, Real customer names on all six testimonials.** Norm Sneyd / Bison, Stephen Merrion / C.R. England, Amanda Humphrey / Brimich, plus Bison Operations, C.R. England Gate Ops, Remco Forwarding. Each card now carries `name`, `role`, `company`, `customerIndex`, `year`, `metric`, `provenance`. `Testimonials.tsx` refactored to read from `content.ts` instead of its hardcoded array (single source of truth).
- ✅ **A2, "Smarter yards are safer yards." locked into the hero.** 3-line typography treatment kept. Italic-serif "are safer" carries the accent.
- ✅ **A3, "AI-driven eyes in the sky. Human precision on the ground." restored as `/about-us` tagline.**
- ✅ **A4, Trademark sweep complete.** Only 3 strays: SystemConsole event log "Voice-down resolved" → "Voice-Down™ resolved"; manifesto thesis #02 "voice down through the speaker" → "Voice-Down™"; manifesto thesis #04 "ID-Verify. Seal Verify. Compliance Verify." → "ID-Verify™. Seal-Verify™. Compliance-Verify™."
- ✅ **A5, Quantified metrics restored.** Each testimonial card now carries a one-phrase `metric` field ("−25% security spend", "50-acre yard · claims down", etc.) usable in card chrome / hover state without rewriting the quote.

`tsc --noEmit` clean. No render regressions expected, Hero already consumed `hero.lines`, Testimonials now consumes `testimonials.cards`.

---

## The hard truth, up front

You asked me to recall a content-mapping deep dive across the live site, the Figma, and the competitive set. **It was discussed but never actually executed.** I found no prior memory entry, no audit document, no synthesized findings file in the codebase. We were treating it as done; it wasn't. I just ran it, three parallel research passes (live site, codebase, competitors + Webby benchmarks), and the gaps are bigger and more interesting than I had assumed.

This document is the deliverable from that audit. It's a sequenced, opinionated working agenda for tonight, with each line tagged so you know whether the move is **[WRITE]** copy, **[BUILD]** code, **[COMMISSION]** an animator/illustrator/photographer, **[DECIDE]** a strategic call you make, or **[PHOTO]** a photo shoot direction.

---

## Five findings that change the priority list

These aren't polish issues, they are the things that, left as-is, will keep the new site from clearing the bar Birdseye has set on the live site.

**Finding 1, We anonymized our own testimonials and lost credibility.**
The live site attributes quotes to *named* customers: Norm Sneyd at Bison Transport, Stephen Merrion at C.R. England, Amanda Humphrey at Brimich Logistics, named operations leads at Remco. Our `_design/content.ts` testimonials are stripped to generic role titles ("Warehouse Supervisor", "Logistics Manager"). This is a self-inflicted wound. A B2B buyer reading our quotes vs. the live site quotes sees the live site as more real. *We have the names, we just deleted them.*

**Finding 2, We dropped the brand's signature taglines.**
The live site has two phrases doing heavy brand work: "**Smarter yards are safer yards.**" (home-simple hero) and "**AI-driven eyes in the sky. Human precision on the ground.**" (about page). Both encode the brand thesis in one line. Our hero and about pages don't carry either, we wrote new copy that's competent but not as memorable. These are *equity* lines and should not be quietly retired without a deliberate replacement that's clearly better.

**Finding 3, We dropped trademark feature names.**
Live site uses **ID-Verify™**, **Voice-Down™**, **iGMS™ Lite**, and references **"YardOS Operations Dashboard"**. We use generic verbs (verify, voice-down, gate ops) which makes the platform feel less productized. Trademarked names give a SaaS site shape and defensibility, they're free brand equity.

**Finding 4, We have no lead-magnet/resources system.**
Live site converts on six branded downloadables (cargo theft ebook, yard visibility ebook, gate efficiency checklist, security partner checklist, AI in security guide, etc.). Our `/guide` and `/checklist` routes exist as WordPress mirrors but there's no lead-capture story on the new site. For a sales-led B2B, that's a real conversion gap.

**Finding 5, Industry pages, the Stats page, and the Platform module cards are all text-only.**
Five industry pages (logistics, warehousing, manufacturing, supply-chain, automotive), no photo, no video, no diagram. The Results page is two grids of numbers with no visualization. The /platform module cards are pure text. These are exactly the surfaces where Awwwards-tier B2B sites pull ahead. *The empty surfaces are the headroom.*

---

## THE DEFINITIVE LIST

Sequenced for tonight: do **A** first (it's the credibility floor), then **B** (the brand language), then sprint through **C–E** in whatever order matches what you, the animator, and the illustrator can produce.

---

### A. Content-parity rescue, restore what we already lost

These are *recoveries*, not new work. Each one undoes a regression we shipped.

| # | Item | Type | Effort |
|---|---|---|---|
| **A1** | Re-attribute all six testimonials in `content.ts` with real customer names + companies (Norm Sneyd / Bison, Stephen Merrion / CR England, Amanda Humphrey / Brimich, etc.). Pull names from the live site. | [WRITE] + [BUILD] | 30 min |
| **A2** | Restore "**Smarter yards are safer yards.**" as either the H1, hero subhead, or closing manifesto line. Decide where it lives; don't lose it. | [DECIDE] + [WRITE] | 15 min |
| **A3** | Restore "**AI-driven eyes in the sky. Human precision on the ground.**" on `/about-us` as the lede. It IS the about page. | [WRITE] | 15 min |
| **A4** | Reinstate trademark feature names, **ID-Verify™**, **Voice-Down™**, **iGMS™ Lite**, across hero, MaxTelepresence, ConnectedFlow, GateCore. Sweep `_design/content.ts` for places where we wrote a generic verb instead of the trademarked product name. | [WRITE] + [BUILD] | 45 min |
| **A5** | Add quantified metrics to testimonials: "reduced costs by 15%" / "25% reduction in security spend" / "50-acre yard, one operator." Live site has these, we have the quotes without the numbers. | [WRITE] | 30 min |
| **A6** | Carry forward the live site's threat narrative, *cargo theft as leadership risk*, *fake IDs as 2026 surge*, *AI-to-AI supply chain vulnerability*. These are the news/blog angles that drive sales conversation. Surface at least one as a homepage moment (a "Today on the yard" newsroom strip). | [WRITE] + [BUILD] | 60 min |

---

### B. Brand language tighten, make our copy hit harder than the live site

The live site has equity. The new site should *exceed* it, not just match.

| # | Item | Type | Effort |
|---|---|---|---|
| **B1** | Audit `_design/content.ts` end-to-end for "weak verbs", anywhere we use *helps*, *enables*, *supports*, *provides*. Replace with the operational verbs the live site uses (*verifies, deters, logs, intervenes, seals, escalates*). Editorial tightening, not rewrite. | [WRITE] | 45 min |
| **B2** | Write the **founder's letter** for `/about-us` (300–400 words, Instrument Serif italic). Why this company exists. Why "Yard Operating System" not "yard security." This is a Stripe / Ramp move; it's the most missing piece in our about page. | [WRITE] | 45 min |
| **B3** | Write the **public methodology page** at `/methodology` (or fold into `/security`): how the AI works, how the agent verifies, how the record is sealed. Technical, diagrammed, no marketing fluff. This is what convinces a director of operations. (Stripe pattern.) | [WRITE] + [BUILD] | 90 min |
| **B4** | Re-tag every CTA on the site against three verbs: *Book a demo* / *See it in action* / *Read the case studies*. Right now we have 5–6 different CTA labels, that dilutes the funnel. | [DECIDE] + [BUILD] | 30 min |

---

### C. Multimedia commissions, what to brief the animator + illustrator tonight

Each line is a discrete, scoped commission. Order is by impact, not by ease.

| # | What | For where | Brief in one line |
|---|---|---|---|
| **C1** | **Five industry hero photographs**, logistics dock at dusk, warehousing forklift bay, manufacturing perimeter at night, supply-chain port-side, automotive transfer lot. 16:9. Photographic, not stock. | `/industries/{logistics,warehousing,manufacturing,supply-chain,automotive}` (above the fold) | [PHOTO] · cinematic, navy/electric grade after, mono dateline overlay capability |
| **C2** | **Three module preview loops**, 3–5 sec muted videos: GateCore (truck approaches gate, license plate captured, gate opens), SafeCore (perimeter alert overlay reveals on dark yard), YardCore (aerial trailer-zone heatmap pulses). | `/platform` module cards + `/platform/{gate,safe,yard}core` heroes | [COMMISSION] · animator · matches CameraEye lens vocabulary |
| **C3** | **Animated "How It Works" flow diagram**, 4 nodes (Camera input → AI detection → Agent verification → Sealed record), with hairlines connecting and timestamps appearing as it advances. Reuses our mono dateline + electric accent. | `/platform` (replaces today's text-only feature trio) | [COMMISSION] · illustrator/animator · navy + cream + electric, IBM Plex Mono labels |
| **C4** | **Five ICARE icons**, Integrity, Commitment, Adaptation, Respect, Excellence, as restrained line glyphs (not literal). Style match: thin stroke, geometric, electric accent only on focal point. | `/about-us` ICARE pillars | [COMMISSION] · illustrator · 80×80 SVG, line-art, on-brand |
| **C5** | **Eight ConnectedFlow .webm clips** (already-known #82 blocker), per `/public/connected-flow/README.md` spec. | Homepage ConnectedFlow carousel | [COMMISSION] · video producer · spec exists, just needs production |
| **C6** | **Six customer portrait photos** for the testimonials section (Norm Sneyd, Stephen Merrion, etc.). Editorial portrait, navy/cream grade. If real portraits unavailable, name + role + company logo card without photo. | Homepage Testimonials | [PHOTO] or [DECIDE] |
| **C7** | **"Caught On Camera" video gallery page** (`/incidents` or `/caught-on-camera`), the live site has this content genre and it's *signature* Birdseye proof. Real intervention footage with mono captions and outcome tags. | New page; CommandPalette + nav entry | [BUILD] + [COMMISSION] · video edits already exist on live site, need to migrate + restyle the gallery |
| **C8** | **Animated stats infographic** for `/results`, replaces today's two flat grids. Numbers count up on scroll, with a single navy/electric data visualization (e.g., a horizontal bar showing 75% gate processing improvement, $100B+ assets monitored as a rising stack). | `/results` | [COMMISSION] · designer + framer-motion implementation |
| **C9** | **Logo tablet** (existing #86 blocker), 5–8 marquee customers with operational stat per logo (Honda → "1,800 trucks/wk verified"). | Homepage LogoMarquee | [DECIDE] (Scotty provides stats) + [BUILD] |
| **C10** | **One signature data visualization**, interactive map or globe showing "every yard Birdseye operates, in real time" with subtle pulse on each pin. Based on TeamGlobe pattern but for *customer* sites. | Homepage or `/results` | [BUILD] · framer-motion + lightweight d3 |

---

### D. Net-new pages to ship

These don't exist yet and are missing from the navigation. Each one carries weight on a Webby-tier B2B site.

| # | Page | Justification | Type |
|---|---|---|---|
| **D1** | **/incidents** (or `/caught-on-camera`) | Signature live-site content genre; biggest social-proof asset Birdseye has. | [BUILD] (after C7 commission) |
| **D2** | **/methodology** | Stripe-pattern explainer. The page that wins enterprise procurement. | [WRITE] + [BUILD] |
| **D3** | **/letter** (founder's letter, linked from /about-us) | Ramp/Stripe pattern; humanizes the company; provides editorial moment. | [WRITE] + [BUILD] |
| **D4** | **/resources** (lead-magnet hub) | Replaces the live site's six downloadable ebooks/checklists. **No equivalent exists in the rebuild.** | [BUILD] · [DECIDE] (which ebooks come over) |
| **D5** | **/integrations** (currently a stub at `/platform/integrations`) | Visual showcase of TMS/YMS/WMS partners + camera SDKs + gate hardware. Logo grid + compatibility notes. | [BUILD] + [WRITE] |
| **D6** | **/status** (proposal #101 from prior handoff) | Even a static "OPERATIONAL · v1.4" page reinforces the brand pill. Ties Footer + SystemConsole + Changelog together. | [BUILD] (15 min for static) |
| **D7** | **/principles** (Linear pattern) | Short, opinionated design + product principles. Reuses manifesto register. | [WRITE] + [BUILD] |

---

### E. Add multimedia / story moments inside existing pages

Surgical inserts. Each one transforms a page that's currently text-only.

| # | Where | What to insert |
|---|---|---|
| **E1** | Homepage **VersusGuards** section | Side-by-side scene: dark unmonitored yard photograph (left, before) vs. lit Birdseye-monitored yard with status overlay (right, after). [PHOTO] |
| **E2** | Homepage **Stats** section | Animated count-up + one signature data viz (see C8). |
| **E3** | Homepage **Security** section | Four custom icon glyphs for AES-256, SOC 2, retention, sovereignty. [COMMISSION] |
| **E4** | Homepage **Certainty** (closing) | Either: (a) one final operational footage hero (a 6-sec gate-locking loop), or (b) a single hand-set "Smarter yards are safer yards." typographic moment. [DECIDE] |
| **E5** | Homepage **Today on the yard** (NEW slot, between Hero and ConnectedFlow) | Newsroom strip, three latest blog/news headlines with mono dateline, scrolling marquee or static row. Pulls from the existing `/news` and `/blog` archives. [BUILD] |
| **E6** | `/about-us` **Origin story** | Documentary still or split-image (manual gate-keeper, then modern command center). [PHOTO] |
| **E7** | `/about-us` **Team grid** | Replace today's single team photo with 12–15 portrait tiles, grouped by city (Mississauga, Dallas, Belgrade, Bogotá). Hover for name + role. [PHOTO] + [BUILD] |
| **E8** | `/career` **CareerChallenges + CareerCulture** | Currently text-only. Add either custom illustrations per role family, or candid in-the-office photographs. [COMMISSION] or [PHOTO] |
| **E9** | `/results` | Add a **named-customer outcome row** below the macro stats: "C.R. England, 50 acres, 1 operator. Bison Transport, 25% security cost reduction. Honda, 1,800 trucks/wk verified." Quantified social proof on the stats page. [WRITE] + [BUILD] |
| **E10** | Every industry page (5×) | (a) hero photo per C1, (b) a customer-in-this-vertical pull quote, (c) a vertical-specific outcome stat strip. [WRITE] + [BUILD] |
| **E11** | `/book-a-demo` | Add a 3-step "what happens after you submit" timeline (Day 1: discovery call, Day 3: walkthrough, Day 7: pilot scope). Reduces submission anxiety. [WRITE] + [BUILD] |
| **E12** | Homepage **MaxTelepresence** triptych | Add hairline connectors (left → middle → right) so the three panes read as one event flow rather than three columns. [BUILD] |
| **E13** | Homepage hero | **Mono dateline overlay**, "MONITORING ACTIVE · 47 ZONES · 0 INCIDENTS · LAST UPDATE 14:32 UTC". Live-control-room feel. (Outpost / Terminal benchmark move.) [BUILD] |

---

### F. The "Webby moves", borrow from award winners

Each of these is a discrete, polishable micro-move. None require new assets.

| # | Move | Where | Source pattern |
|---|---|---|---|
| **F1** | Keyboard shortcut hints on key UI moments (`⌘K · Search`, `⌘D · Demo`, `⌘G · Open gate dashboard`). Appears as small mono pill near each major CTA. | Sitewide | Linear |
| **F2** | "Recently shipped" mini-changelog block on homepage (3 most recent /changelog entries). | Homepage, between Stats and Testimonials | Linear |
| **F3** | Footer "STATUS · OPERATIONAL" pill links to `/status` (after D6 ships). | Footer | Vercel |
| **F4** | Privacy-forward signup on `/book-a-demo` and any future newsletter ("No spam · GDPR · Unsubscribe anytime"). | Forms | Attio |
| **F5** | Add `<Reading time>` and `<Last updated>` mono datelines on every blog/news/case-study post. Authoritative editorial signal. | All resource pages | NYT, Stripe blog |
| **F6** | Footer add: link to `/methodology`, `/principles`, `/changelog`, `/press`, `/status`. Build a "**For the careful reader**" subsection in the colophon style. | Footer | Linear, Vercel |
| **F7** | Section interlude on home between every major beat, already exists (#85), just verify all four are wired. Audit. | Homepage | Our own work |
| **F8** | "Run the ROI calculator" call-to-action embedded inline mid-homepage (not just buried in nav). | Homepage VersusGuards or Stats | Vercel pricing calculator |

---

## Sequenced for tonight

Order to actually do the work in.

**Hour 1, credibility recovery (high-leverage, low-effort).**
A1 (real names on testimonials), A2 (restore signature line), A3 (about-us lede), A4 (trademark names sweep), A5 (quantified metrics). All can be done in `_design/content.ts` and front-end edits. ~2 hrs total but pays back permanently.

**Hour 2, write the missing copy.**
B2 (founder's letter draft, even rough), B3 (methodology page outline). These are the pieces that need *you* (the brand voice) and can't be commissioned.

**Hour 3, brief the animator/illustrator.**
Walk through C1–C10 and decide which 4–6 commissions go out tomorrow. Tag each with timeline + budget. Output: a one-page brief per commission, written tonight.

**Hour 4, high-impact code builds.**
E13 (hero mono dateline), E12 (MaxTelepresence connectors), E5 (Today on the yard newsroom strip), E9 (named outcomes on /results). Each ~30–45 min of code; transforms the perceived density of the home + results pages.

**Hour 5+, page builds (if energy holds).**
D6 (`/status`, 15 min static), D2 (`/methodology` page scaffold), D7 (`/principles` page).

---

## What still needs Scotty to provide

These are blockers I can't unblock for you:

1. **Real customer names + quantified outcomes** for testimonials (A1, A5). They're on the live site but I won't paste-fabricate them; you sign off on which to carry forward.
2. **Founder's letter content** (B2), the voice, the founding story, the conviction. I can draft if you give me the bones.
3. **Trademark verification** (A4), confirm ID-Verify™ / Voice-Down™ / iGMS™ are still the live names; some may have been retired.
4. **Logo-tablet stats per customer** (C9, existing #86 blocker).
5. **ConnectedFlow video files** (C5, existing #82 blocker).
6. **Animator + illustrator briefs** (C2, C3, C4, C8, E3, E8), direction + budget once we agree on which to commission.
7. **Photo direction** (C1, C6, E1, E6, E7), shoot list, photographer, location access.
8. **Methodology + principles content** (B3, D7), strategic positioning calls.
9. **Status backend** (D6), Statuspage.io / Better Stack / static, your call.
10. **Lead-magnet selection** (D4), which of the live site's six ebooks/checklists carry forward; do we redesign or replace.

---

## What I'll start doing right now if you green-light

Without further input I can already ship A1, A2, A3, A4, A5, B1, E12, E13, F2, F5, F6, F7, D6, that's the credibility-recovery sweep + 2–3 of the surgical multimedia inserts + the static `/status` stub. Roughly 3–4 hours of work; transforms the sense that this is a "competent rebuild" into "the rebuild that surpasses the live site." Tell me which ones you want me to start on while you're gathering customer data and briefing the animator.
