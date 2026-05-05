import { ImageResponse } from "next/og";

/**
 * Favicon, 32×32 brand glyph rendered at build time by Next.js.
 *
 * Composition: black field, single electric-blue dot mid-left, cream "B"
 * to its right. Mirrors the Nav wordmark's "blue dot prefix" idea but at
 * favicon scale, which is unreadable as a full wordmark. The dot alone
 * carries the brand at 16px once browsers downscale, and the B reinforces
 * recognition at 32px+. No drop shadows, no gradients, same hairline
 * discipline as the rest of the brand.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3px",
        }}
      >
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "999px",
            background: "#2E4BFF",
          }}
        />
        <div
          style={{
            color: "#F4EDE4",
            fontSize: "22px",
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size },
  );
}
