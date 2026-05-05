"use client";

import { useEffect, useState } from "react";

/**
 * AmbientShift, time-of-day atmospheric layer.
 *
 * Sets four CSS variables on `:root` based on the user's local hour, so
 * the site feels alive at any time. The shift is intentionally subtle 
 * the brand discipline is "operational, not theatrical," so this isn't a
 * day/night palette swap, it's a 3–6% tonal nudge that registers as
 * atmosphere over a long visit and goes unnoticed in a glance.
 *
 *   --ambient-tint    , rgb hue applied to large overlay gradients
 *   --ambient-glow    , multiplier for electric-blue glow effects
 *   --ambient-haze    , opacity of cream haze on hero darkening
 *   --ambient-warmth  , slight cream-warmth shift (0–1, used in
 *                         `color-mix(in oklch, ...)` if a consumer wants
 *                         to push body type a little warmer at dusk)
 *
 * Each consumer opts in by reading the CSS var with a fallback that
 * matches "day" so nothing depends on this component being mounted.
 *
 * Phases (24h clock, local time):
 *   Dawn   05–09, cool warming, electric a touch brighter
 *   Day    09–17, neutral baseline (closest to the static design)
 *   Dusk   17–21, warmth lifts, electric saturates, hero darkens
 *   Night  21–05, cool, electric peaks, hero darkest
 *
 * The phase string is published on `document.documentElement.dataset.phase`
 * so any component or stylesheet rule that wants per-phase polish can
 * key off `[data-phase="dusk"] .foo { ... }`. Cheap, reactive, no JS
 * subscription needed for downstream work.
 *
 * The component recomputes every 15 minutes, long enough not to thrash,
 * short enough that a user who keeps the tab open through a phase change
 * sees the shift. A change of phase fires a CSS transition on the root
 * (declared in globals.css) so the cross-fade is smooth.
 */

type Phase = "dawn" | "day" | "dusk" | "night";

type AmbientTokens = {
  tint: string;
  glow: string;
  haze: string;
  warmth: string;
};

function phaseFor(hour: number): Phase {
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "dusk";
  return "night";
}

// Tokens are tuned to be barely perceptible. Values are deliberately
// modest, the goal is "the room dimmed slightly," not "the lights
// changed color." Anything bolder fights with the brand palette.
const TOKENS: Record<Phase, AmbientTokens> = {
  dawn: {
    tint: "244 228 210",         // warm cream cast
    glow: "1.05",
    haze: "0.55",
    warmth: "0.04",
  },
  day: {
    tint: "12 14 22",            // near-neutral cool ground
    glow: "1.00",
    haze: "0.50",
    warmth: "0.00",
  },
  dusk: {
    tint: "60 28 22",            // warm dusk cast
    glow: "1.10",
    haze: "0.62",
    warmth: "0.06",
  },
  night: {
    tint: "8 12 28",             // deep cool night
    glow: "1.18",
    haze: "0.72",
    warmth: "0.00",
  },
};

export function AmbientShift() {
  const [phase, setPhase] = useState<Phase>("day");

  useEffect(() => {
    const apply = () => {
      const now = new Date();
      const next = phaseFor(now.getHours());
      setPhase(next);
      const root = document.documentElement;
      root.dataset.phase = next;
      const t = TOKENS[next];
      root.style.setProperty("--ambient-tint", t.tint);
      root.style.setProperty("--ambient-glow", t.glow);
      root.style.setProperty("--ambient-haze", t.haze);
      root.style.setProperty("--ambient-warmth", t.warmth);
    };
    apply();
    // 15-minute reapply, long enough to avoid thrash, short enough that
    // a long-lived tab catches the next phase boundary within 15min of it.
    const id = window.setInterval(apply, 15 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  // Self-rendering, no DOM. The variables live on :root.
  // (We keep `phase` in state purely so React's effect dep tracking has a
  // shape for any future consumer that wants to subscribe via context.)
  void phase;
  return null;
}
