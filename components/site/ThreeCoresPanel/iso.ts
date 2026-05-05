/**
 * iso.ts, ARCHIVED.
 *
 * The 30° isometric helpers used by the previous illustrative attempt
 * at GateScene / SafeScene / YardScene. The illustration approach was
 * reverted — see CorePlaceholder.tsx for the current holding state.
 *
 * Kept as a minimal stub so any stale imports surface as type errors
 * rather than runtime crashes. Delete this file once a final visual
 * direction is locked in for the panel.
 */

export const TILE = 50;

export function isoX(_x: number, _y: number): number {
  return 0;
}
export function isoY(_x: number, _y: number, _z = 0): number {
  return 0;
}
export function p(_x: number, _y: number, _z = 0): { x: number; y: number } {
  return { x: 0, y: 0 };
}
export function poly(..._points: { x: number; y: number }[]): string {
  return "";
}
export function box(_opts: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
}): { top: string; left: string; right: string; silhouette: string } {
  return { top: "", left: "", right: "", silhouette: "" };
}
