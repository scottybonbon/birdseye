"use client";

import { useEffect, useRef } from "react";
import { Wayfinding } from "./Wayfinding";
import { SceneLayer } from "./SceneLayer";
import { WorldBase } from "./WorldBase";
import { GateScene } from "./GateScene";
import { SafeScene } from "./SafeScene";
import { YardScene } from "./YardScene";
import type { CoreKey } from "./types";

/**
 * ThreeCoresPanel, the home-page showpiece.
 *
 * Architecture (per Scotty's build brief):
 *   • The panel is one container. The static yard map (WorldBase)
 *     sits at the bottom of the layer stack, always visible.
 *   • Three SceneLayer overlays (Gate / Safe / Yard) crossfade above
 *     the base depending on which core is active. Only one is
 *     opacity-100 at a time.
 *   • Wayfinding labels live top-right and update which core is lit.
 *   • A soft top + bottom vignette blends the SVG composition into
 *     the panel so the asset feels integrated, not "stickered."
 *
 * Controlled vs uncontrolled:
 *   The parent ThreeCores section already runs an auto-cycle and
 *   exposes a numeric `active` (0/1/2). This panel is rendered as a
 *   CONTROLLED component, the parent owns state, this component just
 *   maps the numeric index to the CoreKey union and renders. That
 *   keeps the cards on the right and the panel on the left in
 *   lockstep without needing a context provider.
 *
 *   The useCoreCycle hook also exists in this folder and can power a
 *   future standalone version of the panel (with internal state +
 *   hover handlers exposed back to its own card stack).
 *
 * The asset:
 *   The current Gate / Safe / Yard scenes are SVG + framer-motion,
 *   built to the right composition + brand register. They will be
 *   replaced by the commissioned animator's drawing in a later round.
 *   The contract this orchestrator exposes (CoreKey, restartKey, the
 *   SceneLayer wrapper) is asset-agnostic, swap a scene's body, the
 *   panel keeps working.
 */

const KEY_BY_INDEX: readonly CoreKey[] = ["gate", "safe", "yard"] as const;

export function ThreeCoresPanel({
  active: activeIndex,
}: {
  /** 0 / 1 / 2, mapped to gate / safe / yard. */
  active: 0 | 1 | 2;
}) {
  const active: CoreKey = KEY_BY_INDEX[activeIndex];

  // restartKey bumps every time the active core changes. Each scene
  // listens for it to reset its internal step/timeline, so a click on
  // a card always replays the sequence from frame 0 instead of dropping
  // the viewer into the middle of an animation.
  const restartRef = useRef(0);
  useEffect(() => {
    restartRef.current += 1;
  }, [active]);
  const restartKey = restartRef.current;

  return (
    <div
      role="img"
      aria-label="Birdseye Yard Operating System schematic, GateCore, SafeCore, and YardCore"
      className="relative w-full lg:h-full aspect-[3/5] lg:aspect-auto rounded-card overflow-hidden border border-birdseye-cream/[0.10] bg-birdseye-navy"
    >
      {/* Always-on base map */}
      <WorldBase />

      {/* Soft top + bottom vignette so the SVG composition fades into
          the panel chrome instead of butting up against a hard edge.
          Two stacked gradients keep both the gate (top) and the yard
          (bottom) feeling integrated. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,28,46,0.85) 0%, rgba(15,28,46,0.0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(15,28,46,0.85) 0%, rgba(15,28,46,0.0) 100%)",
        }}
      />

      {/* The three crossfading scenes */}
      <SceneLayer isActive={active === "gate"}>
        <GateScene restartKey={restartKey} />
      </SceneLayer>
      <SceneLayer isActive={active === "safe"}>
        <SafeScene restartKey={restartKey} />
      </SceneLayer>
      <SceneLayer isActive={active === "yard"}>
        <YardScene restartKey={restartKey} />
      </SceneLayer>

      {/* Wayfinding sits above everything */}
      <Wayfinding active={active} />
    </div>
  );
}
