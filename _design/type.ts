/**
 * Birdseye type scale — single source of truth for headline clamps.
 *
 * CRAFT-1 (2026-05-03): Audit found real drift across components —
 * three H2 tiers used inconsistent clamp values, four H3 tiers ditto.
 * The clamps are similar in feel but mathematically different, which
 * means a 10% bump to "all H2s" required editing every file.
 *
 * This file freezes the scale into named tokens. Components can opt
 * in via `import { TYPE } from "@/_design/type"` and using e.g.
 * `style={TYPE.h2.mid}`. Existing inline `text-[clamp(...)]` usages
 * stay as-is until they're touched naturally — incremental refactor,
 * not a sweeping rewrite.
 *
 * The scale:
 *   • h1 — page-level hero. PageHero handles its own.
 *   • h2.big — major section headlines on long-form pages
 *   • h2.mid — standard section headlines (most common)
 *   • h2.small — secondary section headlines, smaller modules
 *   • h3.card — card titles, capability headlines
 *   • h3.compact — tighter card titles, related-item headlines
 *   • display — billboard / closing-manifesto type
 *
 * Tracking + leading + balance are defaults that work with each clamp
 * range. Override per-use only if the local context demands it.
 *
 * The "one italic per H1 ever" rule from the-one-rule.md Section 2 is
 * a discipline rule, not a token. Enforce it in code review.
 */

import type { CSSProperties } from "react";

// ─── Headline tokens ───────────────────────────────────────────────

export const TYPE = {
  /** Page-level hero (handled by PageHero, but available for one-offs).
   *  Used by /letter and /manifesto for the italic-serif manifesto. */
  hero: {
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    lineHeight: "1",
    letterSpacing: "-0.025em",
  } as CSSProperties,

  h1: {
    /** Standard PageHero H1 size. Used by every secondary page hero. */
    page: {
      fontSize: "clamp(2.25rem, 5.5vw, 5rem)",
      lineHeight: "1",
      letterSpacing: "-0.025em",
    } as CSSProperties,
    /** Slightly smaller H1 for press/changelog/principles archive heroes. */
    archive: {
      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
      lineHeight: "1",
      letterSpacing: "-0.025em",
    } as CSSProperties,
  },

  h2: {
    /** Major section headlines on long-form pages (CargoTheft, MaxTelepresence
     *  primary section). The biggest H2 size in the system. */
    big: {
      fontSize: "clamp(2rem, 4vw, 3.5rem)",
      lineHeight: "1.05",
      letterSpacing: "-0.025em",
    } as CSSProperties,

    /** Standard section headlines — the default for "most pages, most sections."
     *  Used by Premise / WhatItIsnt / ThreeTracks / etc. */
    mid: {
      fontSize: "clamp(2rem, 3.6vw, 3rem)",
      lineHeight: "1.05",
      letterSpacing: "-0.02em",
    } as CSSProperties,

    /** Secondary section headlines — sub-sections, smaller modules, side
     *  panels. Used by FAQAccordion title, smaller editorial sections. */
    small: {
      fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)",
      lineHeight: "1.05",
      letterSpacing: "-0.018em",
    } as CSSProperties,

    /** Tightest section headline. For sub-sub-sections or stat-row
     *  introductions. Used by ClosingMetrics header, GateCore tight headers. */
    tight: {
      fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
      lineHeight: "1.15",
      letterSpacing: "-0.018em",
    } as CSSProperties,
  },

  h3: {
    /** Card titles — capability headlines, partner-track headlines. */
    card: {
      fontSize: "clamp(1.25rem, 1.75vw, 1.5rem)",
      lineHeight: "1.2",
      letterSpacing: "-0.012em",
    } as CSSProperties,

    /** Tighter card titles — related-item headlines, smaller cards. */
    compact: {
      fontSize: "clamp(1.125rem, 1.5vw, 1.25rem)",
      lineHeight: "1.25",
      letterSpacing: "-0.012em",
    } as CSSProperties,

    /** Sub-card headings — pillar names, callout headers. */
    sub: {
      fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
      lineHeight: "1.25",
      letterSpacing: "-0.012em",
    } as CSSProperties,
  },

  /** Body copy — paragraphs, descriptions. The Tailwind `text-body` class
   *  resolves to roughly this; use either. */
  body: {
    fontSize: "15px",
    lineHeight: "1.6",
  } as CSSProperties,

  /** Small body — card descriptions, secondary text. */
  bodySmall: {
    fontSize: "14.5px",
    lineHeight: "1.55",
  } as CSSProperties,

  /** System-label — mono caps eyebrows. Tailwind `system-label` class
   *  is the preferred path; this is here for inline overrides. */
  systemLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
  } as CSSProperties,

  /** Mono filing line — even tighter than system-label. Used for
   *  archive captions and timestamps. */
  filingLine: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
  } as CSSProperties,
} as const;

// ─── Tracking adjustments ───────────────────────────────────────────

/** Tightening to apply to italic-serif accents within an H1 or H2.
 *  Instrument Serif at large sizes opens up; -0.015em pulls it tighter
 *  so the italic accent feels carved-into the headline, not floating. */
export const ITALIC_ACCENT_TRACKING = "-0.015em";

// ─── How to use ─────────────────────────────────────────────────────

/**
 * Migration pattern (when touching a component for unrelated reasons):
 *
 * Before:
 *   <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
 *
 * After:
 *   <h2 style={TYPE.h2.mid} className="font-bold text-birdseye-cream">
 *
 * Or for a one-off override:
 *   <h2 style={{ ...TYPE.h2.mid, fontSize: "clamp(2rem, 4vw, 3.25rem)" }} ...>
 *
 * Don't blanket-refactor existing components — touch on edit, not
 * sweep. The drift was cosmetic; the lockdown is structural.
 */
