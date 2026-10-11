import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { config } from "../config";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward, MdGridView, MdViewList } from "react-icons/md";
import ProjectCover from "../components/ProjectCover";
import TiltCard from "../components/effects/TiltCard";
import Magnetic from "../components/effects/Magnetic";
import useSpotlight from "../components/effects/useSpotlight";
import { canHover, prefersReducedMotion } from "../components/effects/motion";
import { TransitionLink } from "../context/PageTransition";
import "./MyWorks.css";

type View = "grid" | "list";
type Project = (typeof config.projects)[number];

const ALL = "All";
const DOMAINS = [ALL, ...Array.from(new Set(config.projects.map((p) => p.domain)))];

const readView = (): View => {
  try {
    return localStorage.getItem("myworks-view") === "list" ? "list" : "grid";
  } catch {
    return "grid";
  }
};

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- Grid card ---------- */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <article className="mw-card spotlight-card" data-cursor="disable">
    <TiltCard className="mw-card-cover" max={7}>
      <ProjectCover id={project.id} domain={project.domain} />
    </TiltCard>
    <div className="mw-card-body">
      <div className="mw-card-top">
        <span className="mw-card-index">{pad(index + 1)}</span>
        <span className="mw-card-domain">{project.domain}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="mw-card-metric">{project.metric}</p>
      <p className="mw-card-description">{project.description}</p>
      <ul className="mw-tags">
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="mw-card-actions">
        <Magnetic strength={0.25}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link" data-cursor="disable">
            <FaGithub /> View on GitHub
          </a>
        </Magnetic>
      </div>
    </div>
  </article>
);

/* ---------- List view with floating cover preview ---------- */
const ProjectList = ({ projects }: { projects: Project[] }) => {
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const hover = useMemo(canHover, []);

  useEffect(() => {
    const el = preview.current;
    if (!el || !hover) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX + 30);
      yTo(e.clientY - 110);
      // Tilt the preview in the direction of travel
      gsap.to(el, { rotation: gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6), duration: 0.4 });
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [hover]);

  useEffect(() => {
    if (!preview.current || !hover) return;
    gsap.to(preview.current, {
      scale: active ? 1 : 0.6,
      opacity: active ? 1 : 0,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [active, hover]);

  return (
    <div className="mw-list" onPointerLeave={() => setActive(null)}>
      {projects.map((p) => (
        <a
          key={p.id}
          className="mw-row"
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
          onPointerEnter={() => setActive(p)}
        >
          <span className="mw-row-index">{pad(config.projects.indexOf(p) + 1)}</span>
          <span className="mw-row-thumb" aria-hidden="true">
            <ProjectCover id={p.id} />
          </span>
          <span className="mw-row-title">
            {p.title.split(" - ")[0]}
            <small>{p.title.split(" - ")[1] ?? p.category}</small>
          </span>
          <span className="mw-row-domain">{p.domain}</span>
          <span className="mw-row-metric">{p.metric}</span>
          <MdArrowOutward className="mw-row-arrow" />
        </a>
      ))}
      {hover && (
        <div className="mw-preview" ref={preview} aria-hidden="true">
          {active && <ProjectCover id={active.id} domain={active.domain} />}
        </div>
      )}
    </div>
  );
};

/* ---------- Page ---------- */
const MyWorks = () => {
  const [domain, setDomain] = useState(ALL);
  const [view, setView] = useState<View>(readView);
  const results = useRef<HTMLDivElement>(null);

  const projects = useMemo(
    () => (domain === ALL ? config.projects : config.projects.filter((p) => p.domain === domain)),
    [domain]
  );

  useSpotlight(results, [view, domain]);

  useEffect(() => {
    try {
      localStorage.setItem("myworks-view", view);
    } catch {
      /* storage blocked */
    }
  }, [view]);

  // Header entrance
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".myworks-header > *", { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power4.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, []);

  // Re-stagger the items whenever the filter or view changes
  useLayoutEffect(() => {
    if (!results.current || prefersReducedMotion()) return;
    const items = results.current.querySelectorAll(".mw-card, .mw-row");
    const tween = gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out", clearProps: "transform,opacity" }
    );
    return () => void tween.kill();
  }, [domain, view]);

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Magnetic>
          <TransitionLink to="/" className="back-button" data-cursor="disable">
            ← Back to Home
          </TransitionLink>
        </Magnetic>
        <h1>
          All <span>Works</span>
        </h1>
        <p>
          {config.projects.length} projects across agents, computer vision, AI safety, EdTech and
          automation.
        </p>

        <div className="mw-toolbar">
          <div className="mw-filters" role="group" aria-label="Filter by domain">
            {DOMAINS.map((d) => (
              <button
                key={d}
                className="mw-chip"
                aria-pressed={domain === d}
                onClick={() => setDomain(d)}
                data-cursor="disable"
              >
                {d}
                <span>{d === ALL ? config.projects.length : config.projects.filter((p) => p.domain === d).length}</span>
              </button>
            ))}
          </div>
          <div className="mw-view-toggle" role="group" aria-label="Layout">
            <button aria-pressed={view === "grid"} onClick={() => setView("grid")} aria-label="Grid view" data-cursor="disable">
              <MdGridView />
            </button>
            <button aria-pressed={view === "list"} onClick={() => setView("list")} aria-label="List view" data-cursor="disable">
              <MdViewList />
            </button>
          </div>
        </div>
      </div>

      <div ref={results} className="mw-results">
        {view === "grid" ? (
          <div className="myworks-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} index={config.projects.indexOf(p)} />
            ))}
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
    </div>
  );
};

export default MyWorks;
