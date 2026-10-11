import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { canHover } from "./motion";

interface Props {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
}

/** Rotates toward the cursor in 3D with a moving light sheen on top. */
const TiltCard = ({ children, className = "", max = 10 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const card = el.querySelector<HTMLElement>(".tilt-card-inner")!;
    const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      rx((0.5 - y) * max * 2);
      ry((x - 0.5) * max * 2);
      card.style.setProperty("--glare-x", `${x * 100}%`);
      card.style.setProperty("--glare-y", `${y * 100}%`);
    };
    const onEnter = () => el.classList.add("is-tilting");
    const onLeave = () => {
      rx(0);
      ry(0);
      el.classList.remove("is-tilting");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      <div className="tilt-card-inner">
        {children}
        <div className="tilt-card-glare" aria-hidden="true" />
      </div>
    </div>
  );
};

export default TiltCard;
