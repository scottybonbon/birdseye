# Light/dark register audit — home page

CRAFT-8: per-section register inventory of the home page, rhythm analysis, and recommendations.

The-one-rule.md Section 8 says light/dark alternation is deliberate, that the rhythm carries narrative meaning, and that long stretches of one register read as confident while banding (alternating every section) reads as nervous. This file checks the actual rhythm of the home page after the 2026-05-03 prune + additions.

---

## Current rhythm

| # | Section | Register | Narrative role |
| - | --- | --- | --- |
| 01 | Hero | DARK | PROMISE |
| 02 | LogoMarquee | DARK (band) | TRUST |
| 03 | ThreeCores | DARK | SYSTEM (product) |
| 04 | MaxTelepresence | DARK | SYSTEM (method) |
| 05 | GateEventTimeline | DARK | SYSTEM (one event) |
| 06 | ConnectedFlow | DARK | SYSTEM (every feature) |
| 07 | UseCaseGrid | DARK | SELF-QUALIFY |
| 08 | Stats | DARK | PROOF (volume) |
| 09 | Impact | DARK | PROOF (transformation) |
| 10 | CargoTheft | DARK | PROOF (named threat) |
| 11 | CustomerProofCards | DARK | PROOF (named outcomes) |
| 12 | VersusGuards | **LIGHT** | CONSIDERATION (cost story) |
| 13 | RoiInline | **LIGHT** | CONSIDERATION (calculator) |
| 14 | Testimonials | **LIGHT** | CONSIDERATION (operator voices) |
| 15 | Security | DARK | TRUST (IT layer) |
| 16 | BuiltForReal | **LIGHT** | DEPTH (Anthropic-tier breather) |
| 17 | SupplyChain | **LIGHT** | DEPTH (industry verticals) |
| 18 | Implementation | **LIGHT** | DEPLOYMENT (14-day timeline) |
| 19 | HomeFaq | DARK | CLOSE (rational) |
| 20 | Certainty | DARK | CLOSE (manifesto) |
| 21 | ClosingMetrics | DARK | CLOSE (numerical) |
| 22 | FooterStack | DARK | ACTION (CTA + footer) |

## Cluster pattern

```
DARK × 11 → LIGHT × 3 → DARK × 1 → LIGHT × 3 → DARK × 4
opening      consider     security    depth        close
```

## Read

The rhythm is **defensible** and probably healthy. Each register-cluster has a clear narrative job:

- **DARK × 11 (opening)** — full system pitch, gravitas, operational seriousness. Long, but every section in this block is high-craft and earns its place. The user is being shown the system, not asked to make a decision yet.
- **LIGHT × 3 (consideration)** — pivot moment. Buyer's headspace shifts from "look at this system" to "what's this cost / how do operators feel about it." LIGHT register signals lower stakes — the user is comparing, not absorbing.
- **DARK × 1 (security)** — Security is intentionally DARK. IT/procurement reviewers expect a serious tone here, and DARK matches the gravitas of encryption/compliance commitments. The lone DARK between two LIGHT clusters reads as "here's the locked-down part" — a deliberate punch, not a rhythm break.
- **LIGHT × 3 (depth/deployment)** — buyer keeps comparing. BuiltForReal is the Anthropic-tier set piece breath; SupplyChain self-qualifies by industry; Implementation makes deployment concrete.
- **DARK × 4 (close)** — return to gravitas for the rational/emotional/numerical/action close.

## What's working

1. **The DARK-LIGHT-DARK-LIGHT-DARK macrostructure** maps cleanly to the buyer journey: see the system → consider → trust check → consider deeper → commit. Industry-standard for B2B SaaS but executed with editorial discipline rather than blunt alternation.
2. **The lone DARK Security** is the most rhythmically interesting move — by sitting alone between LIGHT clusters, it pulls the eye and gets disproportionate attention. Good for the IT/procurement-review reader who needs that section to feel weighty.
3. **The 11-section DARK opening** is intentionally long. The depth signals confidence — Birdseye doesn't pivot to consideration until the system is fully shown. Cutting this would be the wrong instinct.
4. **The 4-section DARK close** is a deliberate ladder: rational (FAQ) → emotional (Certainty) → numerical (ClosingMetrics) → action (FooterStack). Each beat has a different lobe-of-the-brain target.

## Edge cases / minor concerns

1. **The LIGHT-DARK-LIGHT pivot at Security** is the riskiest moment. If the page reads as choppy here, Security is the suspect. A future review should A/B against placing Security at the very end of the LIGHT cluster (DARK-only at the close) to see if that flows better. Current placement IS defensible because security is its own narrative beat, but it's the move worth re-examining if a rhythm complaint surfaces.

2. **UseCaseGrid in the DARK opening** — UseCaseGrid is operational-outcomes-focused, which is buyer-facing language. It could plausibly live in the LIGHT cluster as a self-qualify moment between VersusGuards and RoiInline. The current DARK placement keeps it as a bridge between SYSTEM and PROOF, which is also defensible. Don't flip it without testing.

3. **No LIGHT moment in the 11-section DARK opening** — the page does not have a "breath" between Hero and VersusGuards (12 sections in). For most visitors this is fine; for slow-readers it might feel relentless. The breathability is in the per-section motion (entrance fades, hairline rules, generous padding) rather than register pivots. Watch for engagement drop-off in the System block — if it's an issue, UseCaseGrid (#07) is the most defensible LIGHT pivot.

## Other pages — quick rhythm check

- `/about-us` — DARK throughout. Editorial gravitas; matches the Mission/Team/Practice register.
- `/maximum-telepresence` — DARK throughout. The methodology is the gravitas register by definition.
- `/voice-down` — DARK throughout. Same.
- `/partner-program` — DARK throughout. Network-and-relationship document; consistent register.
- `/glossary` — DARK throughout. Reference register.
- `/platform/{gatecore, safecore, yardcore}` — DARK throughout (modulo a hint of LIGHT in the MediaSpread). These pages are technical product pages; DARK matches the seriousness.

The home page is the only surface where light/dark rhythm carries narrative weight. Subpages stay register-consistent on purpose — they have one job, not multiple.

## Recommendation

**No changes to the home page rhythm.** The current cluster pattern is healthy, narratively coherent, and visually distinct enough that the buyer journey reads as deliberate. Re-examine only if user-facing engagement data surfaces a rhythm complaint, in which case the prime suspects (in order) are: lone Security DARK between LIGHT clusters, then UseCaseGrid placement.

The set-piece audit (`set-piece-audit.md`) is the live document that protects sections from prune. This audit is the live document that protects the rhythm from drift.
