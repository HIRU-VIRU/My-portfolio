import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "./styles/About.css";
import { config } from "../config";
import { certificates } from "../data/certificates";
import StatsCounter from "./StatsCounter";
import { prefersReducedMotion } from "./effects/motion";

type Tok = [cls: "" | "p" | "k" | "s" | "n", text: string];

const current = config.experiences.find((e) => /present/i.test(e.date));
const [iitm, saveetha] = config.education;

// about.json, as syntax-highlighted tokens per line
const LINES: Tok[][] = [
  [["p", "$ "], ["", "cat about.json"]],
  [["", "{"]],
  [["", "  "], ["k", '"role"'], ["", ": "], ["s", '"AI Engineer"'], ["", ","]],
  ...(current
    ? ([[["", "  "], ["k", '"now"'], ["", ": "], ["s", `"${current.title} @ SGBC, IIT Madras"`], ["", ","]]] as Tok[][])
    : []),
  [["", "  "], ["k", '"education"'], ["", ": ["], ["s", `"BS Data Science, IIT Madras · ${iitm.cgpa}"`], ["", ","]],
  [["", "                "], ["s", `"B.Tech AI & ML, ${saveetha.institution.split(" ")[0]}"`], ["", "],"]],
  [["", "  "], ["k", '"focus"'], ["", ": ["], ["s", '"Agentic AI"'], ["", ", "], ["s", '"RAG"'], ["", ","]],
  [["", "            "], ["s", '"Computer Vision"'], ["", ", "], ["s", '"AI Ethics"'], ["", "],"]],
  [["", "  "], ["k", '"hackathons"'], ["", ": "], ["s", '"15+"'], ["", ","]],
  [["", "  "], ["k", '"projects"'], ["", ": "], ["n", String(config.projects.length)], ["", ", "], ["k", '"certifications"'], ["", ": "], ["n", String(certificates.length)]],
  [["", "}"]],
];
const TOTAL = LINES.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0) + 1, 0);

/** Lanyard badge that swings like a pendulum when the cursor moves past it. */
const Badge = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let angle = 0, vel = 0, lastX: number | null = null;
    const section = el.closest(".about-section") as HTMLElement;

    const onMove = (e: PointerEvent) => {
      if (lastX !== null) vel += gsap.utils.clamp(-30, 30, e.clientX - lastX) * 0.012;
      lastX = e.clientX;
    };
    const onLeave = () => (lastX = null);
    const tick = (time: number) => {
      // Damped spring back to a gentle idle sway
      const idle = Math.sin(time * 1.1) * 1.6;
      vel += (idle - angle) * 0.02;
      vel *= 0.93;
      angle += vel;
      el.style.transform = `rotate(${angle}deg)`;
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    gsap.ticker.add(tick);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="badge-hang" ref={ref}>
      <div className="badge-strap" />
      <div className="badge-clip" />
      <div className="badge">
        <div className="badge-hole" />
        <img src="/images/me.jpg" alt={config.developer.fullName} loading="lazy" />
        <div className="badge-name">
          {config.developer.fullName.split(" ").map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="badge-row">
          <span className="badge-role">AI ENGINEER</span>
          <span className="badge-chip">SIH 2025 FINALIST</span>
        </div>
        <div className="badge-row">
          <span className="badge-barcode" />
          <span className="badge-org">IITM · SEC</span>
        </div>
      </div>
    </div>
  );
};

/** Terminal that types out about.json once it scrolls into view. */
const Terminal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? TOTAL : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || shown >= TOTAL) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const n = Math.min(TOTAL, Math.floor((now - start) / 9)); // ~110 chars/s
          setShown(n);
          if (n < TOTAL) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const body = useMemo(() => {
    let left = shown;
    return LINES.map((line, i) => {
      if (left <= 0) return null;
      const parts = line.map(([cls, text], j) => {
        const visible = text.slice(0, Math.max(0, left));
        left -= text.length;
        return visible ? (
          <span key={j} className={cls ? `t-${cls}` : undefined}>
            {visible}
          </span>
        ) : null;
      });
      left -= 1; // newline
      return (
        <Fragment key={i}>
          {parts}
          {"\n"}
        </Fragment>
      );
    });
  }, [shown]);

  return (
    <div className="about-terminal" ref={ref}>
      <div className="about-terminal-bar">
        <i />
        <i />
        <i />
        <span>hiru@ai: ~/about</span>
      </div>
      <pre aria-label="About me as JSON">
        {body}
        {shown >= TOTAL && <span className="t-p">$ </span>}
        <span className="about-caret" />
      </pre>
    </div>
  );
};

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-badge-col">
        <Badge />
      </div>
      <div className="about-me">
        <h3 className="title">
          About <span>me</span>
        </h3>
        <Terminal />
        <StatsCounter />
      </div>
    </div>
  );
};

export default About;
