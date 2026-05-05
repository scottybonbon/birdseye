/**
 * ThreeCoresPanel, type contracts.
 *
 * Single source of the CoreKey union. Every other file in this folder
 * imports from here so we never drift between "0 / 1 / 2" indexes and
 * the real domain language.
 */

export type CoreKey = "gate" | "safe" | "yard";

export const CORE_ORDER: readonly CoreKey[] = ["gate", "safe", "yard"] as const;

export type ThreeCoresHandlers = {
  /** Card hover, temporary highlight (doesn't lock). */
  onEnter: (core: CoreKey) => void;
  /** Card hover-out, returns to lock or auto state. */
  onLeave: () => void;
  /** Card click, locks + restarts the auto-cycle from this core. */
  onClick: (core: CoreKey) => void;
};
