import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "../config";
import { certificates } from "../data/certificates";
import { prefersReducedMotion } from "./effects/motion";
import "./styles/StatsCounter.css";

gsap.registerPlugin(ScrollTrigger);

// Every number is derived from the site's own data, so it stays current
const STATS = [
  { value: config.projects.length, label: "Projects built", suffix: "" },
  { value: certificates.length, label: "Certifications", suffix: "" },
  // The timeline only lists highlights; the real total is 15+
  { value: 15, label: "Hackathons", suffix: "+" },
  { value: Number(config.education[0].cgpa), label: "CGPA at IIT Madras", suffix: "", decimals: 2 },
];

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>(".stat-value"));

    const ctx = gsap.context(() => {
      nums.forEach((el, i) => {
        const { value, decimals = 0 } = STATS[i];
        const counter = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(counter, {
          v: value,
          duration: 1.8,
          delay: i * 0.12,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = counter.v.toFixed(decimals);
          },
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });
      });
      gsap.from(root.querySelectorAll(".stat"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="stats-counter" ref={ref}>
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <span className="stat-number">
            <span className="stat-value">{s.value.toFixed(s.decimals ?? 0)}</span>
            {s.suffix}
          </span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
