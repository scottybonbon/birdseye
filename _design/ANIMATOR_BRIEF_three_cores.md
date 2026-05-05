# Animator brief — Three Cores schematic
**For: Birdseye website / Home page / "One platform. Three intelligent cores." section**
**Authored: May 2026 · Cowork session**
**Owner (sign-off): Scotty Boniface**

---

## Project context

Birdseye is rebuilding its website ([birdseyesecurity.com](https://birdseyesecurity.com) → new Next.js build) for a 2026 relaunch. The brand is the **Yard Operating System (YOS)**, an AI + live-agent platform that runs gates, perimeters, and yards for logistics, manufacturing, and automotive operations.

The home page has a section called **"One platform. Three intelligent cores."** — the meet-the-product moment for **GateCore**, **SafeCore**, and **YardCore**. Today it ships with a placeholder schematic (a 16:9 widescreen animation of one of the cores) sitting beside three interactive cards. The cards already drive the animation: hover or click a card and the schematic switches to that core. **The placeholder works as a proof-of-concept; we're commissioning the real asset to fill the slot.**

The viewer's brain needs to do *no work* to map cards → animation regions. That's the whole reason we picked this layout.

---

## What we're commissioning

A single, looping schematic animation that lives in a **portrait container on the left of the section**, with **three vertically-stacked cards on the right** driving its active state.

**One file.** Not three. One unified composition that contains three regions, with a focal "live" state that travels between them.

---

## Specs

| Property | Value |
| --- | --- |
| Aspect ratio | **Portrait, ~9:16** (very approximately — match the height of three stacked cards on a 1200px-wide page) |
| Target dimensions | ~525px × ~920px (desktop, retina-ready 2× = 1050 × 1840) |
| Live container width on site | grows with viewport, but always ~62% of `max-w-site` (1200px container) at desktop |
| File format (preferred) | **Lottie** (vector, scriptable, lightweight, can be tinted via CSS) |
| File format (fallback) | WebM (vp9) + MP4 (h.264) at 60fps, transparent background if possible (alpha) |
| Duration of full loop | **15–18 seconds** (3 regions × ~5s of "live" attention each + transitions) |
| Background | Match site `bg-birdseye-navy` (#0F1C2E) or transparent |
| Reduced-motion fallback | A still poster frame at the "neutral" state (no region active). The site already swaps to this under `prefers-reduced-motion`. |

---

## Composition — one unified yard, three focus regions

Not three animations cut together. **One continuous architectural vista** of a yard, viewed from above (slight 3/4 isometric is fine if it helps), with three regions stacked vertically:

### Top third → **GateCore**
The gate plaza. A truck approaches from the bottom-left and stops at the boom gate. The system:

1. Reads license plate (small mono-caps callout: `LP · ABC-1234`).
2. Verifies driver ID (an `ID-Verify™` pulse on the cab).
3. Scans the trailer seal (a `SEAL · OK` callout on the trailer rear).
4. Captures the BOL (a small `BOL · MATCHED` callout).
5. Boom gate raises. Truck routes forward into the yard.

Subject: gate, truck arriving from outside, automated decision.

### Middle third → **SafeCore**
The perimeter and fence line of the yard. The system:

1. Camera cones project from camera positions along the fence (subtle).
2. A figure (or vehicle) moves into a camera cone after-hours.
3. The detection triggers — a soft electric pulse + small mono-caps `MOTION · ZONE 4` callout.
4. A Voice-Down™ arc visually projects from a mounted speaker toward the figure.
5. Figure retreats. The alert resolves to a `RESOLVED · 03:14:31` mono-caps callout.

Subject: fence, perimeter, after-hours, intervention.

### Bottom third → **YardCore**
The trailer rows of the yard. The system:

1. Trailers in a parking grid, some labeled (`B-04`, `C-09`).
2. A spotter truck moves a trailer from one spot to another.
3. A subtle compliance heatmap pulses across the lot (green = clear, amber = aging, red = exception).
4. A trailer ages out (turns amber) and a small `DWELL · 04:12:00` mono-caps callout appears.
5. Inspection route highlights briefly along a row.

Subject: trailers, dwell, parking, inspections.

**The three regions sit in a single continuous yard.** A reader who lets their eye drift down the animation sees: gate at the top → fence line in the middle → trailer rows at the bottom. It reads as **one place**, not three places.

---

## Behavior — focal "live" state

The animation has **three "active" states**, one per region. The site flips between them based on which card the user is hovering or clicking on the right.

**When a region is active** (driven by the parent React state, the asset just needs to *expose* per-region animation segments — see "Lottie segments" below):

- That region brightens. Camera cones get more saturated. Mono callouts fade in. Focal pulse cycles. Subject motion plays.
- The other two regions fade to a *quiet* state. Still visible. Still recognizable. Just dim — say 35% opacity, no callouts, no pulse, no motion. They're context, not content.
- Smooth transition between active states, **~400ms cross-fade** between regions (no hard cuts, no slide).

**Auto-cycle (default):** if the user doesn't interact, the animation cycles top → middle → bottom → top, with each region getting ~5s of focused attention.

**Manual override:** if the user clicks a card, the auto-cycle restarts from that region. (Already handled on the React side; the animator just needs to expose per-region segments.)

### Lottie segments (preferred technical packaging)

Three named segments, each ~5s long, plus quiet "dim" states for the other two regions during each segment:

- `gate-active` (frames 0–149) — top region live, middle + bottom dim
- `safe-active` (frames 150–299) — middle region live, top + bottom dim
- `yard-active` (frames 300–449) — bottom region live, top + middle dim

We'll wire these segments via Lottie's playback API. The brand transition between them is handled in code with a 400ms cross-fade.

---

## Visual style

### Brand palette (use these hex values exactly)

| Role | Hex | Usage |
| --- | --- | --- |
| Navy | `#0F1C2E` | Background field |
| Cream | `#F4EDE4` | Primary linework, neutral text |
| Electric | `#2E4BFF` | The "active" accent — focal pulse, active region highlights, mono callouts when a region is live |
| Success | `#4ADE80` | Resolved / OK / verified state markers |
| Cream / 30% opacity | `rgba(244,237,228,0.30)` | The "dim" state for inactive regions |

The palette is a **four-token system used SPARINGLY**. Cream carries 90% of the linework. Electric is reserved for "this is the live thing." Success is the smallest accent — only on resolved markers.

### Typography (for any baked-in callouts)

Use **IBM Plex Mono** (Google Fonts, Regular weight, ~10px equivalent in the final asset) for all the small mono-caps callouts (`SEAL · OK`, `LP · ABC-1234`, `RESOLVED · 03:14:31`, etc.). UPPERCASE, ~0.22em letter-spacing. Treat them as architectural-drawing labels, not motion-graphics text.

If callouts can be **outside the asset** (rendered in HTML/CSS over the animation), even better. We can typeset them in the actual brand font + size and position them precisely. But baked-in is fine if it makes your life easier.

### Drawing register

**Schematic / architectural drawing**, not photographic. Think:

- An architect's site plan, but with subtle motion.
- Linework over filled regions. Hairlines, not heavy strokes.
- Geometric, not literal — a truck is a top-down geometric truck, not a Photoshop render.
- Plenty of negative space. Restraint everywhere.
- **No "tech-y" garbage**: no glitchy scan lines, no fake terminal grids, no glowing hexagons, no "AI brain" iconography. The brand is *quiet*, not cyberpunk.

### Reference points

We've included three places to look:

1. **Our current `PlatformAnimation` placeholder** (`components/site/PlatformAnimation.tsx` in the codebase) — the *vocabulary* we want to keep. Same color palette, same architectural-drawing register, same subtle pulse on the focal element. The asset we're commissioning replaces it but preserves its tone.
2. **[Linear](https://linear.app)** — look at how their marketing animations on the home page move. Quiet, deliberate, restrained. No motion for motion's sake.
3. **[Apple product pages](https://www.apple.com/macbook-pro/)** — for the schematic-with-callouts vocabulary. The way they reveal a chip diagram or sensor layout: slow, focal, technical, beautiful.
4. **[Stripe Atlas](https://stripe.com/atlas)** — for the editorial calmness. We want the animation to feel like an explanation, not a sales pitch.

**Anti-references** (please don't do this):
- Salesforce / Snowflake-style 3D product animations
- Crypto-y particle effects
- Kinetic typography / wipes / glitch
- Neon / synthwave color palettes
- Anything that "feels like AI is happening"

---

## Tone notes

The brand has been deliberately repositioned this year toward **reserved, quiet, confident, polished, professional**. Customer-at-ease, not buyer-impressed. Restraint is the whole game.

When in doubt, **less**. A pulse is a single eased opacity cycle, not three layered glows. A camera cone is a single soft-edged triangle, not a particle system. A truck arrives, the gate opens, the truck moves. No swooshes, no whips, no impacts. The yard is calm. The system catches the event. The system handles it. That's the feel.

If you find yourself adding something flashy, ask: would Apple add this to a product diagram? If no, take it out.

---

## Deliverables

1. **The Lottie file** (preferred), or WebM + MP4 fallback pair.
2. **A static poster frame** (PNG, transparent background, exact target dimensions) showing the "neutral" state — no region active. This is the reduce-motion fallback.
3. **Source files** (After Effects + Lottie export, or your tool of choice). We'll keep them in our `/public/animations/` source folder so we can iterate later.
4. **A short walkthrough video** (Loom or similar, 2–3 min) of the animation playing through one full cycle, with you narrating what's happening in each region. This helps us QA against intent.

---

## Where it ships

Once delivered, the asset will:

- Drop into `/public/animations/three-cores.json` (Lottie) or `/public/animations/three-cores.webm` + `.mp4` (video).
- Be referenced by `components/site/PlatformAnimation.tsx`, replacing the current placeholder SVG scenes.
- Auto-load on the home page in the "One platform. Three intelligent cores." section.

The `<PlatformAnimation>` component will:
- Mount your Lottie / video in a portrait container that matches the height of the right-column card stack.
- Listen for the React `active` state (0, 1, 2 = gate, safe, yard) and call the matching segment in your animation.
- Cross-fade the transitions in CSS.

You don't need to write any code. We handle the wiring.

---

## Timeline

We'd love a first cut **within 3 weeks** of brief acceptance. Round-trips after that should be quick (one or two rounds of revision based on how it lands in-page). Final delivery in 4–5 weeks total.

If you can't hit that timeline, tell us what you can and we'll adjust.

---

## Budget

Open. Send us your day rate or project quote with the proposal. We'd rather pay for the right person than scrimp.

---

## Single-source brief lives at

`/_design/ANIMATOR_BRIEF_three_cores.md` in the codebase.

When this goes out to the animator, please include:

1. This file.
2. A current screenshot of the section in-page (so they see what they're filling).
3. Hex values + font names extracted into a one-page brand snapshot if needed.
4. Scotty's email + phone for direct questions.

---

## Sign-off

| Role | Name | Date |
| --- | --- | --- |
| Brief author | Birdseye website team | 2026-05 |
| Brand owner | **Scotty Boniface** | _pending_ |
| Animator | _to be assigned_ | _pending_ |
