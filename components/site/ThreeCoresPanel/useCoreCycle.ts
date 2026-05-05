"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CORE_ORDER, type CoreKey } from "./types";

/**
 * useCoreCycle, the state machine driving the panel.
 *
 * Behavior (per Scotty's build brief):
 *   • Hover always wins (temporary highlight, doesn't lock).
 *   • Click locks the active core and restarts the auto-cycle from
 *     there.
 *   • Auto-cycle runs every `cycleMs` (default 5.2s).
 *   • If the user has been idle for `resumeIdleMs` (default 14s), the
 *     lock auto-clears and the auto-cycle resumes.
 *
 * Returns the effective active core (hover ?? locked ?? auto), plus
 * three handlers the cards on the right call.
 */

type UseCoreCycleOpts = {
  defaultCore?: CoreKey;
  cycleMs?: number;
  resumeIdleMs?: number;
};

type CoreCycleApi = {
  /** What the panel should render as live. */
  active: CoreKey;
  /** The locked core (set by click), or null if not locked. */
  locked: CoreKey | null;
  /** Card hover, temporary highlight, doesn't lock. */
  setHover: (core: CoreKey | null) => void;
  /** Card click, locks + restarts cycle from this core. */
  lockTo: (core: CoreKey) => void;
  /** Manual lock release (rarely needed externally). */
  clearLock: () => void;
};

export function useCoreCycle(opts: UseCoreCycleOpts = {}): CoreCycleApi {
  const {
    defaultCore = "gate",
    cycleMs = 5200,
    resumeIdleMs = 14_000,
  } = opts;

  const [locked, setLocked] = useState<CoreKey | null>(null);
  const [hover, setHoverState] = useState<CoreKey | null>(null);
  const [active, setActive] = useState<CoreKey>(defaultCore);
  const lastInteractionRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  const effectiveActive: CoreKey = hover ?? locked ?? active;

  const bumpInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  const setHover = (core: CoreKey | null) => {
    bumpInteraction();
    setHoverState(core);
  };

  const lockTo = (core: CoreKey) => {
    bumpInteraction();
    setLocked(core);
    setActive(core); // restart auto-cycle from here
  };

  const clearLock = () => {
    bumpInteraction();
    setLocked(null);
  };

  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      const now = Date.now();
      const since = now - lastInteractionRef.current;

      // Pause auto-cycle while hovering, or while locked + recently active.
      if (hover) return;
      if (locked && since < resumeIdleMs) return;

      // If lock exists but the user has been idle long enough,
      // release and resume.
      if (locked && since >= resumeIdleMs) {
        setLocked(null);
      }

      setActive((prev) => {
        const idx = CORE_ORDER.indexOf(prev);
        return CORE_ORDER[(idx + 1) % CORE_ORDER.length];
      });
    }, cycleMs);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [cycleMs, resumeIdleMs, locked, hover]);

  return useMemo(
    () => ({
      active: effectiveActive,
      locked,
      setHover,
      lockTo,
      clearLock,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effectiveActive, locked],
  );
}
