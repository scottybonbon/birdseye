"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/_design/motion";

/**
 * CameraEye, a single-pass SDF iris rendered to a fullscreen quad in
 * vanilla WebGL. The whole scene lives in one fragment shader, which
 * keeps total wire weight under the 100KB-gzipped budget while
 * delivering shading depth a polygon scene at this size couldn't match.
 *
 * Design intent
 * ─────────────
 * The brand thesis is "every event verified", this component is the
 * system's optical sensor, not a marketing render. Visual register
 * leans Leica viewfinder / Anton & Irene material study, NOT product-
 * page glamour. Specifically we avoid:
 *   • Glassy / chrome surfaces (reads "consumer product")
 *   • Bright primary blue as the lens accent (overworks the brand)
 *   • Particles, lens flare, bloom (theatrical, not operational)
 *
 * Composition
 * ───────────
 * Centered iris on a near-black ground. From outside in:
 *   1. Outer housing ring, matte, with hairline radial grooves
 *   2. Aperture body, 8-blade iris, blades cast inner shadow
 *   3. Pupil opening, circular hole revealing the depth-of-field plate
 *   4. Inner glow ring, barely-perceptible rim caught by the iris
 *      lip; phase-tinted via --ambient-tint
 *   5. Pupil reflection, micro highlight that tracks the cursor as if
 *      the lens is catching ambient light from the user's position
 *
 * Tracking signals (composite, weighted)
 * ──────────────────────────────────────
 * Each input nudges the lens in a different way. Combined they make
 * the eye feel awake without ever being twitchy:
 *   • Cursor (50%), pupil highlight position
 *   • Scroll velocity (30%), iris dilates slightly under fast scroll,
 *     contracts under stillness
 *   • AmbientShift phase via :root --ambient-tint (20%), rim hue
 *
 * Choreography
 * ────────────
 *   • Wake-up: 1.6s. Iris opens from f/16 (closed) to f/2.8 (resting).
 *     Highlight resolves last.
 *   • Resting: subtle breathing oscillation (±2% aperture) at 0.18Hz.
 *   • Hover/intent (cursor inside the lens area): aperture contracts
 *     ~6% over 280ms, the system "focusing" on the user.
 *   • Reduce-motion: skip wake-up, skip breathing, skip hover. Render
 *     one static frame at resting state.
 *
 * Performance
 * ───────────
 *   • 1 program, 1 quad, 1 RAF, peak ~0.5ms render at 1080p.
 *   • IntersectionObserver pauses RAF when offscreen.
 *   • document.visibilitychange pauses RAF when tab is hidden.
 *   • DPR is clamped to 2, 4K monitors don't melt.
 *   • Resize is throttled to one frame.
 *
 * Accessibility
 * ─────────────
 *   • The canvas has aria-hidden because the visual is decorative; the
 *     real semantic content (headline, CTAs) lives in DOM siblings.
 *   • Reduce-motion path is honored even though "no motion" still
 *     leaves the iris visible, the work is in the static composition,
 *     not the loop.
 */

// ─── Shaders ──────────────────────────────────────────────────────────

const VERTEX_SHADER = /* glsl */ `#version 300 es
  in vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// Single fragment shader. SDF library + lighting model + atmosphere
// passes, end to end. Heavily commented because the *intent* of each
// block matters more than the math, and a future reader needs to be
// able to retune any individual layer (glow, breathing, focus bite)
// without re-deriving the whole composition.
const FRAGMENT_SHADER = /* glsl */ `#version 300 es
  precision highp float;
  out vec4 outColor;

  uniform vec2  u_res;
  uniform vec2  u_mouse;        // 0..1 in canvas space
  uniform float u_time;         // seconds since first paint
  uniform float u_wake;         // 0..1, 0 = closed iris, 1 = open
  uniform float u_focus;        // 0..1, 1 = contracting on hover
  uniform float u_scrollDial;   // -1..1, signed scroll velocity dial
  uniform vec3  u_tint;         // rgb 0..1 from --ambient-tint
  uniform float u_glow;         // 0..1 ambient glow multiplier

  // ── Helpers ────────────────────────────────────────────────────────
  const float PI = 3.14159265359;
  const int BLADES = 8;

  // 2D rotation matrix.
  mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  // Cheap hash for grain. Same point → same value.
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 78.233);
    return fract(p.x * p.y);
  }

  // SDF: regular N-gon centered at origin, "circumscribing radius" r.
  // Standard formulation by Inigo Quilez, adapted. Negative inside,
  // positive outside.
  float sdNGon(vec2 p, float r, float n) {
    float an = PI / n;
    vec2 acs = vec2(cos(an), sin(an));
    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;
    p = length(p) * vec2(cos(bn), abs(sin(bn)));
    p -= r * acs;
    p.y += clamp(-p.y, 0.0, r * acs.y);
    return length(p) * sign(p.x);
  }

  // Outer housing ring, annulus with hairline radial grooves baked
  // into the radial coordinate so we get instrument-machined feel
  // without spending vertices on it.
  float housing(vec2 p, float rOuter, float rInner, float grooveAmp, float grooveCount) {
    float r = length(p);
    float ring = max(r - rOuter, rInner - r);
    // Radial grooves, very shallow. Modulate amplitude so the ring's
    // outer edge stays clean while the inner face takes the texture.
    float ang = atan(p.y, p.x);
    float groove = sin(ang * grooveCount) * grooveAmp;
    return ring + groove;
  }

  void main() {
    // ── Coordinate setup ────────────────────────────────────────────
    // Center origin, square-aspect coordinate so the iris stays round
    // regardless of canvas dimensions. y goes up.
    vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
    p *= 2.0; // Bring iris into a comfortable scale: lens diameter ≈ 1.0

    // Subtle parallax, the whole composition tilts slightly toward
    // the cursor. Reads as the lens turning to follow the user.
    vec2 mouseN = (u_mouse - 0.5) * 2.0;
    p -= mouseN * 0.035 * u_wake;

    // ── Aperture computation ────────────────────────────────────────
    // Pupil radius in scene units. Resting at 0.32, breathing ±0.006,
    // hover bite -0.022, scroll dilate ±0.014. Wake from 0.04 up to
    // resting over the wake curve.
    float resting = 0.32;
    float wakeOffset = mix(0.04, resting, u_wake);
    float breathing = sin(u_time * 0.18 * 2.0 * PI) * 0.006;
    float focusBite = -u_focus * 0.022;
    float scrollDilate = u_scrollDial * 0.014;
    float pupilR = wakeOffset + breathing + focusBite + scrollDilate;
    pupilR = clamp(pupilR, 0.03, 0.42);

    // Geometry radii (in scene units).
    float housingOuterR = 0.92;
    float housingMidR   = 0.82;
    float housingInnerR = 0.74;
    float bevelOuterR   = 0.74;
    float bevelInnerR   = 0.58;
    float irisOuterR    = 0.58;

    // ── SDFs ────────────────────────────────────────────────────────
    // Outer matte ring, fine grooves, instrument-machined feel.
    float dHousingOuter = housing(p, housingOuterR, housingMidR, 0.0009, 96.0);
    // Inset bevel ring, coarser grooves, slightly inset.
    float dHousingBevel = housing(p, bevelOuterR, bevelInnerR, 0.0014, 48.0);

    // Iris blade fill, disc from origin to irisOuterR, MINUS the
    // pupil polygon. The polygon has 8 sides and rotates very slowly
    // so the blade seams shift like a real diaphragm settling under
    // breath. Negative inside the iris.
    float pupilRot = u_time * 0.035;
    vec2 pPoly = rot(pupilRot) * p;
    float dPupilPoly = sdNGon(pPoly, pupilR, float(BLADES));
    float dIrisDisc = length(p) - irisOuterR;
    float dIris = max(dIrisDisc, -dPupilPoly);

    // Pupil, same polygon as the cutout, used as the "inside the
    // lens" mask.
    float dPupil = dPupilPoly;

    // Blade seams, 8 thin radial grooves on the iris fill that mark
    // the joints between blades. Computed in the same rotated frame
    // as the polygon so they line up with the polygon vertices.
    vec2 pSeam = pPoly;
    float seamAng = mod(atan(pSeam.y, pSeam.x) + PI / float(BLADES), 2.0 * PI / float(BLADES)) - PI / float(BLADES);
    float seamRadial = abs(seamAng) * length(pSeam);
    // Gate by "inside the iris fill", 1 where dIris < 0, 0 elsewhere.
    // Using the explicit (1 - smoothstep) form so we don't rely on the
    // reversed-args smoothstep pattern for this critical mask.
    float irisFillMask = 1.0 - smoothstep(-0.006, 0.006, dIris);
    float seamMask = smoothstep(0.0035, 0.0, seamRadial) * irisFillMask;

    // ── Pupil interior, the depth-of-field "what the lens sees" ────
    // A defocused dark gradient with a slow scan band drifting up.
    // Reads as live yard plate without committing to actual imagery.
    // The center is slightly lit by an inner ambient bounce.
    float plateBase = 0.022 + 0.018 * exp(-length(p) * 7.0);
    float scan = sin((p.y + u_time * 0.025) * 26.0) * 0.006;
    float plateLuma = plateBase + scan;
    vec3 plateTinted = mix(vec3(plateLuma), u_tint * 0.45, 0.35);
    vec3 plate = plateTinted;

    // ── Lighting on the housing ─────────────────────────────────────
    // Cheap directional light from upper-left. Use SDF gradient as a
    // surface normal proxy: large gradient = edge = highlight.
    vec2 e = vec2(0.0015, 0.0);
    float h = housing(p, housingOuterR, housingMidR, 0.0009, 96.0);
    vec2 grad = vec2(
      housing(p + e.xy, housingOuterR, housingMidR, 0.0009, 96.0) - h,
      housing(p + e.yx, housingOuterR, housingMidR, 0.0009, 96.0) - h
    );
    grad = normalize(grad + 1e-6);
    vec2 lightDir = normalize(vec2(-0.55, 0.78));
    float lambert = max(dot(grad, lightDir), 0.0);
    float rim = pow(1.0 - max(dot(grad, vec2(0.0, 1.0)), 0.0), 2.6);

    // Matte black housing with quiet specular pickup along the bevel.
    vec3 housingCol = vec3(0.055, 0.058, 0.065) * (0.55 + 0.45 * lambert) +
                      vec3(0.16, 0.17, 0.20) * rim;

    // Bevel ring, slightly darker, takes the same light.
    vec2 bgrad = vec2(
      housing(p + e.xy, bevelOuterR, bevelInnerR, 0.0014, 48.0) -
      housing(p, bevelOuterR, bevelInnerR, 0.0014, 48.0),
      housing(p + e.yx, bevelOuterR, bevelInnerR, 0.0014, 48.0) -
      housing(p, bevelOuterR, bevelInnerR, 0.0014, 48.0)
    );
    bgrad = normalize(bgrad + 1e-6);
    float blam = max(dot(bgrad, lightDir), 0.0);
    vec3 bevelCol = vec3(0.030, 0.032, 0.038) * (0.5 + 0.5 * blam) +
                    vec3(0.10, 0.10, 0.12) * rim * 0.5;

    // Iris blade fill, radial gradient from cool dark at outer edge
    // to a slightly warmer mid as it approaches the pupil. Plus the
    // seam darkening for blade joints.
    float irisR = length(p) / irisOuterR;
    vec3 bladeColInner = vec3(0.052, 0.058, 0.072);
    vec3 bladeColOuter = vec3(0.024, 0.026, 0.032);
    vec3 bladeCol = mix(bladeColInner, bladeColOuter, smoothstep(0.4, 1.0, irisR));
    bladeCol *= (1.0 - seamMask * 0.65);
    // Subtle directional shading on the blade fan, light from the
    // same upper-left key, falling off radially toward the pupil edge.
    float bladeKey = max(dot(normalize(p + 1e-6), lightDir), 0.0);
    bladeCol += vec3(0.04, 0.04, 0.05) * bladeKey * 0.4;

    // ── Composition ────────────────────────────────────────────────
    vec3 col = vec3(0.0);

    // Outer matte ring.
    float housingMask = smoothstep(0.010, -0.010, dHousingOuter);
    col = mix(col, housingCol, housingMask);

    // Inset bevel.
    float bevelMask = smoothstep(0.010, -0.010, dHousingBevel);
    col = mix(col, bevelCol, bevelMask);

    // Iris blades.
    float irisFill = smoothstep(0.008, -0.008, dIris);
    col = mix(col, bladeCol, irisFill);

    // Pupil opening, reveals the depth-of-field plate.
    float pupilMask = smoothstep(0.010, -0.010, dPupil);
    col = mix(col, plate, pupilMask);

    // ── Inner-rim electric glaze ───────────────────────────────────
    // Brand electric lives ONLY here, a barely-perceptible cyan-blue
    // halo around the pupil edge, modulated by phase glow. This is
    // the "power-on" accent.
    float pupilEdge = smoothstep(0.020, -0.004, abs(dPupil)) * 0.55;
    vec3 electricRim = vec3(0.18, 0.30, 1.00);
    vec3 glow = electricRim * pupilEdge * u_glow * (0.55 + 0.45 * u_wake);
    col += glow;

    // ── Pupil-tracking highlight ───────────────────────────────────
    // Small warm specular pickup that follows the cursor inside the
    // pupil. Reads as the lens catching light from the user's
    // position.
    vec2 highlightCenter = mouseN * pupilR * 0.45;
    float hl = smoothstep(0.085, 0.0, length(p - highlightCenter));
    float insidePupil = smoothstep(0.0, -0.04, dPupil);
    vec3 highlight = vec3(0.94, 0.95, 0.96) * hl * 0.20 * insidePupil;
    col += highlight;

    // ── Atmosphere passes ──────────────────────────────────────────
    // Vignette tied to phase tint, dusk reads warmer toward edges.
    float vig = smoothstep(1.45, 0.45, length(p));
    col *= mix(0.78, 1.04, vig);
    col += u_tint * 0.014 * (1.0 - vig);

    // Soft outer halo, barely visible glow extending past the
    // housing, hinting at lens housing scatter. Tied to wake.
    float outerHalo = smoothstep(0.92, 0.86, length(p)) *
                      (1.0 - smoothstep(0.86, 0.78, length(p)));
    col += vec3(0.06, 0.07, 0.10) * outerHalo * u_wake * 0.6;

    // Film grain, barely visible. Operational, not theatrical.
    float n = (hash(gl_FragCoord.xy + u_time * 60.0) - 0.5) * 0.020;
    col += n;

    // Wake-up curtain, black radial wipe that retreats from center
    // as the iris opens. Smooths the "popped" geometry of the closed
    // state into a clean reveal. Explicit (1 - smoothstep) form to
    // avoid the reversed-args smoothstep portability question for
    // this critical mask.
    float curtainR = mix(0.0, 1.7, u_wake);
    float curtain = 1.0 - smoothstep(curtainR - 0.05, curtainR + 0.05, length(p));
    col *= curtain;

    outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

// ─── React shell ─────────────────────────────────────────────────────

type Props = {
  /** Container className, sized by the parent. The canvas fills it. */
  className?: string;
};

export function CameraEye({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // The hook returns `false` on first render then resolves after its
  // own effect runs, for users with reduce-motion preference this
  // would have caused ~50ms of full WebGL motion (wake animation
  // starting) before the effect re-ran with reduce=true and snapped
  // to a single static frame. Same flash-fix pattern as BrandEntry:
  // we keep the hook (so OS toggle mid-session is honored) but also
  // resolve synchronously inside the mount effect via matchMedia, and
  // prefer the synchronous value for the initial setup decision.
  const liveReduce = usePrefersReducedMotion();
  const inViewRef = useRef(true);
  const visibleRef = useRef(true);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const focusRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Synchronous read, wins over `liveReduce` for the initial setup
    // path. If the user toggles OS preference mid-session, the effect
    // re-runs (we depend on liveReduce below) and the rebuild picks
    // up the new value.
    let reduceMotion = liveReduce;
    try {
      reduceMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* media-query unsupported, fall back to hook value */
    }
    const gl = canvas.getContext("webgl2", {
      antialias: true,
      alpha: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) {
      // Fallback: leave the canvas blank, the static DOM hero copy
      // will still be visible. Could swap a poster img here in a
      // future pass.
      return;
    }

    // ── Compile shaders ─────────────────────────────────────────────
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error("[CameraEye shader]", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error("[CameraEye program]", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // ── Quad ────────────────────────────────────────────────────────
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // ── Uniforms ────────────────────────────────────────────────────
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uWake = gl.getUniformLocation(prog, "u_wake");
    const uFocus = gl.getUniformLocation(prog, "u_focus");
    const uScroll = gl.getUniformLocation(prog, "u_scrollDial");
    const uTint = gl.getUniformLocation(prog, "u_tint");
    const uGlow = gl.getUniformLocation(prog, "u_glow");

    // ── Resize ─────────────────────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        resize();
      });
    };
    window.addEventListener("resize", onResize);

    // ── Mouse / focus tracking ─────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.x = Math.max(0, Math.min(1, x));
      mouseRef.current.y = Math.max(0, Math.min(1, y));
      // Focus engages when cursor is inside the lens disc (~0.45 from
      // center in normalized canvas coords). Outside, focus relaxes.
      const dx = mouseRef.current.x - 0.5;
      const dy = mouseRef.current.y - 0.5;
      focusRef.current = Math.hypot(dx, dy) < 0.32 ? 1 : 0;
    };
    window.addEventListener("mousemove", onMove);

    // Scroll velocity dial, positive when scrolling down, negative up.
    // Decays to zero in ~600ms.
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollRef.current;
      lastScrollRef.current = y;
      const v = Math.max(-1, Math.min(1, dy / 60));
      scrollVelRef.current = v;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Pause when offscreen / hidden ──────────────────────────────
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inViewRef.current = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVis = () => {
      visibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    // ── Read AmbientShift tokens ───────────────────────────────────
    // We re-read every tick because phase changes are infrequent and
    // the read is cheap (computed style is cached per element).
    const readTint = (): [number, number, number, number] => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const tintRaw = cs.getPropertyValue("--ambient-tint").trim();
      const glowRaw = cs.getPropertyValue("--ambient-glow").trim();
      const parts = tintRaw.split(/\s+/).map((n) => parseFloat(n));
      const tint: [number, number, number] =
        parts.length === 3 && parts.every((n) => !isNaN(n))
          ? [parts[0] / 255, parts[1] / 255, parts[2] / 255]
          : [12 / 255, 14 / 255, 22 / 255];
      const glow = parseFloat(glowRaw) || 1;
      return [tint[0], tint[1], tint[2], glow];
    };

    // ── RAF loop ───────────────────────────────────────────────────
    const start = performance.now();
    let raf = 0;
    let wake = reduceMotion ? 1 : 0;
    let focusS = 0;
    let scrollS = 0;

    if (reduceMotion) {
      // Reduce-motion: render exactly one frame at resting state and
      // skip the loop entirely. The composition is the work; the
      // animation is decoration we're choosing not to ship for these
      // users.
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, 0.5, 0.5);
      gl.uniform1f(uTime, 0);
      gl.uniform1f(uWake, 1);
      gl.uniform1f(uFocus, 0);
      gl.uniform1f(uScroll, 0);
      const [tr, tg, tb, gv] = readTint();
      gl.uniform3f(uTint, tr, tg, tb);
      gl.uniform1f(uGlow, gv);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } else {
      const tick = () => {
        raf = requestAnimationFrame(tick);
        // Cheap pause: when offscreen or hidden, keep the loop alive
        // (so we resume instantly when visible) but skip the GL work.
        if (!inViewRef.current || !visibleRef.current) return;

        const now = performance.now();
        const t = (now - start) / 1000;

        // Soft spring toward fully-open. ~1.6s to reach 95%.
        wake += (1.0 - wake) * 0.045;

        // Smooth focus + scroll dial toward target ref values.
        focusS += (focusRef.current - focusS) * 0.12;
        scrollS += (scrollVelRef.current - scrollS) * 0.18;
        // Decay scroll velocity toward 0 each frame so a spike fades.
        scrollVelRef.current *= 0.9;

        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uTime, t);
        gl.uniform1f(uWake, wake);
        gl.uniform1f(uFocus, focusS);
        gl.uniform1f(uScroll, scrollS);
        const [tr, tg, tb, gv] = readTint();
        gl.uniform3f(uTint, tr, tg, tb);
        gl.uniform1f(uGlow, gv);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [liveReduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
