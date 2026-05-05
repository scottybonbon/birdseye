"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion, DUR, EASE_OUT, EASE_IN_OUT } from "@/_design/motion";

/**
 * Platform animation — three-scene cinematic truck journey.
 *
 * Visual direction: technical schematic meets premium SaaS HUD.
 * Deep navy atmosphere, gradient-shaded geometry for subtle dimensionality,
 * refined teal accent (not gamer-cyan), restrained typography hierarchy,
 * generous negative space.
 *
 *   GateCore  → side elevation; truck approaches gate, scanned, admitted
 *   SafeCore  → 3/4 plan; truck routes through yard along projected path
 *   YardCore  → site plan; perimeter, KPIs, live activity stream
 *
 * Driven by the parent's `active` prop (0/1/2).
 */
const ACCENT = "#5EEAD4"; // refined teal — system intent / scans
const VERIFY = "#34D399"; // refined emerald — verified / online
const HUD = "#E8EDF0"; // soft warm white — primary line work
const HUD_DIM = "#94A3B8"; // dim warm gray — secondary text
const BLUE = "#3B82F6"; // brand — perimeter, lanes
const DEEP = "#0A1628"; // deep navy ground
export function PlatformAnimation({
  active
}: {
  active: 0 | 1 | 2;
}) {
  return <div aria-hidden="true" className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-birdseye-cream/[0.08]"><div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0F1F3D 0%, #070C18 60%, #020408 100%)"
    }} /><div className="absolute inset-0 pointer-events-none" style={{
      background: "linear-gradient(180deg, rgba(94, 234, 212, 0.02) 0%, transparent 50%, rgba(59, 130, 246, 0.03) 100%)"
    }} /><div className="absolute inset-0"><SceneFrame visible={active === 0}><GateScene /></SceneFrame><SceneFrame visible={active === 1}><SafeScene /></SceneFrame><SceneFrame visible={active === 2}><YardScene /></SceneFrame></div><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10" /><div className="absolute top-6 left-6 right-6 z-20 flex items-start justify-between pointer-events-none"><div className="flex flex-col gap-2"><div className="flex items-center gap-2.5"><span className="h-1 w-1 rounded-full animate-pulse" style={{
            backgroundColor: VERIFY,
            boxShadow: `0 0 8px ${VERIFY}`
          }} /><motion.span initial={{
            opacity: 0,
            y: -3
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            ease: EASE_OUT
          }} className="font-mono text-[11px] tracking-[0.22em] text-[#E8EDF0] uppercase">{["Gatecore · Scan & Admit", "Safecore · Route & Park", "Yardcore · Total View"][active]}</motion.span></div><motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.4,
          ease: EASE_OUT,
          delay: 0.1
        }} className="font-mono text-[9px] tracking-[0.32em] text-[#94A3B8]/60 uppercase pl-3.5">{["Drawing · Gate-01 · Elev. · 1:50", "Drawing · Zone-B · Plan · 1:200", "Drawing · Yard-04 · Site · 1:500"][active]}</motion.div></div><div className="flex flex-col items-end gap-2"><div className="font-mono text-[11px] tracking-[0.22em] text-[#E8EDF0]/45 uppercase">0{active + 1} / 03</div><div className="font-mono text-[9px] tracking-[0.32em] text-[#94A3B8]/50 uppercase">Rev · A · 2026</div></div></div><div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none"><motion.div initial={{
        opacity: 0,
        y: 6
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: DUR.smooth,
        ease: EASE_OUT,
        delay: 0.05
      }} className="font-serif italic text-[15px] text-[#E8EDF0]/75 mb-3 max-w-[420px]">{["Zero-friction access. Full accountability.", "Security that acts, not watches.", "One view. Total command."][active]}</motion.div><div className="flex gap-1.5">{[0, 1, 2].map((i: any) => <div key={i} className={`h-[2px] transition-all duration-700 ${i === active ? "w-14 bg-[#5EEAD4]" : "w-7 bg-[#E8EDF0]/10"}`} style={i === active ? {
          boxShadow: "0 0 10px rgba(94, 234, 212, 0.4)"
        } : undefined} />)}</div></div></div>;
}
function SceneFrame({
  visible,
  children
}: any) {
  return <motion.div animate={{
    opacity: visible ? 1 : 0
  }} transition={{
    duration: DUR.smooth,
    ease: EASE_OUT
  }} className="absolute inset-0" style={{
    pointerEvents: "none"
  }}>{visible && children}</motion.div>;
}
/* ─────────────── Reusable: shared SVG defs ─────────────── */
function SharedDefs() {
  return <defs><linearGradient id="truck-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E293B" /><stop offset="1" stopColor="#0A1228" /></linearGradient><linearGradient id="truck-trailer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#172033" /><stop offset="1" stopColor="#08101E" /></linearGradient><linearGradient id="truck-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5EEAD4" stopOpacity="0.5" /><stop offset="1" stopColor="#5EEAD4" stopOpacity="0.2" /></linearGradient><radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#5EEAD4" stopOpacity="0.85" /><stop offset="0.5" stopColor="#5EEAD4" stopOpacity="0.25" /><stop offset="1" stopColor="#5EEAD4" stopOpacity="0" /></radialGradient><radialGradient id="glow-emerald" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#34D399" stopOpacity="0.8" /><stop offset="1" stopColor="#34D399" stopOpacity="0" /></radialGradient><linearGradient id="scan-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5EEAD4" stopOpacity="0" /><stop offset="0.4" stopColor="#5EEAD4" stopOpacity="0.7" /><stop offset="0.6" stopColor="#5EEAD4" stopOpacity="0.7" /><stop offset="1" stopColor="#5EEAD4" stopOpacity="0" /></linearGradient><linearGradient id="path-fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5EEAD4" stopOpacity="0.15" /><stop offset="0.5" stopColor="#5EEAD4" stopOpacity="0.55" /><stop offset="1" stopColor="#5EEAD4" stopOpacity="0.85" /></linearGradient><radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#000" stopOpacity="0.55" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient><filter id="soft-bloom" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter></defs>;
}
/* ─────────────── Reusable: blueprint grid (refined) ─────────────── */
function BlueprintGrid() {
  const minor = [];
  for (let x = 0; x <= 1600; x += 80) minor.push(x);
  const minorY = [];
  for (let y = 0; y <= 900; y += 80) minorY.push(y);
  return <g pointerEvents="none"><g opacity="0.04">{minor.map((x: any) => <line key={x} x1={x} y1="0" x2={x} y2="900" stroke={ACCENT} strokeWidth="0.5" />)}{minorY.map((y: any) => <line key={y} x1="0" y1={y} x2="1600" y2={y} stroke={ACCENT} strokeWidth="0.5" />)}</g></g>;
}
/* ─────────────── Reusable: registration mark ─────────────── */
function RegMark({
  x,
  y
}: any) {
  return <g opacity="0.35"><circle cx={x} cy={y} r="5" fill="none" stroke={ACCENT} strokeWidth="0.6" /><line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke={ACCENT} strokeWidth="0.5" /><line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke={ACCENT} strokeWidth="0.5" /></g>;
}
/* ─────────────── Reusable: animated dimension line ─────────────── */
function DimLine({
  x1,
  x2,
  y,
  label,
  delay = 0
}: any) {
  return <g><motion.line x1={x1} y1={y - 7} x2={x1} y2={y + 7} stroke={ACCENT} strokeWidth="0.7" strokeOpacity="0.7" initial={{
      pathLength: 0
    }} animate={{
      pathLength: 1
    }} transition={{
      duration: DUR.base,
      ease: EASE_OUT,
      delay
    }} /><motion.line x1={x2} y1={y - 7} x2={x2} y2={y + 7} stroke={ACCENT} strokeWidth="0.7" strokeOpacity="0.7" initial={{
      pathLength: 0
    }} animate={{
      pathLength: 1
    }} transition={{
      duration: DUR.base,
      ease: EASE_OUT,
      delay: delay + 0.15
    }} /><motion.line x1={x1} y1={y} x2={x2} y2={y} stroke={ACCENT} strokeWidth="0.5" strokeOpacity="0.6" initial={{
      pathLength: 0
    }} animate={{
      pathLength: 1
    }} transition={{
      duration: DUR.smooth,
      ease: EASE_OUT,
      delay: delay + 0.1
    }} /><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.4,
      ease: EASE_OUT,
      delay: delay + 0.5
    }}><rect x={(x1 + x2) / 2 - label.length * 3.6 - 8} y={y - 9} width={label.length * 7.2 + 16} height={18} rx="1" fill="#06080F" /><text x={(x1 + x2) / 2} y={y + 3} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2.4" fill={ACCENT}>{label}</text></motion.g></g>;
}
/* ─────────────── Reusable: frosted data panel ─────────────── */
function DataPanel({
  x,
  y,
  width,
  rows,
  delay = 0,
  title
}: any) {
  const rowH = 24;
  const titleH = title ? 32 : 0;
  const height = titleH + rows.length * rowH + 18;
  return <motion.g initial={{
    opacity: 0,
    x: x - 6
  }} animate={{
    opacity: 1,
    x
  }} transition={{
    duration: DUR.smooth,
    ease: EASE_OUT,
    delay
  }}><rect y={y} width={width} height={height} rx="6" fill="#0A1628" fillOpacity="0.65" /><rect y={y} width={width} height={height} rx="6" fill="none" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="0.6" /><line x1="0" y1={y + 1} x2={width} y2={y + 1} stroke={ACCENT} strokeOpacity="0.4" strokeWidth="0.6" />{title && <><text x="14" y={y + 21} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2.4" fill={ACCENT} opacity="0.85">{title}</text><line x1="14" y1={y + 30} x2={width - 14} y2={y + 30} stroke={ACCENT} strokeOpacity="0.15" /></>}{rows.map((row: any, i: number) => {
      const ry = y + titleH + 16 + i * rowH;
      return <g key={i}><text x="14" y={ry} fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="1.8" fill={HUD_DIM} opacity="0.85">{row.label}</text><text x={width - 14} y={ry} textAnchor="end" fontFamily="var(--font-plex-mono), monospace" fontSize="10.5" letterSpacing="1.2" fill={row.verified ? VERIFY : HUD}>{row.value}{row.verified && "  ✓"}</text></g>;
    })}</motion.g>;
}
/* ─────────────── Reusable: title block ─────────────── */
function TitleBlock({
  title,
  meta
}: any) {
  return <g opacity="0.5"><rect x="1330" y="800" width="210" height="48" rx="2" fill="#0A1628" fillOpacity="0.7" stroke={ACCENT} strokeOpacity="0.25" strokeWidth="0.5" /><line x1="1330" y1="822" x2="1540" y2="822" stroke={ACCENT} strokeOpacity="0.25" /><text x="1342" y="816" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2.2" fill={ACCENT}>{title}</text><text x="1342" y="838" fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.6" fill={HUD_DIM} fillOpacity="0.7">{meta}</text></g>;
}
/* ─────────────── Anatomically-correct US 18-wheeler ─────────────── */ /**
                                                                         * US conventional tractor (long-hood) + 53' dry van trailer, side view.
                                                                         *
                                                                         * Drawn so the truck is FACING RIGHT (forward direction). Origin is at
                                                                         * the front bumper, ground level. To position in scene: just translate
                                                                         * the group to wherever you want the front of the truck to be, then it
                                                                         * extends LEFT (the trailer is behind/to the left of the cab).
                                                                         *
                                                                         * Total length: ~720px wide left of origin, ~210px tall.
                                                                         *
                                                                         * Subtle gradient fills suggest dimensionality without breaking the
                                                                         * technical-drawing aesthetic.
                                                                         */
function Tractor18Wheeler() {
  return <g><ellipse cx="-360" cy="22" rx="380" ry="14" fill="url(#ground-shadow)" /><g transform="translate(-720, -180)"><rect x="0" y="0" width="480" height="160" fill="url(#truck-trailer)" stroke={HUD} strokeWidth="1.4" /><line x1="0" y1="1" x2="480" y2="1" stroke={HUD} strokeOpacity="0.7" strokeWidth="0.6" />{Array.from({
        length: 11
      }).map((_: any, i: number) => <line key={i} x1={(i + 1) * 40} y1="6" x2={(i + 1) * 40} y2="154" stroke={HUD} strokeOpacity="0.18" strokeWidth="0.5" />)}<line x1="0" y1="160" x2="480" y2="160" stroke={HUD} strokeOpacity="0.5" strokeWidth="0.6" /><line x1="2" y1="0" x2="2" y2="160" stroke={HUD} strokeOpacity="0.55" strokeWidth="0.7" /><line x1="240" y1="0" x2="240" y2="160" stroke={HUD} strokeOpacity="0.25" strokeWidth="0.5" /><line x1="6" y1="60" x2="6" y2="100" stroke={HUD} strokeWidth="1.6" /><circle cx="6" cy="80" r="1.6" fill={HUD} /><rect x="380" y="118" width="86" height="22" rx="1" fill="#0A1628" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="0.5" /><text x="423" y="134" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.6" fill={ACCENT} fillOpacity="0.85">BIRDSEYE 042</text>{[60, 240, 420].map((x: any) => <circle key={x} cx={x} cy="-1" r="1.4" fill={ACCENT} fillOpacity="0.7" />)}<line x1="80" y1="160" x2="80" y2="194" stroke={HUD} strokeOpacity="0.5" strokeWidth="1.2" /></g><g transform="translate(-410, 0)" stroke={HUD} strokeOpacity="0.45" strokeWidth="0.7" fill="none"><line x1="0" y1="0" x2="0" y2="-26" /><line x1="6" y1="0" x2="6" y2="-26" /></g><rect x="-280" y="-160" width="60" height="148" fill="url(#truck-body)" stroke={HUD} strokeWidth="1.4" /><line x1="-280" y1="-160" x2="-220" y2="-160" stroke={HUD} strokeOpacity="0.7" strokeWidth="0.6" /><rect x="-268" y="-140" width="20" height="22" fill="url(#truck-glass)" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.5" /><line x1="-280" y1="-90" x2="-220" y2="-90" stroke={HUD} strokeOpacity="0.25" strokeWidth="0.4" /><path d="M -220 -12 L -220 -160 L -145 -160 L -130 -110 L -130 -12 Z" fill="url(#truck-body)" stroke={HUD} strokeWidth="1.4" /><path d="M -230 -188 L -165 -188 L -145 -160 L -220 -160 Z" fill="url(#truck-body)" stroke={HUD} strokeWidth="1.2" /><line x1="-220" y1="-159" x2="-145" y2="-159" stroke={HUD} strokeOpacity="0.65" strokeWidth="0.6" /><path d="M -196 -156 L -196 -113 L -152 -113 L -145 -156 Z" fill="url(#truck-glass)" stroke={HUD} strokeOpacity="0.55" strokeWidth="0.7" /><line x1="-196" y1="-156" x2="-196" y2="-12" stroke={HUD} strokeOpacity="0.45" strokeWidth="0.6" /><rect x="-214" y="-150" width="14" height="36" rx="0.5" fill="url(#truck-glass)" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.5" /><line x1="-212" y1="-90" x2="-204" y2="-90" stroke={HUD} strokeOpacity="0.7" strokeWidth="1.2" /><line x1="-148" y1="-150" x2="-122" y2="-150" stroke={HUD} strokeOpacity="0.5" strokeWidth="0.6" /><rect x="-122" y="-160" width="9" height="14" fill={HUD} fillOpacity="0.4" stroke={HUD} strokeOpacity="0.6" strokeWidth="0.5" /><rect x="-122" y="-142" width="9" height="8" fill={HUD} fillOpacity="0.3" stroke={HUD} strokeOpacity="0.45" strokeWidth="0.4" /><path d="M -130 -110 L -130 -12 L -14 -12 L -14 -75 L -100 -110 Z" fill="url(#truck-body)" stroke={HUD} strokeWidth="1.4" /><line x1="-130" y1="-110" x2="-100" y2="-110" stroke={HUD} strokeOpacity="0.65" strokeWidth="0.6" /><line x1="-100" y1="-110" x2="-14" y2="-75" stroke={HUD} strokeOpacity="0.6" strokeWidth="0.6" /><path d="M -100 0 Q -80 -50 -60 0" fill="none" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.7" /><rect x="-14" y="-66" width="14" height="54" fill="url(#truck-body)" stroke={HUD} strokeOpacity="0.7" strokeWidth="0.7" /><g stroke={HUD} strokeWidth="0.5" strokeOpacity="0.5">{[-58, -50, -42, -34, -26, -18].map((y: any) => <line key={y} x1="-12" y1={y} x2="-2" y2={y} />)}</g><rect x="0" y="-12" width="14" height="24" fill="#0A1228" stroke={HUD} strokeWidth="1.4" /><line x1="3" y1="-8" x2="3" y2="8" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.5" /><line x1="11" y1="-8" x2="11" y2="8" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.5" /><ellipse cx="6" cy="-22" rx="22" ry="14" fill="url(#glow-cyan)" opacity="0.6" /><rect x="0" y="-30" width="6" height="14" fill="#0A1228" stroke={HUD} strokeOpacity="0.7" strokeWidth="0.6" /><circle cx="3" cy="-23" r="3" fill={ACCENT}><animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite" /></circle><line x1="-216" y1="-12" x2="-216" y2="-200" stroke={HUD} strokeOpacity="0.6" strokeWidth="2" /><line x1="-226" y1="-12" x2="-226" y2="-200" stroke={HUD} strokeOpacity="0.6" strokeWidth="2" /><rect x="-219" y="-204" width="6" height="4" fill={HUD} fillOpacity="0.5" /><rect x="-229" y="-204" width="6" height="4" fill={HUD} fillOpacity="0.5" /><ellipse cx="-180" cy="-32" rx="42" ry="14" fill="#0A1228" stroke={HUD} strokeOpacity="0.65" strokeWidth="0.9" /><line x1="-222" y1="-32" x2="-138" y2="-32" stroke={HUD} strokeOpacity="0.3" strokeWidth="0.4" /><rect x="-200" y="-12" width="40" height="6" fill="#0A1228" stroke={HUD} strokeOpacity="0.5" strokeWidth="0.5" /><rect x="-280" y="-22" width="36" height="10" fill="#0A1228" stroke={HUD} strokeOpacity="0.7" strokeWidth="0.7" /><Wheel cx={-80} /><Wheel cx={-200} /><Wheel cx={-250} /><Wheel cx={-620} /><Wheel cx={-670} /></g>;
}
function Wheel({
  cx
}: any) {
  return <g><circle cx={cx} cy="0" r="22" fill="#020408" stroke={HUD} strokeWidth="1.4" /><circle cx={cx} cy="0" r="9" fill="none" stroke={HUD} strokeOpacity="0.55" strokeWidth="0.6" />{[0, 60, 120, 180, 240, 300].map((deg: any) => {
      const r = 6;
      const a = deg * Math.PI / 180;
      // Round to fixed precision so SSR + CSR agree on the serialized
      // string. Without this, Math.sin/cos produce a JS number that
      // serializes to slightly different decimals on server vs. client
      // (e.g. -5.19615242270663 vs -5.196152422706631), which trips
      // React's hydration mismatch check.
      const dx = Number((cx + Math.cos(a) * r).toFixed(3));
      const dy = Number((Math.sin(a) * r).toFixed(3));
      return <circle key={deg} cx={dx} cy={dy} r="0.8" fill={HUD} fillOpacity="0.6" />;
    })}<circle cx={cx} cy="0" r="2" fill={HUD} fillOpacity="0.85" /></g>;
}
/**
 * Top-down truck — drawn FACING RIGHT (cab/hood at right end).
 * Origin is at the FRONT (right end) of the cab.
 * Tractor + trailer extends LEFT from origin.
 */
function TractorTopDown() {
  return <g><ellipse cx="-360" cy="6" rx="380" ry="14" fill="url(#ground-shadow)" opacity="0.55" /><rect x="-700" y="-40" width="540" height="80" fill="url(#truck-trailer)" stroke={HUD} strokeWidth="1.3" />{Array.from({
      length: 13
    }).map((_: any, i: number) => <line key={i} x1={-700 + (i + 1) * 38} y1="-40" x2={-700 + (i + 1) * 38} y2="40" stroke={HUD} strokeOpacity="0.16" strokeWidth="0.4" />)}<line x1="-700" y1="-40" x2="-700" y2="40" stroke={HUD} strokeOpacity="0.6" strokeWidth="0.7" /><rect x="-590" y="-14" width="78" height="28" rx="1" fill="#0A1628" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="0.5" /><text x="-551" y="4" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.4" fill={ACCENT} fillOpacity="0.85">BIRDSEYE 042</text><circle cx="-148" cy="0" r="6" fill="none" stroke={HUD} strokeOpacity="0.55" strokeWidth="0.7" /><path d="M -130 -38 L -50 -38 L -10 -30 L 0 -22 L 0 22 L -10 30 L -50 38 L -130 38 Z" fill="url(#truck-body)" stroke={HUD} strokeWidth="1.3" /><rect x="-130" y="-28" width="80" height="56" rx="2" fill="none" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.5" /><line x1="-50" y1="-38" x2="-10" y2="-30" stroke={HUD} strokeOpacity="0.35" strokeWidth="0.5" /><line x1="-50" y1="38" x2="-10" y2="30" stroke={HUD} strokeOpacity="0.35" strokeWidth="0.5" /><rect x="-118" y="-46" width="10" height="6" fill={HUD} fillOpacity="0.5" /><rect x="-118" y="40" width="10" height="6" fill={HUD} fillOpacity="0.5" /><line x1="-118" y1="-43" x2="-128" y2="-38" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.4" /><line x1="-118" y1="43" x2="-128" y2="38" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.4" /><circle cx="-122" cy="-22" r="2.6" fill={HUD} fillOpacity="0.55" /><circle cx="-122" cy="22" r="2.6" fill={HUD} fillOpacity="0.55" /><ellipse cx="6" cy="-18" rx="14" ry="8" fill="url(#glow-cyan)" opacity="0.55" /><ellipse cx="6" cy="18" rx="14" ry="8" fill="url(#glow-cyan)" opacity="0.55" /><circle cx="-2" cy="-18" r="2.4" fill={ACCENT}><animate attributeName="opacity" values="1;0.55;1" dur="1.5s" repeatCount="indefinite" /></circle><circle cx="-2" cy="18" r="2.4" fill={ACCENT}><animate attributeName="opacity" values="1;0.55;1" dur="1.5s" repeatCount="indefinite" /></circle></g>;
}
/* ─────────────── Scene 1 — GateCore ─────────────── */
function GateScene() {
  return <svg viewBox="0 0 1600 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice"><SharedDefs /><BlueprintGrid /><line x1="0" y1="640" x2="1600" y2="640" stroke={HUD} strokeOpacity="0.18" strokeWidth="0.6" /><RegMark x={60} y={60} /><RegMark x={1540} y={60} /><RegMark x={60} y={840} /><RegMark x={1540} y={840} /><TitleBlock title="GATE 01 · ENTRY ELEV." meta="SCALE 1:50  ·  SHEET 1/3" /><g transform="translate(0, 640)"><g opacity="0.6"><rect x="1240" y="-110" width="120" height="110" fill="#0A1628" stroke={HUD} strokeOpacity="0.55" strokeWidth="1" /><line x1="1235" y1="-110" x2="1365" y2="-110" stroke={HUD} strokeOpacity="0.7" strokeWidth="1.2" /><rect x="1260" y="-90" width="80" height="40" fill="url(#truck-glass)" stroke={HUD} strokeOpacity="0.35" strokeWidth="0.5" /><rect x="1308" y="-44" width="22" height="44" fill="none" stroke={HUD} strokeOpacity="0.4" strokeWidth="0.5" /></g><rect x="970" y="-260" width="14" height="260" fill="#0A1228" stroke={HUD} strokeOpacity="0.85" strokeWidth="1" /><rect x="960" y="-12" width="34" height="12" fill="#0A1228" stroke={HUD} strokeOpacity="0.5" strokeWidth="0.6" /><rect x="964" y="-280" width="26" height="20" fill="#0A1228" stroke={HUD} strokeOpacity="0.7" strokeWidth="0.8" /><rect x="932" y="-186" width="46" height="42" rx="2" fill="#0A1228" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1" /><circle cx="984" cy="-166" r="3" fill={ACCENT} /><circle cx="984" cy="-166" r="6" fill="none" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="0.6" /><motion.circle cx="977" cy="-272" r="5" initial={{
        fill: "#EF4444"
      }} animate={{
        fill: VERIFY
      }} transition={{
        duration: 0.4,
        delay: 2.4
      }} /><motion.circle cx="977" cy="-272" r="10" fill="none" stroke={VERIFY} strokeOpacity="0" initial={{
        strokeOpacity: 0,
        scale: 1
      }} animate={{
        strokeOpacity: [0, 0.6, 0],
        scale: [1, 2, 2]
      }} transition={{
        duration: DUR.slow,
        ease: EASE_OUT,
        delay: 2.4
      }} /><motion.g initial={{
        rotate: 0
      }} animate={{
        rotate: -75
      }} transition={{
        duration: DUR.slow,
        ease: EASE_OUT,
        delay: 2.6
      }} style={{
        originX: "984px",
        originY: "-166px"
      }}><rect x="984" y="-170" width="320" height="8" rx="1" fill={HUD} />{[0, 1, 2, 3, 4, 5].map((i: any) => <rect key={i} x={994 + i * 52} y="-170" width="26" height="8" fill={BLUE} />)}<ellipse cx="1304" cy="-166" rx="14" ry="10" fill="url(#glow-cyan)" opacity="0.7" /><circle cx="1304" cy="-166" r="5" fill={ACCENT} /></motion.g></g><g transform="translate(1410, 380)"><rect x="-3" y="0" width="6" height="260" fill="#0A1228" stroke={HUD} strokeOpacity="0.55" strokeWidth="0.6" /><rect x="-15" y="248" width="30" height="12" fill="#0A1228" stroke={HUD} strokeOpacity="0.45" strokeWidth="0.6" /><rect x="-17" y="-6" width="34" height="6" fill="#0A1228" stroke={HUD} strokeOpacity="0.5" strokeWidth="0.5" /><rect x="-50" y="-200" width="100" height="200" rx="4" fill="url(#truck-body)" stroke={BLUE} strokeWidth="1.4" /><text x="0" y="-186" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="2" fill={HUD} fillOpacity="0.7">BIRDSEYE</text><ellipse cx="0" cy="-142" rx="50" ry="32" fill="url(#glow-cyan)" opacity="0.4" /><rect x="-38" y="-170" width="76" height="56" rx="3" fill={ACCENT} fillOpacity="0.55"><animate attributeName="fill-opacity" values="0.55;0.85;0.55" dur="1.4s" repeatCount="indefinite" /></rect><line x1="-32" y1="-160" x2="20" y2="-160" stroke="#0A1228" strokeWidth="0.8" /><line x1="-32" y1="-150" x2="12" y2="-150" stroke="#0A1228" strokeWidth="0.8" /><line x1="-32" y1="-140" x2="24" y2="-140" stroke="#0A1228" strokeWidth="0.8" /><line x1="-32" y1="-130" x2="16" y2="-130" stroke="#0A1228" strokeWidth="0.8" /><circle cx="0" cy="-94" r="10" fill={HUD} /><circle cx="0" cy="-94" r="4.5" fill="#0A1228" /><circle cx="2" cy="-95" r="1.2" fill={HUD} fillOpacity="0.85" /><rect x="-32" y="-72" width="64" height="14" rx="2" fill="#0A1228" stroke={HUD} strokeOpacity="0.65" strokeWidth="0.6" /><line x1="-26" y1="-64" x2="26" y2="-64" stroke={HUD} strokeOpacity="0.5" strokeWidth="0.5" /><circle cx="-32" cy="-44" r="3" fill={VERIFY}><animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" /></circle><text x="-22" y="-41" fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.6" fill={HUD} fillOpacity="0.65">ONLINE</text><rect x="-38" y="-26" width="76" height="3" fill="none" stroke={HUD} strokeOpacity="0.4" /></g><motion.g initial={{
      x: 0
    }} animate={{
      x: [0, 900, 900, 1800]
    }} transition={{
      duration: 5.0,
      ease: "easeInOut",
      times: [0, 0.32, 0.65, 1]
    }}><g transform="translate(0, 640)"><Tractor18Wheeler /></g></motion.g><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: [0, 1, 1, 0]
    }} transition={{
      duration: 1.7,
      ease: EASE_OUT,
      delay: 1.7,
      times: [0, 0.15, 0.85, 1]
    }}><DimLine x1={180} x2={900} y={730} label="73 FT · TRACTOR + TRAILER" delay={1.7} /><DimLine x1={870} x2={900} y={620} label="13′6″ CL" delay={2.0} /></motion.g><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: [0, 1, 1, 0]
    }} transition={{
      duration: 1.7,
      ease: EASE_OUT,
      delay: 1.5,
      times: [0, 0.1, 0.85, 1]
    }}><motion.rect y="380" width="4" height="320" fill={ACCENT} fillOpacity="0.95" initial={{
        x: 920
      }} animate={{
        x: [920, 200]
      }} transition={{
        duration: 1.4,
        ease: EASE_OUT,
        delay: 1.5
      }} /><motion.ellipse cy="540" rx="4" ry="180" fill="url(#glow-cyan)" opacity="0.65" initial={{
        cx: 922
      }} animate={{
        cx: [922, 202]
      }} transition={{
        duration: 1.4,
        ease: EASE_OUT,
        delay: 1.5
      }} /></motion.g><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: 0.35
    }} transition={{
      duration: DUR.smooth,
      delay: 1.4
    }}><line x1="1410" y1="280" x2="700" y2="540" stroke={ACCENT} strokeWidth="0.5" strokeDasharray="3 5" /><line x1="1410" y1="280" x2="450" y2="540" stroke={ACCENT} strokeWidth="0.5" strokeDasharray="3 5" /></motion.g><DataPanel x={80} y={140} width={300} delay={2.0} title="GATE 01 · INBOUND" rows={[{
      label: "TRACTOR",
      value: "KW · W900",
      verified: true
    }, {
      label: "TRAILER",
      value: "53′ · DRY VAN",
      verified: true
    }, {
      label: "DRIVER",
      value: "M.JOHANSEN",
      verified: true
    }, {
      label: "BOL",
      value: "BL-7782-04",
      verified: true
    }, {
      label: "SEAL",
      value: "S-001482-V",
      verified: true
    }]} /></svg>;
}
/* ─────────────── Scene 2 — SafeCore ─────────────── */
function SafeScene() {
  return <svg viewBox="0 0 1600 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice"><SharedDefs /><BlueprintGrid /><RegMark x={60} y={60} /><RegMark x={1540} y={60} /><RegMark x={60} y={840} /><RegMark x={1540} y={840} /><TitleBlock title="ZONE B · CIRCULATION" meta="SCALE 1:200  ·  SHEET 2/3" /><rect x="120" y="180" width="1360" height="600" rx="2" fill="none" stroke={HUD} strokeOpacity="0.25" strokeWidth="0.8" /><g>{Array.from({
        length: 10
      }).map((_: any, i: number) => {
        const x = 220 + i * 120;
        const occupied = [0, 1, 5, 7, 8].includes(i);
        const isTarget = i === 3;
        return <g><rect x={x} y="240" width="100" height="170" rx="2" fill="none" stroke={isTarget ? ACCENT : HUD} strokeOpacity={isTarget ? "0.7" : "0.3"} strokeWidth="0.7" strokeDasharray={isTarget ? "4 4" : "0"} /><text x={x + 50} y="262" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2" fill={isTarget ? ACCENT : HUD_DIM} fillOpacity={isTarget ? "0.95" : "0.55"}>B-{String(i + 1).padStart(2, "0")}</text>{occupied && <g transform={`translate(${x + 50}, 325) rotate(-90) scale(0.18)`} opacity="0.4"><TractorTopDown /></g>}</g>;
      })}{Array.from({
        length: 10
      }).map((_: any, i: number) => {
        const x = 220 + i * 120;
        const occupied = [1, 4, 6, 9].includes(i);
        return <g><rect x={x} y="540" width="100" height="170" rx="2" fill="none" stroke={HUD} strokeOpacity="0.3" strokeWidth="0.7" /><text x={x + 50} y="562" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2" fill={HUD_DIM} fillOpacity="0.55">C-{String(i + 1).padStart(2, "0")}</text>{occupied && <g transform={`translate(${x + 50}, 625) rotate(-90) scale(0.18)`} opacity="0.4"><TractorTopDown /></g>}</g>;
      })}</g><line x1="120" y1="475" x2="1480" y2="475" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="0.6" strokeDasharray="14 10" /><motion.path d="M 80 475 L 350 475 Q 500 475, 580 460 L 630 420" fill="none" stroke="url(#path-fade)" strokeWidth="2" strokeDasharray="6 7" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={{
      pathLength: 1,
      opacity: 0.95
    }} transition={{
      duration: 1.4,
      ease: EASE_OUT,
      delay: 0.2
    }} /><motion.g initial={{
      opacity: 0,
      scale: 0.4
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.4,
      ease: EASE_OUT,
      delay: 1.1
    }}><ellipse cx="630" cy="325" rx="40" ry="22" fill="url(#glow-cyan)" opacity="0.4" /><circle cx="630" cy="325" r="14" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="3 3"><animate attributeName="r" values="14;22;14" dur="2.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" /></circle><circle cx="630" cy="325" r="4" fill={ACCENT} /><text x="630" y="220" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2.4" fill={ACCENT}>DESTINATION · B-04</text></motion.g><motion.g initial={{
      x: 10,
      y: 475,
      rotate: 0,
      scale: 0.16
    }} animate={{
      x: [10, 400, 580, 630],
      y: [475, 475, 460, 325],
      rotate: [0, 0, -30, -90]
    }} transition={{
      duration: 4.4,
      ease: "easeInOut",
      times: [0, 0.5, 0.8, 1],
      delay: 0.2
    }} style={{
      transformOrigin: "center"
    }}><g transform="scale(0.16)"><TractorTopDown /></g></motion.g><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: [0, 1, 1, 0.65]
    }} transition={{
      duration: 4.4,
      ease: EASE_OUT,
      times: [0, 0.15, 0.7, 1],
      delay: 0.2
    }}><motion.g initial={{
        x: 90,
        y: 430
      }} animate={{
        x: [90, 480, 660, 700],
        y: [430, 430, 390, 270]
      }} transition={{
        duration: 4.4,
        ease: "easeInOut",
        times: [0, 0.5, 0.8, 1],
        delay: 0.2
      }}><rect x="-44" y="-13" width="88" height="22" rx="3" fill="#0A1628" fillOpacity="0.85" stroke={ACCENT} strokeOpacity="0.55" strokeWidth="0.6" /><text x="0" y="2" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="1.8" fill={ACCENT}>5 MPH · OK</text></motion.g></motion.g><g transform="translate(1450, 220)"><motion.path d="M 0 0 L -380 200 A 400 400 0 0 1 -200 360 Z" fill={ACCENT} fillOpacity="0.05" stroke={ACCENT} strokeOpacity="0.25" strokeWidth="0.6" initial={{
        rotate: -8
      }} animate={{
        rotate: [-8, 6, -8]
      }} transition={{
        duration: 7,
        ease: EASE_OUT,
        repeat: Infinity
      }} style={{
        originX: "0px",
        originY: "0px"
      }} /><circle r="9" fill={HUD} /><circle r="4" fill="#0A1228" /><text y="-14" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.8" fill={HUD_DIM} fillOpacity="0.7">CAM · 03</text></g>{[{
      x: 150,
      y: 220,
      label: "CAM · 01"
    }, {
      x: 150,
      y: 740,
      label: "CAM · 04"
    }, {
      x: 1450,
      y: 740,
      label: "CAM · 02"
    }].map((c: any, i: number) => <g key={i} transform={`translate(${c.x}, ${c.y})`}><circle r="9" fill={HUD} /><circle r="4" fill="#0A1228" /><text y="-14" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.8" fill={HUD_DIM} fillOpacity="0.55">{c.label}</text></g>)}<DataPanel x={80} y={140} width={300} delay={1.0} title="ZONE B · ROUTE COMPLIANCE" rows={[{
      label: "ROUTE",
      value: "ON-PATH",
      verified: true
    }, {
      label: "SPEED",
      value: "5 MPH"
    }, {
      label: "ETA · B-04",
      value: "00:24"
    }, {
      label: "DEVIATION",
      value: "0.0 m"
    }]} /><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.4,
      ease: EASE_OUT,
      delay: 4.0
    }}><ellipse cx="780" cy="155" rx="100" ry="20" fill="url(#glow-emerald)" opacity="0.5" /><rect x="680" y="138" width="200" height="36" rx="3" fill="#0A1628" fillOpacity="0.85" stroke={VERIFY} strokeOpacity="0.65" strokeWidth="0.7" /><circle cx="696" cy="156" r="4" fill={VERIFY}><animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" /></circle><text x="708" y="161" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="1.8" fill={VERIFY}>PARKED · SPOT B-04 ✓</text></motion.g></svg>;
}
/* ─────────────── Scene 3 — YardCore ─────────────── */
function YardScene() {
  const occupied = new Set(["0-1", "0-2", "0-4", "0-6", "0-7", "0-9", "1-0", "1-3", "1-5", "1-7", "1-8", "2-1", "2-2", "2-4", "2-9", "3-0", "3-3", "3-5", "3-6", "3-8"]);
  const tracked = "1-3";
  return <svg viewBox="0 0 1600 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice"><SharedDefs /><BlueprintGrid /><RegMark x={60} y={60} /><RegMark x={1540} y={60} /><RegMark x={60} y={840} /><RegMark x={1540} y={840} /><TitleBlock title="YARD-04 · SITE PLAN" meta="SCALE 1:500  ·  SHEET 3/3" /><motion.g transform="translate(1280, 110)" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: DUR.smooth,
      delay: 0.6
    }}><circle r="22" fill="none" stroke={ACCENT} strokeOpacity="0.45" strokeWidth="0.6" /><path d="M 0 -16 L 6 8 L 0 4 L -6 8 Z" fill={ACCENT} fillOpacity="0.85" /><text y="-26" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2" fill={ACCENT}>N</text></motion.g><motion.rect x="200" y="180" width="1200" height="540" rx="2" fill="none" stroke={ACCENT} strokeWidth="1.4" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={{
      pathLength: 1,
      opacity: 0.85
    }} transition={{
      duration: 1.2,
      ease: EASE_OUT
    }} /><motion.rect x="200" y="180" width="1200" height="540" rx="2" fill="none" stroke={ACCENT} strokeWidth="6" initial={{
      opacity: 0
    }} animate={{
      opacity: [0, 0.18, 0]
    }} transition={{
      duration: 2.6,
      ease: EASE_OUT,
      delay: 1.5,
      repeat: Infinity,
      repeatDelay: 0.6
    }} /><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: 0.3
    }} transition={{
      duration: DUR.smooth,
      ease: EASE_OUT,
      delay: 0.5
    }}>{Array.from({
        length: 30
      }).map((_: any, i: number) => <line key={i} x1={200 + (i + 1) * 40} y1="180" x2={200 + (i + 1) * 40} y2="172" stroke={ACCENT} strokeWidth="0.5" />)}</motion.g><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.4,
      delay: 1.0
    }}><ellipse cx="200" cy="460" rx="20" ry="40" fill="url(#glow-emerald)" opacity="0.45" /><rect x="190" y="430" width="20" height="60" fill={VERIFY} fillOpacity="0.8" /><text x="180" y="465" textAnchor="end" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2" fill={HUD}>GATE 01 · ENTRY</text></motion.g><motion.g initial={{
      opacity: 0
    }} animate={{
      opacity: 0.42
    }} transition={{
      duration: DUR.smooth,
      delay: 0.6
    }}><rect x="240" y="630" width="220" height="80" rx="1" fill="#0A1628" stroke={HUD} strokeOpacity="0.65" strokeWidth="0.7" /><text x="350" y="676" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2.4" fill={HUD} fillOpacity="0.8">BLDG · A</text><rect x="1140" y="630" width="220" height="80" rx="1" fill="#0A1628" stroke={HUD} strokeOpacity="0.65" strokeWidth="0.7" /><text x="1250" y="676" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2.4" fill={HUD} fillOpacity="0.8">BLDG · B · DOCK</text><rect x="700" y="640" width="200" height="60" rx="1" fill="#0A1628" stroke={HUD} strokeOpacity="0.65" strokeWidth="0.7" /><text x="800" y="676" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2.4" fill={HUD} fillOpacity="0.8">OFFICE</text></motion.g><g>{Array.from({
        length: 4
      }).map((_: any, r: number) => <motion.g key={r} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: DUR.smooth,
        ease: EASE_OUT,
        delay: 0.4 + r * 0.18
      }}>{Array.from({
          length: 10
        }).map((_: any, c: number) => {
          const cellW = 100;
          const cellH = 80;
          const gap = 14;
          const x = 240 + c * (cellW + gap);
          const y = 220 + r * (cellH + gap);
          const id = `${r}-${c}`;
          const isOccupied = occupied.has(id);
          const isTracked = id === tracked;
          return <g key={id}><rect x={x} y={y} width={cellW} height={cellH} rx="1" fill="none" stroke={HUD} strokeWidth="0.5" strokeOpacity="0.3" /><text x={x + 5} y={y + 12} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.6" fill={HUD_DIM} fillOpacity="0.5">{String.fromCharCode(65 + r)}-{String(c + 1).padStart(2, "0")}</text>{isOccupied && <>{isTracked && <ellipse cx={x + cellW / 2} cy={y + cellH / 2} rx="56" ry="42" fill="url(#glow-cyan)" opacity="0.45" />}<g transform={`translate(${x + cellW / 2 + 1}, ${y + cellH / 2 + 1}) rotate(-90) scale(0.13)`} opacity={isTracked ? "1" : "0.55"}><TractorTopDown /></g>{isTracked && <><rect x={x - 3} y={y - 3} width={cellW + 6} height={cellH + 6} rx="2" fill="none" stroke={ACCENT} strokeWidth="1.4"><animate attributeName="stroke-opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" /></rect><text x={x + cellW / 2} y={y - 12} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2" fill={ACCENT}>ASSET · 042</text></>}</>}</g>;
        })}</motion.g>)}</g>{[{
      x: 220,
      y: 200
    }, {
      x: 1380,
      y: 200
    }, {
      x: 1380,
      y: 700
    }, {
      x: 220,
      y: 700
    }].map((p: any, i: number) => <motion.g key={i} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.4,
      delay: 1.4 + i * 0.08
    }}><circle cx={p.x} cy={p.y} r="40" fill="none" stroke={ACCENT} strokeWidth="0.6" strokeDasharray="3 4" opacity="0.45" /><circle cx={p.x} cy={p.y} r="6" fill={HUD} /><circle cx={p.x} cy={p.y} r="2.4" fill="#0A1228" /><text x={p.x} y={p.y - 16} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.8" fill={HUD_DIM} fillOpacity="0.6">CAM · 0{i + 1}</text></motion.g>)}<DataPanel x={80} y={130} width={260} delay={0.5} title="YARD · TX-DEPOT-04" rows={[{
      label: "OCCUPIED",
      value: "23 / 40"
    }, {
      label: "ACTIVE",
      value: "8"
    }, {
      label: "GATES",
      value: "ONLINE",
      verified: true
    }, {
      label: "UPTIME",
      value: "99.99%"
    }]} /><motion.g initial={{
      opacity: 0,
      x: 1280
    }} animate={{
      opacity: 1,
      x: 1262
    }} transition={{
      duration: DUR.smooth,
      ease: EASE_OUT,
      delay: 1.7
    }}><rect y="160" width="278" height="118" rx="6" fill="#0A1628" fillOpacity="0.65" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="0.6" /><line x1="0" y1="161" x2="278" y2="161" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="0.6" /><text x="14" y="180" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2.4" fill={ACCENT} opacity="0.9">LIVE · ACTIVITY FEED</text><line x1="14" y1="188" x2="264" y2="188" stroke={ACCENT} strokeOpacity="0.15" /></motion.g><ActivityLine baseX={1262} y={210} delay={2.0} time="17:42" event="ENTRY · ASSET · 042" /><ActivityLine baseX={1262} y={234} delay={2.4} time="17:42" event="ROUTE · COMPLIANT" /><ActivityLine baseX={1262} y={258} delay={2.8} time="17:43" event="PARK · SPOT B-04" /></svg>;
}
function ActivityLine({
  baseX,
  y,
  delay,
  time,
  event
}: any) {
  return <motion.g initial={{
    opacity: 0,
    x: baseX + 8
  }} animate={{
    opacity: 1,
    x: baseX
  }} transition={{
    duration: 0.4,
    ease: EASE_OUT,
    delay
  }}><text x="14" y={y} fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="1.8" fill={HUD_DIM} fillOpacity="0.65">{time}</text><text x="62" y={y} fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="1.8" fill={VERIFY}>›</text><text x="78" y={y} fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="1.8" fill={HUD} fillOpacity="0.85">{event}</text></motion.g>;
}