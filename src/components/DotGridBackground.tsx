import { useEffect, useRef } from "react";
import { ACCENT_EVENT, getAccentRgb } from "../utils/accent";
import "./styles/DotGridBackground.css";

const SPACING = 26;
const RADIUS = 180; // cursor light radius in px

/**
 * A quiet dot grid fixed behind the page. Dots near the cursor light up in
 * the accent color, and a soft diagonal wave drifts across every few seconds
 * so the page still breathes on touch screens.
 */
const DotGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let accent = getAccentRgb();
    let w = 0, h = 0, dpr = 1;
    let base: HTMLCanvasElement | null = null;
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = !document.hidden;

    // The unlit grid never changes, so draw it once and blit it each frame
    const buildBase = () => {
      base = document.createElement("canvas");
      base.width = w * dpr;
      base.height = h * dpr;
      const b = base.getContext("2d")!;
      b.scale(dpr, dpr);
      b.fillStyle = "rgba(255, 255, 255, 0.085)";
      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          b.beginPath();
          b.arc(x, y, 1, 0, Math.PI * 2);
          b.fill();
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildBase();
      draw(performance.now());
    };

    // Light dots inside a rectangle, with brightness from `light(x, y)`
    const lightDots = (x0: number, y0: number, x1: number, y1: number, light: (x: number, y: number) => number) => {
      const sx = Math.max(SPACING / 2, Math.floor((x0 - SPACING / 2) / SPACING) * SPACING + SPACING / 2);
      const sy = Math.max(SPACING / 2, Math.floor((y0 - SPACING / 2) / SPACING) * SPACING + SPACING / 2);
      for (let x = sx; x <= Math.min(x1, w); x += SPACING) {
        for (let y = sy; y <= Math.min(y1, h); y += SPACING) {
          const k = light(x, y);
          if (k < 0.04) continue;
          ctx.fillStyle = `rgba(${accent}, ${0.1 + k * 0.85})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + k * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      if (base) ctx.drawImage(base, 0, 0, w, h);

      // Ambient diagonal wave, ~every 9s
      if (!reduced) {
        const period = 9000;
        const p = (now % period) / period;
        const band = (w + h) * (p * 1.4 - 0.2);
        if (p < 0.85) {
          lightDots(0, 0, w, h, (x, y) => {
            const d = x + y - band;
            return Math.exp(-(d * d) / (2 * 70 * 70)) * 0.35;
          });
        }
      }

      if (mouse.active) {
        const r2 = 2 * RADIUS * RADIUS;
        lightDots(mouse.x - RADIUS * 2, mouse.y - RADIUS * 2, mouse.x + RADIUS * 2, mouse.y + RADIUS * 2, (x, y) => {
          const dx = x - mouse.x, dy = y - mouse.y;
          return Math.exp(-(dx * dx + dy * dy) / r2);
        });
      }
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      if (reduced) draw(performance.now());
    };
    const onLeave = () => {
      mouse.active = false;
      if (reduced) draw(performance.now());
    };
    const onAccent = () => {
      accent = getAccentRgb();
      draw(performance.now());
    };
    const onVisibility = () => (visible = !document.hidden);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener(ACCENT_EVENT, onAccent);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener(ACCENT_EVENT, onAccent);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-grid-background" aria-hidden="true" />;
};

export default DotGridBackground;
