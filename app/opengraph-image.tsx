import { ImageResponse } from "next/og";

export const alt = "Birdseye, The Yard Operating System";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid texture background */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
            zIndex: 0,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            gap: "20px",
          }}
        >
          {/* BIRDSEYE Wordmark */}
          <h1
            style={{
              fontSize: "120px",
              fontWeight: 900,
              // Brand cream, matches `birdseye.cream` in tailwind.config
              color: "#F4EDE4",
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-2px",
            }}
          >
            BIRDSEYE
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "36px",
              fontStyle: "italic",
              color: "#2E4BFF",
              margin: 0,
              fontFamily: "Georgia, serif",
              fontWeight: "400",
            }}
          >
            The Yard Operating System.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
