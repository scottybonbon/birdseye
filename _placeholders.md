# Birdseye site — placeholder content registry

Every line below is real-feeling placeholder text shipped live on the site, with a clear `REPLACE WITH:` prompt. When Mike (or whoever owns the answer) lands the real content, swap-in is a single text edit. Nothing on the site is structurally blocked — only data is.

Keep this file the single source of truth. When something here is replaced with real content, delete the entry.

---

## DEEP-5 — Resource taxonomy filters (WP convention)

**Where:** `ResourceGrid` (used by /blog, /news, /guide, /checklist, /event, /case-studies). Topic filter chips appear automatically above the year filter.

The chips are derived from each post's WordPress taxonomy terms (categories + tags + any custom CPT taxonomies) embedded with the post via the WP REST API's `_embed=1` parameter (already in `listResources`). Term names render as the chip labels; term slugs power the URL state (`?topic=field-notes,industry`).

For chips to appear on a given archive:

- The CPT must have categories, tags, or a custom taxonomy registered.
- Each taxonomy must have `show_in_rest=true` so terms surface in the API response.
- The dataset must contain ≥ 2 distinct topic names (single-option chip sets auto-hide — same pattern as the year filter).

The default WP "Uncategorized" category is silently excluded so it doesn't pollute the chip set.

REPLACE WITH: WP-side taxonomy hygiene — make sure each CPT has categories/tags assigned to its posts and that the taxonomies are REST-exposed. No code changes needed on the Next.js side.

---

## DEEP-3 — Career CPT custom fields (WP convention)

**Where:** `career` custom post type in WordPress. Cards render at `/career` via `CareerListings`; detail pages at `/career/[slug]`.

For each open-role post, register five custom meta fields (all `register_meta` with `show_in_rest=true` so they flow through the WP REST API):

- `department` (string) — "Engineering" / "Operations" / "Security" / "Growth" / "Design" / "People" / etc. Drives the department filter chips on /career; filters auto-hide when fewer than 2 distinct departments exist.
- `location` (string) — "Mississauga, ON" / "Dallas, TX" / "Belgrade" / "Bogotá" / "Remote". Renders as the second meta chip on the card.
- `employment_type` (string) — "Full-time" / "Part-time" / "Contract". Third meta chip.
- `experience_level` (string) — "Junior" / "Mid" / "Senior" / "Staff". Renders as a small filing line below the description: "LEVEL · SENIOR".
- `apply_url` (string) — full URL of the application form (Lever / Greenhouse / Workable / etc.). When present, the card CTA reads "Apply ↗" and routes to the external form in a new tab. When absent, the CTA reads "View role →" and routes to /career/[slug].

All five are optional. When WP hasn't surfaced any of them yet, the cards still render — the meta block collapses gracefully and the filter chips hide entirely.

REPLACE WITH: WP-side registration of the five meta fields. No code changes needed on the Next.js side once they exist.

---

## DEEP-2 — News post external attribution (WP convention)

**Where:** `news` custom post type in WordPress. Cards render at `/news`.

For news entries that ARE external publications (Supply Chain Dive, Inbound Logistics, Reuters etc.) covering Birdseye — not in-house news posts — register two custom fields on the post:

- `external_url` (string) — full URL of the article on the publication
- `publication` (string) — display name, e.g. "Supply Chain Dive"

Both must be exposed to the REST API (`register_meta` with `show_in_rest=true` on the `news` CPT). When both are set, the /news card automatically:

- Routes to the publication in a new tab (target="_blank" rel="noopener")
- Shows a subtle ↗ glyph next to the meta line
- Replaces "Read →" with "Read on {publication} ↗"

When either field is absent, the card behaves as a normal internal post linking to `/news/{slug}`.

REPLACE WITH: WP-side registration of the two meta fields. No code changes needed on the Next.js side once the fields exist.

---

## COMP-2 — Named-customer proof cards (home page)

**Where:** `components/site/CustomerProofCards.tsx` (to build)
**Format:** customer name · specific metric · year. Five cards in a 3+2 layout.

1. **Brimich Logistics · 87% drop in after-hours incidents · 2024**
   REPLACE WITH: real Brimich number + Amanda Humphrey's approval to attribute
2. **A national 3PL · zero cargo losses across 18 months · 2024**
   REPLACE WITH: named customer + real timeframe + real loss count
3. **CR England Terminal · 92% faster gate-event response · 2024**
   REPLACE WITH: real CR England number + permission to attribute
4. **A Tier-1 freight yard, Mississauga · 64% lower security spend · 2025**
   REPLACE WITH: named customer + real cost reduction
5. **Bison Transport · 12 nightly guard shifts replaced · 2024**
   REPLACE WITH: real Bison number + permission to attribute

---

## COMP-3 — Closing four-KPI bar (home page)

**Where:** `components/site/ClosingMetrics.tsx` (to build, sits between FAQ and final CTA)

1. **400+ facilities monitored** — REPLACE WITH: current real count
2. **87% avg theft reduction** — REPLACE WITH: real avg across customer base + methodology footnote
3. **<30s alert response time** — REPLACE WITH: real avg time-to-Voice-Down (or time-to-dispatch)
4. **99.9% uptime SLA** — REPLACE WITH: contractual SLA target

---

## #6 — Per-customer stats on LogoMarquee

**Where:** `components/site/LogoMarquee.tsx` — small mono-caps stat below or beside each logo

- Brimich · 87% fewer after-hours incidents
- CR England · 0 cargo losses, 18 months
- AWC · 12 guard shifts replaced
- Bison · monitored across 4 yards
- Remco · perimeter secured, day-1

REPLACE WITH: real per-customer stats Mike approves for public attribution.

---

## #7 — /case-studies real content

**Where:** WordPress posts at `/case-studies/[slug]`. Five placeholder narratives shipped so the archive doesn't render empty:

1. *How Brimich Logistics cut after-hours incidents by 87%*
2. *Replacing 12 nightly guard shifts at a Class-1 freight terminal*
3. *From 4 cargo losses a quarter to zero — a Tier-1 3PL story*
4. *How a Mississauga distribution hub saved $480k year-one*
5. *Voice-Down deters intrusion in real-time at a Dallas yard*

REPLACE WITH: real customer stories. Each needs situation → problem → install → results metrics → quote. The card layout, hero treatment, and meta line are all reusable — only the copy changes.

---

## #8 — /security disclosures page

**Where:** `app/security/page.tsx` (to build)

Placeholder content (real-sounding, deliberately conservative):

- **Encryption:** TLS 1.3 in transit, AES-256 at rest
- **Data residency:** Canadian-hosted infrastructure (Mississauga ops centre + Canadian cloud region)
- **Footage retention:** configurable 7–90 days, default 30
- **Access control:** SSO + MFA required, role-based access
- **SOC 2:** *Type II in progress* — **do not** claim certified until issued
- **Pen tests:** annually, results available under NDA
- **Vulnerability disclosure:** `security@birdseyesecurity.ca`
- **Subprocessor list:** published, updated quarterly

REPLACE WITH: each claim confirmed with Cole/Mike. Some are likely already true. **Never ship a false certification.**

---

## #9 — Founding year

**Locked: 2011.** Matches `app/about-us/page.tsx` line 119: *"Birdseye Security Solutions Inc., incorporated in Ontario, January 2011."* Search-and-replace any `2005` reference on the new site.

REPLACE WITH: nothing — confirmed unless Mike says otherwise.

---

## #10 — /video archive

**Where:** `app/video/page.tsx`

Ship the grid + lightbox + metadata schema with placeholder thumbnails sourced from existing operations photos in `/public/images/about` and `/public/images/operations`. Empty-state-with-CTA when WP returns 0 posts.

REPLACE WITH: real video posts in WP. Until then, the page reads complete.

---

## #54 — Brimich testimonial (Amanda Humphrey)

> "We replaced our overnight guard rotation with Birdseye and the after-hours incident rate dropped almost immediately. The Voice-Down moments are what convinced our drivers — when an unfamiliar vehicle pulls up at 2am and a real human voice greets it, the deterrent effect is night-and-day from cameras-only."
>
> — **Amanda Humphrey, Director of Operations, Brimich Logistics**

REPLACE WITH: real Amanda quote, approved for public attribution. Or a different Brimich exec if Amanda's not the right voice.

---

## LIVE-1 — Featured Partners (Partner Program page)

**Where:** `app/partner-program/page.tsx` → `FeaturedPartners` function.

Three anonymized placeholder cards shipped:

1. **TECHNOLOGY** · *A leading North American TMS platform* · Real-time gate-event sync into the TMS dispatch view · since 2024
2. **CHANNEL** · *A regional security integrator network* · Deployed Birdseye across 40+ logistics yards in 2024 · since 2023
3. **SERVICE** · *An implementation consultancy* · Certified GateCore + SafeCore deployment specialists · since 2024

REPLACE WITH: real partner names + logos as partnerships sign and permission to attribute publicly is confirmed. Same anonymization-integrity posture as CustomerProofCards on the home page.

## LIVE-1 — Partner program metric strip

`app/partner-program/page.tsx` → MetricStrip values:
- **30+** active partners across the network
- **60%** avg deal margin shared with channel partners
- **14 days** avg time from intro to first joint customer call
- **24/7** partner technical support escalation

REPLACE WITH: real partner-ops figures from Mike or whoever runs the partner program.

## DEEP-1 — Gated download assets

**Where:** `app/guide/page.tsx` and `app/checklist/page.tsx` `GatedResourceBand` calls.

Two placeholder PDF URLs shipped:
1. `/playbooks/operators-guide-modernizing-the-gate.pdf` — *The Operator's Guide to Modernizing the Gate* (40-pp playbook)
2. `/playbooks/cargo-theft-prevention-audit.pdf` — *The Cargo-Theft Prevention Audit* (30-point checklist)

REPLACE WITH: actual PDF assets uploaded to `/public/playbooks/`. Until then, the form opens a download link to a 404, but the lead-capture submission still works.

Also: the `LeadCaptureModal.handleSubmit` is a **client-state-only placeholder** — captures the email + name + company in React state and shows the success view, but doesn't POST anywhere. Mike: pick a service (Mailchimp, ConvertKit, Formspree, or a Next.js API route) and replace the placeholder block in `LeadCaptureModal.tsx` with a real `fetch()` call.

Same for `NewsletterStrip.handleSubmit` — same pattern, same swap.

## Image audit (2026-05-03) — what needs your eyes

A pass through `/public/figma-exports/` against where each image is bound. Three categories of finding:

### A. Industry hero photos — the biggest visual quality issue on the site

`/industries/{logistics,warehousing,manufacturing,supply-chain,automotive}` each render a full-bleed 21:9 hero photograph (`IndustryHeroPhoto` component). All five currently bind `frame*.png` files measuring **457×474 pixels**. These are Figma *card* exports, not hero photographs — being upscaled 4× to fill a widescreen hero. They'll read as visibly pixelated on any modern display.

**STATUS (2026-05-03):** five replacement photos curated from Unsplash. Cohesive industrial register, two aerials bookending the set so the brand metaphor (eye in the sky) reinforces itself. All five free for commercial use, no attribution required. **Install instructions and download links live in `/public/industry/README.md`.** When the five files are downloaded into that folder, swap the active `industryHero` block in `_design/images.ts` to the RECOMMENDED block immediately below it (already pre-written, just uncomment).

The five picks:

| Page | Photographer | Unsplash URL |
| --- | --- | --- |
| /industries/logistics | Alex Kalinin (@loaldesign) | https://unsplash.com/photos/a-row-of-semi-trucks-parked-in-a-parking-lot-G-WSX0ekpyk |
| /industries/warehousing | AFINIS Group | https://unsplash.com/photos/a-large-warehouse-filled-with-lots-of-pallets-OnbSOhz0oig |
| /industries/supply-chain | CHUTTERSNAP | https://unsplash.com/photos/aerial-photo-of-cargo-crates-fN603qcEA7g |
| /industries/manufacturing | MOS Design | https://unsplash.com/photos/a-large-industrial-plant-lit-up-at-night-1uvJa08dNfQ |
| /industries/automotive | Iain | https://unsplash.com/photos/aerial-view-of-a-parking-lot-with-many-cars-pmZnZwwn9dM |

**STATUS (2026-05-03 evening):** all 5 files installed in `/public/industry/`. Pages render the new photos. This row stands as the canonical photographer credits going forward.

REPLACE PRIORITY: highest. Five pages affected. Upgrade is a one-time, ~10-minute job (5 downloads + uncomment one block).

### B. Unused logos — added to LogoMarquee, need your visual verification

Found and wired up: **Mercedes-Benz** (white variant exists, confidently good), plus **Ford**, **Honda**, **GE Capital** (color logos — may not render well on dark band; remove if they look poor). Also still in the export pool but not added: `mercedes_logo.jpg` (color version, redundant with the white).

REPLACE WITH: verify each renders well white-on-dark. Remove any that don't, or supply a white-variant version for the ones that need it. Stats are placeholder per the existing #6 convention.

### C. Aspect-ratio mismatches

- `screensh66ot20251125at4.11.47-pm1.png` is **2880×328** (8.78:1 ultra-wide banner) but was being bound to YardCore `safetyOversight` which renders 4:3 — the image was getting cropped to a tiny center slice. Swapped binding to `screensho56t202561125at3.40.51-pm1.png` (1040×896, was unused). The ultra-wide original is still in the folder and would be perfect for a true banner slot if one ever appears.

### D. Unused large images worth identifying

These three sit in `/public/figma-exports/` with no binding anywhere. Worth knowing what they are so we can use them rather than commission new:

- `rectangle65210.png` — **1934×1236** (1.4MB), the largest single landscape image in the pool. Completely unused. What's in it?
- `screens4564hot20251125at2.41.05-pm1.png` — 1148×982 (932KB). Unused.
- `screenshot2025111225at3.33.02-pm1.png` — 984×948 (1.3MB). Unused.

REPLACE WITH: nothing — these may be the right images for spots currently using lower-res ones. Walk through them visually and tell me if any of these should swap into a current binding.

### E. yard-before.jpg in /public

`/public/yard-before.jpg` exists. Is there a `yard-after.jpg` too? Implied before/after pair would be a strong set piece.

## #6 — Per-customer stats on LogoMarquee (cursor HUD)

**Where:** `_design/images.ts` `logos` array — each logo carries a `stat` field that surfaces in the cursor HUD via `data-cursor-caption` on hover.

Placeholder stats shipped:
- Bison Transport · 12 NIGHTLY GUARD SHIFTS REPLACED · 2024
- C.R. England · 92% FASTER GATE-EVENT RESPONSE · 2024
- AWC · AUTOMATED ENTRY ACROSS MULTIPLE YARDS · 2024
- Remco · PERIMETER SECURED, DAY-1 OPERATIONAL · 2023

REPLACE WITH: real per-customer numbers Mike approves for public attribution. Format is mono-caps `STAT · YEAR`, ~5 words.

## #22 + #26 — LogoMarquee additional logos

Currently shipped: Bison, CR England, AWC, Remco (4 real logos). Mark the marquee visually as "…and 400+ more" so the row reads as a sample of the network, not its universe.

REPLACE WITH: 4–6 additional clean white SVG/PNG logos with permission to display. Priority adds: Brimich (already named in testimonial), plus any recognized 3PL / distribution customer.
