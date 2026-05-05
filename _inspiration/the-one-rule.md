# The One Rule

Or: the discipline behind every page on birdseyesecurity.ca.

If a single line had to summarize the whole project: **build it like a magazine that happens to sell software.** Editorial first, marketing second. Operators talking to operators, not vendors talking at buyers.

Everything below is a refinement of that one rule.

---

## 1. Register: editorial, not marketing

Every page reads like a filed document, not a brochure. The pattern language is **archive footage with a caption underneath**, not stock photography with a tagline. This shows up everywhere:

- Filing labels on photos (`ARCHIVE · GATECORE DETECTION · 2024`)
- Mono-caps eyebrows that read like a section number (`LAYER 01 · DETECT`)
- Citation footnotes on metric strips (`[01] Internal platform telemetry, Q1 2026.`)
- Filing strips at the top of major sections (`CARGO THEFT · 2024 — SOURCE · CARGONET · 2024 ANNUAL REPORT`)

The job of the filing register is to signal: **we capture this footage. We cite our claims. We file our records.** That posture is what separates Birdseye from companies that buy stock photos and call it a day.

If a section feels too marketing-y, the fix is usually to add a filing label or a footnote.

---

## 2. Typography: three voices, three jobs

The site has three fonts. Each one carries a specific kind of speech:

| Font | Voice | Used for |
| --- | --- | --- |
| **Inter (sans)** | Company speech | Headlines, body, CTAs, the operator-facing voice |
| **IBM Plex Mono** | System speech | Filing labels, eyebrows, timestamps, footnotes |
| **Instrument Serif (italic only)** | Editorial accent | One italic word per H1 — the load-bearing accent |

**One italic per H1, ever.** The italic-serif word is the load-bearing emphasis — it carries the meaning, the tension, the brand cue. If two italics show up in one headline, the page reads as ornamental and the magic of the single accent gets diluted.

Examples that work:
- *Smarter yards. Safer business. Zero guesswork.* (italic on "Safer business")
- *AI sees the event before **anyone** else does.* (italic on "anyone" — the load-bearing word)
- *Six lines that don't appear on **anyone else's** site.* (italic on "anyone else's")

Examples that don't work:
- *AI sees **every** event, **every** moment, **every** place.* (three italics — meaning collapses)
- *Built for the **future** of yards.* (italic on "future" — vague, decorative, not load-bearing)

---

## 3. Headline rhythm: three-beat declarative

Three beats, parallel structure, escalating to a payoff. Adjective+noun trios are the cleanest form (Flock pattern):

- *Smarter yards. Safer business. Zero guesswork.*
- *Build with us. Sell with us. Show up with us.*
- *Cameras see. Sirens scare. People talk.*
- *Detect every event. Verify every alert. Document every record.*

When a three-beat won't fit naturally, two-beat works (*AI catches it. A live agent decides. The system writes it down.* is two-beat-then-coda — also fine). Avoid one-beat compound headlines that try to say everything in one breath.

The third beat carries the punctuation. Make it land.

---

## 4. Voice: operators talking to operators

Every line should sound like a senior yard ops director said it out loud. If a sentence reads like a B2B SaaS landing page, rewrite it.

**Replace:**
- *aspirational* phrasing → *operational* phrasing
- *"transforms"* → *"runs"*
- *"streamlines"* → cut it entirely
- *"discover the future of"* → cut it entirely
- *"unlock"* → cut it entirely
- *"AI-powered"* (commodity) → *"agentic"* / *"operator-augmented"* / *"trained operators + AI"*

**Keep:**
- Specific operational nouns (gate, yard, dock, perimeter, BOL, seal, plate)
- Real industry shorthand (3PL, hazmat, DOT, dwell time, spotter)
- Direct claims with footnoted numbers
- Caveats that cite themselves (*"placeholder — confirm with Mike before launch"*)

The goal isn't to be terse for its own sake. It's to sound like the kind of person yard ops directors actually trust.

---

## 5. Set pieces are protected

Every page has at least one **set piece** — a moment that earns the page's existence. Set pieces are deliberate, expensive to build, and impossible to dilute.

Current set pieces:
- **Hero** — slow upward pan over a yard at dusk, three-line manifesto, per-letter text-shadow
- **Three Cores** — synchronized triptych that animates the platform schematic
- **Maximum Telepresence triptych** — three real-footage video panes playing one event end-to-end
- **Gate Event Timeline** — scrubbable 7-step interactive
- **Cargo Theft band** — $35B stat with CargoNet citation
- **The /maximum-telepresence and /voice-down explainer pages** — full editorial set-piece pages

**Set pieces don't get edited away.** When the page-prune conversation comes up, the set piece is what survives; the four feature-grid sections around it are what gets cut. If a section isn't a set piece and isn't load-bearing for narrative, it's a candidate for removal.

---

## 6. Anonymization is a feature

When we have permission to attribute (Brimich, C.R. England, Bison), we attribute named in sans bold.

When we don't yet have permission (a national 3PL, a Tier-1 freight yard), we anonymize in italic-serif dim. The typography signals the permission status to the reader.

The `intro` line on these sections **tells visitors up front that some are named and some aren't.** That posture *adds* credibility — buyers know the convention; lying-by-implication is what kills trust.

Same posture on certifications: "SOC 2 Type II · In progress" beats "SOC 2 Type II" if we're not yet certified. Asymmetric risk.

---

## 7. Numbers cite themselves

Every metric strip has a `note` field. Every note ends up in the **Sources** section below the grid, numbered `[01]`, `[02]`, etc.

This is the *paper-not-brochure* detail. Marketing numbers don't cite themselves. Real numbers do. If we publish a metric and don't have a methodology note for it, the metric doesn't ship.

When a number is placeholder, the note says so explicitly: *"Placeholder — confirm with Mike before launch."* No hidden placeholders, ever.

---

## 8. Light/dark register matters

The site alternates light and dark sections deliberately. Roughly:

- Hero, system, proof → DARK (gravitas, the system at work)
- Versus, ROI, testimonials, industries, deployment → LIGHT (consideration, the buyer's view)
- Close → DARK (manifesto + numerical close + CTA)

When in doubt, the rhythm is dark → dark → dark → LIGHT → LIGHT → LIGHT → DARK. Don't break the rhythm without a reason — banding (alternating every section) reads as nervous; long stretches of one register reads as confident.

---

## 9. Motion is a system, not decoration

Motion follows three rules:

1. **Entrances** — initial fade + 12-16px upward shift, duration `DUR.smooth` (≈0.45s), easing `EASE_OUT`. Stagger by 50-100ms between siblings.
2. **Hovers** — 150ms transitions, `active:scale-[0.98]` on press, focus rings on every interactive.
3. **Loops** — only on set pieces, only when they're load-bearing for the moment (e.g., the Hero camera pan, the Three Cores pulse), and always pausable under `prefers-reduced-motion`.

If motion isn't doing one of those three jobs, it's decoration. Cut it.

---

## 10. Filing labels go everywhere

Every photograph carries a `data-cursor-caption` (the surveillance HUD reads it on hover). Every section has an eyebrow. Every metric has a number-mark. Every page has an `issue` and `category` on the masthead.

This is what makes the site read as **a system labeling its own work** rather than a marketing site labeling itself. The filing labels aren't decoration — they're the discipline that makes the editorial register hold up under scrutiny.

When you're building a new section, the question is: *what's the filing label?* If you can't write one in twenty seconds, the section probably doesn't have a clear job.

---

## The shorthand version

If you only remember one sentence: **build it like a magazine that happens to sell software.**

Editorial first, marketing second. Operators talking to operators. Filing labels everywhere. One italic per H1. Real numbers cite themselves. Anonymized where we don't have permission. Motion does work or gets cut. Set pieces don't get edited away.

That's the whole rule.
