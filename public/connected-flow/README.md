# ConnectedFlow asset drop-zone

This folder is wired to the home page sticky-scroll feature reveal
(`components/site/ConnectedFlow.tsx` → `_design/images.ts`). When the 8
clips below are dropped here, flip ONE config line and the section
self-hosts (no proxy, no upstream WordPress dependency).

## What to deliver

**8 clips, exact filenames** (slugs come from `ConnectedFlow.tsx` SLUGS
array — order MUST match `connectedFlow.features` in `_design/content.ts`):

| # | Filename                       | Visual brief                                                                                       |
|---|--------------------------------|----------------------------------------------------------------------------------------------------|
| 1 | `monitoring.webm`              | Wide overhead yard plate — multiple trucks, calm activity, system overlay HUD if available         |
| 2 | `gatecore.webm`                | Driver pulling up to gate / kiosk; ID being read; arm rising. The full GateCore beat in 8s         |
| 3 | `id-verify.webm`               | Tight on a license / driver face / NVIDIA detection box. The verify moment isolated                |
| 4 | `bills-of-lading.webm`         | BOL paperwork being scanned / OCR'd; on-screen field extraction if you have it                     |
| 5 | `seal-verification.webm`       | Trailer rear; seal close-up; check-pass green tick                                                 |
| 6 | `faster-gate.webm`             | Time-lapse / sped-up wide showing fast clearance — "75% faster" energy                             |
| 7 | `voice-down.webm`              | Operator headset POV or mixer-board view; driver POV with audio coming through speaker            |
| 8 | `compliance-reporting.webm`    | Dashboard / report being generated; line chart drawing in; compliance OK indicator                 |

## Encoding spec

- **Container:** `.webm` (vp9) preferred. `.mp4` (h.264 / yuv420p) acceptable
  — if mp4, rename slug from `<name>.webm` to `<name>.mp4` and keep the
  same slug stem.
- **Resolution:** 1280×720 (720p). 4:3, 16:9, or 5:4 OK — component is
  `aspect-[5/4]` on desktop and crops with `object-cover`.
- **Duration:** 8–12 seconds. Loop point should be visually clean.
- **Bitrate:** target ~1.5 MB per clip, 1.5–2.0 Mbps. The section pre-mounts
  all 8 with `preload="auto"` so total weight matters.
- **Audio:** none. Strip the track entirely (component is muted, but
  shipping audio just bloats the file).
- **Frame rate:** 24–30 fps. Avoid 60.

ffmpeg one-liner (mp4 → vp9 webm at target spec):

```bash
ffmpeg -i input.mov \
  -c:v libvpx-vp9 -b:v 1500k -pass 1 -an -f null /dev/null && \
ffmpeg -i input.mov \
  -c:v libvpx-vp9 -b:v 1500k -pass 2 -an \
  -vf "scale=1280:-2,fps=30" \
  output.webm
```

## Final flip

Once all 8 are in this folder, edit `_design/images.ts` (one block):

```ts
// FROM:
connectedFlow: {
  monitoring: "/api/cf-video/monitoring",
  gatecore: "/api/cf-video/gatecore",
  "id-verify": "/api/cf-video/id-verify",
  "bills-of-lading": "/api/cf-video/bills-of-lading",
  "seal-verification": "/api/cf-video/seal-verification",
  "faster-gate": "/api/cf-video/faster-gate",
  "voice-down": "/api/cf-video/voice-down",
  "compliance-reporting": "/api/cf-video/compliance-reporting",
} as Record<string, string>,

// TO:
connectedFlow: {
  monitoring: "/connected-flow/monitoring.webm",
  gatecore: "/connected-flow/gatecore.webm",
  "id-verify": "/connected-flow/id-verify.webm",
  "bills-of-lading": "/connected-flow/bills-of-lading.webm",
  "seal-verification": "/connected-flow/seal-verification.webm",
  "faster-gate": "/connected-flow/faster-gate.webm",
  "voice-down": "/connected-flow/voice-down.webm",
  "compliance-reporting": "/connected-flow/compliance-reporting.webm",
} as Record<string, string>,
```

That's it. No component edits needed. `app/api/cf-video/[slug]/route.ts`
becomes dead code at that point — safe to delete in a follow-up sweep.

## Why this matters

ConnectedFlow is the home page's "every feature on sticky scroll" section
— the largest single piece of operational storytelling on the site. With
the proxy, every visit pulls 8 videos through a hop on first scroll.
Self-hosted, the same section preloads from the same origin, gets
edge-cached on Vercel, and removes one external failure mode. Worth the
asset round-trip.
