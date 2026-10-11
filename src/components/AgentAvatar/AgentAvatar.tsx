import { useEffect, useRef, useState } from "react";
import { ACCENT_EVENT, getAccent } from "../../utils/accent";
import { prefersReducedMotion } from "../effects/motion";
import type { AgentAvatarHandle } from "./scene";
import "./AgentAvatar.css";

const STEPS = ["Plan", "Retrieve", "Call tool", "Verify", "Done"] as const;

// Each task mirrors one of the real projects
const TASKS = [
  {
    title: "Shortlist 500 résumés for ML Intern",
    log: ["split into 4 sub-tasks", "embedded 500 résumés → ChromaDB", "rerank(top_k=20)", "bias check passed", "top 20 shortlisted in 90 s"],
    tool: "rerank(top_k=20)",
  },
  {
    title: "Due-diligence memo: Target Co.",
    log: ["spawn finance, legal, ops agents", "12 chunks from the 10-K", "python.run(ratios.py)", "every claim cited", "risk memo ready"],
    tool: "python.run(ratios.py)",
  },
  {
    title: "Find the meter of a Sanskrit shloka",
    log: ["syllabify → laghu / guru", "match against 1,920 meters", "prosody.check(pattern)", "confidence 0.98", "Indravajrā ✓"],
    tool: "prosody.check()",
  },
  {
    title: "Check CAM-02 for PPE violations",
    log: ["sample stream at 30 fps", "load YOLO weights", "detect(frame) × 240", "track IDs stable", "1 violation logged"],
    tool: "yolo.detect(frame)",
  },
];

const STEP_MS = 1150;
const DONE_HOLD_MS = 2200;

/**
 * Landing avatar: a 3D Hiruthik typing at a laptop while an agent card runs
 * through real project tasks. The 3D scene is code-split so three.js only
 * loads with this component.
 */
const AgentAvatar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handle = useRef<AgentAvatarHandle | null>(null);
  const [task, setTask] = useState(0);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const reduced = useRef(prefersReducedMotion());

  // Boot the 3D scene
  useEffect(() => {
    let disposed = false;
    import("./scene").then(({ createAgentAvatar }) => {
      if (disposed || !canvasRef.current) return;
      handle.current = createAgentAvatar(canvasRef.current, {
        accent: getAccent(),
        reducedMotion: reduced.current,
      });
      setReady(true);
    });
    const onAccent = (e: Event) => handle.current?.setAccent((e as CustomEvent<string>).detail);
    window.addEventListener(ACCENT_EVENT, onAccent);
    return () => {
      disposed = true;
      window.removeEventListener(ACCENT_EVENT, onAccent);
      handle.current?.dispose();
      handle.current = null;
    };
  }, []);

  // Agent loop: step through the task, then move to the next one
  useEffect(() => {
    if (reduced.current) {
      setStep(STEPS.length - 1);
      return;
    }
    const last = step === STEPS.length - 1;
    const id = window.setTimeout(
      () => {
        if (last) {
          setTask((t) => (t + 1) % TASKS.length);
          setStep(0);
        } else setStep((s) => s + 1);
      },
      last ? DONE_HOLD_MS : STEP_MS
    );
    return () => window.clearTimeout(id);
  }, [step, task]);

  // Tell the avatar how to react to each step
  useEffect(() => {
    const h = handle.current;
    if (!h) return;
    if (step === 0) h.react("glance");
    else if (step === 2) h.react("think");
    else if (step === STEPS.length - 1) h.react("done");
  }, [step, task, ready]);

  const t = TASKS[task];
  const done = step === STEPS.length - 1;

  return (
    <div className={`agent-avatar ${ready ? "is-ready" : ""}`}>
      <canvas ref={canvasRef} className="agent-avatar-canvas" aria-label="3D avatar of Hiruthik working on agent tasks" />

      <div className={`agent-card ${done ? "is-done" : ""}`} key={task} aria-live="polite">
        <div className="agent-card-head">
          <span className="agent-dot" />
          <span>{done ? "Agent finished" : "Agent running"}</span>
          <span className="agent-run">run #{String(42 + task).padStart(3, "0")}</span>
        </div>
        <p className="agent-title">{t.title}</p>
        <ol className="agent-steps">
          {STEPS.map((s, i) => (
            <li key={s} className={i < step || done ? "is-done" : i === step ? "is-active" : ""}>
              <span className="agent-step-icon" />
              {s}
            </li>
          ))}
        </ol>
        <div className="agent-progress">
          <span style={{ width: `${((done ? STEPS.length : step + 0.5) / STEPS.length) * 100}%` }} />
        </div>
        <code className="agent-log" key={`${task}-${step}`}>
          <span>›</span> {t.log[step]}
        </code>
      </div>

      <div className={`agent-tool ${step === 2 ? "is-on" : ""}`} aria-hidden="true">
        <span>tool</span> {t.tool}
      </div>
    </div>
  );
};

export default AgentAvatar;
