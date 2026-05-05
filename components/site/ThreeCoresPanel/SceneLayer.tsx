"use client";

import { TIMING } from "./constants";

/**
 * SceneLayer, full-bleed wrapper that crossfades when the layer
 * becomes active.
 *
 * Each Gate/Safe/Yard overlay is wrapped in one of these. The base
 * yard world (WorldBase) is NOT a SceneLayer, it's always visible
 * underneath. Overlays only render their region-specific content
 * (the truck, the fence cameras, the trailer dwell).
 *
 * Crossfade duration is centralized in TIMING so the panel reads as
 * one composition; if we ever bump it, every layer moves in sync.
 */
export function SceneLayer({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden={!isActive}
      className="absolute inset-0 transition-opacity ease-out"
      style={{
        transitionDuration: `${TIMING.transitionMs}ms`,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}
