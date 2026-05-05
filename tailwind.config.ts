import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ────────────────────────────────────────────────────────────
        // Birdseye system palette — the source of truth.
        // ────────────────────────────────────────────────────────────
        birdseye: {
          // Pure black ground — kills mid-tones, lets cream + electric pop
          black: "#000000",
          ink: "#0A0A0B",        // Slightly lifted for cards on black
          surface: "#0F0F12",    // Card surface
          line: "#1F1F23",       // Hairline borders on black
          // Warm cream for body text — keeps the editorial warmth
          cream: "#F4EDE4",
          // Slightly cooler near-white for max contrast moments
          white: "#F8FAFC",
          // Editorial blue — used SPARINGLY (italic serif word, CTAs, key data)
          electric: "#2E4BFF",
          blue: "#1F2F7A",
          // Cool muted gray — secondary text on black (Linear-style)
          gray: "#71717A",
          // Brighter gray for body
          fog: "#A1A1AA",
          // System success
          success: "#4ADE80",
          // Legacy aliases kept so existing class names don't break
          navy: "#000000",
          border: "rgba(244, 237, 228, 0.10)",
        },
        // ────────────────────────────────────────────────────────────
        // Aliases for legacy class names — components written before
        // the migration still resolve correctly while we sweep.
        // ────────────────────────────────────────────────────────────
        brand: {
          DEFAULT: "#2E4BFF",
          50: "#EBEFFF",
          100: "#D6DEFF",
          200: "#ADBDFF",
          300: "#849DFF",
          400: "#5B7CFF",
          500: "#2E4BFF",
          600: "#1F2F7A",
          700: "#16225B",
          800: "#0E163C",
          900: "#070B1E",
        },
        ink: {
          950: "#0F1C2E", // → navy
          900: "#142539",
          800: "#162338", // → surface
          700: "#1B2A41",
          600: "#22324A",
          500: "#2A3A55",
        },
        line: {
          DEFAULT: "rgba(244, 237, 228, 0.14)",
          strong: "rgba(244, 237, 228, 0.22)",
        },
        bone: "#F4EDE4",
        muted: {
          DEFAULT: "#94A3B8",
          strong: "#CBD5E1",
        },
        success: "#4ADE80",
      },

      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-plex-mono)",
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
        // Aliased to sans so any leftover `font-display` references just
        // resolve to Inter cleanly. Removable after the sweep.
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        // Instrument Serif — editorial punch. Use SPARINGLY:
        // hero italic word, section accent words, pull quotes.
        serif: [
          "var(--font-serif)",
          "Instrument Serif",
          "ui-serif",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },

      fontSize: {
        // ── Birdseye system scale ──────────────────────────────────
        // `text-hero` — billboard tier, hero-only. Inter Black, very tight,
        // very large. Pushes the spec h1 into a confidence move.
        hero: [
          "clamp(4rem, 9vw, 8rem)",
          { lineHeight: "0.9", letterSpacing: "-0.04em", fontWeight: "900" },
        ],
        h1: [
          "clamp(3.5rem, 6vw, 5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(2rem, 3vw, 2.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        h3: ["1.625rem", { lineHeight: "1.2", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        eyebrow: [
          "0.75rem",
          { lineHeight: "1", letterSpacing: "0.12em", fontWeight: "500" },
        ],
        // Smaller mono label — used inside cards, footer, and dense
        // contexts where 12px is too loud. Tracking opens up to 0.18em
        // because tighter tracking reads heavy at this size.
        "eyebrow-sm": [
          "0.65625rem", // 10.5px
          { lineHeight: "1", letterSpacing: "0.18em", fontWeight: "500" },
        ],
        system: [
          "0.75rem",
          { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "500" },
        ],
        metric: [
          "2.5rem",
          { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        // ── Legacy scale (kept temporarily for unmigrated components) ──
        "display-xl": ["72px", { lineHeight: "64.8px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["60px", { lineHeight: "60px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["50px", { lineHeight: "60px", letterSpacing: "-0.018em", fontWeight: "600" }],
        "display-sm": ["48px", { lineHeight: "56px", letterSpacing: "-0.016em", fontWeight: "600" }],
        lead: ["18px", { lineHeight: "27px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        tag: ["15px", { lineHeight: "21px", fontWeight: "500" }],
      },

      maxWidth: {
        site: "1200px",
        copy: "560px",
        container: "1200px", // legacy alias
      },

      spacing: {
        section: "7.5rem", // 120px
        gutter: "1.5rem",  // 24px
      },

      borderRadius: {
        card: "1.25rem", // 20px
        pill: "9999px",
      },

      boxShadow: {
        soft: "0 24px 80px rgba(15, 28, 46, 0.16)",
        glow: "0 0 40px rgba(46, 75, 255, 0.28)",
        "glow-brand": "0 0 0 1px rgba(46, 75, 255, 0.45), 0 8px 30px rgba(46, 75, 255, 0.28)",
      },

      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "spin-slow": "spin 24s linear infinite",
        "idle-pulse": "idlePulse 4s ease-in-out infinite",
        "badge-shimmer": "badgeShimmer 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        idlePulse: {
          "0%, 100%": { boxShadow: "0 0 30px rgba(46, 75, 255, 0.25)" },
          "50%": { boxShadow: "0 0 50px rgba(46, 75, 255, 0.45)" },
        },
        badgeShimmer: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(46, 75, 255, 0.25)" },
          "50%": { boxShadow: "0 0 30px rgba(46, 75, 255, 0.55)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
