/**
 * @archived 2026-05-02
 *
 * HeroAnimation was a 3-scene SVG loop prototype (GateCore → SafeCore →
 * YardCore, ~6s per scene with crossfade) intended to sit behind the
 * hero manifesto. It worked, but never reached the visual fidelity bar
 * for a homepage signature moment, the SVG-narrative-diagram approach
 * read closer to "explainer animation" than the cinematic-instrumentation
 * register the brand sits in.
 *
 * Spiritual successor: task #68 (WebGL camera-eye signature hero), a
 * Three.js / shader-driven scene that operates in a different visual
 * vocabulary entirely (volumetric, not vector). The two are
 * fundamentally different design lineages, so HeroAnimation is NOT a
 * starting point for #68; it's a closed branch.
 *
 * The previous implementation (3 SVG scene factories + a sceneIdx
 * cycle, ~250 lines, dependency on framer-motion's AnimatePresence) is
 * preserved in git history at the parent commit of this archive. To
 * resurrect, `git log --all -- components/site/HeroAnimation.tsx`.
 *
 * This file remains as a no-op named export so any stale import (none
 * known at archive time) doesn't crash the build. Tree-shaking removes
 * it from the production bundle.
 */

export function HeroAnimation(): null {
  return null;
}
