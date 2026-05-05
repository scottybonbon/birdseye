# Industry hero photographs

This folder is the install target for the five `/industries/*` page hero
photographs. Curated 2026-05-03 from Unsplash. All five photos chosen
for thematic cohesion (cinematic, ambient, real-feeling, never stock-
cliche). Two aerials bookend the set so the brand metaphor (eye in the
sky) reinforces itself across the section.

## Install instructions

For each photo below:

1. Open the Unsplash page in a browser
2. Click the **Download** button (top-right)
3. Choose **Original** size (or 2400 px wide if smaller is offered)
4. Save to this folder with the exact filename listed

When all five are in place, the `industryHero` map in
`_design/images.ts` already points here — no code change required
beyond uncommenting the new bindings (clearly marked in the file).

## The five

### `logistics.jpg`

- **Source:** https://unsplash.com/photos/a-row-of-semi-trucks-parked-in-a-parking-lot-G-WSX0ekpyk
- **Photographer:** Alex Kalinin (@loaldesign)
- **Why it fits:** Scotty's pick — a row of staged semi-trucks
  parked at a freight lot. Captured on iPhone 15 Pro, August 2024.
  Final selection after walking three candidates (the earlier Tom
  Jackson and Marcin Jozwiak picks were considered; this one landed
  closest to the brand register).

### `warehousing.jpg`

- **Source:** https://unsplash.com/photos/a-large-warehouse-filled-with-lots-of-pallets-OnbSOhz0oig
- **Photographer:** AFINIS Group
- **Why it fits:** Big distribution-facility scale, high-bay racks
  filled with pallets. The Amazon-fulfillment-center register the
  brand audience operates in, not a small mom-and-pop back-room
  warehouse. The vanishing-point composition gives the shot real
  visual depth at hero scale. (Updated 2026-05-03 from the earlier
  long-aisle pick — that one read as a smaller facility than the
  Tier-1 3PL / OEM DC operators the brand actually serves.)

### `supply-chain.jpg`

- **Source:** https://unsplash.com/photos/aerial-photo-of-cargo-crates-fN603qcEA7g
- **Photographer:** CHUTTERSNAP (@chuttersnap)
- **Why it fits:** Drone shot of an intermodal container yard.
  CHUTTERSNAP is the gold standard for industrial aerial work on
  Unsplash — 5,000+ photos, all in a coherent register. This photo
  IS the bird's-eye metaphor and matches the LiveOpsMap visual
  vocabulary on the home page.

### `manufacturing.jpg`

- **Source:** https://unsplash.com/photos/a-large-industrial-plant-lit-up-at-night-1uvJa08dNfQ
- **Photographer:** see Unsplash page (Kawasaki industrial complex)
- **Why it fits:** A massive industrial plant lit up at night. Reads
  as cinematic and serious — exactly the register a manufacturing
  buyer (Tier-1, OEM, automotive supplier) recognizes as their own
  facility. Night lighting is rare in industrial stock photography
  and immediately differentiates from the pack.

### `automotive.jpg`

- **Source:** https://unsplash.com/photos/aerial-view-of-a-parking-lot-with-many-cars-pmZnZwwn9dM
- **Photographer:** see Unsplash page
- **Why it fits:** Aerial drone shot of a vehicle storage compound.
  Pairs with the supply-chain aerial as a visual rhyme (two birds-
  eye shots in the section, reinforcing the brand metaphor). Reads
  as "OEM compound at the port" rather than "rental car lot."

## Style cohesion across the five

| Page | Perspective | Light | Subject |
| --- | --- | --- | --- |
| Logistics | Ground level | Daylight, cinematic | Trucks staged |
| Warehousing | Interior, wide | Mixed industrial | Aisle perspective |
| Supply chain | Aerial drone | Daylight | Container yard |
| Manufacturing | Ground, exterior | Night, lit | Plant complex |
| Automotive | Aerial drone | Daylight | Vehicle compound |

The mix (2 aerial + 1 interior + 2 exterior; 1 night + 4 day) gives
the section visual variety while the cinematic register keeps it
cohesive. All five are camera-only (no graphic overlays, no people in
hi-vis pointing at clipboards, no green circuit-board composites).

## License + attribution

All Unsplash photos are free for commercial use, no attribution
required. We document photographer credits here as good practice and
because the editorial register the site is in deserves it.

## Status (2026-05-03)

The `industryHero` map in `_design/images.ts` is **ALREADY POINTING AT
THESE FIVE FILES.** Once the five JPEGs are downloaded into this
folder with the exact filenames above, the industry pages will render
the new photos automatically — no further code change needed.

Until the files land, the five `/industries/*` page hero slots will
404 their image (Next.js Image renders alt text + a placeholder).
The rest of each page renders fine — only the full-bleed photograph
between PageHero and the intro narrative is affected.

If a quick revert is needed (e.g. rolling back before the photos
arrive), open `_design/images.ts`, comment out the active
`industryHero:` block, and uncomment the **LEGACY INDUSTRY HERO
BINDINGS** block immediately below — that re-points the slot at the
original `frame*.png` placeholders (low-res but functional).
