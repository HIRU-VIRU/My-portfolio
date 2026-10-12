import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./effects/motion";
import "./styles/VelocityMarquee.css";

const ROWS = [
  ["Agentic AI", "RAG Pipelines", "Computer Vision", "LLMs", "Multi-Agent Systems", "AI Safety"],
  ["Python", "PyTorch", "LangGraph", "FastAPI", "React", "AWS", "YOLO", "ChromaDB"],
];

/**
 * Two bands of words drifting in opposite directions. Scrolling speeds them
 * up and skews them in the scroll direction, then they ease back to idle.
 */
const VelocityMarquee = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const tracks = Array.from(el.querySelectorAll<HTMLElement>(".vm-track"));
    const reduced = prefersReducedMotion();

    const offsets = [0, 0];
    let velocity = 0;
    let direction = 1;
    let lastY = window.scrollY;
    let visible = false;

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const tick = () => {
      // Scroll velocity in px/frame, smoothed
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) direction = dy > 0 ? 1 : -1;
      velocity += (Math.min(Math.abs(dy), 80) - velocity) * 0.12;
      if (!visible) return;

      const speed = reduced ? 0 : 0.6 + velocity * 0.35;
      const skew = reduced ? 0 : gsap.utils.clamp(-12, 12, velocity * 0.4 * direction);
      tracks.forEach((t, i) => {
        const half = t.scrollWidth / 2;
        const dir = (i % 2 ? 1 : -1) * direction;
        offsets[i] = (offsets[i] + speed * dir) % half;
        if (offsets[i] > 0) offsets[i] -= half;
        t.style.transform = `translate3d(${offsets[i]}px,0,0) skewX(${i % 2 ? skew : -skew}deg)`;
      });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  }, []);

  return (
    <div className="velocity-marquee" ref={root} aria-hidden="true">
      {ROWS.map((words, i) => (
        <div className={`vm-row ${i % 2 ? "vm-row-alt" : ""}`} key={i}>
          <div className="vm-track">
            {[...words, ...words, ...words, ...words].map((w, k) => (
              <span key={k}>
                {w}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VelocityMarquee;
