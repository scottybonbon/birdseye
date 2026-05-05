/**
 * Asset map, Figma exports identified visually and bound to components.
 * Filenames in /public/figma-exports/ are auto-generated from the Figma export
 * tool, so we centralize the mapping here. Renaming the files later only
 * requires touching this one file.
 */

const BASE = "/figma-exports";

export const images = {
  // ConnectedFlow card, default fallback (used while videos preload)
  connectedFlowDefault: `${BASE}/564frame1410121031.png`,
  // Per-feature VIDEOS for ConnectedFlow (8 features). Served from the
  // same-origin proxy at /api/cf-video/[slug] so the browser doesn't get
  // tripped up by WordPress's Cross-Origin-Resource-Policy header. Upstream
  // sources are listed in app/api/cf-video/[slug]/route.ts, to swap a clip,
  // edit that file. To self-host, point each entry at /videos/<file>.webm.
  connectedFlow: {
    monitoring: "/api/cf-video/monitoring",
    gatecore: "/api/cf-video/gatecore",
    "id-verify": "/api/cf-video/id-verify",
    "bills-of-lading": "/api/cf-video/bills-of-lading",
    "seal-verification": "/api/cf-video/seal-verification",
    "faster-gate": "/api/cf-video/faster-gate",
    "voice-down": "/api/cf-video/voice-down",
    "compliance-reporting": "/api/cf-video/compliance-reporting",
  } as Record<string, string>,

  // Three Intelligent Cores, feature overview images (hero cards)
  // NB: semantic duplication is INTENTIONAL. cores.* are used for the
  // feature cards in the platform grid; gateCore/safeCore/yardCore.* below
  // are used for MediaSpread detail pages. Some bindings resolve to the
  // same file (e.g., cores.GateCore === gateCore.smartRecognition) because
  // the visual asset serves both contexts. This reduces asset count without
  // duplicating files; components decide context-appropriately.
  cores: {
    // 2026-05-04: replaced Figma-export placeholders with the labeled
    // hand-curated 3-up grid images Scotty dropped in the project root
    // (Platform-page-3-up-grid-{GATECORE,SAFECORE,YARDCORE}.png →
    // gatecore_3up / safecore_3up / yardcore_3up). These are the
    // intended, in-brand assets for the /platform 3-up cards.
    GateCore: `${BASE}/gatecore_3up.png`,                         // platform 3-up — GateCore
    SafeCore: `${BASE}/safecore_3up.png`,                         // platform 3-up — SafeCore
    YardCore: `${BASE}/yardcore_3up.png`,                         // platform 3-up — YardCore
  } as Record<string, string>,

  // Per-platform-page MediaSpread photos. Each module page renders three
  // alternating image+copy spreads under its FeatureGrid. Mapped from
  // /public/figma-exports/ best-guess by filename + Figma section context;
  // swap any time without touching page components, they read from these
  // bindings via the `images` object.
  gateCore: {
    // 2026-05-04: bound to the three labeled GateCore MediaSpread images
    // Scotty dropped in the project root, named to match the eyebrow on
    // each spread (DETECTION → smart recognition; AUTOMATION → runs
    // itself; THROUGHPUT → more throughput, less overhead). Replaces
    // the Figma-export placeholders.
    smartRecognition: `${BASE}/gatecore_detection.png`,                    // DETECTION — smart recognition
    runsItself: `${BASE}/gatecore_automation.png`,                         // AUTOMATION — gate that runs itself
    throughput: `${BASE}/gatecore_throughput.png`,                         // THROUGHPUT — more throughput, less overhead
  },
  safeCore: {
    intervention: `${BASE}/screenshot202434.png`,                          // alert / detection UI
    anomalyDetection: `${BASE}/screensho656t20251201at2.03.43-pm1.png`,    // face detection close-up
    // 2026-05-04: bound to the labeled SafeCore thermal image Scotty
    // dropped in the project root (safecore page-thermal image.png →
    // safecore_thermal.png).
    thermalDetection: `${BASE}/safecore_thermal.png`,                      // THERMAL DETECTION — heat-signature spread
  },
  yardCore: {
    // 2026-05-03 image audit: safetyOversight was binding a 2880×328
    // ultra-wide banner (8.78:1) into a 4:3 MediaSpread slot — being
    // cropped to a tiny center slice. Swapped to a more aspect-
    // appropriate yard scene from the unused pool. The original ultra-
    // wide image is preserved in /figma-exports for use as a true
    // banner if a wider slot ever needs it.
    safetyOversight: `${BASE}/screensho56t202561125at3.40.51-pm1.png`,     // 1040×896, was unused
    workflowCompliance: `${BASE}/aboutusimage256.png`,                     // operator at monitors
    riskDetection: `${BASE}/screenshot204343251125at3.33.02-pm1.png`,      // perimeter
  },

  // Trusted across the supply chain, 5 industries
  supplyChain: [
    `${BASE}/frame141012103122.png`,        // Transportation & Logistics
    `${BASE}/frame14106562103133.png`,      // Warehousing & Distribution
    `${BASE}/frame16541012103144.png`,      // Supply Chain Management
    `${BASE}/frame141012106653155.png`,     // Manufacturing
    `${BASE}/frame16541012103166.png`,      // Automotive & Distribution
  ],

  // Industry-page hero photographs.
  //
  // ACTIVE (2026-05-03): bound to the five Unsplash photos curated for
  // the brand register and documented in /public/industry/README.md.
  // The five JPEGs need to be downloaded into /public/industry/ before
  // these renders complete — until they land, Next.js Image will 404
  // the hero slot and the alt text will fall back. Download instructions
  // and per-photo credits live in the README.
  //
  // The supplyChain[] array further down uses the original frame*.png
  // tiles for the home-page SupplyChain section cards — those are kept
  // intentionally per Scotty's call (the small home-page tiles are fine;
  // only the full-bleed industry hero needed real photography).
  //
  // The legacy frame*.png bindings are preserved as design archeology
  // in the LEGACY block below — comment-only, easy to revert if any of
  // the new Unsplash sources need to be pulled.
  industryHero: {
    logistics: {
      src: `/industry/logistics.jpg`,
      alt: "A row of staged semi-trucks parked at a freight lot. (Photo: Alex Kalinin / Unsplash)",
      caption: "ARCHIVE · LOGISTICS · 2026",
    },
    warehousing: {
      src: `/industry/warehousing.jpg`,
      alt: "Big distribution-facility interior, high-bay racks filled with pallets, vanishing-point composition. (Photo: AFINIS Group / Unsplash)",
      caption: "ARCHIVE · WAREHOUSING · 2026",
    },
    "supply-chain": {
      src: `/industry/supply-chain.jpg`,
      alt: "Aerial drone shot of an intermodal container yard from directly overhead. (Photo: CHUTTERSNAP / Unsplash)",
      caption: "ARCHIVE · SUPPLY CHAIN · 2026",
    },
    manufacturing: {
      src: `/industry/manufacturing.jpg`,
      alt: "A large industrial plant lit up at night, exterior view of the operating complex. (Photo via Unsplash)",
      caption: "ARCHIVE · MANUFACTURING · 2026",
    },
    automotive: {
      src: `/industry/automotive.jpg`,
      alt: "Aerial drone shot of a vehicle storage compound — staged automobiles seen from directly above. (Photo via Unsplash)",
      caption: "ARCHIVE · AUTOMOTIVE · 2026",
    },
  } as Record<
    string,
    { src: string; alt: string; caption: string }
  >,

  // ─── LEGACY INDUSTRY HERO BINDINGS (design archeology) ─────────────
  // The original five `frame*.png` figma-export tiles, kept here so the
  // industry pages can be quickly reverted by swapping the active
  // `industryHero:` block above with the LEGACY block below. The tiles
  // are 457×474 — too small for the 21:9 hero slot — but they render
  // without 404s and keep the section visually populated if the new
  // photos need to be temporarily pulled.
  //
  // industryHero: {
  //   logistics: {
  //     src: `${BASE}/frame141012103122.png`,
  //     alt: "Tractor-trailers staging at a 3PL crossdock yard at dusk.",
  //     caption: "ARCHIVE · LOGISTICS · 2025",
  //   },
  //   warehousing: {
  //     src: `${BASE}/frame14106562103133.png`,
  //     alt: "Dock doors and forklifts inside an active distribution center.",
  //     caption: "ARCHIVE · WAREHOUSING · 2025",
  //   },
  //   "supply-chain": {
  //     src: `${BASE}/frame16541012103144.png`,
  //     alt: "A loaded yard with multiple trailers and supply-chain handoff activity.",
  //     caption: "ARCHIVE · SUPPLY CHAIN · 2025",
  //   },
  //   manufacturing: {
  //     src: `${BASE}/frame141012106653155.png`,
  //     alt: "Manufacturing facility perimeter and gate control point.",
  //     caption: "ARCHIVE · MANUFACTURING · 2025",
  //   },
  //   automotive: {
  //     src: `${BASE}/frame16541012103166.png`,
  //     alt: "Automotive transfer lot with vehicles staged for hauler pickup.",
  //     caption: "ARCHIVE · AUTOMOTIVE · 2025",
  //   },
  // } as Record<string, { src: string; alt: string; caption: string }>,

  // Customer logos. `stat` is surfaced via the data-cursor-caption HUD
  // on hover (#6, 2026-05-03). Stats are placeholder pending Mike's
  // confirm — see /_placeholders.md for swap path.
  //
  // 2026-05-04 logo pass (Scotty call): General Electric (corporate
  // parent, not "GE Capital"), Ford, and Honda monogram. The order
  // below is hand-interleaved — wordmark · monogram · wordmark · round
  // · wordmark · oval · monogram · wordmark — so the marquee reads as
  // a balanced rhythm of visual weights instead of clumping wide
  // wordmarks in one stretch and round monograms in another.
  //
  // `heightClass` is a Tailwind size token that compensates for the
  // monogram-vs-wordmark visual weight problem: a Honda H or a GE
  // circle wants to be ~115% the height of a wordmark to feel
  // proportionate next to it. Falls back to the marquee's default
  // (h-7 / md:h-8) when omitted.
  //
  // ASSET QUALITY NOTE (Scotty: 2026-05-04): Ford, General Electric,
  // and Honda need cleaner white-on-transparent variants. Current files
  // were sourced from the figma-exports pool — they render but may be
  // visually rough. Honda specifically should be the H-monogram (the
  // square red H mark on a transparent bg, rendered white), NOT the
  // "Honda" wordmark. See /_placeholders.md LIVE-LOGOS-1.
  logos: [
    {
      name: "Bison Transport",
      src: `${BASE}/bison_white1.png`,
      stat: "12 NIGHTLY GUARD SHIFTS REPLACED · 2024",
    },
    {
      name: "Honda",
      // 2026-05-04: swapped from Honda wordmark to the proper H monogram —
      // Honda's new "H mark" announced Jan 13 2026, sourced from Wikipedia
      // commons (Honda_auto_logo.svg, public domain), recolored to white
      // and rasterized to 2400px-wide PNG via ImageMagick.
      src: `${BASE}/honda_h_white.png`,
      stat: "VEHICLE-TRANSFER YARD MONITORING · 2024",
      heightClass: "h-8 md:h-10", // monogram, wants more vertical height
    },
    {
      name: "C.R. England",
      src: `${BASE}/cr_england_white1.png`,
      stat: "92% FASTER GATE-EVENT RESPONSE · 2024",
    },
    {
      name: "Mercedes-Benz",
      src: `${BASE}/mercedes_logo_white.png`,
      stat: "MULTI-PLANT YARD COVERAGE · 2024",
      heightClass: "h-8 md:h-10", // round mark
    },
    {
      name: "AWC",
      src: `${BASE}/awc_logo.webp`,
      stat: "AUTOMATED ENTRY ACROSS MULTIPLE YARDS · 2024",
    },
    {
      name: "Ford",
      // 2026-05-04 (final): processed the colored Ford PNG via PIL —
      // blue body pixels → opaque white, white cursive pixels → fully
      // transparent. Result is a solid white oval with a transparent
      // "Ford" cursive cutout. On the dark marquee band the dark
      // shows through the cursive, so it reads as dark Ford script
      // on white oval — properly visible AND consistent with the
      // monochrome treatment of the other logos in the row.
      src: `${BASE}/ford_white_cutout.png`,
      stat: "AUTOMOTIVE COMPOUND SECURITY · 2024",
      heightClass: "h-7 md:h-9", // oval mark, slightly taller than wordmark
    },
    {
      name: "Remco",
      src: `${BASE}/remco_logo.webp`,
      stat: "PERIMETER SECURED, DAY-1 OPERATIONAL · 2023",
    },
    {
      name: "General Electric",
      // 2026-05-04 (final): same PIL treatment as Ford — blue circle
      // body → opaque white, white "GE" cursive → fully transparent.
      // Renders as solid white circle with the dark marquee band
      // showing through the cursive cutout. Consistent monochrome
      // treatment with the rest of the row.
      src: `${BASE}/ge_white_cutout.png`,
      stat: "FLEET-FINANCED YARD AUDIT TRAIL · 2024",
      heightClass: "h-8 md:h-10", // round mark
    },
  ] as Array<{
    name: string;
    src: string;
    stat: string;
    heightClass?: string;
    /**
     * When true, the marquee renders this logo in its native colors
     * (blue Ford oval, blue GE circle) instead of flattening to a
     * white silhouette via the universal CSS filter. Use for logos
     * where the recognizable brand mark IS the color (oval-with-
     * cursive-inside, circle-with-monogram-inside) and a flat
     * silhouette would erase the inner detail.
     */
    keepColor?: boolean;
  }>,

  // About page imagery
  about: {
    cameraInstall: `${BASE}/about56usimage1.png`,
    teamWithTruck: `${BASE}/about56usimage3.png`,
    operatorAtWork: `${BASE}/aboutusi6mage1.png`,
    operatorAtMonitors: `${BASE}/aboutusimage256.png`,
    teamGroup: `${BASE}/screensho65t202512125at2.41.05-pm1.png`,
  },

  // Customer testimonial portrait, operator at workstation conveys the
  // C.R. England Regional Facilities Manager vibe well
  testimonialPortrait: `${BASE}/aboutusi6mage1.png`,

  // Built for real operations, UI snippets per card. Approximate matches
  // until exact pairings are confirmed.
  //
  // 2026-05-04: replaced two of the four bindings with the labeled
  // hand-picked assets Scotty dropped in Downloads (named after the
  // BuiltForReal card title — "proven accuracy day and night" →
  // Truck permitted; "plugs into the systems you already run" →
  // Connect with YMS). The two remaining bindings (No risk detected,
  // Safety infraction detected) are still on the figma-export
  // placeholders pending the labeled replacements.
  builtForReal: {
    "Truck permitted": `${BASE}/builtforreal_truck_permitted.png`,
    "No risk detected": `${BASE}/screensh56ot20259.png`,
    "Connect with YMS": `${BASE}/builtforreal_connect_with_yms.png`,
    "Safety infraction detected": `${BASE}/screenshot202434.png`,
  } as Record<string, string>,

  // Hero ambient video, canonical asset is /hero-reverse.mp4 (27MB H.264).
  // Hero.tsx hard-codes that path because it sets playbackRate + reverse-loop
  // semantics specific to that file; this entry is a soft reference for any
  // future component that wants the same ambient clip.
  heroVideo: "/hero-reverse.mp4",
};
