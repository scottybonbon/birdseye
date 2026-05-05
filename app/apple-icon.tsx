import { ImageResponse } from "next/og";

/**
 * Apple touch icon, 180×180 brand mark used when the site is added to
 * an iOS home screen or pinned in macOS dock contexts. Shows the full
 * BIRDSEYE wordmark since at this scale the lettering reads cleanly,
 * and an iOS home-screen icon is more "logo" than "tab marker."
 *
 * Centered black tile with the cream wordmark at ~30% of the width.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "999px",
              background: "#2E4BFF",
            }}
          />
          <div
            style={{
              color: "#F4EDE4",
              fontSize: "30px",
              fontWeight: 900,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-1.5px",
              lineHeight: 1,
            }}
          >
            BIRDSEYE
          </div>
        </div>
        <div
          style={{
            fontSize: "9px",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            letterSpacing: "2px",
            color: "rgba(244, 237, 228, 0.45)",
            textTransform: "uppercase",
          }}
        >
          YARD OS
        </div>
      </div>
    ),
    { ...size },
  );
}
