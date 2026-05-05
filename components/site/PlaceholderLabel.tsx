/**
 * PlaceholderLabel — small, deliberate "this isn't final" overlay tag.
 *
 * Pattern: amber dot + mono-caps "PLACEHOLDER" label, sits at the top
 * of any visual asset that's still in flux. Reviewers scanning the
 * page see immediately that the asset is provisional, not the final
 * design treatment.
 *
 * Why amber, not the brand electric: amber reads as "caution / WIP"
 * across cultures, the brand electric would read as "this is the
 * finished thing." Subtle distinction, big psychological cue.
 *
 * The component is positioned absolutely by default (top-left, with
 * 16px inset). Caller wraps a `relative` container; the label floats
 * inside it. Pass `position` if a different corner is needed.
 */
export function PlaceholderLabel({
  position = "top-left",
  note,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Optional one-line clarifier under the label. e.g. "FINAL ASSET COMING SOON" */
  note?: string;
}) {
  const pos = {
    "top-left": "top-3 left-3 md:top-4 md:left-4",
    "top-right": "top-3 right-3 md:top-4 md:right-4",
    "bottom-left": "bottom-3 left-3 md:bottom-4 md:left-4",
    "bottom-right": "bottom-3 right-3 md:bottom-4 md:right-4",
  }[position];

  return (
    <div
      className={`pointer-events-none absolute z-30 ${pos} flex items-start gap-2 rounded-md px-2.5 py-1.5 backdrop-blur-md`}
      style={{
        background: "rgba(15, 28, 46, 0.78)",
        border: "1px solid rgba(245, 158, 11, 0.55)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
      }}
      aria-hidden
    >
      <span
        aria-hidden
        className="mt-[5px] inline-block h-1.5 w-1.5 rounded-full"
        style={{
          background: "#F59E0B",
          boxShadow: "0 0 8px rgba(245, 158, 11, 0.65)",
        }}
      />
      <div>
        <div
          className="font-mono text-[9.5px] tracking-[0.22em] uppercase font-semibold"
          style={{ color: "#F59E0B" }}
        >
          Placeholder
        </div>
        {note && (
          <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-birdseye-cream/65 mt-0.5">
            {note}
          </div>
        )}
      </div>
    </div>
  );
}
